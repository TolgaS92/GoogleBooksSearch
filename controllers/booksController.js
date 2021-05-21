const db = require("../models");

module.exports = {
    findAll: function(req, res) {
        db.Book
            .find()
            .sort({ date: -1 })
            .then(dbData => res.json(dbData))
            .catch(err => res.status(422).json(err));
    },
    findById: function(req, res) {
        db.Book
            .findById(req.params.id)
            .then(dbData => res.json(dbData))
            .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {
        db.Book
          .create(req.body)
          .then(dbData => res.json(dbData))
          .catch(err => res.status(422).json(err));
      },
    update: function(req, res) {
        db.Book
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbData => res.json(dbData))
            .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
        db.Book
            .findById({ _id: req.params.id })
            .then(dbData => dbData.remove())
            .then(dbData => res.json(dbData))
            .catch(err => res.status(422).json(err));
    }
};