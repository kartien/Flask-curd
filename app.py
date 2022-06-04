from flask import Flask, request
from psycopg2 import connect

app = Flask(__name__)


host = 'localhost'
port = 5432
dbname = 'userdb'
user = 'postgres'
password = 'mysecretpassword'

def get_connection():
    conn = connect(host=host, port=port, dbname=dbname, user=user, password=password)
    return conn

@app.get('/api/users')
def get_users():
    return 'getting users'

@app.post('/api/users')
def create_user():
    print(request.get_json())
    return 'creating users'

@app.delete('/api/users')
def delete_user():
    return 'deleting users'

@app.put('/api/users/1')
def update_user():
    return 'udatting users 1'

@app.get('/api/users/1')
def get_user():
    return 'getting users 1'




if __name__ == '__main__':
    app.run(debug=True)
    
    