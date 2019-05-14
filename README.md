# Project Title

An API for users to list their daily todos.

## Getting Started


### Prerequisites

What things you need to install the software and how to install them

```
Browser, NodeJS and NPM, operating system, Postman, Robomongo, MongoLab free plan. 
```

### Installing

Try installing all the packages from package.json

```
npm init
```
Run the server using 

```
npm start
```

Once server starts running, open the postman and hit requests which can handle following functionalities
1. Signup a user.
```
POST localhost:3000/users
```
2. Login a user.
```
POST localhost:3000/users/login
```
3. Get a logged in user.
```
GET localhost:3000/users/me
```
4. Delete a user.
```
DELETE localhost:3000/users/me/token
```
5. Insert a todo only visible to the user who inserted it.
```
POST localhost:3000/todos
```
6. Delete a todo by id which was inserted by the same user.
```
DELETE localhost:3000/todos/id
```
7. Update a todo by id which was inserted by the same user.
```
PATCH localhost:3000/todos/id
```
8. Get a todo by id which was inserted by the same user.
```
GET localhost:3000/todos/id
```
When user is signed up, the header contains x-auth token, This token is used to manipulate the todos data.
Without it it wont be authenticated.

## Running the tests

Run the tests using

```
npm run test-watch
```
## Functions

1. All the functions are explained in installing section.
2. HTTP codes are thrown like Unauthorized, Not found.
3. The input data is validated.
4. User only get's access to their todos which gives security.
5. MongoDB database is used to store todos and users.

## Deployment

Added on heroku,
just need to replace localhost:3000 with https://still-escarpment-57479.herokuapp.com/
to get it working.

## Built With

* [NodeJS] - Server side
* [ExpressJS] - Middleware
* [Mongoose] - Interact with mongodb database.
* [bcryptjs] - For security.
* [jsonwebtokens] - For authentication.


## For Graphite and Grafana
# Installed graphite using following link 
https://www.vultr.com/docs/how-to-install-and-configure-graphite-on-ubuntu-16-04

# For Grafana installation
https://grafana.com/docs/installation/debian/

After these two you need to start apache server
Installed apache with the following command
```
sudo apt-get install apache2 libapache2-mod-wsgi -y
```
Copying graphite configuration file to apache
```
sudo cp /usr/share/graphite-web/apache2-graphite.conf /etc/apache2/sites-available/
sudo a2dissite 000-default
sudo a2ensite apache2-graphite
```
After that my nginx was running on port 80 I had to kill it using
```
ps -eaf | grep nginx
sudo kill -9 1764
```
See if any process still running
```
sudo netstat -tulpn | grep :80
```
Restart the apache2 
```
sudo systemctl restart apache2
```




# links used
https://www.vultr.com/docs/how-to-install-and-configure-graphite-on-ubuntu-16-04
https://www.digitalocean.com/community/tutorials/how-to-install-and-use-graphite-on-an-ubuntu-14-04-server
https://www.digitalocean.com/community/tutorials/an-introduction-to-tracking-statistics-with-graphite-statsd-and-collectd

