const express = require("express");
const app = express();

app.use(express.json());

let posts = [];
let idCounter = 1;

app.get("/posts", (req, res) => {
  res.json(posts);
});

app.get("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.json(post);
});

app.post("/posts", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content required" });
  }

  const newPost = {
    id: idCounter++,
    title,
    content,
  };

  posts.push(newPost);

  res.status(201).json(newPost);
});

app.put("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const { title, content } = req.body;

  if (title) post.title = title;
  if (content) post.content = content;

  res.json(post);
});

app.delete("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Post not found" });
  }

  posts.splice(index, 1);

  res.json({ message: "Deleted successfully" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
