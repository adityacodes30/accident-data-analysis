from flask import Flask, request
from math import radians, sin, cos, sqrt, atan2
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def haversine(lat1, lon1, lat2, lon2):
    lat1 = radians(lat1)
    lon1 = radians(lon1)
    lat2 = radians(lat2)
    lon2 = radians(lon2)

    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    distance = 6371 * c
    return distance

@app.route('/')
def index():
    return 'Welcome to the Unsafe Road Detector!'

@app.route('/check_unsafe_road', methods=['POST'])
def check_unsafe_road():
    data = request.get_json(force=True)
    lat = float(data['latitude'])
    lon = float(data['longitude'])

    accident_map_filtered = pd.read_pickle('unsafe_roads_last3years.pkl')

    unsafe_roads = []
    for i in range(len(accident_map_filtered)):
        if haversine(lat, lon, accident_map_filtered.iloc[i]['Latitude'], accident_map_filtered.iloc[i]['Longitude']) <= 15:
            unsafe_road = accident_map_filtered.iloc[i]['Accident_Road']
            unsafe_roads.append(unsafe_road)

    if len(unsafe_roads) > 0:
        return {'message': 'Warning: unsafe road(s) ahead', 'unsafe_roads': unsafe_roads}, 200
    else:
        return {'message': 'You are on a safe road!'}, 200

if __name__ == "__main__":
    app.run(debug=True, port=9292)
