import { useCallback, useState, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import questionMark from '../assets/question-mark.png';
import hambi from '../assets/hambi.png';
import { fetchProjectData, fetchProjectStats } from '../httpRequests/requests';
import FloorMenu from './FloorMenu';
import classes from './Floor.module.scss';

export default function Floor({ refreshCounter, handleRemove, index, project, isMenuOpen, setIsMenuOpen }) {
  const [projectDisplayName, setProjectDisplayName] = useState('');
  const [floor, setFloor] = useState('---');
  const [imgSrc, setImgSrc] = useState();
  // const [openseaLink, setOpenseaLink] = useState('');

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
      // setOpenseaLink()
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

  const handleMenuClick = () => {
    if (isMenuOpen[project]) {
      setIsMenuOpen({})
    } else {
      setIsMenuOpen({ [project]: true })
    }
  };

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
            <div className={classes.menuButton} onClick={handleMenuClick}>
              <img src={hambi} alt="Ξ" />
              {isMenuOpen[project] ? (
                <FloorMenu
                  handleRemove={() => handleRemove(project)}
                  openseaLink={`https://opensea.io/collection/${project}`}
                />
              ) : null}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
