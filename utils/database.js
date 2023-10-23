// const mongodb = require("mongodb");

const { MongoClient, ServerApiVersion } = require("mongodb");

// const Client = mongodb.MongoClient;

const uri =
  "mongodb+srv://abdussalam:chasesuno6@node-learn.qge821f.mongodb.net/?retryWrites=true&w=majority";
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
      _db = client.db();
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
  }
  throw "No Database Found";
};

exports.DbConnect = DbConnect;
exports.getDb = getDb;
