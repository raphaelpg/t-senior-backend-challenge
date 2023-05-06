# t-senior-backend-challenge (private repository)

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
  - The server is configured to use an Alchemy provider, so an API KEY need to be provided in the .env file
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
  - Testing: run 
```
npm run test:e2e
``` 
to perform the basic tests contained in the file 'app.e2e-spec.ts' located in the test folder (some tests will require that the transactions table contains at least 100 rows)

## Structure of the server code:
- The config folder: contains the config file
- The contracts folder: contains the DAI contract abi
- The modules folder: contains the features modules (more details below)
- The utils folder: contains formatting functions and mock api keys
- Main app files

- Each feature module contains a main feature.module.ts where we import and export the necessary classes. Then it can contain optional files like feature.service.ts, feature.controller.ts etc.
- The modules:
  - auth: handles the api key requirement for some api endpoints
  - dai: contains the script used to subscribe to new block created event, scan for any DAI transaction and store them inside the database
  - database: used to connect to MySQL database
  - ethereum: handles the web3 functions like new block subscriber
  - requests: define the request sql table, the bonus queries and endpoints (basically saving each request API KEY into the db)
  - throttle: used to globally apply throttling to the server requests, params can be adjusted inside the config.ts file
  - transactions: define the transactions sql table, the queries and endpoints

## Choices:
I have more experience using Nodejs and Express, but as I was already learning to use Nestjs, I decided to use it for this challenge so I can improve my skills at the same time. This is my second time using Nestjs and even if I was not so kean on using it at the beginning, mainly because it's oop and I prefer functionnal programming, I have a better understanding of it now. In my opinion the main interest resides that it eases the deployment of new features, especially new endpoints, in an isolated way.

I have chosen to use a MySQL database because I saw that it was in the Tessera job description, so it would be more practical for testers and also for me to start using it too. I used PostGres in my previous projects but it's very similar. I also know SQL but I couldn't create two of the requested queries in the bonus.

I started to look at the challenge on Monday 01/05/23 and finished it on Saturday 06/05/23, and I have used Git Copilot VS code extension.
If I have to improve the code now, I would try to create my own auth api key module instead of using the passport library.
I would also improve the tests, mainly with mockdata and in memory storage so the tester won't need to fill it's db with 100 lines.
I would include the requests params inside the requests table. And improve the logger module.
I already knew how to get this type of onchain data, so I mainly learn about the Nest part, but the challenge is nice.

## Contact:
I'm Raphael Pinto, I'm a developper since 2019 and I'm currently based in Madrid, Spain.
- [LinkedIn](https://www.linkedin.com/in/raphael-pinto-gregorio-660b2579/)
- My email: raphael_pinto@outlook.com