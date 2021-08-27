const mongoose = require('mongoose')

const citySchema = new mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    state: {
        type : String,
        required : true
    }
},
{
    timeStamps : true
})


const city = mongoose.model('City', citySchema)

export default city