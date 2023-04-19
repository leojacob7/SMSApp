class TwilioService
    def initialize
      @account_sid = ENV.fetch("TWILIO_ACCOUNT_SID")
      @auth_token = ENV.fetch("TWILIO_AUTH_TOKEN")
      @from = '+18445780397'
      @client = Twilio::REST::Client.new(@account_sid, @auth_token)
    end
  
    def send_sms(to, body)
      @client.messages.create(
        from: @from,
        to: to,
        body: body
      )
    end
  end
  