const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let ImageLoadedCount = 5;
const apiAccessKey = 'n6Gbcl72qar2naSTsmqwXqJDvxPyyHNYywPIOFu7KiQ'
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiAccessKey}&count=${ImageLoadedCount}`;

// Check if all images were loaded
const imageLoaded = () => {
    imagesLoaded++;

    if (imagesLoaded === totalImages) {
        ready = true;
        loader.style.visibility = 'hidden';
        ImageLoadedCount = 30
    }

}

// Helper function to set attrinbutes in DOM elements
const setAttributes = (element, attributes) => { //attributes will be an object
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Create Elements for links and photos, add to DOM
const displayPhotos = () => {
    imagesLoaded = 0
    console.log(ImageLoadedCount)

    totalImages = photosArray.length;

    // Run function for each photo in photoArray
    photosArray.forEach((photo) => {

        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })

        const img = document.createElement('img')
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })

        // Event listener, check when each image is finishied loading
        img.addEventListener('load', imageLoaded);

        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

// Get photos from unsplash api
async function getPhotos() {
    try {
        const response = await fetch(apiUrl)
        photosArray = await response.json()
        displayPhotos()
    } catch (error) {

    }
}

// Check if scrollbar is near bottom, laod more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false
        getPhotos();
    }
})

// On load
getPhotos()