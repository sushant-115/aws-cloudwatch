const AWS = require("aws-sdk");
AWS.config.update({region :"us-east-1"});
const client = new AWS.CloudWatch();
client.getDashboard({DashboardName : "demo"} ,(err,data)=>{
console.log("err" ,err);
console.log("data" ,data);
})
