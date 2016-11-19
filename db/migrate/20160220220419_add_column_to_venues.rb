class AddColumnToVenues < ActiveRecord::Migration
  def change
    add_column :venues, :name, :string
    add_column :venues, :address, :string
    add_column :venues, :url, :string
    add_column :venues, :favorite, :boolean
  end
end
