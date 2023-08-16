let controller;
let slideScene;

function animateSlides() {
  //Init controller
  controller = new ScrollMagic.Controller();

  //Selecting stuff
  const sliders = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");

  //Loop over each slide
  sliders.forEach((slide) => {
    const revealImg = slide.querySelector(".reveal-img");
    const img = slide.querySelector("img");
    const revealText = slide.querySelector(".reveal-text");

    /********** GSAP *********/
    //Testing
    //gsap.to(revealImg, 1, { x: "100%" });
    //gsap.to(img, 1, { scale: 5 });

    // Adding a timeline
    const slideTimeline = gsap.timeline({
      default: { duration: 1, ease: "power2.inOut" },
    });
    slideTimeline.fromTo(revealImg, { x: "0%" }, { x: "100%" });
    slideTimeline.fromTo(img, { scale: 2 }, { scale: 1 }, "-=0.2");
    slideTimeline.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=0.5");
    slideTimeline.fromTo(nav, { y: "-100%" }, { y: "0%" }, "-=0.5");

    /********** GSAP *********/
  });
}

animateSlides();
