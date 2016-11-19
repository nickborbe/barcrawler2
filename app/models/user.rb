class User < ActiveRecord::Base
	has_many :venues, through: :user_venues
	has_many :user_venues



	def unseen
		Venue.where.not(id: self.venues)
	end

	def upvoted
		self.venues.where(user_venues: {favorite: true})
	end

	def downvoted
		self.venues.where(user_venues: {favorite: false})
	end



end


