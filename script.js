
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

  // ==============================
  // 1. CÂU HỎI
  // ==============================

  const questions = [
    {
      question: "Câu hỏi số 1: Nội dung câu hỏi của bạn?",
      answers: [
        "Đáp án A",
        "Đáp án B",
        "Đáp án C",
        "Đáp án D"
      ],
      correct: 0
    },

    {
      question: "Câu hỏi số 2: Nội dung câu hỏi của bạn?",
      answers: [
        "Đáp án A",
        "Đáp án B",
        "Đáp án C",
        "Đáp án D"
      ],
      correct: 1
    },

    {
      question: "Câu hỏi số 3: Nội dung câu hỏi của bạn?",
      answers: [
        "Đáp án A",
        "Đáp án B",
        "Đáp án C",
        "Đáp án D"
      ],
      correct: 2
    },

    {
      question: "Câu hỏi số 4: Nội dung câu hỏi của bạn?",
      answers: [
        "Đáp án A",
        "Đáp án B",
        "Đáp án C",
        "Đáp án D"
      ],
      correct: 3
    }
  ];


  // ==============================
  // 2. LẤY CÁC PHẦN HTML
  // ==============================

  const root = document.getElementById("picture-quiz");

  if (!root) {
    console.error("Không tìm thấy #picture-quiz");
    return;
  }

  const board = root.querySelector("#pq-board");
  const tiles = root.querySelectorAll(".pq-tile");

  const modal = root.querySelector("#pq-modal");
  const closeButton = root.querySelector("#pq-close");

  const questionNumber = root.querySelector("#pq-number");
  const questionText = root.querySelector("#pq-question");

  const answersBox = root.querySelector("#pq-answers");
  const feedback = root.querySelector("#pq-feedback");

  const countText = root.querySelector("#pq-count");

  const victory = root.querySelector("#pq-victory");



  // ==============================
  // 3. TRẠNG THÁI GAME
  // ==============================

  let currentQuestion = -1;

  const completed = [false, false, false, false];

  let locked = false;


  // ==============================
  // 4. CẬP NHẬT TIẾN ĐỘ
  // ==============================

  function updateProgress() {
    const count = completed.filter(Boolean).length;

    countText.textContent = count + " / 4";

    if (count === 4) {
      victory.classList.add("pq-show");
    }
  }


  // ==============================
  // 5. MỞ CÂU HỎI
  // ==============================

  function openQuestion(index) {
    if (locked) return;

    if (index < 0 || index >= questions.length) return;

    // Nếu câu này đã trả lời đúng
    if (completed[index]) return;

    currentQuestion = index;

    const data = questions[index];

    questionNumber.textContent =
      "CÂU HỎI " + (index + 1);

    questionText.textContent = data.question;

    answersBox.innerHTML = "";

    feedback.textContent = "";
    feedback.className = "pq-feedback";

    // Tạo 4 đáp án
    data.answers.forEach((answer, answerIndex) => {
      const button = document.createElement("button");

      button.className = "pq-answer";
      button.textContent =
        String.fromCharCode(65 + answerIndex) + ". " + answer;

      button.addEventListener("click", () => {
        checkAnswer(answerIndex, button);
      });

      answersBox.appendChild(button);
    });

    modal.classList.add("pq-active");
  }


  // ==============================
  // 6. KIỂM TRA ĐÁP ÁN
  // ==============================

  function checkAnswer(answerIndex, button) {
    if (locked) return;

    const data = questions[currentQuestion];

    const answerButtons =
      answersBox.querySelectorAll(".pq-answer");

    // Trả lời đúng
    if (answerIndex === data.correct) {
      locked = true;

      button.classList.add("pq-correct");

      feedback.textContent = "🎉 Chính xác! Bạn đã mở một phần ảnh!";
      feedback.className = "pq-feedback pq-success";

      completed[currentQuestion] = true;

      // Ẩn ô tương ứng
      tiles[currentQuestion].classList.add("pq-revealed");

      // Cập nhật số câu đã hoàn thành
      updateProgress();

      setTimeout(() => {
        modal.classList.remove("pq-active");
        locked = false;
        currentQuestion = -1;
      }, 1000);

    } else {
      // Trả lời sai
      button.classList.add("pq-wrong");

      feedback.textContent = "❌ Chưa chính xác! Hãy thử lại.";
      feedback.className = "pq-feedback pq-error";

      // Không khóa các đáp án khác
      button.disabled = true;
    }
  }


  // ==============================
  // 7. SỰ KIỆN BẤM 4 Ô
  // ==============================

  tiles.forEach((tile, index) => {
    tile.addEventListener("click", () => {
      openQuestion(index);
    });
  });


  // ==============================
  // 8. ĐÓNG CỬA SỔ
  // ==============================

  closeButton.addEventListener("click", () => {
    if (locked) return;

    modal.classList.remove("pq-active");

    currentQuestion = -1;
  });

  // Bấm ra ngoài cửa sổ thì đóng
  modal.addEventListener("click", (event) => {
    if (event.target === modal && !locked) {
      modal.classList.remove("pq-active");
      currentQuestion = -1;
    }
  });

  // Bấm ESC
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      modal.classList.contains("pq-active") &&
      !locked
    ) {
      modal.classList.remove("pq-active");
      currentQuestion = -1;
    }
  });


  // ==============================
  // 9. CHƠI LẠI
  // ==============================

  function resetGame() {
    locked = false;
    currentQuestion = -1;

    completed.fill(false);

    tiles.forEach(tile => {
      tile.classList.remove("pq-revealed");
    });

    modal.classList.remove("pq-active");

    victory.classList.remove("pq-show");

    feedback.textContent = "";
    feedback.className = "pq-feedback";

    updateProgress();
  }




  // ==============================
  // 10. KHỞI ĐỘNG
  // ==============================

  updateProgress();

  console.log("Picture Quiz đã khởi động thành công!");
})();

// NÚT QUAY LẠI ĐẦU TRANG
backToTop.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


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
