let bookmarkNameInput = document.getElementById("siteName");
let urlInput = document.getElementById("url");
let submitBtn = document.getElementById("submitBtn");
let urlArr = [];
if (localStorage.getItem("urlArr")) {
  urlArr = JSON.parse(localStorage.getItem("urlArr"));
  display(urlArr);
}

submitBtn.addEventListener("click", addURL);

function addURL() {
  if (validationInputs(bookmarkNameInput) && validationInputs(urlInput)) {
    let newUrl = {
      bookmarkName: bookmarkNameInput.value,
      url: urlInput.value,
    };
    urlArr.push(newUrl);
    clearInputs();
    display(urlArr);
    localStorage.setItem("urlArr", JSON.stringify(urlArr));
  } else {
    document.getElementById("layout").classList.remove("d-none")
  }
}

function clearInputs() {
  bookmarkNameInput.value = "";
  urlInput.value = "";
  bookmarkNameInput.classList.remove("is-valid");
  bookmarkNameInput.classList.remove("is-invalid");
  urlInput.classList.remove("is-valid");
  urlInput.classList.remove("is-invalid");
}

function display(array) {
  var blackBox = "";
  for (let i = 0; i < array.length; i++) {
    blackBox += `<tr>
                <td class="py-2"><span>${i + 1}</span></td>
                <td class="py-2"><span>${array[i].bookmarkName}</span></td>
                <td class="py-2">
                  <button class="btn btn-success visitBtn" onclick="visitURL(this)">
                    <a href="${
                      array[i].url
                    }" class="text-decoration-none text-white"><i class="fa-solid fa-eye"></i> Visit</a>
    </button>
                </td>
                <td class="py-2">
                  <button class="btn btn-danger removeBtn" onclick="removeElement(${i})">
                    <i class="fa-solid fa-trash-can"></i> Delete
                  </button>
                </td>
              </tr>`;
  }
  document.getElementById("itemContainer").innerHTML = blackBox;
}

function removeElement(index) {
  urlArr.splice(index, 1);
  display(urlArr);
  localStorage.setItem("urlArr", JSON.stringify(urlArr));
}

function validationInputs(element) {
  let isValid;
  let ragex = {
    url: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/gm,
    siteName: /^[a-zA-Z0-9_-]{3,}$/gm,
  };
  isValid = ragex[element.id].test(element.value);
  editInputValidation(isValid, element);
  return isValid;
}

function editInputValidation(isValid, element) {
  if (isValid) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
  }
}

function closeTab() {
    document.getElementById("layout").classList.add("d-none")
}
