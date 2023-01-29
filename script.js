let dataWithID = [];
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


let dataInsert = [];
let index = 0;
const parent = document.querySelector("section");
const child = document.createElement("iframe");
const nextButtonElement = document.querySelector(".next");
const prevButtonElement = document.querySelector(".prev");
const buttonMovePictureElement = document.querySelector(".movePicture");
const cardClassElement = document.querySelector(".card");
const inputElement = document.querySelector(".tagType")

function createChildElement(
  getParentElement,
  createChild,
  setChildClass,
  setText,
  SetAnotherChildClass
) {
  const parentElement = document.querySelector(`${getParentElement}`);
  const childElement = document.createElement(`${createChild}`);
  childElement.classList.add(`${setChildClass}`);
  childElement.classList.add(`${SetAnotherChildClass}`);
  childElement.innerHTML = `${setText}`;
  parentElement.appendChild(childElement);
}
const input = document.createElement("input");
input.type = "date";
input.id = "userDate";
inputElement.appendChild(input);

const inputDate = document.getElementById("userDate").value;
const form = document.createElement("form");
const submitButton = document.createElement("button");
submitButton.innerHTML = `Submit`;
submitButton.className = 'button'
form.appendChild(submitButton);
inputElement.appendChild(form);

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const inputDate = document.getElementById("userDate").value;
  console.log(inputDate);
  getDataFromNasa(inputDate);
});

tagPicture.forEach((element) => {
  createChildElement(".tagPicture", "button", "button", element, "picture");
});

const getDataFromNasa = (inputDate) => {
  fetch(
    `https://api.nasa.gov/planetary/apod?api_key=lxxVWb664W1Z1XEmHEsChUzLGFriIQKYZdXU8sdk&start_date=${inputDate}`
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



const picturesElement = document.querySelectorAll(`.picture`);
picturesElement.forEach((picture) => {
  picture.addEventListener(`click`, function (event) {
    picture.classList.toggle("reductionVisibility");
    const nameButton = event.target.textContent;
    tagPicture.includes(nameButton)
      ? (tagPicture = tagPicture.filter((item) => item !== nameButton))
      : tagPicture.push(nameButton);
    console.log(inputDate, "testInput");
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

function next() {
  nextButtonElement.addEventListener("click", function () {
    if (index < dataInsert.length - 1) {
      index++;
    }
    if (index !== 0) {
      prevButtonElement.classList.remove("reductionVisibilityNextPrevButton");
      nextButtonElement.classList.remove("reductionVisibilityNextPrevButton");
    }
    if (index === dataInsert.length - 1) {
      nextButtonElement.classList.add("reductionVisibilityNextPrevButton");
    }
    if (index <= dataInsert.length - 1) {
      insertCardsOnDisplay(dataInsert, index);
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
    if (index === 0) {
      prevButtonElement.classList.add("reductionVisibilityNextPrevButton");
    }
    if (index <= dataInsert.length - 1) {
      insertCardsOnDisplay(dataInsert, index);
    }
  });
}
next();
prev();

function insertCardsOnDisplay(data, index) {
  cardClassElement.innerHTML = "";
  data[index].media_type === "image"
    ? insertPictureCard(data, index)
    : insertMovieCard(data, index);
  insertDescriptionCard(data, index);
}

function insertMovieCard(data, index) {
  const child = document.createElement("iframe");
  child.className = "secondDisplay";
  child.src = `${data[index].url}`;
  child.frameborder = "0";
  child.allow =
    "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
  child.allowfullscreen = true;
  parent.insertBefore(child, parent.firstChild);
}

function insertPictureCard(data, index) {
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
function insertDescriptionCard(data, index) {
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

//todo
function findTagInNasaData(dataWithID) {
  index = 0;
  let allTags = [...tagPicture];
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
  insertCardsOnDisplay(dataInsert, 0);
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


