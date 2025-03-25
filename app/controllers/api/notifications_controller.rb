module Api
    class NotificationsController < ApplicationController
      skip_before_action :verify_authenticity_token
  
      def visit
        VisitorMailer.with(visitor: visitor_params.to_h).send_visit_email.deliver_now
        render json: { status: "Email sent" }, status: :ok
      rescue => e
        Rails.logger.error("Visitor email failed: #{e.message}")
        render json: { error: e.message }, status: :internal_server_error
      end
  
      private
  
      def visitor_params
        params.permit(:ip, :city, :region, :country, :referrer, :userAgent, :timestamp, 
                      notification: [:ip, :city, :region, :country, :referrer, :userAgent, :timestamp])
      end
    end
  end
  