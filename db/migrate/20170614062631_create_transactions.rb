class CreateTransactions < ActiveRecord::Migration[5.1]
  def change
    create_table :transactions do |t|
      t.text :token
      t.text :description

      t.timestamps
    end
  end
end
