import express from "express";
import {coder} from "./coder";

const cipherRouter = express.Router();


cipherRouter.post("/encode", async (req, res) => {
  const message = {
    key: req.body.password,
    phrase: req.body.phrase,
  }
  const result = coder(message.phrase, message.key, false)
  res.send({encoded: result});
})

cipherRouter.post("/decode", async (req, res) => {
  const message={
    key:req.body.password,
    phrase: req.body.phrase
  }
  const result = coder(message.phrase, message.key, true)
  res.send({decoded: result});
})

export default cipherRouter;