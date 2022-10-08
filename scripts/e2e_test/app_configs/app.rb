# frozen_string_literal: true

require 'net/http'

class App
  CACHE_DIR = File.expand_path("#{__dir__}/../cache")

  attr_reader :io, :root_dir

  def initialize(name, root_dir, opts)
    @name = name
    @root_dir = root_dir
    @save_cache = opts[:save_cache]
  end

  def setup!
    announce! "Creating new #{@name} app in #{@root_dir}", '⚙️'
    FileUtils.mkdir_p(@root_dir)

    use_cache do
      write_dot_env!
      yarn_create!
      yarn_add_jest_dependencies!
      verify_package_json_exists!
    end

    yalc_add_packages!
    yarn!
  end

  def run_mailing!
    puts 'Running mailing'
    mailing_command = -> { IO.popen('MM_E2E=1 npx mailing --quiet') }

    Dir.chdir(@root_dir) do
      @io = in_subdir(mailing_command)
    end

    # wait for the preview server to start
    wait_for_preview_server!
    wait_for_previews_json!
  end

  private

  def in_subdir(lam)
    if @sub_dir
      Dir.chdir(@sub_dir) do
        lam.call
      end
    else
      lam.call
    end
  end

  def use_cache(&block)
    framework_cache_dir = File.join(CACHE_DIR, @name)
    if Dir.exist?(framework_cache_dir)
      puts "Using cached #{@name}..."
      FileUtils.cp_r("#{framework_cache_dir}/.", @root_dir)
    else
      block.call

      if @save_cache
        verify_package_json_exists!
        FileUtils.cp_r(@root_dir, File.join(CACHE_DIR, @name))
      end
    end
  end

  def write_dot_env!
    system_quiet('echo "MM_E2E=1" > .env')
  end

  def verify_package_json_exists!
    raise "missing package.json in #{@root_dir}" unless File.exist?(File.join(@root_dir, 'package.json'))
  end

  ## yalc add mailing and mailing-cor to the project
  def yalc_add_packages!
    puts 'Adding mailing and mailing-core via yalc'

    yalc_command = -> { system_quiet('npx yalc add --dev mailing mailing-core') }

    Dir.chdir(@root_dir) do
      in_subdir(yalc_command)
    end
  end

  def yarn_add_jest_dependencies!
    puts "yarn add'ing dependencies required for jest tests"
    Dir.chdir(@root_dir) do
      system_quiet('yarn add --dev jest @babel/preset-env')
    end
  end

  def yarn!
    puts 'Running yarn'
    Dir.chdir(@root_dir) do
      system_quiet('yarn')
    end
  end

  def wait_for_preview_server!
    @io.select do |line|
      break if line =~ %r{mailing running preview at http://localhost:3883/}
    end
  end

  def wait_for_previews_json!
    # N.B. currently takes about 4 seconds for to load the preview json the first time in a Next.js js (non-ts) app,
    # which causes the cypress tests to falsely fail (blank page while previews.json is loading).
    # If we can speed up the uncached previews json load then this wait can likely be removed
    # see: https://github.com/sofn-xyz/mailing/issues/102

    uri = URI('http://localhost:3883/api/previews')
    res = Net::HTTP.get_response(uri)
    raise "HTTP Get #{uri} did not succeed" unless res.code == '200'
  end
end
