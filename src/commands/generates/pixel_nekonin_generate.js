import pkgJimp from 'jimp';
const { read } = pkgJimp;

import pkgFs from 'fs-extra';
const { readdir} = pkgFs;

import {generateGifPixel} from './generate_gif.js';

let startGenerateGif = 0;

// ----- Collection Files ----- //
const avatarPath = `./././img/pixel/avatars/`;

// Nekonin
var skinNekoninFiles = []; // 00
const dirPathNekoninSkin = `${avatarPath}3_nekonin/00skin/`;
readdir(dirPathNekoninSkin, (err,file) =>{
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    skinNekoninFiles = file;
});
var costumeNekoninFiles = []; // 01
const dirPathNekoninCostume = `${avatarPath}3_nekonin/01costume/`;
readdir(dirPathNekoninCostume, (err,file) =>{
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    costumeNekoninFiles = file;
});
var eyeNekoninFiles = []; // 02
const dirPathNekoninEye = `${avatarPath}3_nekonin/02eye/`;
readdir(dirPathNekoninEye, (err,file) =>{
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    eyeNekoninFiles = file;
});

// ----- !Collection Files ----- //

function startPixelNekoninGenerate(avatarName, interaction){
    
    var jimps = [];
    
    // Base Shadow / data[0]
    const baseShadow = `${avatarPath}base_shadow.png`;
    jimps.push(read(baseShadow));
    // Get Skin Nekonin // 00 / data[1]
    const skinNekoninAvatar = getRandomFileFromFolder(dirPathNekoninSkin, skinNekoninFiles);
    jimps.push(read(skinNekoninAvatar));
    // Get Costume Nekonin // 01 / data[2]
    const costumeNekoninAvatar = getRandomFileFromFolder(dirPathNekoninCostume, costumeNekoninFiles);
    jimps.push(read(costumeNekoninAvatar));
    // Get Eye Nekonin // 02 / data[3]
    const eyeNekoninAvatar = getRandomFileFromFolder(dirPathNekoninEye, eyeNekoninFiles);
    jimps.push(read(eyeNekoninAvatar));

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

        data[0].composite(data[1],0,0);
        data[0].composite(data[2],0,0);
        data[0].composite(data[3],0,0);

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

export {startPixelNekoninGenerate};
