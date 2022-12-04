//PART TWO ABOVE
// lost = X 
// draw = Y
// win = Z

import fs from 'fs';
import readline from 'readline';

let score = 0;

const play = (elfPlay, howNeedToEnd) => {
    let result = 0;
    switch(howNeedToEnd) {
        case 'X':
            switch(elfPlay) {
                case 'A':
                    result = 3 + 0;
                    break;
                case 'B':
                    result = 1 + 0;
                    break;
                case 'C':
                    result = 2 + 0;
                    break;
            }
            return result;
        case 'Y':
            switch(elfPlay) {
                case 'A':
                    result = 1 + 3;
                    break;
                case 'B':
                    result = 2 + 3;
                    break;
                case 'C':
                    result = 3 + 3;
                    break;
                }
            return result;
        case 'Z':
            switch(elfPlay) {
                case 'A':
                    result = 2 + 6;
                    break;
                case 'B':
                    result = 3 + 6;
                    break;
                case 'C':
                    result = 1 + 6;
                    break;
            }
            return result;
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
            const [ elfPlay, howNeedToEnd ] = currentLine.split(' ');
            const playScore = play(elfPlay, howNeedToEnd)
            score = score + playScore;
        }))
        p.then(() => {
            console.log(score)
        })
    })
}
handle();