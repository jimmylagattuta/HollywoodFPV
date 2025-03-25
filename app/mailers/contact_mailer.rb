class ContactMailer < ApplicationMailer
    default from: 'jimmy.lagattuta@gmail.com'
  
    def contact_email(contact_params)
      puts "*" * 100
      puts "contact_params"
      puts contact_params.inspect
      puts "*" * 100
      @firstName = contact_params[:firstName]
      @lastName = contact_params[:lastName]
      @message = contact_params[:message]
      @user_email = contact_params[:email]
      @phone = contact_params[:phone]
  
      mail(
        to: 'jimmy.lagattuta@gmail.com', # Replace with your receiving email
        subject: "LightningSEO.dev: New Submission for LightningSEO.dev Contact Us Form"
      )
    end
  end