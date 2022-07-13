# Flask crud 
# Recomend Configuration for database  local 
```bash
host = 'localhost'
port = 5432
dbname = 'dbstudent'
user = 'postgres'
password = 'mysecretpassword'
```
# Use Docker to create database
```bash
sudo docker run --name some-postgres -e POSTGRES_USER=your-user -e POSTGRES_PASSWORD=mypassword -p 5432:5432 -d postgres

# create data on docker 
sudo docker exec -it some-postgres bash 

# Login in postgres 
psql -U your-user --password 

# create data on postgres
CREATE DATABASE <your-database>
```
# Screen the project 

![img](/docs/scren1.png)

![img](/docs/scren2.png)

