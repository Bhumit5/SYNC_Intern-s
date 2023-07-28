let prev = document.getElementById('p-btn');
let play = document.getElementById('pl-btn');
let next = document.getElementById('n-btn');
let title = document.getElementById('title');
let artist = document.getElementById('artist');
let recent_volume = document.getElementById('volume');
let volume = document.getElementById('show_volume');
let auto = document.getElementById('auto');
let slider = document.getElementById('progress');
let volume_icon = document.getElementById('volume_icon');

let bg_img = document.getElementById("music-player");
let track_img = document.getElementById("image");

let timer;
let autoplay = 0;
let index = 0;

//~ Create audio element
let track = document.createElement('audio');

//~ All songs 
let songs = [
    {
        name: 'Vishweshwaraya Mahadevaya',
        path:'/music/mahadevay.mp3',
        artist: 'Sajan Rajan Mishra',
        img: '/image/mahadevay.jpg'
    },
    {
        name: 'Shiv Tandav Stotram',
        path:'/music/Shiv Tandav Stotram.mp3',
        artist: 'Shankar Mahadevan',
        img: '/image/tandav.jpg'
    },
    {
        name: 'Ashutosh Shashamk Shekhar',
        path:'/music/Ashutosh Shashamk Shekhar.mp3',
        artist: 'Sonu Nigam',
        img: '/image/aashutosh.jpg'
    },
    {
        name: 'Jai Shree Mahakal',
        path:'/music/Jai Shree Mahakal.mp3',
        artist: 'Arijit Singh, Sonu Nigam, Shaan, Shankar Mahadevan,Kailash Khair',
        img: '/image/jai_mahakal.jpg'
    },
    {
        name: 'Hanuman Chalisa',
        path:'/music/Hanuman Chalisa.mp3',
        artist: 'Gulshan Kumar',
        img: '/image/hanuman.jpg'
    },
    {
        name: 'Hey Shivay',
        path:'/music/Hey-Shivay.mp3',
        artist: 'Anjali',
        img: '/image/shivay.jpg'
    },
    {
        name: 'Mahakal',
        path:'/music/Mahakal.mp3',
        artist: 'Kinjal Dave',
        img: '/image/mahakal.jpg'
    },
    {
        name: 'Mere Baba',
        path:'/music/Mere Baba.mp3',
        artist: 'Jubin Nautiyal',
        img: '/image/baba.jpg'
    },
    {
        name: 'Pahadon Ke Raja',
        path:'/music/Pahadon_Ke_Raja.mp3',
        artist: 'A-Jay M',
        img: '/image/pahadon.jpg'
    },
    {
        name: 'Damru Tere Naam Ka',
        path:'/music/Damru-Tere-Naam-Ka.mp3',
        artist: 'Anjali',
        img: '/image/damru.jpg'
    }
]

function loadTrack(index){
    range_slider();
    track.src = songs[index].path;
    track_img.src = songs[index].img;
    title.innerHTML = songs[index].name;
    artist.innerHTML = songs[index].artist;
    bg_img.style.background = `linear-gradient(to bottom, rgba(25, 24, 24, 0.850),rgba(25, 24, 24, 0.850)),
    url('${songs[index].img}') center center/cover`;
    track.load();
    timer = setInterval(range_slider,1000);
}
loadTrack(index);

//~ Play/Pause song 
let isPlaying = false;
play.addEventListener('click', () =>{
    !isPlaying?playsong():pausesong();
})

function playsong(){
    track.play();
    isPlaying = true;
    play.innerHTML = '<i class="fa fa-pause"></i>'    
}

function pausesong(){
    track.pause();
    isPlaying = false;
    play.innerHTML = '<i class="fa fa-play"></i>'

}

//~ Next song
next.addEventListener('click', ()=>{
    index < songs.length - 1?index += 1:index = 0;
    loadTrack(index);
    playsong();
})

//~ Previous song
prev.addEventListener('click', ()=>{
    index > 0 ?index -= 1:index = songs.length-1;
    loadTrack(index);
    playsong();
})

//~ Set volume 
function set_volume(){
    volume.innerHTML = recent_volume.value;
    track.volume = recent_volume.value/100;
}

let mute = false;
let prev_sound;
function mute_sound(){
    if(!mute){
        mute = true;
        track.volume = 0;
        volume.innerHTML = '0';
        volume_icon.classList.remove('fa-volume-up');
        volume_icon.classList.add('fa-volume-off');
        prev_sound = track.volume;
    }else{
        mute = false;
        track.volume = prev_sound;
        volume.innerHTML = prev_sound*100;
        volume_icon.classList.remove('fa-volume-off');
        volume_icon.classList.add('fa-volume-up');
    }
}

//~ Change duration of song 
function change_duration(){
    slider_position = track.duration * (slider.value / 100);
    track.currentTime = slider_position;
}

//~ Auto play the song
function auto_play(){
    if(autoplay == 0)
    {
        autoplay = 1; 
        auto.style.backgroundColor = 'var(--l-color)';
    }
    else{
        autoplay = 0;
        auto.style.backgroundColor = '#db9650';
    }
}

function range_slider(){
    let position = 0;

    if(!isNaN(track.duration)){
        position = track.currentTime * (100/track.duration);
        slider.value = position;
    }

    if(track.ended){
        play.innerHTML = '<i class="fa fa-play"></i>';
        if(autoplay){
            index += 1;
            loadTrack(index);
            playsong();
        }
    }
}