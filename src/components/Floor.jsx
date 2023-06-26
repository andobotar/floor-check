import { useCallback, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import hambi from '../assets/hambi.png';
import {
  fetchProjectStats
  // getFloorByContractAddress
} from '../httpRequests/requests';
import FloorMenu from './FloorMenu';
import classes from './Floor.module.scss';
import { createPortal } from 'react-dom';
import ConfirmModal from './ConfirmModal';

export default function Floor({
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
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState();

  const fetchFloor = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetchProjectStats(project.slug);
      const floor = res.data.stats.floor_price;
      const savedProjectList = isOwn ? ownProjectList : projectList;
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
        setOwnProjectList(updatedProjectList);
      } else {
        setProjectList(updatedProjectList);
      }
      setIsLoading(false);
    } catch (error) {
      console.log({ error });
      setIsLoading(false);
    }
  }, [
    isOwn,
    ownProjectList,
    project.slug,
    projectList,
    setOwnProjectList,
    setProjectList
  ]);

  const handleMenuClick = () => {
    if (isMenuOpen[project.slug]) {
      setIsMenuOpen({});
    } else {
      setIsMenuOpen({ [project.slug]: true });
    }
  };

  const toggleShowModal = () => setShowModal(current => !current);

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
              <b>{isLoading ? '...' : `Ξ${project.floor}`}</b>
            </div>
            <div className={classes.menuButton} onClick={handleMenuClick}>
              <img src={hambi} alt="Ξ" />
              {isMenuOpen[project.slug] ? (
                <FloorMenu
                  openseaLink={`https://opensea.io/collection/${project.slug}`}
                  gigamartLink={`https://gigamart.com/collections/${project.slug}`}
                  blurioLink={`https://blur.io/collection/${project.slug}`}
                  toggleShowModal={toggleShowModal}
                />
              ) : null}
            </div>
            {showModal &&
              createPortal(
                <ConfirmModal
                  projectName={project.name}
                  handleClose={toggleShowModal}
                  handleOk={() => handleRemove(project.slug)}
                />,
                document.body
              )}
          </div>
        </div>
      )}
    </Draggable>
  );
}
