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

addBookToSelector(myLibrary[0]);
addBookToSelector(myLibrary[1]);

const openForm = document.getElementById('openForm');
const closeForm = document.getElementById('closeForm');
const dialog = document.querySelector("dialog");
const bookAdder = document.getElementById('addingBook');
const showAllBooks = document.getElementById('iteration');
const bookDeleter = document.getElementById('eliminate');
bookDeleter.style.backgroundColor = "grey";
const selector = document.getElementById('books');

const noDisplay = document.getElementById('default');
const empty = new Book("","","");

noDisplay.addEventListener('click',()=>{
    displayBook(empty);
})

selector.addEventListener('click',()=>{
    const title = document.getElementById('actualTitle');
    if(title.textContent === "")
        bookDeleter.style.backgroundColor = "grey";
    else
        bookDeleter.style.backgroundColor = "red";
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

showAllBooks.addEventListener('click',()=>{
   
    let i = 0;
    function loop(){
        displayBook(myLibrary[i]);
        i++;
        if(i < myLibrary.length)
        {
        setTimeout(()=>{            
            loop();
        },500);
         }
    }
    loop();
})

bookDeleter.addEventListener('click',()=>{
    const title = document.getElementById('actualTitle');
    if(title.textContent === "")
        return;
    let j;
    for(let i = 0; i < myLibrary.length; i++)
    {
        if(myLibrary[i].title === title.textContent)
            j = i;
    }

    const selector = document.getElementById('books');
    const options = selector.children;

    for (option of options)
    {
        if(option.textContent === myLibrary[j].title)
            selector.removeChild(option);
    }
    bookDeleter.style.backgroundColor = "grey";
    myLibrary.splice(j,1);

    
    const empty = new Book("","","");
    displayBook(empty);
    
})