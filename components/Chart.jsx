// chart.jsx
import React, {useEffect, useRef} from 'react';
import Chart from 'chart.js/auto';
import { texto, titulo } from "@/components/Fonts";

export const createDoughnutChart = ({ grasa, porcentajeosea, porcentajeresidual, porcentajemuscular }) => {
  const chartRef = useRef(null);
  let mychart = null;

  //Lo que me crea la chart
  useEffect(() => {
    
    if(mychart) {
      mychart.destroy;
    }
    
    if (chartRef.current) {
      new Chart(chartRef.current, {
        type: 'doughnut',
        data: {
          labels: data.map(row => row.label),
          datasets: [
            {
              label: 'Acquisitions by year',
              data: data.map(row => row.value)
            }
          ]
        }
      })
    }
  }, [grasa, porcentajeosea, porcentajeresidual, porcentajemuscular]);

    return(
      <div>
        <h1 className={`${texto.className} my-10 mb-10 text-center text-5xl text-black mt-7`}>Tabla</h1>
                <div>
        <canvas ref={chartRef} id="myChart"></canvas>
      </div>
      </div>
    );

}
