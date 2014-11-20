class Product < ActiveRecord::Base
	has_many :users, through: :wishlists
	has_many :wishlists

	# validates :sku, numericality: true,
	# 	length: {
	# 		minimum: 7,
	# 		maximum: 7
	# 	},
	# 	uniqueness: true

	def self.calc_rate(currentPrice, regPrice)
		if currentPrice <  regPrice
			downRate = ((1 - (currentPrice/regPrice)) * 100).round
		elsif currentPrice > regPrice 
			upRate = (((currentPrice/regPrice) - 1) * 100).round
		end
	end

end