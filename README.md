# t-senior-backend-challenge

### Senior Backend Coding Challenge for Tessera, containing two repositories:

# 1/ Basic

- The provided code improved
- Coded in JS
- The file is commented and explains the improvements that have been made

# 2/ Practical

## A REST API server created with Nestjs that scans Ethereum mainnet blockchain for DAI transfers 
- Coded in TS
## Stack used:
  - [Nest](https://docs.nestjs.com/) v9.0.0 framework
  - [MySQL](https://dev.mysql.com/) v8.0 database
  - [TypeORM](https://typeorm.io/) v0.3.15 as ORM
  - [Ethers](https://docs.ethers.org/v5/) v5.6.4 for web3 utilities
  - [Passport](https://www.passportjs.org/) v0.6.0 for authentication
  - [Jest](https://jestjs.io/docs/getting-started) v29.5.0 for tests
  - [Rest](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) v0.25.1 for quick api testing

- NestJS integrates libraries such as: Express, Jest, Supertest, Prettier, EsLint. They are already integrated when initiating a new nest project.

## How to start ?
  - The server is configured to connect to a MySQL database, thus it needs to be installed in the local environment
  - The server is configured to use an Alchemy provider
  - Install all the dependencies with 
```
npm install
```
  - Copy the .sampleEnv file and rename it as .env, then configure the database params inside the .env file
  - Check or modify the server config params inside the config.ts file located in 'src/config/config.ts' 
  - Start the server: run 
```
npm start
``` 
to start the server, it will create a 'transactions' table inside the database and start filling it on a block basis with the detected DAI transfers
  - Execute tests: run 
```
npm run test:e2e
``` 
to perform the basic tests contained in the file 'app.e2e-spec.ts' located in the test folder (some tests will require that the transactions table contains at least 100 rows)

## Structure of the server code:
- The config folder: contains the config file
- The contracts folder: contains the DAI contract abi
- The modules folder: contains the features modules
- The utils folder: contains formatting functions and mock api keys
- Main app files

- Each feature module contains a main feature.module.ts where we import and export the necessary classes. Then it can contain optional files like feature.service.ts, feature.controller.ts etc.
- The modules:
  - auth: handles the api key requirement for some api endpoints
  - dai: contains the script used to subscribe to new block created event, scan for any DAI transaction and store them inside the database
  - database: used to connect to MySQL database
  - ethereum: handles the web3 functions like new block subscriber
  - requests: define the request sql table, the queries and endpoints (basically saving each request API KEY into the db)
  - throttle: used to globally apply throttling to the server requests, params can be adjusted inside the config.ts file
  - transactions: define the transactions sql table, the queris and endpoints