import { rendernotes } from "./app.js";

const title = document.querySelector(".title");
const detail = document.querySelector(".detail");
const addBtn = document.querySelector(".add-btn");

const notesContainer = document.querySelector(".notes-container");
const pinNoteContainer = document.querySelector(".pinned-notes-container");
const otherNoteContainer = document.querySelector(".other-notes-container");
const pinTitle = document.querySelector(".pin-title");
const otherTitle = document.querySelector(".other-title");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

if(notes.length > 0){
    // when there are only arhived notes and no pinned and other notes then bellow two line not work
    pinTitle.classList.remove("d-none");
    otherTitle.classList.remove("d-none");
    rendernotes(pinNoteContainer, notes.filter(({isPinned, isArchived}) => isPinned && !isArchived));
    rendernotes(otherNoteContainer, notes.filter(({isPinned, isArchived}) => !isPinned && !isArchived));
}

addBtn.addEventListener("click", ()=>{
    if(title.value.trim().length > 0 || detail.value.trim().length > 0){
        notes = [...notes, {id: Date.now(), title: title.value.trim(), detail: detail.value.trim(), isPinned: false, isArchived: false}];
        rendernotes(pinNoteContainer, notes.filter(({isPinned, isArchived}) => isPinned && !isArchived));
        rendernotes(otherNoteContainer, notes.filter(({isPinned, isArchived}) => !isPinned && !isArchived));
        localStorage.setItem("notes", JSON.stringify(notes));
        title.value = detail.value = "";
    }
});

notesContainer.addEventListener("click", (event)=>{
    let type = event.target.dataset.type;
    let noteId = event.target.dataset.id;
    switch(type){
        case "del":
            notes = notes.filter(({id}) => id.toString() !== noteId);
            if(notes.length == 0){
                pinTitle.classList.add("d-none");
                otherTitle.classList.add("d-none");
            }
            break;

        case "pinned":
            notes = notes.map(note => note.id.toString() === noteId ? {...note, isPinned: !note.isPinned} : note);
            pinTitle.classList.remove("d-none");
            otherTitle.classList.remove("d-none");
            break;

        case "archived":
            notes = notes.map(note => note.id.toString() === noteId ? {...note, isArchived: !note.isArchived} : note);
            break;
            
        default: break;
    }
    rendernotes(pinNoteContainer, notes.filter(({isPinned, isArchived}) => isPinned && !isArchived));
    rendernotes(otherNoteContainer, notes.filter(({isPinned, isArchived}) => !isPinned && !isArchived));
    localStorage.setItem("notes", JSON.stringify(notes));
});