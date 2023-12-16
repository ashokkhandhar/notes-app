import { rendernotes } from "./app.js";

const archivedNotesContainer = document.querySelector(".archived-notes-container");
let notes = JSON.parse(localStorage.getItem("notes")) || [];
rendernotes(archivedNotesContainer, notes.filter(({isArchived}) => isArchived));

archivedNotesContainer.addEventListener("click", (event)=>{
    let type = event.target.dataset.type;
    let noteId = event.target.dataset.id;
    switch(type){
        case "del":
            notes = notes.filter(({id}) => id.toString() !== noteId);
            break;
            
        case "pinned":
            notes = notes.map(note => note.id.toString() === noteId ? {...note, isPinned: !note.isPinned} : note);
            break;

        case "archived":
            notes = notes.map(note => note.id.toString() === noteId ? {...note, isArchived: !note.isArchived} : note);
            break;
            
        default: break;
    }
    rendernotes(archivedNotesContainer, notes.filter(({isArchived}) => isArchived));
    localStorage.setItem("notes", JSON.stringify(notes));
});