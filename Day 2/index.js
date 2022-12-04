// Shape
// 1 = Rock
// 2 = Paper
// 3 = Scissors
// Outcome of the round
// lost = 0, 
// draw = 3,
// win = 6
// Total per round = shape + outcome

import fs from 'fs';
import readline from 'readline';

let score = 0;

const getValueFromShape = (shape) => {
    switch(shape) {
        case 'X':
            return 1;
        case 'Y':
            return 2;
        case 'Z': 
            return 3;
        default:
            return 0;
    }
}

const play = (elfPlay, myPlay) => {
    switch(true) {
        case (elfPlay === 'A' && myPlay === 'X'):
            return 3;
        case (elfPlay === 'B' && myPlay === 'X'):
            return 0;
        case (elfPlay === 'C' && myPlay === 'X'):
            return 6;
        case (elfPlay === 'A' && myPlay === 'Y'):
            return 6;
        case (elfPlay === 'B' && myPlay === 'Y'):
            return 3;
        case (elfPlay === 'C' && myPlay === 'Y'):
            return 0;
        case (elfPlay === 'A' && myPlay === 'Z'):
            return 0;
        case (elfPlay === 'B' && myPlay === 'Z'):
            return 6;
        case (elfPlay === 'C' && myPlay === 'Z'):
            return 3;
    }
}

const handle = async () => {
  const lines = [];

  const rl = readline.createInterface({
    input: fs.createReadStream('./rounds.txt'),
  });

  rl.on('line', (line) => {
    lines.push(line);
  }).on('close', () => {
        const p = Promise.resolve(lines.map((currentLine) => {
            let currentPlayScore = 0;
            const [ elfPlay, myPlay ] = currentLine.split(' ');
            const myShapeValue = getValueFromShape(myPlay);
            const playScore = play(elfPlay, myPlay)
            currentPlayScore = myShapeValue + playScore;
            score = score + currentPlayScore;
        }))
        p.then(() => {
            console.log(score)
        })
    })
}
handle();