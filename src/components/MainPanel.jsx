import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, InputBase, IconButton, Box, Drawer } from '@material-ui/core';
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
  const [isFileManagerVisible, toggleFileManagerDrawer] = useState(false);

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
        <IconButton 
          onClick={toggleFileManagerDrawer.bind(null, true)}
          className={classes.storageButton}
        >
          <StorageIcon/>
        </IconButton>
        <Drawer 
          anchor='right'
          open={isFileManagerVisible}
          onClose={toggleFileManagerDrawer.bind(null, false)}
        >
          
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}

export default MainPanel;