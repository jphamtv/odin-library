// javascript.js

let myLibrary = [
  {id: 1, title: 'Lonesome Dove', author: 'Larry McMurtry', pages: 960, status: 'reading'},
  {id: 2, title: 'Atomic Habits', author: 'James Clear', pages: 269, status: 'read'},
  {id: 3, title: 'The Three Body Problem', author: 'Liu Cixin', pages: 557, status: 'not read'},
];

let counter = 3;

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


// Function to add books to the library data structure
function addBookToLibrary (author, title, pages, status) {
  // Generate unique ID for the book
  const uniqueId = generateUniqueId();

  // Create a new book object using the Book constructor
  const book = new Book(uniqueId, author, title, pages, status);
  
  // Add the new book to the library data structure
  myLibrary.push(book);
  
  // Update the UI
  displayLibrary();

  // Clear the form fields, or close the dialog window
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#pages').value = '';
  document.querySelector('#status').value = '';    
  
  // Optionally, return a message
  console.log("Book added successfully!");
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
  
  // Create a new book object
  addBookToLibrary(author, title, pages, status);
})


// Function to display the books on the UI
function displayLibrary () {
  // Get a reference to the table body element
  const tableBody = document.querySelector('#my-library');

  // Clear the table body
  tableBody.innerHTML = ''; 

  // Loop through library data and update the table rows
  myLibrary.forEach(book => {
    // Check if a row already exists based on this book's title
    const newRow = document.createElement('tr');

    // Set a unique identifier
    newRow.dataset.bookId = book.id; 

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

    tableBody.appendChild(newRow);          

    // Add an event listener to the select element for updating read status
    const statusSelect = newRow.querySelector('.status-dropdown');
    statusSelect.addEventListener('change', function () {
      // Get the selected status value
      const selectedStatus = statusSelect.value;

      // Find the book by ID in myLibrary
      const selectedBook = myLibrary.find(b => b.id === book.id);

      // Update the book's status
      selectedBook.status = selectedStatus;

      // Call displayLibrary to update the UI
      displayLibrary();
    })

  });
}

displayLibrary();

// Attach the event listeners for remove buttons when the page loads
window.addEventListener('load', attachRemoveButtonListeners);

// Function to attach event listener for the newly created remove button
function attachRemoveButtonListeners() {
  const tableBody = document.querySelector('#my-library');
  tableBody.addEventListener('click', function (event) {
    if (event.target.classList.contains('remove-button')) {
      // Get the book ID from the data-book-id attribute
      console.log("clicked");
      const bookId = event.target.dataset.bookId;
      console.log(`book id: ${bookId}`);

      // Remove book by ID
      removeBookById(parseInt(bookId));
      }
  });
}

// Function to remove by by ID
function removeBookById(bookId) {
  console.log('removeBookById triggered');
  myLibrary = myLibrary.filter(book => book.id !== bookId);
  console.log(myLibrary);
  
  // Update the UI after removing the book
  displayLibrary();
  console.log("displayLibrary triggered");

  attachRemoveButtonListeners();
}

