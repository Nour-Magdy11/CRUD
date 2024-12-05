// =====================================> var <=====================================  // 

var siteName = document.getElementById("bookmarkName");
var siteURL = document.getElementById("bookmarkURL");
var submitBtn = document.getElementById("submitBtn");
var tableContent = document.getElementById("tableContent");
var deleteBtns;
var visitBtns;
var closeBtn = document.getElementById("closeBtn");
var boxModal = document.querySelector(".table-info");
var bookmarks = [];

// =====================================>local Storage<=====================================  // 

if (localStorage.getItem("bookmarksList")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarksList"));
    for (var n = 0; n < bookmarks.length; n++) {
        displayBookmark(n);
    }
}

// =====================================>Display Function<=====================================  //

function displayBookmark(indexOfWebsite) {
    var userURL = bookmarks[indexOfWebsite].siteURL;
    var httpsRegex = /^https?:\/\//g;
    if (httpsRegex.test(userURL)) {
        validURL = userURL;
        fixedURL = validURL
            .split("")
            .splice(validURL.match(httpsRegex)[0].length)
            .join("");
    } else {
        var fixedURL = userURL;
        validURL = `https://${userURL}`;
    }

    var newBookmark = `<tr>
                <td>${indexOfWebsite + 1}</td>
                <td>${bookmarks[indexOfWebsite].siteName}</td>              
                <td><button class="btn btn-visit" data-index="${indexOfWebsite}"> <i class="fa-solid fa-eye pe-2"></i>Visit</button>
                </td>
                <td><button class="btn btn-delete pe-2" data-index="${indexOfWebsite}"><i class="fa-solid fa-trash-can"></i>Delete</button>
                </td>
            </tr>`;

    tableContent.innerHTML += newBookmark;

    // =====================================>Delet button<=====================================  //

    deleteBtns = document.querySelectorAll(".btn-delete");
    if (deleteBtns) {
        for (var m = 0; m < deleteBtns.length; m++) {
            deleteBtns[m].addEventListener("click", function (e) {
                deleteBookmark(e);
            });
        }
    }

    // =====================================>Visit button<=====================================  //

    visitBtns = document.querySelectorAll(".btn-visit");
    if (visitBtns) {
        for (var l = 0; l < visitBtns.length; l++) {
            visitBtns[l].addEventListener("click", function (e) {
                visitWebsite(e);
            });
        }
    }
}

// =====================================>Clear function<=====================================  //

function clearInput() {
    siteName.value = null;
    siteURL.value = null;
}


// =====================================>submit button<=====================================  //

function capitalize(str) {
    let strArr = str.split("");
    strArr[0] = strArr[0].toUpperCase();
    return strArr.join("");
}

submitBtn.addEventListener("click", function () {
    if (
        siteName.classList.contains("is-valid") &&
        siteURL.classList.contains("is-valid")
    ) {
        var bookmark = {
            siteName: capitalize(siteName.value),
            siteURL: siteURL.value,
        };
        bookmarks.push(bookmark);

        localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
        displayBookmark(bookmarks.length - 1);
        clearInput();
        siteName.classList.remove("is-valid");
        siteURL.classList.remove("is-valid");
    } else {
        boxModal.classList.remove("d-none");
    }
});

// =====================================>delete function<=====================================  //

function deleteBookmark(e) {
    tableContent.innerHTML = "";
    var deletedIndex = e.target.dataset.index;
    bookmarks.splice(deletedIndex, 1);
    for (var s = 0; s < bookmarks.length; s++) {
        displayBookmark(s);
    }
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
}

// =====================================>Visit function<=====================================  //

function visitWebsite(e) {
    var websiteIndex = e.target.dataset.index;
    var httpsRegex = /^https?:\/\//;
    if (httpsRegex.test(bookmarks[websiteIndex].siteURL)) {
        open(bookmarks[websiteIndex].siteURL);
    } else {
        open(`https://${bookmarks[websiteIndex].siteURL}`);
    }
}

// =====================================>REGEX<=====================================  //

var nameRegex = /^\w{7,}(\s+\w+)*$/;
var urlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

// =====================================>Validation<=====================================  //


siteName.addEventListener("input", function () {
    validate(siteName, nameRegex);
});

siteURL.addEventListener("input", function () {
    validate(siteURL, urlRegex);
});

function validate(element, regex) {
    var testRegex = regex;
    if (testRegex.test(element.value)) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
    } else {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
    }
}

// =====================================>close function<=====================================  //

function closeModal() {
    boxModal.classList.add("d-none");
}

closeBtn.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
    if (e.key == "Escape") {
        closeModal();
    }
});
