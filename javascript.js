// javascript.js

// Set the library data structure to store books
let myLibrary = [
  { id: 1, title: 'Lonesome Dove', author: 'Larry McMurtry', pages: 960, status: 'reading' },
  { id: 2, title: 'Atomic Habits', author: 'James Clear', pages: 269, status: 'read' },
  { id: 3, title: 'The Three Body Problem', author: 'Liu Cixin', pages: 557, status: 'not read' },
];

// Initialize counter for generating IDs
let counter = 3;

// Function to generate unique book ID
function generateUniqueId() {
  counter++;
  return counter;
}


// Constructor function for creating Book objects
function Book(id, author, title, pages, status) {
  // Assigning properties to the object using 'this'
  this.id = id;
  this.author = author
  this.title = title
  this.pages = pages
  this.status = status
}


// Function to add books to the myLibrary data structure
function addBookToLibrary(author, title, pages, status) {
  // Generate unique ID for the book
  const uniqueId = generateUniqueId();

  // Create a new book object using the Book constructor
  const book = new Book(uniqueId, author, title, pages, status);

  // Add the new book to the library data structure
  myLibrary.push(book);

  // Update the UI
  displayLibrary();

  // Clear the form fields
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#pages').value = '';
  document.querySelector('#status').value = '';

  // Close the dialog modal
  dialog.close();
}

const formElement = document.querySelector('#add-book')

formElement.addEventListener('submit', function (event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get values from the form fields
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  const status = document.querySelector('#status').value;

  // Create a new book object and add to library
  addBookToLibrary(author, title, pages, status);
})


// Function to display the books on the UI
function displayLibrary() {
  // Get a reference to the table body element
  const tableBody = document.querySelector('#my-library');

  // Clear the table body
  tableBody.innerHTML = '';

  // Loop through library data and update the table rows
  myLibrary.forEach(book => {
    const newRow = document.createElement('tr');

    // Set the unique identifier to match the book's unique ID
    newRow.dataset.bookId = book.id;

    // HTML structure of the new row
    newRow.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td>
        <select name="status" class="status-dropdown">
          <option value="not read" ${book.status === 'not read' ? 'selected' : ''}>Not Read</option>
          <option value="read" ${book.status === 'read' ? 'selected' : ''}>Read</option>
          <option value="reading" ${book.status === 'reading' ? 'selected' : ''}>Reading</option>
        </select>
      </td>
      <td>
        <button class="remove-button" data-book-id="${book.id}">Remove</button>
      </td>
    `;

    // Add the new row
    tableBody.appendChild(newRow);

    // Add an event listener to the select element for updating read status
    const statusSelect = newRow.querySelector('.status-dropdown');
    statusSelect.addEventListener('change', function () {
      // Get the selected status value
      const selectedStatus = statusSelect.value;

      // Find the book by ID in myLibrary
      const selectedBook = myLibrary.find(currentBook => currentBook.id === book.id);

      // Update the book's status
      selectedBook.status = selectedStatus;

      // Call displayLibrary() to update the UI
      displayLibrary();
    })
  });
}

// Initialize the UI with some books
displayLibrary();

// Attach the event listeners for remove buttons when the page loads
window.addEventListener('load', attachRemoveButtonListeners);

// Function to attach event listener for the newly created remove button
function attachRemoveButtonListeners() {
  const tableBody = document.querySelector('#my-library');
  tableBody.addEventListener('click', function (event) {
    if (event.target.classList.contains('remove-button')) {

      // Get the book ID from the data-book-id attribute
      const bookId = event.target.dataset.bookId;

      // Remove book by ID
      removeBookById(parseInt(bookId));
    }
  });
}

// Function to remove a book from the library by its unique ID
function removeBookById(bookId) {
  myLibrary = myLibrary.filter(book => book.id !== bookId);

  // Update the UI after removing the book
  displayLibrary();

  // Reattach event listeners for remove buttons
  attachRemoveButtonListeners();
}


const dialog = document.querySelector("dialog");
const showFormButton = document.querySelector(".add-book-button");
const closeFormButton = document.querySelector(".close-button");

// "Add Book" button opens the dialog modally
showFormButton.addEventListener("click", () => {
  dialog.showModal();
});

// "Close (x)" button closes the dialog
closeFormButton.addEventListener("click", () => {
  dialog.close();
});

