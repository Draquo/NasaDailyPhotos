function chooseCategoriesButton() {}
let dataWithID = [];
const getDataFromNasa = () => {
  fetch(
    `https://api.nasa.gov/planetary/apod?api_key=lxxVWb664W1Z1XEmHEsChUzLGFriIQKYZdXU8sdk&start_date=2022-11-20`
  )
    .then((response) => response.json())
    .then((data) => {
      dataWithID = data.filter((element, index) => (element.id = index));
      console.log(dataWithID);
    })
    .catch(function (error) {
      console.log(error);
    });
};
getDataFromNasa();

let tagPicture = [
  "Jupiter",
  "Comet",
  "Galaxy",
  "Saturn",
  "Mars",
  "Sun",
  "Moon",
  "All",
];
let tagType = ["image", "video"];
let dataInsert = [];

function next(){
  
}
function findTagInNasaData(dataWithID) {
  let allTags = [...tagPicture, ...tagType];
  dataInsert = [];
  console.log(allTags);
  dataWithID.forEach((element) => {
    allTags.forEach((tag) => {
      if (element.title.indexOf(tag) !== -1) {
        dataInsert.push(element);
      } else {
        if (allTags.includes("All")) {
          dataInsert.push(element);
        }
      }
    });
  });
  removeDuplicate();  
  return console.log(dataInsert);
}

function removeDuplicate(){
  const uniqueIdsToDisplay = [];
  dataInsert = dataInsert.filter((element) => {
    const isDuplicate = uniqueIdsToDisplay.includes(element.id);
    if (!isDuplicate) {
      uniqueIdsToDisplay.push(element.id);
      return true;
    }
    return false;
  });
}

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
//TODO proba stworzenia funkcji
// function addToggleAndRemovedArrayTag(
//   classElement,
//   nameToggle,
//   namearrayToRemove
// ) {
//   const getElement = document.querySelectorAll(`${classElement}`);
//   getElement.forEach((picture) => {
//     picture.addEventListener(`click`, function (event) {
//       picture.classList.toggle("reductionVisibility");
//       const nameButton = event.target.textContent;
//       `${namearrayToRemove}`.includes(nameButton)
//         ? (`${namearrayToRemove}`=`${namearrayToRemove}`.filter((item) => item !== nameButton))
//         : `${namearrayToRemove}`.push(nameButton);
//     });
//   });
// }
const picturesElement = document.querySelectorAll(`.picture`);
picturesElement.forEach((picture) => {
  picture.addEventListener(`click`, function (event) {
    picture.classList.toggle("reductionVisibility");
    const nameButton = event.target.textContent;
    tagPicture.includes(nameButton)
      ? (tagPicture = tagPicture.filter((item) => item !== nameButton))
      : tagPicture.push(nameButton);
    findTagInNasaData(dataWithID);
  });
});

const typesElement = document.querySelectorAll(`.type`);
typesElement.forEach((type) => {
  type.addEventListener(`click`, function (event) {
    type.classList.toggle("reductionVisibility");
    const nameButton = event.target.textContent;
    tagType.includes(nameButton)
      ? (tagType = tagType.filter((item) => item !== nameButton))
      : tagType.push(nameButton);
    findTagInNasaData(dataWithID);
  });
});
