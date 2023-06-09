const express = require("express");
const morgan = require("morgan");
const { join } = require("path");
const {
  updateCurrentlyReading,
  updateToBeRead,
  updateFavorites,
  updateRead,
  getRead,
  getCurrentlyReading,
  getFavorites,
  getToBeRead,
  updateAndDelete,
  getFriend,
  updateFriends,
  deleteFromShelf,
  addReview,
  getReviews,
  updateLikes,
  deleteLike,
  addComment,
  getComments,
  updateReview,
} = require("./handlers");

const app = express();

app.use(morgan("tiny"));
app.use(express.json());

//CREATE ENDPOINTS HERE

//update user in DB
app.patch("/api/currentlyreading", updateCurrentlyReading);
app.patch("/api/tbr", updateToBeRead);
app.patch("/api/read", updateRead);
app.patch("/api/favorites", updateFavorites);

//get books from a users shelf (because i needed to send a body, these had to be posts instead of gets)
app.post("/api/currentlyreading", getCurrentlyReading);
app.post("/api/tbr", getToBeRead);
app.post("/api/read", getRead);
app.post("/api/favorites", getFavorites);

//get reviews authored by the user currently signed in
app.post("/api/reviews", getReviews);

//remove book from currently reading and add to read
app.patch("/api/move", updateAndDelete);

//remove book from shelf
app.delete("/api/remove", deleteFromShelf);

//post a review, send it to the reviews collection
app.post("/api/addReview", addReview);
//update a review
app.put("/api/updateReview", updateReview);

//like a review
app.put("/api/like/:id", updateLikes);
//unlike a review
app.put("/api/unlike/:id", deleteLike);

//add a comment on a review
app.put("/api/comment/:id", addComment);
//get all comments on a review
app.get("/api/allComments/:id", getComments);

//get user
app.get("/api/friend/:email", getFriend);
//update your friends array
app.patch("/api/addfriend", updateFriends);

// Serve static assets from the /public folder
app.use(express.static(join(__dirname, "public")));

// this is our catch all endpoint.
app.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "This is obviously not what you are looking for.",
  });
});

// Node spins up our server and sets it to listen on port 8000.
app.listen(8002, () => console.log(`Listening on port 8002`));
