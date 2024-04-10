var express = require('express');
var router = express.Router();
var crypto = require('crypto');
const sequenceGenerator = require('./sequenceGenerator');
const User = require('../models/user');
const Credential = require('../models/credential');

const { filterSpecialCharactersEmail, filterSpecialCharacters, filterSpecialCharactersPassword } = require("../../server/helper");
const { verifySession, verifyLoggedIn } = require("../secure");



router.post('/signup', async (req, res, next) => {
  const maxUserId = sequenceGenerator.nextId("user");
  const salt = crypto.randomBytes(16).toString('base64').toString();
  const password = generate_pass_hash(filterSpecialCharactersPassword(req.body.password), salt);
  const username = filterSpecialCharacters(req.body.username)
  const email = filterSpecialCharactersEmail(req.body.email)
  let exists = await userExists(username, email)

  if (!exists) {


    const credential = new Credential({
      hash_pass: password,
      salt: salt,
    })

    credential.save()
      .then(creds => {
        const user = new User({
          id: maxUserId,
          username: req.body.username,
          email: email,
          credentials: creds._id
        });

        user.save()
          .then(user => {
            req.session.loggedin = true
            req.session.user_id = user.id
            res.status(201).json({
              status: "success",
              message: 'User created successfully'
            })
          })
          .catch(error => {
            req.session.loggedin = false
            res.status(500).json({
              status: "fail",
              message: 'An error occurred',
              error: error
            });
          })
      })
  }
  else {
    if (exists.username && exists.email) {
      req.session.loggedin = false
      res.status(500).json({
        status: "fail",
        message: 'An error occurred',
        errors: ["The username is taken", "An account already exists with that email."]
      });
    }
    else if (exists.username) {
      req.session.loggedin = false
      res.status(500).json({
        status: "fail",
        message: 'An error occurred',
        error: "The username is taken."
      });
    }
    else if (exists.email) {
      req.session.loggedin = false
      res.status(500).json({
        status: "fail",
        message: 'An error occurred',
        error: "An account already exists with that email."
      });
    }
  }
});

router.put('/:id', (req, res, next) => {
  Contact.findOne({ id: req.params.id })
    .then(contact => {
      contact.name = req.body.name;
      contact.email = req.body.email,
        contact.phone = req.body.phone,
        contact.group = req.body.group

      Contact.updateOne({ id: req.params.id }, contact)
        .then(result => {
          res.status(204).json({
            message: 'Contact updated successfully'
          })
        })
        .catch(error => {
          res.status(500).json({
            message: 'An error occurred',
            error: error
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Contact not found.',
        error: { contact: 'Contact not found' }
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Contact.findOne({ id: req.params.id })
    .then(contact => {
      Contact.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: "Contact deleted successfully"
          });
        })
        .catch(error => {
          res.status(500).json({
            message: 'An error occurred',
            error: error
          });
        })
    })
    .catch(error => {
      res.status(500).json({
        message: 'Contact not found.',
        error: { contact: 'Contact not found' }
      });
    });
});

router.post('/login', async (req, res, next) => {

  const username = filterSpecialCharacters(req.body.username)
  const user = await getUserDetails(username)
  if (user) {
    const salt = user.credentials.salt
    const password = generate_pass_hash(filterSpecialCharactersPassword(req.body.password), salt);
    if (password == user.credentials.hash_pass) {
      req.session.loggedin = true
      req.session.user_id = user.id
      res.status(200).json({
        status: "success",
        message: 'Login successful',
        user_id: user.id
      });
    }
    else {
      req.session.loggedin = false
      res.status(401).json({
        status: "fail",
        message: 'An error occured',
        error: "Incorrect password"
      });
    }
  }
  else {
    req.session.loggedin = false
    res.status(401).json({
      status: "fail",
      message: 'An error occured',
      error: "User does not exist"
    });
  }
});

router.get('/loggedin', async (req, res, next) => {

  if (req.session.loggedin) {
    res.status(200).json({
      status: req.session.loggedin,
      user_id: req.session.user_id
    });
  }
  else {
    res.status(200).json({
      status: req.session.loggedin
    });
  }

});

router.post('/logout', async (req, res, next) => {

  req.session.destroy()
  res.status(200).json({
    status: "success",
    message: "User logged out"
  });

});

async function getUserDetails(username) {

  const user = await User.findOne({ username: username }).populate("credentials");
  if (user) {
    return user
  }
}

async function userExists(username, email) {
  try {
    const user = await User.findOne({ $or: [{ username: username }, { email: email }] });
    if (user) {
      const existingFields = {};
      if (user.username === username) {
        existingFields.username = true;
      }
      if (user.email === email) {
        existingFields.email = true;
      }
      return existingFields;
    }
    return false;
  } catch (error) {
    console.error('Error checking if user exists:', error);
    throw error;
  }
}

function generate_pass_hash(password, salt) {
  return crypto.createHash('RSA-SHA256').update(password + "spendlovedev_secure").update(salt).digest('hex');
}

module.exports = router; 