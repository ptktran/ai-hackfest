from flask import Flask, render_template, request 
from script import a, recommend_songs

app = Flask(__name__, static_folder='static')

# ignore this never call api endpoint request to / 
@app.route('/')
def serve_react_app():
    return app.send_static_file('index.html')

# connect backend to database to store information about user's selected songs and recommendations 





# send back song recommendations from jupyter notebook script 

@app.route('/recommend/data/<param1>/<param2>')
def recommend_user_songs(param1, param2):
    result = recommend_songs([{'name': {param1}, 'year':{param2}}])
    return result 

if __name__ == '__main__':
    app.run()