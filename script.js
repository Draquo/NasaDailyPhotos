function chooseCategoriesButton() {}
let dataWithID = [];
const getDataFromNasa = () => {
  fetch(
    `https://api.nasa.gov/planetary/apod?api_key=lxxVWb664W1Z1XEmHEsChUzLGFriIQKYZdXU8sdk&start_date=2022-01-01`
  )
    .then((response) => response.json())
    .then((data) => {
      dataWithID = data.filter((element, index) => (element.id = index));
      console.log(dataWithID);
      findTagInNasaData(dataWithID);
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
  "Nebula",
  "All",
];
let tagType = ["image", "video"];
let dataInsert = [];
let index = 0;
const nextButtonElement = document.querySelector(".next");
const prevButtonElement = document.querySelector(".prev");
const buttonMovePictureElement = document.querySelector(".movePicture");

function next() {
  nextButtonElement.addEventListener("click", function () {
    if (index < dataInsert.length - 1) {
      index++;
    }
    if (index !== 0) {
      prevButtonElement.classList.remove("reductionVisibilityNextPrevButton");
      nextButtonElement.classList.remove("reductionVisibilityNextPrevButton");
    }
    console.log(dataInsert.length);
    if (index === dataInsert.length - 1) {
      nextButtonElement.classList.add("reductionVisibilityNextPrevButton");
    }
    if (index <= dataInsert.length - 1) {
      insertPictureOrMovies(dataInsert, index);
      console.log(index);
      console.log("test");
    }
  });
}

function prev() {
  prevButtonElement.addEventListener("click", function () {
    if (index > 0) {
      index--;
    }
    if (index < dataInsert.length - 1) {
      prevButtonElement.classList.remove("reductionVisibilityNextPrevButton");
      nextButtonElement.classList.remove("reductionVisibilityNextPrevButton");
    }
    console.log(dataInsert.length);
    if (index === 0) {
      prevButtonElement.classList.add("reductionVisibilityNextPrevButton");
    }
    if (index <= dataInsert.length - 1) {
      insertPictureOrMovies(dataInsert, index);
      console.log(index);
      console.log("test");
    }
  });
}

function insertPictureOrMovies(data, index) {
  let elementToRemoveA = document.querySelector("a");
  if (elementToRemoveA) {
    elementToRemoveA.remove();
  }
  let elementToRemoveIframe = document.querySelector("iframe");
  if (elementToRemoveIframe) {
    elementToRemoveIframe.remove();
  }
  let elementToRemoveSection = document.querySelector(".description");
  if (elementToRemoveSection) {
    elementToRemoveSection.remove();
  }
  data[index].media_type === "image"
    ? insertPicture(data, index)
    : insertMovie(data, index);
  insertDescription(data, index);
}

function insertMovie(data, index) {
  let elementToRemove = document.querySelector("a");
  if (elementToRemove) {
    elementToRemove.remove();
  }
  const parent = document.querySelector("section");
  const child = document.createElement("iframe");
  child.className = "secondDisplay";
  child.src = `${data[index].url}`;
  child.frameborder = "0";
  child.allow =
    "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
  child.allowfullscreen = true;
  parent.insertBefore(child, parent.firstChild);
}

function insertPicture(data, index) {
  const parent = document.querySelector("section");
  const child = document.createElement("a");
  child.href = `${data[index].url}`;
  child.target = "_blank";
  child.className = "secondDisplay";
  const img = document.createElement("img");
  img.src = `${data[index].url}`;
  img.alt = "Dew drop";
  child.appendChild(img);
  parent.insertBefore(child, parent.firstChild);
}
function insertDescription(data, index) {
  const parent = document.querySelector("section");
  const newSection = document.createElement("section");
  newSection.className = "description";
  const h2 = document.createElement("h2");
  h2.className = "title";
  const h2Text = `${data[index].title}`;
  let i = 0;
  const interval = setInterval(() => {
    h2.textContent += h2Text[i];
    i++;
    if (i === h2Text.length) {
      clearInterval(interval);
    }
  }, 100);

  const p = document.createElement("p");
  p.className = "explanation";
  const pText = document.createTextNode(`${data[index].explanation}`);
  p.appendChild(pText);
  newSection.appendChild(h2);
  newSection.appendChild(p);
  parent.insertBefore(newSection, parent.firstChild);
}

next();
prev();
//todo
function findTagInNasaData(dataWithID) {
  index = 0;
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

  dataInsert.length === 0
    ? nextButtonElement.classList.add("reductionVisibilityNextPrevButton")
    : nextButtonElement.classList.remove("reductionVisibilityNextPrevButton");
  insertPictureOrMovies(dataInsert, 0);

  return dataInsert;
}

function removeDuplicate() {
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
