const {MongoClient}= require('mongodb');
const fs = MongoClient;

//const database = 'mongodb://localhost:27017';
//const database = 'mongodb://places:iamkugan27/@ds141870.mlab.com:41870/placeapp';
//const database = 'mongodb://places:iamkugan27/@ds141870.mlab.com:41870/placeapp';
const database = 'mongodb://kugan:kugan123@ds147190.mlab.com:47190/placesapp';

const appname = 'placeapp';
const collectionname = 'placesappcollection';

const saveData = (newdata) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(database, {useNewUrlParser: true}, (err, client) => {
      if (err) {
      reject('Unable to connect to MongoDB');
    }
    console.log('Connected to MongoDB');
    const db = client.db(appname);

const length = newdata.length;
for(var i=0; i<length; i++){
    db.collection(collectionname).insertOne(newdata[i],(err, result) => {
       if (err) {
         reject('Unable to insert');
       }
     });
   }
  resolve(1);

    client.close();
    });
  });
};


const getAllData = () => {
  return new Promise((resolve, reject) =>{
    MongoClient.connect(database, {useNewUrlParser: true}, (err, client) => {
      if (err) {
      reject('Unable to connect to MongoDB');
    }
    console.log('Connected to MongoDB');
    const db = client.db(appname);

    db.collection(collectionname).find().toArray().then((docs) => {
    resolve(docs);
    }, (err) => {
      reject('Unable to fetch docs');
    });

    client.close();
    });

  });
};
const deleteAll = () => {
  return new Promise((resolve, reject) =>{
    MongoClient.connect(database, {useNewUrlParser: true}, (err, client) => {
      if (err) {
      reject('Unableto connect to MongoDB');
    }
    console.log('Connected to MongoDB');
    const db = client.db(appname);



    db.collection(collectionname).remove({}).then((result) => {
    resolve(result);
    }, (err) => {
      reject('Unable to delete');
    });

    client.close();
    });

  });
};



module.exports = {
  saveData,
  getAllData,
  deleteAll,
}
