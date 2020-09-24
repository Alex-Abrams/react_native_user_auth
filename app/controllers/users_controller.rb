class UsersController < ApplicationController
  wrap_parameters :user, include: [:email, :password, :password_confirmation]

  def show
    # @user = User.find(params[:id])
    # @user = User.find_by_email!(params[:email])
    # render json: @user
     @user = User.friendly.find(params[:id])
     render json: @user
  end

  def create
    @user = User.create!(user_params)

    if @user.save
      render json: @user
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit( :email, :password, :password_confirmation )
  end
end
