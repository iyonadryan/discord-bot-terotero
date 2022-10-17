const charaGenerate = (name) => {
    return `Hi ${name}`;
}

function testCharaGenerate(){
    console.log(charaGenerate('TEST CHARA GENERATE'));
}

export {charaGenerate , testCharaGenerate};
