const {Schema, model}= require('mongoose')

const userSchema= new Schema({
    user : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        required : true
    },
    duration : {
        type : Number,
        required : true
    },
    caloriesBurned : {
        type : Number
    },
    exercises :{
        type : [
        {
            name : {
                type : String,
                required : true,
            },
            reps : Number,
            sets : Number,
            weight : Number
        }
        ]
    }
})

const user = model('Workout', userSchema)

module.exports = user