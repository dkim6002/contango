class WelcomeController < ApplicationController

	def index
		if current_user != nil
			redirect_to products_path
		end
	end

end