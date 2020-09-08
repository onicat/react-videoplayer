import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchInputForm from './SearchInputForm';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  toolbar: {
    display: 'flex',
    justifyContent: 'center'
  }
});

const MainPanel = () => {
  const classes = useStyles();
  
  return (
    <AppBar position='fixed'>
      <Toolbar className={classes.toolbar}>
        <SearchInputForm/>
      </Toolbar>
    </AppBar>
  );
}

export default MainPanel;