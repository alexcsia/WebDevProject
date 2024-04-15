# Mag.Zine Blog Website

## Description

This is a blog website with minimal functionality created for learning purposes.

## Features

**This project is a work in progress**

User Authentication: Users can create accounts, log in, and log out. User authentication ensures that only authorized users can create, edit, and delete posts.

Post Creation: Authenticated users can create new posts(articles). A form is provided where users can enter the title, content, and optionally, tags for their post.

Post Search Functionality: Users, authenticated or not, can search for posts by providing search terms that may be included in post titles or tags

Post Display: Upon searching, the blog displays a list of published posts. Each post is displayed with its title. When clicking on a post, it will display the title, content and author.

User Profile: Authenticated users have access to their profile page. On the profile page, users have the option to delete their profile or edit their information.

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

### Development Dependencies:

- **jest:** Testing framework
- **supertest:** Assertion library

### Configuration

1. **Create a `.env` file in the root directory of the project.**
2. **Add the following environment variables to the `.env` file:**
   - PORT=3000
   - MONGODB_URI=mongodb://localhost:27017/blogwebsite
   - SESSION_SECRET=session_secret

### Starting the Server

To start the server, run the following command:

- **node server.js**

### Running the tests

To run the tests, run the following command:

- **npx jest**

The tests are written using Jest and Supertest.
