"use strict";

var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _cors = _interopRequireDefault(require("cors"));
var _db = _interopRequireDefault(require("./config/db.js"));
var _userRouter = _interopRequireDefault(require("./routes/userRouter.js"));
var _blogRouter = _interopRequireDefault(require("./routes/blogRouter.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config();
var port = process.env.PORT || 5000;
var app = (0, _express["default"])();
(0, _db["default"])();
app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use("/api/v1", _userRouter["default"]);
app.use("/api/v1", _blogRouter["default"]);
app.listen(port, console.log("server started on port ".concat(port)));