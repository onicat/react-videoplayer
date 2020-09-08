import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#c2eafc',
      main: '#b3e5fc',
      dark: '#7da0b0'
    },
    secondary: {
      light: '#4dabf5',
      main: '#2196f3',
      dark: '#1769aa'
    }
  }
});

export default theme;