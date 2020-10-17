import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      alignSelf:'center',
      justifyContent: 'center',
      alignItems: 'center'
    
    },
  }));

const Loader = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
        
        <CircularProgress color="secondary" />
      </div>
    )
}

export default Loader
