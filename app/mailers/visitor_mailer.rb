class VisitorMailer < ApplicationMailer
    default to: 'jimmy.lagattuta@gmail.com' # Replace with your actual email address
  
    def send_visit_email
      @visitor = params[:visitor]
      mail(
        subject: "LightningSEO.dev: New Website Visit from #{@visitor['city']}, #{@visitor['country']}"
      )
    end
  end
  