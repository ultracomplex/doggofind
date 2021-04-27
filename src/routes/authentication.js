const express = require('express');
const router = express.Router();

const passport = require("passport");

router.get('/signup', (req, res) => {  //osea cuando en la URL diga /signup, se renderise un archivo tipo HTML5 osea la parte visual
  res.render('auth/signup');
});

router.post("/signup", (req, res) => {
  passport.authenticate("local.signup", {
  successRedirect: "/profile",
  failureRedirect: "/",
  failureFlash: true  
  });
  
});
router.get("/profile", (req, res) => {
  res.send("pelotudaso");
});
/*router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
}));
router.get("/profile", (req, res) => {
  res.send("pelotudaso");
}); */

module.exports = router;


