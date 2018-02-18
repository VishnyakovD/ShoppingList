var DBManager = /** @class */ (function () {
    function DBManager() {
        this.url = "http://ext.inf.ua/smartlist.json";
        this.isHasDB = false;
        this.database = null;
        this.dbName = "shoppinglist";
        //проверить наличие базы данных
        if (!this.hasDB()) {
            //создать базу
        }
    }
    DBManager.prototype.hasDB = function () {
        if (database !== null)
            return true;
        //Добавить флаг, нужно ли пересоздавать базу даных
        window.resolveLocalFileSystemURL(cordova.file.applicationStorageDirectory + ("/databases/" + this.dbName + ".db"), this.fillDB, this.createDB);
        return false;
    };
    DBManager.prototype.createDB = function () {
        this.createTables();
    };
    DBManager.prototype.createTables = function () {
        this.fillDB();
    };
    DBManager.prototype.fillDB = function () {
    };
    DBManager.prototype.getDataByText = function (text) {
    };
    return DBManager;
}());
//# sourceMappingURL=db-manager.js.map