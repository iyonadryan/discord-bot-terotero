//import { read } from 'jimp';
//var jimp = require('jimp');

import pkgJimp from 'jimp';
const { read } = pkgJimp;

import pkgFs from 'fs-extra';
const { readdir, writeFile , readFileSync, unlinkSync} = pkgFs;

import pkgGifencoder from 'gif-encoder-2';
const GIFEncoder = pkgGifencoder;

import pkgCanvas from 'canvas';
const {Canvas, Image} = pkgCanvas; 

import { generatePixelDone } from '../../index.js';

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
    
    // Get Skin Female // 00
    const skinFemaleAvatar = getRandomFileFromFolder(dirPathFemaleSkin, skinFemaleFiles);
    jimps.push(read(skinFemaleAvatar));
    // Get Costume Female // 01
    const costumeFemaleAvatar = getRandomFileFromFolder(dirPathFemaleCostume, costumeFemaleFiles);
    jimps.push(read(costumeFemaleAvatar));
    // Get Eye Female // 02
    const eyeFemaleAvatar = getRandomFileFromFolder(dirPathFemaleEye, eyeFemaleFiles);
    jimps.push(read(eyeFemaleAvatar));
    // Get hair Female // 03
    const hairFemaleAvatar = getRandomFileFromFolder(dirPathFemaleHair, hairFemaleFiles);
    jimps.push(read(hairFemaleAvatar));

    Promise.all(jimps).then(function(data){
        return Promise.all(jimps);
    }).then(function(data){

        // Hue Color Costume // 01
        let randomDegreeCostume = Math.floor(Math.random() * 360);
        data[1].color([
            { apply: 'hue', params: [randomDegreeCostume] }
        ]);

        // Hue Color Eye // 02
        let randomDegreeEye = Math.floor(Math.random() * 360);
        data[2].color([
            { apply: 'hue', params: [randomDegreeEye] }
        ]);

        // Hue Color Hair // 03
        let randomDegreeHair = Math.floor(Math.random() * 360);
        data[3].color([
            { apply: 'hue', params: [randomDegreeHair] }
        ]);

        data[0].composite(data[1],0,0);
        data[0].composite(data[2],0,0);
        data[0].composite(data[3],0,0);

        // Write Image To Local
        data[0].write(`${avatarPath}generate_result/${avatarName}.png`, function(){
            console.log(`wrote the ${avatarName} image`);

            // Crop Image
            startGenerateGif = 0;
            const dirPathCrop = `./././img/pixel/avatars/generate_result/${avatarName}`;
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
            generateGif(dirPath, avatarName, interaction);
        }, 500); // Wait generate gif 0.5sec 
    }
}

function generateGif(dirPath, avatarName, interaction){
    console.log(`Start Generate GIF`);
    const encoder = new GIFEncoder(32, 32);
    encoder.setDelay(200);
    encoder.setTransparent(0x000000); // Remove Black Color
    encoder.start();

    var canvas0 = new Canvas(32, 32);
    var canvas1 = new Canvas(32, 32);
    var canvas2 = new Canvas(32, 32);
    var ctx0 = canvas0.getContext('2d');
    var ctx1 = canvas1.getContext('2d');
    var ctx2 = canvas2.getContext('2d');

    // image frame
    var data0 = readFileSync(`${dirPath}_crop_0.png`);
    var data1 = readFileSync(`${dirPath}_crop_1.png`);
    var data2 = readFileSync(`${dirPath}_crop_2.png`);
    var img0 = new Image; 
    var img1 = new Image; 
    var img2 = new Image; 
    img0.src = data0;
    img1.src = data1;
    img2.src = data2;

    ctx0.drawImage(img0, 0, 0, 32, 32);
    encoder.addFrame(ctx0);

    ctx1.drawImage(img1, 0, 0, 32, 32);
    encoder.addFrame(ctx1);

    ctx2.drawImage(img2, 0, 0, 32, 32);
    encoder.addFrame(ctx2);

    encoder.addFrame(ctx1);

    encoder.finish()

    const buffer = encoder.out.getData()
    const gifPath = `${dirPath}_animation.gif`;
    writeFile(gifPath, buffer, error => {
      // gif drawn or error
    });
    console.log(`Generate GIF DONE`);

    // After Create GIF, Delete Image From Local

    unlinkSync(`${dirPath}_crop_0.png`);
    unlinkSync(`${dirPath}_crop_1.png`);
    unlinkSync(`${dirPath}_crop_2.png`);

    const attachmentAvatar = `${dirPath}_animation.gif`;
    generatePixelDone(attachmentAvatar, avatarName, interaction);
}

export {testCharaGenerate, startPixelFemaleGenerate};
