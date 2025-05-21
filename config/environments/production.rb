require "active_support/core_ext/integer/time"

Rails.application.configure do
  # Middleware to compress responses
  config.middleware.insert_before ActionDispatch::Static, Rack::Deflater

  # Code is not reloaded between requests
  config.cache_classes = true

  # Eager load code on boot
  config.eager_load = true

  # Full error reports are disabled and caching is turned on
  config.consider_all_requests_local = false
  config.serve_static_assets = true  # Serve static assets in production

  # Enable asset digest for cache busting
  config.assets.digest = true

  # Enable action caching
  config.action_controller.perform_caching = true

  # Ensure SSL is used in production
  config.force_ssl = true

  # Caching with Redis for production, set Redis URL in environment variables
  config.cache_store = :redis_cache_store, { url: ENV['REDIS_TLS_URL'], expires_in: 30.days }

  # Use Sidekiq for background jobs, configure Redis URL
  config.active_job.queue_adapter = :sidekiq
  Sidekiq.configure_server do |config|
    config.redis = { url: ENV['REDIS_URL'] }
  end
  Sidekiq.configure_client do |config|
    config.redis = { url: ENV['REDIS_URL'] }
  end

  # Disable assets compilation in production (ensure assets are precompiled)
  config.assets.compile = false

  # Cache static assets for up to 1 year
  config.public_file_server.headers = {
    'Cache-Control' => 'public, max-age=31536000'
  }

  # Specify the asset host for serving images, stylesheets, and JavaScripts
  config.asset_host = "http://hollywood-fpv-e9adcc4a24d9.herokuapp.com"

  # Set Active Storage service (local storage by default)
  config.active_storage.service = :local

  # Action Mailer settings
  config.action_mailer.delivery_method = :smtp
  config.action_mailer.asset_host = "https://hollywood-fpv-e9adcc4a24d9.herokuapp.com"
  config.action_mailer.smtp_settings = {
    address: 'smtp.gmail.com',
    port: 587,
    domain: 'gmail.com',
    user_name: 'jimmy.lagattuta@gmail.com',
    password: ENV["REACT_APP_GMAIL_PASSWORD"],
    authentication: 'plain',
    enable_starttls_auto: true
  }

  # Prepend all log lines with the following tags
  config.log_tags = [ :request_id ]

  # Set the logging level to :info to avoid exposing sensitive information
  config.log_level = :info

  # Log formatting
  config.log_formatter = ::Logger::Formatter.new

  # Use STDOUT logging when specified by environment
  if ENV["RAILS_LOG_TO_STDOUT"].present?
    logger = ActiveSupport::Logger.new(STDOUT)
    logger.formatter = config.log_formatter
    config.logger = ActiveSupport::TaggedLogging.new(logger)
  end

  # Enable locale fallbacks for I18n (fallback to default locale when translation missing)
  config.i18n.fallbacks = true

  # Disable ActiveSupport deprecation notices
  config.active_support.report_deprecations = false

  # Do not dump schema after migrations
  config.active_record.dump_schema_after_migration = false

  # Ensure static files are served by Rails if RAILS_SERVE_STATIC_FILES is set
  config.public_file_server.enabled = ENV["RAILS_SERVE_STATIC_FILES"].present?
end
