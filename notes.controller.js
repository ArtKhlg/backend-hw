const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString(),
  };
  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgGreen("note was added"));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.bgBlue("Here is the list of notes"));
  notes.forEach((n) => {
    console.log(chalk.blue(n.id + " " + n.title));
  });
}

async function removeNotes(id) {
  const notes = await getNotes();
  const removeId = notes.findIndex((n) => n.id === id);
  notes.splice(removeId, 1);
  fs.writeFile(notesPath, JSON.stringify(notes));

  console.log(chalk.bgRed("note was removed"));
  notes.forEach((n) => {
    console.log(chalk.blue(n.id + " " + n.title));
  });
}

module.exports = {
  addNote,
  printNotes,
  removeNotes,
};
