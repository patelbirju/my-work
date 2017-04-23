/**
 * Created by birju_000 on 22/02/2017.
 */

var Review = {
    BPinsert: function (options) {
        function successTransaction() {
            console.info("Success: Transaction successful");
        }

        function successInsert() {
            console.info("Success: Insert successful");
            alert("New Record Added");
        }

        function txFunction(tx) {
            var sql = "";
            sql = "INSERT INTO review(businessName, typeId, reviewerEmail, reviewerComments, reviewDate, hasRating, rating1, rating2, rating3) values(?,?,?,?,?,?,?,?,?);";
            tx.executeSql(sql, options, successInsert, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);

    },

    BPselectAll: function (successSelectAll) {
        var options = [];

        function successTransaction() {
            console.info("Success: Transaction successful");
        }

        function txFunction(tx) {
            console.info("Selecting all records.  ");
            var sql = "SELECT * FROM review;";
            tx.executeSql(sql, options, successSelectAll, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },

    BPselect: function (successSelectOne, options) {
        function successTransaction() {
            console.info("Success: Transaction successful");
        }

        function txFunction(tx) {
            console.info("Selecting a record.  ");
            var sql = "SELECT * FROM review WHERE id=?;";

            tx.executeSql(sql, options, successSelectOne, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },

    BPupdate: function (options) {
        function successTransaction() {
            console.info("Success: Transaction successful");
        }

        function successUpdate() {
            console.info("Success: Update successful");
            alert("Record Updated successfully");
        }

        function txFunction(tx) {
            console.info("Updating..  ");
            var sql = "";
            sql = "UPDATE review " +
                "SET businessName=?, typeId=?, reviewerEmail=?, reviewerComments=?, reviewDate=?, hasRating=?, rating1=?, rating2=?, rating3=? " +
                "WHERE id=?;";
            tx.executeSql(sql, options, successUpdate, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);

    },

    BPdelete: function (options) {
        function successTransaction() {
            console.info("Success: Transaction successful");
        }

        function successDelete() {
            console.info("Success: Delete successful");
            alert("Record Deleted successfully");
        }

        function txFunction(tx) {
            console.info("Deleting..  ");
            var sql = "";
            sql = "DELETE FROM review " +
                "WHERE id=?;";
            tx.executeSql(sql, options, successDelete, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

var Type = {
    BPselectAll: function (callback) {
        var options = [];

        function successTransaction() {
            console.info("Success: Transaction successful");
        }
        function txFunction(tx) {
            console.info("Selecting all records.  ");
            var sql = "SELECT * FROM type;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};



 