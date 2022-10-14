# frozen_string_literal: true

require_relative '../helpers/system_utils'
require_relative './setup'

module Commands
  class Run
    include SystemUtils

    # @param [String] app_name
    def self.perform(app_name:, opts: {})
      new(app_name: app_name, opts: opts)
    end

    # @param [String] app_name
    def initialize(app_name:, opts: {})
      verify_mailing_port_is_free!
      config = Commands::Setup.perform(app_name: app_name, opts: opts)
      app = config.app

      app.run_mailing do
        # Run Cypress Tests
        announce! "Running cypress tests for #{app_name}", '🏃'
        system('yarn cypress run')

        # Run Jest Tests
        announce! "Running jest tests for #{app_name}", '🃏'
        system('yarn jest')
      end
    end
  end
end
