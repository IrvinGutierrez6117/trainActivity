var firebaseConfig = {
    apiKey: "AIzaSyB_rW-0OeaqUajFko_7VHZeU8icEEoWLjU",
    authDomain: "trainactivity-29cee.firebaseapp.com",
    databaseURL: "https://trainactivity-29cee.firebaseio.com",
    projectId: "trainactivity-29cee",
    storageBucket: "trainactivity-29cee.appspot.com",
    messagingSenderId: "459663272048",
    appId: "1:459663272048:web:56f0baaeba509482"
  };

  firebase.initializeApp(config)

  var fireData = firebase.database();

  //button for trains
  $("add-train").on("click", function(event){
      event.preventDefault();

    var trainName = $("train-input-name").val().trim();
    var destination = $("destination-input").val().trim();
    var firstTrain = $("#first-train-input").val().trim();
    var frequency = $("frequency-input").val().trim();

    var newTrain = {
        trainName,
        destination,
        firstTrain,
        frequency
    };

    trainData.ref().push(newTrain);

    console.log("train successfully added");

    $("#train-name-input").val("")
    $("#destination-input").val("")
    $("first-train-input").val("")
    $("#frequency-input").val("")

  });

  trainData.ref().on("child_added",function(childSnapshot, childKey){
    console.log(childSnapshot.val());


    var tName = childSnapshot.val().name;
    var tDestination = childSnapshot.val().destination;
    var tFrequency = childSnapshot.val().frequency;
    var tFirstTrain = childSnapshot.val().firstTrain;

    var timeArr = tFirstTrain.split(":");
  var trainTime = moment()
    .hours(timeArr[0])
    .minutes(timeArr[1]);
  var maxMoment = moment.max(moment(), trainTime);
  var tMinutes;
  var tArrival;

  if(maxMoment === trainTime){
      tArrival = trainTime.format("hh:m");
      tMinutes = trainTime.diff(moment(),"minutes");
  } else {
    var differenceTimes = moment().diff(trainTime, "minutes");
    var tRemainder = differenceTimes % tFrequency;
    tMinutes = tFrequency - tRemainder;

    tArrival = moment()
    .add(tMinutes, "m")
    .format("hh:mm A");
  }

  $("#train-table > tbody").append(
    $("<tr>").append(
      $("<td>").text(tName),
      $("<td>").text(tDestination),
      $("<td>").text(tFrequency),
      $("<td>").text(tArrival),
      $("<td>").text(tMinutes)
    )
  );

  });