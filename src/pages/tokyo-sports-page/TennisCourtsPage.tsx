import Typography from '@mui/material/Typography';
import { Button, Container } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { FilterAccordion, SELECT_ALL } from './FilterAccordion';
import { useState } from 'react';
import { CourtData, MAX_DISPLAY_NUM, SortableTable } from './SortableTable';

const sortTimes = (a: string, b: string) => {
  return (a.length == b.length) ? a.localeCompare(b) : (a.length - b.length);
}

export const TennisCourtsPage = () => {

  const allItems: CourtData[] = getCourtData();
  const [visibleItems, setVisibleItems] = useState<CourtData[]>(allItems);

  const allDates = removeDuplicates(allItems.map(i => i.date)).sort();
  const allTimes = removeDuplicates(allItems.map(i => i.time)).sort(sortTimes);
  const allParks = removeDuplicates(allItems.map(i => i.park)).sort();
  const [selectedDates, setSelectedDates] = useState<string[]>(allDates);
  const [selectedTimes, setSelectedTimes] = useState<string[]>(allTimes);
  const [selectedParks, setSelectedParks] = useState<string[]>(allParks);

  const onDateChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedList = getUpdatedSelections(allDates, selectedDates, event);
    setSelectedDates(updatedList);
  }

  const onTimeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedList = getUpdatedSelections(allTimes, selectedTimes, event);
    setSelectedTimes(updatedList);
  }

  const onParkChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedList = getUpdatedSelections(allParks, selectedParks, event);
    setSelectedParks(updatedList);
  }

  const onApply = () => {
    const newVisbleItems = allItems
      .filter(i => selectedDates.includes(i.date))
      .filter(i => selectedTimes.includes(i.time))
      .filter(i => selectedParks.includes(i.park));
    console.log(newVisbleItems);
    setVisibleItems(newVisbleItems);
  }

  return (
    <>
      <Typography variant="h3" padding={3} align="center">Tennis Court Application Status</Typography>

      <Container sx={{ mb: 2 }}>
        <Typography padding={3} align="right">*Showing the first {MAX_DISPLAY_NUM} records.</Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid xs={3}>
            <FilterAccordion
              id='Dates'
              onSelect={onDateChecked}
              items={allDates}
              selectedItems={selectedDates}
            />
            <FilterAccordion
              id='Times'
              onSelect={onTimeChecked}
              items={allTimes}
              selectedItems={selectedTimes}
            />
            <FilterAccordion
              id='Parks'
              onSelect={onParkChecked}
              items={allParks}
              selectedItems={selectedParks}
            />
            <Button
              variant="contained"
              fullWidth={true}
              onClick={onApply}
              sx={{ mt: 0.8 }}
            >
              Apply
            </Button>
          </Grid>

          <Grid xs={8}>
            <SortableTable dataList={visibleItems} />
          </Grid>

        </Grid>
      </Container>
    </>
  );
}

const getCourtData = (): CourtData[] => {
  return require("./tennis_data_20220909002705.json");
}

const removeDuplicates = (data: string[]): string[] => {
  return data.filter((val, index) => data.indexOf(val) === index);
}

const getUpdatedSelections = (
  allItems: string[],
  originalItems: string[],
  event: React.ChangeEvent<HTMLInputElement>
): string[] => {
  const value = event.target.defaultValue;
  const checked = event.target.checked;

  if (value === SELECT_ALL) {
    if (allItems.length === originalItems.length) {
      return [];
    } else {
      return allItems;
    }
  }

  const updatedItems = [...originalItems];
  if (checked) {
    updatedItems.push(value);
  } else {
    const index = updatedItems.indexOf(value);
    if (index !== -1) {
      updatedItems.splice(index, 1);
    }
  }
  return updatedItems;
}