// Renas comem um tipo especial snack que é uma star fruit
// Minimo 50 frutas 
import fs from 'fs';
import readline from 'readline';

let elfs = [];

const handle = async () => {
  const lines = [];
  const rl = readline.createInterface({
    input: fs.createReadStream('./calories.txt'),
  });

  let currentElf = {id: 1, calories: 0};

  rl.on('line', (line) => {
    lines.push(line);
  }).on('close', () => {
    const p = Promise.resolve(lines.map((currentLine) => {
      if(currentLine === '') {
        elfs.push(currentElf);
        currentElf = {id: currentElf.id + 1, calories: 0};
      }else {
        currentElf = {...currentElf, calories: parseInt(currentElf.calories) + parseInt(currentLine)}
      }
    }))
    p.then(() => {
      const firstMaxValue = Math.max(...elfs.map(e => e.calories));
      const firstElf = elfs.find(e => e.calories === firstMaxValue);

      elfs = elfs.filter((elf) => elf.id !== firstElf.id)
      const secondMaxValue = Math.max(...elfs.map(e => e.calories));
      const secondElf = elfs.find(e => e.calories === secondMaxValue);

      elfs = elfs.filter((elf) => elf.id !== secondElf.id)
      const thirdMaxValue = Math.max(...elfs.map(e => e.calories));
      const thirdElf = elfs.find(e => e.calories === thirdMaxValue);
      console.log(firstElf, secondElf, thirdElf)
    })
  })
}
handle();