// DOM Elements
const header = document.querySelector('.header') as HTMLElement;
const menuToggle = document.querySelector('.menu-toggle') as HTMLElement;
const nav = document.querySelector('.nav') as HTMLElement;
const skillLevels = document.querySelectorAll('.skill-level') as NodeListOf<HTMLElement>;
const contactForm = document.getElementById('contactForm') as HTMLFormElement;

// Function to handle header styling on scroll
function handleScroll() {
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

// Function to handle mobile menu toggle
function toggleMenu() {
  menuToggle.classList.toggle('active');
  nav.classList.toggle('active');
}

// Function to animate skill bars when in viewport
function animateSkillBars() {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        // Add a small delay before animating
        setTimeout(() => {
          (entry.target as HTMLElement).style.width = (entry.target as HTMLElement).getAttribute('style')?.split(':')[1] || '0%';
        }, 200);
      }
    }
  }, { threshold: 0.5 });

  for (const level of skillLevels) {
    // Reset the width to 0 initially
    const originalWidth = level.style.width;
    level.style.width = '0%';

    // Observe the element
    observer.observe(level);

    // Store the original width as data attribute
    level.setAttribute('data-width', originalWidth);
  }
}

// Function to handle form submission
function handleFormSubmit(e: Event) {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  // Here you would typically send the form data to a server
  // For now, we'll just log it and show a success message
  console.log({ name, email, message });

  // Show success message
  const successMessage = document.createElement('div');
  successMessage.className = 'form-success';
  successMessage.textContent = 'Your message has been sent successfully!';

  contactForm.innerHTML = '';
  contactForm.appendChild(successMessage);
}

// Event listeners
window.addEventListener('scroll', handleScroll);
menuToggle?.addEventListener('click', toggleMenu);
contactForm?.addEventListener('submit', handleFormSubmit);

// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('a[href^="#"]');
for (const link of navLinks) {
  link.addEventListener('click', function(this: HTMLAnchorElement, e: Event) {
    e.preventDefault();

    const href = this.getAttribute('href');
    if (!href) return;

    const targetElement = document.querySelector(href);
    if (!targetElement) return;

    window.scrollTo({
      top: targetElement.getBoundingClientRect().top + window.scrollY - 100,
      behavior: 'smooth'
    });

    // Close mobile menu if open
    if (nav.classList.contains('active')) {
      toggleMenu();
    }
  });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  handleScroll(); // Check initial scroll position
  animateSkillBars(); // Set up skill bar animations
});
