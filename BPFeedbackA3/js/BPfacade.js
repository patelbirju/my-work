/**
 * File Name: BPfacade.js
 * Revision History:
 *       Birju Patel, 2017-03-28 : Created
 */

function BPupdateTypesDropDown() {
    function callback(tx, results) {
        var htmlcode = "";

        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];

            if (i == results.rows.length - 1) {
                htmlcode += "<option value=" + row['id'] + " selected>" + row['name'] + "</option>";
            }
            else
            {
                htmlcode += "<option value=" + row['id'] + ">" + row['name'] + "</option>";
            }
        }
        var typeSelect = $("#BPType");
        typeSelect = typeSelect.html(htmlcode);
        typeSelect.selectmenu("refresh");
    }
    Type.BPselectAll(callback);
}

function BPupdateEditTypesDropDown() {
    function callback(tx, results) {
        var htmlcode = "";

        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
                htmlcode += "<option value=" + row['id'] + ">" + row['name'] + "</option>";
        }
        var editTypeSelect = $("#BPEditType");
        editTypeSelect = editTypeSelect.html(htmlcode);
        editTypeSelect.selectmenu("refresh");
    }
    Type.BPselectAll(callback);
}

function BPaddFeedback() {
    if(doValidation_BPAddForm()){
        console.info("Validation is okay.")
        
        // get the form details and insert the record in database table
        var businessName = $("#BPBusinessName").val();
        var type = $("#BPType").val();
        var reviewerEmail = $("#BPEmail").val();
        var reviewerComments = $("#BPComments").val();
        var reviewDate = $("#BPReviewDate").val();
        var hasRating = $("#BPAddRatings").prop("checked");
        var rating1 = "";
        var rating2 = "";
        var rating3 = "";

        if(hasRating == true)
        {
            rating1 = $("#BPFoodQuality").val();
            rating2 = $("#BPService").val();
            rating3 = $("#BPValue").val();
        }
        var options = [businessName, type, reviewerEmail, reviewerComments, reviewDate, hasRating, rating1, rating2, rating3];

        Review.BPinsert(options);
    }
    else{
        console.error("Validation fails");
    }
}

function BPgetReviews() {
    function successSelectAll(tx, results) {
        var htmlCode = "";

        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            var overallRatings = "0";
            if (row['hasRating'] == 'true') {
                var total = parseInt(row['rating1'] + parseInt(row['rating2'] + parseInt(row['rating3'])));

                overallRatings = Math.round(((total / 15) * 100)) + "%";
            }

            htmlCode += "<li><a data-role='button' data-row-id=" + row['id'] + " href='#'>" +
                "<h1>Business Name: " + row['businessName'] + "</h1>" +
                "<h2>Reviewer Email: " + row['reviewerEmail'] + "</h2>" +
                "<h3>Comments: " + row['reviewerComments'] + "</h3>" +
                "<h3>Overall Ratings: " + overallRatings + "</h3>" +
                "</a></li>";
        }

        var lv = $("#BPReviewList");
        lv = lv.html(htmlCode);
        lv.listview("refresh");
        lv.find('a').on("click", clickHandler)
        function clickHandler() {
            localStorage.setItem("id", $(this).attr("data-row-id"));
            //navigation
            $(location).prop('href', "#BPEditFeedbackPage");
        }
    }
    Review.BPselectAll(successSelectAll);
}

function BPshowCurrentReview() {
    var id = localStorage.getItem("id");
    var options = [id];

    function successSelectOne(tx, results) {
        var row = results.rows[0];
        var overallRatings = "";

        $("#BPEditBusinessName").val(row['businessName']);
        $("#BPEditType").val(row['typeId']).selectmenu("refresh");
        $("#BPEditEmail").val(row['reviewerEmail']);
        $("#BPEditComments").val(row['reviewerComments']);
        $("#BPEditReviewDate").val(row['reviewDate']);
        if (row['hasRating'] == "true") {
            $("#BPEditRatingsPopup").show();
            $("#BPEditAddRatings").prop("checked",true).checkboxradio("refresh");
            $("#BPEditFoodQuality").val(row['rating1']);
            $("#BPEditService").val(row['rating2']);
            $("#BPEditValue").val(row['rating3']);

            var total = parseInt(row['rating1'] + parseInt(row['rating2'] +parseInt(row['rating3'])));
            overallRatings = Math.round(((total/15) * 100)) + "%";
            $("#BPEditRating").val(overallRatings);
        }
        else{
            $("#BPEditAddRatings").prop("checked", false).checkboxradio("refresh");
            $("#BPEditFoodQuality").val("0");
            $("#BPEditService").val("0");
            $("#BPEditValue").val("0");
            $("#BPEditRating").val("");
            $("#BPEditRatingsPopup").hide();
        }
    }

    Review.BPselect(successSelectOne, options);
}
function BPupdateFeedback() {
    var id = localStorage.getItem("id");
    var businessName = $("#BPEditBusinessName").val();
    var type = $("#BPEditType").val();
    var reviewerEmail = $("#BPEditEmail").val();
    var reviewerComments = $("#BPEditComments").val();
    var reviewDate = $("#BPEditReviewDate").val();
    var hasRating = $("#BPEditAddRatings").prop("checked");
    var rating1 = "";
    var rating2 = "";
    var rating3 = "";

    if(hasRating == true)
    {
        rating1 = $("#BPEditFoodQuality").val();
        rating2 = $("#BPEditService").val();
        rating3 = $("#BPEditValue").val();
    }
    var options = [businessName, type, reviewerEmail, reviewerComments, reviewDate, hasRating, rating1, rating2, rating3, id];

    Review.BPupdate(options);
    $(location).prop("href", "#BPViewFeedbackPage");
}

function BPdeleteFeedback() {
    var id = localStorage.getItem("id");
    var options = [id];

    Review.BPdelete(options);
    $(location).prop("href", "#BPViewFeedbackPage");
}

function BPclearDatabase() {
    var result = confirm("Do you really want to clear the database? All data will be deleted");
    try {
        if (result) {
            DB.BPdropTables();
            DB.BPcreateTables();
            alert("Database cleared");
        }
    }
    catch(e){
        alert(e);
    }
}