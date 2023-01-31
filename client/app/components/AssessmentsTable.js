import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllAssessments, selectAllAssessments } from "../store/slices/assessmentsTableSlice";
import Table from 'react-bootstrap/Table';

const AssessmentsTable = () => {
  const allAssessments = useSelector(selectAllAssessments).assessments;
  const dispatch = useDispatch();

  useEffect( () => {
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
          <td>{assessment.title}</td>
        </tr>
        )) : <tr><td>No Assessments Yet!</td></tr>}
      </tbody>
    </Table>
    </>
  )
}

//courseId

export default AssessmentsTable;
