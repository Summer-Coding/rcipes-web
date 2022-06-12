import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import PropTypes from 'prop-types';

const ProfileDeleteModal = ({ handleDelete }) => {
  return (
    <Modal toggle={function noRefCheck() {}}>
      <ModalHeader toggle={function noRefCheck() {}}>
        Delete Profile
      </ModalHeader>
      <ModalBody>Are you sure you want to delete your user?</ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleDelete}>
          Delete
        </Button>{' '}
        <Button onClick={function noRefCheck() {}}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

ProfileDeleteModal.propTypes = {
  handleDelete: PropTypes.func.isRequired,
};

export default ProfileDeleteModal;
