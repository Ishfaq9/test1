$(function () {
    GetALlDetails();
})
//get all the data
function GetALlDetails() {
    $.ajax({
        url: '/combined/GetAllDetails',
        type: 'GET',
        dataType: 'json',

        success: function (response) {
            if (!response || response.length === 0) {
                var object = '<tr><td colspan="7" class="text-center">Students not available in the database</td></tr>';
                $('#tb2').html(object);

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
                    object += '<td>' + item.teacher + '</td>';
                    object += '<td> <a href="#" class="btn btn-primary btn-sm" onClick="Edit(' + item.sid + ', ' + item.dId + ')">Edit</a> <a href ="#" class="btn btn-danger btn-sm" onclick="Delete(' + item.sid + ', ' + item.dId + ')" > Delete </a >  </td > ';
                    object += '</tr>';
                });
                $('#tb2').html(object);
            }

            
        },
        error: function () {
            alert("Unable to read the data");
        }
      
    });
}


//edit the data
function Edit(sid, dId) {
    $.ajax({
        url: '/combined/Edit?sid=' + sid + '&dId=' + dId,
        type: 'GET',
        success: function (response) {
            if (!response || response.length == 0) {
                alert("Unable to fetch student data for editing");
            } else {
                // Set the student ID in a hidden input field


                $('#modaltitle').text('Update the Student');
                $('#update').show();
                $('#save').hide();
                $('#sid').val(response.student.sid);
                $('#name').val(response.student.name);
                $('#age').val(response.student.age);
                $('#email').val(response.student.email);
                $('#sdepartment').val(response.student.sdepartment);
                $('#status').val(response.student.status);
                $('#dId').val(response.department.dId);
                $('#teacher').val(response.department.teacher);
                $('#studentmodal').modal("show");
            }
        },
        error: function () {
            alert("Unable to fetch data for editing");
        }
    });
}
//hide the model
function Modalhide() {
    clear();
    $('#studentmodal').modal("hide");
}

function clear() {
    $('#sid,#dId').val(0);
    $('#name, #age, #email, #sdepartment, #status,#teacher').val('');
}

//update the data

function Update() {

    var formData2 = {
        sid: $('#sid').val(),
        name: $('#name').val(),
        age: $('#age').val(),
        email: $('#email').val(),
        sdepartment: $('#sdepartment').val(),
        status: $('#status').val(),
        dId: $('#dId').val(),
        teacher: $('#teacher').val()
    }
    $.ajax({
        url: '/combined/Update',
        data: formData2,
        type: 'POST',

        success: function (response) {
            if (response == null || response == "" || response.length == 0) {
                alert("Data insertion failed");
            }
            else {
                clear();
                Modalhide();
                GetALlDetails();
                alert(response);
            }
        },
        error: function () {
            alert("Model valodation failed");
        }
    });
}
//delete the data
function Delete(sid, dId) {
    if (confirm("Are you sure you want to Delete the data ?")) {
        $.ajax({
            url: '/combined/Delete?sid=' + sid + '&dId=' + dId,
            type: 'post',
            success: function (response) {
                if (response == null || response.length == 0) {
                    alert("Data can not be deleted");
                }
                else {
                    GetALlDetails();
                    alert(response);
                }
            }, error: function () {
                alert("unable to delete the data");
            }
        });
    }

}