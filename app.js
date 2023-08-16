let controller;
let slideScene;
let pageScene;

function animateSlides() {
  //Init controller
  controller = new ScrollMagic.Controller();

  //Selecting stuff
  const sliders = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");

  //Loop over each slide
  sliders.forEach((slide, index, slides) => {
    const revealImg = slide.querySelector(".reveal-img");
    const img = slide.querySelector("img");
    const revealText = slide.querySelector(".reveal-text");

    /********** GSAP *********/
    //Testing
    //gsap.to(revealImg, 1, { x: "100%" });
    //gsap.to(img, 1, { scale: 5 });

    // Adding a timeline for animating the slides img, text and nav
    const slideTimeline = gsap.timeline({
      default: { duration: 1, ease: "power2.inOut" },
    });
    slideTimeline.fromTo(revealImg, { x: "0%" }, { x: "100%" });
    slideTimeline.fromTo(img, { scale: 2 }, { scale: 1 }, "-=0.2");
    slideTimeline.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=0.5");
    slideTimeline.fromTo(nav, { y: "-100%" }, { y: "0%" }, "-=0.5");
    /********** GSAP *********/

    /********** SROLL MAGIC *********/
    //Creating a scene
    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.25,
      reverse: false,
    })
      .setTween(slideTimeline)
      .addIndicators({
        colorStart: "white",
        colorTrigger: "red",
        name: "slide",
      })
      .addTo(controller);
    /********** SROLL MAGIC *********/

    /**********GSAP and SROLL MAGIC workflow *********/
    // Timeline for the page animation (GSAP)
    const pageTimeline = gsap.timeline({});
    let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    pageTimeline.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
    pageTimeline.fromTo(
      slide,
      { opacity: 1, scale: 1 },
      { opacity: 0, scale: 0.5 }
    );
    pageTimeline.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, "-=0.5");

    //Scene for the page animation (SCROLL MAGIC)
    pageScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%",
      triggerHook: 0,
    })
      .addIndicators({
        colorStart: "white",
        colorTrigger: "red",
        name: "page",
        indent: 200,
      })
      .setPin(slide, { pushFollowers: false })
      .setTween(pageTimeline)
      .addTo(controller);

    /**********GSAP and SROLL MAGIC workflow *********/
  });
}

animateSlides();
