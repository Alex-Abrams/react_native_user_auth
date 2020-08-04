class UsersController < ApplicationController
  def show
    # @user = User.find(params[:id])
    # @user = User.find_by_email!(params[:email])
    # render json: @user
     @user = User.friendly.find(params[:id])
     render json: @user
  end
end
