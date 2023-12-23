const mongoose = require('mongoose');
// mongodb+srv://themohdishaq:mongodb%40786@cluster0.40rg0cm.mongodb.net/explorebot?retryWrites=true&w=majority
mongoose.connect('mongodb://127.0.0.1:27017/port', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error.message);
  });
