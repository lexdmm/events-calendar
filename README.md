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

Now just enter your token in Swagger authorization to be able to use the back-end routes.

![swagger](https://github.com/lexdmm/events-calendar/blob/main/readme/swaggerauth.png)


## Swagger
Come back Swagger [http://localhost:3000/api](http://localhost:3000/api)
Now let's check how each route works.

##### 1 - Users
Service that manipulates users

```bash
{
    "id": "01cf563f-818a-42f6-b146-019382a8f4d3",
    "providerId": "111260650121185072906",
    "name": "Jhon Piper",
    "email": "piper@test.com"
}
```

1 - GET [http://localhost:3000/user](http://localhost:3000/user): returns all registered users. Note that there is no user registration because it happens at login. When logging in, the user is automatically registered.
2 - GET [http://localhost:3000/user/id](http://localhost:3000/user/id): Returns the user by ID.
3 - PATCH [http://localhost:3000/user/id](http://localhost:3000/user/id): Change the user by ID.
4 - DELETE [http://localhost:3000/user/id](http://localhost:3000/user/id): Delete the user by ID.


##### 2 - Event
It is in this service that we will see events and how to manipulate them. The event has two statuses:
- ACTIVE: meaning the event is active;
- CANCELED: means that it has been canceled or its validity has ended.

```bash
{
  "title": "Event title",
  "description": "Event descritption",
  "status": "ACTIVE",
  "startDate": "2023/02/20",
  "endDate": "2023/02/21",
  "startTime": "14:30:00",
  "endTime": "15:30:00",
  "id": "f177c13a-70cc-4a87-9c38-f0c1fe3727e6",
  "isPublic": true
}
```

1 - GET [http://localhost:3000/event](http://localhost:3000/event): returns all registered events. 
2 - GET [http://localhost:3000/event/userid/all](http://localhost:3000/event/userid/all): Unlike the previous service, this one returns all events from the informed user. 
3 - GET [http://localhost:3000/event/id](http://localhost:3000/event/id): Returns the event by ID.
4 - POST [http://localhost:3000/event/id](http://localhost:3000/event/id): Inserts a new event according to the period informed.
5 - PATCH [http://localhost:3000/event/id](http://localhost:3000/event/id): Make changes to the event by ID.
6 - DELETE [http://localhost:3000/event/id/ownerid](http://localhost:3000/event/id/ownerid): Deletes the user by their ID. Only the user who owns the event can delete (ownerid) their event.

##### 3 - Event-Users
This service is specifically used to insert one or more users into an event belonging to another user. In short, it shares the event with users.
A user can have 3 statuses in an event:
- CONFIRMED: means that it is confirmed to the event;
- MAYBE: means that he may participate in the event;
- UNCONFIRMED: means that he will not participate in the event.
```bash
{
  "eventId": "63b7551c-d1f0-4770-a523-44e15d0948ed",
  "userId": "cbe82850-3eaa-4c37-aeb2-700f4ad6c15c",
  "status": "CONFIRMED"
}
```

1 - POST [http://localhost:3000/user/event/add](http://localhost:3000/user/event/add): Adds the user to the event.
2 - PATCH [http://localhost:3000/user/event/update](http://localhost:3000/user/event/update): Change user status to event. 


##### 4 - Auth-Google