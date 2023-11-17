const service = require("./posts.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function postExists(req, res, next) {
  const { postId } = req.params;

  const post = await service.read(postId);
  if (post) {
    res.locals.post = post;
    return next();
  }
  return next({ status: 404, message: `Post cannot be found.` });
}

async function create(req, res) {
    const post  = req.body.data;
    res.status(201).json({ data: await service.create(post) });
}

async function update(req, res) {
  const currentPost = res.locals.post;
  const postFromBody = req.body.data;
  const updatedPost = {
    ...postFromBody,
    post_id : currentPost.post_id,
  }
  res.json({ data: await service.update(updatedPost) });
}

async function destroy(req, res) {
  const currentPost = res.locals.post;
  res.status(204).json({ data: await service.delete(currentPost.post_id)});
}

module.exports = {
  create: asyncErrorBoundary(create),
  update: [asyncErrorBoundary(postExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(postExists), asyncErrorBoundary(destroy)],
};
