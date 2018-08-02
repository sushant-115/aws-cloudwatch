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
app.listen(8001, err => { console.log(8001) })
