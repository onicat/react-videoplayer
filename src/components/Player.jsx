import React, { useRef, useEffect } from 'react'
import { makeStyles } from '@material-ui/core';
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

const options = {
  controls: true,
  loop: false,
  preload: 'auto',
  fluid: true
};

const useStyles = makeStyles({
  root: {
    height: '70%',
    width: '70%',
    paddingTop: '20px',
  }
});

const Player = ({video}) => {
  const classes = useStyles();
  const videoElRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (video === null || playerRef.current === null) return;
    
    playerRef.current.src({src: video});
  }, [video]);

  useEffect(() => {
    playerRef.current = videojs(videoElRef.current, options);

    return () => {
      playerRef.current.dispose();
    }
  }, []);

  return (
    <div  className={classes.root}>
      <video ref={videoElRef} className={'video-js'}/>
    </div>
  );
}

export default Player;