import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { FC, useState } from "react";

export const MAX_DISPLAY_NUM = 300;

export type CourtData = {
  date: string;
  park: string;
  time: string;
  courts: number;
  applications: number;
  ratio: number;
}

interface Props {
  dataList: CourtData[],
}

const getSortedData = (dataList: CourtData[], asc: boolean): CourtData[] => {
  const newDataList = [...dataList];
  return newDataList.sort(
    (a, b) => asc ? (b.ratio - a.ratio) : (a.ratio - b.ratio)
  );
}

export const SortableTable: FC<Props> = (props: Props) => {

  const [asc, setAsc] = useState<boolean>(false);

  const onRatioSort = () => {
    setAsc(!asc);
    props.dataList.sort(
      (a, b) => asc ? (b.ratio - a.ratio) : (a.ratio - b.ratio)
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Park</TableCell>
            <TableCell align="right">Courts</TableCell>
            <TableCell align="right">Applications</TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={true}
                direction={asc ? "asc" : "desc"}
                onClick={onRatioSort}
              >
                Ratio
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {getSortedData(props.dataList, asc)
            .filter((_value, index) => index < MAX_DISPLAY_NUM)
            .map((data) => (
              <TableRow
                key={`${data.date}-${data.time}-${data.park}`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {data.date}
                </TableCell>
                <TableCell>{data.time}</TableCell>
                <TableCell>{data.park}</TableCell>
                <TableCell align="right">{data.courts}</TableCell>
                <TableCell align="right">{data.applications}</TableCell>
                <TableCell align="right">{String(data.ratio).slice(0,5)}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}