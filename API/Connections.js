const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Qandeeil:Cwq3Gc50VjJuyIRA@cluster0.wqfwxbi.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
    console.log("we're connected!")
});
