import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Badge, Button, ListGroup } from "react-bootstrap";
import { DashCircle } from "react-bootstrap-icons";
import { removeCourseFromAssessment } from "../store/slices/singleAssessmentSlice";

const AssociatedCourseListItem = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseName, courseId, assessmentId, activeSubmissions } = props;

  const handleDelete = () => {
    dispatch(removeCourseFromAssessment({ assessmentId, courseId }));
  };

  return (
    <>
      <ListGroup.Item key={courseId}>{courseName}</ListGroup.Item>
      {!activeSubmissions ? (
        <DashCircle onClick={handleDelete}></DashCircle>
      ) : null}
    </>
  );
};

export default AssociatedCourseListItem;
