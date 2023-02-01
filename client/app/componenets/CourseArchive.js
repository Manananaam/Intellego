//react imports
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editCourse, isActiveCourse } from "../store/slices/courseSlices";

//bootstrap imports

const CourseArchive = ({ id, archive, setArchive }) => {
  const dispatch = useDispatch();

  const handleArchive = (e) => {
    e.preventDefault();
    dispatch(isActiveCourse());
    setArchive(false);
    console.log("Dont wanna handle archive.... ");
  };

  console.log(id, archive, setArchive);
  return <div onClick={handleArchive}></div>;
};

export default CourseArchive;
