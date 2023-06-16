console.log("welcome to music-app");

//Initialize the Variables
let songIndex=0;
let audioElement =new Audio('song/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myprogressBar =  document.getElementById('myprogressBar');
let gif =  document.getElementById('gif');
let masterSongName =  document.getElementById('masterSongName');
let songsItems= Array.from(document.getElementsByClassName('songsItems'));
let song=[
    {songName:"Chand sifarish", filePath: "song/1.mp3", coverPath:"cover/1cover.jpeg"},
    {songName:"Main Agar Kahoon", filePath: "song/2.mp3", coverPath:"cover/2cover.jpeg"},
    {songName:"Pehli Nazar Mein", filePath: "song/3.mp3", coverPath:"cover/3cover.jpeg"},
    {songName:"Tera Chehra", filePath: "song/4.mp3", coverPath:"cover/4cover.jpeg"},
    {songName:"Jiya Dhadak Dhadak jaye", filePath: "song/5.mp3", coverPath:"cover/5cover.jpeg"},
    {songName:"kalank", filePath: "song/6.mp3", coverPath:"cover/6cover.jpeg"},
    {songName:"Hothon-se-chulo-tum", filePath: "song/7.mp3", coverPath:"cover/7cover.jpeg"},
] 

songsItems.forEach((element,i)=>{
    element.getElementsByTagName('img')[0].src=song[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText=song[i].songName;

}) 

//audioElement.play();

//handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;

    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;

    }
})

//Listen to Events
audioElement.addEventListener('timeupdate',()=>{
   
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    
    myprogressBar.value=progress;
})

myprogressBar.addEventListener('change',()=>{
    audioElement.currentTime = myprogressBar.value*audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click' ,(e)=>{
    //  console.log(e.target);
      makeAllPlays();
      songIndex=parseInt(e.target.id);
      e.target.classList.remove('fa-circle-play');
      e.target.classList.add('fa-circle-pause');
      audioElement.src=`song/${songIndex+1}.mp3`;
      masterSongName.innerText=song[songIndex].songName;
      audioElement.currentTime = 0;
      audioElement.play();
      gif.style.opacity=1;
      masterPlay.classList.remove('fa-circle-play');
      masterPlay.classList.add('fa-circle-pause');
    })
}) 

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=6){
        songIndex=0
    }
    else{
        songIndex+=1;
    }
      audioElement.src=`song/${songIndex+1}.mp3`;
      masterSongName.innerText=song[songIndex].songName;
      audioElement.currentTime = 0;
      audioElement.play();
      masterPlay.classList.remove('fa-circle-play');
      masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex=0
    }
    else{
        songIndex-=1;
    }
      audioElement.src=`song/${songIndex+1}.mp3`;
      masterSongName.innerText=song[songIndex].songName;
      audioElement.currentTime = 0;
      audioElement.play();
      masterPlay.classList.remove('fa-circle-play');
      masterPlay.classList.add('fa-circle-pause');
})