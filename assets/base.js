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

    // Move all existing children into swiper-slide wrappers
    Array.from(this.children).forEach((child) => {
      const slide = document.createElement("div");
      slide.classList.add("swiper-slide");
      slide.appendChild(child);
      wrapper.appendChild(slide);
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

class SubscribeHelper extends HTMLElement {
  constructor() {
    super();
    this.subscribe = this.subscribe.bind(this);
  }

  subscribe() {
    const variantId = this.getAttribute("data-variant");
    const sellingPlanId = this.getAttribute("data-selling-plan");

    if (!variantId || !sellingPlanId) {
      console.error("Variant ID or Selling Plan ID not provided.");
      return;
    }

    // Clear the cart before adding the new item
    fetch("/cart/clear.js", {
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to clear the cart");
        }
        return response.json();
      })
      .then(() => {
        // Proceed to add the subscription item to the cart
        const formData = {
          items: [
            {
              id: variantId,
              quantity: 1,
              selling_plan: sellingPlanId,
            },
          ],
        };

        return fetch("/cart/add.js", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
          },
          body: JSON.stringify(formData),
        });
      })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            console.error("Error adding to cart:", errorData);
            throw new Error("Network response was not ok");
          });
        }
        return response.json();
      })
      .then(() => {
        window.location.href = "/checkout";
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }
}

if (!customElements.get("subscribe-helper")) {
  customElements.define("subscribe-helper", SubscribeHelper);
}
