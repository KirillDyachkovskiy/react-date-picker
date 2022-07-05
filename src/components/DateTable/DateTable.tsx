import { FC, useMemo } from 'react';
import { TMonthMatrix, TWeekday } from '../../tyoes';
import WEEKDAYS from '../../constants/weekdays';
import createMatrix from '../../utils/createMatrix';

interface IDateTable {
  prevMonthDays: number;
  days: number;
  firstWeekday: TWeekday;
}

const DateTable: FC<IDateTable> = ({ prevMonthDays, days, firstWeekday }) => {
  const monthMatrix = useMemo(() => {
    const result: TMonthMatrix = createMatrix(6, 7);
    let day = 1;

    const firstWeekdayId = WEEKDAYS.indexOf(firstWeekday);

    return result.map((week, weekId) => {
      if (weekId === 0) {
        return Array.from({ length: 7 }, (_, dayId) =>
          dayId < firstWeekdayId
            ? prevMonthDays - firstWeekdayId + dayId + 1
            : day++
        );
      }

      return week.map(() => {
        if (day > days) {
          day = 1;
        }

        return day++;
      });
    });
  }, [prevMonthDays, days, firstWeekday]);

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
            {week.map((day) => (
              <td key={day}>{day}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DateTable;
