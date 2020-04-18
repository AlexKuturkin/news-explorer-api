const articlesRouter = require('express').Router();
const {
  getArticles,
  createArticle,
  removeArticle,
} = require('../controllers/articles');
const {
  articlePostValidation,
  articleIdValidation,
} = require('../middlewares/validation');


articlesRouter.get('/', getArticles);
articlesRouter.post('/', articlePostValidation, createArticle);
articlesRouter.delete('/:articleId', articleIdValidation, removeArticle);
module.exports = articlesRouter;
