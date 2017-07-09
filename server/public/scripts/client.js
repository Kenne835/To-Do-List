var editingBook = false;
var editingBookId; // Empty for now
var selectedBook;
//document ready here:
$(document).ready(function(){
  console.log('jQuery sourced.');
  //calling the functions:
  refreshBooks();
  addClickHandlers();
});
//adding eventlisteners to the buttons
function addClickHandlers() {
  console.log('Listeners added.');
  // Function called when the submit button is clicked
  $('#submitBtn').on('click', function(){
    console.log('Submit button clicked.');
    var book = {};
    book.task = $('#task').val();
    book.status = $('#status').val();
//if editingBook is true, the book.id becomes editingBookId,
//otherwise addBook runs and passes book in as an argument
    if(editingBook) {
      book.id = editingBookId;
      updateBook(book);
    } else {
      addBook(book);
    }
  });

  // Function called when delete button is clicked
  $('#viewTasks').on('click', '.deleteBtn', function(){
    // We attached the bookid as data on our button
    //When the delete button is clicked, the deleteBook function
    //is called and passes in bookId as an argument
    var bookId = $(this).data('bookid');
    console.log($(this));
    console.log('Delete book with id of', bookId);
    deleteBook(bookId);
  });

  $('#viewTasks').on('click', '.completeBtn', function () {
   console.log('complete button clicked');
   var updateTask = {};
   updateTask.id = $(this).data('taskid');
   updateTask.status = $(this).data('complete');
   if (updateTask.status == "yes"){
     updateTask.status = "no";
   } else if (updateTask.status == "no") {
     updateTask.status = "yes";
   }
   console.log(updateTask);

   $.ajax({
     url: '/todos',
     type: 'PUT',
     data: updateTask,
     success: function(response) {
       refreshBooks();
     }
   });
  });
}

// CREATE a.k.a. POST a.k.a. INSERT
function addBook(bookToAdd) {
  $.ajax({
    type: 'POST',
    url: '/todos',
    data: bookToAdd,
    success: function(response) {
      console.log('Response from server.');
      refreshBooks();
    }
  });
}

// READ a.k.a. GET a.k.a. SELECT
function refreshBooks() {
  $.ajax({
    type: 'GET',
    url: '/todos',
    success: function(response) {
      console.log(response);
      appendToDom(response.books);
    }
  });
}

// DELETE
function deleteBook(bookId) {
  // When using URL params, your url would be...
  // '/books/' + bookId

  // YOUR AJAX CODE HERE
$.ajax({
  type: 'DELETE',
  url: '/todos/' + bookId,
  success: function(response) {
    console.log(response);
    refreshBooks();
  }
});
}

// Append array of books to the DOM
function appendToDom(books) {
  // Remove books that currently exist in the table
  $('#viewTasks').empty();
  for(var i = 0; i < books.length; i += 1) {
    var book = books[i];
    // For each book, append a new row to our table
    $tr = $('<tr></tr>');
    $tr.data('book', book);
    $tr.append('<td>' + book.id + '</td>');
    $tr.append('<td>' + book.task + '</td>');
    $tr.append('<td>' + book.completionstatus + '</td>');
    $tr.append('<td><button class="completeBtn ' + book.completionstatus + '" data-taskid="' + book.id + '" data-complete="' + book.completionstatus + '">This task is now complete?</button></td>');
    $tr.append('<td><button class="deleteBtn" data-bookid="' + book.id + '">Delete</button></td>');
    $('#viewTasks').append($tr);
  }
}
