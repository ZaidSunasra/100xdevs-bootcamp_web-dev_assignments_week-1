let draggedElement = null;

const dropZones = document.querySelectorAll('.drop-zone');
const taskCards = document.querySelectorAll('.task-card');
const addButton = document.getElementById('add-todo')

taskCards.forEach(card => setupDrag(card));

dropZones.forEach(zone => {
    zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        zone.classList.add('bg-blue-50', 'border-2', 'border-blue-400');
    });
    zone.addEventListener('dragleave', (e) => {
        zone.classList.remove('bg-blue-50', 'border-2', 'border-blue-400');
    });
    zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('bg-blue-50', 'border-2', 'border-blue-400');
        if (draggedElement) {
            zone.appendChild(draggedElement);
        }
    });
})

function setupDrag(element) {
    element.draggable = true;
    element.addEventListener('dragstart', (e) => {
        draggedElement = element;
        element.classList.add('opacity-50');
    });
    element.addEventListener('dragend', (e) => {
        element.classList.remove('opacity-50');
        draggedElement = null
    });
}

addButton.addEventListener("click", function () {
    const title = document.getElementById("title")
    const status = document.getElementById("status")
    if (title.value == "" || status.value == "") {
        alert("Title and status cannot be empty")
        return;
    }
    const statusCard = document.getElementById(`${status.value}`)
    const taskCard = document.createElement("div");
    taskCard.className = "task-card  bg-gray-100 p-3 rounded cursor-move hover:shadow-md"
    taskCard.textContent = title.value
    statusCard.appendChild(taskCard)
    setupDrag(taskCard)
})