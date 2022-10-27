var listUser = [];

var discordNumber = [":zero:",":one:",":two:",":three:",":four:",
                ":five:",":six:",":seven:",":eight:",":nine:",":ten:"];

// Show
function showListUser (){
    let result = "";
    for (let i = 0; i < listUser.length; i++) {
        const numberString = `${discordNumber[i+1]}`
        const addString = `${numberString} ${listUser[i]}`;
        result = result.concat(addString);
        if (i < listUser.length - 1) result = result.concat("\n");
    }
    return result;
}

// Add
function addListUser (user){
    listUser.push(user);
}

// Remove
function removeListUser (number){
    const index = number-1;
    listUser = arrayRemove(listUser, listUser[index]);
}
function arrayRemove(arr, value) {   
    return arr.filter(function(ele){ 
        return ele != value; 
    });
}

// Shuffle
function shuffleListUser(){
    var shuffledArray = listUser.sort(() => Math.random() - 0.5);
    listUser = shuffledArray;
}

// Reset
function resetListUser(){
    listUser.length = 0;
}

export {showListUser, addListUser, removeListUser, shuffleListUser, resetListUser};