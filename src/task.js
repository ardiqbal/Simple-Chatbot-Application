const lowdb = require('lowdb');

const db = lowdb();

const initialData = {
  tasks: []
};

//set initialData to db
db.defaults(initialData).write();

//GET
function get(){
  return db.get('tasks').value();
};

//CREATE
function create(taskName){
  db.get('tasks').push(taskName).write();
};

//REMOVE
function remove(number){
  db.get('tasks').remove((task, n) => n === number - 1).write();
};

//create('membeli susu');
//create('membuat slide');
//remove(1);
//console.log(get());

module.exports = {
  get, create, remove
};
