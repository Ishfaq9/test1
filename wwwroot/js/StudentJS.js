

$(function () {
    GetStudents();
});
//read the data

function GetStudents() {
    $.ajax({
        url: '/Student/GetStudents',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        success: function (response) {
            if (response == null || response == undefined || response.length == 0) {
                var object = '';
                object += '<tr>';
                object += '<td colspan="7" class="text-center">' + ' Products not available in the database ' + '</td>';
                object += '</tr>';
                
                $('#tb').html(object);
            }
            else {
                var object = '';
                $.each(response, function (index, item) {
                    object += '<tr>';
                    object += '<td>' + item.sid + '</td>';
                    object += '<td>' + item.name + '</td>';
                    object += '<td>' + item.age + '</td>';
                    object += '<td>' + item.email + '</td>';
                    object += '<td>' + item.sdepartment + '</td>';
                    object += '<td>' + item.status + '</td>';
                    object += '<td> <a href="#" class="btn btn-primary btn-sm" onClick="Edit(' + item.sid + ')">Edit</a> <a href ="#" class="btn btn-danger btn-sm" onclick="Delete('+ item.sid +')" > Delete </a >  </td > ';
                    object += '</tr>';
                });
                $('#tb').html(object);

            }
        },
        error: function () {
            alert("Unable to read the data");
        }
    });
}


//btn click to show the modal
$('#btnadd').on('click', function () {
    clear();
    $('#studentmodal').modal("show");
    $('#modaltitle').text('Add New Student');
    $('#save').show();
    $('#update').hide();

});

function Modalhide() {
    clear();
    $('#studentmodal').modal("hide");
}

//clear te=he data
function clear() {
    $('#sid').val(0);
    $('#name, #age, #email, #sdepartment, #status').val('');
}
//insert the data

function Insert() {
    var formData = {
        id: $('#sid').val(),
        name: $('#name').val(),
        age: $('#age').val(),
        email: $('#email').val(),
        sdepartment: $('#sdepartment').val(),
        status: $('#status').val()
    }
    $.ajax({
        url: '/student/Insert',
        data: formData,
        type: 'POST',

        success: function (response) {
            if (response == null || response == "" || response.length == 0) {
                alert("Data insertion failed");
            }
            else {
                Modalhide();
                GetStudents();
                alert(response);
            }
        },
        error: function () {
            alert("Unable to insert the data");
        }



    });

} 

//edit the data
function Edit(id) {
    $.ajax({
        url: '/student/Edit?id=' + id,
        type: 'GET',
        success: function (response) {
            if (!response || response.length == 0) {
                alert("Unable to fetch student data for editing");
            } else {
                // Set the student ID in a hidden input field
               

                $('#modaltitle').text('Update the Student');
                $('#update').show();
                $('#save').hide();
                $('#sid').val(response.sid);
                $('#name').val(response.name);
                $('#age').val(response.age);
                $('#email').val(response.email);
                $('#sdepartment').val(response.sdepartment);
                $('#status').val(response.status);
                $('#studentmodal').modal("show");
            }
        },
        error: function () {
            alert("Unable to edit the data");
        }
    });
}

function Update() {
 
    var formData2 = {
        sid: $('#sid').val(),
        name: $('#name').val(),
        age: $('#age').val(),
        email: $('#email').val(),
        sdepartment: $('#sdepartment').val(),
        status: $('#status').val()
    }
    $.ajax({
        url: '/student/Update',
        data: formData2,
        type: 'POST',

        success: function (response) {
            if (response == null || response == "" || response.length == 0) {
                alert("Data insertion failed");
            }
            else {
                clear();
                Modalhide();
                GetStudents();
                alert(response);
            }
        },
        error: function () {
            alert("Model valodation failed");
        }
    });


   
}

function Delete(id) {
    if (confirm("Are you sure you want to Delete the data ?")) {
        $.ajax({
            url: '/student/Delete?id=' + id,
            type: 'post',
            success: function (response) {
                if (response == null || response.length == 0) {
                    alert("Data can not be deleted");
                }
                else {
                    GetStudents();
                    alert(response);
                }
            }, error: function () {
                alert("unable to delete the data");
            }
        });
    }
   
}


 document.getElementById("redirectToIndexButton").addEventListener("click", function() {
            
     window.location.href = '/Combined/Index'; 
    });

