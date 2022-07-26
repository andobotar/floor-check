import React from 'react';

import classes from './Landing.module.scss';

export default function TestPage({ setPage }) {
  return (
    <div className={classes.container}>
      <div onClick={() => setPage('floorChecker')} className={classes.button}>
        FLOOR CHECKER - ANY NFT
      </div>
      <div
        onClick={() => setPage('floorCheckerWithWallet')}
        className={classes.button}
      >
        FLOOR CHECKER - MY NFTs
      </div>
    </div>
  );
}
