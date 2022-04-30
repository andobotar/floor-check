import { useState } from 'react';

import Floor from './components/Floor';
import { useLocalStorage } from './hooks/useStorage/useStorage';

import classes from './App.module.scss';
import { useWindowSize } from './hooks/useWindowSize';

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

  return (
    <div className="App">
      <div className={classes.pageHeader}>FLOOR CHECK</div>
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
      <div className={classes.floors}>
        {projectList.map(project => (
          <Floor key={project} project={project} handleRemove={handleRemove} />
        ))}
      </div>
    </div>
  );
}

export default App;
