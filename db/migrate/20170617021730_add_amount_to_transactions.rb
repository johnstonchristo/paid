class AddAmountToTransactions < ActiveRecord::Migration[5.1]
  def change
    add_column :transactions, :amount, :integer
  end
end
