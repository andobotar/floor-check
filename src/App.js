import React, { Suspense, useCallback, useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import LandingPage from './components/TestPage';
import {
  useLocalStorage,
  useSessionStorage
} from './hooks/useStorage/useStorage';
import FloorChecker from './views/FloorChecker';

import classes from './App.module.scss';
import { initialProjectList } from './constants/initialProjectList';

const FloorCheckerWithWallet = React.lazy(() =>
  import('./views/FloorCheckerWithWallet')
);

function App() {
  console.log('react app kutya', process.env.REACT_APP_KUTYA);
  console.log('sima kutya', process.env.KUTYA);
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
      setProjectList(initialProjectList);
    }
  }, [projectList.length, setProjectList]);

  const handleProjectDrag = useCallback(
    result => {
      const updatedList = [...projectList];
      const [reorderedItem] = updatedList.splice(result.source.index, 1);
      updatedList.splice(result.destination.index, 0, reorderedItem);
      setProjectList(updatedList);
    },
    [projectList, setProjectList]
  );

  const handleOwnProjectDrag = useCallback(
    result => {
      const updatedList = [...ownProjectList];
      const [reorderedItem] = updatedList.splice(result.source.index, 1);
      updatedList.splice(result.destination.index, 0, reorderedItem);
      setOwnProjectList(updatedList);
    },
    [ownProjectList, setOwnProjectList]
  );

  const handleDragEnd = useCallback(
    result => {
      if (page === 'floorChecker') {
        handleProjectDrag(result);
      } else {
        handleOwnProjectDrag(result);
      }
    },
    [handleOwnProjectDrag, handleProjectDrag, page]
  );

  return (
    <div className={classes.app}>
      <DragDropContext
        onDragStart={() => console.log('ondragstart')}
        onDragUpdate={() => console.log('ondragupdate')}
        onDragEnd={result => handleDragEnd(result)}
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
          <Suspense fallback={<h4>loading...</h4>}>
            <FloorCheckerWithWallet
              setPage={setPage}
              ownProjectList={ownProjectList}
              setOwnProjectList={setOwnProjectList}
            />
          </Suspense>
        ) : null}
      </DragDropContext>
    </div>
  );
}

export default App;
