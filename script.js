const nameInput = document.getElementById("nameInput");
const titleInput = document.getElementById("titleInput");
const nameText = document.getElementById("nameText");
const titleText = document.getElementById("titleText");

const nameSize = document.getElementById("nameSize");
const titleSize = document.getElementById("titleSize");

const textColor = document.getElementById("textColor");

const nameFont = document.getElementById("nameFont");
const titleFont = document.getElementById("titleFont");

const dragButton = document.getElementById("dragButton");

let dragEnabled = false;

nameInput.addEventListener("input", () => {
  nameText.textContent = nameInput.value || "اسم الموظف";
});

titleInput.addEventListener("input", () => {
  titleText.textContent = titleInput.value || "";
});

nameSize.addEventListener("input", () => {
  nameText.style.fontSize = nameSize.value + "px";
});

titleSize.addEventListener("input", () => {
  titleText.style.fontSize = titleSize.value + "px";
});

textColor.addEventListener("change", () => {
  nameText.style.color = textColor.value;
  titleText.style.color = textColor.value;
});

nameFont.addEventListener("change", () => {
  nameText.style.fontFamily = nameFont.value;
});

titleFont.addEventListener("change", () => {
  titleText.style.fontFamily = titleFont.value;
});

function toggleDrag() {
  dragEnabled = !dragEnabled;

  if (dragEnabled) {
    dragButton.textContent = "إيقاف تحريك النصوص";
    dragButton.classList.add("active");
  } else {
    dragButton.textContent = "تفعيل تحريك النصوص";
    dragButton.classList.remove("active");
  }
}

function makeDraggable(element) {
  let isDragging = false;
  let offsetX, offsetY;

  element.addEventListener("mousedown", startDrag);
  element.addEventListener("touchstart", startDrag, { passive: false });

  function startDrag(e) {
    if (!dragEnabled) return;

    e.preventDefault();
    isDragging = true;

    const rect = element.getBoundingClientRect();

    if (e.type === "touchstart") {
      offsetX = e.touches[0].clientX - rect.left;
      offsetY = e.touches[0].clientY - rect.top;
    } else {
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
    }

    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", stopDrag);

    document.addEventListener("touchmove", drag, { passive: false });
    document.addEventListener("touchend", stopDrag);
  }

  function drag(e) {
    if (!isDragging) return;

    e.preventDefault();

    const card = document.getElementById("card");
    const cardRect = card.getBoundingClientRect();

    let x, y;

    if (e.type === "touchmove") {
      x = e.touches[0].clientX - cardRect.left - offsetX;
      y = e.touches[0].clientY - cardRect.top - offsetY;
    } else {
      x = e.clientX - cardRect.left - offsetX;
      y = e.clientY - cardRect.top - offsetY;
    }

    element.style.left = x + "px";
    element.style.top = y + "px";
    element.style.bottom = "auto";
    element.style.transform = "none";
  }

  function stopDrag() {
    isDragging = false;

    document.removeEventListener("mousemove", drag);
    document.removeEventListener("mouseup", stopDrag);

    document.removeEventListener("touchmove", drag);
    document.removeEventListener("touchend", stopDrag);
  }
}

makeDraggable(nameText);
makeDraggable(titleText);

function downloadCard() {
  html2canvas(document.getElementById("card"), {
    useCORS: true,
    scale: 3
  }).then(canvas => {
    const link = document.createElement("a");
    link.download = "autoworld-greeting-card.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}