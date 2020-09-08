import React from 'react'
import { Paper, InputBase, IconButton, makeStyles } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles({
  root: {
    width: '400px',
    padding: '2px 10px',
    display: 'flex'
  },
  input: {
    flexGrow: 1
  },
});

const SearchInputForm = () => {
  const classes = useStyles();
  
  return (
    <Paper className={classes.root}>
      <InputBase placeholder='Search' className={classes.input}/>
      <IconButton>
        <SearchIcon/>
      </IconButton>
    </Paper>
  )
}

export default SearchInputForm;