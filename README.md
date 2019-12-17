# MEARN Stack App with GraphQL API <img src="https://github.com/graphql/graphql-spec/blob/master/resources/GraphQL%20Logo.svg" width="50" />
- Database: 
    - MongoDB: Users and Client created posts
    - Redis: Job data fecthed from external APIs (incrementally using Cron)
- Back-end API: Apollo Server (built on Express) with Node.js
- Front-end: React with Apollo Client

### Details
Authentication using JSON Web Tokens and Apollo Client Cache to temporarily store fetched results on frontend. Built with React Hooks (including apollo hooks) and the Semantic UI Library. This can be used to create various different applications with a data from a backend database and/or other Servers/APIs. Cron timed jobs for workers with axios get requests on backend to fetch external data from APIS incrementally (every day). Redis to temporarily store fetched API data on backend.

### Application Diagram
<p align="center"><img src="https://github.com/MrYKenz/MERN-GraphQL-App/blob/master/app_layout.jpg"/></p>

### To-do: 
- ~~create post component with authentication if jwt expired~~
- make createPost display straightaway - apollo incache memory
- pagination on front-end??
- ~~Cron timed jobs for workers~~
- ~~Worker with axios get request on backend to fetch external data from APIS~~
- Redis to temp store fetched data as intermediate for client requests using Async functions - Needs Testing!!
- Change Cron Job time from every minute to daily
- Other Workers and have multiple GQL Queries in Jobs and JobDetails Components/Page

Based on a similar project I did using python: [Graphene-Flask-API](https://github.com/MrYKenz/Graphene-Flask-API)