import React from 'react';

import classes from './Landing.module.scss';

export default function TestPage({ setPage }) {
  return (
    <div className={classes.container}>
      <div className={classes.outOfServiceMessage}>
        <h3>FLOOR CHECK is temporarily down</h3>
        <h5>Opensea changed its endpoints and we can't get data for now.</h5>
        <h6>
          I'm working on a solution but I don't have a lot of time so it's gonna
          take a while. Sorry.
        </h6>
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
