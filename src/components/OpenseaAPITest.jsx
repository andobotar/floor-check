import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import { openseaApiKey } from '../../OpenseaApiKey';
import classes from './OpenseaApiTest.module.scss';

export default function OpenseaAPITest() {
  useEffect(() => {
    console.log({ openseaApiKey });
  }, []);

  const [floor, setFloor] = useState('')

  const fetchHabibizInfo = useCallback(async () => {
    try {
      const res = await axios.get(
        'https://api.opensea.io/api/v1/collection/thehabibiz'
      );
      console.log('fetchHabibizInfo', { res });
    } catch (e) {
      console.log('error', e);
    }
  }, []);

  const fetchHabibizStats = useCallback(async () => { 
    try {
      const res = await axios.get(
        'https://api.opensea.io/api/v1/collection/thehabibiz/stats'
      );
      setFloor(res.data.stats.floor_price)
    } catch (error) {
      console.log({ error })
    }
  }, []);

  useEffect(() => {
    fetchHabibizInfo();
  }, [fetchHabibizInfo]);

  useEffect(() => {
    fetchHabibizStats()
  }, [fetchHabibizStats])

  const handleFetchHabibizInfo = () => {
    fetchHabibizInfo();
  };

  const handleFetchHabibizStats = () => {
    setFloor('---');
    fetchHabibizStats();
  };

  return (
    <div>
      <div className={classes.openseaButtonsContainer}>
        <button className={classes.button} onClick={handleFetchHabibizInfo}>
          fetch habibiz info
        </button>
        <button
          className={`${classes.button} ${classes.orangeButton}`}
          onClick={handleFetchHabibizStats}
        >
          fetch habibiz stats
        </button>
      </div>
      <div className={classes.floorContainer}>
        <div className={classes.floor}>
          <span>
            Habibiz' floor: <b>Ξ{floor}</b>
          </span>
        </div>
      </div>
    </div>
  );
}
