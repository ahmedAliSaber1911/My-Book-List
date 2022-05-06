//book class : represent a book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

//Ui class : handle ui tasks
class UI {
  static displayBook() {
   
    const books = store.getBooks();
    books.forEach((book) => UI.addBookToList(book));
  }
  static addBookToList(book) {
    const list = document.querySelector("#book-list");

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href='#' class ="btn btn-danger delete btn-sm">X</a></td>
      `;
    list.appendChild(row);
  }
  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
  static deleteBook(target) {
    if (target.classList.contains("delete")) {
      target.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);
    // vanish in 3 seconds
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }
}

//Store class : Handles Storage
class store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books")); // local storage only store string so i use json to store it as array
    }
    return books;
  }
  static addBook(book) {
    const books = store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books)); //to add the new book to the local storage
  }
  static removeBook(isbn) {
    const books = store.getBooks();
    books.forEach((book, index)=>{
      if(book.isbn === isbn){
        books.splice(index , 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books))
  }
}
//Event : Display a books
document.addEventListener("DOMContentLoaded", UI.displayBook);

//Event : Add a book
document.querySelector("#book-form").addEventListener("submit", (e) => {
  //prevent actual submit
  e.preventDefault();
  //get form values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  //validate
  if (title === "" || author === "" || isbn === "") {
    UI.showAlert("please fill in all fields", "danger");
  } else {
    //instatiate book
    const book = new Book(title, author, isbn);
    //add a book to the ui
    UI.addBookToList(book);
    //add book to store
    store.addBook(book);
    //show success message
    UI.showAlert("Book Added ", "success");
    //clear fields
    UI.clearFields();
  }
});
//Event : Remove a book

document.querySelector("#book-list").addEventListener("click", (e) => {
  //remove book from ui
  UI.deleteBook(e.target);
  //remove book from the local storage 
  store.removeBook(e.target.parentElement.previousElementSibling.innerHTML);
  UI.showAlert("Book Removed ", "success");
});
