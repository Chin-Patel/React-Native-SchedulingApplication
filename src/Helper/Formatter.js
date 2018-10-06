import { getTodaysDate } from './DateHelper'


export function formatTitle(taskTitle) {
    return taskTitle == undefined ? "Unlabelled" : taskTitle;
}

export function formatDescription(taskDescription) {
    return taskDescription == undefined ? "Empty" : taskDescription;
}

export function formatCategory(taskCategory) {
    return taskCategory == undefined ? "Default" : taskCategory;
}

export function formatDate(taskDate) {
    return taskDate == '' ? getTodaysDate() : taskDate;
}

/*
* Splits a array of categorys which has information regarding the id, number of items in the category, and the category name
* and returns an array just containing the category names
*/
export function splitJSON(categoriesList) {
    let categoryNames = [];
    for (let i = 0; i < categoriesList.length; i++) {
        categoryNames.push(categoriesList[i].categoryName);
    }
    return categoryNames;
}