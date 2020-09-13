import React, { useEffect, useState, useRef } from 'react'
import TreeView from '@material-ui/lab/TreeView'
import TreeItem from '@material-ui/lab/TreeItem'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles, Typography, CircularProgress, Divider, Paper, Button } from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import MovieIcon from '@material-ui/icons/Movie';

import urlCreator from 'logic/urlCreator';
import { SEARCH_PARAMS } from 'logic/constants';
import UploadsList from './UploadsList';

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
  nodeType,
  text,
  children,
  virtualPath,
  handleVideoItemClick,
  ...props
}) => {
  const classes = useStyles();
  const icon = (nodeType === 'folder') ? <FolderIcon/> : <MovieIcon/>;

  return (
    <TreeItem
      onDoubleClick={
        (nodeType !== 'folder') ? () => handleVideoItemClick(virtualPath, nodeType) : null
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
      nodeId={virtualPath}
      {...props}
    >
      {children}
    </TreeItem>
  )
};

const FileManager = ({setVideo}) => {
  const classes = useStyles();
  const [responseOkStatus, changeResponseOkStatus] = useState(null);
  const [uploads, setUploads] = useState({});
  const [uploadsListOpen, setUploadsListOpen] = useState(false);
  const [paths, setPaths] = useState(null);
  const uploadsButtonAnchorRef = useRef(null);
  
  let content = null; 

  const toggleUploadsList = () => {
    setUploadsListOpen(!uploadsListOpen);
  };

  const sendVideoFileToServer = (file, virtualFilePath) => {
    const formData = new FormData();
    const xhr = new XMLHttpRequest();

    formData.append('video', file);
    
    xhr.open('POST', urlCreator.videos(SEARCH_PARAMS.PATH, virtualFilePath), true);

    setUploads(uploads => ({
      ...uploads,
      [file.name]: {
        progress: 0,
        xhr
      }
    }));

    xhr.upload.onprogress = event => {
      setUploads(uploads => ({
        ...uploads,
        [file.name]: {
          progress: 100 * event.loaded / event.total,
          xhr
        }
      }));
    };

    xhr.send(formData);
  };

  const handleVideoItemClick = (virtualFilePath, videoMIMEType) => {
    setVideo({
      src: urlCreator.videos(SEARCH_PARAMS.PATH, virtualFilePath),
      type: videoMIMEType
    });
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
    const virtualFilePath = (folderPath.length === 0) ? file.name : `${folderPath}/${file.name}`;

    sendVideoFileToServer(file, virtualFilePath);
  };

  const renderTreeContent = (paths, currentVirtualPath) => {
    if (paths === null) return;
    
    const nodeContent = [];
    
    for (let [nodeName, nodeOptions] of Object.entries(paths)) {
      const nodePath = (currentVirtualPath) ? `${currentVirtualPath}/${nodeName}` : nodeName;
      
      if (nodeOptions.type === 'folder') {
        nodeContent.push(
          <IconicTreeItem 
            text={nodeName}
            nodeType={nodeOptions.type}
            virtualPath={nodePath}
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
            nodeType={nodeOptions.type}
            virtualPath={nodePath}
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
        setPaths(paths);
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
        {renderTreeContent(paths)}
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
      <Button 
        onClick={toggleUploadsList}
        ref={uploadsButtonAnchorRef}
      >
        Uploads
      </Button>
      <UploadsList 
        anchorEl={uploadsButtonAnchorRef.current}
        open={uploadsListOpen}
        uploads={uploads}
        setUploads={setUploads}
      />
    </Paper>
  )
};

export default FileManager;