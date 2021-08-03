import React, { useState } from 'react';
import Highcharts from 'highcharts/highmaps';
import HighchartsReact from 'highcharts-react-official';
import { useEffect } from 'react';
import worldMap from '@highcharts/map-collection/custom/world.geo.json';

const PopulationMap = () => {
  const [options, setOptions] = useState<Highcharts.Options | null>(null);
  useEffect(() => {
    const getMap = async () => {
      const response = await fetch(
        'https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/world-population.json'
      );
      const data = await response.json();

      const options: Highcharts.Options = {
        chart: {
          borderWidth: 1,
          map: worldMap,
          borderColor: 'red',
        },

        title: {
          text: 'World population 2013 by country',
        },

        subtitle: {
          text: 'Demo of Highcharts map with bubbles',
        },

        legend: {
          enabled: false,
        },

        mapNavigation: {
          enabled: true,
          buttonOptions: {
            verticalAlign: 'bottom',
          },
        },

        series: [
          {
            type: 'map',
            name: 'Countries',
            color: '#E0E0E0',
            enableMouseTracking: false,
          },
          {
            type: 'mapbubble',
            name: 'Population 2016',
            joinBy: ['iso-a3', 'code3'],
            data: data,
            minSize: 4,
            maxSize: '12%',
            tooltip: {
              pointFormat: '{point.properties.hc-a2}: {point.z} thousands',
            },
          },
        ],
      };
      setOptions(options);
    };
    getMap();
  }, []);
  console.log(options);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={'mapChart'}
      options={options}
    />
  );
};

export default PopulationMap;
