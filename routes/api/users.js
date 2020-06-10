const { query, validationResult } = require("express-validator");
const gitHubClient = require("../../services/github-client");

module.exports = [
  // Validation pipeline

  query("username").isString().notEmpty().optional(),
  query("langs").isArray({ min: 1 }),

  // Verify query params

  (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({
        errors: result.array(),
      });
    }
    next();
  },

  // Data handler

  async (req, res, next) => {
    try {
      const { username, langs: languages } = req.query;
      const searchOptions = { languages, username };
      const users = await gitHubClient.searchUsersByLanguage(searchOptions);
      res.json({ users });
    } catch (err) {
      next(err);
    }
  },
];
