import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllAssessments,
  selectAllAssessments,
  isActiveAssessment,
} from "../store/slices/assessmentsTableSlice";
import { deleteAssessment } from "../store/slices/singleAssessmentSlice";
import Table from "react-bootstrap/Table";
import { NavLink, useNavigate } from "react-router-dom";
import { ArchiveFill, Archive, Trash3 } from "react-bootstrap-icons";

//maybe make a baby component here that renders either a trash or an archive depending on if there are submissions or not?

const AssessmentsTable = () => {
  const [isActive, setIsActive] = useState(false);
  const allAssessments = useSelector(selectAllAssessments).assessments;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const singleAssessment = useSelector(selectAssessment).assessment;

  console.log("all assessments:", allAssessments);

  useEffect(() => {
    dispatch(fetchAllAssessments());
  }, [dispatch]);

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
              .map((assessment) => {
                const assessmentId = assessment.id;
                return (
                <tr key={assessment.id}>
                  <td>
                    <NavLink to={`/assessments/${assessment.id}`}>
                      {assessment.title}
                    </NavLink>
                  </td>
                  <td>Average for Course % Here</td>
                  <td>Total Average % Here</td>
                  <td>
                    {assessment.questions.filter(
                      (question) => {return question.submissions.length > 0}
                    ).length ? (
                      <Archive
                        onClick={() => {
                          setIsActive(false);
                          dispatch(
                            isActiveAssessment({ assessmentId, isActive })
                          );
                          navigate(0)
                        }}
                      />
                    ) : (
                      <Trash3 onClick={() => {
                      dispatch(deleteAssessment({assessmentId}));
                      navigate(0)
                      }}/>
                    )}
                  </td>
                </tr>
                )
              })
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
