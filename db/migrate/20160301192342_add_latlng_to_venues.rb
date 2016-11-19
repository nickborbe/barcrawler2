class AddLatlngToVenues < ActiveRecord::Migration
  def change
    add_column :venues, :lat, :decimal
    add_column :venues, :lng, :decimal
  end
end
