var games = require("../data/games");

module.exports = function (app) {

  app.get("/api/games", function (req, res) {
    res.json(games);
  });

  app.post("/api/games", function (req, res) {

    const compatible = {
      game: "",
      image: "",
      difference: Infinity
    }

    let data = req.body;
    let userScores = data.scores;

    for (let i = 0; i < games.length; i++) {
      let currentGame = games[i];
      let finalDifference = 0;

      for (let j = 0; i < currentGame.scores.length; j++) {
        let currentGameScore = currentGame.scores[j];
        let currentUserScore = userScores[j];

        finalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentGameScore));
      };

      if (finalDifference <= compatible.difference) {
        compatible.game = currentGame.game;
        compatible.image = currentGame.image;
        compatible.difference = finalDifference;
      };
    };
    games.push(data);
    res.json(compatible);
  });
};