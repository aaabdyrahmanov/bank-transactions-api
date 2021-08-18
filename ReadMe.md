# Bank-transactions RESTful API - Setup Guide
Synchronizes the Third-Party Provider to retrieve the user transactions/balances and save the data on MongoDB with the help of CRUD operations. Banking-service is built following the Test-Driven Approach.

## Getting Started
Following instructions will get you a copy of the project up and running on your local machine for the development and testing purposes.

## Requirements
Project can be executed in the following way:
#### Using yarn as a package manager:
- Install local [Node.js](https://nodejs.org/) environment
- Install Package manager to manage packages [yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable)
- Install local db [MongoDB](https://docs.mongodb.com/manual/installation)

## Setup environment variables
Go into the root folder:
```bash
# move into the root project folder
cd bank-transactions-api
```

Create a `.env` file in the root of the project and insert your key/value pairs in the following format of `KEY=VALUE`:
#### `nano .env`
```bash
NODE_ENV=development
HOST=localhost
PORT=3000
TPP_API_URL=http://tpp-service-api.com
DB_URL=mongodb://127.0.0.1/banking-service
```

### Running the project with package manager
Scripts for Installation and development/testing
```bash
# move into the root project folder
cd bank-transactions-api

# move into the banking-service folder
cd banking-service

# Install the necessary dependencies
yarn install

# Running the project in development mode
yarn run dev

# Running the project in production mode
yarn run start

# Running the test cases in test mode
yarn run test

# Collecting the test coverage information
yarn run coverage
```

### Running TPP-Service as a mock server with OpenAPI v3.x 
1) Using [Mockoon](https://mockoon.com):
- Download the application considering your OS
- Import Swagger [tpp-service/tpp-service-docs.json](https://github.com/aaabdyrahmanov/bank-transactions-api/blob/master/tpp-service/tpp-service-docs.json) OpenAPI documentation and serve it as a mock server [Import](https://mockoon.com/docs/latest/import-export-data)
- After starting the server as, make sure you have edited the TPP_API_URL in your environment variables.
2) Using [prism](https://github.com/stoplightio/prism) which uses a set of packages for API mocking
- Install [prism](https://www.npmjs.com/package/@stoplight/prism-cli) globally by using a package manager in your local environment
- Run the following 
```bash
# tpp-service documenantaion path
bank-transactions-api/tpp-service/tpp-service-docs.json

# print your current working directory according to your OS
# concat tpp-service documentation address
prism mock /YOUR_LOCAL_PATH/bank-transactions-api/tpp-service/tpp-service-docs.json
```

NOTE: By default prism starts on http://127.0.0.1:4010 which is set as a default on your configuration files. Thus, if you are running the server using a prism, there is no need to include it on your .env file. 

### Testing Environment
Available banking-service enpoints can be tested using the [Postman Collection](https://www.getpostman.com/collections/0a6e8b7aa1e97639dd90) which is prepared considering the available API calls.

## License
Distributed under the MIT License. See [`LICENSE`](https://github.com/aaabdyrahmanov/bank-transactions-api/blob/master/LICENSE.md) for more information.
