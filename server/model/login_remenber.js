const mongoose = require('mongoose')
const Schema = mongoose.Schema
const getLocalIp = require('./../utils/local_ip')

const loginRememberSchema = new Schema({
  userId: String,
  rememberKey: String,
  ipAddress: {
    type: String,
    default: getLocalIp()
  }
})

module.exports = mongoose.model('loginRemember', loginRememberSchema, 'loginRemember')
