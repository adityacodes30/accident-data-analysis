from math import radians, sin, cos, sqrt, atan2
import pandas as pd

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

if __name__ == "__main__":
    accident_map_filtered = pd.read_pickle('unsafe_roads_last3years.pkl')
    lat = float(input('Enter latitude'))
    lon = float(input('Enter longitude'))

    for i in range(len(accident_map_filtered)):
        if haversine(lat, lon, accident_map_filtered.iloc[i]['Latitude'], accident_map_filtered.iloc[i]['Longitude']) <= 15:
            unsafe_road = accident_map_filtered.iloc[i]['Accident_Road']
            print(f'Warning: unsafe road ahead {unsafe_road}')