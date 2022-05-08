# Bank-transactions RESTful API
[Local Bank service](https://github.com/aaabdyrahmanov/bank-transactions-api/tree/master/services/local-bank) asynchronously synchronizes the [Third-Party Provider](https://github.com/aaabdyrahmanov/bank-transactions-api/tree/master/services/tpp-transaction) to retrieve the user transactions. To get the data in an asynchronous manner, both services use [notification service](https://github.com/aaabdyrahmanov/bank-transactions-api/tree/master/notification) as their communication channel. [API Gateway](https://github.com/aaabdyrahmanov/bank-transactions-api/tree/master/api-gateway) is a mechanism for providing an entry point on both [Local Bank](https://github.com/aaabdyrahmanov/bank-transactions-api/tree/master/services/local-bank) and [TPP Transaction](https://github.com/aaabdyrahmanov/bank-transactions-api/tree/master/services/tpp-transaction) services. Bank Transactions API built following the Test-Driven Approach.

## The Key Project Concepts
We have included the following concepts/guidelines on the multiple service based Bank Transactions API:
- Asynchronous communcation: services communicate in an asynchronous manner using AMQP protocol to exchange messages via a message broker (RabbitMQ).
- API gateway: a mechanism for providing an entry point for clients.
- DevOps: a mechanism for handling continuous integration (CI)
- Loose coupling: services are independent of each other, one can update and deploy each service without affecting the others.
- Single responsibility: each service does only one thing.
- Standard/Synchronous communication: services communicate with each other through rest APIs 

## Getting Started
Following instructions will get you a copy of the project up and running on your local machine for the development and testing purposes.

## Requirements
There are two ways of running the project in your local machine.

1. Using yarn as a package manager:

- Install local [Node.js](https://nodejs.org/) environment
- Install Package manager to manage packages [yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable)
- Install local db [MongoDB](https://docs.mongodb.com/manual/installation)

2. Using docker-compose for running a multi-container Docker apps:

- Install [docker](https://dockr.ly/3wdYnBM) engine considering your distro
- Install [docker-compose](https://dockr.ly/3dCq9BD)

## Setup environment variables
`.env` file in the root of the project need to be created and variables should be inserted as a key/value pairs in the following format of `KEY=VALUE`:
```bash
# move into the root project folder
cd bank-transactions-api

# rename the .env.sample
mv .env.example .env
```

## Running the project
`Project can be executed in the following two ways:`
#### 1. Using [yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable)
Scripts for Installation, development and testing purposes
```bash
# move into the root project folder and go for the specific service
cd bank-transactions-api/services/local-bank

# Install the necessary packages for the specific service
yarn install

# Run the service in development mode
yarn run dev

# Run the service in production mode
yarn run start

# Run test cases
yarn run test

# Collect test coverage
yarn run coverage
```

#### 2. Using [docker](https://dockr.ly/3wdYnBM) and [docker-compose](https://dockr.ly/3dCq9BD)
Commands for running and getting the details of the services.
```bash
# Build and run the services
docker-compose up -d --build
# List containers
docker ps
# Get logs
docker-compose logs
```


## Running Tests

There are two ways of running the tests on your local machine.

1. To run each microservice tests one by one, go to the respective service directory where the package.json is located and run tests.

> For example: to run the tests for the banking-service
>
> ```bash
> cd banking-service
> yarn test
> ```

2. To run all tests for the entire microservices, execute a file 'run_all_tests' which is included test running scripts that has been created in the root directory.

```bash
# run the test cases
./run_all_tests
```

> **NOTE**: If there is `sudo: ./run_all_tests: command not found` notification then make sure that you have set necessary executable permission of a file on your local machine. To do that:

```
# set file execute permission
chmod +x run_all_tests 

# run the test cases
./run_all_tests
```


### Testing Environment
Available endpoints for services and their functions included in the [Documentation](https://github.com/aaabdyrahmanov/bank-transactions-api/tree/master/docs) folder. They can be tested using their belonging Postman Collections. [Postman Collection - Local bank](https://documenter.getpostman.com/view/16055227/Tzz8tHfL) OR [Postman Collection - TPP Transaction](https://documenter.getpostman.com/view/16055227/Tzz8tJ7k)


## Built With
* [Express.js](https://expressjs.com/) - The Node.js web application framework
* [Mongoose](https://mongoosejs.com/) - MongoDB ODM
* [Amqplib](https://www.npmjs.com/package/amqplib) - An AMQP 0-9-1 (RabbitMQ) library.
* [Axios](https://www.npmjs.com/package/axios) - Promise based HTTP client for the server
* [Nodemailer](https://nodemailer.com/about) - Send e-mails from Node.js
* [Swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express) - Library to serve auto-generated swagger-ui generated API
* [Winston](https://github.com/winstonjs/winston) - Logging Library
* [Jest](https://jestjs.io/) - Testing framework
* [Supertest](https://github.com/visionmedia/supertest) - HTTP assertions


## License
Distributed under the MIT License. See [`LICENSE`](https://github.com/aaabdyrahmanov/bank-transactions-api/blob/master/LICENSE.md) for more information.
