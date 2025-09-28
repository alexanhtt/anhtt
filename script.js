// ================== Nút troll ====================
const btn = document.querySelector(".btn");
const msg = document.querySelector(".message");
const cayText = document.getElementById("cay-text");
const trollAudio = document.getElementById("troll-audio");

let clicked = false;
let trollMode = false;
let hoverTimer = null;
let trollStarted = false;

// Nếu click kịp thì hiện message
btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (trollMode) return;
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
  }, 500);
});

// Reset nếu rời khỏi trước khi hết 0.5s
btn.addEventListener("mouseleave", () => {
  clearTimeout(hoverTimer);
});

// Hàm troll
function startTroll() {
  if (trollStarted) return;
  trollStarted = true;

  btn.addEventListener("mousemove", () => {
    const maxX = window.innerWidth - btn.offsetWidth;
    const maxY = window.innerHeight - btn.offsetHeight;
    btn.style.position = "absolute";
    btn.style.left = Math.random() * maxX + "px";
    btn.style.top = Math.random() * maxY + "px";
  });

  setTimeout(() => {
    cayText.style.display = "block";
    trollAudio.play();
  }, 3000);
}

// ================== Popup giới thiệu ====================
window.onload = function () {
  const popup = document.getElementById("popup");
  const closeBtn = document.getElementById("closePopup");
  popup.style.display = "flex";
  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
    typeText("type-me", "mình là Anhtt - web coding newbie :))", 50);
  });
};

function typeText(id, text, speed = 50) {
  const element = document.getElementById(id);
  if (!element) return;
  element.textContent = "";
  let index = 0;
  (function type() {
    if (index < text.length) {
      element.textContent += text.charAt(index++);
      setTimeout(type, speed);
    }
  })();
}

// ================== Music Player ====================
const music = document.getElementById("music");
const playBtn = document.querySelector(".play-btn");
const progress = document.querySelector(".progress");
const icon = playBtn.querySelector(".icon");

playBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    icon.textContent = "⏸";
  } else {
    music.pause();
    icon.textContent = "▶";
  }
});

music.addEventListener("timeupdate", () => {
  if (music.duration) {
    progress.value = (music.currentTime / music.duration) * 100;
  }
});

progress.addEventListener("input", () => {
  if (music.duration) {
    music.currentTime = (progress.value / 100) * music.duration;
  }
});

// ================== Hiệu ứng nền ====================
VANTA.BIRDS({
  el: "body",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.0,
  minWidth: 200.0,
  scale: 1.0,
  scaleMobile: 1.0
});

// Reset chữ chạy khi load
window.addEventListener("DOMContentLoaded", () => {
  const span = document.querySelector(".song-overlay span");
  resetMarqueeAnimation(span);
});

// ================== Playlist ====================
const moreBtn = document.querySelector(".more-btn");
const playlistEl = document.querySelector(".playlist");
const songTitleEl = document.querySelector(".song-overlay span");

// Danh sách tất cả bài hát
const allSongs = [
  "Chẳng Còn Thời Gian Ấy ~ Bem ft. Nguyen, ImPoe.mp3",
  "Chúng Ta Của Hiện Tại ~ Sơn Tùng M-TP.mp3",
  "Chúng Ta Của Tương Lai ~ Sơn Tùng M-TP.mp3",
  "Vùng Ký Ức ~ Chillies.mp3",
  "Có Em ~ Madihu (Feat. Low G).mp3",
  "Vì Anh Đâu Có Biết ~ Madihu (Feat. Vũ.).mp3",
  "Bình Yên ~ Vũ. ft. Binz.mp3",
  "Những Lời Hứa Bỏ Quên ~ Vũ. x Dear Jane.mp3",
  "Kho Báu ~ (S)TRONG Trọng Hiếu x Rhymastic.mp3",
  "Thằng Điên ~ Justatee x Phương Ly.mp3",
  "Mãi Mãi Không Phải Anh ~ Thanh Bình.mp3",
  "Bao Tiền Một Mớ Bình Yên ~ 14 Casper & Bon Nghiêm.mp3",
  "Một Đời ~ 14 Casper & Bon Nghiêm (feat. buitruonglinh).mp3",
  "Ánh Sao Và Bầu Trời ~ T.R.I x Cá.mp3",
  "Vết Thương ~ Fishy.mp3",
  "Trước Khi Em Tồn Tại (Piano Version) ~ Thắng｜Việt Anh Cover.mp3",
  "để tôi ôm em bằng giai điệu này ~ KAI ĐINH x MIN x GREY D.mp3",
  "Phép Màu (Đàn Cá Gỗ OST) ~ Mounter x MAYDAYs, Minh Tốc.mp3",
  "Đường Tôi Chở Em Về ~ buitruonglinh.mp3",
  "Dù Cho Mai Về Sau (Official Music Video) ~ buitruonglinh.mp3",
  "Chăm Hoa ~ MONO.mp3",
  "Bầu Trời Mới ~ Da LAB  ft. Minh Tốc & Lam.mp3",
  "Dancing In The Dark ~ SOOBIN.mp3",
  "Xe Đạp ~ Thùy Chi ft. M4U.mp3",
  "Em Còn Nhớ Anh Không ~ Hoàng Tôn (Feat. Koo).mp3",
  "W⧸n - id 072019 ｜ 3107 ft 267.mp3",
  "NẮNG LUNG LINH - NGUYỄN THƯƠNG (OFFICIAL MUSIC VIDEO).mp3",
  "có hẹn với thanh xuân - MONSTAR ｜ official music video.mp3",
  "KARIK - BẠN ĐỜI (FT. GDUCKY) ｜ OFFICIAL MUSIC VIDEO.mp3",
  "Gác lại âu lo - Da LAB ft. Miu Lê (Official MV).mp3",
  "HẠ CÒN VƯƠNG NẮNG ｜ DATKAA x KIDO x Prod. QT BEATZ [OFFICIAL MUSIC VIDEO].mp3",
  "Có Chàng Trai Viết Lên Cây - Phan Mạnh Quỳnh ｜ MẮT BIẾC OST.mp3",
  "tlinh - nếu lúc đó (ft. 2pillz) ｜ OFFICIAL MUSIC VIDEO.mp3",
  "W⧸n - Text 07 (ft. 267).mp3",
  "W⧸n  -  a b c d x y z n m a s a d (song 24) ｜ 3107.mp3",
];

// Tao thích
const favoriteSongs = [
  "Chẳng Còn Thời Gian Ấy ~ Bem ft. Nguyen, ImPoe.mp3",
  "Ánh Sao Và Bầu Trời ~ T.R.I x Cá.mp3",
  "Trước Khi Em Tồn Tại (Piano Version) ~ Thắng｜Việt Anh Cover.mp3",
  "Đường Tôi Chở Em Về ~ buitruonglinh.mp3",
  "Bình Yên ~ Vũ. ft. Binz.mp3",
  "Mãi Mãi Không Phải Anh ~ Thanh Bình.mp3",
];

let currentTab = "all"; // 'all' hoặc 'favorites'

// ----- UI -----
const tabsContainer = document.createElement("div");
tabsContainer.classList.add("playlist-tabs");

const allTabBtn = document.createElement("button");
allTabBtn.textContent = "Lít";
allTabBtn.classList.add("tab-btn", "active");

const favTabBtn = document.createElement("button");
favTabBtn.textContent = "Bài hát ad thích";
favTabBtn.classList.add("tab-btn");

tabsContainer.appendChild(allTabBtn);
tabsContainer.appendChild(favTabBtn);
playlistEl.appendChild(tabsContainer);

// Search
const searchInput = document.createElement("input");
searchInput.type = "text";
searchInput.placeholder = "Tìm bài hát... (đừng viết tắt🙂)";
searchInput.classList.add("playlist-search");
playlistEl.appendChild(searchInput);

// Container list
const playlistItemsContainer = document.createElement("div");
playlistEl.appendChild(playlistItemsContainer);

// ----- Logic -----
function removeVietnameseTones(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

function createPlaylistItem(filename) {
  const item = document.createElement("div");
  item.classList.add("playlist-item");
  item.textContent = filename.replace(/\.mp3$/, "");
  item.addEventListener("click", () => {
    const filePath = `saved_musics/${filename}`;
    music.src = filePath;
    music.play();
    icon.textContent = "⏸";
    songTitleEl.textContent = item.textContent;
    resetMarqueeAnimation(songTitleEl);
    playlistEl.classList.remove("show");
  });
  return item;
}

function renderPlaylistItems(filter = "") {
  playlistItemsContainer.innerHTML = "";
  const activeList = currentTab === "all" ? allSongs : favoriteSongs;
  const normalizedFilter = removeVietnameseTones(filter);

  const filtered = activeList.filter(filename =>
    removeVietnameseTones(filename).includes(normalizedFilter)
  );

  if (filtered.length === 0) {
    const noResult = document.createElement("div");
    noResult.classList.add("playlist-empty");
    noResult.textContent = "ĐÉO CÓ!";
    playlistItemsContainer.appendChild(noResult);
  } else {
    filtered.forEach(filename => {
      playlistItemsContainer.appendChild(createPlaylistItem(filename));
    });
  }
}

// Tab chuyển
allTabBtn.addEventListener("click", () => {
  currentTab = "all";
  allTabBtn.classList.add("active");
  favTabBtn.classList.remove("active");
  renderPlaylistItems(searchInput.value);
});

favTabBtn.addEventListener("click", () => {
  currentTab = "favorites";
  favTabBtn.classList.add("active");
  allTabBtn.classList.remove("active");
  renderPlaylistItems(searchInput.value);
});

// Search
searchInput.addEventListener("input", (e) => {
  renderPlaylistItems(e.target.value);
});

// Toggle playlist popup
moreBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  playlistEl.classList.toggle("show");
  if (playlistEl.classList.contains("show")) searchInput.focus();
});

// Ẩn khi click ra ngoài
document.addEventListener("click", (e) => {
  if (!playlistEl.contains(e.target) && !moreBtn.contains(e.target)) {
    playlistEl.classList.remove("show");
  }
});

// Khởi tạo
renderPlaylistItems();

// ----- Marquee -----
function resetMarqueeAnimation(span) {
  const container = span.parentElement;
  span.style.animation = "none";
  void span.offsetWidth;
  const spanWidth = span.offsetWidth;
  const containerWidth = container.offsetWidth;
  const speed = 30;
  const duration = (spanWidth + containerWidth) / speed;
  span.style.animation = `marquee ${duration}s linear infinite`;
}
