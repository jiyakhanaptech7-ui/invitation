/* ==========================================================================
   ROYAL WEDDING JAVASCRIPT
   Aman & Sunnooqa — Karachi Celebrations
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---------------------------------------------------------
  // 1. COUNTDOWN TIMER (To Mayon: October 4, 2026, 20:00:00 PKT)
  // ---------------------------------------------------------
  const targetDate = new Date('2026-10-04T20:00:00+05:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      const daysEl = document.getElementById('days');
      const hoursEl = document.getElementById('hours');
      const minutesEl = document.getElementById('minutes');
      const secondsEl = document.getElementById('seconds');

      if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
      if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    } else {
      const countdownCard = document.getElementById('weddingCountdown');
      if (countdownCard) {
        countdownCard.innerHTML = `<h3 style="color: #f5e08b; font-family: var(--font-serif); font-size: 1.8rem; padding: 10px;">The Celebrations Have Begun! 🎉</h3>`;
      }
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);


  // ---------------------------------------------------------
  // 2. NAVBAR SCROLL & MOBILE MENU TOGGLE
  // ---------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const navHamburger = document.getElementById('navHamburger');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (navHamburger && navLinks) {
    navHamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = navHamburger.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close menu when clicking nav link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = navHamburger.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }


  // ---------------------------------------------------------
  // 3. BACKGROUND MUSIC & WEB AUDIO SYNTHETIC AMBIENCE FALLBACK
  // ---------------------------------------------------------
  const audioToggleBtn = document.getElementById('audioToggleBtn');
  const weddingAudio = document.getElementById('weddingAudio');
  let isPlaying = false;
  let audioContext = null;
  let synthInterval = null;

  // Web Audio Harmonic Ambient Chimes (Guaranteed offline music experience)
  function playAmbientChime(freq, time) {
    if (!audioContext) return;
    try {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioContext.currentTime + time);

      gain.gain.setValueAtTime(0.08, audioContext.currentTime + time);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + time + 1.8);

      osc.connect(gain);
      gain.connect(audioContext.destination);

      osc.start(audioContext.currentTime + time);
      osc.stop(audioContext.currentTime + time + 1.9);
    } catch(e) {}
  }

  function startSynthesizedMelody() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!audioContext) audioContext = new AudioCtx();
    if (audioContext.state === 'suspended') audioContext.resume();

    const ragNotes = [293.66, 329.63, 369.99, 440.0, 493.88, 587.33, 659.25]; // Festive Raag scale
    let noteIdx = 0;

    synthInterval = setInterval(() => {
      if (!isPlaying) return;
      const note = ragNotes[noteIdx % ragNotes.length];
      playAmbientChime(note, 0);
      if (noteIdx % 3 === 0) playAmbientChime(note * 1.5, 0.4);
      noteIdx++;
    }, 900);
  }

  function stopSynthesizedMelody() {
    if (synthInterval) clearInterval(synthInterval);
  }

  if (audioToggleBtn && weddingAudio) {
    audioToggleBtn.addEventListener('click', () => {
      if (!isPlaying) {
        weddingAudio.volume = 0.6;
        weddingAudio.play().then(() => {
          isPlaying = true;
          audioToggleBtn.classList.add('playing');
        }).catch((err) => {
          console.log("Audio file play prevented/failed, activating harmonic synth:", err);
          isPlaying = true;
          audioToggleBtn.classList.add('playing');
          startSynthesizedMelody();
        });
      } else {
        weddingAudio.pause();
        stopSynthesizedMelody();
        isPlaying = false;
        audioToggleBtn.classList.remove('playing');
      }
    });
  }


  // ---------------------------------------------------------
  // 4. CANVAS PARTICLES: GOLDEN GLITTER & FLOATING ROSE PETALS
  // ---------------------------------------------------------
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const numSparks = 45;
    const numPetals = 16;

    // Gold Sparkles
    for (let i = 0; i < numSparks; i++) {
      particles.push({
        type: 'spark',
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.8,
        speedY: Math.random() * 0.7 + 0.2,
        speedX: (Math.random() - 0.5) * 0.5,
        alpha: Math.random() * 0.7 + 0.2,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        color: Math.random() > 0.4 ? '#d4af37' : '#fcf6ba'
      });
    }

    // Maroon & Red Velvet Rose Petals
    for (let i = 0; i < numPetals; i++) {
      particles.push({
        type: 'petal',
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 6 + 6,
        speedY: Math.random() * 1.0 + 0.5,
        speedX: Math.random() * 1.2 - 0.6,
        angle: Math.random() * 360,
        spinSpeed: (Math.random() - 0.5) * 0.04,
        alpha: Math.random() * 0.5 + 0.4,
        color: Math.random() > 0.5 ? '#800e13' : '#a8202b'
      });
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        if (p.type === 'spark') {
          p.y -= p.speedY;
          p.x += p.speedX;
          p.alpha += p.pulseSpeed;
          if (p.alpha > 0.9 || p.alpha < 0.2) p.pulseSpeed = -p.pulseSpeed;

          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }

          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0.1, Math.min(1, p.alpha));
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#d4af37';
          ctx.fill();
          ctx.restore();

        } else if (p.type === 'petal') {
          p.y += p.speedY;
          p.x += Math.sin(p.y * 0.015) * 0.8;
          p.angle += p.spinSpeed;

          if (p.y > height + 20) {
            p.y = -20;
            p.x = Math.random() * width;
          }

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 0.6, p.size, Math.PI / 4, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.shadowBlur = 6;
          ctx.shadowColor = '#4a0e17';
          ctx.fill();
          ctx.restore();
        }
      });

      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }


  // ---------------------------------------------------------
  // 5. GUESTBOOK / WISHES BOARD
  // ---------------------------------------------------------
  const defaultWishes = [
    {
      name: "Tariq Mahmood & Family",
      relation: "Groom's Side",
      message: "Bohot bohot mubarak ho Aman aur Sunnooqa! May Allah grant you both endless love, harmony, and barakah in every step of this journey.",
      time: "2 hours ago"
    },
    {
      name: "Farah & Zeeshan",
      relation: "Bride's Side",
      message: "Dearest Sunnooqa, you look like a dream! Aman is so blessed to have you. Can't wait to dance at the Mayon night at Sky Deck!",
      time: "5 hours ago"
    },
    {
      name: "Uncle Salman & Auntie Nida",
      relation: "Family & Friends",
      message: "May your marriage be blessed with lifelong happiness and good health. Congratulations to both families!",
      time: "1 day ago"
    }
  ];

  let storedWishes = [];
  try {
    const raw = localStorage.getItem('aman_sunnooqa_wishes');
    storedWishes = raw ? JSON.parse(raw) : defaultWishes;
  } catch(e) {
    storedWishes = defaultWishes;
  }

  const wishesFeed = document.getElementById('wishesFeed');
  const wishesCount = document.getElementById('wishesCount');
  const wishForm = document.getElementById('wishForm');

  function renderWishes() {
    if (!wishesFeed) return;
    wishesFeed.innerHTML = '';
    if (wishesCount) wishesCount.textContent = storedWishes.length;

    storedWishes.forEach(item => {
      const card = document.createElement('div');
      card.className = 'wish-item-card';
      card.innerHTML = `
        <div class="wish-item-header">
          <span class="wish-author">${escapeHtml(item.name)}</span>
          <span class="wish-badge">${escapeHtml(item.relation)}</span>
        </div>
        <p class="wish-text">"${escapeHtml(item.message)}"</p>
        <span class="wish-time"><i class="fa-regular fa-clock"></i> ${escapeHtml(item.time)}</span>
      `;
      wishesFeed.appendChild(card);
    });
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
  }

  renderWishes();

  if (wishForm) {
    wishForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('guestName').value.trim();
      const relation = document.getElementById('guestRelation').value;
      const message = document.getElementById('guestMessage').value.trim();

      if (!name || !message) return;

      const newWish = {
        name: name,
        relation: relation,
        message: message,
        time: "Just now"
      };

      storedWishes.unshift(newWish);
      try {
        localStorage.setItem('aman_sunnooqa_wishes', JSON.stringify(storedWishes));
      } catch(err) {}

      renderWishes();
      wishForm.reset();

      // Mini alert
      alert("Shukriya! Your loving blessings have been posted to the guestbook.");
    });
  }


  // ---------------------------------------------------------
  // 6. RSVP HANDLING & WHATSAPP GENERATION
  // ---------------------------------------------------------
  const rsvpForm = document.getElementById('rsvpForm');
  const rsvpModal = document.getElementById('rsvpModal');
  const modalRsvpSummary = document.getElementById('modalRsvpSummary');
  const whatsappShareBtn = document.getElementById('whatsappShareBtn');

  let currentRsvpData = null;

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('rsvpName').value.trim();
      const phone = document.getElementById('rsvpPhone').value.trim();
      const guests = document.getElementById('rsvpGuests').value;
      const side = document.getElementById('rsvpSide').value;
      const note = document.getElementById('rsvpNote').value.trim();

      // Checked events
      const checkboxes = document.querySelectorAll('input[name="rsvpEvents"]:checked');
      const selectedEvents = Array.from(checkboxes).map(cb => cb.value);

      if (selectedEvents.length === 0) {
        alert("Please select at least one wedding event you will be attending.");
        return;
      }

      currentRsvpData = {
        name,
        phone,
        guests,
        side,
        events: selectedEvents.join(', '),
        note
      };

      // Populate summary in Modal
      if (modalRsvpSummary) {
        modalRsvpSummary.innerHTML = `
          <p><strong>Guest Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
          <p><strong>Guests Attending:</strong> ${escapeHtml(guests)} Person(s)</p>
          <p><strong>Attending From:</strong> ${escapeHtml(side)}</p>
          <p><strong>Events Gracefully Attending:</strong></p>
          <ul style="padding-left: 20px; color: #f5e08b; margin: 4px 0 8px;">
            ${selectedEvents.map(ev => `<li>${escapeHtml(ev)}</li>`).join('')}
          </ul>
          ${note ? `<p><strong>Special Note:</strong> <em>${escapeHtml(note)}</em></p>` : ''}
        `;
      }

      // Open Modal
      if (rsvpModal) {
        rsvpModal.classList.add('active');
      }

      // Reset Form
      rsvpForm.reset();
    });
  }

  // WhatsApp Share Action
  if (whatsappShareBtn) {
    whatsappShareBtn.addEventListener('click', () => {
      if (!currentRsvpData) return;
      const text = `*💍 Wedding RSVP Confirmation for Aman & Sunnooqa* %0A%0A` +
        `*Guest Name:* ${encodeURIComponent(currentRsvpData.name)}%0A` +
        `*Phone:* ${encodeURIComponent(currentRsvpData.phone)}%0A` +
        `*Attending Guests:* ${encodeURIComponent(currentRsvpData.guests)} Person(s)%0A` +
        `*Affiliation:* ${encodeURIComponent(currentRsvpData.side)}%0A` +
        `*Events Attending:* ${encodeURIComponent(currentRsvpData.events)}%0A` +
        (currentRsvpData.note ? `*Special Note:* ${encodeURIComponent(currentRsvpData.note)}%0A` : '') +
        `%0A_Sent via Aman & Sunnooqa Wedding Invitation Portal_`;

      const whatsappUrl = `https://api.whatsapp.com/send?text=${text}`;
      window.open(whatsappUrl, '_blank');
    });
  }

});

// Global Modal Handlers
function closeRsvpModal() {
  const modal = document.getElementById('rsvpModal');
  if (modal) modal.classList.remove('active');
}

// Lightbox Handlers
function openLightbox(imgSrc, caption) {
  const modal = document.getElementById('imageLightbox');
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCaption');
  if (modal && img) {
    img.src = imgSrc;
    if (cap) cap.textContent = caption;
    modal.classList.add('active');
  }
}

function closeLightbox() {
  const modal = document.getElementById('imageLightbox');
  if (modal) modal.classList.remove('active');
}
