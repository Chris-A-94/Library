const myLibrary = [];

function Book(title,author,pages,read)
{
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  
  this.info = function(){
    let readBook = "already read.";
    let notRead = "not read yet.";
    
    let toString = this.title+" by "+this.author+", "+this.pages+", ";
    
    if(read)
      return toString+readBook;
    else
      return toString+notRead;
  }
}

Book.prototype.addBookToArray = function(book){
    myLibrary.push(book);
}

function addBookToSelector(book)
{
    const selector = document.getElementById('books');
    let option = document.createElement('option');

    option.textContent = book.title;

    option.addEventListener('click',()=>{
        displayBook(book);
    })

    selector.appendChild(option);

}

function displayBook(book)
{
    const title = document.getElementById('actualTitle');
    const author = document.getElementById('actualAuthor');
    const pages = document.getElementById('numberPages');
    const read = document.getElementById('read');

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages;
    if(book.title === "")
    {
        read.textContent = "";
        return;
    }
        
    if(book.read)
        read.textContent = "Already read."
    else
        read.textContent = "Not read yet."
}


const songOfHope = new Book("Song of Hope", "Christian Almeida", 300,true);
const dividedLands = new Book("Divided Lands", "Christian & Ivan", 250,false);

songOfHope.addBookToArray(songOfHope);
dividedLands.addBookToArray(dividedLands);

addBookToSelector(myLibrary[1]);
addBookToSelector(myLibrary[0]);

const openForm = document.getElementById('openForm');
const closeForm = document.getElementById('closeForm');
const dialog = document.querySelector("dialog");
const bookAdder = document.getElementById('addingBook');

const noDisplay = document.getElementById('default');
const empty = new Book("","","");

noDisplay.addEventListener('click',()=>{
    displayBook(empty);
})

const inputTitle = document.getElementById('enterTitle');
const inputAuthor = document.getElementById('enterAuthor');
const inputPages = document.getElementById('enterPages');
let inputRead = document.querySelector('input[name="read"]:checked').value;

openForm.addEventListener('click',()=>{
    dialog.showModal();
    inputTitle.value = "";
    inputAuthor.value = "";
    inputPages.value = "";
})
closeForm.addEventListener('click',()=>{
    event.preventDefault();
    dialog.close();
})

bookAdder.addEventListener('click',()=>{
    event.preventDefault();
    if(inputTitle.value === "" || inputAuthor.value === "" || inputPages.value === "")
    {
        alert("All values are required.")
        return;
    }

    const newBook = new Book(inputTitle.value,inputAuthor.value,inputPages.value,inputRead);
    newBook.addBookToArray(newBook);
    addBookToSelector(newBook);
    dialog.close();
})