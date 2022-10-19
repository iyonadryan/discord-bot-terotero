//import { read } from 'jimp';
//var jimp = require('jimp');

import pkgJimp from 'jimp';
const { read } = pkgJimp;

import pkgFs from 'fs-extra';
const { readdir, writeFile } = pkgFs;

//const GIFEncoder = require('gif-encoder-2')
import pkgGifencoder from 'gif-encoder-2';
const GIFEncoder = pkgGifencoder;

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

        data[0].write(`./././img/pixel/avatars/generate_result/${avatarName}.png`, function(){
            console.log(`wrote the ${avatarName} image`);

            // Crop Image
            const dirPathCrop = `./././img/pixel/avatars/generate_result/${avatarName}`;
            starCropAvatarPixel(dirPathCrop, 0 , 0 , 0);
            starCropAvatarPixel(dirPathCrop, 1 , 32 , 0);
            starCropAvatarPixel(dirPathCrop, 2 , 64 , 0);
            console.log(`Generate CROP`);
            
            //Test gif
            testGif();
        });
    });    
}

async function starCropAvatarPixel(dirPath, part, x , y) {
    const image = await read(`${dirPath}.png`);

    image.crop(x, y, 32, 32, function(err){
      if (err) throw err;
    })
    .write(`${dirPath}_crop_${part}.png`);
    console.log(`Crop ${part} DONE`);
}

function testGif(){
    const encoder = new GIFEncoder(32, 32);
    encoder.setDelay(500)
    encoder.start()
    /*
    encoder.addFrame(`./././img/pixel/avatars/generate_result/aaa_crop_0.png`);
    encoder.addFrame(`./././img/pixel/avatars/generate_result/aaa_crop_1.png`);
    encoder.addFrame(`./././img/pixel/avatars/generate_result/aaa_crop_2.png`);
    encoder.addFrame(`./././img/pixel/avatars/generate_result/aaa_crop_1.png`);
    */
    encoder.finish()

    const buffer = encoder.out.getData()
    const gifPath = `./././img/pixel/avatars/generate_result/test.gif`;
    writeFile(gifPath, buffer, error => {
      // gif drawn or error
    });
}

export {testCharaGenerate, startCharaGenerate};
