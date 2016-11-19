Rails.application.routes.draw do

get "/venues" => "venues_views#index"

get "/venues/:id" => "venues_views#single_venue"



get "/" => "venues_views#main"

get "/api/venues/upvoted" => "venues#maybes"

get "/api/venues/downvoted" => "venues#nopes"

get "/api/venues/unseen" => "venues#unseen"

get "api/venues/:id" => "venues#show"
		
patch "/api/upvote/venues/:id" => "venues#upvote"

patch "/api/downvote/venues/:id" => "venues#downvote"

	
	scope "/api" do 
		resources :venues, only: [:index, :destroy] 
	end





end
