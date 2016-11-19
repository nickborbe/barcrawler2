class AddSeenyetToVenues < ActiveRecord::Migration
  def change
    add_column :venues, :seenyet, :boolean
  end
end
