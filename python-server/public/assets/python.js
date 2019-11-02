$(document).ready(function(){

  var element = $('meta[name="active-menu"]').attr('content');
  $('#' + element).addClass('active');

  // Add items to MongoDb
  $('#update-mongodb').on('submit', function(){

      var item = $('form input');
      var todo = {item: item.val()};

      $.ajax({
        type: 'POST',
        url: '/python/options/edit',
        data: todo,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
          alert("working on it...")
        }
      });
      
      return false;
  });

  // Click to delete list item
  $('.edit').on('click', function(){
    var item = $(this).text().replace(/ /g, "-");
    $.ajax({
      type: 'DELETE',
      url: '/python/options/edit/' + item,
      success: function(data){
        //do something with the data via front-end framework
        location.reload();
      }
    });
  });

  //Submit file via POST request to server
  $('#submit-file').on('submit', function(e){
    e.preventDefault();
    //var pythonScript = $('h1').text().replace(/\-/g," ");
    //formData.append("file",$(filename)[0].files[i]);var form = $('#submit-file')[0]; // You need to use standard javascript object here
    var formData = new FormData(this);
    //formData.append("file", document.getElementById("file"));

    $.ajax({
      url: '/document',
      type: 'POST',
      data: formData,
      cache: false,
      async: false,
      contentType: false,
      processData: false,
      success: function(data){
      }
    });
  });


  //Submit form data via POST request to server
  $('#submit-params').on('submit', function(){

    var pythonScript = $('h1').text().replace(/\-/g," ");
    var formData = {};
    formData.pythonScript = pythonScript

    $('form').find("input[name]").each(function (index, node) {
       formData[node.name] = node.value;
    });

    //Convert form object into JSON string
    var jsonString = JSON.stringify(formData);
    
    //Post data to server
    $.ajax({
      type: 'POST',
      url: '/python/parameters/' + pythonScript,
      dataType: 'json',
      contentType: 'application/json',
      data: jsonString,
      success: function(data){
        //do something with the data via front-end framework
        location.reload();
        $('#success').html("success");
        alert("working now...")
      }
    });

    return false;

  });
});


    // //Create object to capture script parameters from userform
    // var scripts = {};
    // var python = []
    // scripts.python = python;
    // console.log(scripts);

    // //Python script comes from <h1>
    // var pythonScript = $('h1').text().replace(/\-/g," ");
    // //Other data comes from userform
    // var URL = $('#URL').val(), username = $('#username').val(), password = $('#password').val();
    // //Pass variables into params object
    // var params = {'pythonScript': pythonScript, 'URL': URL, 'username': username, 'password': password}; 
    // scripts.python.push(params);