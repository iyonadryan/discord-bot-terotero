//import { read } from 'jimp';
//var jimp = require('jimp');

import pkgJimp from 'jimp';
const { read } = pkgJimp;

import pkgFs from 'fs-extra';
const { readdir } = pkgFs;

const testCharaGenerate = (name) => {
    return `Hi ${name}`;
}

// ----- Collection Files ----- //
const avatarPath = `./././img/pixel/avatars/`;

// Female
var skinFemaleFiles = [];
const dirPathFemaleSkin = `${avatarPath}1_female/00skin/`;
readdir(dirPathFemaleSkin, (err,file) =>{
    skinFemaleFiles = file;
});
var costumeFemaleFiles = [];
const dirPathFemaleCostume = `${avatarPath}1_female/01costume/`;
readdir(dirPathFemaleCostume, (err,file) =>{
    costumeFemaleFiles = file;
});
var eyeFemaleFiles = [];
const dirPathFemaleEye = `${avatarPath}1_female/02eye/`;
readdir(dirPathFemaleEye, (err,file) =>{
    eyeFemaleFiles = file;
});
var hairFemaleFiles = [];
const dirPathFemaleHair = `${avatarPath}1_female/03hair/`;
readdir(dirPathFemaleHair, (err,file) =>{
    hairFemaleFiles = file;
});

// ----- !Collection Files ----- //

function getRandomFileFromFolder(dirPath,files){
    let maxCount = files.length;
    let randomIndex = Math.floor(Math.random() * maxCount);
    const result = files[randomIndex].toString();
    return `${dirPath}${result}`;
}

function startCharaGenerate(avatarName){
    console.log(testCharaGenerate('START CHARA GENERATE'));
    
    var jimps = [];
    
    // Get Skin Female
    const skinFemaleAvatar = getRandomFileFromFolder(dirPathFemaleSkin, skinFemaleFiles);
    jimps.push(read(skinFemaleAvatar));
    // Get Costume Female
    const costumeFemaleAvatar = getRandomFileFromFolder(dirPathFemaleCostume, costumeFemaleFiles);
    jimps.push(read(costumeFemaleAvatar));
    // Get Eye Female
    const eyeFemaleAvatar = getRandomFileFromFolder(dirPathFemaleEye, eyeFemaleFiles);
    jimps.push(read(eyeFemaleAvatar));
    // Get hair Female
    const hairFemaleAvatar = getRandomFileFromFolder(dirPathFemaleHair, hairFemaleFiles);
    jimps.push(read(hairFemaleAvatar));

    Promise.all(jimps).then(function(data){
        return Promise.all(jimps);
    }).then(function(data){
        // Hue Color Hair
        let randomDegree = Math.floor(Math.random() * 360);
        data[3].color([
            { apply: 'hue', params: [randomDegree] }
        ]);

        data[0].composite(data[1],0,0);
        data[0].composite(data[2],0,0);
        data[0].composite(data[3],0,0);

        data[0].write(`./././img/pixel/avatars/generate_result/${avatarName}.png`, function(){
            console.log(`wrote the ${avatarName} image`);

            // Crop Image
            data[0].crop(32, 0 , 32, 32);
            data[0].write(`./././img/pixel/avatars/generate_result/${avatarName}_crop.png`, function(){
                console.log(`crop ${avatarName} image`);
                console.log("Generate DONE");
            });
        });
    });    
}

export {testCharaGenerate, startCharaGenerate};
