const Tag = require("../../models/Tag");

exports.tagCreate = async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (error) {
    next(error);
  }
};

exports.tagsGet = async (req, res, next) => {
  try {
    const tags = await Tag.find({}, "-createdAt -updatedAt").populate(
      "posts",
      "name"
    );
    res.json(tags);
  } catch (error) {
    next(error);
  }
};

exports.fetchTag = async (tagId) => {
  try {
    const tag = await Tag.findById(tagId);
    return tag;
  } catch (error) {
    next(error);
  }
};
