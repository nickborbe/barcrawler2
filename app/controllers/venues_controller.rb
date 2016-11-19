class VenuesController < ApplicationController


def index
		venues = Venue.all
		render json: venues
	end

	def show
		venue = Venue.find_by(id: params[:id])
		render json: venue
	end

	def unseen
		venues = current_fake_user.unseen
		render json: venues
	end

	def maybes
		venues = current_fake_user.upvoted
		render json: venues
	end

	def nopes
		venues = current_fake_user.downvoted
		render json: venues
	end


	def upvote
		my_venue = Venue.find_by(id: params[:id])
			unless current_fake_user.user_venues.find_by(venue_id: params[:id])	
				current_fake_user.user_venues.create(venue: my_venue, favorite: true)
			else 
				the_venue = current_fake_user.user_venues.find_by(venue_id: params[:id])
				the_venue.favorite = true
				the_venue.save

			end
				render json: my_venue.to_json
	end


	def downvote
		my_venue = Venue.find_by(id: params[:id])
			unless current_fake_user.user_venues.find_by(venue_id: params[:id])	
				current_fake_user.user_venues.create(venue: my_venue, favorite: false)
			else 
				the_venue = current_fake_user.user_venues.find_by(venue_id: params[:id])
				the_venue.favorite = false
				the_venue.save
			end
		render json: my_venue.to_json
	end

	def destroy
		venue = Venue.find_by(id: params[:id])
		venue.delete
		render json: venue.to_json
	end















end
