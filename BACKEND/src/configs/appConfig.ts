import dotenv from 'dotenv';

dotenv.config();

const { HOSTNAME, PORT, DB_URI, JWT_PRIVATE_KEY } = process.env;

const SERVER_HOSTNAME = HOSTNAME || 'localhost';
const SERVER_PORT = PORT || 3001;

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
};

export default {
  server: SERVER,
  dbUri:
    DB_URI ||
    'mongodb+srv://lequangthong:thong0333428011@cluster0.x0ugk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  bcryptSaltRounds: 10,
  jwtPrivateKey: JWT_PRIVATE_KEY || 'doantotnghiep@',
};
