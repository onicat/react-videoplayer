import React from 'react'
import { makeStyles, IconButton } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import StorageIcon from '@material-ui/icons/Storage';
import SettingsIcon from '@material-ui/icons/Settings';



const useStyles = makeStyles({
  root: {
    display: 'inline-block',
    padding: '10px'
  },
  iconButton: {
    borderRadius: '10%'
  }
});

const AppsMenu = () => {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <IconButton className={classes.iconButton}>
        <StorageIcon fontSize='large'/>
      </IconButton>
      <IconButton className={classes.iconButton}>
        <SettingsIcon fontSize='large'/>
      </IconButton>
      <IconButton className={classes.iconButton}>
        <GitHubIcon fontSize='large'/>
      </IconButton>
    </div>
  )
};

export default AppsMenu;