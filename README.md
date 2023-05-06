# t-senior-backend-challenge

### Senior Backend Coding Challenge for Tessera, containing two repositories:

# 1/ Basic

- The provided code improved
- Coded in JS
- The file is commented and explains the improvements that have been made

# 2/ Practical

## A REST API server created with Nestjs
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
  - Run 
```
npm start
``` 
to start the server, it will create a 'transactions' table inside the database and start filling it on a block basis with the detected DAI transfers
  - Run 
```
npm run test:e2e
``` 
to perform the basic tests contained in the file 'app.e2e-spec.ts' located in the test folder (some tests will require that the transactions table contains at least 100 rows)

- Structure of the server folder:
<p>"src" folder containing the main app and features modules<br>
<p>"test" folder containing basics tests => npm run test:e2e 

- The server contains does the following:
<p>
1/ Stores the latest DAI transactions into a DB (MySQL) on a continuous basis (block per block):<br>
<p>User should provide MySQL database params inside a .env file (see .sampleEnv file included in the root folder of the project)<br>
<p>The server will create a "transactions" table at start
<p> and execute a script that fetch <br>
Have endpoints that returns the following data (from the DB):<br>
- Last 100 DAI transactions (add pagination, if possible)<br>
- Transactions by sender or recipient<br>
- Address' DAI balance (sender or recipient) from indexed transactions / aggregated data only<br>
Limits the API usage with API key<br>
Logs API request<br>
Include a throttler<br>
Execute basics tests<br>
Store the requests into a sql "requests" table<br> 
</p>