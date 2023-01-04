import React, { useCallback, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { ethers } from 'ethers';

import refreshIcon from '../assets/refresh-icon-white.png';
import loserImage from '../assets/loser.png';
import Floor from '../components/Floor';
import { fetchMyNfts } from '../httpRequests/requests';
import questionMark from '../assets/question-mark.png';

import classes from '../App.module.scss';

let provider
try {
  provider = new ethers.providers.Web3Provider(window.ethereum);
} catch (e) {
  console.warn('web3provider not found', e)
}

export default function FloorCheckerWithWallet({ ownProjectList, setPage, setOwnProjectList }) {
  const [isMenuOpen, setIsMenuOpen] = useState({});
  const [connectedWallet, setConnectedWallet] = useState('');

  const handleRemove = project => {
    setOwnProjectList(ownProjectList.filter(p => p.slug !== project));
  };

  const [refreshCounter, setRefreshCounter] = useState(0);
  const refreshFloors = () => {
    setRefreshCounter(c => c + 1);
  };

  const connectWallet = async () => {
    if (!provider) {
      alert('Install Metamask, please')
      return
    }
    // 'eth_requestAccounts' returns an array with one element (always one, LOL)
    const accounts = await provider.send('eth_requestAccounts', []);
    console.log({ accounts });
    setConnectedWallet(accounts[0])
    // const signer = provider.getSigner();
    // setConnectedWallet(signer.provider.provider.selectedAddress);
  };

  const fetchMyProjects = useCallback(async () => {
    if (!ownProjectList.length) {
      const myProjects = await fetchMyNfts(connectedWallet);
      console.log({ myProjects })
      
      let myProjectList
      if (!myProjects.data.length) {
        myProjectList = [
          {
            slug: 'imaloser',
            imageUrl: loserImage,
            name: "You don't own any NFTs in this wallet",
            floor: 'sucker',
            stats: {}
          }
        ];
      } else {
        myProjectList = myProjects.data.map(project => ({
          slug: project.slug,
          imageUrl: project.image_url || questionMark,
          name: project.name,
          floor: project.stats.floor_price,
          stats: project.stats,
        }));
      }

      console.log({ myProjects, myProjectList });
      setOwnProjectList(myProjectList)
    }
  }, [connectedWallet, ownProjectList.length, setOwnProjectList]);

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
        <div className={classes.walletInfo}>
          {connectedWallet ? (
            <button onClick={fetchMyProjects}>{connectedWallet}</button>
          ) : (
            <button onClick={connectWallet}>Connect wallet</button>
          )}
        </div>
      </div>

      {!provider ? (
        <p style={{ paddingTop: 120, textAlign: 'center' }}>you need to install metamask</p>
      ) : (
        <>
          <Droppable droppableId="floorCards">
            {provided => (
              <ul
                className={classes.floors}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {connectedWallet &&
                  ownProjectList.map((project, index) => {
                    return (
                      <Floor
                        key={project}
                        project={project}
                        handleRemove={handleRemove}
                        index={index}
                        refreshCounter={refreshCounter}
                        isMenuOpen={isMenuOpen}
                        setIsMenuOpen={setIsMenuOpen}
                        ownProjectList={ownProjectList}
                        setOwnProjectList={setOwnProjectList}
                        isOwn
                      />
                    );
                  })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </>
      )}
    </>
  );
}
