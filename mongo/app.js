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

//alle schrauben
app.get('/api/schrauben', async (req, res) => {
  try {
    const schrauben = await Schraube.find({});
    res.send(schrauben);
  } catch (err) {
    console.error(err);
  }
});

//top3schrauben/verkauf
app.get('/api/top3', async (req, res) => {
  try {
    const result = await Schraube.aggregate([
      {
        $group: {
          _id: '$Schraube',
          VerkaufteMenge: { $sum: '$VerkaufteMenge' }
        }
      },
      { $sort: { VerkaufteMenge: -1 } },
      { $limit: 3 }
    ]);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data from MongoDB-top3/verkauf');
  }
});

//top3hersteller/verkauf
app.get('/api/hersteller', async (req, res) => {
  try {
    const result = await Schraube.aggregate([
      {
        $group: {
          _id: '$Hersteller',
          VerkaufteMenge: { $sum: '$VerkaufteMenge' }
        }
      },
      { $sort: { VerkaufteMenge: -1 } }
    ]);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data from MongoDB-top3/hersteller');
  }
});

//verkaufszahlen/tag
app.get('/api/date', async (req, res) => {
  try {
    const result = await Schraube.aggregate([
      {
        $group: {
          _id: '$Datum',
          VerkaufteMenge: { $sum: '$VerkaufteMenge' }
        }
      },
      { $sort: { VerkaufteMenge: -1 } },
      { $limit: 3 }
    ]);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data from MongoDB-verkaufszahlen/tag');
  }
});

//verkaufswochentag-durchschnittlich bester verkaufstag pro woche.
app.get('/api/verkaufswochentag', async (req, res) => {
  try {
    const result = await Schraube.aggregate([
      {
        $group: {
          _id: { $dayOfWeek: '$Datum' },
          avgSales: { $avg: '$VerkaufteMenge' }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data from MongoDB');
  }
});


// //verkaufswochentag-durchschnittlich bester verkaufstag pro woche.  
// //req-params
// app.get('/api/verkaufswochentag/:dayOfWeek', async (req, res) => {
//   try {
//     const dayOfWeek = parseInt(req.params.dayOfWeek);
//     const result = await Schraube.aggregate([
//       {
//         $match: {
//           'Datum': {
//             $eq: dayOfWeek
//           }
//         }
//       },
//       {
//         $group: {
//           _id: { dayOfWeek: { $dayOfWeek: '$Datum' } },
//           totalSales: { $sum: '$VerkaufteMenge' }
//         }
//       },
//       { $sort: { totalSales: -1 } }
//     ]);
//     res.json(result);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error retrieving data from MongoDB-verkaufswochentag');
//   }
// });



// //schraubenartverkauf/monat
// app.get('/api/umsatz/:month', async (req, res) => {
//   try {
//     const month = parseInt(req.params.month);
//     const result = await Schraube.aggregate([
//       {
//         $match: {
//           $expr: {
//             $eq: [{ $month: '$Datum' }, month]
//           }
//         }
//       },
//       {
//         $group: {
//           _id: '$Schraube',
//           Umsatz: { $sum: { $multiply: ['$Preis', '$VerkaufteMenge'] } }
//         }
//       },
//       { $sort: { Umsatz: -1 } }
//     ]);
//     res.json(result);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error retrieving data from MongoDB-umsatz/month');
//   }
// });

app.get('/api/verkaufswerte/:monat/:schraube', async (req, res) => {
  try {
    const monat = req.params.monat;
    const schraube = req.params.schraube;
    const startDatum = new Date(monat);
    const endDatum = new Date(startDatum.getFullYear(), startDatum.getMonth() + 1, 0);
    const result = await Schraube.aggregate([
      {
        $match: {
          Schraube: schraube,
          Datum: { $gte: startDatum, $lte: endDatum }
        }
      },
      {
        $group: {
          _id: null,
          GesamtVerkaufswert: { $sum: { $multiply: ['$Preis', '$VerkaufteMenge'] } }
        }
      }
    ]);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data from MongoDB');
  }
});



app.listen(3000, () => {
  console.log('Server started on port 3000');
});
