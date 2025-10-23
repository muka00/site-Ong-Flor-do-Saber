const slides = document.querySelector('.slides');
const imgs = document.querySelectorAll('.slides img');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
let idx = 0;

function showSlide() {
  slides.style.transform = `translateX(${-idx * 100}%)`;
}

next.addEventListener('click', () => {
  idx = (idx + 1) % imgs.length;
  showSlide();
});

prev.addEventListener('click', () => {
  idx = (idx - 1 + imgs.length) % imgs.length;
  showSlide();
});
