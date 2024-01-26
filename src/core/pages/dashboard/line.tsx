import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ input }) => {
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);

  useEffect(() => {
    asigneValues();
  }, []);

  const asigneValues = async () => {
    let tempLabels = [];
    let tempValues = [];
    for (let x in input) {
      tempLabels.push(input[x].formatted_date);
      tempValues.push(input[x].total);
    }
    await setLabels(tempLabels);
    await setValues(tempValues);
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Ingresos",
        data: values,
        backgroundColor: "#4F3981",
        barThickness: 20,
        borderRadius: 10,
      },
    ],
  };
  const BORDER = true;
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      annotation: {
        annotations: {
          value1: {
            type: "line",
            yMin: 0,
            yMax: 0,
            borderColor: "black",
            borderWidth: 2,
            value: 0,
            label: {
              content: "Value",
              enabled: true,
              position: "top",
            },
          },
        },
      },
    },
    scales: {
      x: {
        border: {
          display: BORDER,
        },
        grid: {
          color: "#f5fafa",
        },
      },
      y: {
        border: {
          display: false,
        },
        grid: {
          color: "#f5fafa",
        },
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
