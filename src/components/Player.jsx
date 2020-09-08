import React from 'react'
import { makeStyles } from '@material-ui/core';

import exampleVideo from '../example.mp4'

const useStyles = makeStyles({
  root: {
    height: '80%',
    outline: 'none'
  }
});

const Player = () => {
  const classes = useStyles();
  
  return (
    <video className={classes.root} controls src={exampleVideo}>

    </video>
  );
}

export default Player;