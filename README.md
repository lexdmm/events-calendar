## Description
[Events-Calendar](https://github.com/lexdmm/events-calendar) This application was created so that users can register their events in a calendar. Where each event can have several participating users.

In the application we find 4 modules, they are:
1 - **auth**: responsible for federated authentication with Google;
2 - **user**: module created to register users and manipulate users;
3 - **event**: records calendar events with date and time period;
4 - **event-user**: module that creates the relationship between users and participation in their respective events.

## Requirements 
Framework Backend: [NestJS](https://nestjs.com/)
Node.js: Use the latest stable version of [Node.js](https://nodejs.org/en).
Docker: Use the latest stable version of [Docker](https://www.docker.com/get-started/) to containerize the application.

## Installation Instructions

##### 1 - At the root of the project, create a **.env** file.
The environment variables for the **.env** file are listed here below, but it can also be served in the **.env.template** that are in the project root folder. With the .env file created, install the dependencies in step 2.

*OBS: Google login credentials can be generated as in the example in the link or purchased from the customer.

```bash
# Application
PORT=3000
BASE_URL=http://localhost:3000

# TypeORM
DB_SYNC=true #production false
ENTITIES_AUTO_LOADS=true #production false

# DataBase
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=
DB_PASSWORD=
DB_NAME=db_calendar

# Google
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_URL_ACCOUNT='https://accounts.google.com/o/oauth2'
GOOGLE_URL_API='https://www.googleapis.com/oauth2/v1'
GOOGLE_CALLBACK_URL='http://localhost:3000/auth/callback'
GOOGLE_REDIRECT_URL='http://localhost:3000/auth/profile'
```

##### 2 - Install the dependencies and run.
**1 - With node js installed, also install NestJS**
```bash
# install nestjs
npm i -g @nestjs/cli
```
**2 - Clone this repository to your local environment:**
```bash
git clone git@github.com:lexdmm/events-calendar.git
```
**3 - Access the project directory**
```bash
cd events-calendar
```
**4 - Install dependencies**
```bash
yarn isntall 
# or use npm install
```
**5 - Run docker with the command below to upload the container with the postgress database, the database user and password will be the one you enter in the DB_USERNAME and DB_PASSWORD environment variables**

To upload the container with the database use the command below:
```bash
docker compose up
```
To destroy the container use the command below:
```bash
docker compose up
```
If you don't want to destroy the container and just stop it, use:
```bash
docker compose stop
```
If you don't want to start again use:
```bash
docker compose start
```
**6 - Run the project**
```bash
yarn run start:dev
```
When running the project, the message **"Events calendar service connected on port 3000"** should appear in the console.
![console](https://github.com/lexdmm/events-calendar/blob/main/readme/bashstart.png)

## Login
After completing all the steps above, you will be able to see the **Swagger** documentation with the APIS documentation for use. Access can be done at the url [http://localhost:3000/api](http://localhost:3000/api)

**ATTENTION: You will not be able to access any notes unless you log in. Login is federated to Google.**

As login is done via IDP, **the route cannot be executed directly in Swagger**, the login and logout endpoints are only informative in Swagger.

When logging in, simply enter the login URL in the address bar of your preferred browser.

The login route will be like this in swagger: [http://localhost:3000/auth/login](http://localhost:3000/auth/login)

When accessing the endpoint, the standard Google screen will be available, just log in with your account and follow the Google flow.
![login](https://github.com/lexdmm/events-calendar/blob/main/readme/1login.png)
Then just click on the "Continue" button:
![login](https://github.com/lexdmm/events-calendar/blob/main/readme/2login.png)
When you click continue, just copy and paste the token that appears on your console, **be careful, your token is sensitive information**:
![login](https://github.com/lexdmm/events-calendar/blob/main/readme/token.png)
Now just enter your token in Swagger authorization to be able to use the back-end routes.
![login](https://github.com/lexdmm/events-calendar/blob/main/readme/swaggerauth.png)

## Swagger
Come back Swagger [http://localhost:3000/api](http://localhost:3000/api)

##### 1 - Users