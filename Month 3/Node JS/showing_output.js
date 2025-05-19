// way-0
console.log("This is console log");

// way-1
process.stdout.write("This is standard output\n");
process.stderr.write("This is an error\n");

// way-2
import chalk from 'chalk';
console.log(chalk.blue('Hello world!'));

// way-3
import figlet from 'figlet';
figlet('Hello!', (err, data) => {
  console.log(data);
});

// cliProgress --> A library for creating progress bars in the command line.
import cliProgress from 'cli-progress';

const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
bar.start(100, 0);
let value = 0;

const timer = setInterval(() => {
  if (value >= 100) {
    bar.stop();
    clearInterval(timer);
  } else {
    bar.update(value += 10);
  }
}, 200);
