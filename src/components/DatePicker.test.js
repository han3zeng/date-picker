/* eslint-disable react/jsx-filename-extension */
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import DatePicker from './DatePicker';

const timetamp = 1636387200269;
const defaultGap = {
  datesGridGap: undefined,
  monthsGridGap: undefined,
  yearsGridGap: undefined,
};

test('DatePicker Render Testing', () => {
  render(
    <DatePicker
      setTimestamp={({ timestamp }) => { console.log(timestamp); }}
      timestamp={timetamp}
      gap={defaultGap}
    />
  );
  expect(screen.getByText('Nov 2021')).toBeInTheDocument();
});
