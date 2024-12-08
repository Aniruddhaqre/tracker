const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(cookieParser());

const allowedOrigins = [
  "https://meek-paprenjak-ad54e5.netlify.app/",
  "https://flourishing-begonia-e2c13b.netlify.app/",
];

app.use(
  cors({
      origin: (origin, callback) => {
          if (!origin || allowedOrigins.includes(origin)) {
              callback(null, true);
          } else {
              callback(new Error("Not allowed by CORS"));
          }
      },
      credentials: true, // Allow cookies
  })
);

app.get('/get-id', (req, res) => {
    let userId = req.cookies.user_id;
  
    if (!userId) {
      // Generate a new user ID if not already set
      userId = `user-${Math.random().toString(36).substr(2, 9)}`;
  
      // Set the cookie with SameSite=Lax for local testing
      res.cookie('user_id', userId, {
        httpOnly: true,
        sameSite: 'None',
        secure: true // Use 'Lax' for local development
      });
    }
  
    res.json({ userId });
  });
  

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Tracker backend running on http://localhost:${PORT}`);
});
