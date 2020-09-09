import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, InputBase, IconButton, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'


const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'center',
  },
  searchForm: {
    paddingBottom: '5px',
    borderBottom: `1px solid ${theme.palette.text.primary}`
  },
  searchInput: {
    width: '400px',
    padding: '0 5px'
  }
}));

const MainPanel = () => {
  const classes = useStyles();
  
  return (
    <AppBar className={classes.root} color='transparent' position='fixed'>
      <Toolbar className={classes.toolbar}>
        <Box className={classes.searchForm}>
          <InputBase
            placeholder='Search' 
            className={classes.searchInput}
            endAdornment={
              <IconButton size='small'>
                <SearchIcon/>
              </IconButton>
            }
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default MainPanel;