var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/data", function(req, res) {
  var body = "";
  req.on("data", function(data) {
    body += data;
  });
  req.on("end", function() {
    io.emit("chat message", body);
    console.log(JSON.parse(body));
    res.json({ message: "goodbye" });
  });
});

http.listen(3000, function() {
  console.log("listening on *:3000");
});
