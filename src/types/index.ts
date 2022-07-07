export type TWeekday = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

export type TMonthStatus = 'prev' | 'this' | 'next';

export type TMonthMatrix = {
  value: number;
  monthStatus: TMonthStatus;
}[][];
