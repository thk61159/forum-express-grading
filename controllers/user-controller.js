const bcrypt = require('bcryptjs')
const { localFileHandler } = require('../helpers/file-helpers')// 照片上傳
const { User } = require('../models')
// const { User } = db
const userController = {
  signUpPage: (req, res) => {
    res.render('signup')
  },
  signUp: (req, res, next) => {
    if (req.body.password !== req.body.passwordCheck) {
      throw new Error('Passwords do not match!')
    }
    User.findOne({ where: { email: req.body.email } })
      .then(user => {
        if (user) throw new Error('Email already exists!')
        return bcrypt.hash(req.body.password, 10)
      })
      .then(hash =>
        User.create({
          name: req.body.name,
          email: req.body.email,
          password: hash
        })
      )
      .then(() => {
        req.flash('success_messages', '成功註冊帳號！')
        res.redirect('/signin')
      })
      .catch(err => next(err))
  },
  signInPage: (req, res) => {
    res.render('signin')
  },
  signIn: (req, res) => {
    req.flash('success_messages', '成功登入！')
    res.redirect('/restaurants')
  },
  logout: (req, res) => {
    req.flash('success_messages', '登出成功！')
    req.logout() // 這個方法會把 user id 對應的 session 清除掉，對伺服器來說 session 消失就等於是把使用者登出了
    res.redirect('/signin')
  },
  getUser: (req, res, next) => {
    const { id } = req.params
    return User.findByPk(id, { raw: true })
      .then(user => {
        return res.render('users/profile', { user })
      })
      .catch(err => next(err))
  },
  editUserUser: (req, res, next) => {
    const { id } = req.params
    return User.findByPk(id, { raw: true })
      .then(user => {
        return res.render('users/edit', { user })
      })
      .catch(err => next(err))
  }
}

module.exports = userController
