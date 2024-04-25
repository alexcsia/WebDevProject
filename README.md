# Mag.Zine Blog Website

## Description

This is a blog website built with Express and MongoDB.
It allows users to create and browse articles based on given keywords.

## Implemented Features / Use cases

**This project is a work in progress**

User Authentication: Users can create accounts, log in, and log out. User authentication ensures that only authorized users can create, edit, and delete posts.

Post Creation: Authenticated users can create new posts(articles). A form is provided where users can enter the title, content, and optionally, tags for their post.

Post Search Functionality: Users, authenticated or not, can search for posts by providing search terms that may be included in post titles or tags

Post Display: Upon searching, the blog displays a list of published posts. Each post is displayed with its title. When clicking on a post, it will display the title, content, author and associated comments along with the usernames of the commenters.

Commenting system: Users can create comments on posts; the respective post's page will display a list of comments on the bottom.

User Profile: Authenticated users have access to their profile page. On the profile page, users have the option to delete their profile or edit their information. Here, users can see the number of posts and comments they have created on the blog.

Trending: Users can look at the most used tags on the website as well as lists showcasing the most active writers and the writers with the biggest word count average, all in descending order.

## Setup Instructions

### Prerequisites

- install [Node.js](https://nodejs.org/en)
- install [MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1. **Clone the repository**
   git clone https://github.com/alexcsia/WebDevProject
2. **Navigate to project directory**
   cd first-project
3. **Install dependencies**
   npm install

### Dependencies

- **bcrypt:** For password hashing and encryption.
- **dotenv:** For loading environment variables from a .env file.
- **ejs:** For server-side templating.
- **express:** Web framework for building the application.
- **express-session:** For managing user sessions.
- **mongoose:** MongoDB object modeling tool.
- **@faker-js/faker** Generating fake data for testing purposes.

### Development Dependencies:

- **jest:** Testing framework
- **supertest:** Assertion library

### Generated Data

All the data is generated through a script using faker.js. (Run **node fakeData.js** in order to generate more)
The database currently holds 64.31MB of data, respectively:
The comments collection holds 4620 documents (1.11MB)
The users collection holds 3487 documents (63.02MB)
The posts collection holds 813 documents (193.56KB)

### Configuration

1. **Create a `.env` file in the root directory of the project.**
2. **Add the following environment variables to the `.env` file:**
   - PORT=3000
   - MONGODB_URI=mongodb+srv://admin:dzNvqFfukGgXJioa@cluster0.tbsbnu0.mongodb.net/blogwebsite?retryWrites=true&w=majority&appName=Cluster0
   - SESSION_SECRET=session_secret

### In order to connect to the database, please use the connection string above.

### Starting the Server

To start the server, run the following command:

- **node server.js**

### Running the tests

To run the tests, run the following command:

- **npx jest**

The tests are written using Jest and Supertest.
