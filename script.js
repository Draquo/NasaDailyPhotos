// const buttonCategoriesElement = document.querySelectorAll('.categories')
// const buttonTypeElement = document.querySelectorAll('.type')
// const buttonMovePictureElement = document.querySelectorAll('.movePicture')
const tagElement = document.getElementById("tag");
console.log(tagElement);

function chooseCategoriesButton() {}
const getDataFromNasa = () => {
  fetch(
    `https://api.nasa.gov/planetary/apod?api_key=lxxVWb664W1Z1XEmHEsChUzLGFriIQKYZdXU8sdk&start_date=2022-06-20`
  )
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch(function (error) {
      console.log(error);
    });
};

getDataFromNasa();

const tagPicture = [
  "Jupiter",
  "Comet",
  "Galaxy",
  "Saturn",
  "Mars",
  "Sun",
  "Moon",
  "Others",
];

const tagType = ["image", "video"];

function addChild(parent, child, childClass, text, anotherChildClass) {
  const parentElement = document.querySelector(`${parent}`);
  const childElement = document.createElement(`${child}`);
  childElement.classList.add(`${childClass}`);
  childElement.classList.add(`${anotherChildClass}`);
  childElement.innerHTML = `${text}`;
  parentElement.appendChild(childElement);
}

tagPicture.forEach((element) => {
  addChild(".tagPicture", "button", "button", element, "picture");
});

tagType.forEach((element) => {
  addChild(".tagType", "button", "button", element, "type");
});

const picturesElement = document.querySelectorAll(`.picture`);
picturesElement.forEach((picture) => {
  picture.addEventListener(`click`, function () {
    picture.classList.toggle("smoof");
  });
});

const typesElement = document.querySelectorAll(`.type`);
typesElement.forEach((type) => {
  type.addEventListener(`click`, function () {
    type.classList.toggle("smoof");
  });
});
// picturesElement.forEach((picture) => {
//   picture.addEventListener(`click`, function () {
//     picture.classList.toggle("smoof");
//   });
// });
