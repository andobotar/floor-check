import React from 'react';

import classes from './Landing.module.scss';

export default function TestPage({ setPage }) {
  return (
    <div className={classes.container}>
      <div className={classes.outOfServiceMessage}>
        <h4>Opensea fucked us over by changing its endpoints</h4>
        <h5>
          I'm working on a solution but I don't have a lot of time so it's gonna
          take a while. Sorry.
        </h5>
      </div>
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
