import React, { useEffect, useState, useRef } from 'react'
import TreeView from '@material-ui/lab/TreeView'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles, Typography, CircularProgress, Divider, Paper, Button } from '@material-ui/core';
import produce from 'immer';

import urlCreator from 'logic/urlCreator';
import { SEARCH_PARAMS } from 'logic/constants';
import UploadsList from './UploadsList';
import IconicPathsTreeItem from './IconicPathsTreeItem';
import getFolderPathNode from 'logic/getFolderPathNode';

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
  dropZone: {
    backgroundColor: theme.palette.primary.main
  },
  tree: {
    flexGrow: 1
  }
}));

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

  const sendVideoFileToServer = (file, virtualFolderPath) => {
    const formData = new FormData();
    const xhr = new XMLHttpRequest();
    const virtualFilePath = (() => {
      if (virtualFolderPath === '') {
        return file.name;
      } else {
        return `${virtualFolderPath}/${file.name}`
      }
    })();

    formData.append('video', file);
    
    xhr.open('POST', urlCreator.videos(SEARCH_PARAMS.PATH, virtualFilePath), true);

    setUploads(uploads => ({
      ...uploads,
      [virtualFilePath]: {
        progress: 0,
        xhr
      }
    }));

    xhr.upload.onprogress = event => {
      setUploads(uploads => ({
        ...uploads,
        [virtualFilePath]: {
          progress: 100 * event.loaded / event.total,
          xhr
        }
      }));
    };

    xhr.upload.onload = () => {
      setPaths(produce(draftPaths => {
        const fileNode = getFolderPathNode(virtualFolderPath, draftPaths);

        fileNode[file.name] = {
          type: file.type,
          paths: null
        };
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

  const handleFileDrop = (virtualFolderPath, event) => {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.classList.remove(classes.dropZone);

    const file = event.dataTransfer.files[0];

    sendVideoFileToServer(file, virtualFolderPath);
  };

  const renderTreeContent = (paths, currentVirtualPath) => {
    if (paths === null) return;
    
    const nodeContent = [];
    
    for (let [nodeName, nodeOptions] of Object.entries(paths)) {
      const nodePath = (currentVirtualPath) ? `${currentVirtualPath}/${nodeName}` : nodeName;
      
      if (nodeOptions.type === 'folder') {
        nodeContent.push(
          <IconicPathsTreeItem 
            text={nodeName}
            nodeType={nodeOptions.type}
            virtualPath={nodePath}
            key={nodePath}
            onDragOver={handleFileDragOver}
            onDrop={handleFileDrop.bind(null, nodePath)}
            onDragLeave={handleFileDragLeave} 
          >
            {renderTreeContent(nodeOptions.paths, nodePath)}
          </IconicPathsTreeItem>
        );
      } else {
        nodeContent.push(
          <IconicPathsTreeItem
            text={nodeName}
            nodeType={nodeOptions.type}
            virtualPath={nodePath}
            key={nodePath}
            handleVideoItemClick={handleVideoItemClick}
          ></IconicPathsTreeItem>
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