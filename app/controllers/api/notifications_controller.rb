module Api
    class NotificationsController < ApplicationController
      skip_before_action :verify_authenticity_token
  
      def visit
        # Use the permitted parameters, converted to a regular hash
        VisitorMailer.with(visitor: visitor_params.to_h).send_visit_email.deliver_later
        render json: { status: "Email sent" }, status: :ok
      rescue => e
        Rails.logger.error("Visitor email failed: #{e.message}")
        render json: { error: e.message }, status: :internal_server_error
      end
  
      private
  
      def visitor_params
        # Permit only the expected keys. Adjust as necessary.
        params.permit(:ip, :city, :region, :country, :referrer, :userAgent, :timestamp, 
                      notification: [:ip, :city, :region, :country, :referrer, :userAgent, :timestamp])
      end
    end
  end
  