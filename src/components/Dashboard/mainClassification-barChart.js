import { Avatar, Box, Card, CardContent, Grid, Typography ,CardHeader} from '@mui/material';
import ReactECharts from 'echarts-for-react';
import DashboardServicse from '../../services/DashboardServicse';


var x = [];
var y = [];
export function MainClassification (){


     DashboardServicse.getCountByBookComboModel()
        .then((response) => {      
            x = response.data.map(element => 
                element.name
            );
            y = response.data.map(element => 
                element.value
            );
            })
            
            .catch((e) => {
              console.log(e); 
              
        });
        console.log("here y:", y)
           
const option = {
  
    title: {
        text: 'Books by Category',
        left: 'left'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        orient: 'vaertical',
          bottom: 'bottom'
    },
    toolbox: {
        show: true,
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: x
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value}'
        }
    },
    series: [
        {

            color:['#01DFD7'],
            name: 'Books',
            type: 'line',
            data: y,
            markPoint: {
                data: [
                    { type: 'max', name: 'Max' },
                    { type: 'min', name: 'Min' }
                ]
            },
            markLine: {
                data: [{ type: 'average', name: 'Avg' }]
            }
        },

    ]
};

return(
<Card 

sx={{borderRadius:5,minHeight:400,boxShadow:"0px 0px 0px 1px #D8D8D8",width: '100%'}}
>
        <CardHeader  ></CardHeader>
        <CardContent style={{paddingTop:5}}>
            <ReactECharts option={option} 
            />
        </CardContent>
    </Card>)};
