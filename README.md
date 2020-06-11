# order-Management

A simple Rest API for order management

## Technologies Used
- Node.js 
- MongoDB 
- Express.js

## Testing Tools
- Mocha 
- Chai

## Installations

You need to have Node and NPM installed on your computer.

 Run the command below

  npm install

Start your node server
  run the command below
   npm start
  
  Use `http://localhost:8080` as base url for endpoints

## API Endpoints

| METHOD | DESCRIPTION                             | ENDPOINTS                 |
| ------ | --------------------------------------- | ------------------------- |
| POST   | Create a order                          | `/api/v1/orders`          |
| GET    | Get all the orders                      | `/api/v1/orders`          |
| PUT    | Update the details of a order           | `/api/v1/orders/:orderid` |
| GET    | Get a particular order                  | `/api/v1/orders/:orderid` |
| DELETE | Delete a order                          | `/api/v1/orders/:orderid` |


## Tests

Run test for all endpoints
  run the command below
  npm run test
 
