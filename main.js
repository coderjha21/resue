// DOM Elements
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const nav = document.querySelector('nav');
const navLinksItems = document.querySelectorAll('.nav-links a');
const animatedElements = document.querySelectorAll('.animate-on-scroll');

// Theme Toggle Functionality
themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  updateThemeIcon();
  saveThemePreference();
});

function updateThemeIcon() {
  const icon = themeToggle.querySelector('i');
  if (body.classList.contains('dark-mode')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
}

function saveThemePreference() {
  const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem('theme', currentTheme);
}

function loadThemePreference() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    updateThemeIcon();
  }
}

// Mobile Navigation
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  toggleHamburgerIcon();
});

function toggleHamburgerIcon() {
  const hamburger = document.querySelector('.hamburger');
  hamburger.classList.toggle('active');
}

// Close mobile menu when clicking on a link
navLinksItems.forEach(item => {
  item.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Scroll Effects
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY;
  
  // Sticky Navigation
  if (scrollPos > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  
  // Update active nav link based on scroll position
  updateActiveNavLink();
  
  // Animate elements when they come into view
  animateOnScroll();
});

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const scrollPos = window.scrollY;
    
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${section.id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

function animateOnScroll() {
  animatedElements.forEach(element => {
    const elementPos = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementPos < windowHeight * 0.85) {
      element.classList.add('active');
    }
  });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  });
});

// Initialize Functions
function init() {
  loadThemePreference();
  updateActiveNavLink();
  animateOnScroll();
  
  // Apply initial animations with slight delay
  setTimeout(() => {
    document.querySelectorAll('.hero .animate-on-scroll').forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('active');
      }, index * 200);
    });
  }, 300);
}

// Run init on page load
window.addEventListener('load', init);