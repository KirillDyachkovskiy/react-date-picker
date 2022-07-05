import { FC } from 'react';
import { DatePicker } from './components';

const App: FC = () => {
  const currentDate = new Date();

  return (
    <main>
      <DatePicker currentDate={currentDate} />
    </main>
  );
};

export default App;
