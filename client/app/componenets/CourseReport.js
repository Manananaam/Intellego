import React, {
  Dispatch,
  useEffect
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Chart as ChartJS, BarController, BarElement, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(Tooltip, Legend);
// import { fetchCourseReportAsync, selectCourseReport } from "../store/slices/CourseReportSlice";

// const labels = Utils.months({count: 7});
// const data = {
//   labels: labels,
//   datasets: [{
//     axis: 'y',
//     label: 'My First Dataset',
//     data: [65, 59, 80, 81, 56, 55, 40],
//     fill: false,
//     backgroundColor: [
//       'rgba(255, 99, 132, 0.2)',
//       'rgba(255, 159, 64, 0.2)',
//       'rgba(255, 205, 86, 0.2)',
//       'rgba(75, 192, 192, 0.2)',
//       'rgba(54, 162, 235, 0.2)',
//       'rgba(153, 102, 255, 0.2)',
//       'rgba(201, 203, 207, 0.2)'
//     ],
//     borderColor: [
//       'rgb(255, 99, 132)',
//       'rgb(255, 159, 64)',
//       'rgb(255, 205, 86)',
//       'rgb(75, 192, 192)',
//       'rgb(54, 162, 235)',
//       'rgb(153, 102, 255)',
//       'rgb(201, 203, 207)'
//     ],
//     borderWidth: 1
//   }]
// };
// const config = {
//   type: 'bar',
//   data: data,
//   options: {
//     indexAxis: 'y',
//   }
// };

const CourseReport = () => {
  // const dispatch = useDispatch();
  // const assessments = useSelector(selectCourseReport)
  // console.log(assessments)

  // useEffect(() => {
  //   dispatch(fetchCourseReportAsync());
  // }, [dispatch])

  return (
    <div>Hi</div>
    // <Bar data={data} />
  )
}

export default CourseReport;
