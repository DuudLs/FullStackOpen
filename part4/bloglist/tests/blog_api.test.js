const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const helper = require("../utils/list_helper");

test.only("there are two blogs", async () => {
  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, 2);
});

test("addition of a new blog", async () => {
  const newBlog = {
    title: "Peeter pliiats",
    author: "Jaanits Meidlor",
    url: "https://Pengvin.com/",
    likes: 1,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
});

test("deletion of a blog", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
});

test("updating likes works correctly", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToUpdate = blogsAtStart[0];

  const response = await api
    .put(`/api/blogs/${blogToUpdate._id}`)
    .send({ likes: blogToUpdate.likes + 1 })
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const updatedBlog = response.body;

  console.log("Updated blog:", JSON.stringify(updatedBlog, null, 2));

  assert.ok(updatedBlog, "Expected the API to return the updated blog");
  assert.strictEqual(updatedBlog.likes, blogToUpdate.likes + 1);

  const blogsAtEnd = await helper.blogsInDb();
  const updatedBlogFromDb = blogsAtEnd.find(
    (b) => b._id.toString() === blogToUpdate._id.toString()
  );

  assert.strictEqual(updatedBlogFromDb.likes, blogToUpdate.likes);
});

after(async () => {
  await mongoose.connection.close();
});
