const express = require("express");
const morgan = require("morgan");
const wordsRoute = require("./routes/wordsRoute");
const app = express();

let port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("server is listening at port 8080");
});

//############################################################################
app.use(express.json());
app.use(morgan("common"));

// Enable CORS for all routes
app.use((req, res, next) => {
  // Allow all origins
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Allow the specified HTTP methods
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  // Allow the specified headers
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
// app.use(
//   cors({
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//   })
// );
//############################################################################

app.use("/activity", wordsRoute);

//############################# notfound middleware  #####################################
app.use((request, response, next) => {
  response.status(404).json({ message: "Page Not Found..!" });
});
//   //############################# error middleware  #####################################
app.use((error, request, response, next) => {
  // console.log(error);
  response.status(error.status || 505).json({ message: error + "" });
});
