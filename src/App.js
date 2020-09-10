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
  
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <MainPanel setVideo={setVideo}></MainPanel>
        <PlayerContainer>
          <Player video={video}/>
        </PlayerContainer>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
