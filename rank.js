// Rank Structure JavaScript with Advanced Animations

// Initialize the rank structure functionality
function initRankStructure() {
  // Toggle between SD and SW sections
  const toggleButtons = document.querySelectorAll(".toggle-btn")
  const rankSections = document.querySelectorAll(".rank-section")

  toggleButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const section = this.getAttribute("data-section")

      // Update active button
      toggleButtons.forEach((b) => b.classList.remove("active"))
      this.classList.add("active")

      // Update active section with fade effect
      rankSections.forEach((s) => {
        s.classList.remove("active")
      })

      // Small delay for smooth transition
      setTimeout(() => {
        const targetSection = document.getElementById(section + "-section")
        targetSection.classList.add("active")

        // Re-trigger scroll animations for new section
        initScrollAnimations()
      }, 150)
    })
  })

  // Add enhanced hover effects to officer cards
  const officerCards = document.querySelectorAll(".officer-card")
  officerCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      // Add ripple effect
      createRippleEffect(this)
    })

    card.addEventListener("click", function () {
      // Add pulse effect
      this.style.animation = "pulse 0.6s ease-out"
      setTimeout(() => {
        this.style.animation = ""
      }, 600)
    })
  })

  // Initialize scroll animations
  initScrollAnimations()

  // Add keyboard navigation support
  addKeyboardNavigation()

  // Initialize parallax effects
  initParallaxEffects()
}

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.aosDelay || 0

        setTimeout(() => {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0) scale(1)"
          entry.target.classList.add("aos-animate")

          // Add a subtle bounce effect
          entry.target.style.animation = "bounceIn 0.8s ease-out"
        }, delay)
      }
    })
  }, observerOptions)

  // Observe all officer cards for scroll animations
  const officerCards = document.querySelectorAll(".officer-card")
  officerCards.forEach((card, index) => {
    // Reset animation state
    card.style.opacity = "0"
    card.style.transform = "translateY(50px) scale(0.9)"
    card.style.transition = "all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
    card.classList.remove("aos-animate")

    observer.observe(card)
  })
}

function createRippleEffect(element) {
  const ripple = document.createElement("div")
  const rect = element.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)

  ripple.style.width = ripple.style.height = size + "px"
  ripple.style.left = "50%"
  ripple.style.top = "50%"
  ripple.style.transform = "translate(-50%, -50%) scale(0)"
  ripple.style.borderRadius = "50%"
  ripple.style.background = "rgba(255, 255, 255, 0.3)"
  ripple.style.position = "absolute"
  ripple.style.pointerEvents = "none"
  ripple.style.transition = "transform 0.6s ease-out, opacity 0.6s ease-out"
  ripple.style.zIndex = "1"

  element.style.position = "relative"
  element.appendChild(ripple)

  // Trigger animation
  setTimeout(() => {
    ripple.style.transform = "translate(-50%, -50%) scale(2)"
    ripple.style.opacity = "0"
  }, 10)

  // Remove ripple after animation
  setTimeout(() => {
    if (ripple.parentNode) {
      ripple.parentNode.removeChild(ripple)
    }
  }, 500)
}

function initParallaxEffects() {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const parallaxElements = document.querySelectorAll(".rank-header")

    parallaxElements.forEach((element) => {
      const speed = 0.2
      element.style.transform = `translateY(${scrolled * speed}px)`
    })
  })
}

// Enhanced keyboard navigation support
function addKeyboardNavigation() {
  const toggleButtons = document.querySelectorAll(".toggle-btn")
  const socialButtons = document.querySelectorAll(".social-btn")

  toggleButtons.forEach((btn, index) => {
    btn.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft" && index > 0) {
        toggleButtons[index - 1].focus()
        toggleButtons[index - 1].click()
      } else if (e.key === "ArrowRight" && index < toggleButtons.length - 1) {
        toggleButtons[index + 1].focus()
        toggleButtons[index + 1].click()
      }
    })
  })

  // Add focus styles for accessibility
  socialButtons.forEach((btn) => {
    btn.addEventListener("focus", function () {
      this.style.outline = "3px solid rgba(102, 126, 234, 0.5)"
      this.style.outlineOffset = "2px"
    })

    btn.addEventListener("blur", function () {
      this.style.outline = "none"
    })
  })
}

const style = document.createElement("style")
style.textContent = `
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  @keyframes bounceIn {
    0% { transform: translateY(0) scale(0.9); opacity: 0; }
    60% { transform: translateY(-10px) scale(1.02); opacity: 1; }
    100% { transform: translateY(0) scale(1); opacity: 1; }
  }

  .officer-card:hover .social-btn {
    animation: socialBounce 0.3s ease-out;
    animation-fill-mode: both;
  }

  .officer-card:hover .social-btn:nth-child(1) { animation-delay: 0.1s; }
  .officer-card:hover .social-btn:nth-child(2) { animation-delay: 0.2s; }
  .officer-card:hover .social-btn:nth-child(3) { animation-delay: 0.3s; }

  @keyframes socialBounce {
    0% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-5px) scale(1.1); }
    100% { transform: translateY(0) scale(1); }
  }
`
document.head.appendChild(style)

// Auto-initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  initRankStructure()
})

// Handle window resize for responsive behavior
window.addEventListener("resize", () => {
  // Recalculate any layout-dependent features if needed
  const container = document.querySelector(".rank-container")
  if (container) {
    // Trigger reflow for responsive adjustments
    container.offsetHeight
  }
})

document.addEventListener("click", (e) => {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }
})
