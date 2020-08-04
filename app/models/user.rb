class User < ApplicationRecord
  has_secure_password

  extend FriendlyId
  friendly_id :email, use: :slugged

  # def to_param
  #   email
  # end
end
