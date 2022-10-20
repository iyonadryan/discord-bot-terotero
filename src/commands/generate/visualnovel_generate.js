import pkgJimp from 'jimp';
const { read } = pkgJimp;

import pkgFs from 'fs-extra';
const { readdir, writeFile } = pkgFs;

import { generateVisualNovelDone } from '../../../src/index.js';

// ----- Collection Files ----- //
const avatarPath = `./././img/visual_novel/avatars/`;

// Female
var hairColorFemaleFiles = []; 
const dirPathFemaleHairColor = `${avatarPath}00female/hair/`;
readdir(dirPathFemaleHairColor, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        //console.log(file);
        hairColorFemaleFiles.push(file);
    });
});

var hairBehindFemaleFiles = []; // 00
const dirPathFemaleHairBehind = `${avatarPath}00female/hair/blondie/00hair_behind/`;
readdir(dirPathFemaleHairBehind, (err,file) =>{
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    hairBehindFemaleFiles = file;
});

var blushFemaleFiles = []; // 02
const dirPathFemaleBlush = `${avatarPath}00female/02blush/`;
readdir(dirPathFemaleBlush, (err,file) =>{
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    blushFemaleFiles = file;
});

var costumeFemaleFiles = []; // 03
const dirPathFemaleCostume = `${avatarPath}00female/03costume/`;
readdir(dirPathFemaleCostume, (err,file) =>{
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    costumeFemaleFiles = file;
});

var hairFrontFemaleFiles = []; // 04
const dirPathFemaleHairFront = `${avatarPath}00female/hair/blondie/04hair_front/`;
readdir(dirPathFemaleHairFront, (err,file) =>{
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    hairFrontFemaleFiles = file;
});

var expressionFemaleFiles = []; // 05
const dirPathFemaleExpression = `${avatarPath}00female/05expression/`;
readdir(dirPathFemaleExpression, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    files.forEach(function (file) {
        expressionFemaleFiles.push(file);
    });
});

var accessoriesFemaleFiles = []; // 07
const dirPathFemaleAccessories = `${avatarPath}00female/07accessories/`;
readdir(dirPathFemaleAccessories, (err,file) =>{
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    accessoriesFemaleFiles = file;
});

// ----- !Collection Files ----- //

function startVisualNovelGenerate(avatarName, interaction){
    console.log('START CHARA GENERATE');
    var jimps = [];

    // Get Random Hair Color Category
    const hairColorCategory = getRandomFolderName(hairColorFemaleFiles);
    // Get Hair Behind Female // 00
    const dirPathRandomFemaleHairBehind = `${avatarPath}00female/hair/${hairColorCategory}/00hair_behind/`;
    const hairBehindFemaleAvatar = getRandomFileFromFolder(dirPathRandomFemaleHairBehind, hairBehindFemaleFiles);
    jimps.push(read(hairBehindFemaleAvatar));
    // Get Base Female // 01
    const baseFemaleAvatar = `${avatarPath}00female/01female_base.png`;;
    jimps.push(read(baseFemaleAvatar));
    // Get Blush Female // 02
    const blushFemaleAvatar = getRandomFileFromFolder(dirPathFemaleBlush, blushFemaleFiles);
    jimps.push(read(blushFemaleAvatar));
    // Get Costume Female // 03
    const costumeFemaleAvatar = getRandomFileFromFolder(dirPathFemaleCostume, costumeFemaleFiles);
    jimps.push(read(costumeFemaleAvatar));
    // Get Hair Front Female // 04
    const dirPathRandomFemaleHairFront = `${avatarPath}00female/hair/${hairColorCategory}/04hair_front/`;
    const hairFrontFemaleAvatar = getRandomFileFromFolder(dirPathRandomFemaleHairFront, hairFrontFemaleFiles);
    jimps.push(read(hairFrontFemaleAvatar));
    // Get Expression Female // 05 // 2 datas
    const expressionFemale = getRandomFolderName(expressionFemaleFiles);
    const expressionFemaleAvatarEye = `${dirPathFemaleExpression}${expressionFemale}/${expressionFemale}_eye.png`;
    const expressionFemaleAvatarMouth = `${dirPathFemaleExpression}${expressionFemale}/${expressionFemale}_mouth.png`;
    jimps.push(read(expressionFemaleAvatarEye)); // 05a - Eye // data[5]
    jimps.push(read(expressionFemaleAvatarMouth)); // 05b - Mouth // data[6]
    // Get Nose Female // 06 // data[7]
    const noseFemaleAvatar = `${avatarPath}00female/06female_nose.png`;;
    jimps.push(read(noseFemaleAvatar));
    // Get Accessories Female // 07 // data[8]
    const accessoriesFemaleAvatar = getRandomFileFromFolder(dirPathFemaleAccessories, accessoriesFemaleFiles);
    jimps.push(read(accessoriesFemaleAvatar));

    Promise.all(jimps).then(function(data){
        return Promise.all(jimps);
    }).then(function(data){

        // Hue Color Haird Behind & Front // 00 & 04
        var canChangeColorCategory = ['blondie', 'pink'];
        if(hairColorCategory == 'blondie' || hairColorCategory == 'pink'){
            let randomDegreeHair = Math.floor(Math.random() * 360);
            data[0].color([
                { apply: 'hue', params: [randomDegreeHair] }
            ]);
            data[4].color([
                { apply: 'hue', params: [randomDegreeHair] }
            ]);
        }
        

        // Hue Color Costume // 03
        let randomDegreeCostume = Math.floor(Math.random() * 360);
        data[3].color([
            { apply: 'hue', params: [randomDegreeCostume] }
        ]);

        // Hue Color Expression Eye // 05a // data[5]
        let randomDegreeEye = Math.floor(Math.random() * 360);
        data[5].color([
            { apply: 'hue', params: [randomDegreeEye] }
        ]);

        // Hue Color Accessories // 07 // data[8]
        let randomDegreeAccessories = Math.floor(Math.random() * 360);
        data[8].color([
            { apply: 'hue', params: [randomDegreeAccessories] }
        ]);

        data[0].composite(data[1],0,0);
        data[0].composite(data[2],0,0);
        data[0].composite(data[3],0,0);
        data[0].composite(data[4],0,0);
        data[0].composite(data[5],0,0);
        data[0].composite(data[6],0,0);
        data[0].composite(data[7],0,0);
        data[0].composite(data[8],0,0);

        // Write Image To Local
        data[0].write(`${avatarPath}/generate_result/${avatarName}.png`, function(){
            console.log(`wrote the ${avatarName} image`);
            console.log(`Generate Avatar DONE`);
            const attachmentAvatar = `${avatarPath}/generate_result/${avatarName}.png`;
            generateVisualNovelDone(attachmentAvatar, avatarName, interaction);
        });
    }); 
}

function getRandomFolderName(files){
    let maxCount = files.length;
    let randomIndex = Math.floor(Math.random() * maxCount);
    const result = files[randomIndex].toString();
    return result;
}

function getRandomFileFromFolder(dirPath,files){
    let maxCount = files.length;
    let randomIndex = Math.floor(Math.random() * maxCount);
    const result = files[randomIndex].toString();
    return `${dirPath}${result}`;
}

export {startVisualNovelGenerate};