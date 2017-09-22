# To-Do List

I created a to-do list that can be used to track things that you may need to get done.

## Built With

SEAN stack (PostgreSQL, Express, AngularJS, and node.js).

## Getting Started

Download file, enter sql queries into PostgreSQL, enter npm install in the terminal, and npm start to run on a local host,

### Prerequisites

- [Node.js](https://nodejs.org/en/)


### Installing

Steps to get the development environment running.

Database Name: antares

CREATE TABLE todolist(
	id SERIAL PRIMARY KEY,
	task VARCHAR (1000) NOT NULL,
	completionstatus VARCHAR (10) NOT NULL
);

### Completed Features

- [x] Basic to-do list

### Next Steps

- [ ] Add input fields such as deadline, etc. 


## Authors

Anne Kennedy
