import { useCallback } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import hambi from '../assets/hambi.png';
import { fetchProjectStats } from '../httpRequests/requests';
import FloorMenu from './FloorMenu';
import classes from './Floor.module.scss';

export default function Floor({
  refreshCounter,
  handleRemove,
  index,
  project,
  isMenuOpen,
  setIsMenuOpen,
  ownProjectList,
  setOwnProjectList,
  isOwn,
  projectList,
  setProjectList
}) {
  console.log({ project  });
  const fetchFloor = useCallback(async () => {
    try {
      const res = await fetchProjectStats(project.slug);
      const floor = res.data.stats.floor_price;
      const savedProjectList = isOwn ? ownProjectList : projectList
      const updatedProjectList = savedProjectList.map(savedProject => {
        if (savedProject.slug === project.slug) {
          return {
            ...savedProject,
            floor
          };
        }
        return savedProject;
      });
      if (isOwn) {
        setOwnProjectList(updatedProjectList)
      } else {
        setProjectList(updatedProjectList)
      }
    } catch (error) {
      console.log({ error });
    }
  }, [isOwn, ownProjectList, project.slug, projectList, setOwnProjectList, setProjectList]);

  const handleMenuClick = () => {
    if (isMenuOpen[project.slug]) {
      setIsMenuOpen({});
    } else {
      setIsMenuOpen({ [project.slug]: true });
    }
  };

  return (
    <Draggable key={project.slug} draggableId={project.slug} index={index}>
      {provided => (
        <div
          className={classes.card}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <img className={classes.img} src={project.imageUrl} alt="( :-O)=" />
          <div className={classes.floorContainer}>
            <div className={classes.floor} onClick={fetchFloor}>
              <div>{`${project.name}`}</div>
              <b>{`Ξ${project.floor}`}</b>
            </div>
            <div className={classes.menuButton} onClick={handleMenuClick}>
              <img src={hambi} alt="Ξ" />
              {isMenuOpen[project.slug] ? (
                <FloorMenu
                  handleRemove={() => handleRemove(project.slug)}
                  openseaLink={`https://opensea.io/collection/${project.slug}`}
                />
              ) : null}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
