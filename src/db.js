const mongoose = require('mongoose');
const URI="mongodb+srv://hiren:hiren@cluster0.lorf8.mongodb.net/user?retryWrites=true&w=majority";



try {
    mongoose.connect( process.env.MONGODB_URI || URI, {useNewUrlParser: true, useUnifiedTopology: true}, () =>
    console.log("connected"));    
    }catch (error) { 
    console.log("could not connect");    
    }



    module.exports = mongoose;
