import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { alpha, styled } from '@mui/material/styles';
import CategoryIcon from '@mui/icons-material/Category';
export const ProductCategory = ({productCategory}) => (
  <Card 
  sx={{ height: '100%',borderRadius:5, backgroundColor: alpha('#FA5882', 0.30)}}>
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
            fontWeight={900}
          >
            Category
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
            paddingLeft={1}
          >
            {productCategory}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: '#FA5882',
              height: 56,
              width: 56
            }}
          >
            <CategoryIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          pt: 2
        }}
      >
        <FiberManualRecordIcon sx={{ fontSize: 15 }} color="success" />
        <Typography
          color="success"
          sx={{
            mr: 1
          }}
          variant="body2"
        >
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
          fontSize={14}
        >
          Active Category
        </Typography>
      </Box>
    </CardContent>
  </Card>
);
