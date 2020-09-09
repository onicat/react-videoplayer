import React, { useEffect, useState, useRef } from 'react'
import TreeView from '@material-ui/lab/TreeView'
import TreeItem from '@material-ui/lab/TreeItem'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles, Box, Typography, CircularProgress, Divider } from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import MovieIcon from '@material-ui/icons/Movie';

import urlCreator from 'logic/urlCreator';

const useStyles = makeStyles({
  root: {
    width: '300px',
    height: '100%',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column'
  },
  divider: {
    margin: '10px 0'
  }, 
  progress: {
    margin: '30% auto'
  },
  iconicTreeItemLabel: {
    display: 'flex',
    alignItems: 'center'
  },
  iconicTreeItemText: {
    paddingLeft: '10px'
  }
});

const IconicTreeItem = ({type, text, children, ...props}) => {
  const classes = useStyles();
  const icon = (type === 'folder') ? <FolderIcon/> : <MovieIcon/>;
  
  return (
    <TreeItem
      label={
        <div className={classes.iconicTreeItemLabel}>
          {icon}
          <Typography 
            variant='body2'
            className={classes.iconicTreeItemText}
          >
            {text}
          </Typography>
        </div>
      }
      {...props}
    >
      {children}
    </TreeItem>
  )
};

const FileManager = ({setVideo}) => {
  const classes = useStyles();
  const [responseOkStatus, changeResponseOkStatus] = useState(null);
  const pathsRef = useRef(null);
  
  let content = null; 

  const renderTreeContent = (paths, currentPath = '') => {
    const nodeContent = [];
    
    for (let [nodeName, nodeOptions] of Object.entries(paths)) {
      const nodePath = `${currentPath}/${nodeName}`;
      
      if (nodeOptions.type === 'folder') {
        nodeContent.push(
          <IconicTreeItem 
            text={nodeName}
            type={nodeOptions.type}
            nodeId={nodePath}
            key={nodePath}
          >
            {renderTreeContent(nodeOptions.paths, nodePath)}
          </IconicTreeItem>
        );
      } else {
        nodeContent.push(
          <IconicTreeItem
            text={nodeName}
            type={nodeOptions.type}
            nodeId={nodePath}
            key={nodePath}
          ></IconicTreeItem>
        );
      }
    }

    return nodeContent;
  };

  useEffect(() => {
    fetch(urlCreator.paths())
      .then(response => {
        return response.json();
      })
      .then(paths => {
        pathsRef.current = paths;
        changeResponseOkStatus(true);
      })
      .catch(() => {
        changeResponseOkStatus(false);
      });
  }, []);

  if (responseOkStatus === null) {
    content = (
      <CircularProgress className={classes.progress}/>
    )
  } else if (responseOkStatus === true) {
    content = (
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {renderTreeContent(pathsRef.current)}
      </TreeView>
    )
  } else {
    content = (
      <Typography color='error'>
        Server is not available
      </Typography>
    )
  }

  return (
    <Box className={classes.root}>
      <Typography variant='h5'>
        File Manager
      </Typography>
      <Divider className={classes.divider}/>
      {content}
    </Box>
  )
};

export default FileManager;