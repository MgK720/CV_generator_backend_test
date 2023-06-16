$(document).ready(function() {
    console.log(outputData);
    // Perform further processing or rendering of the data on the client side
  });

// $(document).ready(function() {
//     var myurl = {
//         firstPart: '/cv/',
//         id: '',
//         secondPart: 'update',
//         toString(){
//             return this.firstPart + this.id + this.secondPart;
//         }
//     }
//     myurl.id = window.location.pathname.replace(myurl.firstPart, '').replace(myurl.secondPart, '');
//     $.ajax({
//       url: myurl.toString(),
//       method: 'GET',
//       dataType: 'string',
//       success: function(data) {
//         const jsonData = JSON.parse(data);
//         console.log(data);
//       },
//       error: function(error, status, xhr) {
//         console.error('Error:', error);
//       console.log('Status:', status);
//       console.log('Response:', xhr.responseText);
//       }
//     });
//   });
  