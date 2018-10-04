export default function formatTitle(taskTitle){
    return taskTitle == undefined ? "Unlabelled" : taskTitle;
}

export default function formatDescription(taskDescription) {
    return taskDescription == undefined ? "Empty" : taskDescription;
  }

export default function formatCategory(taskCategory) {
    return taskCategory == undefined ? "Default" : taskCategory;
}