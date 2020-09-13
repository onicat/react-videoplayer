import React, { useState } from 'react'
import { ThemeProvider, styled } from '@material-ui/core/styles';

import Player from 'components/Player'
import theme from 'theme';
import { Box, makeStyles, Paper } from '@material-ui/core';
import urlCreator from 'logic/urlCreator';
import { SEARCH_PARAMS } from 'logic/constants';
import FileManager from 'components/FileManager';

const useStyles = makeStyles({
  root: {
    height: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  fileManagerContainer: {
    height: '100%'
  }
});

const PlayerContainer = styled(Box)({
  height: '100%',
  margin: '0 48px',
  boxSizing: 'border-box',
  flexGrow: 1,
  position: 'relative',
});

const App = () => {
  const classes = useStyles();
  const [video, setVideo] = useState(null);
  
  const setVideoWithReset = (nextVideo) => {
    if (video !== null) {
      URL.revokeObjectURL(video.src);
    }

    setVideo(nextVideo);
  };

  const sendVideoFileToServer = (file, path) => {
    const formData = new FormData();
    const xhr = new XMLHttpRequest();

    formData.append('video', file);
    
    xhr.open('POST', urlCreator.videos(SEARCH_PARAMS.PATH, path), true);

    xhr.send(formData);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Paper className={classes.fileManagerContainer}>
          <FileManager setVideo={setVideoWithReset} sendVideoFileToServer={sendVideoFileToServer}/>
        </Paper>
        <PlayerContainer>
          <Player video={video} setVideo={setVideoWithReset}/>
        </PlayerContainer>
      </div>
    </ThemeProvider>
  );
}

export default App;
