# Interview Scheduler

## Description

 A interview scheduling app created with React on the front end, and with a PSQL server in the back.

 Make appointments in available time slots, or edit/delete existing interviews at your hearts content!

 (Data/names are spoofed and have no real meaning)

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
## Running Cypress 

```sh
cypress open -P .
```

## Example!

![](scheduler.gif)

## Data
 We get our appointment/interview data from a scheduler API provided by Lighthouse Labs. 

 -> I've uploaded a slightly modified duplicate to Heroku, it is possible to retrieve data from these end points should you not have access to the original API.

 ## https://interview-scheduler-2020.herokuapp.com/api/days

 ## https://interview-scheduler-2020.herokuapp.com/api/appointments

 ## https://interview-scheduler-2020.herokuapp.com/api/interviewers