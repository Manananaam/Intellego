import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Badge, Button, ListGroup } from "react-bootstrap";
import { DashCircle } from "react-bootstrap-icons";

const AssociatedCourseListItem = (props) => {
  const { course, assessmentId } = props;
  const handleDelete = () => {
    console.log("delete clicky", course.id);
  };

  return (
    <>
      <ListGroup.Item key={course.id}>{course.name}</ListGroup.Item>
      <DashCircle></DashCircle>
    </>
  );
};

export default AssociatedCourseListItem;
