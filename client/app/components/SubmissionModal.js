//~~~~~~~~~~~~~~~~~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// react/redux stuff
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

//boostrap
import { Modal } from "react-bootstrap";

//~~~~~~~~~~~~~~~~~~~~~~~~~THE GOOD STUFF~~~~~~~~~~~~~~~~~

const SubmissionModal = () => {
  return (
    <Modal size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
      {/* NOTE - how to add in show= and onHide=? pass functions in props? */}
    </Modal>
  );
};
export default SubmissionModal;
