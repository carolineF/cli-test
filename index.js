const { default: chalk } = require('chalk');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const db = mongoose.connect('mongodb://localhost:27017/customercli', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Customer = require('./models/customer');
const addCustomer = customer => {
  Customer.create(customer).then(customer => {
    console.info('New Customer Added')
    db.close();
  }).catch(err =>  {
    console.log(chalk.red(err))
  })
}

const findCustomer = name => {
  const search = new RegExp(name, 'i');
  Customer.find({$or: [{firstname: search}, { lastname: search}]})
    .then(customer => {
      console.info(customer);
      console.info(`${customer.length} matches`)
      db.close();
    }).catch(err =>  {
    console.log(chalk.red(err))
  })
}

module.exports = {
  addCustomer,
  findCustomer
}