import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Checkbox, FormControlLabel, FormGroup, Typography } from "@mui/material";
import { FC } from "react";

export const SELECT_ALL = "selectAll";

interface Props {
  id: string,
  onSelect: any,
  items: string[],
  selectedItems: string[],
}

export const FilterAccordion: FC<Props> = (props: Props) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={props.id}
        id={props.id}
      >
        <Typography>{props.id}</Typography>
      </AccordionSummary>

      <AccordionDetails>
        <FormGroup>
          <FormControlLabel
            key={SELECT_ALL}
            id={SELECT_ALL}
            value={SELECT_ALL}
            control={
              <Checkbox
                checked={props.selectedItems.length === props.items.length}
                indeterminate={
                  (props.selectedItems.length !== props.items.length) &&
                  (props.selectedItems.length !== 0)
                }
              />}
            label={"Select All"}
            onChange={props.onSelect}
          />
          <Box sx={{ ml: 3 }}>
            {props.items.map(condition => {
              return (
                <FormControlLabel
                  key={condition}
                  id={condition}
                  value={condition}
                  control={<Checkbox />}
                  checked={props.selectedItems.includes(condition)}
                  label={condition}
                  onChange={props.onSelect} />
              );
            })}
          </Box>
        </FormGroup>
      </AccordionDetails>
    </Accordion>
  );
}