import { Dispatch, FC, SetStateAction, useMemo } from 'react';
import WEEKDAYS from '../../constants/weekdays';
import createMatrix from '../../utils/createMatrix';
import { getMonthInfo } from '../../utils';
import { TMonthMatrix, TMonthStatus, TWeekday } from '../../types';
import s from './datePicker.module.scss';

interface IDateTable {
  day: number;
  month: number;
  year: number;
  setDay: Dispatch<SetStateAction<number>>;
  setPrevMonth: () => void;
  setNextMonth: () => void;
}

const DatePickerTable: FC<IDateTable> = ({
  day,
  month,
  year,
  setDay,
  setPrevMonth,
  setNextMonth,
}) => {
  const monthMatrix = useMemo<TMonthMatrix>(() => {
    const { prevMonthDays, days, firstWeekday } = getMonthInfo(month, year);

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

  const selectNewDay = (newDay: number, monthStatus: TMonthStatus) => () => {
    setDay(newDay);
    if (monthStatus === 'prev') {
      setPrevMonth();
    }
    if (monthStatus === 'next') {
      setNextMonth();
    }
  };

  return (
    <table>
      <thead>
        <tr>
          {WEEKDAYS.map((weekday: TWeekday) => (
            <th key={weekday}>{weekday}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {monthMatrix.map((week, weekId: number) => (
          <tr key={weekId}>
            {week.map(({ value, monthStatus }, id) => (
              <td
                key={value}
                className={`${s.month__day} ${
                  id === 5 || id === 6 ? s.month__day_holiday : ''
                } ${
                  value === day && monthStatus === 'this'
                    ? s.month__day_active
                    : ''
                } ${monthStatus !== 'this' ? s.month__day_blur : ''}`}
                onClick={selectNewDay(value, monthStatus)}
              >
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DatePickerTable;
