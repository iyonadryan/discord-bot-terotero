import pkgFs from 'fs-extra';
const { writeFile , readFileSync, unlinkSync} = pkgFs;

import pkgGifencoder from 'gif-encoder-2';
const GIFEncoder = pkgGifencoder;

import pkgCanvas from 'canvas';
const {Canvas, Image} = pkgCanvas; 

import { generatePixelDone } from '../../index.js';


function generateGifPixel(dirPath, avatarName, interaction){
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

export {generateGifPixel};