// // way-1
process.stdin.on('data', data => {
  console.log(`You entered: ${data}`);
});

// // way-2
import inquirer from 'inquirer';
inquirer
  .prompt([{ name: 'name', message: 'What is your name?' }])
  .then((answers) => {
    console.log(`Hello, ${answers.name}`);
  });


// way-3
import prompts from 'prompts';
(async () => {
  const response = await prompts({
    type: 'text',
    name: 'name',
    message: 'Name?'
  });

  console.log(response.name);
})();



