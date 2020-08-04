# class AuthenticationController < ApplicationController
#  skip_before_action :authenticate_request
#
#  def authenticate
#    command = AuthenticateUser.call(params[:email], params[:password])
#    user = User.find_by_email(:email)
#
#    if command.success?
#      # @user = User.find_by(params[:email])
#      render json: { auth_token: command.result, user: user}
#      # {render jso
#    else
#      render json: { error: command.errors }, status: :unauthorized
#    end
#  end
# end



class AuthenticationController < ApplicationController
 skip_before_action :authenticate_request

 def authenticate
   command = AuthenticateUser.call(params[:email], params[:password])

   if command.success?
     render json: { auth_token: command.result }
   else
     render json: { error: command.errors }, status: :unauthorized
   end
 end
end
