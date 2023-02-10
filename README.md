### Welcome to Intellego!

This is a dashboard for teachers to create and administer casual formative assessments during class time, and track and review data on student performance.

To begin, log in or sign up for an account. You will be taken to your dashboard, where you can view and create courses, view and create assessments, and view all students. Also available are reports displaying performance data broken down by courses, students and assessments, all of which can be exported.

Assessments, once created and assigned to a course, will be sent to students for them to be filled out. They will be given a unique ID number to verify their identity before submitting. Once they submit, teachers will be able to view and grade submissions. Assessments may also be assigned to other courses, or just edited if there are no submissions.



### Steps to set up project

1. Create a PostgreSQL Database with the name `intellego`
2. Clone the project main branch to your local computer
3. Add`.env` file to the root directory of the project folder
4. Paste this content to the .env file:


5. Run `npm install` to install packages
6. Run `npm run seed` to seed data to database
7. Run `npm run start:dev` to run the project
8. In browser, go to url : `localhost:8080`
9. Log in with existing account or sign up with new account

   ```jsx
   email: kara@email.com
   password: 123123
   ```
10. To view a submission form, visit this url : [localhost:3015/student/courses/114/assessments/105](http://localhost:8080/student/courses/114/assessments/105)
    - verify student ID with 100
