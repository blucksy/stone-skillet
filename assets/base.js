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
      });
    }
  }
}

if (!customElements.get("swiper-gallery")) {
  customElements.define("swiper-gallery", SlideShow);
}
