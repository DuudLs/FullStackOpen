const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

/*blogsRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});*/

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

/*blogsRouter.post("/", (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});*/

blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);

  const result = await blog.save();
  response.status(201).json(result);
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const blogToUpdate = await Blog.updateLikes(request.params.id);
  if (!blogToUpdate) {
    return response.status(404).json({ error: "Blog not found" });
  }
  response.json(blogToUpdate);
});

module.exports = blogsRouter;
