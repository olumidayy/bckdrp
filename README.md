# bckdrp
#### A [GraphQL](https://graphql.org/) API using [Apollo GraphQL](https://www.apollographql.com/) and [Express](https://expressjs.com/)

# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version 8.0.0


# Getting started
- Clone the repository
```
git clone  https://github.com/olumidayy/bckdrp.git
```
- Install dependencies
```
cd bckdrp
npm install
```
- Build and run the project
```
npm start
```
  Navigate to `http://localhost:4000/graphiql`


## Project Structure
The folder structure of this app is explained below:

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **node_modules**         | Contains all  npm dependencies                                                            |
| **src**                  | Contains  source code that will be compiled to the dist dir                               |
| **src/api**              | The GraphQL parts and the handler for redirects
| **src/config**           | The configurations to be used across the app.  
| **src/database**         | The database config for this app, using [Knex](http://knexjs.org/) query builder
| **src/services**         | Contains the services to be used across the app like saving or retrieving data             
| **src/app.js**           | The file used to configure our app with the necessary routes and/or middlewares  |
| **src/server.js**        | The entry point of the app where our server resides |
| **tests**                | Conatins the tests for this API                          |
| .env                     | The file that contains all our environment varibales. The variables here are the test/local ones.    
| package.json             | Contains npm dependencies as well as build-scripts   |                                   |

## Building the project

### Running the build
All the different build steps are orchestrated via [npm scripts](https://docs.npmjs.com/misc/scripts).
Npm scripts basically allow us to call (and chain) terminal commands via npm.

| Npm Script | Description |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| `start`                   | Runs full build and runs node on dist/index.js. Can be invoked with `npm start`                  |
| `dev`                     | Runs full build before starting all watch tasks. Can be invoked with `npm dev`                                         |
| `test`                    | Runs build and run tests using mocha        |
| `migrate`                 | Runs migrations for the local database      |
| `migrate-prod`            | Runs migrations for the production database      |



## Testing
The tests are  written with [Jest](https://jestjs.io/) and [Supertest](https://www.npmjs.com/package/supertest)

```

"supertest": "^6.1.3",
"jest": "^26.6.3"

```
### Running tests using NPM Scripts
````
npm test

````
Test files are created under test folder.

