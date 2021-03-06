const path = require('path');

module.exports = {
  // module 生成的目标目录
  modulePath: path.resolve('public'),
  // module template 目录
  moduleTemplatePath: path.resolve('packages/commands'),
  gitUrl: 'https://github.com/carolineF/ng-test-project',
  npmBuildCommand: 'npm run test ',
  upload: {
    server: 'alioss',
    config: {
      accessKeyId: '',
      accessKeySecret: '',
      bucket: '',
      region: '',
      srcDir: path.resolve('public/assets'),
      ignoreDir: false,
      deduplication: true,
      prefix: 'xxx.xxx.com'
    }
  },
  autoPublish: false
}