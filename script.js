//your code here
let isSelected = [];

const loadImages = () => {
  let images = [];
  const imagesContainer = document.querySelector(".imagesContainer");
  for (let i = 0; i < 5; i++) {
    const elem = `https://source.unsplash.com/random/200x30${i}`;
    const img = document.createElement("img");
    img.className = `img img${i + 1}`;
    img.src = elem;
    img.height = "300";
    img.width = "200";
    img.id = "img_" + i;
    img.onclick = handleClick;
    images[i] = img;
  }
  const randomImg =
    images[Math.round(Math.random() * 4 + 1) - 1].cloneNode(true);
  randomImg.id = "img_" + 5;
  randomImg.onclick = handleClick;
  images.splice(Math.round(Math.random() * 4 + 1), 0, randomImg);
  imagesContainer.innerHTML = "";
  imagesContainer.append(...images);
};

const handleClick = (e) => {
  e.preventDefault();
  if (isSelected.length < 2) {
    isSelected.push(e.target);
    e.target.setAttribute("data-selected", "");
    document.getElementById("reset").style.display = "inline";
  }
  if (isSelected.length === 2)
    document.getElementById("verify").style.display = "inline";
};

const handleReset = () => {
  for (let i = 0; i < isSelected.length; i++)
    isSelected[i].removeAttribute("data-selected", "");
  isSelected.length = 0;
  document.getElementById("reset").style.display = "none";
  document.getElementById("verify").style.display = "none";
  document.getElementById("para").innerText = "";
  loadImages();
};

const handleVerify = () => {
  const classInit = isSelected[0].classList[1];
  document.getElementById("para").innerText =
    isSelected[1].classList[1] === classInit
      ? "You are a human. Congratulations!"
      : (document.getElementById("para").innerText =
          "We can't verify you as a human. You selected the non-identical tiles.");
  document.getElementById("verify").style.display = "none";
};

loadImages();