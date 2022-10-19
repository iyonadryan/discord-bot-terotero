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

let startGenerateGif = 0;

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

        // Hue Color Costume
        let randomDegreeCostume = Math.floor(Math.random() * 360);
        data[1].color([
            { apply: 'hue', params: [randomDegreeCostume] }
        ]);

        // Hue Color Eye
        let randomDegreeEye = Math.floor(Math.random() * 360);
        data[2].color([
            { apply: 'hue', params: [randomDegreeEye] }
        ]);

        // Hue Color Hair
        let randomDegreeHair = Math.floor(Math.random() * 360);
        data[3].color([
            { apply: 'hue', params: [randomDegreeHair] }
        ]);

        data[0].composite(data[1],0,0);
        data[0].composite(data[2],0,0);
        data[0].composite(data[3],0,0);

        // Write Image To Local
        data[0].write(`./././img/pixel/avatars/generate_result/${avatarName}.png`, function(){
            console.log(`wrote the ${avatarName} image`);

            // Crop Image
            startGenerateGif = 0;
            const dirPathCrop = `./././img/pixel/avatars/generate_result/${avatarName}`;
            starCropAvatarPixel(dirPathCrop, 0 , 0 , 0, 3);
            starCropAvatarPixel(dirPathCrop, 1 , 32 , 0, 3);
            starCropAvatarPixel(dirPathCrop, 2 , 64 , 0, 3);
            console.log(`Generate CROP`);
            
        });
    });    
}

async function starCropAvatarPixel(dirPath, part, x , y, checkStartGif) {
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
            generateGif(dirPath);
        }, 1000); // Wait generate gif 1sec 
    }
}

function generateGif(dirPath){
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
}

export {testCharaGenerate, startCharaGenerate};
