const { request } = require("express");
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");
const Movie = mongoose.model("Movie");
const User = mongoose.model("User");

async function createComment(req, res, next) {
  if (req.user.type !== "admin" && req.user.type !== "user") {
    return res.send("No está autorizado");
  }
  let comment = req.body;
  const user = await User.findById(req.user.id);
  const movie = await Movie.findById(comment.movieId);

  const newComment = new Comment(comment);
  newComment.userId = user.id;

  try {
    const savedComment = await newComment.save();
    movie.comments = movie.comments.concat(savedComment._id);
    movie.save();
    user.comments = user.comments.concat(savedComment._id);
    user.save();

    res.json(savedComment);
  } catch (error) {
    next(error);
  }
}

function getComment(req, res, next) {
  if (req.params.id) {
    Comment.findById(req.params.id)
      .populate({
        path: "userId",
        select: {
          comments: 0,
          favorites: 0,
          salt: 0,
          hash: 0,
          type: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
        },
      })
      .then((comment) => {
        res.send(comment);
      })
      .catch(next);
  } else {
    Comment.find()
      .populate({
        path: "userId",
        select: {
          comments: 0,
          favorites: 0,
          salt: 0,
          hash: 0,
          type: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
        },
      })
      .then((comment) => {
        res.send(comment);
      })
      .catch(next);
  }
}

function updateComment(req, res, next) {
  Comment.findById(req.params.id)
    .then((comment) => {
      if (!comment) return res.sendStatus(401);
      if (req.user.id != comment.userId) {
        return res.send(
          "No se puede editar otro comentario que no sea el tuyo"
        );
      }
      let newInfo = req.body;
      if (typeof newInfo.text !== "undefined") comment.text = newInfo.text;
      comment
        .save()
        .then((updated) => {
          res.status(201).json(updated.publicData());
        })
        .catch(next);
    })
    .catch(next);
}

function deleteComment(req, res, next) {
  if (req.user.type === "admin") {
    Comment.findOneAndDelete({
      _id: req.params.id,
    })
      .then((r) => {
        res.status(200).send("El comentario se elimino");
      })
      .catch((next) => {
        res.send("No se encontró ningun comentario con ese id");
      });
  } else {
    Comment.findById(req.params.id)
      .then((comment) => {
        if (req.user.id != comment.userId) {
          return res.send(
            "No se puede eliminar otro comentario que no sea el tuyo"
          );
        } else {
          Comment.findOneAndDelete({
            _id: req.params.id,
          })
            .then((r) => {
              res.status(200).send("El comentario se elimino");
            })
            .catch((next) => {
              res.send("No fue posible eliminar el comentario");
            });
        }
      })
      .catch((next) => {
        res.send("No se encontró ningun comentario con ese id");
      });
  }
}

function commentsbyUser(req, res, next) {
  var user = req.params.id;

  console.log(req.params.id);
  Comment.find({
    userId: user,
  })
    .populate({
      path: "userId",
      select: {
        comments: 0,
        favorites: 0,
        salt: 0,
        hash: 0,
        type: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      },
    })
    .then((comment) => {
      res.send(comment);
    })
    .catch(next);
}

function commentsofMovie(req, res, next) {
  var movie = req.params.id;
  Comment.find({
    movieId: movie,
  })
    .populate({
      path: "userId",
      select: {
        comments: 0,
        favorites: 0,
        salt: 0,
        hash: 0,
        type: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      },
    })
    .then((comment) => {
      res.send(comment);
    })
    .catch(next);
}

function lastComments(req, res, next) {
  req.body;
  Comment.aggregate([
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $limit: 3,
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $addFields: {
        user: {
          $arrayElemAt: ["$user", 0],
        },
      },
    },
    {
      $lookup: {
        from: "movies",
        localField: "movieId",
        foreignField: "_id",
        as: "movie",
      },
    },
    {
      $addFields: {
        movie: {
          $arrayElemAt: ["$movie", 0],
        },
      },
    },
    {
      $project: {
        user: {
          comments: 0,
          favorites: 0,
          salt: 0,
          hash: 0,
          type: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
        },
        movie: {
          genres: 0,
          directors: 0,
          cast: 0,
          comments: 0,
          poster: 0,
            trailer: 0,
          description: 0,
        },
      },
    },
  ])
    .then((r) => {
      res.status(200).send(r);
    })
    .catch(next);
}

module.exports = {
  createComment,
  getComment,
  updateComment,
  deleteComment,
  commentsbyUser,
  commentsofMovie,
  lastComments,
};
