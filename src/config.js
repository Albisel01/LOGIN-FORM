const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const mongoose = require("mongoose");
const connect = mongoose.connect(
  "mongodb+srv://albisel786_db_user:Test1234@cluster0.if8k5ra.mongodb.net/?appName=Cluster0",
);

connect
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.log("Database cannot be connected", error);
  });
