import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import CircleIcon from "@mui/icons-material/Circle";
import {
  Chip,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { spawn } from "child_process";

ChartJS.register(ArcElement, Tooltip, Legend);

const CircleChart = ({ input }) => {
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    asigneValues();
  }, []);

  const asigneValues = async () => {
    let tempLabels = [];
    let tempValues = [];
    let tempColors = [];
    for (let x in input) {
      tempLabels.push(input[x].label);
      tempValues.push(input[x].data);
      let color = getRandomColor();
      input[x].color = color;
      tempColors.push(color);
    }
    await setLabels(tempLabels);
    await setValues(tempValues);
    await setColors(tempColors);
  };

  const getRandomColor = (): string => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: "# of Votes",
        data: values,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: "75%",
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  };
  return (
    <>
      <Doughnut data={data} options={options} />
      <List sx={{ mt: 5 }}>
        {input.map((row, k) => (
          <ListItem
            disablePadding
            key={k}
            secondaryAction={
              <Chip
                label={row.data}
                color="primary"
                size="small"
                key={`${k}clip`}
              />
            }
          >
            <ListItemIcon>
              <CircleIcon style={{ color: row["color"] }} />
            </ListItemIcon>
            <ListItemText primary={row.label} />
          </ListItem>
        ))}
      </List>
    </>
  );
};
export default CircleChart;
