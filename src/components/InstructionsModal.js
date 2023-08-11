import React, { useState } from 'react';
import Modal from 'react-modal';
import '../InstructionsModal.css'; // Import your custom styling from app.css

const InstructionsModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      {/* Button to open the modal */}
      <button className="open-modal-btn" onClick={openModal}>Instructions</button>

      {/* The modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Instructions Modal"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        {/* Content inside the modal */}
        <p><b><u>Instructions:</u></b></p>
        <p> 1. Please choose your options one by one, in a <b>step-by-step order.</b> </p>

        <p> 2. Make sure you pick something for every search you perform.</p>

        <p> 3. If you close the session, all the temporary data, including your search and choices, will be deleted.</p>

        <p> 4. After you've finished making all your choices, click the <b>"Download Excel" button</b> to get your user-selections.xlsx file. </p>

        <p> 5. If you do not find the right SKU match in the options available, tap the <b>+ button</b> to expand the list to view more options.</p>

        <p> 6. The expanded list will also show 2 input fields which can take typed manual input against your searched description.</p>

        <p> 7. The first input field is for <b>SAP Item Number</b>, second is for <b>Product Description</b></p>

        <p> 8. The <b>Reset button</b> will reset your selection or manual for that particular searched description / databox. </p>
        <button className="open-modal-btn" onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default InstructionsModal;