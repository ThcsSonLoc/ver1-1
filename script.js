
// LẤY CÁC PHẦN TỬ
const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");
const backToTop = document.getElementById("backToTop");


// HIỆU ỨNG HEADER KHI CUỘN
window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
        backToTop.classList.add("show");
    } else {
        header.classList.remove("scrolled");
        backToTop.classList.remove("show");
    }
});
 (() => {
  "use strict";

  const root = document.getElementById("mystery-quiz");
  if (!root || root.dataset.ready) return;
  root.dataset.ready = "1";

  const launch = root.querySelector("#mq-launch");
  const overlay = root.querySelector("#mq-overlay");
  const closeBtn = root.querySelector("#mq-close");

  const questionBox = root.querySelector("#mq-question-box");
  const questionText = root.querySelector("#mq-question");
  const answersBox = root.querySelector("#mq-answers");
  const feedback = root.querySelector("#mq-feedback");

  const progressText = root.querySelector("#mq-progress-text");
  const progressFill = root.querySelector("#mq-progress-fill");

  const fogPieces = [...root.querySelectorAll(".mq-fog-piece")];
  const finishBox = root.querySelector("#mq-finish");

  const questions = [
    {
      question: "Câu hỏi số 1: Nội dung câu hỏi của bạn?",
      options: ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
      answer: 0
    },
    {
      question: "Câu hỏi số 2: Nội dung câu hỏi của bạn?",
      options: ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
      answer: 1
    },
    {
      question: "Câu hỏi số 3: Nội dung câu hỏi của bạn?",
      options: ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
      answer: 2
    },
    {
      question: "Câu hỏi số 4: Nội dung câu hỏi của bạn?",
      options: ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
      answer: 3
    }
  ];

  let current = 0;
  let opened = 0;
  let answered = false;

  function resetGame() {
    current = 0;
    opened = 0;
    answered = false;

    fogPieces.forEach(piece => {
      piece.classList.remove("mq-opened");
    });

    questionBox.hidden = false;
    finishBox.hidden = true;

    progressFill.style.width = "0%";
    feedback.textContent = "";
    feedback.className = "mq-feedback";

    renderQuestion();
  }

  function openPopup() {
    resetGame();
    overlay.hidden = false;
    closeBtn.focus();
  }

  function closePopup() {
    overlay.hidden = true;
    launch.focus();
  }

  function updateProgress() {
    progressText.textContent = `Đã trả lời: ${opened} / 4`;
    progressFill.style.width = `${opened * 25}%`;
  }

  function renderQuestion() {
    answered = false;
    feedback.textContent = "";
    feedback.className = "mq-feedback";
    answersBox.innerHTML = "";

    const item = questions[current];
    questionText.textContent = item.question;

    item.options.forEach((option, index) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "mq-answer";
      btn.textContent = option;

      btn.addEventListener("click", () => {
        checkAnswer(index);
      });

      answersBox.appendChild(btn);
    });

    updateProgress();
  }

  function checkAnswer(selected) {
    if (answered) return;

    const correct = questions[current].answer;

    if (selected !== correct) {
      feedback.textContent = "❌ Chưa đúng! Hãy thử lại.";
      feedback.className = "mq-feedback mq-wrong";
      return;
    }

    answered = true;
    opened++;

    fogPieces[current].classList.add("mq-opened");

    feedback.textContent = "✅ Chính xác!";
    feedback.className = "mq-feedback mq-correct";

    answersBox.innerHTML = "";

    const nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.className = "mq-answer";
    nextBtn.textContent = current === 3
      ? "Hoàn thành"
      : "Câu tiếp theo ➜";

    nextBtn.addEventListener("click", () => {
      current++;

      if (current === 4) {
        finishGame();
      } else {
        renderQuestion();
      }
    });

    answersBox.appendChild(nextBtn);

    updateProgress();
  }

  function finishGame() {
    questionBox.hidden = true;
    finishBox.hidden = false;
    progressText.textContent = "Đã trả lời: 4 / 4";
    progressFill.style.width = "100%";
  }

  launch.addEventListener("click", openPopup);
  closeBtn.addEventListener("click", closePopup);

  overlay.addEventListener("click", event => {
    if (event.target === overlay) {
      closePopup();
    }
  });

  document.addEventListener("keydown", event => {
    if (!overlay.hidden && event.key === "Escape") {
      closePopup();
    }
  });

  resetGame();

})();

// ACTIVE MENU KHI CUỘN TRANG
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach(function (section) {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(function (link) {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});


// HIỆU ỨNG HIỆN NỘI DUNG KHI CUỘN
const observer = new IntersectionObserver(
    function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15
    }
);

document.querySelectorAll(
    ".intro-content, .architecture-card, .timeline-item, .visit-content"
).forEach(function (element) {
    element.classList.add("reveal");
    observer.observe(element);
});


// THÊM CSS CHO HIỆU ỨNG REVEAL
const revealStyle = document.createElement("style");

revealStyle.textContent = `
    .reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }

    .reveal.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;

document.head.appendChild(revealStyle);
