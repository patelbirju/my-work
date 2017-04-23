/**
 * Created by birju_000 on 22/02/2017.
 */

var db;

function errorHandler(tx, error) {
    console.error("SQL error: " + tx + " (" + error.code + ")--" + error.message);
}

var DB = {
    BPcreateDatabase: function () {
        var shortName = "BPFeedback";
        var version = "1.0";
        var displayName = "DB for Birju Patel's Feedback App";
        var dbSize = 2 * 1024 * 1024;

        console.info("Creating database ...");
        db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);

        function dbCreateSuccess() {
            console.info("Success: Database creation successful.");
        }
    },

    BPcreateTables: function () {

        function successDrop() {
            console.info("Success: Dropping Table successful. ");
        }

        function successCreate() {
            console.info("Success: Create Table successful. ");
        }

        function successInsert() {
            console.info("Success: Data insert successful");
        }

        function successTransaction() {
            console.info("Success: Transaction successful");
        }

        function txFunction(tx) {
            var options = [];
            console.info("Dropping Table table if exists...");
            var sql = "DROP TABLE IF EXISTS type;";

            tx.executeSql(sql, options, successDrop, errorHandler);

            console.info("Creating Table: type...");
            sql = "CREATE TABLE IF NOT EXISTS type("
                + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
                + "name VARCHAR(20) NOT NULL);";

            tx.executeSql(sql, options, successCreate, errorHandler);

            console.info("Inserting data to type table...");
            sql = ["INSERT INTO type(name) VALUES('Canadian');",
                " INSERT INTO type(name) VALUES('Asian');",
                " INSERT INTO type(name) VALUES('Other');"];

            for (var i = 0; i < sql.length; i++) {
                tx.executeSql(sql[i], options, successInsert, errorHandler);
            }

            console.info("Creating Table review:");
           // table with foreign key snippet
            sql = "CREATE TABLE IF NOT EXISTS review(" +
               "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
               "businessName VARCHAR(30) NOT NULL," +
               "typeId INTEGER NOT NULL," +
               "reviewerEmail VARCHAR(30)," +
               "reviewerComments TEXT," +
               "reviewDate DATE," +
               "hasRating VARCHAR(1)," +
                "rating1 INTEGER," +
                "rating2 INTEGER," +
                "rating3 INTEGER," +
               "FOREIGN KEY(typeId) REFERENCES type(id));";

            tx.executeSql(sql, options, successCreate, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },

    BPdropTables: function () {
        function successDrop() {
            console.info("Success: Dropping Table successful. ");
        }
        function successTransaction() {
            console.info("Success: Transaction successful");
        }
        function txFunction(tx) {
            var options = [];
            console.info("Dropping Table: review");
            var sql = "DROP TABLE IF EXISTS review;";

            tx.executeSql(sql, options, successDrop, errorHandler);

            console.info("Dropping Table: type");
            sql = "DROP TABLE IF EXISTS type";

            tx.executeSql(sql, options, successDrop, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};
