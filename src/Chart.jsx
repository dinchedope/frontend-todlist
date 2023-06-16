import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import module from './Chart.module.css'


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);
export default function Charts(props) {
  console.log(props);

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        suggestedMax: Number(props.task) + Number(props.inProgress) + Number(props.done),
        beginAtZero: true,
        ticks:{stepSize: 1}
        
      }
    },
    plugins: {
      legend: {
        display: false // Установка display в false, чтобы скрыть метки
      }
    }
  };
  
  
  const data = {
    labels: [''],
    datasets: [
      {

        data: [props.task],
        backgroundColor: '#ff0000',
      },
      {

        data: [props.inProgress],
        backgroundColor: '#ffd800',
      },
      {

        data: [props.done],
        backgroundColor: '#84ff00',
      },
    ],
  };
  return  (<div className={module.chart}>
      <Bar className options={options} data={data} />
      <div className={module.labels}>
        <div className={module.labels_circle}>
          <div className={module.labels_circle1}></div>
          Task
        </div>
        <div className={module.labels_circle}>
          <div className={module.labels_circle2}></div>
          In progress
        </div>
        <div className={module.labels_circle}>
          <div className={module.labels_circle3}></div>
          Done
        </div>
      </div>
    </div>);

    

}