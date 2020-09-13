import React, { useRef, useEffect } from 'react'
import { makeStyles } from '@material-ui/core';
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

const options = {
  controls: true,
  loop: false,
  preload: 'auto',
  fluid: true,
  autoplay: false
};

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  dropZone: {
    boxShadow: `0 0 5px 5px ${theme.palette.primary.main}`
  }
}));

const Player = ({video, setVideo}) => {
  const classes = useStyles();
  const videoElRef = useRef(null);
  const playerRef = useRef(null);

  const handleFileDragLeave = () => {
    playerRef.current.removeClass(classes.dropZone);
  }

  const handleFileDragOver = (event) => {
    event.preventDefault();
    
    playerRef.current.addClass(classes.dropZone);
    event.dataTransfer.dropEffect = "move";
  };

  const handleFileDrop = (event) => {
    event.preventDefault();

    playerRef.current.removeClass(classes.dropZone);

    const file = event.dataTransfer.files[0];
    const url = URL.createObjectURL(file);

    setVideo({src: url, type: file.type});
  };

  useEffect(() => {
    if (video === null || playerRef.current === null) return;

    playerRef.current.src(video);
  }, [video]);

  useEffect(() => {
    playerRef.current = videojs(videoElRef.current, options);

    return () => {
      playerRef.current.dispose();
    }
  }, []);

  return (
    <video 
      ref={videoElRef} 
      className={`${classes.root} video-js`}
      onDragOver={handleFileDragOver}
      onDrop={handleFileDrop}
      onDragLeave={handleFileDragLeave}  
    />
  );
}

export default Player;