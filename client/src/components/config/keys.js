if (process.env.NODE_ENV == 'production') {
    module.exports = require("./production")
} else {
    module.exports = require("./deployment")
}
module.exports = require("./production")