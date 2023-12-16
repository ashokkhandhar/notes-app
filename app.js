export const rendernotes = (container, notes) =>{
    let newNote = notes.map(({id, title, detail, isPinned, isArchived})=>{
        return (
            `<div class="single-note d-flex gap-sm direction-column shadow">
                <div class="d-flex align-center">
                    <span class="title">${title}</span>
                    <button class="button btn del-btn v-hidden"><span class="material-icons-outlined" data-type="del" data-id=${id}>delete</span></button>
                </div>
                <span class="detail">${detail}</span>
                <div class="pin-archive d-flex gap-sm">
                    <button class="button btn p-a-btn v-hidden"><span class=${isPinned ? "material-icons" : "material-icons-outlined"} data-type="pinned" data-id=${id}>push_pin</span></button>
                    <button class="button btn p-a-btn v-hidden"><span class=${isArchived ? "material-icons" : "material-icons-outlined"} data-type="archived" data-id=${id}>archive</span></button>
                </div>
            </div>`
        );
    }).join("");
    container.innerHTML = newNote;
}