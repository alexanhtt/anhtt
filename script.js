const btn = document.querySelector(".btn");
const msg = document.querySelector(".message");
const cayText = document.getElementById("cay-text");
const audio = document.getElementById("troll-audio");

let clicked = false;
let trollMode = false;
let hoverTimer = null;
let trollStarted = false;

// Nếu click kịp thì hiện message
btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (trollMode) return; // đã troll thì ko cho click nữa

    clicked = true;
    msg.style.display = "block";
    btn.style.display = "none";
});

// Khi hover vào nút
btn.addEventListener("mouseenter", () => {
    if (trollMode) {
        startTroll();
        return;
    }

    hoverTimer = setTimeout(() => {
        if (!clicked) {
            trollMode = true;
            startTroll();
        }
    }, 500); // 0.1s chờ
});

// Reset nếu rời khỏi trước khi hết 1s
btn.addEventListener("mouseleave", () => {
    clearTimeout(hoverTimer);
});

// Hàm troll
function startTroll() {
    if (trollStarted) return; // chỉ chạy 1 lần
    trollStarted = true;

    // nút di chuyển lung tung khi hover
    btn.addEventListener("mousemove", () => {
        const maxX = window.innerWidth - btn.offsetWidth;
        const maxY = window.innerHeight - btn.offsetHeight;
        const x = Math.random() * maxX;
        const y = Math.random() * maxY;
        btn.style.position = "absolute";
        btn.style.left = x + "px";
        btn.style.top = y + "px";
    });

    // Sau 3 giây mới hiện chữ + nhạc
    setTimeout(() => {
        cayText.style.display = "block";
        audio.play();
    }, 3000);
}

window.onload = function () {
    const popup = document.getElementById("popup");
    const closeBtn = document.getElementById("closePopup");
    popup.style.display = "flex";
    closeBtn.addEventListener("click", () => {
        popup.style.display = "none";
    });
};

function typeText(id, text, speed = 50) {
    const element = document.getElementById(id);
    if (!element) return;

    element.textContent = ""; // Xóa nội dung ban đầu
    let index = 0;

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Khi người dùng nhấn nút OK trong popup
document.getElementById("closePopup").addEventListener("click", () => {
    document.getElementById("popup").style.display = "none";
    typeText("type-me", "mình là Anhtt - web coding newbie :))", 50);
});
