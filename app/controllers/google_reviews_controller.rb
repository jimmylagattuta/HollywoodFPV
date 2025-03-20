require 'net/http'
require 'json'
require 'openssl'

class GoogleReviewsController < ApplicationController
  def fetch_reviews
    place_id = params[:place_id]&.strip # Ensure place_id is passed correctly
    api_key = ENV['GOOGLE_API_KEY'] # Ensure API key is present

    # Debugging logs
    Rails.logger.info "🔍 Fetching Google Reviews..."
    Rails.logger.info "📍 PLACE ID: #{place_id}"
    Rails.logger.info "🔑 GOOGLE API KEY: #{api_key ? 'Key is present' : 'Key is MISSING!'}"

    if place_id.nil? || place_id.empty?
      Rails.logger.error "❌ ERROR: Missing place_id parameter"
      render json: { error: "Missing place_id parameter" }, status: :bad_request
      return
    end

    if api_key.nil? || api_key.strip.empty?
      Rails.logger.error "❌ ERROR: Missing API key"
      render json: { error: "Missing API key" }, status: :unauthorized
      return
    end

    # Construct API request URL
    url = URI("https://maps.googleapis.com/maps/api/place/details/json?place_id=#{place_id}&fields=reviews,rating,user_ratings_total&key=#{api_key}")

    Rails.logger.info "🌍 Requesting Google API: #{url}"

    begin
      http = Net::HTTP.new(url.host, url.port)
      http.use_ssl = true
      http.verify_mode = OpenSSL::SSL::VERIFY_PEER

      request = Net::HTTP::Get.new(url)
      response = http.request(request)

      # Log the HTTP response
      Rails.logger.info "🔄 HTTP Response Code: #{response.code}"
      Rails.logger.info "📄 Response Body: #{response.body}"

      # Parse JSON response
      data = JSON.parse(response.body)

      if data['status'] == 'OK'
        Rails.logger.info "✅ Google API Request Successful"

        render json: {
          reviews: data.dig('result', 'reviews') || [],
          rating: data.dig('result', 'rating'),
          total_ratings: data.dig('result', 'user_ratings_total')
        }
      else
        Rails.logger.error "❌ Google API Request Failed: #{data['status']} - #{data['error_message']}"
        render json: { error: data['status'], message: data['error_message'] || "Invalid request" }, status: :bad_request
      end

    rescue OpenSSL::SSL::SSLError => e
      Rails.logger.error "❌ SSL ERROR: #{e.message}"
      render json: { error: "SSL Error", details: e.message }, status: :internal_server_error
    rescue StandardError => e
      Rails.logger.error "❌ GENERAL ERROR: #{e.message}"
      render json: { error: "Failed to fetch reviews", details: e.message }, status: :internal_server_error
    end
  end
end
