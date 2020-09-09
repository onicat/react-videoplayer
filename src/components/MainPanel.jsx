import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, InputBase, IconButton, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'
import StorageIcon from '@material-ui/icons/Storage';

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
  },
  storageButton: {
    position: 'absolute',
    right: '24px',
    marginLeft: '0'
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
        <IconButton className={classes.storageButton}>
          <StorageIcon/>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default MainPanel;