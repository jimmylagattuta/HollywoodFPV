require "test_helper"

class GoogleReviewsControllerTest < ActionDispatch::IntegrationTest
  test "should get fetch_reviews" do
    get google_reviews_fetch_reviews_url
    assert_response :success
  end
end
