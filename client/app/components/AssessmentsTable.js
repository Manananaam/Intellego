import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllAssessments,
  selectAllAssessments,
} from "../store/slices/assessmentsTableSlice";
import Table from "react-bootstrap/Table";
import { NavLink } from "react-router-dom";
import { ArchiveFill, Archive, Trash3 } from "react-bootstrap-icons";

//maybe make a baby component here that renders either a trash or an archive depending on if there are submissions or not?

const AssessmentsTable = () => {
  const allAssessments = useSelector(selectAllAssessments).assessments;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllAssessments());
  }, []);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Assessment</th>
            <th>Course Name Here</th>
            <th>Average</th>
            <th>{<ArchiveFill />}</th>
          </tr>
        </thead>
        <tbody>
          {allAssessments && allAssessments.length ? (
            allAssessments
              .filter((assessment) => {
                return assessment.isActive;
              })
              .map((assessment) => (
                <tr key={assessment.id}>
                  <td>
                    <NavLink to={`/assessments/${assessment.id}`}>
                      {assessment.title}
                    </NavLink>
                  </td>
                  <td>Average for Course % Here</td>
                  <td>Total Average % Here</td>
                  <td>
                    <Archive />
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td>No Assessments Yet!</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

//courseId

export default AssessmentsTable;
