// const mongodb = require("mongodb");

const { MongoClient, ServerApiVersion } = require("mongodb");

// const Client = mongodb.MongoClient;
// "mongodb+srv://abdussalam:chasesuno6@node-learn.qge821f.mongodb.net/shop?retryWrites=true&w=majority";
// The shop before the '?' in the connection string is the initiall database you are connecting to
const uri =
  "mongodb+srv://abdussalam:chasesuno6@node-learn.qge821f.mongodb.net/shop?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  tls: true
});

let _db;

const DbConnect = (callback) => {
  client
    .connect()
    .then((client) => {
      console.log("Connected");
      _db = client.db('shop');
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  } else {
    console.log("database collection not found")
  }
  throw "No Database Found";
};

exports.DbConnect = DbConnect;
exports.getDb = getDb;
