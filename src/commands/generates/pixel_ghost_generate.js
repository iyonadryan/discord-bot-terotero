import pkgJimp from 'jimp';
const { read } = pkgJimp;

import pkgFs from 'fs-extra';
const { readdir} = pkgFs;

import {generateGifPixel} from './generate_gif.js';

let startGenerateGif = 0;

// ----- Collection Files ----- //
const avatarPath = `./././img/pixel/avatars/`;

// Ghost
var skinGhostFiles = []; // 00
const dirPathGhostSkin = `${avatarPath}2_ghost/00skin/`;
readdir(dirPathGhostSkin, (err,file) =>{
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    skinGhostFiles = file;
});
var eyeGhostFiles = []; // 01
const dirPathGhostEye = `${avatarPath}2_ghost/01eye/`;
readdir(dirPathGhostEye, (err,file) =>{
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    eyeGhostFiles = file;
});
var hatGhostFiles = []; // 02
const dirPathGhostHat = `${avatarPath}2_ghost/02hat/`;
readdir(dirPathGhostHat, (err,file) =>{
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    hatGhostFiles = file;
});

// ----- !Collection Files ----- //

function startPixelGhostGenerate(avatarName, interaction){
    
    var jimps = [];
    
    // Get Skin Ghost // 00 / data[0]
    const skinGhostAvatar = getRandomFileFromFolder(dirPathGhostSkin, skinGhostFiles);
    jimps.push(read(skinGhostAvatar));
    // Get Eye Ghost // 01 / data[1]
    const eyeGhostAvatar = getRandomFileFromFolder(dirPathGhostEye, eyeGhostFiles);
    jimps.push(read(eyeGhostAvatar));
    // Get Hat Ghost // 02 / data[2]
    const hatGhostAvatar = getRandomFileFromFolder(dirPathGhostHat, hatGhostFiles);
    jimps.push(read(hatGhostAvatar));

    Promise.all(jimps).then(function(data){
        return Promise.all(jimps);
    }).then(function(data){

        // Hue Color Skin // data[0]
        let randomDegreeCostume = Math.floor(Math.random() * 360);
        data[0].color([
            { apply: 'hue', params: [randomDegreeCostume] }
        ]);

        // Hue Color Eye // data[1]
        let randomDegreeEye = Math.floor(Math.random() * 360);
        data[1].color([
            { apply: 'hue', params: [randomDegreeEye] }
        ]);

        // Hue Color Hat // data[2]
        let randomDegreeHat = Math.floor(Math.random() * 360);
        data[2].color([
            { apply: 'hue', params: [randomDegreeHat] }
        ]);

        data[0].composite(data[1],0,0);
        data[0].composite(data[2],0,0);

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

export {startPixelGhostGenerate};
