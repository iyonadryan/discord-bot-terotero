//import { read } from 'jimp';
//var jimp = require('jimp');

import pkgJimp from 'jimp';
const { read } = pkgJimp;

import pkgFs from 'fs-extra';
const { readdir} = pkgFs;

import {generateGifPixel} from './generate_gif.js';

let startGenerateGif = 0;

const testCharaGenerate = (name) => {
    return `Hi ${name}`;
}

// ----- Collection Files ----- //
const avatarPath = `./././img/pixel/avatars/`;

// Female
var skinFemaleFiles = []; // 00
const dirPathFemaleSkin = `${avatarPath}1_female/00skin/`;
readdir(dirPathFemaleSkin, (err,file) =>{
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    skinFemaleFiles = file;
});
var costumeFemaleFiles = []; // 01
const dirPathFemaleCostume = `${avatarPath}1_female/01costume/`;
readdir(dirPathFemaleCostume, (err,file) =>{
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    costumeFemaleFiles = file;
});
var eyeFemaleFiles = []; // 02
const dirPathFemaleEye = `${avatarPath}1_female/02eye/`;
readdir(dirPathFemaleEye, (err,file) =>{
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    eyeFemaleFiles = file;
});
var hairFemaleFiles = []; // 03
const dirPathFemaleHair = `${avatarPath}1_female/03hair/`;
readdir(dirPathFemaleHair, (err,file) =>{
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    hairFemaleFiles = file;
});

// ----- !Collection Files ----- //

function startPixelFemaleGenerate(avatarName, interaction){
    console.log(testCharaGenerate('START CHARA GENERATE'));
    
    var jimps = [];

    // Base Shadow / data[0]
    const baseShadow = `${avatarPath}base_shadow.png`;
    jimps.push(read(baseShadow));
    // Get Skin Female // 00 / data[1]
    const skinFemaleAvatar = getRandomFileFromFolder(dirPathFemaleSkin, skinFemaleFiles);
    jimps.push(read(skinFemaleAvatar));
    // Get Costume Female // 01 / data[2]
    const costumeFemaleAvatar = getRandomFileFromFolder(dirPathFemaleCostume, costumeFemaleFiles);
    jimps.push(read(costumeFemaleAvatar));
    // Get Eye Female // 02 / data[3]
    const eyeFemaleAvatar = getRandomFileFromFolder(dirPathFemaleEye, eyeFemaleFiles);
    jimps.push(read(eyeFemaleAvatar));
    // Get hair Female // 03 / data[4]
    const hairFemaleAvatar = getRandomFileFromFolder(dirPathFemaleHair, hairFemaleFiles);
    jimps.push(read(hairFemaleAvatar));

    Promise.all(jimps).then(function(data){
        return Promise.all(jimps);
    }).then(function(data){

        // Hue Color Costume // data[2]
        let randomDegreeCostume = Math.floor(Math.random() * 360);
        data[2].color([
            { apply: 'hue', params: [randomDegreeCostume] }
        ]);

        // Hue Color Eye // data[3]
        let randomDegreeEye = Math.floor(Math.random() * 360);
        data[3].color([
            { apply: 'hue', params: [randomDegreeEye] }
        ]);

        // Hue Color Hair // data[4]
        let randomDegreeHair = Math.floor(Math.random() * 360);
        data[4].color([
            { apply: 'hue', params: [randomDegreeHair] }
        ]);

        data[0].composite(data[1],0,0);
        data[0].composite(data[2],0,0);
        data[0].composite(data[3],0,0);
        data[0].composite(data[4],0,0);

        // Write Image To Local
        data[0].write(`${avatarPath}generate_result/${avatarName}.png`, function(){
            console.log(`wrote the ${avatarName} image`);

            // Crop Image
            startGenerateGif = 0;
            const dirPathCrop = `${avatarPath}generate_result/${avatarName}`;
            starCropAvatarPixel(dirPathCrop, 0 , 0 , 0, 3, avatarName, interaction);
            starCropAvatarPixel(dirPathCrop, 1 , 32 , 0, 3, avatarName, interaction);
            starCropAvatarPixel(dirPathCrop, 2 , 64 , 0, 3, avatarName, interaction);
            console.log(`Generate CROP`);
            
        });
    });    
}

function getRandomFileFromFolder(dirPath,files){
    let maxCount = files.length;
    let randomIndex = Math.floor(Math.random() * maxCount);
    const result = files[randomIndex].toString();
    return `${dirPath}${result}`;
}

async function starCropAvatarPixel(dirPath, part, x , y, checkStartGif , avatarName, interaction) {
    const image = await read(`${dirPath}.png`);

    image.crop(x, y, 32, 32, function(err){
      if (err) throw err;
    })
    .write(`${dirPath}_crop_${part}.png`);
    console.log(`Crop ${part} DONE`);

    // CheckStartGenerateGif
    startGenerateGif++;
    if (startGenerateGif == checkStartGif){
        setTimeout(function() {
            generateGifPixel(dirPath, avatarName, interaction);
        }, 500); // Wait generate gif 0.5sec 
    }
}

export {testCharaGenerate, startPixelFemaleGenerate};
