/*
* Checks if either the task title or task description has been filled out
*/
export function taskIsValid(taskTitle, taskDescription) {
    if (taskTitle == '' && taskDescription == '') return false;
    return true;
}


/*
* When creating a new category - checks if the category doesn't already exist and an apporpirate
* category name is provided
*/
export function categoryIsValid(categoryName, categoriesList) {
    if (alreadyExists(categoryName, categoriesList)) return false;
    if (!isCorrect(categoryName)) return false;
    return true;
}

function alreadyExists(categoryName, categoriesList) {
    for (let i = 0; i < categoriesList.length; i++) {
        if (categoriesList[i].categoryName.toLowerCase() === categoryName.toLowerCase()) return true;
    }
    return false;
}

function isCorrect(categoryName) {
    if (categoryName == undefined) return false;
    if (categoryName.trim().length == 0) return false;
    return true;
}