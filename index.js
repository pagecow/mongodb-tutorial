const http = require('http');
const express = require('express');

const app = express();
app.use(express.json());
app.use(express.static("express"));

// MongoDB
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://yt-user:yt-user@ytexampledb.bngu6mg.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


client.connect(async err => {
  const collection = client.db("testTwo").collection("sales");
  // perform actions on the collection object
  
  // CRUD

  // Create / POST
  await collection
    .insertOne({ _id: 9, item: 'xyz' })
    .catch(() => console.log('error inserting'))

  // Read / GET
  const matches = await collection.find({ item: 'xyz' }).sort({ _id: 1 }).toArray();
  console.log("matches: ", matches);

  // Update / PUT
  await collection
    .updateOne({ _id: 10 }, 
      {
        $set: {
          item: 'xyz',
          price: 6,
          quantity: 10,
          date: new Date()
        }
      },
      {
        upsert: true
      }
    )
  const updatedMatches = await collection.find({ item: 'xyz' }).sort({ _id: 1 }).toArray();
  console.log("updatedMatches: ", updatedMatches);

  // Delete / DELETE
  await collection.deleteOne({ _id: 10 });

  const matchesWithDeletedItemMissing = await collection.find({ item: 'xyz' }).sort({ _id: 1 }).toArray();
  console.log("matchesWithDeletedItemMissing: ", matchesWithDeletedItemMissing);

  client.close();
});



// listener
const server = http.createServer(app);
const port = 4040;
server.listen(port);

console.debug('Server listening on port ' + port);
