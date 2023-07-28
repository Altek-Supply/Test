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
        <p>Instructions:</p>
        <p> 1. Please choose your options one by one, in a step-by-step order. </p>

        <p> 2. Make sure you pick something for every search you perform.</p>

        <p> 3. If you close the session, all the temporary data, including your search and choices, will be deleted.</p>

        <p> 4. After you've finished making all your choices, click the "Download Excel" button to get your user-selections.xlsx file. </p>
        <button className="open-modal-btn" onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default InstructionsModal;