const express = require("express");
const app = express();
const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const client = new AWS.CloudWatch();
app.get("/", (req, res) => {
  client.getDashboard({ DashboardName: "demo" }, (err, data) => {
    console.log("err", err);
    console.log("data", data);
    res.send(data);
  })
})
const getParam=(dimension ,index)=>{
var params = {
  EndTime: new Date().toISOString() , /* required */
  MetricDataQueries: [ /* required */
    {
      Id: 'm'+(index+1), /* required */
      MetricStat: {
        Metric: { /* required */
          Dimensions: dimension.Dimensions,
          MetricName: dimension.MetricName,
          Namespace: dimension.Namespace
        },
        Period:3000, /* required */
        Stat: 'Average',
        Unit :'Seconds'
      },
      ReturnData: true 
    },
    /* more items */
  ],
  StartTime: new Date(Date.now() -1000*60*60*24*4).toISOString() ,
  MaxDatapoints: 1000
};
return params;
}
const listParams = {
  Dimensions: [
    {
      Name: 'InstanceId', /* required */
      Value: 'i-0cf7e79edc30e1620'
    },
    /* more items */
  ],
//  MetricName: 'CPUUtilization',
  Namespace :'AWS/EC2'
}
app.get("/metric" , (req,res)=>{
  client.listMetrics(listParams ,(err, data)=>{
    console.log("err" ,err);
//    console.log("data" ,data);
    const metricListParams = data.Metrics.map(getParam);
	const arr = [];
    metricListParams.forEach(d=>client.getMetricData(d,(err,data)=>arr.push(data)));
	setTimeout(()=>res.send(arr) ,5000);
  })
})

app.listen(8001, err => { console.log(8001) })
