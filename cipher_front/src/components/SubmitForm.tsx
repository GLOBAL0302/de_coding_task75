import { useState } from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';


const SubmitForm = () => {
  const [codeMutation, setCodeMutation] = useState({
    password:"",
    phrase:"",
    decode: false
  });


  return (
    <Box>
      <Grid container flexDirection="column" gap={3} component="form">
        <Grid item>
          <TextField id="filled-basic" label="encoded" variant="filled" />
        </Grid>
        <Grid container spacing={2} component="div">
          <Grid item>
            <TextField id="filled-basic" label="Password" variant="filled" />
          </Grid>
          <Grid item>
            <Button variant="outlined"><ArrowCircleDownIcon/> Encode</Button>
          </Grid>
          <Grid item>
            <Button variant="outlined"><ArrowCircleUpIcon/> Decode</Button>
          </Grid>
        </Grid>
        <Grid item>
          <TextField id="filled-basic" label="Decoded" variant="filled" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SubmitForm;