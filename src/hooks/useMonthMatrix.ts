import { useMemo } from 'react';
import { TMonthMatrix } from '../types';
import { getMonthInfo } from '../utils';
import createMatrix from '../utils/createMatrix';
import WEEKDAYS from '../constants/weekdays';

const useMonthMatrix = (year: number, month: number) =>
  useMemo<TMonthMatrix>(() => {
    const { prevMonthDays, days, firstWeekday } = getMonthInfo(year, month);

    const result = createMatrix(6, 7);
    let iterateDay = 1;

    const firstDayId = WEEKDAYS.indexOf(firstWeekday);

    return result.map((week, weekId) => {
      if (weekId === 0) {
        return Array.from({ length: 7 }, (_, dayId) => {
          if (dayId < firstDayId) {
            return {
              value: prevMonthDays - firstDayId + dayId + 1,
              monthStatus: 'prev',
            };
          }

          return {
            value: iterateDay++,
            monthStatus: 'this',
          };
        });
      }

      return week.map(() => {
        if (iterateDay <= days) {
          return {
            value: iterateDay++,
            monthStatus: 'this',
          };
        }

        return {
          value: iterateDay++ - days,
          monthStatus: 'next',
        };
      });
    });
  }, [month, year]);

export default useMonthMatrix;
