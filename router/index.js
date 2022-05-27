const express = require("express");
const router = express.Router();
const { UserGame, Biodata } = require("../models");

router.get("/", (req, res) => {
  res.render("pages/home/login.ejs");
});

/** START USER GAME ROUTE */
router.get("/userGames", (req, res) => {
  UserGame.findAll().then((userGames) => {
    res.render("pages/userGames/index", {
      pageTitle: "User Game",
      userGames,
    });
  });
});

router.get("/userGames/create", (req, res) => {
    res.render("pages/userGames/create", { pageTitle: "Tambah User" });
  });

router.post("/userGames", (req, res) => {
    UserGame.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    }).then(() => {
      res.redirect("/userGames");
    });
  });

router.get("/userGames/:id", (req, res) => {
  UserGame.findOne({
    where: { id: req.params.id },
  }).then((userGame) => {
    res.render("pages/userGames/show", {
      pageTitle: `UserGame: ${userGame.username}`,
      userGame,
    });
  });
});

router.get("/userGames/:id/edit", (req, res) => {
  UserGame.findOne({
    where: { id: req.params.id },
  }).then((userGame) => {
    res.render("pages/userGames/edit", {
      pageTitle: "Edit User",
      userGame,
    });
  });
});

router.put("/userGames/:id", (req, res) => {
  UserGame.update(
    {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  ).then(() => {
    res.redirect("/userGames");
  });
});

router.delete("/userGames/:id", (req, res) => {
  UserGame.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() => {
    res.redirect("back");
  });
});

/** END USER GAME ROUTE */


/**START BIODATA ROUTE */
router.get("/biodata", (req, res) => {
    Biodata.findAll({
      order: [["fullName", "ASC"]],
    }).then((biodata) => {
      res.render("pages/biodata/index", {
        pageTitle: "Biodata User",
        biodata,
      });
    });
  });

router.get("/biodata/create", (req, res) => {
  UserGame.findAll({
    order: [["username", "ASC"]],
  }).then((userGames) => {
    res.render("pages/biodata/create", {
      pageTitle: "Buat Biodata",
      userGames,
    });
  });
});

router.post("/biodata", (req, res) => {
  const { fullName, address, gender, phoneNumber, userGameId } = req.body;
  
  Biodata.create({
    fullName,
    address,
    gender,
    phoneNumber,
    userGameId,
  }).then(() => {
    res.redirect("/biodata");
  });
});

router.get("/biodata/:id", (req, res) => {
  Biodata.findOne({
    where: { id: req.params.id },
  }).then((biodata) => {
    res.render("pages/biodata/show", {
      pageTitle: `Biodata: ${biodata.fullName}`,
      biodata,
    });
  });
});

router.get("/biodata/:id/edit", async (req, res) => {
  const biodata = await Biodata.findOne({
    where: { id: req.params.id },
  });

  const userGames = await UserGame.findAll({
    order: [["username", "ASC"]],
  });

  res.render("pages/biodata/edit", {
    pageTitle: "Edit Biodata",
    biodata,
    userGames,
  });
});

router.put("/biodata/:id", (req, res) => {
  Biodata.update(
    {
      fullName: req.body.fullName,
      address: req.body.address,
      gender: req.body.gender,
      phoneNumber: req.body.phoneNumber,
      userGameId: req.body.userGameId,
    },
    {
      where: { id: req.params.id,
      },
    }
  ).then(() => {
    res.redirect("/biodata");
  });
});

router.delete("/biodata/:id", (req, res) => {
  Biodata.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() => {
    res.redirect("back");
  });
});

/** END SUPPLIERS ROUTE */

module.exports = router;