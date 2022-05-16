import { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import Floor from './components/Floor';
import LandingPage from './components/Landing';
import { useLocalStorage } from './hooks/useStorage/useStorage';
import { useWindowSize } from './hooks/useWindowSize';
import refreshIcon from './assets/refresh-icon-white.png';

import classes from './App.module.scss';

function App() {
  const [projectList, setProjectList] = useLocalStorage('projectList', [
    'impostors-genesis-aliens',
    'veefriends',
    'veefriends-series-2',
    'thehabibiz',
    'thebibiz',
    'curiocardswrapper',
    'satoshirunnersofficial',
    'genetic-chain-midnight-runner-pass',
    'superfarm',
    'samot-club',
    'we-are-kloud',
    '0xidentitiesgen1'
  ]);

  const [projectLink, setProjectLink] = useState();
  const { windowWidth } = useWindowSize();

  const [isLandingPage, setIsLandingPage] = useState(true);
  const toggleTestPage = () => setIsLandingPage(!isLandingPage);

  const handleChange = e => {
    setProjectLink(e.target.value);
  };

  const handleSave = () => {
    const lastSlashIndex = projectLink.lastIndexOf('/');
    const name = projectLink.substring(lastSlashIndex + 1);
    setProjectList([...projectList, name]);
    setProjectLink('');
  };

  const handleRemove = project => {
    setProjectList(projectList.filter(p => p !== project));
  };

  const [refreshCounter, setRefreshCounter] = useState(0)
  const refreshFloors = () => {
    setRefreshCounter(c => c + 1)
  };

  return (
    <div className={classes.app}>
      <DragDropContext
        onDragStart={() => console.log('ondragstart')}
        onDragUpdate={() => console.log('ondragupdate')}
        onDragEnd={result => {
          const updatedList = [...projectList];
          const [reorderedItem] = updatedList.splice(result.source.index, 1);
          updatedList.splice(result.destination.index, 0, reorderedItem);
          setProjectList(updatedList);
        }}
      >
        {isLandingPage ? (
          <LandingPage toggleTestPage={toggleTestPage} />
        ) : (
          <>
            <div className={classes.headerContainer}>
              <div className={classes.header}>
                <span className={classes.appName} onClick={toggleTestPage}>
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
                      />
                    );
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </>
        )}
      </DragDropContext>
    </div>
  );
}

export default App;
