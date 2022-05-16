import React from 'react';

import classes from './Landing.module.scss';

export default function TestPage({ toggleTestPage }) {
  return (
    <div className={classes.container}>
      <div onClick={toggleTestPage} className={classes.button}>
        FLOOR CHECKER
      </div>
    </div>
  );
}
