const fs = require('fs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const express = require('express');
const cors = require('cors');
const app = express();
const { DateTime } = require('luxon');

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

// Verbindung zur MongoDB 
const DB_USERNAME = process.env.DB_USERNAME; 
const DB_PASSWORD = process.env.DB_PASSWORD; 
const DB_CLUSTER = process.env.DB_CLUSTER; 
const DB_NAME = process.env.DB_NAME; 

const connStr = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_CLUSTER}/${DB_NAME}?retryWrites=true&w=majority`; 

 
// Connect to MongoDB
mongoose.connect("mongodb+srv://christiangruender:8fBQzZdDlLX1kBE4@cluster0.xhnylat.mongodb.net/schrauben24?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB connected...');

// mongoose.connect(connStr, { useNewUrlParser: true, useUnifiedTopology: true }) 
//     .then(async() => { 
//       console.log('MongoDB verbunden...');

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

//top3schrauben/verkauf-barchart
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

//top3hersteller/verkauf-barchart2
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

//verkaufszahlen/tag-barchart3
app.get('/api/date', async (req, res) => {
  try {
    const result = await Schraube.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$Datum' },
            month: { $month: '$Datum' },
            day: { $dayOfMonth: '$Datum' }
          },
          VerkaufteMenge: { $sum: '$VerkaufteMenge' }
        }
      },
      { $sort: { VerkaufteMenge: -1 } },
      { $limit: 3 }
    ]);

    const formattedResults = result.map((item) => ({
      _id: DateTime.fromObject({
        year: item._id.year,
        month: item._id.month,
        day: item._id.day
      }).toFormat('yyyy-MM-dd'),
      VerkaufteMenge: item.VerkaufteMenge
    }));

    res.json(formattedResults);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data from MongoDB-verkaufszahlen/tag');
  }
});


//verkaufswochentag-durchschnittlich-bester-verkaufstag-pro-woche-barchart4
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
    res.status(500).send('Error retrieving data from MongoDB-verkaufswochentag');
  }
});

app.get('/api/prozent/:hersteller', async (req, res) => {
  try {
    const hersteller = req.params.hersteller;
    const herstellerTotalSales = await Schraube.aggregate([
      {
        $match: { Hersteller: hersteller }
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$VerkaufteMenge' }
        }
      }
    ]);
    const schraubeSales = await Schraube.aggregate([
      {
        $match: { Hersteller: hersteller }
      },
      {
        $group: {
          _id: '$Schraube',
          schraubeSales: { $sum: '$VerkaufteMenge' }
        }
      }
    ]);

    if (herstellerTotalSales.length > 0) {
      const percentages = schraubeSales.map(schraube => ({
        schraube: schraube._id,
        percentage: (schraube.schraubeSales / herstellerTotalSales[0].totalSales) * 100
      }));
      res.json({ hersteller, percentages });
    } else {
      res.json({ hersteller, percentages: [] });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data from MongoDB');
  }
});

// Umsatz, Menge und Trends für jeden Hersteller
app.get('/api/hersteller/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const result = await Schraube.aggregate([
      {
        $match: {
          Hersteller: name
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$Datum" } },
          Umsatz: { $sum: { $multiply: ["$Preis", "$VerkaufteMenge"] } },
          Menge: { $sum: "$VerkaufteMenge" }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data from MongoDB for Hersteller');
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

// Abfrage Umsatz pro Schraubenart pro Hersteller
app.get('/api/verkaufswerte/:hersteller/:schraube', async (req, res) => {
  try {
    const hersteller = req.params.hersteller;
    const schraube = req.params.schraube;
    const result = await Schraube.aggregate([
      {
        $match: {
          Hersteller: hersteller,
          Schraube: schraube
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

// Abfrage am meisten verkaufte Schraubenart pro Hersteller
app.get('/api/topschraube/:hersteller', async (req, res) => {
  try {
    const hersteller = req.params.hersteller;
    const result = await Schraube.aggregate([
      {
        $match: {
          Hersteller: hersteller
        }
      },
      {
        $group: {
          _id: '$Schraube',
          VerkaufteMenge: { $sum: '$VerkaufteMenge' }
        }
      },
      { $sort: { VerkaufteMenge: -1 } },
      { $limit: 1 }
    ]);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data from MongoDB');
  }
});


// Abfrage Gesamtumsatz pro Hersteller für einen Monat
app.get('/api/gesamtumsatz/:hersteller', async (req, res) => {
  try {
    const hersteller = req.params.hersteller;
    const startDatum = new Date('2023-06-01');
    const endDatum = new Date('2023-06-30');
    const result = await Schraube.aggregate([
      {
        $match: {
          Hersteller: hersteller,
          Datum: { $gte: startDatum, $lte: endDatum }
        }
      },
      {
        $group: {
          _id: null,
          GesamtUmsatz: { $sum: { $multiply: ['$Preis', '$VerkaufteMenge'] } }
        }
      }
    ]);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data from MongoDB');
  }
});
