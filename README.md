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
