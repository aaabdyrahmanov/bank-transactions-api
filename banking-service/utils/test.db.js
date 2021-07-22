const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

const DEFAULT_TEST_DB_NAME = 'test-api';
const DEFAULT_DB_OPTIONS = {
  useNewUrlParser: true, 
  useFindAndModify: false,
  useUnifiedTopology: true
};

// Provide connection to a new in-memory database server
const connect = async (databaseName = DEFAULT_TEST_DB_NAME, options = DEFAULT_DB_OPTIONS) => {
  // Prevent MongooseError: Can't call `openUri()` on
  // an active connection with different connection strings
  await mongoose.disconnect();

  // Spin up an actual/real MongoDB server programmatically from node, for testing
  mongoServer = await MongoMemoryServer.create();

  const mongoUri = await mongoServer.getUri();

  await mongoose.connect(mongoUri + databaseName, options);
};

// Remove and close the database and server
const close = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
};

// Remove all data from collections
const clear = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};

module.exports = {
  connect,
  close,
  clear,
};