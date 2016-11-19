class RemoveFavoriteFromVenues < ActiveRecord::Migration
  def change
    remove_column :venues, :favorite, :boolean
  end
end
