import express from "express";
import {coder} from "./coder";

const cipherRouter = express.Router();


cipherRouter.post("/encode", async (req, res) => {
  const message = {
    key: req.body.password,
    phrase: req.body.phrase,
  }
  console.log(message);
  const result = coder(message.phrase, message.key, false)
  res.send({encoded: result});
})

cipherRouter.post("/decode", async (req, res) => {
  const message={
    key:req.body.password,
    phrase: req.body.phrase
  }

  const result = coder(message.phrase, message.key, true)
  console.log(message);
  res.send({decoded: result});
})

export default cipherRouter;