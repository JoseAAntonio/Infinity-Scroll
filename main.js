/* --------------------------- targeting elements --------------------------- */
const imageContainer = document.getElementById("img-container");
const loader = document.getElementById("loader");

/* --------------------- Global variables and constants --------------------- */
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let count = 5;
const apiKey = "tXXsjeqenXNotActualKeyY1rHH4Ay-s";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

/* ---------------------- Get photos from unsplash API ---------------------- */
const getPhotos = async () => {
	try {
		const response = await fetch(apiUrl);
		photosArray = await response.json();
		displayPhotos();
	} catch (error) {
		console.log("error", error);
	}
};

/* ---------------------- check if all imgs were loaded --------------------- */
const imgLoaded = () => {
	imagesLoaded++;
	if (imagesLoaded === totalImages) {
		ready = true;
		loader.hidden = true;
		//for performance...start loadind 10 and then 30
		count = 20;
	}
};

/* ----------------- Helper functions for setting attributes ---------------- */
const setAttributes = (element, attributes) => {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
};

/* --------------- create Elmnts for lnks and phts, add to DOM -------------- */
const displayPhotos = () => {
	imagesLoaded = 0;
	totalImages = photosArray.length;
	photosArray.forEach((photo) => {
		const item = document.createElement("a");
		setAttributes(item, {
			href: photo.links.html,
			target: "_blank",
		});

		const img = document.createElement("img");
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description,
		});
		//Evnt lstnr, check when each img is finishd loading
		img.addEventListener("load", imgLoaded);
		//img inside <a>
		item.appendChild(img);
		imageContainer.appendChild(item);
	});
};

/* ------------- Checking scroll near bootom...load more photos ------------- */
window.addEventListener("scroll", () => {
	if (
		window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
		ready
	) {
		ready = false;
		getPhotos();
	}
});

getPhotos();
