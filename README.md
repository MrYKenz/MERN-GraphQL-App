# MEARN Stack App with GraphQL API <img src="https://user-images.githubusercontent.com/841294/53402609-b97a2180-39ba-11e9-8100-812bab86357c.png" height="50" /> <img src="https://github.com/graphql/graphql-spec/blob/master/resources/GraphQL%20Logo.svg" height="50" />

This is a skeleton/boilerplate full stack MERN application with user generated posts stored in a DB, external API data fetched incrementally using a cronjob temporarily stored in Redis and authentication using JWTs. The frontend is created in React with SemanticUI used for the design (no custom CSS). 

- Database: 
    - MongoDB: Users and Client created posts
    - Redis: Job data fecthed from external APIs (incrementally using Cron)
- Back-end API: Apollo Server (built on Express) with Node.js
- Front-end: React with Apollo Client

### Details
Authentication using JSON Web Tokens and Apollo Client Cache to temporarily store fetched results on frontend. Built with React Hooks (including apollo hooks) and the Semantic UI Library. Cron timed jobs for workers with axios get requests on backend to fetch external data from APIS incrementally (every day). Redis to temporarily store fetched API data on backend in seperate environment.

### :rocket: Deployed 
[**CLICK FOR DEMO**](https://londondevjobs.netlify.com/)

The project can be viewed on Netlify where the front-end has been deployed [![Netlify Status](https://api.netlify.com/api/v1/badges/5bd9efa7-56ac-4264-abbe-1f14397307cc/deploy-status)].

The back-end is deployed to Heroku with NODE_ENV set to development so graphql playground can be used:
[Backend API](https://londondevjobs.herokuapp.com/)
As Redis on Heroku requires a signup I have changed the code to use fs read and write files instead.

### Application Diagram
<p align="center"><img src="https://github.com/MrYKenz/MERN-GraphQL-App/blob/master/app_layout.jpg"/></p>

### :memo: To-do: 
- ~~Create post component with authentication if jwt expired~~
- make createPost's useMutation update display straightaway - apollo incache memory
- ~~Cron timed jobs for workers~~
- ~~Worker with axios get request on backend to fetch external data from APIS~~
- ~~Async functions for Redis to temp store API fetched data on timed cronjob~~
- Other Workers and have multiple GQL Queries in Jobs and JobDetails Components/Page
- Pagination on frontend if using mutiple job APIs - lots of results
- Image URL field for users to add company logo to their posts
- ~~Docker container for whole app~~

**Based on a similar GraphQL API project I did using Python with Graphene:** [Graphene-Flask-API](https://github.com/MrYKenz/Graphene-Flask-API)