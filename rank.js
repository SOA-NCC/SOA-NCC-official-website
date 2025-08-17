// Dynamic Rank Structure JavaScript with Advanced Animations

let rankData = null

// Load rank data from JSON
async function loadRankData() {
  try {
    showLoading()
    const response = await fetch("rank-data.json")

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    rankData = await response.json()
    populateRankStructure()
    hideLoading()
    initRankStructure()
  } catch (error) {
    console.error("Error loading rank data:", error)
    showError()
  }
}

// Show loading state
function showLoading() {
  document.getElementById("loading").style.display = "flex"
  document.getElementById("error").style.display = "none"
  document.getElementById("rank-container").style.display = "none"
}

// Hide loading state
function hideLoading() {
  document.getElementById("loading").style.display = "none"
  document.getElementById("rank-container").style.display = "block"
}

// Show error state
function showError() {
  document.getElementById("loading").style.display = "none"
  document.getElementById("error").style.display = "flex"
  document.getElementById("rank-container").style.display = "none"
}

// Populate the rank structure from JSON data
function populateRankStructure() {
  if (!rankData) return

  document.getElementById("main-title").textContent = rankData.header.title
  document.getElementById("main-subtitle").textContent = rankData.header.subtitle

  const toggleContainer = document.getElementById("section-toggle")
  toggleContainer.innerHTML = ""

  Object.keys(rankData.sections).forEach((sectionKey, index) => {
    const section = rankData.sections[sectionKey]
    const toggleBtn = document.createElement("div")
    toggleBtn.className = `toggle-btn ${index === 0 ? "active" : ""}`
    toggleBtn.setAttribute("data-section", sectionKey)
    toggleBtn.textContent = section.name
    toggleContainer.appendChild(toggleBtn)
  })

  populateSection("sd", "sd-hierarchy")

  populateSection("sw", "sw-hierarchy")
}

// Populate a specific section with officers
function populateSection(sectionKey, containerId) {
  const section = rankData.sections[sectionKey]
  const container = document.getElementById(containerId)
  container.innerHTML = ""

  // Define rank order for proper hierarchy display
  const rankOrder = ["SUO", "JUO", "CQMS", "SGT", "CPL", "LCPL"]

  rankOrder.forEach((rank) => {
    if (section.officers[rank] && section.officers[rank].length > 0) {
      const rankLevel = createRankLevel(rank, section.officers[rank])
      container.appendChild(rankLevel)
    }
  })
}

// Create a rank level container with officers
function createRankLevel(rank, officers) {
  const rankLevel = document.createElement("div")

  if (rank === "SUO" || (rank === "JUO" && officers.length === 1)) {
    rankLevel.className = `rank-level ${rank.toLowerCase()} single`
  } else if (rank === "JUO") {
    rankLevel.className = `rank-level ${rank.toLowerCase()}`
  } else if (rank === "CQMS" || rank === "SGT") {
    rankLevel.className = "rank-level middle"
  } else if (rank === "CPL") {
    rankLevel.className = "rank-level cpl"
  } else if (rank === "LCPL") {
    rankLevel.className = "rank-level lcpl"
  } else {
    rankLevel.className = "rank-level"
  }

  officers.forEach((officer, index) => {
    const officerCard = createOfficerCard(officer, index * 100)
    rankLevel.appendChild(officerCard)
  })

  return rankLevel
}

// Create an individual officer card
function createOfficerCard(officer, delay) {
  const card = document.createElement("div")
  card.className = `officer-card rank-${officer.rank.toLowerCase()}`
  card.setAttribute("data-aos", "fade-up")
  card.setAttribute("data-aos-delay", delay.toString())

  card.innerHTML = `
        <div class="officer-photo">
            <img src="${officer.image}" alt="${officer.name}" onerror="this.src='https://images.assetsdelivery.com/compings_v2/thesomeday123/thesomeday1231712/thesomeday123171200008.jpg?height=120&width=120'">
        </div>
        <div class="officer-name">${officer.name}</div>
        <div class="officer-rank">${officer.rank}</div>
        <div class="officer-year">${officer.year}</div>
        <div class="social-links">
            <a href="${officer.social.linkedin}" class="social-btn linkedin"><i class="fab fa-linkedin-in"></i></a>
            <a href="mailto:${officer.social.email}" class="social-btn email"><i class="fas fa-envelope"></i></a>
        </div>
    `

  return card
}

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
  .loading-container, .error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    text-align: center;
    padding: 20px;
  }

  .loading-spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #e2e8f0;
    border-top: 4px solid #3b82f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 20px;
  }

  .error-message {
    background: #ffffff;
    padding: 40px;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    border: 1px solid #e2e8f0;
    max-width: 400px;
  }

  .error-message i {
    font-size: 3rem;
    color: #ef4444;
    margin-bottom: 20px;
  }

  .retry-btn {
    background: #3b82f6;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    margin-top: 20px;
    transition: background 0.3s ease;
  }

  .retry-btn:hover {
    background: #1d4ed8;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

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
  loadRankData()
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
