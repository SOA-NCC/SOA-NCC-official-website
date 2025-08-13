// Navigation functionality
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")
  const navbar = document.getElementById("navbar")

  // Mobile menu toggle
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    })
  })

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(12, 8, 1, 0.28)"
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0)"
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0)"
      navbar.style.boxShadow = "none"
    }
  })

  // Active navigation link highlighting
  const sections = document.querySelectorAll("section[id]")

  function highlightNavigation() {
    const scrollPosition = window.scrollY + 100

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`)

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach((link) => link.classList.remove("active"))
        if (navLink) {
          navLink.classList.add("active")
        }
      }
    })
  }

  window.addEventListener("scroll", highlightNavigation)

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        const offsetTop = target.offsetTop - 70 // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".objective-card, .activity-card, .message-card, .cadet-card, .achievement-card, .benefit-card",
  )
  animateElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})

// Smooth scroll to section function
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    const offsetTop = element.offsetTop - 70 // Account for fixed navbar
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    })
  }
}

// FAQ toggle functionality
function toggleFAQ(element) {
  const faqItem = element.parentElement
  const isActive = faqItem.classList.contains("active")

  // Close all FAQ items
  document.querySelectorAll(".faq-item").forEach((item) => {
    item.classList.remove("active")
  })

  // Open clicked item if it wasn't active
  if (!isActive) {
    faqItem.classList.add("active")
  }
}

// Scroll to top functionality
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

// Add scroll to top button
document.addEventListener("DOMContentLoaded", () => {
  // Create scroll to top button
  const scrollTopBtn = document.createElement("button")
  scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>'
  scrollTopBtn.className = "scroll-top-btn"
  scrollTopBtn.onclick = scrollToTop
  document.body.appendChild(scrollTopBtn)

  // Add CSS for scroll to top button
  const style = document.createElement("style")
  style.textContent = `
        .scroll-top-btn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #ff6b35, #ff8c42);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            font-size: 18px;
            box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
        }
        
        .scroll-top-btn:hover {
            background: linear-gradient(135deg, #ff5722, #ff6b35);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
        }
        
        .scroll-top-btn.visible {
            opacity: 1;
            visibility: visible;
        }
    `
  document.head.appendChild(style)

  // Show/hide scroll to top button
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add("visible")
    } else {
      scrollTopBtn.classList.remove("visible")
    }
  })
})

// Form submission handling (if needed)
function handleFormSubmit(event) {
  event.preventDefault()
  // Add form submission logic here
  alert("Thank you for your interest! We will contact you soon.")
}

// Loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// Add loading styles
document.addEventListener("DOMContentLoaded", () => {
  const loadingStyle = document.createElement("style")
  loadingStyle.textContent = `
        body {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        
        body.loaded {
            opacity: 1;
        }
        
        .hero-title,
        .hero-subtitle,
        .hero-description,
        .hero-buttons {
            opacity: 0;
            transform: translateY(30px);
        }
        
        body.loaded .hero-title {
            animation: fadeInUp 1s ease-out forwards;
        }
        
        body.loaded .hero-subtitle {
            animation: fadeInUp 1s ease-out 0.2s forwards;
        }
        
        body.loaded .hero-description {
            animation: fadeInUp 1s ease-out 0.4s forwards;
        }
        
        body.loaded .hero-buttons {
            animation: fadeInUp 1s ease-out 0.6s forwards;
        }
    `
  document.head.appendChild(loadingStyle)
})

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero")
  const heroBackground = document.querySelector(".hero-background")

  if (hero && heroBackground) {
    const rate = scrolled * -0.5
    heroBackground.style.transform = `translateY(${rate}px)`
  }
})

// Counter animation for statistics (if needed)
function animateCounter(element, target, duration = 2000) {
  let start = 0
  const increment = target / (duration / 16)

  const timer = setInterval(() => {
    start += increment
    element.textContent = Math.floor(start)

    if (start >= target) {
      element.textContent = target
      clearInterval(timer)
    }
  }, 16)
}

// Initialize counters when they come into view
const counterElements = document.querySelectorAll(".counter")
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const target = Number.parseInt(entry.target.dataset.target)
      animateCounter(entry.target, target)
      counterObserver.unobserve(entry.target)
    }
  })
})

counterElements.forEach((counter) => {
  counterObserver.observe(counter)
})

// Image lazy loading
const images = document.querySelectorAll("img[data-src]")
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target
      img.src = img.dataset.src
      img.classList.remove("lazy")
      imageObserver.unobserve(img)
    }
  })
})

images.forEach((img) => {
  imageObserver.observe(img)
})

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Initialize typing effect on load
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle) {
    const originalText = heroTitle.textContent
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 150)
    }, 1000)
  }
})

// ======= Hamburger Menu =======
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const dropdown = document.getElementById('dropdown-menu');
    const nav = document.getElementById('navbar');

    hamburger.addEventListener('click', function () {
        dropdown.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close dropdown on outside click (mobile)
    document.addEventListener('click', function (e) {
        if (!nav.contains(e.target) && dropdown.classList.contains('active')) {
            dropdown.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// ======= Smooth Scroll =======
window.scrollToSection = function (id) {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
    }
};

// ======= Hero Scroll Indicator =======
document.querySelector('.scroll-indicator')?.addEventListener('click', () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
});

// ======= About Image Slideshow =======
let aboutSlideIndex = 0;
const aboutSlides = document.querySelectorAll('.about-slide');
const aboutIndicators = document.querySelectorAll('.about-image-container .indicator');

function showAboutSlide(n) {
    if (!aboutSlides.length) return;
    aboutSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === n);
        aboutIndicators[i]?.classList.toggle('active', i === n);
    });
    aboutSlideIndex = n;
}
window.currentSlide = function (n) {
    showAboutSlide(n - 1);
    clearInterval(aboutAutoInterval);
    aboutAutoInterval = setInterval(nextAboutSlide, 4000);
};
function nextAboutSlide() {
    showAboutSlide((aboutSlideIndex + 1) % aboutSlides.length);
}
let aboutAutoInterval = setInterval(nextAboutSlide, 4000);
showAboutSlide(0);

// ======= Achievements Carousel =======
let carouselIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dots .dot');
function showCarouselSlide(n) {
    if (!slides.length) return;
    slides.forEach((slide, i) => slide.classList.toggle('active', i === n));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === n));
    carouselIndex = n;
}
window.changeSlide = function (dir) {
    let n = (carouselIndex + dir + slides.length) % slides.length;
    showCarouselSlide(n);
};
window.currentSlide = function (n) {
    // Used for both about and carousel, so check context
    if (slides.length && n <= slides.length) {
        showCarouselSlide(n - 1);
    } else if (aboutSlides.length && n <= aboutSlides.length) {
        showAboutSlide(n - 1);
        clearInterval(aboutAutoInterval);
        aboutAutoInterval = setInterval(nextAboutSlide, 4000);
    }
};
dots.forEach((dot, i) => {
    dot.onclick = () => showCarouselSlide(i);
});
showCarouselSlide(0);

// ======= FAQ Accordion =======
window.toggleFAQ = function (el) {
    const item = el.parentElement;
    const answer = item.querySelector('.faq-answer');
    const open = item.classList.toggle('open');
    answer.style.maxHeight = open ? answer.scrollHeight + 'px' : null;
    // Close others
    document.querySelectorAll('.faq-item').forEach(faq => {
        if (faq !== item) {
            faq.classList.remove('open');
            faq.querySelector('.faq-answer').style.maxHeight = null;
        }
    });
};
// On load, collapse all
document.querySelectorAll('.faq-answer').forEach(ans => ans.style.maxHeight = null);

// ======= Contributors Skill Bars Animation =======
function animateSkillBars() {
    document.querySelectorAll('.skills-chart').forEach(chart => {
        if (chart.getBoundingClientRect().top < window.innerHeight - 50) {
            chart.querySelectorAll('.skill-bar').forEach(bar => {
                const percent = bar.getAttribute('data-level');
                const progress = bar.querySelector('.skill-progress');
                const label = bar.querySelector('.skill-percent');
                progress.style.width = percent + '%';
                let count = 0;
                let interval = setInterval(() => {
                    if (count < percent) {
                        count++;
                        label.textContent = count + '%';
                    } else {
                        clearInterval(interval);
                    }
                }, 10);
            });
        }
    });
}
window.addEventListener('scroll', animateSkillBars);
window.addEventListener('DOMContentLoaded', animateSkillBars);

// ======= Responsive Adjustments =======
window.addEventListener('resize', function () {
    // Hide dropdown if switching to desktop
    if (window.innerWidth > 900) {
        document.getElementById('dropdown-menu')?.classList.remove('active');
        document.getElementById('hamburger')?.classList.remove('active');
    }
});

// ======= Join Button (scroll to join section) =======
document.querySelector('.join-cta .btn')?.addEventListener('click', () => {
    document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' });
});