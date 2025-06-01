document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');
  
    menuIcon?.addEventListener('click', () => {
      navLinks?.classList.toggle('active');
      menuIcon.classList.toggle('active');
    });
  
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
  
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
  
        if (navLinks?.classList.contains('active')) {
          navLinks.classList.remove('active');
          menuIcon.classList.remove('active');
        }
      });
    });
  
    // Contact Form Submission with Validation and Reset
    const form = document.querySelector('.contact-form');
  
    form?.addEventListener('submit', async function (e) {
      e.preventDefault();
  
      const nameInput = form.querySelector('input[name="name"]');
      const emailInput = form.querySelector('input[name="email"]');
      const messageInput = form.querySelector('textarea[name="message"]');
  
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let isValid = true;
  
      if (!nameInput.value.trim()) {
        alert('Please enter your name.');
        nameInput.focus();
        isValid = false;
      } else if (!emailPattern.test(emailInput.value.trim())) {
        alert('Please enter a valid email address.');
        emailInput.focus();
        isValid = false;
      } else if (!messageInput.value.trim()) {
        alert('Please enter your message.');
        messageInput.focus();
        isValid = false;
      }
  
      if (!isValid) return;
  
      const formData = new FormData(form);
  
      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
  
        if (response.ok) {
          alert("Thank you! Your message has been sent successfully.");
          form.reset(); // ✅ Clear the form
        } else {
          alert("Oops! Something went wrong. Please try again.");
        }
      } catch (error) {
        alert("Network error! Please try again later.");
      }
    });
  
    // Dynamic Animations on Scroll (Throttled)
    const sections = document.querySelectorAll('section');
    let scrollTimeout;
  
    const handleScroll = () => {
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
  
        if (sectionTop < windowHeight * 0.8) {
          section.classList.add('active');
        } else {
          section.classList.remove('active');
        }
      });
    };
  
    document.addEventListener('scroll', () => {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          scrollTimeout = null;
          handleScroll();
        }, 100);
      }
    });
  });
  