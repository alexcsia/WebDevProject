const { faker, fakerEN } = require("@faker-js/faker");
const mongoose = require("mongoose");
const User = require("./models/User");
const Post = require("./models/Post");
const Comment = require("./models/Comment");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI);

const tag = [
  "#tech",
  "#design",
  "#travelling",
  "#music",
  "#art",
  "#gaming",
  "#business",
  "#education",
  "#programming",
  "#health",
  "#food",
  "#fitness",
  "#photography",
  "#books",
  "#fashion",
  "#diy",
  "#nature",
  "#science",
  "#history",
  "#movies",
  "#technology",
  "#cooking",
  "#parenting",
  "#motivation",
  "#finance",
  "#careeradvice",
  "#relationships",
  "#sports",
];

async function generateFakeUsers(numUsers) {
  let fakeUsers = [];
  try {
    for (let i = 0; i < numUsers; i++) {
      const fakeUser = {
        username: faker.internet.displayName(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        phone_number: faker.finance.accountNumber(10),
        password: faker.internet.password(),
      };
      fakeUsers.push(fakeUser);
    }
    return fakeUsers;
  } catch (error) {
    console.log(error);
    return [];
  }
}

// generate fake posts
async function generateFakePosts(numPosts, user) {
  let fakePosts = [];
  try {
    for (let i = 0; i < numPosts; i++) {
      const numTags = faker.number.int({ min: 1, max: 10 }); // randomly choose 1 to 3 tags
      const selectedTags = [];
      for (let j = 0; j < numTags; j++) {
        selectedTags.push(
          tag[faker.number.int({ min: 0, max: tag.length - 1 })]
        );
      }
      const fakePost = {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraphs({ min: 50, max: 200 }),
        tags: selectedTags,
        author: {
          first_name: user.first_name,
          last_name: user.last_name,
          username: user.username,
        },
      };
      fakePosts.push(fakePost);
    }
    return fakePosts;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function generateFakeComments(post) {
  fakeComments = [];
  let newComment;
  const nrUsers = await User.find({}).limit(
    faker.number.int({ min: 1, max: 15 })
  );
  for (const user of nrUsers) {
    newComment = await Comment.create({
      author: {
        username: user.username,
      },
      content: faker.lorem.paragraph(),
      postID: post._id,
    });
    fakeComments.push(newComment);
  }

  console.log(fakeComments);
}

(async () => {
  const fakeUsers = await generateFakeUsers(30);

  try {
    for (const fakeUser of fakeUsers) {
      const newUser = await User.create(fakeUser);
      const fakePosts = await generateFakePosts(
        faker.number.int({ min: 3, max: 15 }),
        newUser
      );

      for (const fakePost of fakePosts) {
        const newPost = await Post.create(fakePost);
        await generateFakeComments(newPost);
      }
    }
  } catch (error) {
    console.log("Error creating users or posts:", error);
  }
})();
