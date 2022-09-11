bundle install --jobs=5 &&
yarn install &&
bundle exec rails assets:precompile &&
yarn dev-server &
rails server -b 0.0.0.0 -p 3000