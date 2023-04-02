import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SeverityPill } from '../severity-pill';
import { style } from '@mui/system';
import moment from "moment";





export const ToBeRecievedBooks = ({toBeReceivedList}) => (
  

  

  <Card 
  sx={{borderRadius:5,minHeight:350,boxShadow:"0px 0px 0px 1px #D8D8D8"}}
  >
    <CardHeader title="To Be Received" />
    <PerfectScrollbar>
      <Box sx={{ minWidth: 600, }}>
      <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Member
              </TableCell>
              <TableCell>
                Book
              </TableCell>
              <TableCell>
                Date
              </TableCell>
              <TableCell>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {toBeReceivedList.map((Receive) => (
              <TableRow
                hover
                key={Receive.lendingID}
              >
                <TableCell>
                  {Receive.memberName}
                </TableCell>
                <TableCell>
                  {Receive.bookName}
                </TableCell>
                <TableCell>
                {moment(Receive.lendedDate).format("yyyy-MM-DD")}
                
                </TableCell>
                <TableCell>
                <SeverityPill
                    style={{backgroundColor:(moment(Receive.lendedDate).format("yyyy-MM-DD") === moment(new Date()).format("yyyy-MM-DD"))?"#BE81F7":"#FA5882"}} 
                  >
                    {(moment(Receive.lendedDate).format("yyyy-MM-DD") === moment(new Date()).format("yyyy-MM-DD"))?"Pending":" Late "}
                  </SeverityPill>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}
    >
      
    </Box>
  </Card>
);

