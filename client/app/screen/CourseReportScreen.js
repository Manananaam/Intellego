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
import { fetchCourseReport, fetchCourseList } from "../store/slices/courseReportSlice";

export default function CourseReportScreen() {
  const dispatch = useDispatch();
  // get current course
  // const [currentCourse, setCurrentCourse] = useState("");
  const { allCourses, currentCourse, allGrades, id } = useSelector((state) => state.report);

  // console.log(courseReport)
  useEffect(() => {
      dispatch(fetchCourseList(id));
  }, [currentCourse]);
  console.log(currentCourse)

  // get grade report belongs to the class
  const handleCourseGradeReport = (student) => {
    dispatch(
      fetchCourseReport({
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
