const express = require("express");
const router = express.Router();
const { tagsGet, tagCreate } = require("./tags.controllers");

router.param("tagId", async (req, res, next, tagId) => {
  const tag = await fetchTag(tagId, next);
  if (tag) {
    req.tag = tag;
    next();
  } else {
    const err = new Error("Tag Not Found");
    err.status = 404;
    next(err);
  }
});

router.get("/", tagsGet);
router.post("/", tagCreate);

module.exports = router;
