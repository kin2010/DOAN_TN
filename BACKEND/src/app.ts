import express, { Application } from "express";
import httpStatus from "http-status";
import bodyParser from "body-parser";
import morgan from "morgan";
import * as http from "http";
import cors from "cors";
import { OAuth2Client } from "google-auth-library";
import User from "./models/user.model";
import configs from "./configs/appConfig";
import connectToDb from "./configs/database";
import errorMiddleware from "./middlewares/error.middleware";
import log from "./utils/logger";
import APIError from "./utils/APIError";
import route from "./routers";
import sgMail from "@sendgrid/mail";
import { sendPhone } from "./utils/sendPhone";
var nodemailer = require("nodemailer");
const app: Application = express();
const httpServer = http.createServer(app);
morgan("tiny");

/** Parser the request **/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/** Cors **/
app.use(cors());

/** Rules of our API **/
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET POST PUT DELETE PATCH");
    return res.status(httpStatus.OK).end();
  }

  return next();
});

const client = new OAuth2Client(
  "411768487503-e06gsoh9etobrarghoagn8gbh6fjo7u8.apps.googleusercontent.com"
);

app.post("/auth/google", async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const email = ticket.getPayload()?.email;
  const name = ticket.getPayload()?.name;

  let customUser;

  const user = await User.findOne({
    email,
  });

  if (!user) {
    customUser = await User.create({ email, name });

    if (!customUser) {
      throw new APIError({
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Can not create",
      });
    }
  } else {
    customUser = await User.findOneAndUpdate(
      { email },
      { email, name },
      { new: true }
    );
  }

  res.status(201);
  res.json(customUser);
});
let secret =
  "sk_test_51LMxCAI6HAK9mOVZ7xKAVLvrxjVYNFzMs76u982XHNRqlpSPsY0gzaTDlJ8UxaiqMR7CarhZauZxCFuvP2S15zM500edPrGS1g";
const stripe = require("stripe")(secret);
app.post("/doan/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        return {
          price_data: {
            currency: "vnd",
            product_data: {
              name: item.name,
            },
            unit_amount: item.price,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `http://localhost:3000/order/${req?.body?.id}?success=true`,
      cancel_url: `http://localhost:3000/order/${req?.body?.id}?success=false`,
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e?.message });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/doan", route);

/** Logging the request **/
app.use(morgan(":remote-addr :method :url :status :response-time ms"));

/** Error handling **/
app.use(errorMiddleware.routeNotFound);
app.use(errorMiddleware.handler);

/** Create the server **/
httpServer.listen(configs.server.port, async () => {
  log.info(
    `Server :${configs.server.hostname} is running on port: ${configs.server.port}`
  );

  await connectToDb();
});

// sgMail.setApiKey(configs.sendGrid.key);
// const msg = {
//   from: 'kinle2k7@gmail.com',
//   to: 'kin2000vippro@gmail.com',
//   html: '<div>kakaka</div>',
//   subject: 'hellozzz',
//   text: 'hellozz',
//   dynamic_template_data: {
//     otp: 11817,
//   },
// };
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent');
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// const send = async () => {
//   //await sendPhone({ otp: 'dmm :))', phone: '932526706' });
//   await sendPhone({ otp: 'dmm :))', phone: '333428011' });
// };
// send();
