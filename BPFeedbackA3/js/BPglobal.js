/**
 *  File name: BPglobal.js
    Author: Birju Patel
    Date: 12/03/2017
 */
function btnSave_click() {
    BPaddFeedback();
}

function BPRatingsPopup_click() {
    $("#BPRatingsPopup").toggle();
}
function BPEditRatingsPopup_click() {
    $("#BPEditRatingsPopup").toggle();
}

function BPUpdate_click() {
    if(doValidation_BPEditForm()){
        console.info("Validation is okay");
        // add the data to the database table
        BPupdateFeedback();
    }
    else{
        console.error("Validation fails");
    }
}

function BPDelete_click() {
    BPdeleteFeedback();
}

function BPSaveDefaults_click() {
    localStorage.setItem("DefaultEmail",$("#BPDefaultEmail").val());
    alert("Default reviewer email saved");
}

function BPClearDatabse_click() {
    BPclearDatabase();
}

function calculateOverallRating() {

    var total = parseInt($("#BPFoodQuality").val())  + parseInt($("#BPService").val()) + parseInt($("#BPValue").val());
    var rating = Math.round(((total/15) * 100));

    $("#BPOverallRating").val(rating + "%");
}

function calculateOverallRatingModify() {

    var total = parseInt($("#BPEditFoodQuality").val())  + parseInt($("#BPEditService").val()) + parseInt($("#BPEditValue").val());
    var rating = Math.round(((total/15) * 100));

    $("#BPEditRating").val(rating + "%");
}

function AddFeedbackPage_show() {
    var email = localStorage.getItem("DefaultEmail");
    $("#BPEmail").val(email);
    BPupdateTypesDropDown();
}

function ViewFeedBackPage_show() {
    BPgetReviews();
}

function EditFeedbackPage_show() {
    BPupdateEditTypesDropDown();
    BPshowCurrentReview();
}


function init() {
    $("#BPSave").on("click",btnSave_click);
    $("#BPUpdate").on("click", BPUpdate_click);
    $("#BPDelete").on("click", BPDelete_click);

    $("#BPAddRatings").on("click", BPRatingsPopup_click);
    $("#BPEditAddRatings").on("change",BPEditRatingsPopup_click);

    $("#BPFoodQuality").on("change", calculateOverallRating);
    $("#BPService").on("change", calculateOverallRating);
    $("#BPValue").on("change", calculateOverallRating);

    $("#BPEditFoodQuality").on("change", calculateOverallRatingModify);
    $("#BPEditService").on("change", calculateOverallRatingModify);
    $("#BPEditValue").on("change", calculateOverallRatingModify);

    $("#BPSaveDefaults").on("click", BPSaveDefaults_click);
    $("#BPClearDatabase").on("click", BPClearDatabse_click);

    $("#BPAddFeedbackPage").on("pageshow", AddFeedbackPage_show);
    $("#BPViewFeedbackPage").on("pageshow", ViewFeedBackPage_show)
    $("#BPEditFeedbackPage").on("pageshow", EditFeedbackPage_show);
}

function initDB() {
    console.info("Creating Database in initDB()");
    try{
        DB.BPcreateDatabase();
        if(db){
            DB.BPcreateTables();
        }
    }
    catch (e){
        console.error("Error: Fatal error in initDB, can not proceed");
    }
}

$(document).ready(function () {
    initDB();
    init();
});
