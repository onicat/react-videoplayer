import React, { useEffect, useState, useRef } from 'react'
import TreeView from '@material-ui/lab/TreeView'
import TreeItem from '@material-ui/lab/TreeItem'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles, Typography, CircularProgress, Divider, Paper } from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import MovieIcon from '@material-ui/icons/Movie';

import urlCreator from 'logic/urlCreator';
import { SEARCH_PARAMS } from 'logic/constants';

const useStyles = makeStyles(theme => ({
  root: {
    width: '300px',
    height: '100%',
    padding: '24px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    userSelect: 'none'
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
  },
  dropZone: {
    backgroundColor: theme.palette.primary.main
  },
  tree: {
    flexGrow: 1
  }
}));

const IconicTreeItem = ({
  type,
  text,
  children,
  path,
  handleVideoItemClick,
  ...props
}) => {
  const classes = useStyles();
  const icon = (type === 'folder') ? <FolderIcon/> : <MovieIcon/>;

  return (
    <TreeItem
      onDoubleClick={
        (type !== 'folder') ? () => handleVideoItemClick(path, type) : null
      }
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
      nodeId={path}
      {...props}
    >
      {children}
    </TreeItem>
  )
};

const FileManager = ({setVideo, sendVideoFileToServer}) => {
  const classes = useStyles();
  const [responseOkStatus, changeResponseOkStatus] = useState(null);
  const pathsRef = useRef(null);
  
  let content = null; 

  const handleVideoItemClick = (path, type) => {
    setVideo({src: urlCreator.videos(SEARCH_PARAMS.PATH, path), type});
  };

  const handleFileDragLeave = (event) => {
    event.currentTarget.classList.remove(classes.dropZone);
  }

  const handleFileDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    event.currentTarget.classList.add(classes.dropZone);
    event.dataTransfer.dropEffect = "move";
  };

  const handleFileDrop = (folderPath, event) => {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.classList.remove(classes.dropZone);

    const file = event.dataTransfer.files[0];
    const path = (folderPath.length === 0) ? file.name : `${folderPath}/${file.name}`;

    sendVideoFileToServer(file, path);
  };

  const renderTreeContent = (paths, currentPath) => {
    if (paths === null) return;
    
    const nodeContent = [];
    
    for (let [nodeName, nodeOptions] of Object.entries(paths)) {
      const nodePath = (currentPath) ? `${currentPath}/${nodeName}` : nodeName;
      
      if (nodeOptions.type === 'folder') {
        nodeContent.push(
          <IconicTreeItem 
            text={nodeName}
            type={nodeOptions.type}
            path={nodePath}
            key={nodePath}
            onDragOver={handleFileDragOver}
            onDrop={handleFileDrop.bind(null, nodePath)}
            onDragLeave={handleFileDragLeave} 
          >
            {renderTreeContent(nodeOptions.paths, nodePath)}
          </IconicTreeItem>
        );
      } else {
        nodeContent.push(
          <IconicTreeItem
            text={nodeName}
            type={nodeOptions.type}
            path={nodePath}
            key={nodePath}
            handleVideoItemClick={handleVideoItemClick}
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
        className={classes.tree}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        onDragOver={handleFileDragOver}
        onDrop={handleFileDrop.bind(null, '')}
        onDragLeave={handleFileDragLeave} 
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
    <Paper className={classes.root}>
      <Typography variant='h5'>
        File Manager
      </Typography>
      <Divider className={classes.divider}/>
      {content}
    </Paper>
  )
};

export default FileManager;