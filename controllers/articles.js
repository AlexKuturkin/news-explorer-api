const Article = require('../models/article');
const NotRightsError = require('../errors/notRightsError');
const NotFoundError = require('../errors/notFoundError');
const BadRequest = require('../errors/badRequest');
const {
  articlesNotFound, articleDeleted, notRightsForDeleteArticle, articleNotFound,
} = require('../constants/error-messages');

module.exports.getArticles = (req, res, next) => {
  Article
    .find({ owner: req.user._id })
    .orFail(() => {
      throw new NotFoundError(articlesNotFound);
    })
    .then((articles) => res.status(200).send({ data: articles }))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const ownerArticle = req.user._id;

  Article
    .create({
      keyword, title, text, date, source, link, image, owner: ownerArticle,
    })
    .then((newArticle) => {
      res.status(201).send({ data: newArticle });
    })
    .catch((err) => next(new BadRequest(err.message)));
};

module.exports.removeArticle = (req, res, next) => {
  Article
    .findOne({ _id: req.params.articleId }).select('+owner')
    .then((articleInfo) => {
      if (articleInfo !== null) {
        if (articleInfo.owner.toString() === req.user._id.toString()) {
          return Article.findByIdAndRemove(req.params.articleId)
            .then(() => res.status(200).send({ message: articleDeleted, data: articleInfo }));
        }
        throw new NotRightsError(notRightsForDeleteArticle);
      } else {
        throw new NotFoundError(articleNotFound);
      }
    })
    .catch(next);
};
