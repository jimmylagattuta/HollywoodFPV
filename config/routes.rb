Rails.application.routes.draw do
  get 'google_reviews/fetch_reviews'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  root "fallback#index"
  post '/signup', to: "api/users#create"
  get '/me', to: "api/users#show"
  post '/login', to: "api/sessions#create"
  delete "/logout", to: "api/sessions#destroy"  
  delete "/logout", to: "api/sessions#destroy"
  post '/contact', to: 'api/contacts#create'
  get "/pull_google_reviews", to: "api/jobs#pull_google_reviews"
  get '/google_reviews', to: 'google_reviews#fetch_reviews'
  post 'send_visit_notification', to: 'notifications#visit'


  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

end
