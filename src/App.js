import { useCallback, useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import LandingPage from './components/Landing';
import {
  useLocalStorage,
  useSessionStorage
} from './hooks/useStorage/useStorage';
import FloorChecker from './views/FloorChecker';

import classes from './App.module.scss';
import FloorCheckerWithWallet from './views/FloorCheckerWithWallet';
import { initialProjectList } from './constants/initialProjectList';

function App() {
  const [page, setPage] = useState('landing');
  const [projectList, setProjectList] = useLocalStorage(
    'fcProjectList',
    initialProjectList
  );
  const [ownProjectList, setOwnProjectList] = useSessionStorage(
    'ownProjectList',
    []
  );

  useEffect(() => {
    if (!projectList.length) {
      setProjectList(initialProjectList)
    }
  }, [projectList.length, setProjectList])

  const handleProjectDrag = useCallback(result => {
    const updatedList = [...projectList];
    const [reorderedItem] = updatedList.splice(result.source.index, 1);
    updatedList.splice(result.destination.index, 0, reorderedItem);
    setProjectList(updatedList);
  }, [projectList, setProjectList]);

  const handleOwnProjectDrag = useCallback(result => {
    const updatedList = [...ownProjectList];
    const [reorderedItem] = updatedList.splice(result.source.index, 1);
    updatedList.splice(result.destination.index, 0, reorderedItem);
    setOwnProjectList(updatedList);
  }, [ownProjectList, setOwnProjectList]);

  const handleDragEnd = useCallback((result) => {
    if (page === 'floorChecker') {
      handleProjectDrag(result);
    } else {
      handleOwnProjectDrag(result);
    }
  }, [handleOwnProjectDrag, handleProjectDrag, page]);

  return (
    <div className={classes.app}>
      <DragDropContext
        onDragStart={() => console.log('ondragstart')}
        onDragUpdate={() => console.log('ondragupdate')}
        onDragEnd={(result) => handleDragEnd(result)}
      >
        {page === 'landing' ? <LandingPage setPage={setPage} /> : null}
        {page === 'floorChecker' ? (
          <FloorChecker
            setPage={setPage}
            projectList={projectList}
            setProjectList={setProjectList}
          />
        ) : null}
        {page === 'floorCheckerWithWallet' ? (
          <FloorCheckerWithWallet
            setPage={setPage}
            ownProjectList={ownProjectList}
            setOwnProjectList={setOwnProjectList}
          />
        ) : null}
      </DragDropContext>
    </div>
  );
}

export default App;
