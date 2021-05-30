console.log("js loaded");

$(document).ready(function () {
  console.log("JQ loaded");

// function to hold click listener
  clickListeners();

// get database task list to client side
  getTaskList();
})

function clickListeners(){
    // on click update DOM with inputted task
    $('#addBtn').on('click', handleAdd())

    // dynamic click listener for delete button
    $('.viewList').on('click', '.deleteBtn', deleteHandler())

    // dynamic click listener for checkbox
}


// GET route request
function getTaskList(){
    console.log("Displaying Task List");
    // ajax call to server to get task
    $.ajax({
      method: 'GET',
      url: '/list'
    }).then( response => {
      // console log the response
      console.log(response);
      // display task list by calling render function
      renderTaskList(response);
    }).catch( err => {
      // console log the error
      console.log('Error in GET Route', err);
    });
} // end getTaskList

function renderTaskList( lists ){
    // empty DOM to update after each input
    $('#viewList').empty();

    // loop through list for DB values
    for (let i = 0; i < lists.length; i++) {
        let list = lists[i];
    // append to DOM each task added to list
    $('#viewList').append(`
    <tr>
      <td>${list.task}</td>
      <td>
      ${list.completed}
      <input type="checkbox" class="checkTask" data-id="${list.id}">
      </td>
      <td><button class="deleteBtn" data-id="${list.id}">Delete</button></td>
    </tr>
    `);
    } // end for loop
} // end renderTaskList


// function for click listener to add task
function handleAdd(){
    console.log('clicked on Submit button');

    let newTask = {
        task: $('#taskIn').val()
    }
    // run addTask with newTask variable
    addTask(newTask);
} // end handleAdd

// POST route request
function addTask(newTask){
    console.log("in addTask", newTask);
    // ajax call to server to post new task from client side
    
    $.ajax({
        type: 'POST',
        url: '/list',
        data: newTask,
        }).then(function(response) {
          console.log('Response from server.', response);
        // run getTaskList to update DOM
          getTaskList();
        }).catch(function(error) {
          console.log('Error in POST', error)
          alert('Unable to add new test');
        });
} // end addTask


// function for click listener deleteBtn
function deleteHandler() {
    console.log("clicked delete button in tasks");
    deleteTask($(this).data("id"))
} // end deleteHandler

// DELETE Route request
function deleteTask(taskId) {
    $.ajax({
      method: "DELETE",
      url: `/list/${taskId}`,
    })
      .then((response) => {
        console.log(`deleted id, ${taskId}`);
        getKoalas();
      })
      .catch((error) => {
        console.log("There was an Error", error);
      });
} // end deleteTask