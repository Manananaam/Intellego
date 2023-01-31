import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllAssessments, selectAllAssessments } from "../store/slices/assessmentsTableSlice";
import Table from 'react-bootstrap/Table';
import { NavLink } from "react-router-dom";

const AssessmentsTable = () => {
  const allAssessments = useSelector(selectAllAssessments).assessments;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllAssessments());
  }, [dispatch])

  return (
    <>
    <Table striped bordered hover>
    <thead>
        <tr>
          <th>Assessment</th>
          {/* grab course name here */}
          <th>Average</th>
        </tr>
      </thead>
      <tbody>
        {allAssessments && allAssessments.length ? allAssessments.map((assessment) => (
        <tr key={assessment.id}>
          <td><NavLink to={`/assessments/${assessment.id}`}>{assessment.title}</NavLink></td>
        </tr>
        )) : <tr><td>No Assessments Yet!</td></tr>}
      </tbody>
    </Table>
    </>
  )
}

//courseId

export default AssessmentsTable;
