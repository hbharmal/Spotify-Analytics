import requests
import json 
from flask import Flask, request 
from flask.json import jsonify 
from flask_cors import CORS, cross_origin
import re

class Songs:

	def __init__(self, token):
		self.token = token 
		self.headers = {'Authorization' : 'Bearer ' + self.token}
		self.artist_ids = []

	def get_recent_songs():
		url = 'https://api.spotify.com/v1/me/tracks'
		params = {'offset': 50}

		items = []

		dictionary = {}
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

		spotify_request = requests.get(url=url, params=params, headers=self.headers)
		data = spotify_request.json() 
		items.extend(data['items'])

		while(data['next'] != None):
			url = data['next']
			spotify_request = requests.get(url=url, params=params, headers=headers)
			data = spotify_request.json()
			items.extend(data['items'])

		for item in items:

			artists = item.track.artists 
			song_id = item.track.id 

			ids = [artist.id for artist in artists]
			s = ","
			ids_str = s.join(ids)

			url = 'https://api.spotify.com/v1/artists'
			params = {'ids': ids_str}

			spotify_request = requests.get(url=url, params=params, headers=self.headers)
			data = spotify_request.json() 

			genres = []
			for artist in data.artists:
				genres.extend(artist.genres)

			final_genres = convert_genres(genres)

			dictionary[song_id] = final_genres

		for song_id, final_genres in dictionary.items():
			for genre in final_genres:
				genre_count_dict[genre] = genre_count_dict[genre] + 1

		return genre_count_dict


	@classmethod
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
			if (dictionary[element] != None && dictionary[element] == False):
				dictionary[element] = True 
				continue
			current_array = re.split(r'[\s-]+', genres[i])

			for j in range(len(current_array)):
				element = current_array[j].lower()

				if (element == "electro" or element == "edm"):
					dictionary["electronic"] = True
					continue

				if (dictionary[element] != None && dictionary[element] == False):
					dictionary[element] = True 

		final_genres = [key for key,value in dictionary.items() if value == True]

		return final_genres



def get_recent_songs(token):
	url = 'https://api.spotify.com/v1/me/tracks'
	headers = {'Authorization' : 'Bearer ' + token}
	params = {'offset': 50}

	items = []

	spotify_request = requests.get(url=url, params=params, headers=headers)
	if (spotify_request.status_code == 500):
		return (items, 500)

	data = spotify_request.json() 

	if (data['items'] != None):
		items.extend(data['items'])

	while(data['next'] != None):
		url = data['next']
		spotify_request = requests.get(url=url, params=params, headers=headers)
		data = spotify_request.json()
		if (data != None and data['items'] != None):
			items.extend(data['items'])

	return (items, 200)



app = Flask(__name__)
cors = CORS(app)

@app.route('/get_songs', methods=['GET'])
def get_songs():
	token = request.args.get('token')
	items, status_code = get_recent_songs(token)
	return jsonify({'items': items, 'status_code': status_code})

if __name__ == '__main__':
	app.run(debug=True, host='0.0.0.0')


