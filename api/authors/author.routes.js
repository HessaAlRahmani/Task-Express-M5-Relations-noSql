const express = require("express");
const { findById } = require("../../models/Author");
const router = express.Router();
const {
  authorCreate,
  authorUpdate,
  authorsGet,
  AuthorDelete,
  fetchAuthor,
  postsCreate,
} = require("./author.controllers");

router.param("authorId", async (req, res, next, authorId) => {
  const author = await fetchAuthor(authorId, next);
  if (author) {
    req.author = author;
    next();
  } else {
    const err = new Error("Author Not Found");
    err.status = 404;
    next(err);
  }
});

router.get("/", authorsGet);
router.post("/", authorCreate);
router.get("/:authorId", fetchAuthor);
router.post("/:authorId/posts", postsCreate);

router.delete("/:authorId", AuthorDelete);

router.put("/:authorId", authorUpdate);

module.exports = router;
