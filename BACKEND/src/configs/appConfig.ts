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
  USER_NODER_MAIL,
  PASSWORD_NODE_MAIL,
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
  email: EMAIL_ADMIN || 'kinle2k7@gmail.com',
  template: TEMPLATE_ID_EMAIL || 'd-06a37ca9dc66457c86e978b640d57bea',
};
const userNodemail = USER_NODER_MAIL || 'kinle2k7@gmail.com';
const passwordNodemail = PASSWORD_NODE_MAIL || 'kindeptrai';
export default {
  server: SERVER,
  dbUri:
    DB_URI ||
    'mongodb+srv://lequangthong:thong0333428011@cluster0.x0ugk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  bcryptSaltRounds: 10,
  jwtPrivateKey: JWT_PRIVATE_KEY || 'doantotnghiep@',
  sendGrid: SENDGRID,
  userNodemail,
  passwordNodemail,
};
