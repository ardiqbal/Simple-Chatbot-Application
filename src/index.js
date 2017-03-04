const express = require('express');
const bodyParser = require('body-parser');

const apiai = require('./apiai');
const task = require('./task');

const app = express();
const PORT = 8080;

app.use(bodyParser.json());

//define the route
app.post('/', (req, res) => {
  const question = req.body.question;

  //call apiai.js askQuestion
  const requestApiAi = apiai.askQuestion(question);

  requestApiAi.then(resFromApiAi => resFromApiAi.json()).then(jsonFromApiAi => {
    const result = jsonFromApiAi.result;

    console.log(jsonFromApiAi);

    //find intent name
    switch (result.metadata.intentName) {
      case 'create.task':{
        const taskName = result.parameters.any;

        task.create(taskName);

        res.send(result.speech);
        break;
      }
      case 'show.task':{
        const taskList = task.get();
        res.send(taskList.join(", "));

        break;
      }
      case 'delete.task':{
        const number = result.parameters.number;

        task.remove(number);

        res.send(result.speech);
      }
      default:
        res.send(result.speech);
    }
  });
});

//run the server
app.listen(PORT, () => {
  console.log(`App run at 127.0.0.1:${PORT}`);
});
