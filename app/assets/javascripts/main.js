var basiqUrl = "https://au-api.basiq.io/";

var transactionArray = [];
var transactionCode = "Deep relief lotion NSW AUS";
var resultObject;
var transactionIdArray = [<%=@transactions%>];
var userTransactionArray = ["318ca78f2855", "53c8f5489e45"];

var match;
// // // // // // // // // // // // // // // // // //
// Below obtains latest bank list
// // // // // // // // // // // // // // // // // //

var bankListBasiq = function(query) {
  $.ajax({
    url: "https://au-api.basiq.io/oauth2/token",
    method: "POST",
    dataType: "JSON",
    beforeSend: function(xhr) {
      xhr.setRequestHeader(
        "Authorization",
        "Basic MDg3OWQwMDktYTFhZi00MWI3LWI0NDctYjRmOWJhNTI2NDcxOmE4NjljZGM4LTVjZjUtNDYxZC04YjMzLTBhYWRhNzI1ZDk2NQ=="
      );
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.setRequestHeader("Accept", "application/json");
    },
    data: {
      grant_type: "client_credentials"
    }
  }).done(function(response) {
    var token = response.access_token;
    console.log(token);

    $.ajax({
      url: "https://au-api.basiq.io/institutions",
      method: "GET",
      dataType: "JSON",
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Accept", "application/json");
      }
    }).done(function(response) {
      var banksList = response.data;
      for (var i = 0; i < banksList.length; i++) {
        var bankName = banksList[i].name;

        var List = document.getElementById("bankList");
        var newListItem = document.createElement("option");
        newListItem.appendChild(document.createTextNode(banksList[i].name));

        List.appendChild(newListItem);
      }
    });
  });
};

// // // // // // // // // // // // // // // // // //
// Below submits user details and creates a connection.
// // // // // // // // // // // // // // // // // //

var submitUserDetails = function(query) {
  $.ajax({
    url: "https://au-api.basiq.io/oauth2/token",
    method: "POST",
    dataType: "JSON",
    beforeSend: function(xhr) {
      xhr.setRequestHeader(
        "Authorization",
        "Basic MDg3OWQwMDktYTFhZi00MWI3LWI0NDctYjRmOWJhNTI2NDcxOmE4NjljZGM4LTVjZjUtNDYxZC04YjMzLTBhYWRhNzI1ZDk2NQ=="
      );
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.setRequestHeader("Accept", "application/json");
    },
    data: {
      grant_type: "client_credentials"
    }
  }).done(function(response) {
    var token = response.access_token;

    $.ajax({
      url:
        basiqUrl + "connections/a4e21521-0401-4cd4-abf8-b501b2e4707e/refresh",
      method: "POST",
      dataType: "JSON",
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Accept", "application/json");
      },
      data: JSON.stringify({
        loginId: "gavinBelson",
        password: "hooli2016",
        externalUserId: "01",
        institution: {
          id: "AU00000"
        }
      })
    }).done(function(response) {
      var connectionInfo = response;
      transactionHistory(connectionInfo, token);
    });
  });
};

// // // // // // // // // // // // // // // // // //
// Below pulls all transaction history, and saves it into another function
// // // // // // // // // // // // // // // // // //

var transactionHistory = function(connectionInfo, token) {
  $.ajax({
    url: basiqUrl + "connections/" + connectionInfo.id + "/transactions",
    method: "GET",
    dataType: "JSON",
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "Bearer " + token);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("Accept", "application/json");
    }
    // data: JSON.stringify({
    //   limit: "100",
    //   fromDate: "01/06/2017",
    //   toDate: "13/06/2017"
    // })
  }).done(function(response) {
    transactionList = response;

    for (var i = 0; i < 10; i++) {
      var transaction = transactionList.data[i].id;
      individualTransaction(transaction, connectionInfo, token);
    }
  });
};

// // // // // // // // // // // // // // // // // //
// Below loops through each transaction object for more granular data.
// // // // // // // // // // // // // // // // // //

var individualTransaction = function(transaction, connectionInfo, token) {
  $.ajax({
    url:
      basiqUrl +
        "connections/" +
        connectionInfo.id +
        "/transactions/" +
        transaction,
    method: "GET",
    dataType: "JSON",
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "Bearer " + token);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("Accept", "application/json");
    }
  }).done(function(response) {
    singleTransaction = response;
    date = singleTransaction.postDate;
    amount = singleTransaction.amount;
    description = singleTransaction.description;
    transactionArray.push(singleTransaction);
    console.log(description);
  });
};

// // // // // // // // // // // // // // // // // //
// Below waits until ajax requests have all loaded
// // // // // // // // // // // // // // // // // //

$(document).ajaxStop(function() {
  function search(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].description === nameKey) {
        return myArray[i];
      }
    }
  }
  var resultObject = search(transactionCode, transactionArray);
  console.log(resultObject);
});

// // // // // // // // // // // // // // // // // //
// Below appends transaction id's to page
// // // // // // // // // // // // // // // // // //

// $(document).ajaxStop(function() {
//   for (var i = 0; i < transactionArray.length; i++) {
//     var transactionId = transactionArray[i].id;
//
//     var transactionList = document.getElementById("transactions");
//     var newListItem = document.createElement("tr");
//     newListItem.appendChild(document.createTextNode(transactionId));
//
//     transactionList.appendChild(newListItem);
//     transactionIdArray.push(transactionId);
//   }
//   // console.log(transactionIdArray);
// });
var results = [];
$(document).ajaxStop(function() {
  var arr = transactionIdArray.concat(userTransactionArray);
  var sorted_arr = arr.sort();
  for (var i = 0; i < arr.length - 1; i++) {
    if (sorted_arr[i + 1] == sorted_arr[i]) {
      results.push(sorted_arr[i]);
      var transactionId = sorted_arr[i];

      var transactionList = document.getElementById("transactions");
      var newListItem = document.createElement("tr");
      newListItem.appendChild(document.createTextNode(transactionId));

      transactionList.appendChild(newListItem);
      transactionIdArray.push(transactionId);
    }
  }
  console.log(results);
});

//
// // bankListBasiq();
submitUserDetails();
