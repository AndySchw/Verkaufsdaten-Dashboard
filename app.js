const fs = require('fs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const express = require('express');
const app = express();

// Connect to MongoDB
mongoose.connect("mongodb+srv://christiangruender:8fBQzZdDlLX1kBE4@cluster0.xhnylat.mongodb.net/schrauben24?retryWrites=true&w=majority",
 { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('MongoDB connected...');
})
.catch(err => console.log(err));

// Define Mongoose schema
const SchraubeSchema = new Schema({
    Hersteller: String,
    Schraube: String,
    Preis: Number,
    VerkaufteMenge: Number,
    Datum: Date
});

const Schraube = mongoose.model('Schraube', SchraubeSchema);

// Lesen Sie die JSON-Datei
const data = JSON.parse(fs.readFileSync('output.json', 'utf8'));

// Fügen Sie die Daten in MongoDB ein
Schraube.insertMany(data)
    .then(() => {
        console.log('Data inserted successfully');
    })
    .catch((err) => {
        console.error(err);
    });

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/schrauben', async (req, res) => {
  try {
      const schrauben = await Schraube.find({});
      res.send(schrauben);
  } catch (err) {
      console.error(err);
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
