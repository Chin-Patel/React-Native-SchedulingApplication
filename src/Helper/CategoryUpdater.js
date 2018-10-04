export function findCategoryId(categoriesList, categoryName) {
    for (let i = 0; i < categoriesList.length; i++) {
        //alert("-> " + categoriesList[i].categoryName + " " + JSON.stringify(categoriesList) + " --> " + categoryName)
        if (categoriesList[i].categoryName === categoryName) {
            return categoriesList[i].id;
        }
    }
}

export function findCategoryIdFromTask(categoriesList, categoryName) {
    for (let i = 0; i < categoriesList.length; i++) {
        if (categoriesList[i].taskCategory === categoryName) {
            return categoriesList[i].id;
        }
    }
}

export function getIncreaseCategoryCount(categoriesList, categoryName) {
    for (let i = 0; i < categoriesList.length; i++) {
        if (categoriesList[i].categoryName === categoryName) {
            let original = categoriesList[i].categoryCount;
            return original + 1;
        }
    }
    return 0;
}

export function getDecreaseCategoryCount(categoriesList, categoryName) {
    for (let i = 0; i < categoriesList.length; i++) {
      if (categoriesList[i].categoryName === categoryName) {
        let original = categoriesList[i].categoryCount;
        return original - 1;
      }
    }
    return 0;
}