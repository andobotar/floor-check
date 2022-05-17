import React from 'react';

import classes from './FloorMenu.module.scss';

export default function FloorMenu({ handleRemove, openseaLink }) {
  return (
    <div className={classes.container}>
      <div className={classes.menuItem} onClick={handleRemove}>
        Remove from list
      </div>
      <div className={classes.menuItem}>
        <a href={openseaLink}>View on OpenSea</a>
      </div>
    </div>
  );
}
