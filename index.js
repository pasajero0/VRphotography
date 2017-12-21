import $ from 'jquery';
import tumblr from 'tumblr.js';


const client = tumblr.createClient({
    consumer_key: 'kVT2VuJt225CBW8wVs7uKg0Qv044wYdpJl5pVXnohQbjgpUeDu',
    consumer_secret: 'yVE6gEZLPz6MYRJdW3ayyk2WaTv7NJ6qpPy2aal42pfHoaHx5E',
    token: 'Q96oXJGbA3W9Svdr0aOE5PPJFZtRqN7tGJMuestywCcH0wL2rO',
    token_secret: 'xLtVp4krrF3outAxuj04rQP8sudIiYFyxk9KbU7wpWUM3ittSq',
});

client.blogPosts('valen-romanovskaya.tumblr.com', {type: 'photo', tag: TagName, limit: 50}, (err, data)=> {
    data.posts.forEach(function(posts) {
        posts.photos.forEach(function(photo) {
            const mediumPhoto = photo.alt_sizes[4];
            const largePhoto = photo.original_size;
            const div = document.createElement('div');
            if (mediumPhoto.height > mediumPhoto.width) {
                $(div).addClass('item2');
            } else {
                $(div).addClass('item');
            }
            $( div ).append('<img src="'+mediumPhoto.url+'" rel="'+largePhoto.url+'"> ');
            $('#photoalbum').append(div);
        });
    });
});

let elem = null;
let elemClass = null;

let ww = $(window).width();
let wh = $(window).height();

const getRel = () => {
    const thisLargePhoto = $(elem).children().attr('rel');
    $('div.GalleryPhotoSlider').empty();
    $('.GalleryPhotoSlider').append('<div class="GalleryPhotoSlide"><img src="'+thisLargePhoto+'"></div>');
    if (ww > wh){
        if(elemClass == 'item'){
            $('.GalleryPhotoSlide>img').css('max-width','80vw');
            console.log('if item');
        }else if(elemClass == 'item2'){
            $('.GalleryPhotoSlide>img').css('max-height','90vh');
            console.log('if item2');
        }
    } else if (ww < wh){
        if(elemClass == 'item'){
            $('.GalleryPhotoSlide>img').css('max-height','50vh');
            $('.GalleryPhotoSlide>img').css('max-width','80vw');
        }else if(elemClass == 'item2'){
            $('.GalleryPhotoSlide>img').css('max-height','70vh');
            $('.GalleryPhotoSlide>img').css('max-width','70vw');
        }
    };  
};
const chevronDisplay = () => {
    const next = $(elem).next().children().attr('rel');
    const prev = $(elem).prev().children().attr('rel');
    if (prev == undefined) {
        $('.backward>i').css('display', 'none');
    } else {
        $('.backward>i').css('display', 'block');   
    };
    if (next == undefined) {
        $('.forward>i').css('display', 'none');
    } else {
        $('.forward>i').css('display', 'block');   
    };
};

$('#photoalbum').on('click', 'div', (event) => {
    $('#overlay').css('display', 'block');
    $('body').css('overflow', 'hidden');
    elem = event.currentTarget;
    elemClass = event.currentTarget.className;
    chevronDisplay();
    getRel();

    $('.backward').on('click', 'i', () => {
        elem = $(elem).prev();
        elemClass = elem[0].className;
        chevronDisplay();
        getRel();
    });
    $('.forward').on('click', 'i', () => {
        elem = $(elem).next();
        elemClass = elem[0].className;
        chevronDisplay();
        getRel();
    });

    document.onkeyup = function (event) {
        const next = $(elem).next().children().attr('rel');
        const prev = $(elem).prev().children().attr('rel');
        if(event.keyCode == 37){
            if (prev == undefined) {
                chevronDisplay();
            } else {  
                elem = $(elem).prev();
                elemClass = elem[0].className;
                chevronDisplay();
                getRel();
            };
        } else if(event.keyCode == 39){
            if (next == undefined) {
                chevronDisplay();
            } else { 
                elem = $(elem).next();
                elemClass = elem[0].className;
                chevronDisplay();
                getRel();
            };
        } else if(event.keyCode == 27){
            $('#overlay').css('display', 'none');
            $('body').css('overflow', 'auto');
            $('div.GalleryPhotoSlide').empty();
        };
    };
});

$('.close-btn').on('click', () => {
    $('#overlay').css('display', 'none');
    $('body').css('overflow', 'auto');
    $('div.GalleryPhotoSlide').empty();
});

// npm run build:prod