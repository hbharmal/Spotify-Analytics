# run the flask app on python 
printf "Running Spotify API in background\n\n"
# export FLASK_APP="./spotilytics_api/spotify.py"
# export FLASK_ENV="development"
# flask run >> log.txt 2>&1 &

# run react app using webpack dev server 
printf "Running React App\n\n"
./node_modules/.bin/webpack-dev-server --content-base src --inline --hot