import { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import { Draggable } from 'react-beautiful-dnd';

import questionMark from '../assets/question-mark.png';
import classes from './Floor.module.scss';

export default function Floor({ project, handleRemove, index }) {
  const [projectDisplayName, setProjectDisplayName] = useState('');
  const [floor, setFloor] = useState('---');
  const [imgSrc, setImgSrc] = useState();

  const fetchStats = useCallback(async () => {
    // console.log(`Fetching data for ${project}`);
    setFloor('---');
    try {
      const res = await axios.get(
        `https://api.opensea.io/api/v1/collection/${project}/stats`
      );
      setFloor(res.data.stats.floor_price);

      const res2 = await axios.get(
        `https://api.opensea.io/api/v1/collection/${project}`
      );
      setImgSrc(res2.data.collection.image_url);
      setProjectDisplayName(res2.data.collection.name);
    } catch (error) {
      console.log({ error });
      if (error.response?.status === 404) {
        setImgSrc(questionMark);
      }
    }
  }, [project]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <Draggable key={project} draggableId={project} index={index}>
      {provided => (
        <div
          className={classes.card}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <img className={classes.img} src={imgSrc} alt="( :-O)=" />
          <div className={classes.floorContainer}>
            <div className={classes.floor} onClick={fetchStats}>
              <div>{`${projectDisplayName}`}</div>
              <b>{`Ξ${floor}`}</b>
            </div>
            <div
              className={classes.eraser}
              onClick={() => handleRemove(project)}
            >
              <span className={classes.x}>+</span>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
