class RemoveSeenyetFromVenues < ActiveRecord::Migration
  def change
    remove_column :venues, :seenyet, :boolean
  end
end
