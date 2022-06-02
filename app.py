from flask import Flask
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


@app.get('/')
def home():
    conn = get_connection()
    cur = conn.cursor()
    
    result = cur.execute("SELECT 1 + 1")
    print(result)
    return "Hello world"



if __name__ == '__main__':
    app.run(debug=True)
    
    