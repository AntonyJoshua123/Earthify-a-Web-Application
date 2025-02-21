// 🌍 Earth Stages
const earthStages = [
    { 
        img: "earth1.png", 
        text: "The Earth is feeling very sick! 🌍💨 The air is filled with smoke, trees are being cut down, and the rivers are ugly and dirty. We need to help the planet heal by planting trees, saving water, and keeping our surroundings clean! 🌱💚" 
    },
    { 
        img: "earth2.png", 
        text: "Look, the Earth is getting a little better! 🌍✨ The air pollution and deforestation are reducing, but we still have a lot of work to do. Keep going, Captain Green! Every task you complete makes a big difference! 🌿👍" 
    },
    { 
        img: "earth3.png", 
        text: "Amazing work! The air is much cleaner, and you can see clear water in the rivers. Keep doing those tasks, and we'll see the planet become even healthier! 🌱🌸" 
    },
    { 
        img: "earth4.png", 
        text: "Wow! The Earth is almost completely clean, but it still looks super sad. 🌍😔 We need to do just a bit more to make it fully happy. Let's continue our great work! 🌳💧" 
    },
    { 
        img: "earth5.png", 
        text: "Congratulations! The Earth is now fully clean and happy! 🌍🌟 You've planted trees, saved water, and kept the environment clean. The planet is now a beautiful and joyful place to live. Great job, Captain Green! 🌿🏆" 
    }
];



// Initialize completed tasks count to 0
let completedTasks = 0; // Always start from 0

// 🌍 Function to Update Earth on earthbase.html
function updateEarthBase() {
    let image = document.getElementById("earth-image");
    let content = document.getElementById("earth-content");

    // Only proceed if the elements exist
    if (image && content) {
        // Determine which stage of Earth to show (one stage per 5 tasks)
        let stageIndex = Math.min(Math.floor(completedTasks / 5), earthStages.length - 1);

        // Update Earth image and text
        image.querySelector('img').src = earthStages[stageIndex].img;
        content.textContent = earthStages[stageIndex].text;
    } else {
        console.log("Earth elements not found on this page. Skipping update.");
    }
}

// Check if the current page is earthbase.html
if (window.location.href.includes("earthbase.html")) {
    // Run updateEarthBase when earthbase.html loads
    document.addEventListener("DOMContentLoaded", updateEarthBase);
}

// Check if the current page is main.html
if (document.querySelector(".tasks")) {
    // Select the tasks container and completed tasks display
    const tasksContainer = document.querySelector(".tasks");
    const completedTasksDisplay = document.getElementById("completed-tasks-count");

    // Select the existing h2 inside completed-tasks-count
    let countSpan = completedTasksDisplay.querySelector("h2"); 
    if (!countSpan) {
        console.error("Count display (h2) not found in #completed-tasks-count!");
    } else {
        countSpan.textContent = completedTasks; // Ensure correct display
    }

    // Select existing tree image (or create if missing)
    let treeImg = completedTasksDisplay.querySelector(".tree-img");
    if (!treeImg) {
        treeImg = document.createElement("img");
        treeImg.src = "tree.png"; // Ensure this image exists in your project
        treeImg.alt = "Tree";
        treeImg.width = 40;
        treeImg.height = 40;
        treeImg.classList.add("tree-img");
        completedTasksDisplay.appendChild(treeImg);
    }

    const imageUrl = "tasktree.png.jpg"; // Use the same image for all divs
    console.log("Image URL:", imageUrl);

    // Clear tasks before adding new ones
    if (tasksContainer) {
        tasksContainer.innerHTML = "";

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

                // Button container for positioning
                const buttonContainer = document.createElement("div");
                buttonContainer.classList.add("button-container");

                // Task Button (Opens a unique page per task)
                const taskBtn = document.createElement("button");
                taskBtn.textContent = "Task";
                taskBtn.classList.add("task-btn");

                const taskPageURL = `taskPage${count + 1}.html`; // Unique page per task
                taskBtn.addEventListener("click", () => {
                    // Fallback if task pages don't exist
                    if (taskPageURL) {
                        window.open(taskPageURL, "_blank", "width=700,height=600");
                    } else {
                        alert("Task page not yet available!");
                    }
                });

                // Complete Task Button
                const completeBtn = document.createElement("button");
                completeBtn.textContent = "Task Completed";
                completeBtn.classList.add("complete-btn");

                completeBtn.addEventListener("click", () => {
                    if (!completeBtn.classList.contains("completed")) {
                        completedTasks++;
                        localStorage.setItem("completedTasks", completedTasks); // Save progress
                        completeBtn.classList.add("completed");
                        completeBtn.textContent = "✅ Done";
                        completeBtn.style.backgroundColor = "#4CAF50";
                        countSpan.textContent = completedTasks;
                        updateEarthBase(); // Update Earth base after task completion
                    }
                });

                // Upload Picture Button
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
                                img.src = e.target.result; // Update the image source
                            };
                            reader.readAsDataURL(file); // Read the file as a data URL
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
}