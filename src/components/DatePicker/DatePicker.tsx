import { FC, useMemo, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import DatePickerTable from './DataPickerTable';
import s from './datePicker.module.scss';

interface IDatePicker {
  currentDate: Date;
}

const DatePicker: FC<IDatePicker> = ({ currentDate }) => {
  const [year, setYear] = useState<number>(() => currentDate.getFullYear());
  const [month, setMonth] = useState<number>(() => currentDate.getMonth());
  const [day, setDay] = useState<number>(() => currentDate.getDate());

  const label = useMemo(() => {
    const date = new Date(year, month);

    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  }, [month, year]);

  const setPrevMonth = () => {
    if (month !== 0) {
      setMonth((currMonth) => currMonth - 1);
    } else {
      setYear((currYear) => currYear - 1);
      setMonth(11);
    }
  };

  const setNextMonth = () => {
    if (month !== 11) {
      setMonth((currMonth) => currMonth + 1);
    } else {
      setYear((currYear) => currYear + 1);
      setMonth(0);
    }
  };

  return (
    <section className={s.datePicker}>
      <header className={s.datePicker__header}>
        <p>{label}</p>
        <div>
          <IoIosArrowBack onClick={setPrevMonth} />
          <IoIosArrowForward onClick={setNextMonth} />
        </div>
      </header>
      <main>
        <DatePickerTable day={day} month={month} year={year} setDay={setDay} />
      </main>
      <p>
        <span>selected day: </span>
        <span>{new Date(year, month, day).toLocaleString()}</span>
      </p>
    </section>
  );
};

export default DatePicker;
