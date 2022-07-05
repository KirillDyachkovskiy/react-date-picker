import { FC, useMemo, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { getMonthInfo } from '../../utils';
import { DateTable } from '../index';

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

  const setPrevMonth = () => setMonth((currMonth) => currMonth - 1);
  const setNextMonth = () => setMonth((currMonth) => currMonth + 1);

  const monthInfo = useMemo(() => getMonthInfo(month, year), [month, year]);

  return (
    <section>
      <header>
        <p>{label}</p>
        <div>
          <IoIosArrowBack onClick={setPrevMonth} />
          <IoIosArrowForward onClick={setNextMonth} />
        </div>
      </header>
      <main>
        <DateTable {...monthInfo} />
      </main>
    </section>
  );
};

export default DatePicker;
