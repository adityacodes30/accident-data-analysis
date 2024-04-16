import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)

CORS(app)

df = pd.read_pickle("../ml-model/accidentdata.pkl")

def accidents_in_year(year):
    return len(df[df['Year'] == year])

def accidents_in_district(district):
    return len(df[df['DISTRICTNAME'].str.lower() == district.lower()])

@app.route('/query', methods=['POST'])
def get_info():
    if request.method == 'POST':
        print("hi")
        query = request.get_json(force=True)['message']
        print(query)
        if 'accidents in' in query:
            parts = query.split()
            if 'year' in parts:
                year_index = parts.index('year')
                if year_index + 1 < len(parts):
                    year = int(parts[year_index + 1])
                    return jsonify({"result": accidents_in_year(year)})
                else:
                    return jsonify({"result": "Year not specified in the query."})
            elif 'district' in parts:
                district_index = parts.index('district')
                if district_index + 1 < len(parts):
                    district = parts[district_index + 1]
                    return jsonify({"result": accidents_in_district(district)})
                else:
                    return jsonify({"result": "District not specified in the query."})
        return jsonify({"result": "Sorry, I couldn't understand your query."})


# query = "number of accidents in the year 2016"
# result = get_info(query)
# print(result)

# query = "number of accidents in the district Bagalkot"
# result = get_info(query)
# print(result)

if __name__ == "__main__":
    app.run(port=8765)
