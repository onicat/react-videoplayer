import React from 'react'
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
  alignItems: 'center'
});

const App = () => {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <MainPanel></MainPanel>
        <PlayerContainer>
          <Player/>
        </PlayerContainer>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
