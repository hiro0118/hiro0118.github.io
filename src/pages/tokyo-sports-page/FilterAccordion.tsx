import { AccordionSummary, Typography, AccordionDetails, FormControlLabel, Checkbox, Accordion, FormGroup } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FC, SyntheticEvent } from "react";

interface Props {
  id: string,
  onChange: any,
  conditions: string[],
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
          {props.conditions.map(condition => {
            return (
              <FormControlLabel
                key={condition}
                id={condition}
                value={condition}
                control={<Checkbox />}
                label={condition}
                onChange={props.onChange} />
            );
          })}
        </FormGroup>
      </AccordionDetails>
    </Accordion>
  );
}