# frozen_string_literal: true

require 'fileutils'
require 'tmpdir'
require 'json'

require_relative '../config'
require_relative '../lib/mailing'

module Commands
  class Setup
    attr_reader :app_dir, :app

    # @param [String] app_name
    def self.perform(app_name:, opts: {})
      new(app_name: app_name, opts: opts)
    end

    # @param [String] app_name
    # @returns [String] the path to the app's root directory
    def initialize(app_name:, opts: {})
      working_dir = setup_environment(rerun: !opts['rerun'].nil?)

      unless opts['skip-build']
        puts 'Builidng Mailing'
        Mailing.build
      end

      puts "Setting up #{app_name}"
      @app_dir = File.join(working_dir, app_name.to_s)
      @app = App.from_name(app_name).new(@app_dir, save_cache: opts['save-cache'])
      @app.setup! unless opts['rerun']

      # copy jest tests into app
      Dir.chdir(@app.root_dir) do
        puts 'Initializing Mailing'
        system('MM_E2E=1 npx mailing --quiet --scaffold-only')
        puts 'Copying Jest Tests into App'
        ::FileUtils.cp_r(Config::JEST_TESTS_DIR, './jest_tests')
      end
    end

    private

    # Ensures that necessary directories and symlinks exist
    # @return [String] the path to the app's root directory
    def setup_environment(rerun: false)
      raise "Check that PROJECT_ROOT exists: #{Config::PROJECT_ROOT}" unless Dir.exist?(Config::PROJECT_ROOT)

      ::FileUtils.mkdir_p File.join(Config::TEST_ROOT, 'runs')
      ::FileUtils.mkdir_p File.join(Config::TEST_ROOT, 'cache')
      ::FileUtils.cp File.join(Config::PROJECT_ROOT, '.tool-versions'), File.join(Config::TEST_ROOT, '.tool-versions')

      unless File.symlink?(File.join(Config::E2E_ROOT, 'runs'))
        ::FileUtils.rm_rf File.join(Config::E2E_ROOT, 'runs')
        ::FileUtils.ln_s File.join(Config::TEST_ROOT, 'runs'), File.join(Config::E2E_ROOT, 'runs')
      end

      unless File.symlink?(File.join(Config::E2E_ROOT, 'cache'))
        ::FileUtils.rm_rf File.join(Config::E2E_ROOT, 'cache')
        ::FileUtils.ln_s File.join(Config::TEST_ROOT, 'cache'), File.join(Config::E2E_ROOT, 'cache')
      end

      package_json_file = File.join(Config::PROJECT_ROOT, 'package.json')
      unless File.exist?(package_json_file) && JSON.parse(File.read(package_json_file))['name'] == 'mailing-monorepo'
        raise "Check that PROJECT_ROOT is the project root: #{Config::PROJECT_ROOT}"
      end
      raise "Check that CYPRESS_DIR exists: #{Config::CYPRESS_DIR}" unless Dir.exist?(Config::CYPRESS_DIR)

      if rerun
        current_dir = File.join(Config::RUNS_DIR, 'latest')
      else
        timestamp_dir = Time.now.strftime('%Y%m%d%H%M%S')

        # create current_dir
        current_dir = File.join(Config::RUNS_DIR, timestamp_dir)
        ::FileUtils.mkdir_p(current_dir)

        # create latest symlink
        latest_dir = File.join(Config::RUNS_DIR, 'latest')
        ::FileUtils.rm(latest_dir) if File.symlink?(latest_dir)
        ::FileUtils.ln_s(current_dir, latest_dir)
      end

      current_dir
    end
  end
end
