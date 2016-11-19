class CreateUserVenues < ActiveRecord::Migration
  def change
    create_table :user_venues do |t|
      t.belongs_to :user, index: true, foreign_key: true
      t.belongs_to :venue, index: true, foreign_key: true
      t.boolean :favorite

      t.timestamps null: false
    end
  end
end
