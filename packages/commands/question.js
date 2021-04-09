const { default: chalk } = require('chalk');
const inquirer = require('inquirer');

module.exports = function() {
  inquirer.prompt([
    {
      name: 'q-confirm',
      type: 'confirm',
      message: `Module named is already existed, are you sure to overwrite?`,
      validate: function(input) {
        if(input.lowerCase !== 'y' && input.lowerCase !== 'n') {
          return 'Please input y/n !';
        }else {
          return true;
        }
      }
    },
    {
      name: 'q-input',
      type: 'input',
      message: `Project Name?`
    },
    {
      name: 'q-list',
      type: 'list',
      message: `Choose your layout plan?`,
      choices: ['vw', 'flexible']
    },
    {
      name: 'q-rawlist',
      type: 'rawlist',
      message: `Choose your web template?`,
      choices: ['vue', 'mpvue', 'react', 'h5'],
      default: 1
    },
    {
      name: 'q-checkbox',
      type: 'checkbox',
      message: `Choose your component?`,
      choices: ['imageloader', 'webp', 'share', 'awaken'],
      checked: true
    },
    {
      name: 'q-password',
      type: 'password',
      message: `your password ?`
    },
    {
      name: 'q-editor',
      type: 'editor',
      message: `your editor ?`
    }
  ]).then(answers => {
    console.log('answers', answers);
  }).catch(err => {
    console.log(chalk.red(err))
  })
}