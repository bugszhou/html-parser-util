if (process.env.NODE_ENV === 'development') {
  module.exports = require('./dist/html-parser-util.js')
} else {
  module.exports = require('./dist/html-parser-util.common.js')
}
