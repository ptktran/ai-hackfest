from flask import Flask, render_template, request, jsonify
from script import a, recommend_songs
from flask_cors import CORS

app = Flask(__name__, static_folder='static')
CORS(app)

# ignore this never call api endpoint request to / 
@app.route('/')
def serve_react_app():
    return app.send_static_file('index.html')

# connect backend to database to store information about user's selected songs and recommendations 

@app.route('/api/hello')
def getData():
    return {"message": "Hello, world!"}

# send back song recommendations from jupyter notebook script 
# @app.route('/recommend', methods=['POST'])
# def recommend_user_songs():
#     data = request.json
#     result = recommend_songs([data])
#     return result 

if __name__ == '__main__':
    app.run()

