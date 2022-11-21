let myLibrary = [];

const title = document.getElementById('title-input');
const author = document.getElementById('author-input');
const pages = document.getElementById('pages-input');
const haveRead = document.getElementById('read-input');
const modal = document.getElementsByClassName('modalBox')[0];
const closeBtn = document.getElementById('closeBtn');
const addBookButton = document.getElementById('addButton');
const bookGrid = document.getElementById('book-grid');
const bookCountDisplay = document.getElementById('bookCount');
const readCountDisplay = document.getElementById('readCount');
const unreadCountDisplay = document.getElementById('unreadCount');

let bookCount = 0;
let read = 0;
let unread = 0;

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


function Book(title, author, pages, haveRead, idNum) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.haveRead = haveRead,
    this.idNum = idNum;
    
}

function addBookToLibrary() {
   let book = new Book(title.value, author.value, pages.value, haveRead.checked, bookCount);
    myLibrary.push(book);
    modal.style.display = "none";
    drawGrid();
}

function clearInputFields() {
    title.value = "";
    author.value = "";
    pages.value = "";
    haveRead.checked = false;
}


function addBookToList(title, author, pages, haveRead, i) {
    let card = document.createElement("div");
    let cardTitle = document.createElement("p");
    let cardAuthor = document.createElement("p");
    let cardPages = document.createElement("p");
    let readDiv = document.createElement("div");
    let cardHaveRead = document.createElement('input');
    let cardHaveReadText = document.createElement("p");
    let deleteButton = document.createElement("div");
    
    deleteButton.innerText = "X";
    cardTitle.innerText = `Title: ${title}`;
    cardAuthor.innerText = `Authur: ${author}`;
    cardPages.innerText = `Pages: ${pages}`;
    cardHaveReadText.innerText = `Have Read? `;
    cardHaveRead.type = "checkbox";
    cardHaveRead.checked = haveRead;


    card.appendChild(deleteButton);
    card.setAttribute('data-id', i);
    deleteButton.setAttribute("id", "bookDelete"); 
    card.appendChild(cardTitle);
    card.appendChild(cardAuthor);
    card.appendChild(cardPages);
    card.appendChild(readDiv);
    readDiv.appendChild(cardHaveReadText);
    readDiv.appendChild(cardHaveRead);
    readDiv.classList.add('read');
    //addEListener(cardHaveRead);
    

    card.classList.add("bookItem");
    bookGrid.appendChild(card);
    deleteButton.addEventListener('click', (e) => {
        deleteBook(e);
    });
   cardHaveRead.addEventListener('change', (e) => {
        changeReadStatus(e);
   })
}

function deleteBook(e) {

    //remove item from DOM
    e.target.parentElement.remove();
  
    // console.log(e.path[2].dataset);
   //
   myLibrary.splice(e.idNum, 1);
   console.log("e.idnum" + e.idNum);
   //console.log(e.parentElement.getAttribute('data-id'));
    //myLibrary.splice(e.parentElement.getAttribute('data-id'), -1);
    
    drawGrid();
}

// currently getting the event from the check change to affect the
// css and more importantly the OBJECT in the myLibrary array
function addEListener(checkbox) {
    checkbox.addEventListener('change', (e) => {
        console.log(e.target);
    });
}


function drawGrid() {
    bookGrid.innerHTML = "";
    bookCount = 0;
    for (let i = 0; i < myLibrary.length; i++) {
        // addBookToList(title.value, author.value, pages.value, haveRead.checked);
        addBookToList(myLibrary[i].title, myLibrary[i].author, myLibrary[i].pages, myLibrary[i].haveRead, i);
        myLibrary[i].idNum = i;
        bookCount++;
    }  
}


function changeReadStatus(e) {
    if(e.target.checked === true) {
        //read
        console.log("yup!");
        e.target.parentElement.parentElement.style.backgroundColor = 'red';
        updateBookCounter(true);

    } else {
        console.log("nope!");
        e.target.parentElement.parentElement.style.backgroundColor = 'blue';
        updateBookCounter(false);
    }
    
}

function test () {
    for(books in myLibrary) {
        console.log(books);
    }
}

test();
function updateBookCounter (yesOrNo) {
    if (yesOrNo) {
        read++;
    } else {
        unread ++;
    }
}