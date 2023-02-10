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

  // let courseSub = () => {
  //   let assessQs = assessment.assessment.questions;
  //   for (let i = 0; i < assessQs.length; i++) {
  //     let tempSubmissions = assessQs[i].submissions;
  //     for (let j = 0; j < tempSubmissions.length; j++) {
  //       if (
  //         tempSubmissions[j].courseId === currentCourseId
  //       ) {
  //         return true;
  //       }
  //     }
  //   }
  //   return false;
  // };

  const handleDelete = () => {
    dispatch(removeCourseFromAssessment({ assessmentId, courseId }));
    navigate(0);
    //hacky - need to figure out why useeffect isn't working
    //right now when i add associated courses to the useeffect array it is causing constant refreshes
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
