var selectedTask;
//document ready here:
$(document).ready(function(){
  console.log('jQuery sourced.');
  //calling the functions:
  refreshList();
  addClickHandlers();
});
//adding eventlisteners to the buttons
function addClickHandlers() {
  console.log('Listeners added.');
  // Function called when the submit button is clicked
  $('#submitBtn').on('click', function(){
    console.log('Submit button clicked.');
    var todolist = {};
    todolist.task = $('#task').val();
    todolist.status = $('#status').val();
  addTask(todolist);
  });

  // Function called when delete button is clicked
  $('#viewTasks').on('click', '.deleteBtn', function(){
    var taskId = $(this).data('taskid');
    console.log($(this));
    console.log('Delete task with id of', taskId);
    if (!confirm("Do you really want to delete this?")){
    return false;
    }
    deleteTask(taskId);
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
       refreshList();
     }
   });
  });
}

// CREATE a.k.a. POST a.k.a. INSERT
function addTask(taskToAdd) {
  $.ajax({
    type: 'POST',
    url: '/todos',
    data: taskToAdd,
    success: function(response) {
      console.log('Response from server.');
      refreshList();
    }
  });
}

// READ a.k.a. GET a.k.a. SELECT
function refreshList() {
  $.ajax({
    type: 'GET',
    url: '/todos',
    success: function(response) {
      console.log(response);
      appendToDom(response.tasks);
    }
  });
}

// DELETE
function deleteTask(taskId) {

$.ajax({
  type: 'DELETE',
  url: '/todos/' + taskId,
  success: function(response) {
    console.log(response);
    refreshList();
  }
});
}

// Append array to the DOM
function appendToDom(taskList) {
  $('#viewTasks').empty();
  for(var i = 0; i < taskList.length; i += 1) {
    var list = taskList[i];
    $tr = $('<tr></tr>');
    $tr.data('list', list);
    $tr.append('<td>' + list.id + '</td>');
    $tr.append('<td>' + list.task + '</td>');
    $tr.append('<td>' + list.completionstatus + '</td>');
    $tr.append('<td><button class="completeBtn ' + list.completionstatus + '" data-taskid="' + list.id + '" data-complete="' + list.completionstatus + '">This task is now complete?</button></td>');
    $tr.append('<td><button class="deleteBtn" data-taskid="' + list.id + '">Delete</button></td>');
    $('#viewTasks').append($tr);
  }
}
