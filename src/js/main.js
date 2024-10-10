// Custom scripts

// Smooth Scroll
const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
  smoothLink.addEventListener("click", function (e) {
    e.preventDefault();
    const id = smoothLink.getAttribute("href");

    document.querySelector(id).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}
document.addEventListener("DOMContentLoaded", function () {
  const nextButtons = document.querySelectorAll(".next-btn");
  const prevButtons = document.querySelectorAll(".prev-btn");
  const steps = document.querySelectorAll(".form-step");
  const indicators = document.querySelectorAll(".step");
  const inputs = document.querySelectorAll("input");
  const form = document.getElementById("form");
  const formSection = document.querySelector(".form");

  let currentStep = 0;

  function updateNextButtonState() {
    const currentInputs = steps[currentStep].querySelectorAll("input");
    const allFilled = Array.from(currentInputs).every(
      (input) => input.value.trim() !== ""
    );
    nextButtons[currentStep].disabled = !allFilled;
  }

  updateNextButtonState();

  nextButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (currentStep < steps.length - 1) {
        steps[currentStep].classList.remove("active");
        currentStep++;
        steps[currentStep].classList.add("active");

        if (indicators[currentStep]) {
          indicators[currentStep].classList.add("active");
        }

        updateNextButtonState();
      }
    });
  });

  prevButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (currentStep > 0) {
        steps[currentStep].classList.remove("active");
        currentStep--;

        steps[currentStep].classList.add("active");

        if (indicators[currentStep]) {
          indicators[currentStep].classList.add("active");
        }

        updateNextButtonState();
      }
    });
  });

  inputs.forEach((input) => {
    input.addEventListener("input", updateNextButtonState);
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(form);

    fetch("send_email.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        form.style.display = "none";

        const messageContainer = document.createElement("div");
        messageContainer.classList.add("success-message");
        messageContainer.innerHTML = `
            <div class="success-icon">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="64" height="64" rx="32" fill="url(#paint0_linear_89_202)" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M53.4239 16.9858C54.0544 17.6165 54.4086 18.4717 54.4086 19.3635C54.4086 20.2553 54.0544 21.1106 53.4239 21.7413L28.2161 46.949C27.883 47.2822 27.4875 47.5465 27.0522 47.7268C26.6169 47.9072 26.1504 48 25.6792 48C25.2081 48 24.7415 47.9072 24.3062 47.7268C23.8709 47.5465 23.4754 47.2822 23.1423 46.949L10.618 34.427C10.2968 34.1167 10.0406 33.7456 9.86435 33.3353C9.68809 32.925 9.59532 32.4837 9.59144 32.0371C9.58756 31.5906 9.67265 31.1477 9.84175 30.7344C10.0109 30.3211 10.2606 29.9456 10.5763 29.6298C10.8921 29.314 11.2676 29.0643 11.6809 28.8952C12.0942 28.7261 12.5371 28.641 12.9837 28.6449C13.4302 28.6488 13.8715 28.7416 14.2818 28.9178C14.6922 29.0941 15.0633 29.3503 15.3735 29.6715L25.6781 39.9761L48.6662 16.9858C48.9785 16.6733 49.3494 16.4254 49.7575 16.2562C50.1657 16.0871 50.6032 16 51.045 16C51.4869 16 51.9244 16.0871 52.3326 16.2562C52.7407 16.4254 53.1116 16.6733 53.4239 16.9858Z" fill="url(#paint1_linear_89_202)" />
                    <defs>
                        <linearGradient id="paint0_linear_89_202" x1="64" y1="64" x2="0" y2="0" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#9158D0" />
                            <stop offset="0.5" stop-color="#F180FF" />
                            <stop offset="1" stop-color="#FF7BE7" />
                        </linearGradient>
                        <linearGradient id="paint1_linear_89_202" x1="54.4086" y1="48" x2="24.1421" y2="5.61059" gradientUnits="userSpaceOnUse">
                            <stop stop-color="white" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <h2>${data}</h2>
        `;

        // Добавляем сообщение в контейнер
        formSection.appendChild(messageContainer);
      })
      .catch((error) => {
        console.error("Ошибка:", error);
        alert("Ошибка при отправке формы.");
      });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".conditions__item--btn");
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalText = document.getElementById("modal-text");
  const closeModal = document.querySelector(".close-btn");
  const body = document.body;

  const texts = {
    0: {
      text: "<ul><li>Графік роботи з 7:00 - 16:00</li><li>2 перерви на каву</li><li>Смачні ланчі за рахунок компанії щодня</li><li>Комфортна зона відпочинку з PlayStation</li></ul>",
    },
    1: {
      text: "Знаходимося в центрі міста",
    },
    2: {
      text: "Наша компанія зацікавлена у високому заробітку своїх співробітників. Для покращення результатів проводимо постійні корпоративні заходи, розіграші та багато інших бонусів. Індивідуальний підхід до кожного працівника та надання всіх умов для комфортного та стабільного розвитку.",
    },
    3: {
      text: "Заробітна плата складається з фіксованої ставки і % від закритої угоди. У середньому наші співробітники заробляють від 1500$ на місяць.",
    },
    4: {
      text: "Наша компанія регулярно проводить брифінги та лекції з професійними бізнес коучами для забезпечення додаткової мотивації та стрімкого кар'єрного зростання.<br><br> Не пропустіть свою можливість:<br><br> розпочавши з посади «лінійного менеджера», пройти навчання та стати старшим менеджером, що дасть змогу значно підвищити ваш дохід.<br><br> І це ще не все! Найвідповідальнішим і найталановитішим співробітникам ми пропонуємо можливість відкрити власну франшизу з нашою підтримкою і під нашим керівництвом.",
    },
    5: {
      text: "Якщо в тебе є люди з досвідом або вмотивовані та з великим бажанням розвиватися - пишіть нашому HR менеджеру для подальшої співпраці.",
    },
    6: {
      text: "Наша компанія руйнує стереотипи про типові умови інших офісів. Ми гарантуємо вашу безпеку, оскільки вона є пріоритетною для нас!",
    },
  };

  buttons.forEach((button, index) => {
    button.addEventListener("click", function () {
      modalText.innerHTML = texts[index].text;
      modal.style.display = "block";
      body.classList.add("locked");
    });
  });

  closeModal.addEventListener("click", function () {
    modal.style.display = "none";
    body.classList.remove("locked");
  });
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
      body.classList.remove("locked");
    }
  });
});
