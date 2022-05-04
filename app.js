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
    const storeBook = [
      { title: "Book One ", author: "John Doe", isbn: "3434434" },
      { title: "Book Two ", author: "John Doe", isbn: "45545" },
    ];
    const books = storeBook;
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
}

//Store class : Handles Storage

//Event : Display a books
document.addEventListener("DOMContentLoaded", UI.displayBook);

//Event : Add a book
document.querySelector("#book-form").addEventListener("submit", (e) => {
  //prevent actual submit
  e.preventDefault();
  //get form values
  const title = document.querySelector("#title").innerHTML;
  const author = document.querySelector("#author").innerHTML;
  const isbn = document.querySelector("#isbn").innerHTML;

  //instatiate book
  const book = new Book(title, author, isbn);
  console.log(book);
});
//Event : Remove a book
