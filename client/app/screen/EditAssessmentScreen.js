import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchAssessment,
  selectAssessment,
  editAssessmentTitle,
  deleteQuestion,
  addAssociatedCourse,
  addQuestion,
} from "../store/slices/singleAssessmentSlice";

import {
  selectQuestion,
  editQuestionText,
  fetchSingleQuestion,
} from "../store/slices/questionSlice";
import { getCourses } from "../store";
import {
  Container,
  Navbar,
  Form,
  Button,
  Col,
  Row,
  ListGroup,
  Modal,
} from "react-bootstrap";
import AssociatedCourseListItem from "../components/AssociatedCourseListItem";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";

import {
  ArchiveFill,
  Archive,
  Trash3,
  PlusCircleFill,
  Pencil,
  QuestionSquareFill,
  ExclamationDiamondFill,
} from "react-bootstrap-icons";

const EditAssessmentScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { assessmentId } = useParams();
  const assessment = useSelector(selectAssessment);
  const { allcourses } = useSelector((state) => state.studentEnroll);
  const currentQuestion = useSelector(selectQuestion);

  const [assessmentTitle, setAssessmentTitle] = useState("");
  const [addCourseModalVisible, setAddCourseModalVisible] = useState(false);
  const [addQuestionModalVisible, setAddQuestionModalVisible] = useState(false);
  const [editQuestionModalVisible, setEditQuestionModalVisible] =
    useState(false);
  const [editNameModalVisible, setEditNameModalVisible] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [editQuestion, setEditQuestion] = useState("");
  const [questionId, setQuestionId] = useState(null);
  const [show, setShow] = useState(false);
  const target = useRef(null);

  useEffect(() => {
    dispatch(fetchAssessment(assessmentId));
    setAssessmentTitle(assessment.assessment.assessmentTitle);
  }, [dispatch, assessment.assessment.assessmentTitle]);

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  function handleAddQuestion() {
    dispatch(addQuestion({ assessmentId, questionText: newQuestion }));
    handleCloseAddQuestionModal();
    setNewQuestion("");
  }

  function handleCloseCourseModal() {
    setAddCourseModalVisible(false);
  }

  function handleCloseAddQuestionModal() {
    setAddQuestionModalVisible(false);
  }

  function handleCloseEditQuestionModal() {
    setEditQuestionModalVisible(false);
  }

  function handleCloseEditNameModal() {
    setEditNameModalVisible(false);
  }

  function handleNameChange() {
    dispatch(editAssessmentTitle({ assessmentId, assessmentTitle }));
    handleCloseEditNameModal();
  }

  function handleAddCourse(courseId) {
    dispatch(
      addAssociatedCourse({
        courseId,
        assessmentId,
      })
    );
  }

  function handleEditQuestion() {
    dispatch(
      editQuestionText({
        id: questionId,
        questionText: editQuestion,
      })
    );
    handleCloseEditQuestionModal();
    setEditQuestion("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(editAssessmentTitle({ assessmentId, assessmentTitle }));
    navigate("/assessments");
    navigate(0);
  }

  const activeSubmissions = () => {
    const arr = assessment.assessment.questions;
    for (let i = 0; i < arr.length; i++) {
      // if (arr[i].submissions.length && arr[i].submissions.length > 0) {
      //   return true;
      // }

      if (arr[i].submissions && arr[i].submissions[0]) {
        return true;
      }
    }
    return false;
  };

  const renderTooltip = (props) => (
    <Tooltip {...props}>Click here to grade student submissions.</Tooltip>
  );

  const renderExclamationTooltip = (props) => (
    <Tooltip {...props}>
      Questions may only be edited if there are no student submissions for the
      question.{" "}
    </Tooltip>
  );

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h1>
          {assessmentTitle || ""}
          {!activeSubmissions() ? (
            <Pencil onClick={setEditNameModalVisible} />
          ) : null}
        </h1>
        <OverlayTrigger
          placement='right'
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
        >
          <Button
            onClick={() => navigate(`/assessments/${assessmentId}/grades`)}
            className='orangeButton'
          >
            Assessment Grades
          </Button>
        </OverlayTrigger>
        <br />
        <Modal
          size='lg'
          aria-labelledby='contained-modal-title-vcenter'
          centered
          show={editNameModalVisible}
          onHide={handleCloseEditNameModal}
        >
          <Modal.Header>
            <Modal.Title>Edit Assessment Name</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group>
              <Form.Control
                // size="lg"
                //how can i make this change size to fit text?
                type='text'
                value={assessmentTitle || ""}
                onChange={(e) => setAssessmentTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button onClick={handleNameChange} style={{ marginTop: "10px" }}>
              Submit
            </Button>
          </Modal.Body>
        </Modal>

        <br />
        <hr />
        <Form.Group>
          <Form.Label>
            <h5>Associated Courses</h5>
          </Form.Label>{" "}
          <QuestionSquareFill ref={target} onClick={() => setShow(!show)} />
          <br />
          <Overlay target={target.current} show={show} placement='right'>
            {(props) => (
              <Tooltip {...props}>
                Click "Add Course" to assign this assessment to other courses.
              </Tooltip>
            )}
          </Overlay>
          <br />
          {assessment.assessment.associatedCourses &&
          assessment.assessment.associatedCourses.length ? (
            <ListGroup horizontal>
              {assessment.assessment.associatedCourses.map((course) => {
                const courseId = course.id;
                const courseName = course.name;

                let courseSub = () => {
                  let assessQs = assessment.assessment.questions;
                  if (assessQs && assessQs[0]) {
                    for (let i = 0; i < assessQs.length; i++) {
                      let tempSubmissions = assessQs[i].submissions;
                      if (tempSubmissions && tempSubmissions[0]) {
                        for (let j = 0; j < tempSubmissions.length; j++) {
                          if (tempSubmissions[j].courseId === courseId) {
                            return true;
                          }
                        }
                      }
                    }
                  }
                  return false;
                };

                return (
                  <AssociatedCourseListItem
                    key={course.id}
                    assessmentId={assessmentId}
                    courseId={courseId}
                    courseName={courseName}
                    activeSubmissions={courseSub()}
                  />
                );
              })}
            </ListGroup>
          ) : (
            <></>
          )}
          <br />
          <Button onClick={setAddCourseModalVisible} className='orangeButton'>
            Add Course
          </Button>
          <Modal
            // size="lg"
            // aria-labelledby="contained-modal-title-vcenter"
            // centered
            show={addCourseModalVisible}
            onHide={handleCloseCourseModal}
          >
            <Modal.Header>
              <Modal.Title>Add Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ListGroup>
                {allcourses && allcourses.length
                  ? allcourses.map((course) => {
                      //not updating state properly without hacky refresh
                      let currentCourseId = course.id;

                      let alreadyAssociated =
                        assessment.assessment.associatedCourses &&
                        assessment.assessment.associatedCourses.length
                          ? assessment.assessment.associatedCourses.filter(
                              (el) => el.id === currentCourseId
                            )
                          : [];

                      return alreadyAssociated.length ? (
                        <ListGroup.Item disabled key={course.id}>
                          {course.name}
                        </ListGroup.Item>
                      ) : (
                        <ListGroup.Item key={course.id}>
                          {course.name}
                          <PlusCircleFill
                            onClick={() => handleAddCourse(course.id)}
                          />
                        </ListGroup.Item>
                      );
                    })
                  : "You have no courses on record."}
              </ListGroup>
            </Modal.Body>
          </Modal>
        </Form.Group>
        <br />
        <hr />
        <Form.Group>
          <Form.Label>
            <h5>Questions</h5>
          </Form.Label>{" "}
          <OverlayTrigger
            placement='right'
            delay={{ show: 250, hide: 400 }}
            overlay={renderExclamationTooltip}
          >
            <ExclamationDiamondFill />
          </OverlayTrigger>
          <br />
          <br />
          <ListGroup>
            {assessment && assessment.assessment.questions.length ? (
              assessment.assessment.questions.map((question) => {
                function handleDeleteQuestion() {
                  dispatch(deleteQuestion(question.id));
                }

                function handleOpenEditQuestion() {
                  dispatch(fetchSingleQuestion(question.id));
                  setEditQuestion(question.questionText);
                  setQuestionId(question.id);
                  setEditQuestionModalVisible(true);
                }

                return (
                  <div key={question.id}>
                    <ListGroup.Item>
                      {question.questionText}
                      {!activeSubmissions() ? (
                        <>
                          <Trash3
                            onClick={handleDeleteQuestion}
                            style={{ marginLeft: "10px" }}
                          />
                          <Pencil onClick={handleOpenEditQuestion} />
                        </>
                      ) : null}
                    </ListGroup.Item>
                    <Modal
                      size='lg'
                      aria-labelledby='contained-modal-title-vcenter'
                      centered
                      show={editQuestionModalVisible}
                      onHide={handleCloseEditQuestionModal}
                    >
                      <Modal.Header>
                        <Modal.Title>Edit Question</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form.Group>
                          <Form.Control
                            as='textarea'
                            rows={6}
                            value={editQuestion}
                            onChange={(e) => setEditQuestion(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button onClick={handleEditQuestion}>Submit</Button>
                      </Modal.Body>
                    </Modal>
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </ListGroup>
          <br />
          {!activeSubmissions() ? (
            <Button
              type='button'
              onClick={setAddQuestionModalVisible}
              className='orangeButton'
            >
              Add Question
            </Button>
          ) : null}
          <Modal
            size='lg'
            aria-labelledby='contained-modal-title-vcenter'
            centered
            show={addQuestionModalVisible}
            onHide={handleCloseAddQuestionModal}
          >
            <Modal.Header>
              <Modal.Title>Add Question</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form.Group>
                <Form.Control
                  as='textarea'
                  rows={6}
                  value={newQuestion || ""}
                  onChange={(e) => setNewQuestion(e.target.value)}
                ></Form.Control>
                <Form.Control.Feedback type='invalid'>
                  Please enter a Question.
                </Form.Control.Feedback>
              </Form.Group>
              <br />
              <Button onClick={handleAddQuestion}>Submit</Button>
            </Modal.Body>
          </Modal>
        </Form.Group>
        <br />
      </Form>
    </>
  );
};

export default EditAssessmentScreen;
