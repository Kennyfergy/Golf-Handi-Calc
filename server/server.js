const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
//const cookieSession = require("cookie-session");

const app = express();

const sessionMiddleware = require("./modules/session-middleware");
const passport = require("./strategies/user.strategy");

// Route includes
const userRouter = require("./routes/user.router");
const handicapRouter = require("./routes/handicap.router");
const roundsRouter = require("./routes/rounds.router");
const coursesRouter = require("./routes/courses.router");

// app.use(
//   cookieSession({
//     name: "session",
//     keys: ["session"],

//     // Cookie Options
//     maxAge: 2 * 60 * 1000, // 2 minutes
//   })
// );

// app.get("/get-id", (req, res) => {
//   req.session.id = (req.session && req.session.id) || 0;
//   const { id } = req.session;
//   res.send({ id });
// });

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use("/api/user", userRouter);
app.use("/api/handicap", handicapRouter);
app.use("/api/rounds", roundsRouter);
app.use("/api/courses", coursesRouter);

// Serve static files
app.use(express.static("build"));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
