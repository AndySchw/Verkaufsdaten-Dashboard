const fs = require('fs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const express = require('express');
const cors = require('cors');
const app = express();

//max fragen ob mit cors? .. 
app.use(cors());


// Define Mongoose schema
const SchraubeSchema = new Schema({
  Hersteller: String,
  Schraube: String,
  Preis: Number,
  VerkaufteMenge: Number,
  Datum: Date
});

const Schraube = mongoose.model('Schraube', SchraubeSchema);

// Connect to MongoDB
mongoose.connect("mongodb+srv://christiangruender:8fBQzZdDlLX1kBE4@cluster0.xhnylat.mongodb.net/schrauben24?retryWrites=true&w=majority",
 { useNewUrlParser: true, useUnifiedTopology: true })
.then(async () => {
  console.log('MongoDB connected...');

  // Read the JSON file
  const data = JSON.parse(fs.readFileSync('output.json', 'utf8'));

  // Insert new data into MongoDB
  await Promise.all(data.map(async (entry) => {
    const existingDocument = await Schraube.findOne({
      Hersteller: entry.Hersteller,
      Schraube: entry.Schraube,
      Datum: entry.Datum
    });
    if (!existingDocument) {
      await Schraube.create(entry);
    }
  }));

  console.log('Data inserted successfully');
})
.catch(err => console.log(err));

//routen..

app.get('/', (req, res) => {
  res.send('Schraubeeeen!!');
});

app.get('/api/schrauben', async (req, res) => {
  try {
    const schrauben = await Schraube.find({});
    res.send(schrauben);
  } catch (err) {
    console.error(err);
  }
});

app.get('/api/top3', async (req, res) => {
  try {
    const result = await Schraube.find()
      .sort({ VerkaufteMenge: -1 })
      .limit(3);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data from MongoDB');
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
