import React, { useEffect, useState } from "react";
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

import {
  ArchiveFill,
  Archive,
  Trash3,
  PlusCircleFill,
  Pencil,
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

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(editAssessmentTitle({ assessmentId, assessmentTitle }));
    navigate("/assessments");
    navigate(0);
  }

  const activeSubmissions = () => {
    const arr = assessment.assessment.questions;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].submissions.length > 0) {
        return true;
      }
    }
    return false;
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h2>
          {assessmentTitle || ""}
          {!activeSubmissions() ? (
            <Pencil onClick={setEditNameModalVisible} />
          ) : null}
        </h2>
        <Button onClick={() => navigate(`/assessments/${assessmentId}/grades`)}>
          Assessment Grades
        </Button>
        <Modal
          size='lg'
          aria-labelledby='contained-modal-title-vcenter'
          centered
          show={editNameModalVisible}
          onHide={handleCloseEditNameModal}
        >
          <Modal.Title>Edit Assessment Name</Modal.Title>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Assessment Title</Form.Label>

              <Form.Control
                size='lg'
                //how can i make this change size to fit text?
                type='text'
                value={assessmentTitle || ""}
                onChange={(e) => setAssessmentTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button onClick={handleNameChange}>Submit</Button>
          </Modal.Body>
        </Modal>

        {/* <Form.Group>
          <Form.Label>Assessment Title</Form.Label>

          <Form.Control
            size='lg'
            //how can i make this change size to fit text?
            type='text'
            value={assessmentTitle || ""}
            onChange={(e) => setAssessmentTitle(e.target.value)}
          ></Form.Control>
        </Form.Group> */}
        <br />
        <Form.Group>
          <Form.Label>Associated Courses</Form.Label>
          <br />
          {/* note: i would love these to appear like chip tags, but don't want to spend too much time right now trying to get that working. in the future, could be worth playing with.
          https://codepen.io/broneks/pen/objeqq */}
          {assessment.assessment.associatedCourses &&
          assessment.assessment.associatedCourses.length ? (
            <ListGroup horizontal>
              {assessment.assessment.associatedCourses.map((course) => {
                const courseId = course.id;
                const courseName = course.name;

                let courseSub = () => {
                  let assessQs = assessment.assessment.questions;
                  for (let i = 0; i < assessQs.length; i++) {
                    let tempSubmissions = assessQs[i].submissions;
                    for (let j = 0; j < tempSubmissions.length; j++) {
                      if (tempSubmissions[j].courseId === courseId) {
                        return true;
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
          <Button onClick={setAddCourseModalVisible}>Add Course</Button>
          <Modal
            size='lg'
            aria-labelledby='contained-modal-title-vcenter'
            centered
            show={addCourseModalVisible}
            onHide={handleCloseCourseModal}
          >
            <Modal.Title>Add Course</Modal.Title>
            <Modal.Body>
              <ListGroup>
                {allcourses && allcourses.length
                  ? allcourses.map((course) => {
                      function handleAddCourse() {
                        dispatch(
                          addAssociatedCourse({
                            courseId: course.id,
                            assessmentId,
                          })
                        );
                        navigate(0);
                      }
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
                          {course.name}{" "}
                          <PlusCircleFill onClick={handleAddCourse} />
                        </ListGroup.Item>
                      );
                    })
                  : "You have no courses on record."}
              </ListGroup>
            </Modal.Body>
          </Modal>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Questions</Form.Label>
          <br />
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
              function handleEditQuestion() {
                console.log(
                  "questionId, editQuestion",
                  questionId,
                  editQuestion
                );
                dispatch(
                  editQuestionText({
                    id: questionId,
                    questionText: editQuestion,
                  })
                );
                handleCloseEditQuestionModal();
                setEditQuestion("");
                navigate(0);
                //not automatically updating without hacky nav0
              }
              return (
                <div key={question.id}>
                  <Container rows={6}>{question.questionText}</Container>
                  {!activeSubmissions() ? (
                    <>
                      <Trash3 onClick={handleDeleteQuestion} />
                      <Pencil onClick={handleOpenEditQuestion} />
                    </>
                  ) : null}
                  <Modal
                    size='lg'
                    aria-labelledby='contained-modal-title-vcenter'
                    centered
                    show={editQuestionModalVisible}
                    onHide={handleCloseEditQuestionModal}
                  >
                    <Modal.Title>Edit Question</Modal.Title>
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
                  {/* note - check for submissions and change to archive button to match natalie? */}
                </div>
              );
            })
          ) : (
            <></>
          )}
          <br />
          {!activeSubmissions() ? (
            <Button type='button' onClick={setAddQuestionModalVisible}>
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
            <Modal.Title>Add Question</Modal.Title>
            <Modal.Body>
              <Form.Group>
                <Form.Control
                  as='textarea'
                  rows={6}
                  value={newQuestion || ""}
                  onChange={(e) => setNewQuestion(e.target.value)}
                ></Form.Control>
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
