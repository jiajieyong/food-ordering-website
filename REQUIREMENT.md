# Food Ordering Website

## Table of Contents

- [Sypnosis](#Sypnosis)
- [Requirements](#requirements)
- [Stretch goals](#stretch-goals)
- [Getting Started](#getting-started)
- [Preferred Tech Stacks](#preferred-tech-stacks)
- [Deploy on Vercel](#deploy-on-vercel)

## Sypnosis

 You are a software developer in charge of building a simple web page for a food ordering company.  Your previous teammate has fixed up a basic structure of the website in a NextJS project before requiring to take an urgent leave.  She requested you to help finish up the webpages based on the shared requirement in this README.md below.  She mentions that should any information require clarity you can email her but you are expected to satisfy the requirements and make technical considerations while developing the website.  
 
 She shared that the team has already prepared the backend application to support the website.  They can be run through either of the 2 ways:
 - Running the jar file provided in the sample repository, which when run will be running on localhost:8080
 - Using docker to download the docker image in the provided docker repository and run the image locally exposing the 8080 port

 You are expected to also add in unit tests where applicable.  You are also expected to have proper error handling especially on each pages with the API requests being made.  Do consider the user experience when designing the web pages.

 You are expected to create a readme document README.md to instruct how to run your application locally and to document any considerations being made for each requirement.  Do upload your repository to your own personal Github/Gitlab repository and make it public for us to assess.  Do ensure that your uploaded application can be pulled and run locally before submission.

## Requirements

1. Create a menu page in the given [page.tsx](/src/app/menu/page.tsx). This page will show food images with a dropdown filter based on the following:

   a. Able to filter by type (dropdown with 4 options: All, Rice, Noodle, Side dishes)

   #### Food listing

   b. Each image to show with the respective item name in the following:

   - [Bee hoon](/src/lib/images/noodle/beehoon.jpg)
   - [Laksa](/src/lib/images/noodle/laksa.jpg)
   - [Lor mee](/src/lib/images/noodle/lormee.jpg)
   - [Japanese ramen](/src/lib/images/noodle/ramen.jpg)
   - [Wagyu don](/src/lib/images/rice/beefdon.jpg)
   - [Chicken rice](/src/lib/images/rice/chickenrice.jpg)
   - [Pork cutlet rice](/src/lib/images/rice/cutletrice.jpg)
   - [Uncle Roger's fried rice](/src/lib/images/rice/friedrice.jpg)
   - [8 Dumplings](/src/lib/images/sideDish/dumpling.jpg)
   - [Fried eggplants](/src/lib/images/sideDish/friedeggplant.jpg)
   - [Cheese fries](/src/lib/images/sideDish/fries.jpg)
   - [Calamari](/src/lib/images/sideDish/calamari.jpg)
   - [Satay](/src/lib/images/sideDish/satay.jpg)

   c. when you select a filter option, it should filter only those images that belong to that folder

   d. to show the images in 4-columns layout

2. To implement the missing route handlers to the navigation bar on the [layout.tsx](/src/app/layout.tsx) file.

   a. `/menu` to display [menu](/src/app/menu/page.tsx)

   b. `/queue` to display [queue](/src/app/queue/page.tsx)

   c. `/form` to display [order form](/src/app/order/page.tsx)

3. Create a form in the given [page.tsx](/src/app/order/page.tsx) to submit food orders with the following information:

   a. item name (dropdown based on the food item name listed under [1b](#food-listing))

   b. quantity (numbers only, max 5)

   c. declaration checkbox with the statement "I agree I have no food allergy." (must be ticked by user to proceed to submit form)

   To implement the following additional requirements as well:

   - maximum of 2 food items to be submitted in each form

   - basic fields validation required to be implemented (you can propose appropriate validations for each field)

   - a submit button at the bottom of the form to send the request

   - to call `POST '/order'` to send out the order and receive a queue number (refer to [swagger](swagger.yaml) on the expected request and response payload)
      - the item name is case-sensitive and must match exactly as those provided in the [1b](#food-listing)

   - upon successful submission request, to show a green banner at the top of the order page with the responded queue number, and with all the form fields cleared

4. Create a view queue page in the given [page.tsx](/src/app/queue/page.tsx) with the following:

   a. to show 2 components: one for "Collection" component and a "Preparing" component on the same page

   b. to display the list of queue numbers accordingly from `GET '/queue-numbers'` (refer to [swagger](swagger.yaml) on the expected request and response payload)

   c. to create a refresh button to simulate moving of the queue by fetching from `GET '/queue-numbers'`

   - for simplicity, each time this api is called, it will push in the next order number from "Preparing" to "Collection", and there will always be a max of only 1 order number in "Collection" at any one time.

## Stretch Goals

- to prettify the UI e.g. colour schemes etc.

## Getting Started

First, install all dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

List of pages given:

- http://localhost:3000/menu
- http://localhost:3000/order
- http://localhost:3000/queue

## Preferred Tech Stacks

- [Next.js](https://nextjs.org/docs) written in typescript
- [React Hook Form](https://react-hook-form.com/)
- [Zod or Yup form validation](https://github.com/react-hook-form/resolvers)
- [UI library](https://ui.shadcn.com/)
- [Tailwindcss](https://tailwindcss.com/)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
