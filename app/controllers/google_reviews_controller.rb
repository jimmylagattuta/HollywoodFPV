require 'net/http'
require 'json'

class GoogleReviewsController < ApplicationController
  def fetch_reviews
    place_id = params[:place_id] # Place ID of the business
    api_key = ENV['GOOGLE_API_KEY']

    url = URI("https://maps.googleapis.com/maps/api/place/details/json?placeid=#{place_id}&fields=reviews,rating,user_ratings_total&key=#{api_key}")
    response = Net::HTTP.get(url)
    data = JSON.parse(response)

    if data['status'] == 'OK'
      render json: { reviews: data['result']['reviews'], rating: data['result']['rating'], total_ratings: data['result']['user_ratings_total'] }
    else
      render json: { error: data['status'] }, status: :bad_request
    end
  end
end
