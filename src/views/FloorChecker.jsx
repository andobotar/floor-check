import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';

import refreshIcon from '../assets/refresh-icon-white.png';
import Floor from '../components/Floor';
import { useWindowSize } from '../hooks/useWindowSize';
import questionMark from '../assets/question-mark.png';

import classes from '../App.module.scss';
import { fetchNameAndImg } from '../httpRequests/requests';

export default function FloorChecker({ projectList, setPage, setProjectList }) {
  const { windowWidth } = useWindowSize();

  const [isMenuOpen, setIsMenuOpen] = useState({});
  const [projectLink, setProjectLink] = useState();

  const handleChange = e => {
    setProjectLink(e.target.value);
  };

  const handleSave = async () => {
    const lastSlashIndex = projectLink.lastIndexOf('/');
    const slug = projectLink.substring(lastSlashIndex + 1);
    const { name, imageUrl } = await fetchNameAndImg(slug)

    setProjectList([
      ...projectList,
      {
        slug,
        floor: 'Click here to fetch floor',
        imageUrl: imageUrl || questionMark,
        name,
        stats: {}
      }
    ]);
    setProjectLink('');
  };

  const handleRemove = project => {
    setProjectList(projectList.filter(p => p !== project));
  };

  const [refreshCounter, setRefreshCounter] = useState(0);
  const refreshFloors = () => {
    setRefreshCounter(c => c + 1);
  };

  return (
    <>
      <div className={classes.headerContainer}>
        <div className={classes.header}>
          <span className={classes.appName} onClick={() => setPage('landing')}>
            FLOOR CHECK
          </span>
          <img src={refreshIcon} alt="O" onClick={refreshFloors} />
        </div>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <label htmlFor="projectLink">
            {windowWidth > 640 ? 'Add OpenSea project link' : 'Add Link'}
          </label>
          <input
            id="projectLink"
            type="text"
            value={projectLink}
            onChange={handleChange}
          />
          <button onClick={handleSave} className="button">
            Save
          </button>
        </div>
      </div>

      <Droppable droppableId="floorCards">
        {provided => (
          <ul
            className={classes.floors}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {projectList.map((project, index) => {
              return (
                <Floor
                  key={project}
                  project={project}
                  handleRemove={handleRemove}
                  index={index}
                  refreshCounter={refreshCounter}
                  isMenuOpen={isMenuOpen}
                  setIsMenuOpen={setIsMenuOpen}
                  isOwn={false}
                  projectList={projectList}
                  setProjectList={setProjectList}
                />
              );
            })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </>
  );
}
