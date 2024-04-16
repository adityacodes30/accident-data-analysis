import math
import pandas as pd
import re
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.decomposition import PCA
from sklearn.cluster import KMeans
import numpy as np
from sklearn.metrics import silhouette_score
import random

from flask import Flask, request, jsonify
app = Flask(__name__)


def get_clusters(unit_or_dist_name):

  le_Accident_Spot = LabelEncoder()
  unit_or_dist_name['Accident_Spot'] = le_Accident_Spot.fit_transform(unit_or_dist_name['Accident_Spot'])

  le_Accident_SubLocation = LabelEncoder()
  unit_or_dist_name['Accident_SubLocation'] = le_Accident_SubLocation.fit_transform(unit_or_dist_name['Accident_SubLocation'])

  le_Road_Type = LabelEncoder()
  unit_or_dist_name['Road_Type'] = le_Road_Type.fit_transform(unit_or_dist_name['Road_Type'])

  scaler = StandardScaler()
  X_scaled = scaler.fit_transform(unit_or_dist_name)

  pca = PCA(n_components=2)
  pca_scaled = pca.fit_transform(X_scaled)

  k_max = 0
  silhouette_max = 0
  for k in range(2, 8):
    kmeans = KMeans(n_clusters=k, random_state=0, n_init="auto").fit(unit_or_dist_name)
    clusters = kmeans.labels_
    silhouette_avg = silhouette_score(unit_or_dist_name, clusters)
    if(silhouette_avg > silhouette_max):
      silhouette_max = silhouette_avg
      k_max = k

  kmeans = KMeans(n_clusters=4, random_state=0, n_init="auto").fit(unit_or_dist_name)
  clusters = kmeans.labels_

  pca_transformed_data = pca.transform(X_scaled)
  cluster_labels = clusters

  cluster_centroids_pca = []
  cluster_centroids_original = []
  cluster_centroids_unscaled = []

  for label in np.unique(cluster_labels):
      cluster_points = pca_transformed_data[cluster_labels == label]
      cluster_centroid = np.mean(cluster_points, axis=0)
      cluster_centroids_pca.append(cluster_centroid)

      cluster_centroid_original = pca.inverse_transform(cluster_centroid.reshape(1, -1))
      cluster_centroids_original.append(cluster_centroid_original[0])

      cluster_centroid_unscaled = scaler.inverse_transform(cluster_centroid_original.reshape(1, -1))
      cluster_centroids_unscaled.append(cluster_centroid_unscaled[0])
      
      encoders = [le_Accident_Spot, le_Accident_SubLocation, le_Road_Type]

      decoded_data = []
      for encoded_values in cluster_centroids_unscaled:
          decoded_values = []
          decoded_values.append(int(np.round(encoded_values[0])))
          for i, encoder in enumerate(encoders):
                val = int(np.floor(encoded_values[i+1]))
                try:
                  decoded = encoder.inverse_transform([val])
                except:
                   decoded = encoder.inverse_transform([val-1])
                decoded_values.append(decoded[0])
          decoded_data.append(decoded_values)
  return decoded_data, cluster_centroids_unscaled, encoders, scaler

def eucledian(a, b):
  return math.sqrt(sum((x-y)**2 for x, y in zip(a, b)))

def fit_in_cluster(unit_or_dist_name, new_data):
  decoded_data, cluster_centroids_unscaled, encoders, scaler = get_clusters(unit_or_dist_name)
  min_eucledian = np.inf
  indx = -1
  i = 0
  new_data['Accident_Spot'] = encoders[0].fit_transform(new_data['Accident_Spot'])
  new_data['Accident_SubLocation'] = encoders[1].fit_transform(new_data['Accident_SubLocation'])
  new_data['Road_Type'] = encoders[2].fit_transform(new_data['Road_Type'])

  for cluster in cluster_centroids_unscaled:
    euc_dist = eucledian(new_data.iloc[0].to_numpy(), cluster)
    min_eucledian = min(euc_dist, min_eucledian)
    if(min_eucledian == euc_dist):
      indx = i
    i+=1
  return decoded_data[indx]

# if __name__ == "__main__":
#     accidentdata = pd.read_pickle('./accidentdata.pkl')

#     for unit in accidentdata['UNITNAME'].unique():
#         unit2 = re.sub(r'\W+', '_', unit)
#         exec(f"{unit2} = accidentdata[accidentdata['UNITNAME'] == '{unit}'].copy()")
#         exec(f"{unit2} = {unit2}.drop(['DISTRICTNAME','UNITNAME', 'Severity', 'Road_Character', 'Year'], axis=1)")

#     for district in accidentdata['DISTRICTNAME'].unique():
#         district2 = re.sub(r'\W+', '_', district)
#         exec(f"{district2} = accidentdata[accidentdata['DISTRICTNAME'] == '{district}'].copy()")
#         exec(f"{district2} = {district2}.drop(['DISTRICTNAME','UNITNAME', 'Severity', 'Road_Character', 'Year'], axis=1)")

#     decoded_data, _, _, _ = get_clusters(Yadgiri_Traffic_Police_Station)
#     print(decoded_data[random.randint(0, len(decoded_data)-1)])

#     new_data = pd.DataFrame({'Month': [8],
#                          'Accident_Spot': ['Narrow road'],
#                          'Accident_SubLocation': ['Near Hospital'],
#                          'Road_Type': ['Forest Road']})
#     ans = fit_in_cluster(Yadgiri_Traffic_Police_Station, new_data)
#     print(ans)

@app.route('/predict', methods=['POST'])
def predict():
  data = request.get_json()
  new_data = pd.DataFrame(data)
  accidentdata = pd.read_pickle('./accidentdata.pkl')
  for unit in accidentdata['UNITNAME'].unique():
    unit2 = re.sub(r'\W+', '_', unit)
    exec(f"{unit2} = accidentdata[accidentdata['UNITNAME'] == '{unit}'].copy()")
    exec(f"{unit2} = {unit2}.drop(['DISTRICTNAME','UNITNAME', 'Severity', 'Road_Character', 'Year'], axis=1)")
  for district in accidentdata['DISTRICTNAME'].unique():
    district2 = re.sub(r'\W+', '_', district)
    exec(f"{district2} = accidentdata[accidentdata['DISTRICTNAME'] == '{district}'].copy()")
    exec(f"{district2} = {district2}.drop(['DISTRICTNAME','UNITNAME', 'Severity', 'Road_Character', 'Year'], axis=1)")
  decoded_data, _, _, _ = get_clusters(Yadgiri_Traffic_Police_Station)
  return jsonify(decoded_data[random.randint(0, len(decoded_data)-1)])


@app.route('/cluster', methods=['POST'])
def cluster():
  data = request.get_json()
  new_data = pd.DataFrame(data)
  accidentdata = pd.read_pickle('./accidentdata.pkl')
  for unit in accidentdata['UNITNAME'].unique():
    unit2 = re.sub(r'\W+', '_', unit)
    exec(f"{unit2} = accidentdata[accidentdata['UNITNAME'] == '{unit}'].copy()")
    exec(f"{unit2} = {unit2}.drop(['DISTRICTNAME','UNITNAME', 'Severity', 'Road_Character', 'Year'], axis=1)")
  for district in accidentdata['DISTRICTNAME'].unique():
    district2 = re.sub(r'\W+', '_', district)
    exec(f"{district2} = accidentdata[accidentdata['DISTRICTNAME'] == '{district}'].copy()")
    exec(f"{district2} = {district2}.drop(['DISTRICTNAME','UNITNAME', 'Severity', 'Road_Character', 'Year'], axis=1)")
  ans = fit_in_cluster(Bagalkot, new_data)
  return jsonify(ans)

if __name__ == "__main__":
  app.run()
