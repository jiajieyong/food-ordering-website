## Getting started
### Dependencies
- Node.js 20.12.0 or later
- Package manager (npm, yarn)
- Docker (to execute the [dockerfile](/backend/Dockerfile)) or Java (to execute the [jar](/backend/xyz-company-0.0.1-SNAPSHOT.jar))
- Postman (optional)
- Chrome browser
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
  - A list of queueNum return from the backend (when multiple orders are made)
#### Queue
  - Result received from the backend
  - The status of the fetch request
  - Any errors from the backend

Each of the slice contains their own actions and dispatches for state update logic, making it easier to trace why and how the state has changed. It also provides the whole app the ability to access the state in any component required

## React Hook Form
The form component is designed to looks like a table of order rows that is added to the cart from the menu page. As such, the UI component of choice to design the form component is Table instead of the Form component provided by shadcn UI library. However, the form still uses React Hook Form APIs, notably the useFieldArray since the order rows can be group into an array. This helps with the faciliation of the deletion of order rows by simply removing the index of the deleted row from the Form. 

The order state is used to populate the defaultValues of the form. Since the form state and the order state are decoupled, each time an action on the form is done, both the form and the order state need to update respectively. 

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

## Outstanding
- Accessibility and responsiveness of the web page was not properly implemented and tested, in addtion to ensuring that it is working across different browsers
- Storybook was initially setup to build and test UI components and pages in isolation. The end goal was to for it to serve as a testing playground and documentation of the styles, variants, layouts of the application design. Due to time constraint, the idea was left abandoned and deprioritized
