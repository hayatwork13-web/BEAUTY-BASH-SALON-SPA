/**
 * Beauty Bash Salon & Spa - Script File
 * Pure Static Javascript for Premium User Experience
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileMenuLinks = document.querySelectorAll('.mobile-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('translate-x-full');
      document.body.classList.add('overflow-hidden');
    });
  }

  const closeMenu = () => {
    if (mobileMenu) {
      mobileMenu.classList.add('translate-x-full');
      document.body.classList.remove('overflow-hidden');
    }
  };

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMenu);
  }

  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // 3. Scroll Reveal Animations (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once animated, no need to watch again
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // 4. Header Scroll Effect
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('bg-white/95', 'backdrop-blur-md', 'shadow-md', 'py-3');
        header.classList.remove('bg-transparent', 'py-5');
      } else {
        header.classList.remove('bg-white/95', 'backdrop-blur-md', 'shadow-md', 'py-3');
        header.classList.add('bg-transparent', 'py-5');
      }
    }
  });

  // 5. Dynamic Services Filter Tabs
  const filterTabs = document.querySelectorAll('.filter-tab');
  const serviceCards = document.querySelectorAll('.service-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const category = tab.getAttribute('data-category');

      // Update active tab styling
      filterTabs.forEach(t => {
        t.classList.remove('tab-active', 'bg-salonPink', 'text-white');
        t.classList.add('bg-white', 'text-salonMuted');
      });
      tab.classList.add('tab-active');

      // Filter service cards
      serviceCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
          card.style.display = 'block';
          // Force a tiny reflow for entry animation
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // 6. Testimonials Carousel / Slider
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dot');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  let currentSlideIndex = 0;
  let slideInterval;

  const showSlide = (index) => {
    if (slides.length === 0) return;
    
    // Ensure index is within boundaries
    if (index >= slides.length) currentSlideIndex = 0;
    else if (index < 0) currentSlideIndex = slides.length - 1;
    else currentSlideIndex = index;

    // Toggle active slide
    slides.forEach((slide, i) => {
      slide.style.display = i === currentSlideIndex ? 'block' : 'none';
      setTimeout(() => {
        slide.style.opacity = i === currentSlideIndex ? '1' : '0';
      }, 50);
    });

    // Update dots
    dots.forEach((dot, i) => {
      if (i === currentSlideIndex) {
        dot.classList.add('bg-salonPink', 'w-6');
        dot.classList.remove('bg-pink-200', 'w-2');
      } else {
        dot.classList.remove('bg-salonPink', 'w-6');
        dot.classList.add('bg-pink-200', 'w-2');
      }
    });
  };

  const nextSlide = () => showSlide(currentSlideIndex + 1);
  const prevSlide = () => showSlide(currentSlideIndex - 1);

  if (prevBtn) prevBtn.addEventListener('click', () => { clearInterval(slideInterval); prevSlide(); startAutoPlay(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { clearInterval(slideInterval); nextSlide(); startAutoPlay(); });

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      clearInterval(slideInterval);
      const targetIndex = parseInt(e.target.getAttribute('data-index'), 10);
      showSlide(targetIndex);
      startAutoPlay();
    });
  });

  const startAutoPlay = () => {
    slideInterval = setInterval(nextSlide, 6000);
  };

  // Initialize first slide and auto-play
  showSlide(0);
  startAutoPlay();

  // 7. Interactive Appointment-to-WhatsApp Form Builder
  const bookingForm = document.getElementById('spa-booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('book-name').value.trim();
      const phone = document.getElementById('book-phone').value.trim();
      const service = document.getElementById('book-service').value;
      const date = document.getElementById('book-date').value;
      const time = document.getElementById('book-time').value;
      const notes = document.getElementById('book-notes').value.trim();

      // Form validation check
      if (!name || !phone || !service || !date || !time) {
        alert('Please fill out all required fields.');
        return;
      }

      // Format WhatsApp message
      const businessPhone = '923232489737';
      const intro = 'Hello Beauty Bash Salon %26 Spa,';
      const mainText = 'I would like to book an appointment.';
      const details = 
        `%0A%0A*Appointment Details:*` +
        `%0A• *Name:* ${encodeURIComponent(name)}` +
        `%0A• *Phone:* ${encodeURIComponent(phone)}` +
        `%0A• *Service:* ${encodeURIComponent(service)}` +
        `%0A• *Date:* ${encodeURIComponent(date)}` +
        `%0A• *Time:* ${encodeURIComponent(time)}` +
        (notes ? `%0A• *Notes/Requests:* ${encodeURIComponent(notes)}` : '');

      const whatsappURL = `https://wa.me/${businessPhone}?text=${intro}%0A%0A${mainText}${details}`;

      // Open in a new tab
      window.open(whatsappURL, '_blank');
    });
  }

  // 8. Dynamic Business Hours Indicator
  const updateBusinessStatus = () => {
    const statusIndicator = document.getElementById('business-status-badge');
    if (!statusIndicator) return;

    // Beauty Bash Salon & Spa timings: 11:00 AM to 9:00 PM PKT (Pakistan Time is UTC+5)
    // Let's approximate based on user's local time since it's client side
    const now = new Date();
    const day = now.getDay(); // 0 is Sunday, 1 is Monday...
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const timeVal = hours + minutes / 60;

    const openTime = 11.0; // 11:00 AM
    const closeTime = 21.0; // 9:00 PM

    // Let's assume open every day (standard for bridal studios in Autobhan Tower/Latifabad)
    if (timeVal >= openTime && timeVal < closeTime) {
      statusIndicator.innerHTML = `
        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 animate-pulse">
          <span class="w-2 h-2 mr-1.5 rounded-full bg-emerald-500"></span>
          Open Now (Closing at 9:00 PM)
        </span>
      `;
    } else {
      statusIndicator.innerHTML = `
        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">
          <span class="w-2 h-2 mr-1.5 rounded-full bg-rose-500"></span>
          Closed (Opens at 11:00 AM)
        </span>
      `;
    }
  };

  updateBusinessStatus();
  // Check every 60 seconds
  setInterval(updateBusinessStatus, 60000);

  // 9. Interactive Quick Pre-fill Service Link Click
  // When clicking a "Book Now" or "Book on WhatsApp" on a service card, scroll to form and select that service
  const serviceBookButtons = document.querySelectorAll('.service-book-btn');
  serviceBookButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = btn.getAttribute('data-service');
      const selectElement = document.getElementById('book-service');
      const bookingSection = document.getElementById('booking-section');

      if (selectElement && serviceName) {
        // Find matching option or set value
        let optionExists = false;
        for (let i = 0; i < selectElement.options.length; i++) {
          if (selectElement.options[i].value.toLowerCase() === serviceName.toLowerCase() || 
              selectElement.options[i].text.toLowerCase().includes(serviceName.toLowerCase())) {
            selectElement.selectedIndex = i;
            optionExists = true;
            break;
          }
        }
        
        if (!optionExists) {
          // If option doesn't exist, append it or select general
          const newOption = new Option(serviceName, serviceName, true, true);
          selectElement.add(newOption);
        }
      }

      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
