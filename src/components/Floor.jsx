import { useCallback, useState, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import questionMark from '../assets/question-mark.png';
import { fetchProjectData, fetchProjectStats } from '../httpRequests/requests';
import classes from './Floor.module.scss';

export default function Floor({
  refreshCounter,
  handleRemove,
  index,
  project
}) {
  const [projectDisplayName, setProjectDisplayName] = useState('');
  const [floor, setFloor] = useState('---');
  const [imgSrc, setImgSrc] = useState();

  const fetchFloor = useCallback(async () => {
    setFloor('---');
    try {
      const res = await fetchProjectStats(project);
      setFloor(res.data.stats.floor_price);
    } catch (error) {
      console.log({ error });
    }
  }, [project]);

  const fetchImg = useCallback(async () => {
    try {
      const res = await fetchProjectData(project);
      setImgSrc(res.data.collection.image_url);
      setProjectDisplayName(res.data.collection.name);
    } catch (error) {
      console.log({ error });
      if (error.response?.status === 404) {
        setImgSrc(questionMark);
      }
    }
  }, [project]);

  useEffect(() => {
    fetchFloor();
    fetchImg();
  }, [fetchFloor, fetchImg]);

  useEffect(() => {
    fetchFloor();
  }, [refreshCounter, fetchFloor]);

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
            <div className={classes.floor} onClick={fetchFloor}>
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
