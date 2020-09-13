import React from 'react'
import FolderIcon from '@material-ui/icons/Folder'
import MovieIcon from '@material-ui/icons/Movie'
import TreeItem from '@material-ui/lab/TreeItem'
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  label: {
    display: 'flex',
    alignItems: 'center'
  },
  text: {
    paddingLeft: '10px'
  },
});

const IconicPathsTreeItem = ({
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
        <div className={classes.label}>
          {icon}
          <Typography 
            variant='body2'
            className={classes.text}
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

export default IconicPathsTreeItem;