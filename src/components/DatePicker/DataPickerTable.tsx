import { Dispatch, FC, SetStateAction } from 'react';
import WEEKDAYS from '../../constants/weekdays';
import { TMonthStatus, TWeekday } from '../../types';
import s from './datePicker.module.scss';
import { useMonthMatrix } from '../../hooks';

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
  const monthMatrix = useMonthMatrix(year, month);

  const onClick = (newDay: number, monthStatus: TMonthStatus) => () => {
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
                onClick={onClick(value, monthStatus)}
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
