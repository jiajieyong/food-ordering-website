## Getting started
### Dependencies
- Node.js 20.12.0 or later
- Package manager (npm, yarn)
- Docker (to execute the [dockerfile](/backend/Dockerfile)) or Java (to execute the [jar](/backend/xyz-company-0.0.1-SNAPSHOT.jar))
- Postman (optional)
- macOS, Windows

### Installing
- Clone this repository
- Run the following to install all dependencies:
```bash
npm install
# or
yarn install
```

### Executing the program
- Run the following command to start the development server:
```bash
npm run dev
# or
yarn dev
```
- Open the browser and go to [http://localhost:3000](http://localhost:3000)
- To launch the backend that host the API endpoints, go into the /backend folder and run the following command
```bash
docker build -t <image_name>
docker run -p 8080:8080 <image_name>
```
- Alternatively, if Java is installed, confirm the computer's PATH variable includes Java's \bin directory, double-click the Jar file if auto-run has been configured else run the following:
```bash
java -jar xyz-company-0.0.1-SNAPSHOT.jar
```

### Running tests
```bash
npm run test
#or
yarn run test
```

## Redux Toolkit
A store is configured that tracks the following state:
```
export const store = configureStore({
    reducer: {
        order: orderReducer,
        menuItem: menuItemReducer,
        queue: queueReducer,
    }
});
```
#### MenuItems
  - List of menu items to display on the menu page
  - List of menu items to display on the select dropdown in the orders page when the cart is empty
#### Orders
  - ID of the menu items have been added to the cart 
  - The quantity of each item added
  - The POST status when sending orders to backend
  - The queueNum that is return from the backend
#### Queue
  - Result received from the backend
  - The status of the fetch request
  - Any errors from the backend


## Gotcha
During the implementations of data fetching from the backend, the CORS preflight channel did not succeed probably due to the backend not whitelisting certain endpoints. To circumvent the preflight, nextJs server is used as a proxy server to change the destination URL to localhost:3000
```
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/queue-numbers",
                destination: "http://localhost:8080/queue-numbers"
            },
            {
                source: "/order",
                destination: "http://localhost:8080/order"
            }
        ]
    },
    reactStrictMode: false,
};
```
Any calls made to port 8080 will be redirected to 3000, so effectively `http://localhost:8080/queue-numbers` can be accessed from the browser as `http://localhost:3000/queue-numbers`. This has an unintended collision when the POST to `http://localhost:8080/order` got changed to `http://localhost:3000/order`. This will cause the current page rendered via the `order` route to be sent as the body request. Such as, a decision was made to change the page route to `orderForm` instead to avoid this collision.
