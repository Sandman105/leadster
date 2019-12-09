function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}    

docReady(function() {
    // DOM is loaded and ready for manipulation here

document.querySelector('.stripe-div').classList.add('expand-horizontally');

document.querySelector('#parent-form-toggle').addEventListener('click', function(e) {
    document.querySelector('.sidebar').classList.toggle('hidden');
});

/*Location of the image---------------------------------------------*/
const urlHead = "../../img/background/";
const imgType = ".jpg";
/*Location of the image---------------------------------------------*/

var index = 0;
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
  
}

const random_images_array = ["img-0", "img-1", "img-2", "img-3", "img-4", "img-5", "img-6", "img-7", "img-8", "img-9", "img-10", "img-11", "img-12", "img-13", "img-14", "img-15", "img-16"];

function choosePic() {
  const allhorizontalClasses = document.getElementsByClassName("horizontal");
    for (let i = 0, len = allhorizontalClasses.length | 0; i < len; i = i + 1 | 0) {
          
      index = (index < Math.floor(Math.random() * shuffle(random_images_array).length) - 1)? index + 1 : 0; 

      allhorizontalClasses[i].style.background = "url(" + urlHead + `${(random_images_array[index])}`+ imgType + ")";
        };
}

choosePic();



const requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;


const FRAME_DURATION = 5000 / 60; // 60fps frame duration ~16.66ms
// If available we are using native "performance" API instead of "Date"
// Read more about it on MDN:
// https://developer.mozilla.org/en-US/docs/Web/API/Performance
const getTime = typeof performance === "function" ? performance.now : Date.now;

const $v01 = document.querySelector(".vertical0"),
        $v02 = document.querySelector(".vertical1"),
        $v03 = document.querySelector(".vertical2"),
        $v04 = document.querySelector(".vertical3"),
        $v05 = document.querySelector(".vertical4"),
        $v06 = document.querySelector(".vertical5"),
        $v07 = document.querySelector(".vertical6"),
        $v08 = document.querySelector(".vertical7"),
        $v09 = document.querySelector(".vertical8"),
        $v10 = document.querySelector(".vertical9");
 



// Initial position
let position = 0;
// Initial time
let lastUpdate = getTime();
 
function animate() {
  const now = getTime();
  // This is the main part
  // We are checking how much time has passed since the last update
  // and translating that to frames
  const delta = (now - lastUpdate) / FRAME_DURATION;

  // Updating scene logic
  // We want to move the box 1px per each 16.66ms (60fps)
  // so we are multipling 1px with the number of frames passed
  position += 1 * delta;

  // Render updated scene
  $v01.style.transform = `translateY(${ (position * 0.75) }px)`;
  $v02.style.transform = `translateY(${ (position * 0.95) }px)`;
  $v03.style.transform = `translateY(${ (position * 0.75) }px)`;
  $v04.style.transform = `translateY(${ (position * 0.85) }px)`;
  $v05.style.transform = `translateY(${ (position * 0.65) }px)`;
  $v06.style.transform = `translateY(${ (position * 0.70) }px)`;
  $v07.style.transform = `translateY(${ (position * 0.95) }px)`;
  $v08.style.transform = `translateY(${ (position * 0.55) }px)`;
  $v09.style.transform = `translateY(${ (position * 0.85) }px)`;
  $v10.style.transform = `translateY(${ (position * 0.70) }px)`;
  
  //box.style.transition = `all ${ seconds }s ease`;
  // Update last updated time
  lastUpdate = now;

  // Fake 10fps using "setTimeout"
  setTimeout(animate, 100);

}
requestAnimationFrame(animate);


});