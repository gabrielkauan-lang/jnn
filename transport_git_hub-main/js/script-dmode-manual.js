// -------------------
// Função para lidar com imagens de logo (fundo transparente)
// -------------------
function removeWhiteBackground(imgElement) {
  const img = imgElement;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  ctx.drawImage(img, 0, 0);

  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imgData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Se o pixel é branco ou quase branco
    if (r > 240 && g > 240 && b > 240) {
      data[i + 3] = 0; // torna transparente
    }
  }

  ctx.putImageData(imgData, 0, 0);

  img.src = canvas.toDataURL('image/png');
}

// -------------------
// Inicialização DOM
// -------------------
document.addEventListener("DOMContentLoaded", () => {
  // Remover fundo branco das logos
  const logos = document.querySelectorAll('.brand-logo');
  logos.forEach(img => {
    if (img.complete) {
      removeWhiteBackground(img);
    } else {
      img.onload = () => removeWhiteBackground(img);
    }
  });

  // -------------------
  // Modo Escuro
  // -------------------
  const darkBtn = document.getElementById("toggleDark");

  if (darkBtn) {
    darkBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      darkBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
      localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
    });

    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark");
      darkBtn.textContent = "☀️";
    }
  }

  // -------------------
  // Menu Hamburger Mobile
  // -------------------
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav");

  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }

  // -------------------
  // Dropdowns (opcional: clique em vez de hover mobile)
  // -------------------
  const dropdowns = document.querySelectorAll(".dropdown");
  dropdowns.forEach(drop => {
    const btn = drop.querySelector("button");
    btn.addEventListener("click", e => {
      // Fecha outros dropdowns
      dropdowns.forEach(d => {
        if (d !== drop) d.classList.remove("open");
      });
      drop.classList.toggle("open");
      e.stopPropagation();
    });
  });

  // Fecha dropdowns ao clicar fora
  document.addEventListener("click", () => {
    dropdowns.forEach(d => d.classList.remove("open"));
  });
});
