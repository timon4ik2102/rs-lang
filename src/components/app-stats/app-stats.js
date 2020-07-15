import React from 'react';
import s from './app-stats.module.css';
import Page from '../app-page-structure/app-page-structure';
import BarChart from './BarChart';
import LineChart from './LineChart';
import { getUserStatistic, updateUserStatistic } from './statisticApi';

function Stats() {
  // const userId = localStorage.getItem('userId');
  // const token = localStorage.getItem('token');

  // const stats = {
  //   gameName: 'game name',
  //   correct: 10,
  //   series: 2,
  // };

  // updateUserStatistic(userId, token, stats).then(() => {
  //   getUserStatistic(userId, token).then((res) => console.log(res));
  // });

  function getRandomDateArray(numItems) {
    // Create random array of objects (with date)
    let data = [];
    let baseTime = new Date('2018-05-01T00:00:00').getTime();
    let dayMs = 24 * 60 * 60 * 1000;
    for (var i = 0; i < numItems; i++) {
      data.push({
        time: new Date(baseTime + i * dayMs),
        value: Math.round(20 + 80 * Math.random()),
      });
    }
    return data;
  }

  let data = [];

  data.push({
    title: 'Visits',
    data: getRandomDateArray(150),
    color: '#3E517A',
  });

  return (
    <Page>
      <div className={'flex'}>
        <p>Statistic</p>
        <div className={s.chartsWrapper}>
          <div className={`${s.main} ${s.chartWrapper}`}>
            <LineChart
              data={data[0].data}
              title={data[0].title}
              color={data[0].color}
            />
          </div>
          <div className={`${s.sub} ${s.chartWrapper}`}>
            <BarChart
              data={data[0].data}
              title={data[0].title}
              color={data[0].color}
            />
          </div>
        </div>
      </div>
    </Page>
  );
}
export default Stats;
