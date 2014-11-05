class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :name
      t.string :asin
      t.integer :price
      t.integer :regPrice
      t.integer :rate_of_change
      t.string :description
      t.string :url
      t.string :img_url

      t.timestamps
    end
  end
end
