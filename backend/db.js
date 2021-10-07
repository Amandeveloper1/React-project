const mongose = require('mongoose');
const mongoUrl = "mongodb://localhost:27017/myapp?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"

const connectToMongo = () => {
    mongose.connect(mongoUrl, () => {
        console.log("Connect to Successfully to mongoose Datebase");
    })
}

module.exports = connectToMongo;