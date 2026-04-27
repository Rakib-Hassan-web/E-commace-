

const mongoose = require('mongoose');

const DATABASE_URL =()=>{
    return mongoose.connect(process.env.DB_URL)
    .then(() => console.log(' mongo db Connected!'));
}


module.exports= DATABASE_URL