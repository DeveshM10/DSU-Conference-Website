document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const navList = document.querySelector(".nav-list")

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", function () {
      navList.classList.toggle("active")
      this.innerHTML = navList.classList.contains("active")
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>'
    })
  }

  // Mobile Dropdown Toggle
  const dropdownLinks = document.querySelectorAll(".has-dropdown .nav-link")

  dropdownLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault()
        const dropdown = this.nextElementSibling
        dropdown.classList.toggle("active")

        // Toggle the chevron icon
        const icon = this.querySelector("i.fas")
        if (dropdown.classList.contains("active")) {
          icon.classList.remove("fa-chevron-down")
          icon.classList.add("fa-chevron-up")
        } else {
          icon.classList.remove("fa-chevron-up")
          icon.classList.add("fa-chevron-down")
        }
      }
    })
  })

  // Dropdown Animation for Desktop
  const navItems = document.querySelectorAll(".has-dropdown")

  navItems.forEach((item) => {
    const dropdown = item.querySelector(".dropdown-menu")

    item.addEventListener("mouseenter", () => {
      if (window.innerWidth > 768) {
        dropdown.style.display = "block"
        setTimeout(() => {
          dropdown.style.opacity = "1"
          dropdown.style.transform = "translateY(0)"
        }, 10)
      }
    })

    item.addEventListener("mouseleave", () => {
      if (window.innerWidth > 768) {
        dropdown.style.opacity = "0"
        dropdown.style.transform = "translateY(10px)"
        setTimeout(() => {
          dropdown.style.display = ""
        }, 300)
      }
    })
  })

  // Countdown Timer
  const countdownElement = document.getElementById("countdown")
  if (countdownElement) {
    // Set the conference date - November 19, 2021
    const conferenceDate = new Date("November 19, 2021 09:00:00").getTime()

    // Update the countdown every second
    const countdownTimer = setInterval(() => {
      // Get today's date and time
      const now = new Date().getTime()

      // Find the distance between now and the conference date
      const distance = conferenceDate - now

      // If the conference has already happened, display a message
      if (distance < 0) {
        clearInterval(countdownTimer)
        document.getElementById("days").innerHTML = "00"
        document.getElementById("hours").innerHTML = "00"
        document.getElementById("minutes").innerHTML = "00"
        document.getElementById("seconds").innerHTML = "00"
        return
      }

      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      // Display the result
      document.getElementById("days").innerHTML = days < 10 ? "0" + days : days
      document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours
      document.getElementById("minutes").innerHTML = minutes < 10 ? "0" + minutes : minutes
      document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds
    }, 1000)
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      if (this.getAttribute("href") !== "#") {
        e.preventDefault()

        const targetId = this.getAttribute("href")
        const targetElement = document.querySelector(targetId)

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: "smooth",
          })

          // Close mobile menu if open
          if (navList.classList.contains("active")) {
            navList.classList.remove("active")
            mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>'
          }
        }
      }
    })
  })

  // Animate elements on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".track-card, .speaker-card, .stat-item, .timeline-item")

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementPosition < windowHeight - 50) {
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      }
    })
  }

  // Set initial state for animated elements
  const elementsToAnimate = document.querySelectorAll(".track-card, .speaker-card, .stat-item, .timeline-item")
  elementsToAnimate.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(20px)"
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease"
  })

  // Run animation on scroll
  window.addEventListener("scroll", animateOnScroll)

  // Run once on page load
  animateOnScroll()

  // Newsletter form submission
  const newsletterForm = document.querySelector(".newsletter-form")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()
      const emailInput = this.querySelector('input[type="email"]')

      if (emailInput.value) {
        // Here you would typically send the data to your server
        alert("Thank you for subscribing to our newsletter!")
        emailInput.value = ""
      }
    })
  }

  // Add parallax effect to hero section
  const hero = document.querySelector(".hero")
  if (hero) {
    window.addEventListener("scroll", () => {
      const scrollPosition = window.pageYOffset
      hero.style.backgroundPositionY = scrollPosition * 0.5 + "px"
    })
  }

  // Add color-changing effect to section dividers
  const sectionDividers = document.querySelectorAll(".section-divider")
  let colorIndex = 0
  const colors = [
    "linear-gradient(to right, #0056b3, #7b1fa2)",
    "linear-gradient(to right, #7b1fa2, #ff5722)",
    "linear-gradient(to right, #ff5722, #4caf50)",
    "linear-gradient(to right, #4caf50, #0056b3)",
  ]

  if (sectionDividers.length > 0) {
    setInterval(() => {
      sectionDividers.forEach((divider) => {
        divider.style.background = colors[colorIndex]
      })
      colorIndex = (colorIndex + 1) % colors.length
    }, 3000)
  }

  // Initialize AOS (Animate on Scroll) effect manually
  function fadeInElements() {
    const fadeElements = document.querySelectorAll(".fade-in")
    fadeElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight
      if (elementTop < windowHeight - 100) {
        element.classList.add("visible")
      }
    })
  }

  // Add fade-in class to elements
  document.querySelectorAll(".section-header, .cta-buttons, .newsletter-content").forEach((el) => {
    el.classList.add("fade-in")
    el.style.opacity = "0"
    el.style.transition = "opacity 1s ease, transform 1s ease"
  })

  window.addEventListener("scroll", fadeInElements)
  fadeInElements() // Run once on page load
})

