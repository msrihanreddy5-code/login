const knob = document.getElementById("knob");
const cord = document.getElementById("cord");
const loginBox = document.getElementById("loginBox");
const hint = document.getElementById("hint");

let startY = 0;
let pulling = false;
let lampOn = false;

function startPull(e) {
    pulling = true;
    startY = e.touches ? e.touches[0].clientY : e.clientY;
}

function pull(e) {
    if (!pulling) return;

    const y = e.touches ? e.touches[0].clientY : e.clientY;
    const distance = Math.min(Math.max(y - startY, 0), 50);

    cord.style.height = 60 + distance + "px";
    knob.style.transform = `translateY(${distance}px)`;

    if (distance > 35) toggleLamp();
}

function stopPull() {
    cord.style.height = "60px";
    knob.style.transform = "translateY(0)";
    pulling = false;
}

function toggleLamp() {
    pulling = false;
    lampOn = !lampOn;

    document.body.classList.toggle("on", lampOn);
    hint.textContent = lampOn ? "Welcome ✨" : "Pull the cord 💡";

    if (lampOn) {
        loginBox.style.display = "block";
        setTimeout(() => loginBox.querySelector("input").focus(), 800);
    } else {
        loginBox.style.display = "none";
    }
}

knob.addEventListener("mousedown", startPull);
document.addEventListener("mousemove", pull);
document.addEventListener("mouseup", stopPull);

knob.addEventListener("touchstart", startPull);
document.addEventListener("touchmove", pull);
document.addEventListener("touchend", stopPull);
