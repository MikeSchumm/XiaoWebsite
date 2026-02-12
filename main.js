console.log(window.mojs)
document.addEventListener("DOMContentLoaded", () => {
  const scaleCurve = mojs.easing.path(
    "M0,100 L25,99.9999983 C26.2328835,75.0708847 19.7847843,0 100,0"
  );

  const el = document.querySelector(".button");
  if (!el) {
    console.error("Could not find .button element");
    return;
  }

  const timeline = new mojs.Timeline();

  const tween1 = new mojs.Burst({
    parent: el,
    radius: { 0: 100 },
    angle: { 0: 45 },
    y: -10,
    count: 10,
    children: {
      shape: "circle",
      radius: 30,
      fill: ["red", "white"],
      strokeWidth: 15,
      duration: 500,
    },
  });

  const tween2 = new mojs.Tween({
    duration: 900,
    onUpdate: (progress) => {
      const scaleProgress = scaleCurve(progress);
      el.style.transform = `scale3d(${scaleProgress}, ${scaleProgress}, 1)`;
    },
  });

  const tween3 = new mojs.Burst({
    parent: el,
    radius: { 0: 125 },
    angle: { 0: -45 },
    y: -10,
    count: 10,
    children: {
      shape: "circle",
      radius: 30,
      fill: ["white", "red"],
      strokeWidth: 15,
      duration: 400,
    },
  });

  timeline.add(tween1, tween2, tween3);

  let alreadyClicked = false;

el.addEventListener("click", () => {
  if (alreadyClicked) return;      // prevents double-click weirdness
  alreadyClicked = true;

  timeline.play();
  heart.classList.add("active");

  setTimeout(() => {
    window.location.href = "slideshow.html";
  }, 700); // make this 0–300 for faster/slower
});

//   el.addEventListener("click", () => {
//     if (el.classList.contains("active")) {
//       el.classList.remove("active");
//       setTimeout(() => {
//       window.location.href = "slideshow.html";
//         }, 200);
//     } else {
//       timeline.play();
//       el.classList.add("active");
//     }
//   });
});