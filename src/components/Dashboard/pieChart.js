import { Card, CardContent} from '@mui/material';
import ReactECharts from 'echarts-for-react';
import DashboardServicse from '../../services/DashboardServicse';

var x = [];
export function PieChart() {

  DashboardServicse.getCountByStatusComboModel()
  .then((response) => {      
       x = response.data;
      })
      
      .catch((e) => {
        
        console.log(e); 
        
  });

  console.log("here x:", x)

    const option = {
        title: {
          text: 'Books by Status',
          left: 'left'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vaertical',
          bottom: 'bottom'
        },
        toolbox: {
            show: true,
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
        series: [
          {
            color:['#01DFD7','#FA5882','#BE81F7','#F7D358' ],
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data:x,
         
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };




    return(
    <Card sx={{ borderRadius:5,minHeight:400,boxShadow:"0px 0px 0px 1px #D8D8D8",}}  >
    
        <CardContent style={{marginTop:10}}>
            <ReactECharts option={option}
            
            />
        </CardContent>
    </Card>)
};
