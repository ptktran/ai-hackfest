from flask import Flask, request, jsonify
import pandas as pd

app = Flask(__name__)

@app.route('/search')
def search():
    query = request.args.get('query')  # get the search query from the request
    
    # read the CSV file into a pandas DataFrame
    df = pd.read_csv('path/to/your/dataset.csv')
    
    # perform the search on the DataFrame
    results = df[df['column_name'].str.contains(query)]
    
    # return the search results as JSON
    return jsonify(results.to_dict(orient='records'))

if __name__ == '__main__':
    app.run()