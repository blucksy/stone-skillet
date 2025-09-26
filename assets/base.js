class SlideShow extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.setupMarkup();
    this.initSwiper();
  }

  setupMarkup() {
    // Create base Swiper structure
    const swiperContainer = document.createElement("div");
    swiperContainer.classList.add("swiper");

    const wrapper = document.createElement("div");
    wrapper.classList.add("swiper-wrapper");

    // Move all existing children directly into the swiper wrapper
    Array.from(this.children).forEach((child) => {
      wrapper.appendChild(child);
    });

    swiperContainer.appendChild(wrapper);

    // Clear original content and append structured swiper
    this.innerHTML = "";
    this.appendChild(swiperContainer);
  }

  initSwiper() {
    const swiperEl = this.querySelector(".swiper");

    // Navigation buttons if data-button-id is provided
    let navigation = undefined;
    const buttonId = this.getAttribute("data-button-id");
    if (buttonId) {
      const prevEl = document.getElementById(`${buttonId}-prev`);
      const nextEl = document.getElementById(`${buttonId}-next`);
      if (prevEl && nextEl) {
        navigation = {
          prevEl,
          nextEl,
        };
      }
    }

    if (swiperEl) {
      this.swiper = new Swiper(swiperEl, {
        slidesPerView: "auto",
        spaceBetween: this.getAttribute("data-gap")
          ? parseInt(this.getAttribute("data-gap"))
          : 12,
        loop: false,
        centeredSlides: false,
        speed: 800,
        mousewheel: {
          forceToAxis: true,
        },
        ...(navigation && { navigation }),
        breakpoints: {
          0: {
            centeredSlides: true,
            loop: true,
          },
          768: {
            centeredSlides: false,
            loop: false,
          },
        },
      });
    }
  }
}

if (!customElements.get("swiper-gallery")) {
  customElements.define("swiper-gallery", SlideShow);
}
