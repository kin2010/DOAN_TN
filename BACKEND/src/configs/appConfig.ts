import dotenv from 'dotenv';
dotenv.config();
const {
  HOSTNAME,
  PORT,
  DB_URI,
  JWT_PRIVATE_KEY,
  SENDGRID_API_KEY,
  EMAIL_ADMIN,
  TEMPLATE_ID_EMAIL,
} = process.env;
const SERVER_HOSTNAME = HOSTNAME || 'localhost';
const SERVER_PORT = PORT || 3004;
const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
};
const SENDGRID = {
  key:
    SENDGRID_API_KEY ||
    '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',
  email: EMAIL_ADMIN || 'kin2000vippro@gmail.com',
  template: TEMPLATE_ID_EMAIL || 'd-06a37ca9dc66457c86e978b640d57bea',
};
export default {
  server: SERVER,
  dbUri:
    DB_URI ||
    'mongodb+srv://lequangthong:thong0333428011@cluster0.x0ugk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  bcryptSaltRounds: 10,
  jwtPrivateKey: JWT_PRIVATE_KEY || 'doantotnghiep@',
  sendGrid: SENDGRID,
};
