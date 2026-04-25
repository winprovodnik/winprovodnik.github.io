  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const hash = this.getAttribute('data-hash');
      if (!hash) return;
      navigator.clipboard.writeText(hash).then(() => {
        const originalText = this.innerText;
        this.innerText = '✓';
        setTimeout(() => {
          this.innerText = originalText;
        }, 1500);
      });
    });
  });

  document.querySelectorAll('.hash-cell').forEach(cell => {
  cell.addEventListener('click', async () => {
    const fullHash = cell.getAttribute('data-full');
    if (!fullHash) return;
    
    await navigator.clipboard.writeText(fullHash);
    const originalText = cell.innerText;
    cell.innerText = 'скопировано';
    setTimeout(() => {
      cell.innerText = originalText;
    }, 1500);
  });
});

const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.querySelector('.close');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  let currentIndex = 0;
  const screenshots = [];

  document.querySelectorAll('.screenshot').forEach((item, index) => {
    const imgSrc = item.getAttribute('data-img');
    const caption = item.getAttribute('data-caption');
    screenshots.push({ src: imgSrc, caption: caption });

    item.addEventListener('click', () => {
      currentIndex = index;
      openLightbox(currentIndex);
    });
  });

  function openLightbox(index) {
    lightbox.style.display = 'flex';
    updateLightbox(index);
  }

  function updateLightbox(index) {
    lightboxImg.src = screenshots[index].src;
    lightboxCaption.textContent = screenshots[index].caption;
  }

  function closeLightbox() {
    lightbox.style.display = 'none';
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + screenshots.length) % screenshots.length;
    updateLightbox(currentIndex);
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % screenshots.length;
    updateLightbox(currentIndex);
  }

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', showPrev);
  nextBtn.addEventListener('click', showNext);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (lightbox.style.display !== 'flex') return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });