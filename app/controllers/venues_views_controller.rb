class VenuesViewsController < ApplicationController

	def main
		@user = current_fake_user
	end

	def index
		@user = current_fake_user
		@venues = Venue.all
	end

	def single_venue
		@user = current_fake_user
		@venue = Venue.find(params[:id])	

	end


end
