const { response } = require("express");
const fs = require("fs");

let data = fs.readFileSync("TestData.json");
let db = JSON.parse(data);
// console.log("database:", db);
// module.exports = db;

//{ id: 3, word: 'bus', pos: 'noun' }

exports.getRandomWords = (request, response, next) => {
  let wordsList = [];
  let hasAdv = false;
  let hasAdj = false;
  let hasNoun = false;
  let hasVerb = false;
  while (wordsList.length < 10) {
    let randNum = Math.floor(Math.random() * db.wordList.length);

    // the  first four if to make sure that list have {adjective ,noun, adverb ,verb}
    if (db.wordList[randNum].pos === "adjective" && hasAdj == false) {
      hasAdj = true;
      wordsList.push(db.wordList[randNum]);
    }

    if (db.wordList[randNum].pos === "noun" && hasNoun == false) {
      hasNoun = true;
      wordsList.push(db.wordList[randNum]);
    }
    if (db.wordList[randNum].pos === "adverb" && hasAdv == false) {
      hasAdv = true;
      wordsList.push(db.wordList[randNum]);
    }
    if (db.wordList[randNum].pos === "verb" && hasVerb == false) {
      hasVerb = true;
      wordsList.push(db.wordList[randNum]);
    }

    if (hasAdj && hasAdv && hasNoun && hasVerb) {
      // this extra if to make sure no dublication is occured
      // when wordList length equal 4
      // because   all (hasAdj && hasAdv && hasNoun && hasVerb) will be true
      // when length is equal 4  so i have to change randNum
      // i have to make that this number is greater than or equal 0
      //and is less than wordsList.lenght -1
      if (wordsList.length === 4) {
        if (randNum === db.wordList.length - 1) {
          console.log("okey", randNum, wordsList.length);
          wordsList.push(db.wordList[randNum - 1]);
        } else {
          console.log("mooooo", randNum, wordsList.length);
          wordsList.push(db.wordList[randNum + 1]);
        }
      } else {
        wordsList.push(db.wordList[randNum]);
        console.log("loooo", randNum);
      }

      // }
    }
  }
  response.status(200).json({ wordsList });
};
// exports.getRandomWords = (request, response, next) => {
//   let wordsList = [];
//   let hasAdv = false;
//   let hasAdj = false;
//   let hasNoun = false;
//   let hasVerb = false;
//   while (wordsList.length < 10) {
//     let randNum = Math.floor(Math.random() * db.wordList.length);
//     console.log(randNum);
//     if (db.wordList[randNum].pos === "adjective") {
//       hasAdj = true;
//       wordsList.push(db.wordList[randNum]);
//     }
//     if (db.wordList[randNum].pos === "noun") {
//       hasNoun = true;
//       wordsList.push(db.wordList[randNum]);
//     }
//     if (db.wordList[randNum].pos === "adverb") {
//       hasAdv = true;
//       wordsList.push(db.wordList[randNum]);
//     }

//     if (db.wordList[randNum].pos === "verb") {
//       hasVerb = true;
//       wordsList.push(db.wordList[randNum]);
//     }

//     // console.log(
//     //   !hasAdj || !hasAdv || !hasNoun || !hasVerb || !wordsList.length < 10
//     // );

//     if (!hasAdj || !hasAdv || !hasNoun || !hasVerb || !wordsList.length < 10) {
//       wordsList.push(db.wordList[randNum]);
//     }
//   }
//   response.status(200).json({ data: wordsList });
// };

// exports.getRandomWords = (request, response, next) => {
//   const wordsList = [];
//   const checkList = {
//     adjective: false,
//     adverb: false,
//     noun: false,
//     verb: false,
//   };

//   while (wordsList.length < 10) {
//     const randNum = Math.floor(Math.random() * db.wordList.length);
//     const word = db.wordList[randNum];

//     if (checkList[word.pos] === false) {
//       checkList[word.pos] = true;
//       wordsList.push(word);
//     }
//   }

//   response.status(200).json({ data: wordsList });
// };

function calculateRank(scoresList, score) {
  const belowScores = scoresList.filter((s) => s < score);
  console.log(belowScores);
  const rank = (belowScores.length / scoresList.length) * 100;
  return Math.round(rank);
}

exports.rank = (request, response, next) => {
  const finalScore = request.body.score;

  let rank = calculateRank(db.scoresList, finalScore);
  `The rank percentage for a final score of ${finalScore} is ${rank}%`;
  response.status(200).json({ rank: rank });
};
