import React, { useState } from 'react'
import { ThemeProvider, styled } from '@material-ui/core/styles';

import MainPanel from './components/MainPanel'
import Player from 'components/Player'
import theme from 'theme';
import { Box } from '@material-ui/core';
import urlCreator from 'logic/urlCreator';
import { SEARCH_PARAMS } from 'logic/constants';

const PlayerContainer = styled(Box)({
  height: 'calc(100vh - 64px)',
  paddingTop: '64px',
  display: 'flex',
  justifyContent: 'center',
});

const App = () => {
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
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <MainPanel 
          sendVideoFileToServer={sendVideoFileToServer}
          setVideo={setVideoWithReset}
        ></MainPanel>
        <PlayerContainer>
          <Player video={video} setVideo={setVideoWithReset}/>
        </PlayerContainer>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
