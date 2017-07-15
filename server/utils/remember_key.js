function getRememberKey() {
  return new Date().getTime().toString() + parseInt(Math.random() * 1000000000).toString()
}

module.exports = getRememberKey
