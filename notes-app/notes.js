const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    return 'Your notes...';
};

const addNote = (title, body) => {
    const notes = loadNotes();

    const duplicateNote = notes.find((note) => {
        return note.title.toLowerCase() === title.toString().toLowerCase();
    });

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });

        saveNotes(notes);
        console.log(chalk.green('New note added!'));
    } else {
     console.log(chalk.red('Note title taken!'));
    }
};

const removeNote = (title) => {
    const notes = loadNotes();

    const notesToKeep = notes.filter((note) => {
        return note.title.toLowerCase() !== title.toString().toLowerCase();
    });

    if (notes.length > notesToKeep.length) {
        saveNotes(notesToKeep);
        console.log(chalk.green('Note removed!'));
    } else {
        console.log(chalk.red('No note found!'));
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.blue.bold('YOUR NOTES'));
    notes.forEach((note) => {
        console.log(chalk.yellow(note.title));
    });
}

const readNote = (title) => {
    const notes = loadNotes();

    const foundNote = notes.find((note) => {
       return note.title === title;
    });

    if (foundNote) {
        console.log(chalk.magenta.bold(foundNote.title));
        console.log(foundNote.body);
    } else {
        console.log(chalk.red('No note found with title: ' + title));
    }
}

const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJson);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJson = dataBuffer.toString();

        return JSON.parse(dataJson);

    } catch (e) {
        return [];
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};