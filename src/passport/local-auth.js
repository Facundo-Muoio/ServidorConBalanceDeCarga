const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const User = require("../models/user")
const bcrypt = require("bcrypt")

function encryptPassword(password){
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

function verifypassword(password, user){
    return bcrypt.compareSync(password, user.password)
}

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id)
    done(null, user)
})


passport.use("registration", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
},
async (req, email, password, done) => {
    const user = await User.findOne({email:email})
    if(user){
        return done(null, false)
    } else {
        const newUser = new User()
        newUser.email = email,
        newUser.password = encryptPassword(password)
        await newUser.save()
        done(null, newUser)
    }
}
))

passport.use("login", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
},
async (req, email, password, done) => {
    const user = await User.findOne({email: email})
    if(!user){
        return done(null, false)
    }
    if(!verifypassword(password, user)){
        return done(null, false)
    }
    done(null, user)
}
))