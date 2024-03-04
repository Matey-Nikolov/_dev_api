import { Modal, Button } from 'react-bootstrap';

function AcknowledgeHelpModal ({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Acknowledge Action</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          The "Acknowledge" action is used to confirm that you have seen an alert and are aware of it.
          This action does not resolve the alert, but it lets your team know that you are working on it.
          To acknowledge an alert, simply click on the "Acknowledge" button next to the alert.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AcknowledgeHelpModal;