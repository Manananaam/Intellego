//react
import React from "react";

//styling

import Accordion from "react-bootstrap/Accordion";

const FAQ = () => {

  return (
    <>
    <h1>Intellego FAQs</h1>
      <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
            <Accordion.Header>
            FAQ #1: What is Intellego?
              </Accordion.Header>
            <Accordion.Body>Intellego is a dashboard for teachers to create and administer casual formative assessments during class time, and track and review data on student performance.</Accordion.Body>
          </Accordion.Item>
      <Accordion.Item eventKey="1">
            <Accordion.Header>
            FAQ #2: Who is Intellego for?
              </Accordion.Header>
            <Accordion.Body>Intellego is a tool for teachers who want a low-stakes place to gather information about student learning and track student performance.</Accordion.Body>
          </Accordion.Item>
      <Accordion.Item eventKey="2">
            <Accordion.Header>
            FAQ #3: What is the best approach for using Intellego?
              </Accordion.Header>
            <Accordion.Body>First, sign up for an account. For a way to jump right in and start adding your information to the site, click one of the quick-add buttons on the home screen to add a class or add an assessment. Otherwise, select an item on the sidebar to navigate to either courses, assessments or reports.

            </Accordion.Body>
          </Accordion.Item>
      <Accordion.Item eventKey="3">
            <Accordion.Header>
            FAQ #4: How do I view my courses on Intellego?
              </Accordion.Header>
            <Accordion.Body>Selecting the "courses" tab will lead you to your course dashboard. If you want to create a class, you can do so here, or you can select an option from the dropdown menu. You can view all the students in the course, and from here, view a student report or edit the student. Selecting assessment will take you to all of the assessments for that course, where you can also view a report featuring all assessment submissions, as well as grades and a course average. Selecting report will take you to the report for overall student grades in the course. You can also edit or delete a course.

            </Accordion.Body>
          </Accordion.Item>
      <Accordion.Item eventKey="4">
            <Accordion.Header>
            FAQ #5: How do I view create, grade, or view my assessments on Intellego?
              </Accordion.Header>
            <Accordion.Body>Selecting the "courses" tab will lead you to your course dashboard. If you want to create a class, you can do so here, or you can select an option from the dropdown menu. You can view all the students in the course, and from here, view a student report or edit the student. Selecting assessment will take you to all of the assessments for that course, where you can also view a report featuring all assessment submissions, as well as grades and a course average. Selecting report will take you to the report for overall student grades in the course. You can also edit or delete a course.

            </Accordion.Body>
          </Accordion.Item>
      <Accordion.Item eventKey="5">
            <Accordion.Header>
            FAQ #6: How do I view reports on Intellego?
              </Accordion.Header>
            <Accordion.Body>After clicking on "reports," selecting the "courses" tab will lead you to your course dashboard. If you want to create a class, you can do so here, or you can select an option from the dropdown menu. You can view all the students in the course, and from here, view a student report or edit the student. Selecting assessment will take you to all of the assessments for that course, where you can also view a report featuring all assessment submissions, as well as grades and a course average. Selecting report will take you to the report for overall student grades in the course. You can also edit or delete a course.
            </Accordion.Body>
          </Accordion.Item>
      <Accordion.Item eventKey="6">
            <Accordion.Header>
            FAQ #7: Can I export reports on Intellego?
              </Accordion.Header>
            <Accordion.Body>Yes! When you are viewing a report, click the "export" button at the top of the page, and you will have a ready-to-print-or-email copy of the report.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="7">
            <Accordion.Header>
            FAQ #8: How do my students take an assessment?
              </Accordion.Header>
            <Accordion.Body>Assessments, once created and assigned to a course, will be sent to students for them to be filled out. They will be given a unique ID number to verify their identity before submitting. Once they submit, teachers will be able to view and grade submissions.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
    </>
  );
};

export default FAQ;
