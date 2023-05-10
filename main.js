const firebaseConfig = {
    apiKey: "AIzaSyBCBMH9Xhz5pdK8tq6o_LYINgm96wOYgHg",
    authDomain: "acad-server.firebaseapp.com",
    databaseURL: "https://acad-server-default-rtdb.firebaseio.com",
    projectId: "acad-server",
    storageBucket: "acad-server.appspot.com",
    messagingSenderId: "1066228003153",
    appId: "1:1066228003153:web:1121f6cf72d68e5dbc6370",
    measurementId: "G-GX7QH3M3D1"
  };

    import {initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
    import {getDatabase, set, get, update, remove, ref, child}
    from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

// somecomponent.js
        
    initializeApp(firebaseConfig);
      
    const db = getDatabase();
      
var PlayerName = document.querySelector("#name");
var PlayerProfession = "";
var DepartmentInfo = "";


var isStudent = true;

var findID = document.querySelector("#findID");
var findName = document.querySelector("#findName");
var findProfession = document.querySelector("#findProfession");
var findDepartment = document.querySelector("#findDepartment");

var playerInfo = document.getElementsByName('profession');
var studentInfo = document.getElementsByName('department');

var insertBtn = document.querySelector("#join");

function generateRandomID(string_length)
{
    var randomString = '';
    var characters = '123456789';
    for(var i = 0; i < string_length; i++)
    {
        randomString +=  characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomString;
}

var SerialNo = 0;
function InsertData()
{
    SerialNo = generateRandomID(5);
    localStorage.setItem("ID", SerialNo);
    PlayerProfessionRadio();
    set(ref(db, "People/"+ SerialNo),
    {
        ID: SerialNo,
        Name: PlayerName.value,
        Profession: PlayerProfession,
        DepartmentData: DepartmentInfo
    })
    .then(()=>{
        RegistrationCompleted();
    })
    .catch((error)=>{
        alert(error);
    });
}

function RegistrationCompleted()
{
    window.location.href = "Welcome.html"; 
}

function FindData()
{
    const dbref = ref(db);

    get(child(dbref, "People/" + findID.value))
    .then((snapshot)=>{
        if(snapshot.exists()){
            findName.innerHTML = "Name: " + snapshot.val().Name;
            findProfession.innerHTML = "Profession: " + snapshot.val().Profession;
            findDepartment.innerHTML = "Department: " + snapshot.val().DepartmentInfo;
        } else {
            alert("No data found");
        }
    })
    .catch((error)=>{
        alert(error)
    });
}

function UpdateData()
{
    update(ref(db, "People/"+ findID.value),{
        Name: updatedName.value,
        Age: updatedAge.value,
        PhoneNo: updatedPhoneNo.value,
        TotalTickets: updatedTotalTickets.value
    })
    .then(()=>{
        alert("Data updated successfully");
    })
    .catch((error)=>{
        alert(error);
    });
    clearForm('#ID, #updatedName, #updatedAge, #updatedPhoneNo, #updatedTickets');
}

function RemoveData()
{
    remove(ref(db, "People/"+ findID.value))
    .then(()=>{
        alert("Data deleted successfully");
    })
    .catch((error)=>{
        alert(error);
    });
}

function PlayerProfessionRadio()
{
    playerInfo.forEach(radio =>
        {
            if(radio.checked)
            {
                console.log(radio.value);
                if(radio.value == "Student")
                {
                    isStudent = true;
                }
                else
                {
                    isStudent = false;
                }
                PlayerProfession = radio.value;
                StudentRadio();
            }
        })
}

function StudentRadio()
{
    studentInfo.forEach(radio =>
        {
            if(radio.checked)
            {
                console.log(radio.value);
                if(isStudent)
                {
                    DepartmentInfo = radio.value;
                }
                else
                {
                    DepartmentInfo = "Not a Student";
                }
            }
        })
}

if(insertBtn)
{
    insertBtn.addEventListener('click', InsertData);
}



var Ratings = 0;
var ratings = document.getElementsByName('ratings');
var feedback = document.querySelector("#feedback");

var submitButton = document.querySelector("#submit");

var feedbackBtn = document.querySelector("#review");

function RatingsRadio()
{
    ratings.forEach(radio =>
        {
            if(radio.checked)
            {
                Ratings = parseInt(radio.value);
                console.log(Ratings);
            }
        })
}

function InsertFeedback()
{
    var id = localStorage.getItem("ID");
    console.log(id);
    set(ref(db, "People/" + id + "/Feedback/" ),
    {
        GameRatings: Ratings,
        Feedback: feedback.value
    })
    .then(()=>{
        window.location.href = "ThankYou.html";
    })
    .catch((error)=>{
        alert(error);
    });
}

function Feedback()
{
    RatingsRadio();
    InsertFeedback();
}

function ReviewScreen()
{
    window.location.href = "Reviews.html"; 
}
if(submitButton)
{
submitButton.addEventListener('click', Feedback);
}
if(feedbackBtn)
{
feedbackBtn.addEventListener('click', ReviewScreen);
}
