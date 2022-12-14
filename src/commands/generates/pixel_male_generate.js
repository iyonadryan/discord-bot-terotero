import pkgJimp from 'jimp';
const { read } = pkgJimp;

import pkgFs from 'fs-extra';
const { readdir} = pkgFs;

import {generateGifPixel} from './generate_gif.js';

let startGenerateGif = 0;

// ----- Collection Files ----- //
const avatarPath = `./././img/pixel/avatars/`;

// Male
var skinMaleFiles = []; // 00
const dirPathMaleSkin = `${avatarPath}0_male/00skin/`;
readdir(dirPathMaleSkin, (err,file) =>{
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    skinMaleFiles = file;
});
var costumeMaleFiles = []; // 01
const dirPathMaleCostume = `${avatarPath}0_male/01costume/`;
readdir(dirPathMaleCostume, (err,file) =>{
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    costumeMaleFiles = file;
});
var eyeMaleFiles = []; // 02
const dirPathMaleEye = `${avatarPath}0_male/02eye/`;
readdir(dirPathMaleEye, (err,file) =>{
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    eyeMaleFiles = file;
});
var hairMaleFiles = []; // 03
const dirPathMaleHair = `${avatarPath}0_male/03hair/`;
readdir(dirPathMaleHair, (err,file) =>{
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    hairMaleFiles = file;
});

// ----- !Collection Files ----- //

function startPixelMaleGenerate(avatarName, interaction){
    
    var jimps = [];
    
    // Base Shadow / data[0]
    const baseShadow = `${avatarPath}base_shadow.png`;
    jimps.push(read(baseShadow));
    // Get Skin Male // 00 / data[1]
    const skinMaleAvatar = getRandomFileFromFolder(dirPathMaleSkin, skinMaleFiles);
    jimps.push(read(skinMaleAvatar));
    // Get Costume Male // 01 / data[2]
    const costumeMaleAvatar = getRandomFileFromFolder(dirPathMaleCostume, costumeMaleFiles);
    jimps.push(read(costumeMaleAvatar));
    // Get Eye Male // 02 / data[3]
    const eyeMaleAvatar = getRandomFileFromFolder(dirPathMaleEye, eyeMaleFiles);
    jimps.push(read(eyeMaleAvatar));
    // Get hair Male // 03 / data[4]
    const hairMaleAvatar = getRandomFileFromFolder(dirPathMaleHair, hairMaleFiles);
    jimps.push(read(hairMaleAvatar));

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

export {startPixelMaleGenerate};
