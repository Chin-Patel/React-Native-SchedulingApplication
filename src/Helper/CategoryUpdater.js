
/*
* Given an array of categories - returns the the undique key for the given category name   
*/
export function findCategoryId(categoriesList, categoryName) {
    for (let i = 0; i < categoriesList.length; i++) {
        if (categoriesList[i].categoryName === categoryName) {
            return categoriesList[i].id;
        }
    }
}

/*
* Given an array of tasks - return the unique id for the given category name
*/
export function findCategoryIdFromTask(categoriesList, categoryName) {
    for (let i = 0; i < categoriesList.length; i++) {
        if (categoriesList[i].taskCategory === categoryName) {
            return categoriesList[i].id;
        }
    }
}

/*
* Returns the number of items in a category + 1
*/
export function getIncreaseCategoryCount(categoriesList, categoryName) {
    for (let i = 0; i < categoriesList.length; i++) {
        if (categoriesList[i].categoryName === categoryName) {
            let original = categoriesList[i].categoryCount;
            return original + 1;
        }
    }
    return 0;
}

/*
* Returns the number of items in a category - 1
*/
export function getDecreaseCategoryCount(categoriesList, categoryName) {
    for (let i = 0; i < categoriesList.length; i++) {
        if (categoriesList[i].categoryName === categoryName) {
            let original = categoriesList[i].categoryCount;
            return original - 1;
        }
    }
    return 0;
}

export function checkExists(categoriesList, categoryName){
    for(let i = 0; i < categoriesList.length; i++){
        if(categoriesList[i].categoryName.toLowerCase() === categoryName.toLowerCase()){
            return true;
        } 
    }
    return false;
}