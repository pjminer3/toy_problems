// Task

// Your task in the kata is to determine how many boats are sunk damaged and untouched from a set amount of attacks. 
// You will need to create a function that takes two arguments, the playing board and the attacks.

// Boats are places either horizontally, vertically or diagonally on the board. 0 represents a space not occupied by a boat. 
// Digits 1-3 represent boats which vary in length 1-4 spaces long. There will always be at least 1 boat up to a maximum of 
// 3 in any one game. Boat sizes and board dimentions will vary from game to game.

// Attacks

// Attacks are calculated from the bottom left, first the X coordinate then the Y. There will be at least one attack per game.

// [[2, 1], [1, 3], [4, 2]];
// First attack      [2, 1] = 3
// Second attack [1, 3] = 0
// Third attack     [4, 2] = 1
// Function Initialization

// board = [[0,0,0,2,2,0],
//          [0,3,0,0,0,0],
//          [0,3,0,1,0,0],
//          [0,3,0,1,0,0]];
// attacks = [[2, 1], [1, 3], [4, 2]];
// damagedOrSunk(board, attacks);
// Scoring

// 1 point for every whole boat sank.
// 0.5 points for each boat hit at least once (not including boats that are sunk).
// -1 point for each whole boat that was not hit at least once.
// Sunk or Damaged

// sunk = all boats that are sunk
// damaged = all boats that have been hit at least once but not sunk
// notTouched/not_touched = all boats that have not been hit at least once
// Output

// You should return a hash with the following data

// `sunk`, `damaged`, `notTouched`, `points`
// Example Game Output

// In our above example..

// First attack: boat 3 was damaged, which increases the points by 0.5
// Second attack: miss nothing happens
// Third attack: boat 1 was damaged, which increases the points by 0.5
// boat 2 was untouched so points -1 and notTouched +1 in Javascript/Java/C# and not_touched +1 in Python/Ruby.
// No whole boats sank
// Return Hash

// { sunk: 0, damaged: 2 , notTouched: 1, points: 0 }


// SOLUTION:

// FUNCTION FOR COUNTING BOATS
function boardCounter(board) {
  let counter = {};
  board.forEach(function(row) {
    row.forEach(function(space) {
      counter[space] = counter[space] + 1 || 1;
    });
  });
  return counter;
}

function damagedOrSunk (board, attacks){
  let result = {
    sunk: 0,
    damaged: 0,
    notTouched: 0,
    points: 0
  }
  
  // BOARD BEFORE ATTACKS
  let firstBoardCount = boardCounter(board);
  
  // LET ATTACKS DESTROY BOARD
  attacks.forEach(function(attack){
    let missile = board[(board.length - attack[1])][(attack[0] - 1)];
    if (missile !== 0) {
      // If attack hits a boat => change to 'x'
      board[(board.length - attack[1])][(attack[0] - 1)] = 'x';
    }
  });
  
  // BOARD AFTER ATTACKS
  let secondBoardCount = boardCounter(board);
  
  // COMPARE BOARDS
  for (var key in firstBoardCount) {  
    if (key === '0') {
      // Don't Do Anything! Nothing changes
    } else if (!secondBoardCount[key]) {
      /* if the number is gone; sunk += 1*/
      result.sunk += 1;
      result.points += 1;
    } else if (firstBoardCount[key] === secondBoardCount[key]) {
      /* if number's value is unchanged; notToched += 1*/
      result.notTouched += 1;
      result.points -= 1;
    } else {
      /* number's value is different; damaged += 1*/
      let damage = (firstBoardCount[key] - secondBoardCount[key]);
      result.damaged += 1;
      result.points += .5;
    }
  }
  
  return result;
}