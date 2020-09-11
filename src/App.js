import React, { useState } from 'react'
import { ThemeProvider, styled } from '@material-ui/core/styles';

import MainPanel from './components/MainPanel'
import Player from 'components/Player'
import theme from 'theme';
import { Box } from '@material-ui/core';

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

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <MainPanel setVideo={setVideoWithReset}></MainPanel>
        <PlayerContainer>
          <Player video={video} setVideo={setVideoWithReset}/>
        </PlayerContainer>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
