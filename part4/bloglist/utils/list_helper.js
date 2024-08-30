const Blog = require("../models/blog");
let initialBlogs = [];

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  if (initialBlogs.length === 0 || !Array.isArray(initialBlogs)) {
    initialBlogs = blogs;
  }
  return Array.isArray(initialBlogs)
    ? initialBlogs
    : blogs.map((blog) => blog.toJSON());
};

module.exports = {
  dummy,
  totalLikes,
  blogsInDb,
};
