class Venue < ActiveRecord::Base
	has_many :user_venues
	acts_as_mappable :auto_geocode=>{:field=>:address, :error_message=>'Could not geocode address'}
end
