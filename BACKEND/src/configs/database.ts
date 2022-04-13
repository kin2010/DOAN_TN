import mongoose, { Error } from 'mongoose';
import configs from './appConfig';
import log from '../utils/logger';

const connectToDb = async () => {
  try {
    await mongoose.connect(configs.dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    log.info('Connect to database successfully');
  } catch (e) {
    log.error('Can not connect to database', e);
    process.exit(1);
  }
};

// var mysql = require('mysql');

// var con = mysql.createConnection({
//   host: 'localhost',
//   user: 'yourusername',
//   password: 'yourpassword',
// });

// con.connect(function (err) {
//   if (err) throw err;
//   console.log('Connected!');
// });
export default connectToDb;
