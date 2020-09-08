import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, Paper, InputBase, IconButton, Popover, } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'
import AppsIcon from '@material-ui/icons/Apps';

import AppsMenu from './AppsMenu';

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
  const [anchorAppsPopover, setAnchorAppsPopover] = useState(null);
  const classes = useStyles();
  
  const handleAppsButtonClick = event => {
    setAnchorAppsPopover(event.currentTarget);
  };

  const handleAppsPopoverClosing = () => {
    setAnchorAppsPopover(null);
  };
  
  return (
    <AppBar position='fixed'>
      <Toolbar className={classes.toolbar}>
        <Paper className={classes.searchForm}>
          <IconButton onClick={handleAppsButtonClick}>
            <AppsIcon/>
          </IconButton>
          <InputBase placeholder='Search' className={classes.searchInput}/>
          <IconButton>
            <SearchIcon/>
          </IconButton>
        </Paper>
        <Popover 
            open={Boolean(anchorAppsPopover)}
            anchorEl={anchorAppsPopover}
            onClose={handleAppsPopoverClosing}
            anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
          >
            <AppsMenu/>
        </Popover>
      </Toolbar>
    </AppBar>
  );
}

export default MainPanel;