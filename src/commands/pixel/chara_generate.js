//import { read } from 'jimp';
//var jimp = require('jimp');

import pkgJimp from 'jimp';
const { read } = pkgJimp;

var testImages = [
    "./././img/pixel/avatars/1_female/00skin/Female001-01.png",
    "./././img/pixel/avatars/1_female/01costume/Åù_òP003_âüâCâh.png",
    "./././img/pixel/avatars/1_female/02eye/Åù_û+001.png",
    "./././img/pixel/avatars/1_female/03hair/Åù_ö»009-02.png",
];

var jimps = []

for (var i = 0; i < testImages.length; i++){
    jimps.push(read(testImages[i]));
}

const testCharaGenerate = (name) => {
    return `Hi ${name}`;
}

async function startCharaGenerate(avatarName){
    console.log(testCharaGenerate('TEST CHARA GENERATE'));

    Promise.all(jimps).then(function(data){
        return Promise.all(jimps);
    }).then(function(data){
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
