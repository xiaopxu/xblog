const mongoose = require('mongoose')
const Schema = mongoose.Schema
const allUserSchema = new Schema({
  userName: String,
  password: {
    type: String,
    Default: '96E79218965EB72C92A549DD5A330112'
  },
  email: String,
  profilePic: String,
  regTime: {
    type: Date,
    Default: Date.now
  }
})

const Models = {
  User: mongoose.model('allUser', allUserSchema, 'allUser')
}

module.exports = Models
