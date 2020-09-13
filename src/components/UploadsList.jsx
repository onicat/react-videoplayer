import { Box, Button, LinearProgress, List, ListItem, makeStyles, Popper, Typography } from '@material-ui/core';
import truncStringFromEnd from 'logic/truncStringFromEnd';
import React from 'react'

const useStyles = makeStyles(theme => ({
  list: {
    width: '252px',
    boxShadow: theme.shadows[2],
    borderRadius: theme.shape.borderRadius
  },
  optionsBox: {
    margin: '0 6px',
    flexGrow: 1
  },
  progress: {
    marginTop: '6px'
  }
}));

const UploadsList = ({uploads, setUploads, ...props}) => {
  const classes = useStyles();
  
  const handleActionButtonClick = (filename, xhr) => {
    if (xhr.readyState !== 'DONE') {
      xhr.abort();
    }

    const newUploads = {...uploads};

    delete newUploads[filename];
    setUploads(newUploads)
  };

  const renderUploads = () => {
    let content = [];

    for (let [name, options] of Object.entries(uploads)) {
      content.push(
        <ListItem key={name}>
          <Box className={classes.optionsBox}>
            <Typography title={name} color='textPrimary' variant='body2'>
              {(name.length > 19) ? truncStringFromEnd(name, 19) : name}
            </Typography>
            <LinearProgress 
              className={classes.progress}
              variant='determinate'
              value={options.progress}
            />
          </Box>
          <Button
            onClick={handleActionButtonClick.bind(null, name, options.xhr)}
          >
            {(options.progress < 100) ? 'Abort' : 'Clear'}   
          </Button>
        </ListItem>
      );
    }

    if (content.length === 0) {
      content = (
        <ListItem>
          <Typography color='textPrimary' variant='body2'>
            Upload stack is empty
          </Typography>
        </ListItem>
      )
    }

    return content;
  };
  
  return (
    <Popper
      open={true}
      {...props}
    >
      <List className={classes.list}>
        {renderUploads()}
      </List>
    </Popper>
  )
};

export default UploadsList;