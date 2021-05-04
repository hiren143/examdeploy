const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Question } = require('../models/question');


// => localhost:3000/users
// ----------------------get all data-----------------------
router.get('/', (req, res) => {
    Question.find((err, docs) => {
        if (!err) { res.send(docs); }
         else 
         { console.log('Error in Retriving Questions :' + JSON.stringify(err, undefined, 2)); }
    });
});
// --------------------get data with id -------------------------
router.get('/:question_no', (req, res) => {
    //console.log("req.param.username: ",req.params.username);
    var username =req.params.question_no;
    Question.find({question_no :username}, function(err, result) 
    {   
        //console.log("get data of user"+result);
        
        if(result !== null)
        {
            
            res.send(result);
        }
        else
        {   
            //res.setHeader('Content-Type', 'text/plain');
            res.send([]);
        }
    });

});



// -------------------------insert data -------------------

router.post('/', (req, res) => {
    console.log("in post user backend: ",req.body);

    var emp=new Question(req.body);
    emp.save((err, doc) => {
        if (!err) { res.send(doc); }
         else {
              console.log('Error in Question Save :' + JSON.stringify(err.message, undefined, 2)); 
              res.send(JSON.stringify(err.message));
         }
    });
});


// -------------------------    update data-----------------------------

router.put('/:id',(req, res) => {
 
 
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var emp = {
        

        question: req.body.question,
        optionA: req.body.optionA,
        optionB: req.body.optionB,
        optionC: req.body.optionC,
        optionD: req.body.optionD,
        answer: req.body.answer,
       
    };
    console.log("emp",emp)
    Question.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Question Update :' + JSON.stringify(err, undefined, 2)); }
    });
});
// --------------------------delete data----------------

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Question.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Question Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});


module.exports = router;