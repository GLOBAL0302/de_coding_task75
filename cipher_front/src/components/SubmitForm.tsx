import React, { useState } from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { IAllCipherState, ICipherState } from '../types.ts';
import { coder } from '../assets/coder.ts';
import axiosApi from '../axiosApi.ts';

const codeMutationInitialState = {
  password: '',
  encodePhrase: '',
  decodePhrase: '',
  decode: false,
};

const SubmitForm = () => {
  const [codeMutation, setCodeMutation] = useState<ICipherState>(
    codeMutationInitialState,
  );


  const onChangeCodeMutation = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setCodeMutation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const encodeFunc = () => {
    setCodeMutation((prevState) => ({
      ...prevState,
      decode: true,
    }));
  };

  const decodeFunc = () => {
    setCodeMutation((prevState) => ({
      ...prevState,
      decode: false,
    }));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (codeMutation.encodePhrase) {
      const toSendCode = {
        password: codeMutation.password,
        phrase: codeMutation.encodePhrase,
      };
      await axiosApi.post<IAllCipherState>('/encode', toSendCode);
      const coderResult = coder(
        toSendCode.phrase,
        toSendCode.password,
        codeMutation.decode,
      );
      setCodeMutation((prevState) => ({
        ...prevState,
        password: '',
        encodePhrase: '',
        decodePhrase: coderResult,
      }));
    } else {
      const toSendCode = {
        password: codeMutation.password,
        phrase: codeMutation.decodePhrase,
      };
      await axiosApi.post<IAllCipherState>('/decode', toSendCode);
      const coderResult = coder(
        toSendCode.phrase,
        toSendCode.password,
        codeMutation.decode,
      );
      setCodeMutation((prevState) => ({
        ...prevState,
        password: '',
        decodePhrase: '',
        encodePhrase: coderResult,
      }));
    }
  };

  return (
    <Box>
      <Grid
        onSubmit={onSubmit}
        container
        flexDirection="column"
        gap={3}
        component="form"
      >
        <Grid item>
          <TextField
            value={codeMutation.encodePhrase}
            disabled={codeMutation.decodePhrase.length > 0}
            onChange={onChangeCodeMutation}
            name="encodePhrase"
            label="Encoded"
            variant="filled"
          />
        </Grid>
        <Grid container spacing={2} component="div">
          <Grid item>
            <TextField
              value={codeMutation.password}
              required
              onChange={onChangeCodeMutation}
              name="password"
              label="Password"
              variant="filled"
            />
          </Grid>
          <Grid item>
            <Button
              disabled={codeMutation.decodePhrase.length > 0}
              onClick={encodeFunc}
              type="submit"
              variant="outlined"
            >
              <ArrowCircleDownIcon /> Encode
            </Button>
          </Grid>
          <Grid item>
            <Button
              disabled={codeMutation.encodePhrase.length > 0}
              onClick={decodeFunc}
              type="submit"
              variant="outlined"
            >
              <ArrowCircleUpIcon /> Decode
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <TextField
            value={codeMutation.decodePhrase}
            disabled={codeMutation.encodePhrase.length > 0}
            onChange={onChangeCodeMutation}
            name="decodePhrase"
            label="Decoded"
            variant="filled"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SubmitForm;
