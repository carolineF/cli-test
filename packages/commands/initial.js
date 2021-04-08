const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');

function copyCliConfigJS() {
  console.log(figlet.textSync('Boo!', {
    font: 'Ghost',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true
  }))
  figlet('cli test', (err, data) => {
    if(err) {
      console.log(chalk.red('Some thing about figlet is wrong'))
    }
    console.log(chalk.yellow(data));
    let targetFilePath = path.resolve('cli.config.js');
    let templatePath = path.join(__dirname, '../cli/configjs/cli.config.js');
    let contents = fs.readFileSync(templatePath, 'utf8');
    fs.writeFileSync(targetFilePath, contents, 'utf8');
    console.log(chalk.green('Initialize cli config success \n'))
    process.exit(0);
  })
}

module.exports = function() {
  if(fs.existsSync(path.resolve('cli.config.js'))) {
    inquirer.prompt([
      {
        name: 'init-confirm',
        type: 'confirm',
        message: `cli.config.js is already existed, are you sure to overwrite?`,
        validate: function(input) {
          if(input.lowerCase !== 'y' && input.lowerCase !== 'n') {
            return 'Please input y/n !'
          }
          return true;
        }
      }
    ]).then(answer => {
      if(answer['init-confirm']) {
        copyCliConfigJS();
      }else {
        process.exit(0);
      }
    }).catch(err => {
      console.log(chalk.red(err))
    })
  } else {
    copyCliConfigJS();
  }
}