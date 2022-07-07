import { getYesterday } from './index';
import { TWeekday } from '../types';

const getMonthInfo = (month: number, year: number) => {
  const firstDay = new Date(year, month, 1);

  const prevMonthDays = getYesterday(firstDay).getDate();

  const days = new Date(year, month + 1, 0).getDate();

  const firstWeekday = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
  }).format(firstDay) as TWeekday;

  return {
    prevMonthDays,
    days,
    firstWeekday,
  };
};

export default getMonthInfo;
