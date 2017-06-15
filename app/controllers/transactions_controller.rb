class TransactionsController < ApplicationController
  before_action :set_transaction, only: [:show, :edit, :update, :destroy]

  # GET /transactions
  # GET /transactions.json
  def index
    @transactions = Transaction.all
  end

  # GET /transactions/1
  # GET /transactions/1.json
  def show
  end

  # GET /transactions/new
  def new
    @transaction = Transaction.new


  end

def create
transaction = Transaction.new(transaction_params)
transaction.token = SecureRandom.hex(6)
transaction.user_id = @current_user.id
transaction.save
redirect_to "/users/#{@current_user.id}"


end



private

def transaction_params
  params.require(:transaction).permit(:token, :description)
end

  def authorise
    unless @current_user
  flash[:error] = "You need to be logged in for that"
  redirect_to "/login"

    end
  end
end
