export function taskIsValid(taskTitle, taskDescription){
    if(taskTitle == '' && taskDescription == '') return false;
    return true;
}


export function categoryIsValid(categoryName, categoriesList){
    if(alreadyExists(categoryName, categoriesList)) return false;
    if(!isCorrect(categoryName)) return false;
    return true;
}

function alreadyExists(categoryName, categoriesList){
    for(let i = 0; i < categoriesList.length; i++){
        if(categoriesList[i].categoryName === categoryName) return true;
    }
    return false;
}

function isCorrect(categoryName){
    if(categoryName == undefined) return false;
    if(categoryName.trim().length == 0) return false;
    return true;
}