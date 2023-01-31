import { useDispatch, useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  Tooltip,
  Legend,
  LinearScale,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, Tooltip, Legend, BarElement);
import Dropdown from "react-bootstrap/Dropdown";
import { fetchCourseReportAsync } from "../store/slices/CourseReportSlice";

const courses = [
  {
    id: 1,
    name: "Test Course",
    subject: "ELA",
    gradeLevel: 3,
    createdAt: "2023-01-30T17:26:32.945Z",
    updatedAt: "2023-01-30T17:26:32.945Z",
    userId: 1,
    assessmentId: null,
  },
];

export default function CourseReportScreen() {
  const dispatch = useDispatch();
  // get current course
  const [currentCourse, setCurrentCourse] = useState(null);
  const { students } = useSelector((state) => state.studentEnroll);
  const { grades, student } = useSelector((state) => state.courseReport);

  useEffect(() => {
    if (currentCourse) {
      // fetch a list of students that belongs to the current Course
      dispatch(fetchStudentList({ courseId: currentCourse }));
    }
  }, [currentCourse]);

  // get grade report belongs to the student
  const handleCourseGradeReport = (student) => {
    dispatch(
      fetchCourseReportAsync({
        courseId: currentCourse,
      })
    );
  };

  // get current course
  const handleCurrentCourse = (course) => {
    setCurrentCourse(course.id);
    console.log(course.id)
  };

  // chart data
  const data = {
    labels: grades.map((el) => el.title),
    datasets: [
      {
        label: "Test chart",
        data: grades.map((el) => el.total_grade),
        backgroundColor: "aqua",
        borderColor: "#000",
        borderWidth: 1,
      },
    ],
  };

  const options = {};

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle>Course</Dropdown.Toggle>
        <Dropdown.Menu>
          {courses.map((course) => {
            return (
              <Dropdown.Item
                key={course.id}
                onClick={() => handleCurrentCourse(course)}
              >
                {course.name}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
      {currentCourse && (
        <Dropdown>
          <Dropdown.Toggle>Students</Dropdown.Toggle>
          <Dropdown.Menu>
            {students.map((student) => {
              return (
                <Dropdown.Item
                  key={student.id}
                  onClick={() => handleCourseGradeReport(student)}
                >
                  {student.firstName} {student.lastName}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      )}
      <p className="text-start">
        {student && `${student.firstName} ${student.lastName}`}
      </p>
      <div style={{ width: "50%" }}>
        <Bar data={data} options={options}></Bar>
      </div>
    </div>
  );
};
