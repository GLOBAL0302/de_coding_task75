import express from "express";
import cors, { CorsOptions } from 'cors';
import cipherRouter from './routers/cipher';

const app = express();
const port = 8000;

const whiteList = ["http://localhost:5173"]
// const corsOptions: CorsOptions = {
//   origin: (origin, callback) => {
//     if (origin && whiteList.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   }
// }

app.use(cors());
app.use(express.json());
app.use("/", cipherRouter)

const run = async()=>{
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  })
}

run().catch(console.error)