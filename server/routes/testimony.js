var express = require('express');
var router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Testimony = require('../models/testimony');
const User = require('../models/user');
const { verifySession, verifyLoggedIn } = require("../secure");



router.get('/ours', (req, res, next) => {
  Testimony.find().populate('user_id').then(testimonies => {
    testimonies = testimonies.map(testimony => {
      if (!testimony.is_private)
      {
        if (testimony.is_anonymous && testimony.user_id.id != req.session.user_id)
          {
            testimony.user_id.username = "Anonymous"
            testimony.user_id.id = "-1"
          }
        return {
          id: testimony.id,
          title: testimony.title,
          body: testimony.body,
          author: testimony.user_id.username,
          author_id: testimony.user_id.id,
          posted: testimony.posted_time,
          is_private: testimony.is_private,
          is_anonymous: testimony.is_anonymous
        }
      }
    })
    testimonies = testimonies.filter(testimony => testimony);
    res.status(200).json({ testimonies: testimonies });
  })
    .catch(err => {
      res.status(500).json({ message: 'An error occurred', error: err });
    })
});

//  router.get('/my-testimony', verifyLoggedIn, (req, res, next) => {
router.get('/mine', (req, res, next) => {
  if (req.session.loggedin) {
    User.findOne({ id: req.session.user_id }).then(user => {
      Testimony.find({ user_id: user._id }).then(testimonies => {
        testimonies = testimonies.map(testimony => {
          return {
            id: testimony.id,
            title: testimony.title,
            body: testimony.body,
            author: user.username,
            author_id: user.id,
            posted: testimony.posted_time,
            is_private: testimony.is_private,
            is_anonymous: testimony.is_anonymous

          }
        })
        res.status(200).json({ testimonies: testimonies });
      })
        .catch(err => {
          res.status(500).json({ message: 'An error occurred', error: err });
        })
    })
  }
  else {
    res.status(200).json({ testimonies: [] });
  }
});

router.get('/:id?', (req, res, next) => {
  if (req.params.id) {
    User.findOne({ id: req.params.id }).then(user => {
      Testimony.find({ user_id: user._id }).then(testimonies => {
        testimonies = testimonies.map(testimony => {
          if (!testimony.is_private)
          if (testimony.is_anonymous)
          {
            user.username = "Anonymous"
            user.id = "-1"
          }
            return {
              id: testimony.id,
              title: testimony.title,
              body: testimony.body,
              author: user.username,
              author_id: user.id,
              posted: testimony.posted_time,
              is_private: testimony.is_private
            }
        })
        res.status(200).json({ testimonies: testimonies });
      })
        .catch(err => {
          res.status(500).json({ message: 'An error occurred', error: err });
        })
    })
  }

  else if (req.session.loggedin) {
    User.findOne({ id: req.session.user_id }).then(user => {
      Testimony.find({ user_id: user._id }).then(testimonies => {
        testimonies = testimonies.map(testimony => {
          return {
            id: testimony.id,
            title: testimony.title,
            body: testimony.body,
            author: user.username,
            author_id: user.id,
            posted: testimony.posted_time,
            is_private: testimony.is_private
          }
        })
        res.status(200).json({ testimonies: testimonies });
      })
        .catch(err => {
          res.status(500).json({ message: 'An error occurred', error: err });
        })
    })
  }
  else {
    res.status(200).json({ testimonies: [] });
  }
});

router.delete('/:id', (req, res, next) => {
  if (req.session.loggedin) {
    Testimony.findOne({ id: req.params.id }).populate("user_id").then(testimony => {
      if (testimony.user_id.id == req.session.user_id) {
        Testimony.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Testimony deleted successfully"
            });
          });
      }
    })
      .catch(error => {
        res.status(500).json({ message: 'An error occurred', error: error });
      })
  }
});

router.put('/:id', (req, res, next) => {
  if (req.session.loggedin) {
    Testimony.findOne({ id: req.params.id }).populate("user_id").then(testimony => {
      if (testimony.user_id.id == req.session.user_id) {
        testimony.body = req.body.body;
        testimony.title = req.body.title;
        testimony.is_private = req.body.is_private;
        testimony.is_anonymous = req.body.is_anonymous || false;
        testimony.updated_time = new Date().getTime()
        Testimony.updateOne({ id: req.params.id }, testimony)
          .then(result => {
            res.status(204).json({
              message: "Testimony updated successfully"
            });
          });
      }
    })
      .catch(error => {
        res.status(500).json({ message: 'An error occurred', error: error });
      })
  }
});

router.post('/', (req, res, next) => {
  if (req.session.loggedin) {
    const maxTestimonyId = sequenceGenerator.nextId("testimony");

    User.findOne({ id: req.session.user_id }).then(user => {
      const testimony = new Testimony({
        id: maxTestimonyId,
        body: req.body.body,
        title: req.body.title,
        user_id: user._id,
        is_private: req.body.is_private,
        is_anonymous: req.body.is_anonymous || false,
        posted_time: new Date().getTime()
      });

      testimony.save().then(result => {
        res.status(201).json({
          message: "Testimony Posted"
        })
      }).catch(err => {
        res.status(500).json({
          message: 'An error occurred',
          error: err
        });
      })
    })
      .catch(err => {
        res.status(500).json({
          message: 'An error occurred',
          error: err
        });
      })
  }
});


module.exports = router; 