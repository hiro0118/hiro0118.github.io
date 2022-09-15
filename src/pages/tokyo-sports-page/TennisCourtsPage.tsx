import Typography from '@mui/material/Typography';
import { Box, Button, Container, Tab, Tabs } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { FilterAccordion, SELECT_ALL } from './FilterAccordion';
import React, { useCallback, useState } from 'react';
import { MAX_DISPLAY_NUM, SortableTable } from './SortableTable';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface CourtData {
  date: string;
  park: string;
  time: string;
  courts: number;
  applications: number;
  ratio: number;
}


function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const sortTimes = (a: string, b: string) => {
  return (a.length === b.length) ? a.localeCompare(b) : (a.length - b.length);
}

export const TennisCourtsPage = () => {

  const allItems = getCourtData();
  const allDates = removeDuplicates(allItems.map(i => i.date)).sort();
  const allTimes = removeDuplicates(allItems.map(i => i.time)).sort(sortTimes);
  const allParks = removeDuplicates(allItems.map(i => i.park)).sort();

  const [visibleItems, setVisibleItems] = useState<CourtData[]>(allItems);
  const [selectedDates, setSelectedDates] = useState<string[]>(allDates);
  const [selectedTimes, setSelectedTimes] = useState<string[]>(allTimes);
  const [selectedParks, setSelectedParks] = useState<string[]>(allParks);

  const [favedItemSet, setFavedItemSet] = useState<Set<string>>(new Set<string>());

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

  const onFaved = useCallback((key: string) => {
    const newFavedItemSet: Set<string> = new Set<string>(favedItemSet);
    if (newFavedItemSet.has(key)) {
      newFavedItemSet.delete(key);
    } else {
      newFavedItemSet.add(key);
    }
    setFavedItemSet(newFavedItemSet);
  }, [favedItemSet]);

  const onApply = () => {
    const newVisbleItems = allItems
      .filter(i => selectedDates.includes(i.date))
      .filter(i => selectedTimes.includes(i.time))
      .filter(i => selectedParks.includes(i.park));
    setVisibleItems(newVisbleItems);
  }

  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Typography variant="h3" padding={3} align="center">Tennis Court Application Status</Typography>
      <Container sx={{ mb: 2 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Search" {...a11yProps(0)} />
            <Tab label="Favorites" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Typography padding={3} align="right">*Showing the first {MAX_DISPLAY_NUM} records.</Typography>
          <Grid container spacing={3} justifyContent="center">
            <Grid xs={12} md={2.8}>
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

            <Grid xs={12} md={9.2}>
              <SortableTable
                dataList={visibleItems}
                favedItemSet={favedItemSet}
                favedItemOnly={false}
                onFaved={onFaved} />
            </Grid>

          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid xs={12} md={9.2}>
            <SortableTable
              dataList={allItems}
              favedItemSet={favedItemSet}
              favedItemOnly={true}
              onFaved={onFaved} />
          </Grid>
        </TabPanel>
      </Container>
    </>
  );
}

const getCourtData = (): CourtData[] => {
  return require("./tennis_data_20220909200841.json");
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