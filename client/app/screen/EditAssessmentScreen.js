import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchAssessment,
  selectAssessment,
  editAssessmentTitle,
  deleteQuestion,
  addAssociatedCourse,
} from "../store/slices/singleAssessmentSlice";
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
} from "react-bootstrap-icons";

//right now the question default info shows, but someone has to retype the whole thing out (can't make tiny edits)

const EditAssessmentScreen = () => {
  const assessment = useSelector(selectAssessment);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { assessmentId } = useParams();
  const [assessmentTitle, setAssessmentTitle] = useState("");
  // const [associatedCourses, setAssociatedCourses] = useState([]);
  const [addCourseModalVisible, setAddCourseModalVisible] = useState(false);
  const { allcourses } = useSelector((state) => state.studentEnroll);

  // const [questionText, setQuestionText] = useState("");

  useEffect(() => {
    dispatch(fetchAssessment(assessmentId));
    setAssessmentTitle(assessment.assessment.assessmentTitle);
    // setAssociatedCourses(assessment.assessment.associatedCourses);
  }, [
    dispatch,
    assessment.assessment.assessmentTitle,
    // assessment.assessment.associatedCourses,
  ]);

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  function handleAddQuestion() {
    console.log("clicky add question babe");
  }

  function handleOpenCourseModal() {
    setAddCourseModalVisible(true);
  }
  function handleCloseCourseModal() {
    setAddCourseModalVisible(false);
  }

  // const handleNewQuestion = (e) => {
  //   e.preventDefault();
  //   dispatch(createQuestion({ questionText }));
  //   setQuestionText("");
  // }

  //attach this to when someone types in the question field... or clicks out of it? Not sure...

  //new handler, as soon as someone types anything into new question field, need to render another new question form item
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(editAssessmentTitle({ assessmentId, assessmentTitle }));
    navigate("/assessments");
  }
  //NOTE - still not auto updating listview when you navigate back

  return (
    <>
      <Navbar bg='light'>
        <Container>
          <Navbar.Brand>Edit Assessment</Navbar.Brand>
        </Container>
      </Navbar>
      <Form onSubmit={handleSubmit}>
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
        <br />
        <Form.Group>
          <Form.Label>Associated Courses</Form.Label>
          <br />
          {/* note: i would love these to appear like chip tags, but don't want to spend too much time right now trying to get that working. in the future, could be worth playing with.
          https://codepen.io/broneks/pen/objeqq */}
          {assessment && assessment.assessment.associatedCourses.length ? (
            <ListGroup horizontal>
              {assessment.assessment.associatedCourses.map((course) => {
                const courseId = course.id;
                const courseName = course.name;

                return (
                  <AssociatedCourseListItem
                    key={course.id}
                    assessmentId={assessmentId}
                    courseId={courseId}
                    courseName={courseName}
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
                        assessment.assessment.associatedCourses.filter(
                          (el) => el.id === currentCourseId
                        );
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
              return (
                <div key={question.id}>
                  <Form.Control
                    as='textarea'
                    rows={6}
                    placeholder={question.questionText}
                  ></Form.Control>
                  <Trash3 onClick={handleDeleteQuestion} />
                  {/* note - check for submissions and change to archive button to match natalie? */}
                </div>
              );
            })
          ) : (
            <></>
          )}
        </Form.Group>
        {/* <Form.Group>
          <Form.Control
            as='textarea'
            rows={6}
            placeholder='Add a Question +'
          ></Form.Control>
        </Form.Group> */}
        <Button type='submit' value='Submit'>
          Submit
        </Button>
        <Button type='button' onClick={handleAddQuestion}>
          Add Question
        </Button>
      </Form>
    </>
  );
};

export default EditAssessmentScreen;
