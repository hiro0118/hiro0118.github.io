import Typography from '@mui/material/Typography';
import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { FilterAccordion } from './FilterAccordion';
import { useState } from 'react';
import { SortableTable } from './SortableTable';

export const TokyoSportsPage = () => {

  const allItems: CourtData[] = getCourtData();
  const [visibleItems, setVisibleItems] = useState<CourtData[]>(allItems);
  const [dates, setDates] = useState<string[]>([]);
  const [times, setTimes] = useState<string[]>([]);
  const [parks, setParks] = useState<string[]>([]);

  return (
    <>
      <Typography variant="h3" padding={3} align="center">Tennis Court Application Status</Typography>

      <Container sx={{ mb: 2 }}>
        <Grid container spacing={3} justifyContent="center">
          <Grid xs={3}>
            <FilterAccordion
              id='Dates'
              onChange={onDateChecked}
              conditions={removeDuplicates(allItems.map(i => i.date))}
            />
            <FilterAccordion
              id='Times'
              onChange={onTimeChecked}
              conditions={removeDuplicates(allItems.map(i => i.time))}
            />
            <FilterAccordion
              id='Parks'
              onChange={onParkChecked}
              conditions={removeDuplicates(allItems.map(i => i.park))}
            />
            <Button variant="contained" fullWidth={true}>Apply</Button>
          </Grid>

          <Grid xs={8}>
            <SortableTable dataList={allItems} />
          </Grid>

        </Grid>
      </Container>
    </>
  );
}

const getCourtData = (): CourtData[] => {
  return [
    {
      date: "20220918",
      time: "1900-2100",
      park: "Shinozaki A",
      courts: 8,
      applications: 2,
      ratio: 2 / 8,
    },
    {
      date: "20220919",
      time: "1700-1900",
      park: "Shinozaki B",
      courts: 8,
      applications: 3,
      ratio: 3 / 8,
    }
  ]
}

export type CourtData = {
  date: string;
  park: string;
  time: string;
  courts: number;
  applications: number;
  ratio: number;
}

const removeDuplicates = (data: string[]): string[] => {
  return data.filter((val, index) => data.indexOf(val) === index);
}

const onDateChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
  console.log(event.target.defaultValue);
  console.log(event.target.checked)
}

const onTimeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
  console.log(event.target.defaultValue);
  console.log(event.target.checked)
}

const onParkChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
  console.log(event.target.defaultValue);
  console.log(event.target.checked)
}