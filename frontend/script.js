let bugCounter = 3;

const createBtn = document.getElementById("createBugBtn");
const modal = document.getElementById("bugModal");
const saveBtn = document.getElementById("saveBug");


createBtn.addEventListener("click", () => {

    modal.style.display = "block";

});


saveBtn.addEventListener("click", () => {

    const title = document.getElementById("bugTitle").value;
    const priority = document.getElementById("priority").value;


    const table = document.querySelector("table");


    const row = table.insertRow();


    row.innerHTML = `
<td>BUG-${bugCounter}</td>
        <td>${title}</td>
        <td>${priority}</td>
        <td>Open</td>
    `;


    modal.style.display = "none";

    bugCounter++;

});