const tasksContainer = document.querySelector(".tasks");
console.log("Task Container:", tasksContainer); // Debugging

const completedTasksDisplay = document.getElementById("completed-tasks-count");
let completedTasks = 0;

// Select the existing h2 inside completed-tasks-count
let countSpan = completedTasksDisplay.querySelector("h2"); 
if (!countSpan) {
    console.error("Count display (h2) not found in #completed-tasks-count!");
}
countSpan.textContent = completedTasks; // Ensure correct display

// Select existing tree image (or create if missing)
let treeImg = completedTasksDisplay.querySelector(".tree-img");
if (!treeImg) {
    treeImg = document.createElement("img");
    treeImg.src = "tree.png";
    treeImg.alt = "Tree";
    treeImg.width = 40;
    treeImg.height = 40;
    treeImg.classList.add("tree-img");
    completedTasksDisplay.appendChild(treeImg);
}

const imageUrl = "tasktree.png.jpg"; // Use the same image for all divs

console.log("Image URL:", imageUrl);

// **Fix: Clear tasks before adding new ones**
tasksContainer.innerHTML = "";

if (tasksContainer) {
    let count = 0;

    for (let i = 0; i < 10; i++) { 
        for (let j = 0; j < 3; j++) { 
            if (count >= 30) break;

            const taskBox = document.createElement("div");
            taskBox.classList.add("task-box");

            const img = document.createElement("img");
            img.src = imageUrl;
            img.alt = `Task Image ${count + 1}`;
            img.classList.add("task-image");

            // **Button container for positioning**
            const buttonContainer = document.createElement("div");
            buttonContainer.classList.add("button-container");

            // **New Task Button (Opens a unique page per task)**
            const taskBtn = document.createElement("button");
            taskBtn.textContent = "Task";
            taskBtn.classList.add("task-btn");

            const taskPageURL = `taskPage${count + 1}.html`; // Unique page per task

            taskBtn.addEventListener("click", () => {
                window.open(taskPageURL, "_blank", "width=600,height=600");
            });

            const completeBtn = document.createElement("button");
            completeBtn.textContent = "Task Completed";
            completeBtn.classList.add("complete-btn");

            completeBtn.addEventListener("click", () => {
                if (!completeBtn.classList.contains("completed")) {
                    completedTasks++;
                    completeBtn.classList.add("completed");
                    completeBtn.textContent = "✅ Done ";
                    completeBtn.style.backgroundColor = "#4CAF50";
                    countSpan.textContent = completedTasks; // Fix: updates h2 text correctly
                }
            });

            const uploadBtn = document.createElement("button");
            uploadBtn.textContent = "Upload Picture";
            uploadBtn.classList.add("upload-btn");

            uploadBtn.addEventListener("click", () => {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = "image/*";
                input.click();

                input.addEventListener("change", (event) => {
                    const file = event.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = function (e) {
                            img.src = e.target.result;
                        };
                        reader.readAsDataURL(file);
                    }
                });
            });

            // Append buttons inside container
            buttonContainer.appendChild(taskBtn);
            buttonContainer.appendChild(completeBtn);
            buttonContainer.appendChild(uploadBtn);

            // Append elements to task box
            taskBox.appendChild(img);
            taskBox.appendChild(buttonContainer);

            tasksContainer.appendChild(taskBox);
            console.log(`Task ${count + 1} added with link to ${taskPageURL}`); // Debugging

            count++;
        }
    }
} else {
    console.error("Tasks container not found! Check your HTML structure.");
}