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
Nothing above was useful
Used docker instead:
Used the following link
https://graphite.readthedocs.io/en/latest/install.html#docker
Ran the following code:
```
docker run -d\
 --name graphite\
 --restart=always\
 -p 80:80\
 -p 2003-2004:2003-2004\
 -p 2023-2024:2023-2024\
 -p 8125:8125/udp\
 -p 8126:8126\
 graphiteapp/graphite-statsd
 ```
 Used following handy commands:
 To delete the docker created
 ```
 docker system prune
 ```
 It ran after some time, maybe docker takes time to start.
 
 Graphite is up running.
 You can see a memUsage file.
 Graphite does read the data, we have to feed it.
 ```
 echo "test.count 4 `date +%s`" | nc -q0 127.0.0.1 2003
 ```
Metric messages need to contain a metric name, a value, and a timestamp. We can do this in our terminal. Let's create a value that will match our test storage schema that we created. We will also match one of the definitions that will add up the values when it aggregates. We'll use the date command to make our timestamp.

Now, what the problem is our grafana is using sqlite3 database,
we want relational database to use.
Thats why we have to change the ini file of grafana
which is at, and change type of the database.
```
/etc/grafana/grafana.ini
```
First, keep in mind that Graphite-web supports Python versions 2.6 to 2.7 and Django versions 1.4 and above.

# links used
https://www.vultr.com/docs/how-to-install-and-configure-graphite-on-ubuntu-16-04
https://www.digitalocean.com/community/tutorials/how-to-install-and-use-graphite-on-an-ubuntu-14-04-server
https://www.digitalocean.com/community/tutorials/an-introduction-to-tracking-statistics-with-graphite-statsd-and-collectd
https://grafana.com/docs/installation/configuration/
https://matt.aimonetti.net/posts/2013/06/26/practical-guide-to-graphite-monitoring/

