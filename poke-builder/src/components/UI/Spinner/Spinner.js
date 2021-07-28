import React from 'react';
import classes from './Spinner.module.css'
const spinner = (props) => {
  return (
    <div className={classes.Loader} style={{ paddingTop: props.displaytop, paddingLeft: props.displayleft }}>
      <ul>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div className={classes.Cup}><span></span></div>
    </div>
  );
}

export default spinner;