const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/signup', (req, res,next) => {
    res.render('auth/signup')
})
router.post('/signup', passport.authenticate('local.signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }))

router.get('/profile', (req, res) => {
    res.send('profile')
})

router.get('/signin', (req, res,next) => {
    res.render('auth/signin')
})
router.post('/signin', (req,res,next) => {
    console.log(req.body)
    passport.authenticate('local.signin',{
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })( req, res, next)
})

module.exports = router