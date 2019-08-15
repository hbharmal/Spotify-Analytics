import requests
import json 
from flask import Flask, request 
from flask.json import jsonify 
from flask_cors import CORS, cross_origin
import re
import time 

class Songs:

	def __init__(self, token):
		self.token = token 
		self.headers = {'Authorization' : 'Bearer ' + self.token}
		self.saved_songs = []
		self.cache = {}

	def get_saved_songs(self):
		url = 'https://api.spotify.com/v1/me/tracks'
		params = {'offset': 50}

		items = []

		spotify_request = requests.get(url=url, params=params, headers=self.headers)
		data = spotify_request.json() 
		items.extend(data['items'])

		while(data['next'] != None):
			url = data['next']
			spotify_request = requests.get(url=url, params=params, headers=self.headers)
			data = spotify_request.json()
			items.extend(data['items'])

		self.saved_songs = items 

	def get_genre_dict(self):

		self.get_saved_songs()

		items = self.saved_songs

		genre_count_dict = {
			"alternative": 0,
			"anime": 0,
			"blues": 0,
			"children": 0,
			"classical": 0,
			"comedy": 0,
			"country": 0,
			"dance": 0,
			"easy listening": 0,
			"electronic": 0,
			"folk": 0,
			"hip hop": 0,
			"holiday": 0,
			"international": 0,
			"jazz": 0,
			"rap": 0,
			"holiday": 0,
			"indie": 0,
			"instrumental": 0,
			"latin": 0,
			"new age": 0,
			"opera": 0,
			"pop": 0,
			"rnb": 0,
			"rock": 0,
			"trap": 0,
			"sleep": 0 
		}

		for item in items:

			artists = item["track"]["artists"] 

			ids_not_in_cache = []
			genres = [] 

			main_artist = artists[0]

			for artist in artists:
				artist_id = artist["id"]
				if artist_id in self.cache:
					genres.extend(self.cache[artist_id]["genres"])
				else:
					ids_not_in_cache.append(artist_id)

			if len(ids_not_in_cache) > 0:
				s = ","
				ids_str = s.join(ids_not_in_cache)

				url = 'https://api.spotify.com/v1/artists'
				params = {'ids': ids_str}

				spotify_request = requests.get(url=url, params=params, headers=self.headers)
				data = spotify_request.json() 

				print(json.dumps(data, indent=4))

				for artist in data["artists"]:

					artist_id = artist["id"]
					self.cache[artist_id] = artist 

					genres.extend(artist["genres"])

			final_genres = Songs.convert_genres(genres)
			for genre in final_genres:
				genre_count_dict[genre] = genre_count_dict[genre] + 1

		return genre_count_dict

	@staticmethod
	def convert_genres(genres):

		dictionary = {
			"alternative": False,
			"anime": False,
			"blues": False,
			"children": False,
			"classical": False,
			"comedy": False,
			"country": False,
			"dance": False,
			"easy listening": False,
			"electronic": False,
			"folk": False,
			"hip hop": False,
			"holiday": False,
			"international": False,
			"jazz": False,
			"rap": False,
			"holiday": False,
			"indie": False,
			"instrumental": False,
			"latin": False,
			"new age": False,
			"opera": False,
			"pop": False,
			"rnb": False,
			"rock": False,
			"trap": False,
			"sleep": False 
		}

		for i in range(len(genres)):
			element = genres[i].lower()
			if (element in dictionary and dictionary[element] == False):
				dictionary[element] = True 
				continue
			current_array = re.split(r'[\s-]+', genres[i])

			for j in range(len(current_array)):
				element = current_array[j].lower()

				if (element == "electro" or element == "edm"):
					dictionary["electronic"] = True
					continue

				if (element in dictionary and dictionary[element] == False):
					dictionary[element] = True 

		final_genres = [key for key,value in dictionary.items() if value == True]

		return final_genres

app = Flask(__name__)
cors = CORS(app, resources={r"/get_songs": {"origins": "http://localhost:8080"}})

@app.route('/get_songs', methods=['GET'])
def get_songs():
	token = request.args.get('token')

	songs = Songs(token)

	start_time = time.time() 

	final_dict = songs.get_genre_dict()

	finish_time = time.time()

	response = jsonify(final_dict)
	response.headers.add('Access-Control-Allow-Origin', '*')

	return response

if __name__ == '__main__':
	app.run(debug=True, host='0.0.0.0')


