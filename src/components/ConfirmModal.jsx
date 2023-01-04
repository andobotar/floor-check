import React from 'react';

import classes from './ConfirmModal.module.scss';

export default function ConfirmModal({ handleClose, handleOk, projectName }) {
  console.log('ConfirmModal');
  return (
    <div className={classes.modalBackdrop}>
      <div className={classes.modal}>
        <h3 className={classes.text}>Remove {projectName}?</h3>
        <div className={classes.buttonContainer}>
          <button onClick={handleClose} className={classes.cancelButton}>
            Cancel
          </button>
          <button onClick={handleOk} className={classes.okButton}>
            Yes, please
          </button>
        </div>
      </div>
    </div>
  );
}
