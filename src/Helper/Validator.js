export default function checkTaskCreation(taskTitle, taskDescription){
    if(taskTitle == undefined && taskDescription == undefined) return false;
    return true;
}