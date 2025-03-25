module Api
    class NotificationsController < ApplicationController
      skip_before_action :verify_authenticity_token
  
      def visit
        VisitorMailer.with(visitor: params).send_visit_email.deliver_later
        render json: { status: "Email sent" }, status: :ok
      rescue => e
        Rails.logger.error("Visitor email failed: #{e.message}")
        render json: { error: e.message }, status: :internal_server_error
      end
    end
  end  