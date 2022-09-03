import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { FC } from "react";
import { CourtData } from "./TokyoSportsPage";

interface Props {
  dataList: CourtData[],
}

export const SortableTable: FC<Props> = (props: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
        <TableHead sx={{
          backgroundColor: '#eeeeee',
        }}>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={true}
                direction="asc"
              >
                Time
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">Park</TableCell>
            <TableCell align="right">Courts</TableCell>
            <TableCell align="right">Applications</TableCell>
            <TableCell align="right">Ratio</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.dataList.map((data) => (
            <TableRow
              key={data.date}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {data.date}
              </TableCell>
              <TableCell align="right">{data.time}</TableCell>
              <TableCell align="right">{data.park}</TableCell>
              <TableCell align="right">{data.courts}</TableCell>
              <TableCell align="right">{data.applications}</TableCell>
              <TableCell align="right">{data.ratio}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}