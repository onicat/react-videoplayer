import React from 'react'
import { Paper, InputBase, IconButton, makeStyles } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import AppsIcon from '@material-ui/icons/Apps';

const useStyles = makeStyles({
  root: {
    width: '400px',
    padding: '2px 5px',
    display: 'flex'
  },
  input: {
    padding: '0 5px',
    flexGrow: 1
  },
});

const SearchInputForm = () => {
  const classes = useStyles();
  
  return (
    <Paper className={classes.root}>
      <IconButton>
        <AppsIcon/>
      </IconButton>
      <InputBase placeholder='Search' className={classes.input}/>
      <IconButton>
        <SearchIcon/>
      </IconButton>
    </Paper>
  )
}

export default SearchInputForm;