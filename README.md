# Parking Lot API 
- A parking api to park cars in specified parking slots

# How to go up and running

- ### Local env
    1. Clone this repo
    2. go to folder
    
    ```sh
    cd parking-lot
    ```

    3. **Important step**: In `.env` file define Parking lot size
    ```
    PARKING_LOT_SIZE=20
    ```
    (By default it is 10)

    4. install packages

    ```sh
    npm install
    ```

    5. run jest test cases

    ```sh
    npm run test
    ```

    6. run the server

    ```sh
    npm run start
    ```
    - once started you can visit [http://localhost:8080](http://localhost:8080)

- ### Docker

```sh
docker build -t parking .
```

## API Endpoints

|       Endpoint      | Method |          Payload          |         Response        |                             Requirements                          |
| ------------------- | ------ | ------------------------- | ----------------------- | ----------------------------------------------------------------- |
| /api/v1/park        | POST   | { car_number: "A553" }    | { slot_id, car_number } | `car_number` must have first letter as alphabet and all uppercase |
| /api/v1/unpark/{slot_id} | DELETE | None                 | { message }             | None |
| /api/v1/get-info    | GET | Query: `?slot_number=` or `?car_number=` or both | { slot_id, car_number } | Either one of the query param is required |


## Project Structure

- **app.js** - Main express app initialization
- **server.js** - Spins the server
- **controllers**
    - **Car.js** - Express request handlers for parking, unparking and information
    - **Error.js** - ErrorHandler for Express
    
- **lib**
    - **ParkingLot.js** - State handler containing essential functions such as `park` `unpark` and information fetching methods.
    - **Validators.js** - Validation lib to use across the project
    = **error.js** - API specific error classes and definitions

- **routes**
    - **v1/car** - route definitions to access api and connects them to controllers

- **services**
    - **parkingLot.js** - inits the parking lot with given size from environment variable `PARKING_LOT_SIZE` (default is 10)

- **tests** - test cases written in __jest__ use `npm run test` to check

- **utils** 
    - **catchAsync.js** - Controller handler to catch async methods and pass errors to errorHandler

- **.env** - Environment variables to use throughout the server
- **routes.js** - Indexes all routes which are used in api

## Author
Swapnil Soni (@SwapnilSoni1999) for Nas Academy Hackathon.
