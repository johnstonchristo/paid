class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :fetch_user

require 'securerandom'

  private
      def lucky_number
        @lucky_number = Random.rand(1..100)
      end

      def fetch_user
        @current_user = User.find_by(id: session[:user_id]) if session[:user_id]
        session[:user_id] = nil unless @current_user.present?
      end



end
