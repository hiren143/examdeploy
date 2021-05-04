const mongoose = require('mongoose');

var Question = mongoose.model('question',{
    
    question_no:{type:Number,required:true,unique:true},
    question: { 
        type: String ,
        required :true,
        unique:true,
        
    },
    optionA: { type: String ,required :true},
    optionB: { type: String ,required :true},
    optionC: { type: String,required:true},
    optionD: { type: String,required:true},
    answer:{type:String,required :true}

    

}
);

module.exports = { Question };