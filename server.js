const express = require("express");
const bodyParser = require("body-parser");
const readFile = require("./server/utils/readFile");
const writeFile = require("./server/utils/writeFile");

const app = express();
const PORT = 3001;

const PRESENTERS_FILE = "./data/gamePresenters.json";
const TABLES_FILE = "./data/tables.json";
app.use(bodyParser.json());

// get presenters
app.get("/presenters-data", (req, res) => {
  readFile(PRESENTERS_FILE, res).then((data) => {
    res.send(data);
  });
});

// create presenter
app.post("/presenters-data/createPresenter", (req, res) => {
  readFile(PRESENTERS_FILE, res).then((data) => {
    const fileData = JSON.parse(data);
    const newId =
      fileData.length === 0 ? 0 : fileData[fileData.length - 1].id + 1;
    const newPresenter = { id: newId, ...req.body };

    fileData.push(newPresenter);

    const errorMessage = `There was an error with wirting ${req.body} to ${PRESENTERS_FILE}: `;
    writeFile(PRESENTERS_FILE, fileData, errorMessage, res);
  });
});

// update presenter
app.put("/presenters-data/editPresenter", (req, res) => {
  readFile(PRESENTERS_FILE, res).then((data) => {
    const fileData = JSON.parse(data);

    const { id, name } = req.body;
    const index = fileData.findIndex((presenter) => presenter.id === id);

    fileData[index].name = name;

    const errorMessage = `There was an error with updating ${req.body} to ${PRESENTERS_FILE}: `;
    writeFile(PRESENTERS_FILE, fileData, errorMessage, res);
  });
});

// delete presenter
app.delete("/presenters-data/deletePresenter", async (req, res) => {
  readFile(PRESENTERS_FILE, res).then((data) => {
    const fileData = JSON.parse(data);
    const { id } = req.body;
    const index = fileData.findIndex((presenter) => presenter.id === id);

    fileData.splice(index, 1);

    const errorMessage = `There was an error with deleting ${req.body} from ${PRESENTERS_FILE}: `;
    writeFile(PRESENTERS_FILE, fileData, errorMessage, res);
  });
});

// get tables
app.get("/tables-data", (req, res) => {
  readFile(TABLES_FILE, res).then((data) => {
    res.send(data);
  });
});

// create table
app.post("/tables-data/createTable", (req, res) => {
  readFile(TABLES_FILE, res).then((data) => {
    const fileData = JSON.parse(data);
    const newId =
      fileData.length === 0 ? 0 : fileData[fileData.length - 1].id + 1;
    const newTable = { id: newId, ...req.body };

    fileData.push(newTable);

    const errorMessage = `There was an error with wirting ${req.body} to ${TABLES_FILE}: `;
    writeFile(TABLES_FILE, fileData, errorMessage, res);
  });
});

// update table
app.put("/tables-data/editTable", (req, res) => {
  readFile(TABLES_FILE, res).then((data) => {
    const fileData = JSON.parse(data);

    const { id, name } = req.body;
    const index = fileData.findIndex((table) => table.id === id);

    fileData[index].name = name;

    const errorMessage = `There was an error with updating ${req.body} to ${TABLES_FILE}: `;
    writeFile(TABLES_FILE, fileData, errorMessage, res);
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
