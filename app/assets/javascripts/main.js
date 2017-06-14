var basiqUrl = "https://au-api.basiq.io/";

// var bankListBasiq = function(query) {
//   $.ajax({
//     url: "https://au-api.basiq.io/oauth2/token",
//     method: "POST",
//     dataType: "JSON",
//     beforeSend: function(xhr) {
//       xhr.setRequestHeader(
//         "Authorization",
//         "Basic MDg3OWQwMDktYTFhZi00MWI3LWI0NDctYjRmOWJhNTI2NDcxOmE4NjljZGM4LTVjZjUtNDYxZC04YjMzLTBhYWRhNzI1ZDk2NQ=="
//       );
//       xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//       xhr.setRequestHeader("Accept", "application/json");
//     },
//     data: {
//       grant_type: "client_credentials"
//     }
//   }).done(function(response) {
//     var token = response.access_token;
//     console.log(token);
//
//     $.ajax({
//       url: "https://au-api.basiq.io/institutions",
//       method: "GET",
//       dataType: "JSON",
//       beforeSend: function(xhr) {
//         xhr.setRequestHeader("Authorization", "Bearer " + token);
//         xhr.setRequestHeader("Content-Type", "application/json");
//         xhr.setRequestHeader("Accept", "application/json");
//       }
//     }).done(function(response) {
//       var banksList = response.data;
//       for (var i = 0; i < banksList.length; i++) {
//         var bankName = banksList[i].name;
//
//         var List = document.getElementById("bankList");
//         var newListItem = document.createElement("option");
//         newListItem.appendChild(document.createTextNode(banksList[i].name));
//
//         List.appendChild(newListItem);
//       }
//     });
//   });
// };

// Below function calls for token, and then submits user details to create connection.

// document.addEventListener("DOMContentLoaded", function() {
//   var submitButton = document.getElementById("submitButton");
//   submitButton.addEventListener("click", submitUserDetails);
//   var clientPassword = document.getElementById("password").value;
//   var clientId = document.getElementById("clientId").value;
//   var institution = document.getElementById("bankList").value;
// });

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
      url: basiqUrl + "connections",
      method: "GET",
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
      console.log(connectionInfo);
      transactionHistory(connectionInfo);

      var transactionHistory = function(data) {
        $.ajax({
          url:
            "https://au-api.basiq.io/connections/" + data.id + "/transactions",
          method: "GET",
          dataType: "JSON",
          beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Accept", "application/json");
          }
          // data: JSON.stringify({
          //   loginId: "gavinBelson",
          //   password: "hooli2016",
          //   externalUserId: "01",
          //   institution: {
          //     id: "AU00000"
          //   }
          // })
        }).done(function(response) {
          transactionList = response;
          console.log(transactionList);
          for (var i = 0; i < transactionList.data.length; i++) {
            var transaction = transactionList.data[i].id;

            $.ajax({
              url:
                basiqUrl +
                  "connections/" +
                  data.id +
                  "/transactions/" +
                  transaction,
              method: "GET",
              dataType: "JSON",
              beforeSend: function(xhr) {
                xhr.setRequestHeader(
                  "Authorization",
                  "Bearer eyJhbGciOiIiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiIwODc5ZDAwOS1hMWFmLTQxYjctYjQ0Ny1iNGY5YmE1MjY0NzEiLCJleHAiOjE0OTc0Mzk0OTQsInBpZCI6IjkwYjMyMDFjLTI0MTMtNDEyMi1iYjMxLTgzZDdkN2Y3ZTVjMyJ9.bRLrjVRKv2vhHxS_WdJns1sCmsgbfyRQmQTPTVJ8vjw"
                );
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.setRequestHeader("Accept", "application/json");
              }
            }).done(function(response) {
              individualTransaction = response;
              // transactionCleanUp(individualTransaction);

              var transactionList = response;
              for (var i = 0; i < transactionList.length; i++) {
                var allTransactions = transactionList[i].amount;
                var paidList = document.getElementById("paid");
                var newPaidListItem = document.createElement("li");
                newPaidListItem.appendChild(
                  document.createTextNode(paidList[i].amount)
                );
                paidList.appendChild(newPaidListItem);
              }
            });
          }
        });
      };
    });
  });
};

var transactionCleanUp = function(individualTransaction) {
  console.log(individualTransaction);
  // for (var i = 0; i < individualTransaction; i++) {
  //   var runningTotal = individualTransaction[i].amount;
  //   console.log(runningTotal);
  // }
};

// bankListBasiq();
submitUserDetails();
