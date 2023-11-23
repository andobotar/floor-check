import osLogo from '../assets/logos/os.png';
import osProLogo from '../assets/logos/ospro.png';
import blurLogo from '../assets/logos/blur.png';
import gmLogo from '../assets/logos/gm.png';
import trashCan from '../assets/logos/trash.png';

import classes from './FloorMenu.module.scss';

export default function FloorMenu({
  openseaLink,
  openseaProLink,
  blurioLink,
  gigamartLink,
  toggleShowModal
}) {
  return (
    <div className={classes.container}>
      <a href={openseaLink} className={classes.menuItem}>
        <img src={osLogo} alt="os" className={classes.logo} />
        <span>OpenSea</span>
      </a>
      <a href={openseaProLink} className={classes.menuItem}>
        <img src={osProLogo} alt="os pro" className={classes.logo} />
        <span>OpenSea Pro</span>
      </a>
      <a href={blurioLink} className={classes.menuItem}>
        <img src={blurLogo} alt="blur" className={classes.logo} />
        <span>Blur</span>
      </a>
      <a href={gigamartLink} className={classes.menuItem}>
        <img src={gmLogo} alt="gm" className={classes.logo} />
        <span>Gigamart</span>
      </a>
      <div className={classes.menuItem} onClick={toggleShowModal}>
        <img src={trashCan} alt="trash" className={classes.logo} />
        <span>REMOVE</span>
      </div>
    </div>
  );
}
