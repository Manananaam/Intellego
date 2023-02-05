import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Badge, Button, ListGroup } from "react-bootstrap";
import { DashCircle } from "react-bootstrap-icons";
import { removeCourseFromAssessment } from "../store/slices/singleAssessmentSlice";

const AssociatedCourseListItem = (props) => {
  const dispatch = useDispatch();
  const { course, courseId, assessmentId } = props;
  console.log("keys of course obj", Object.keys(course));
  const handleDelete = () => {
    dispatch(removeCourseFromAssessment(assessmentId, course.id));
  };

  return (
    <>
      <ListGroup.Item key={course.id}>{course.name}</ListGroup.Item>
      <DashCircle onClick={handleDelete}></DashCircle>
    </>
  );
};

export default AssociatedCourseListItem;
