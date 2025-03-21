if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const ExpressError = require("./utils/ExpressError");
const { reset } = require("nodemon");
const { request } = require("http");
const methodOverride = require("method-override");
const passport = require("passport");
// const LocalStrategy = require('passport-local');
const User = require("./models/user");
const helmet = require("helmet");

const mongoSanitize = require("express-mongo-sanitize");

const userRoutes = require("./routes/users");
const campgroundRoutes = require("./routes/campgrounds");
const reviewRoutes = require("./routes/reviews");
const { prototype } = require("ejs-mate/lib/block");

const username = process.env.USERNAME;
const MongoDBStore = require("connect-mongo")(session);

const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/yelp-camp";
// const dbUrl = 'mongodb://localhost:27017/yelp-camp';
//MongoDB connection
mongoose.connect(dbUrl);

//DB connection check
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log("Database Connected");
});

const app = express();

// Setting for ejs engine
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);

const secret = process.env.SECRET || "thisshouldbeabettersecret!";

const store = new MongoDBStore({
  url: dbUrl,
  secret,
  touchAfter: 24 * 60 * 60,
});

store.on("error", function (e) {
  console.log("SESSION STORE ERROR", e);
});
//session configuration
const sessionConfig = {
  store,
  name: "session",
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));
app.use(flash());
// Use Helmet for security protection!
app.use(helmet());

const scriptSrcUrls = [
  "https://stackpath.bootstrapcdn.com/",
  "https://api.tiles.mapbox.com/",
  "https://api.mapbox.com/",
  "https://kit.fontawesome.com/",
  "https://cdnjs.cloudflare.com/",
  "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
  "https://kit-free.fontawesome.com/",
  "https://stackpath.bootstrapcdn.com/",
  "https://api.mapbox.com/",
  "https://api.tiles.mapbox.com/",
  "https://fonts.googleapis.com/",
  "https://use.fontawesome.com/",
];
const connectSrcUrls = [
  "https://api.mapbox.com/",
  "https://a.tiles.mapbox.com/",
  "https://b.tiles.mapbox.com/",
  "https://events.mapbox.com/",
];

const fontSrcUrls = [];
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [],
      connectSrc: ["'self'", ...connectSrcUrls],
      scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
      styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
      workerSrc: ["'self'", "blob:"],
      objectSrc: [],
      imgSrc: [
        "'self'",
        "blob:",
        "data:",
        `https://res.cloudinary.com/${username}/`, //SHOULD MATCH YOUR CLOUDINARY ACCOUNT!
        "https://images.unsplash.com/",
      ],
      fontSrc: ["'self'", ...fontSrcUrls],
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// passport.use(new LocalStrategy(User.authenticate()));
passport.use(User.createStrategy());

// store and ustore user from session
//stroing user in the session
passport.serializeUser(User.serializeUser());
//un-stroing user from the session
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// This function will read a file and return its contents as a string
const readFileSync = (filePath) => {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (err) {
    console.error(`Error reading file ${filePath}:`, err);
    return `<!-- Error reading ${filePath}: ${err.message} -->`;
  }
};

// Add these locals to make them available in your templates
app.use((req, res, next) => {
  // Only in Vercel environment, provide the inline partials
  if (process.env.VERCEL) {
    const navbarPath = path.join(__dirname, "views", "partials", "navbar.ejs");
    const flashPath = path.join(__dirname, "views", "partials", "flash.ejs");
    const footerPath = path.join(__dirname, "views", "partials", "footer.ejs");

    res.locals.inlineNavbar = readFileSync(navbarPath);
    res.locals.inlineFlash = readFileSync(flashPath);
    res.locals.inlineFooter = readFileSync(footerPath);
  }

  next();
});

app.get("/fakeUser", async (req, res) => {
  const user = new User({ email: "test1@gmail.com", username: "test1" });
  const newUser = await User.register(user, "test1");
  res.send(newUser);
});

//routes
app.use("/", userRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/reviews", reviewRoutes);

app.get("/", (req, res) => {
  res.render("home");
});

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something went wrong baby!";
  res.status(statusCode).render("error", { err });
});

const port = process.env.PORT || 3000;
//Server Listen
app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});

console.log("Current directory:", __dirname);
console.log("Views directory:", path.join(__dirname, "views"));
console.log("Layouts directory:", path.join(__dirname, "views", "layouts"));

const fs = require("fs");
try {
  const viewsDir = path.join(__dirname, "views");
  const layoutsDir = path.join(__dirname, "views", "layouts");

  console.log("Files in views directory:", fs.readdirSync(viewsDir));
  console.log("Files in layouts directory:", fs.readdirSync(layoutsDir));
} catch (err) {
  console.error("Error reading directories:", err);
}
