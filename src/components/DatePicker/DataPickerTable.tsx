import { Dispatch, FC, SetStateAction, useMemo } from 'react';
import WEEKDAYS from '../../constants/weekdays';
import createMatrix from '../../utils/createMatrix';
import { getMonthInfo } from '../../utils';
import { TMonthMatrix, TWeekday } from '../../types';
import s from './datePicker.module.scss';

interface IDateTable {
  day: number;
  month: number;
  year: number;
  setDay: Dispatch<SetStateAction<number>>;
}

const DatePickerTable: FC<IDateTable> = ({ day, month, year, setDay }) => {
  const monthMatrix = useMemo(() => {
    const { prevMonthDays, days, firstWeekday } = getMonthInfo(month, year);

    const result: TMonthMatrix = createMatrix(6, 7);
    let iterateDay = 1;
    let isThisMonth = false;

    const firstDayId = WEEKDAYS.indexOf(firstWeekday);

    return result.map((week, weekId) => {
      if (weekId === 0) {
        return Array.from({ length: 7 }, (_, dayId) => {
          if (dayId < firstDayId) {
            return {
              value: prevMonthDays - firstDayId + dayId + 1,
              isThisMonth,
            };
          }

          isThisMonth = true;

          return {
            value: iterateDay++,
            isThisMonth,
          };
        });
      }

      return week.map(() => {
        if (iterateDay > days) {
          iterateDay = 1;
          isThisMonth = false;
        }

        return {
          value: iterateDay++,
          isThisMonth,
        };
      });
    });
  }, [month, year]);

  const selectNewDay = (newDay: number, isThisMonth: boolean) => () => {
    if (isThisMonth) {
      setDay(newDay);
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
            {week.map(({ value, isThisMonth }, id) => (
              <td
                key={value}
                className={`${s.month__day} ${
                  id === 5 || id === 6 ? s.month__day_holiday : ''
                } ${value === day && isThisMonth ? s.month__day_active : ''} ${
                  isThisMonth ? '' : s.month__day_blur
                }`}
                onClick={selectNewDay(value, isThisMonth)}
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
