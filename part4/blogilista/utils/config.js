require('dotenv').config()

let PORT = process.env.port || 3003
let MONGODB_URI = process.env.MONGODB_URI

module.exports = {
    MONGODB_URI,
    PORT
}