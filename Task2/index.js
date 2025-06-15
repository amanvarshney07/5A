const btn = document.getElementById('btn');
const app = document.getElementById('app');

getNotes().forEach(note => {
    const noteEl = createNoteEl(note.id, note.content);
    app.insertBefore(noteEl, btn);
});

function createNoteEl(id, content){
    const element = document.createElement('textarea');
    element.classList.add('note');
    element.placeholder = 'Empty Note';
    element.value = content;

    element.addEventListener("dblclick", ()=>{
        const warning = confirm("Do you want to delete this note?");
        if(warning){
            deleteNote(id, element);
        }
    });

    return element;
}

function deleteNote(id, element){
    const notes = getNotes().filter(note => note.id != id);
    saveNotes(notes);
    app.removeChild(element);
}

function updateNote(id, newContent){
    const notes = getNotes();
    const target = notes.filter(note => note.id == id)[0];
    target.content = newContent;
    saveNotes(notes);
}

function addNote(){
    const notes = getNotes();
    const noteObj = {
        id: Math.floor(Math.random() * 100000),
        content: ""
    };
    const noteEl = createNoteEl(noteObj.id, noteObj.content);
    app.insertBefore(noteEl, btn);
    notes.push(noteObj);
    saveNotes(notes);
}

function saveNotes(notes){
    localStorage.setItem("note-app", JSON.stringify(notes));
}

function getNotes(){
    return JSON.parse(localStorage.getItem("note-app") || "[]");
}

btn.addEventListener("click", addNote);