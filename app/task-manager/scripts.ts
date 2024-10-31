const inputBox = document.getElementById("input-box") as HTMLInputElement | null;
const listContainer = document.getElementById("list-container");

export function addTask() {
  if (inputBox && listContainer) {
    const taskText = inputBox.value; // Use .value to get the input's text
    if (taskText === "") {
      alert("bad");
    } else {
      const taskItem = document.createElement("li");
      taskItem.innerText = taskText;
      listContainer.appendChild(taskItem);

      inputBox.value = ""; // Clear input after adding
    }
  }
}