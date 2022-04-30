import { useState } from 'react';

import Floor from './components/Floor';
import { useLocalStorage } from './hooks/useStorage/useStorage';

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
    '0xidentitiesgen1',
  ]);

  const [projectLink, setProjectLink] = useState();

  const handleChange = e => {
    setProjectLink(e.target.value);
  };

  const handleSave = () => {
    const lastSlashIndex = projectLink.lastIndexOf('/');
    const name = projectLink.substring(lastSlashIndex + 1);
    setProjectList([...projectList, name]);
    setProjectLink('')
  };

  const handleRemove = project => {
    setProjectList(projectList.filter(p => p !== project))
  };

  return (
    <div className="App">
      <div className={classes.pageHeader}>FLOOR CHECK</div>
      <div className={classes.form}>
        <label htmlFor="projectLink">Add OpenSea project link</label>
        <input
          id="projectLink"
          type="text"
          value={projectLink}
          onChange={handleChange}
        />
        <button onClick={handleSave}>Save</button>
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
