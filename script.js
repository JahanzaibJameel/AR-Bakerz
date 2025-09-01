particlesJS("particles-js", {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: "#ffffff",
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000",
      },
      polygon: {
        nb_sides: 5,
      },
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab",
      },
      onclick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
});

var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 20,
    stretch: 0,
    depth: 200,
    modifier: 1,
    slideShadows: true,
  },
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  setTimeout(() => {
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  }, 1500);

  loadLazyImages();
});

const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });

    if (!mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.add("hidden");
    }
  });
});

const backToTopButton = document.getElementById("back-to-top");
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.remove("hidden");
  } else {
    backToTopButton.classList.add("hidden");
  }
});

const categoryButtons = document.querySelectorAll(".category-btn");
const menuItems = document.querySelectorAll(".cake-card");

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    categoryButtons.forEach((btn) => {
      btn.classList.remove("bg-primary", "text-white");
      btn.classList.add("bg-white", "text-gray-700");
    });

    button.classList.remove("bg-white", "text-gray-700");
    button.classList.add("bg-primary", "text-white");

    const category = button.getAttribute("data-category");

    menuItems.forEach((item) => {
      if (
        category === "all" ||
        item.getAttribute("data-category") === category
      ) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

const newsletterForm = document.querySelectorAll("form")[1];
if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    alert(
      `Thank you for subscribing with ${email}! You'll receive our next newsletter soon.`
    );
    newsletterForm.reset();
  });
}

const orderForm = document.getElementById("order-form");
if (orderForm) {
  orderForm.addEventListener("submit", (e) => {
    e.preventDefault();

    orderForm.classList.add("hidden");
    document.getElementById("form-success").classList.remove("hidden");

    document.getElementById("form-success").scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  });
}

const statsItems = document.querySelectorAll(".stats-number[data-count]");

function animateCounters() {
  statsItems.forEach((item) => {
    const target = parseInt(item.getAttribute("data-count"));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const counter = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(counter);
      }
      item.textContent = Math.floor(current);
    }, 16);
  });
}

function loadLazyImages() {
  const lazyImages = document.querySelectorAll(".lazy-load");

  lazyImages.forEach((img) => {
    if (img.complete) {
      img.classList.add("loaded");
    } else {
      img.addEventListener("load", () => {
        img.classList.add("loaded");
      });
      img.addEventListener("error", () => {
        console.error("Error loading image:", img.src);
      });
    }
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");

        if (entry.target.classList.contains("stats-item")) {
          animateCounters();
          observer.unobserve(entry.target);
        }

        if (entry.target.classList.contains("section-title")) {
          observer.unobserve(entry.target);
        }

        if (entry.target.classList.contains("scale-in")) {
          observer.unobserve(entry.target);
        }

        if (
          entry.target.classList.contains("slide-in-left") ||
          entry.target.classList.contains("slide-in-right")
        ) {
          observer.unobserve(entry.target);
        }

        if (entry.target.classList.contains("zoom-in")) {
          observer.unobserve(entry.target);
        }

        if (
          entry.target.classList.contains("lazy-load") &&
          !entry.target.classList.contains("loaded")
        ) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }
          img.classList.add("loaded");
        }
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px 100px 0px",
  }
);

document
  .querySelectorAll(
    ".section-title, .stats-item, .testimonial-card, .order-steps li, .scale-in, .slide-in-left, .slide-in-right, .zoom-in, .lazy-load"
  )
  .forEach((el) => {
    observer.observe(el);
  });

window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

document.querySelectorAll(".enhanced-hover").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const angleX = (y - centerY) / 20;
    const angleY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-10px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
  });
});

document.querySelectorAll(".btn-primary, .btn-outline").forEach((button) => {
  button.addEventListener("mouseenter", () => {
    button.classList.add("shake");
    setTimeout(() => {
      button.classList.remove("shake");
    }, 500);
  });
});

document.querySelectorAll(".form-input").forEach((input) => {
  input.addEventListener("focus", () => {
    input.classList.add("jello");
    setTimeout(() => {
      input.classList.remove("jello");
    }, 800);
  });
});

const heroVideo = document.getElementById("hero-video");
if (heroVideo) {
  observer.observe(heroVideo);
  heroVideo.addEventListener("loadeddata", () => {
    heroVideo.classList.add("loaded");
  });
}
