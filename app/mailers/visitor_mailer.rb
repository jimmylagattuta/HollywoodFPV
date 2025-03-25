class VisitorMailer < ApplicationMailer
    default to: 'your_email@example.com' # <- replace this with your real email
  
    def send_visit_email
      @visitor = params[:visitor]
      mail(
        subject: "New Website Visit from #{@visitor[:city]}, #{@visitor[:country]}"
      )
    end
  end  