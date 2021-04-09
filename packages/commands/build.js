const shell = require('shelljs');
const chalk = require('chalk');
const shellHelper = require('../lib/shellHelper');
const Spinner = require('../lib/spinner');
const analysis = require('../lib/analysis');

let config = {
  autoPublish: false
};

function build(cliConfig, module) {
  Object.assign(config, cliConfig);
  if(typeof module === 'undefined') {
    console.log(chalk.red(`Module ${module} is undefined !`));
    return;
  }
  if(!shell.which('git')) {
    shell.echo('Sorry, this script requires git');
    shell.exit(1);
  }
  if(typeof config.gitUrl === 'undefined' || config.gitUrl === '') {
    console.log(chalk.red('Sorry, your gitUrl is not defined in cli.config.js'));
    shell.exit(1);
  }
  let spinner = new Spinner('building...');
  // 执行多个命令
  shellHelper.series([
    `${cliConfig.npmBuildCommand? cliConfig.npmBuildCommand : 'npm run build'}${module}`
  ], function(err) {
    if(err) {
      console.log(chalk.red(err))
      process.exit(0)
    }
    spinner.stop();
    console.log(chalk.green('Build finished!'));

    //分析资源体积及占比
    analysis(config.upload.config.srcDir);
  })
}

module.exports = build;