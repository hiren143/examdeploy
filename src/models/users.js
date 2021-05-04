const mongoose = require('mongoose');
var validator = require('validator');

var User = mongoose.model('users',{
    email: { 
        type: String ,
        required :true,
        unique:true,
        validate(value){
            if(!(validator.isEmail(value)))
            {
                throw new Error("email is not valid");
            }
        }
    },
    username: { type: String ,unique:true, minLength:3 ,maxLength:7,lowercase :true},
    password: { type: String ,required :true},
    confirm_password: { type: String,required:true}

}
);

module.exports = { User };