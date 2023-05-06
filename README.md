# t-senior-backend-challenge

### Senior Backend Coding Challenge for Tessera, containing two repositories:

# 1/ Basic

- The provided code improved
- Coded in JS
- The file is commented and explains the improvements that have been made

# 2/ Practical

- A REST API server created with Nestjs
- Coded in TS
- Stack used:
  - [Nest](https://docs.nestjs.com/) v9.0.0 framework
  - [MySQL](https://dev.mysql.com/) v8.0 database
 (https://typeorm.io/)TypeORM v0.3.15 as ORM
 (https://docs.ethers.org/v5/)Ethers v5.6.4 for web3 utilities
 (https://www.passportjs.org/)Passport v0.6.0 for authentication
 (https://jestjs.io/docs/getting-started)Jest v29.5.0 for tests
 (https://marketplace.visualstudio.com/items?itemName=humao.rest-client)Rest v0.25.1 for quick api testing

<p>
Node.js<br>
 <a href="https://docs.nestjs.com/" target="_blank">Nest</a> v9.0.0 framework<br>
 <a href="https://dev.mysql.com/" target="_blank">MySQL</a> v8.0 database<br>
 <a href="https://typeorm.io/" target="_blank">TypeORM</a> v0.3.15 as ORM<br>
 <a href="https://docs.ethers.org/v5/" target="_blank">Ethers</a> v5.6.4 for web3 utilities<br>
 <a href="https://www.passportjs.org/" target="_blank">Passport</a> v0.6.0 for authentication<br>
 <a href="https://jestjs.io/docs/getting-started" target="_blank">Jest</a> v29.5.0 for tests<br>
 <a href="https://marketplace.visualstudio.com/items?itemName=humao.rest-client" target="_blank">Rest</a> v0.25.1 for quick api testing<br>
</p>

- NestJS integrates libraries such as: Express, Jest, Supertest, Prettier, EsLint. They are already integrated when initiating a new nest project.

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