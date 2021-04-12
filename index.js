const { default: chalk } = require('chalk');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const db = mongoose.connect('mongodb://localhost:27017/customercli', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Customer = require('./models/customer');
const addCustomer = async customer => {
  await Customer.create(customer).then(customer => {
    console.info('New Customer Added')
  })
  mongoose.disconnect();
}

const findCustomer = async name => {
  const search = new RegExp(name, 'i');
  await Customer.find({$or: [{firstname: search}, { lastname: search}]})
    .then(customer => {
      console.info(customer);
      console.info(`${customer.length} matches`)
    })
  mongoose.disconnect();
}

const updateCustomer = async (_id, customer) => {
  await Customer.updateOne({_id}, customer).then(customer => {
    console.info('Customer Update');
  })
  mongoose.disconnect();
}

const removeCustomer = async _id => {
  await Customer.deleteOne({_id})
    .then(customer => {
      console.info('Customer Removed');
    })
  mongoose.disconnect();
}

const listCustomers = async () => {
  await Customer.find().then(customers => {
    console.info(customers);
    console.info(`${customers.length} matches`)
  })
  mongoose.disconnect();
}

module.exports = {
  addCustomer,
  findCustomer,
  updateCustomer,
  removeCustomer,
  listCustomers
}