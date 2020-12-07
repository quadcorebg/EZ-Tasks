document.addEventListener("deviceready", onDeviceReady, false);

    function getDB() {
        return window.openDatabase("Database", "1.0", "EZTasks", 200000);
    }

    function populateDB(tx) {
        tx.executeSql('DROP TABLE IF EXISTS USERS');
        tx.executeSql('CREATE TABLE IF NOT EXISTS USERS (id unique, email, password)');
        tx.executeSql('DROP TABLE IF EXISTS TASKS');
        tx.executeSql('CREATE TABLE IF NOT EXISTS TASKS (id unique, userID, taskName, taskDesc, date, status)');
    }

    // Query the database
    //
    function queryDB(tx) {
        tx.executeSql('SELECT * FROM USERS', [], querySuccess, errorCB);
    }

    function isUserRegistered(tx,email,cb) {
        var len;
        tx.executeSql('SELECT * FROM USERS WHERE email = "'+email+'"', [], (tx, results) => {
            cb(results.rows.length==1);
        }, errorCB);
    }

    function getNextId(tx,table,cb) {
        var len;
        tx.executeSql('SELECT * FROM '+table, [], (tx, results) => {
            cb(results.rows.length);
        }, errorCB);
    }

    // Query the success callback
    //
    function querySuccess(tx, results) {
        var len = results.rows.length;
        //alert("USERS table: " + len + " rows found.");
        for (var i=0; i<len; i++){
            console.log("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).email);
        }
    }

    function registerNewUser() {

        var email = $('#registerForm').find('input[name="email"]').val();
        var password = $('#registerForm').find('input[name="password"]').val();
        var db = getDB();

        db.transaction((tx) => isUserRegistered(tx, email, (cb) => {
            if (cb) {
                alert('This email was registered previously');
            } else {
                db.transaction((tx) => getNextId(tx,"USERS",(id) =>{
                    db.transaction((tx) => {
                        id++;
                        tx.executeSql('INSERT INTO USERS (id, email, password) VALUES ('+id+', "'+email+'", "'+password+'")');
                        window.location = "summary.html";
                        alert("You have successfully registered!");
                        setUserSession(id,email);
                        
                    });
                }));
            }
        }), errorCB);
        
    }

    function addNewTask(name,desc,date) {

        var db = getDB();

        var userID = window.localStorage.getItem('userID');

         db.transaction((tx) => getNextId(tx,"TASKS",(id) => {
            //alert(id)
            db.transaction((tx) => {
                id++;
                tx.executeSql('INSERT INTO TASKS (id, userID, taskName, taskDesc, date, status) VALUES ('+id+', "'+userID+'", "'+name+'", "'+desc+'", "'+date+'","current")');
                window.location = "tasks.html";
                alert("Task added successfully");
           },errorCB);
        }), errorCB);
        
    }

    function check(){
        var email = "fff";
        var db = getDB();
        db.transaction((tx) => isUserRegistered(tx, email, (cb) => { alert(window.localStorage.getItem('userEmail')); }));
    }

    function setUserSession(id,email) {
        window.localStorage.setItem("userID", id);
        window.localStorage.setItem("userEmail", email);
    }

    // Transaction error callback
    //
    function errorCB(err) {
        alert("Error processing SQL: "+err.code);
    }

    // Transaction success callback
    //
    function successCB() {
        var db = getDB();
        db.transaction(queryDB, errorCB);
    }

    // PhoneGap is ready
    //
    function onDeviceReady() {
        var db = getDB();
        //db.transaction(populateDB, errorCB, successCB);
    }

function ai(){
    window.localStorage.setItem("key", {name:'test'});
    var val = window.localStorage.getItem("key") || 0;
    alert(val.name);
}