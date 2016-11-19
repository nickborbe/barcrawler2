class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session

  def current_fake_user
  	if session[:user_id]  && session[:expires_at] > Time.current
  		user = User.find(session[:user_id])
  	else 
  		user = User.new
  		user.save
  		session[:user_id] = user.id
      session[:expires_at] = Time.current + 6.hours
  	end
  	user
  end
end
