Rails.application.routes.draw do
  resources :transactions
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get '/login' => 'session#new'
    post '/login' => 'session#create'
    delete '/logout' => 'session#destroy'

    # get '/transactions/new' => 'transactions#new'

root 'session#new'

end
