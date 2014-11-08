class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) << :username
  end

  def after_sign_in_path_for(resource)
    request.env['omniauth.origin'] || wishlist_products_path(resource) || root_path
  end
end
