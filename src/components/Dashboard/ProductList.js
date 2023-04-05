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
import * as DefineValues from "../../common/DefineValues";




export const ProductList = ({productList}) => (
  

  

  <Card 
  sx={{borderRadius:5,minHeight:350,boxShadow:"0px 0px 0px 1px #D8D8D8"}}
  >
    <CardHeader title="Product Details" />
    <PerfectScrollbar>
      <Box sx={{ minWidth: 600, }}>
      <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                product Id
              </TableCell>
              <TableCell>
                Product
              </TableCell>
              <TableCell>
                Category
              </TableCell>
              <TableCell>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productList.map((Receive) => (
              <TableRow
                hover
                key={Receive.productId}
              >
                <TableCell>
                  {Receive.productId}
                </TableCell>
                <TableCell>
                  {Receive.productName}
                </TableCell>
                <TableCell>
                {Receive.categoryName}
                
                </TableCell>
                <TableCell>
                {DefineValues.status().find(x => x.value == Receive.status).text}
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

