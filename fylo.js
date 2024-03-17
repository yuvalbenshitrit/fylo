
let fileSize;
let goLeft;
let bar;
document.addEventListener("DOMContentLoaded",()=>{
   fileSize = document.getElementById("file-size");
    goLeft = document.getElementById("go-left");
    bar = document.querySelector(".gradient-bar");
});



let totalDisk = 10;
let usedDisk = 0;


function validation(images,sum){

    if(sum +usedDisk > totalDisk)
    {
        alert("There is not enough space on the disk")
        return false;
    }
    for(let file of images)
    {
        if(!(file.name.toLowerCase().endsWith('.jpg') || file.name.toLowerCase().endsWith('.jpeg')  || file.name.toLowerCase().endsWith('.png')  || file.name.toLowerCase().endsWith('.gif') ))
        {
           alert("File format isn’t supported");
           return false;
        }
        
    }
    return true;
    



}
async function UploadFile() {
    let images = [];
    let files = await showOpenFilePicker(
        {
            multiple : true,
        }
    )
    
    let sumImage=0;
    for(let file of files ){
        let f =await file.getFile();
        sumImage+= f.size;
        images.push(f)


    }
    let flag = validation(images,sumImage/(1024*1024));
    if(flag== false)
    {
        return ;
    }
    usedDisk += sumImage/(1024*1024);
    update();

}

function update(){
    fileSize.innerText = usedDisk.toFixed(2);
    goLeft.innerText =( totalDisk - usedDisk).toFixed(2);
    bar.style.width = `${usedDisk.toFixed(2)*10}%`;

    
}


