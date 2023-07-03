const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect("mongodb+srv://christiangruender:8fBQzZdDlLX1kBE4@cluster0.xhnylat.mongodb.net/schrauben24?retryWrites=true&w=majority",
 { useNewUrlParser: true, useUnifiedTopology: true })
.then(async () => {
  console.log('MongoDB connected...');

  // Drop the entire database
  await mongoose.connection.dropDatabase();
  console.log('Database dropped successfully');
})
.catch(err => console.log(err));
