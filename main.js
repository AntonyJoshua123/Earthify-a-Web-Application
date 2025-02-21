const tasksContainer = document.querySelector(".tasks");
console.log("Task Container:", tasksContainer); // Debugging

const completedTasksDisplay = document.getElementById("completed-tasks-count");
let completedTasks = 0;

// Select existing count span (or create if missing)
let countSpan = completedTasksDisplay.querySelector(".task-count");
if (!countSpan) {
    countSpan = document.createElement("span");
    countSpan.classList.add("task-count");
    completedTasksDisplay.appendChild(countSpan);
}
countSpan.textContent = completedTasks; // Ensure correct display

// Select existing tree image (or create if missing)
let treeImg = completedTasksDisplay.querySelector(".tree-img");
if (!treeImg) {
    treeImg = document.createElement("img");
    treeImg.src = "tree.png";
    treeImg.alt = "Tree";
    treeImg.width = 20;
    treeImg.height = 20;
    treeImg.classList.add("tree-img");
    completedTasksDisplay.appendChild(treeImg);
}

const imageUrls = [
    "images/image1.jpg", "images/image2.jpg", "images/image3.jpg", "images/image4.jpg", "images/image5.jpg",
    "images/image6.jpg", "images/image7.jpg", "images/image8.jpg", "images/image9.jpg", "images/image10.jpg",
    "images/image11.jpg", "images/image12.jpg", "images/image13.jpg", "images/image14.jpg", "images/image15.jpg",
    "images/image16.jpg", "images/image17.jpg", "images/image18.jpg", "images/image19.jpg", "images/image20.jpg",
    "images/image21.jpg", "images/image22.jpg", "images/image23.jpg", "images/image24.jpg", "images/image25.jpg",
    "images/image26.jpg", "images/image27.jpg", "images/image28.jpg", "images/image29.jpg", "images/image30.jpg"
];

console.log("Image URLs:", imageUrls);

// **Fix: Clear tasks before adding new ones**
tasksContainer.innerHTML = "";

if (tasksContainer) {
    let count = 0;

    for (let i = 0; i < 10; i++) { 
        for (let j = 0; j < 3; j++) { 
            if (count >= imageUrls.length) break;

            const taskBox = document.createElement("div");
            taskBox.classList.add("task-box");

            const img = document.createElement("img");
            img.src = imageUrls[count];
            img.alt = `Task Image ${count + 1}`;

            const completeBtn = document.createElement("button");
            completeBtn.textContent = "Task Completed";
            completeBtn.classList.add("complete-btn");

            completeBtn.addEventListener("click", () => {
                if (!completeBtn.classList.contains("completed")) {
                    completedTasks++;
                    completeBtn.classList.add("completed");
                    completeBtn.textContent = "✅ Done ";
                    completeBtn.style.backgroundColor = "#4CAF50";
                    countSpan.textContent = `${completedTasks}`;  // **Update count**
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

            taskBox.appendChild(img);
            taskBox.appendChild(completeBtn);
            taskBox.appendChild(uploadBtn);

            tasksContainer.appendChild(taskBox);
            console.log(`Task ${count + 1} added`); // Debugging

            count++;
        }
    }
} else {
    console.error("Tasks container not found! Check your HTML structure.");
}