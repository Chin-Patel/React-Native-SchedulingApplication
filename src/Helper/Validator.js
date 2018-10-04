export function taskIsValid(taskTitle, taskDescription){
    if(taskTitle == '' && taskDescription == '') return false;
    return true;
}