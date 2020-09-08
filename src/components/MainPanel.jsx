import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, Paper, InputBase, IconButton, } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'
import AppsIcon from '@material-ui/icons/Apps';

const useStyles = makeStyles({
  toolbar: {
    display: 'flex',
    justifyContent: 'center'
  },
  searchForm: {
    width: '400px',
    padding: '2px 5px',
    display: 'flex'
  },
  searchInput: {
    padding: '0 5px',
    flexGrow: 1
  }
});

const MainPanel = () => {
  const classes = useStyles();
  
  return (
    <AppBar position='fixed'>
      <Toolbar className={classes.toolbar}>
        <Paper className={classes.searchForm}>
          <IconButton>
            <AppsIcon/>
          </IconButton>
          <InputBase placeholder='Search' className={classes.searchInput}/>
          <IconButton>
            <SearchIcon/>
          </IconButton>
        </Paper>
      </Toolbar>
    </AppBar>
  );
}

export default MainPanel;