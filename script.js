let myLibrary = [];

const title = document.getElementById('title-input');
const author = document.getElementById('author-input');
const pages = document.getElementById('pages-input');
const haveRead = document.getElementById('read-input');
const modal = document.getElementsByClassName('modalBox')[0];
const closeBtn = document.getElementById('closeBtn');
const addBookButton = document.getElementById('addButton');
const bookGrid = document.getElementById('book-grid');


closeBtn.onclick = function() {
// console.log("should be closing");
    modal.style.display = "none";
}

addBookButton.onclick = function() {
    modal.style.display = "block";
    clearInputFields();
    // console.log("add");
}

window.onclick = function (event) {
    if(event.target == modal) {
        modal.style.display = "none";
    }
}


function Book(title, author, pages, haveRead) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.haveRead = haveRead,
    this.idNum = myLibrary.length,
    this.delete = function () {
        myLibrary.splice(this.idNum,1);
    }
    
}


// const Book = {
//     title: title,
//     author: author,
//     pages: pages,
//     haveRead: haveRead,
//     idNum: myLibrary.length,
// }


function addBookToLibrary() {
   let book = new Book(title.value, author.value, pages.value, haveRead.checked);
   myLibrary.push(book);
    addBookToList(title.value, author.value, pages.value, haveRead.checked);
   //alert('Book Added!');
   modal.style.display = "none";
   
   book.talk();

}

//addBookToLibrary("Moby Dick", "Herman Mellville", 952, false);

function clearInputFields() {
    title.value = "";
    author.value = "";
    pages.value = "";
    haveRead.checked = false;

}


function addBookToList(title, author, pages, haveRead) {
    let card = document.createElement("div");
    let cardTitle = document.createElement("p");
    let cardAuthor = document.createElement("p");
    let cardPages = document.createElement("p");
    let readDiv = document.createElement("div");
    let cardHaveRead = document.createElement('input');
    let cardHaveReadText = document.createElement("p");

    cardTitle.innerText = `Title: ${title}`;
    cardAuthor.innerText = `Authur: ${author}`;
    cardPages.innerText = `Pages: ${pages}`;
    cardHaveReadText.innerText = `Have Read? `;
    cardHaveRead.type = "checkbox";
    cardHaveRead.checked = haveRead;

    card.appendChild(cardTitle);
    card.appendChild(cardAuthor);
    card.appendChild(cardPages);
    card.appendChild(readDiv);
    readDiv.appendChild(cardHaveReadText);
    readDiv.appendChild(cardHaveRead);
    readDiv.classList.add('test');
    //card.appendChild(cardHaveRead);
    addEListener(cardHaveRead);
   

    //let cardTitle = title;
    card.classList.add("bookItem");
    bookGrid.appendChild(card);

}



// currently getting the event from the check change to affect the
// css and more importantly the OBJECT in the myLibrary array
function addEListener(checkbox) {
    checkbox.addEventListener('change', (e) => {
        console.log(e.target);
    });
}