const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, "public")));

// API endpoints
app.get("/api/posts", (req, res) => {
  res.json(posts);
});

app.get("/api/posts/:id", (req, res) => {
  const postIdReq = parseInt(req.params.id);
  const post = posts.data.find((post) => post.id === postIdReq);

  if (!post) {
    res.status(404).json({ error: "Post not found" });
    return;
  }

  res.json({ data: post });
});

app.get("/api/posts/:id/comments", (req, res) => {
  const postIdReq = parseInt(req.params.id);
  const post = posts.data.find((post) => post.id === postIdReq);
  if (!post) {
    res.status(404).json({ error: "Post not found" });
    return;
  }
  const postComments = comments.filter(
    (comment) => comment.post_id === postIdReq
  );
  res.json({ data: postComments });
});

app.get("/api/tags/:name", (req, res) => {
  const tagName = req.params.name;
  const filteredPosts = posts.data.filter((post) =>
    post.tags.includes(tagName)
  );

  res.json({ data: filteredPosts });
});

//Serve the homepage if endpoint doesn't exist
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//JSON DATA
const postsFilePath = path.join(__dirname, "/data/postsResp.json");
const posts = JSON.parse(fs.readFileSync(postsFilePath, "utf-8"));
const commentsFilePath = path.join(__dirname, "/data/commentResp.json");
const comments = JSON.parse(fs.readFileSync(commentsFilePath, "utf-8"));
