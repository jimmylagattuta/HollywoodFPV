require 'net/http'
require 'json'

class GoogleReviewsController < ApplicationController
  def fetch_reviews
    place_id = params[:place_id] # Ensure place_id is passed
    api_key = ENV['GOOGLE_API_KEY'] # Ensure API key is present

    # Debugging logs
    Rails.logger.info "Fetching Google Reviews..."
    Rails.logger.info "PLACE ID: #{place_id}"
    Rails.logger.info "GOOGLE API KEY: #{api_key ? 'Key is present' : 'Key is MISSING!'}"

    if place_id.nil? || place_id.strip.empty?
      render json: { error: "Missing place_id parameter" }, status: :bad_request
      return
    end

    if api_key.nil? || api_key.strip.empty?
      render json: { error: "Missing API key" }, status: :unauthorized
      return
    end

    # Construct URL
    url = URI("https://maps.googleapis.com/maps/api/place/details/json?place_id=#{place_id}&fields=reviews,rating,user_ratings_total&key=#{api_key}")

    Rails.logger.info "Requesting URL: #{url}"

    # Use Net::HTTP.get_response instead of Net::HTTP.get to catch errors
    begin
      response = Net::HTTP.get_response(url)
      data = JSON.parse(response.body)

      Rails.logger.info "Google API Response: #{data}"

      if data['status'] == 'OK'
        render json: {
          reviews: data['result']['reviews'],
          rating: data['result']['rating'],
          total_ratings: data['result']['user_ratings_total']
        }
      else
        render json: { error: data['status'], message: data['error_message'] || "Invalid request" }, status: :bad_request
      end

    rescue StandardError => e
      Rails.logger.error "Error fetching reviews: #{e.message}"
      render json: { error: "Failed to fetch reviews", details: e.message }, status: :internal_server_error
    end
  end
end