import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const DemoChart = () => {
  const [options, setOptions] = useState<Highcharts.Options | null>(null);

  const onClick = () => {
    setOptions((prev) => ({
      ...prev,
      title: {
        text: 'New title',
        style: {
          color: 'green',
        },
      },
    }));
  };
  useEffect(() => {
    setOptions({
      title: {
        text: 'My chart',
      },
      subtitle: {
        text: 'My first chart',
        style: {
          color: 'red',
        },
      },
      yAxis: {
        labels: {
          formatter(this: Highcharts.AxisLabelsFormatterContextObject) {
            return this.value + ' random label';
          },
        },
        gridLineWidth: 1,
      },
      xAxis: {
        gridLineWidth: 1,
        gridLineColor: 'red',
        gridLineDashStyle: 'Dot',
        tickInterval: 0.1,
      },
      series: [
        {
          type: 'line',
          data: [1, 2, 3],
          zoneAxis: 'x',
          zones: [
            {
              fillColor: 'red',
              value: 2,
            },
          ],
        },
      ],
    });
  }, []);
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
      <button onClick={onClick}>Change color</button>
    </div>
  );
};

export default DemoChart;
