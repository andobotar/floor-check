import classes from './FloorMenu.module.scss';

export default function FloorMenu({
  openseaLink,
  gigamartLink,
  blurioLink,
  toggleShowModal
}) {
  return (
    <div className={classes.container}>
      <div className={classes.menuItem}>
        <a href={openseaLink}>View on OpenSea</a>
      </div>
      <div className={classes.menuItem}>
        <a href={gigamartLink}>View on GigaMart</a>
      </div>
      <div className={classes.menuItem}>
        <a href={blurioLink}>View on Blur.io</a>
      </div>
      <div className={classes.menuItem} onClick={toggleShowModal}>
        Remove from list
      </div>
    </div>
  );
}
