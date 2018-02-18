var AppData = /** @class */ (function () {
    function AppData() {
        this.isActiveSearch = false;
        this.activeFirstElement = false;
        this.searchValue = "";
        this.isLong = true;
        this.listUserLines = [];
        this.listItemWorlds = [];
    }
    return AppData;
}());
var data;
var ListManager = /** @class */ (function () {
    function ListManager() {
        //data.listUserLines.push(new UserLine(0, "Text0", "Text2", false));
        //data.listUserLines.push(new UserLine(1, "Text1", "Text2", false));
        //data.listUserLines.push(new UserLine(2, "Text2", "Text2", false));
        //data.listUserLines.push(new UserLine(3, "Text3", "Text2", false));
        //data.listUserLines.push(new UserLine(4, "Text4", "Text2", false));
        //data.listUserLines.push(new UserLine(5, "Text5", "Text2", false));
        //data.listUserLines.push(new UserLine(6, "Text6", "Text2", false));
        this.vm = new Vue({
            el: "#listmanager",
            data: data,
            watch: {
                searchValue: function (newValue, oldWalue) {
                    if (newValue.length < 1) {
                        this.isActiveSearch = false;
                        return;
                    }
                    this.isActiveSearch = true;
                    this.listItemWorlds = listWorlds.listWorlds.filter(function (item) { if (item.name.toLowerCase().indexOf(newValue.toLowerCase()) === 0)
                        return item; });
                }
            },
            methods: {
                activatedFirstElement: function () {
                    this.activeFirstElement = true;
                    var _this = this;
                    setTimeout(function () { _this.activeFirstElement = false; }, 2000);
                },
                isContainsWorld: function (text) {
                    var result = false;
                    this.listUserLines.forEach(function (item, i) {
                        if (item.text1.toLowerCase() === text) {
                            result = true;
                            return result;
                        }
                    });
                    return result;
                },
                scrollToTop: function () {
                    var container = document.querySelector("#userlist");
                    container.scrollTop = 0;
                    this.activatedFirstElement();
                },
                selectWorld: function (text) {
                    setFocusInput();
                    this.searchValue = text;
                    this.isActiveSearch = false;
                    this.scrollToTop();
                },
                addWorld: function (text) {
                    setFocusInput();
                    this.searchValue = "";
                    this.isActiveSearch = false;
                    var id = this.listUserLines.length > 0 ? this.listUserLines.length - 1 : 0;
                    this.listUserLines.unshift(new UserLine(id, text, "", false));
                    this.scrollToTop();
                },
                addWorldFromInput: function (e) {
                    if (e.keyCode !== 13)
                        return;
                    this.isActiveSearch = false;
                    if (this.searchValue.length === 0)
                        return;
                    setFocusInput();
                    var id = this.listUserLines.length > 0 ? this.listUserLines.length - 1 : 0;
                    var lastSpace = this.searchValue.lastIndexOf(' ');
                    var lastStr = this.searchValue.substring(lastSpace + 1);
                    var arrStrs = [];
                    var hascount = false;
                    switch (lastStr.charAt(0)) {
                        case '0':
                        case '1':
                        case '2':
                        case '3':
                        case '4':
                        case '5':
                        case '6':
                        case '7':
                        case '8':
                        case '9':
                            hascount = true;
                            break;
                    }
                    if (lastSpace > 0 && hascount == true) {
                        arrStrs = [this.searchValue.substring(0, lastSpace), lastStr];
                    }
                    else {
                        arrStrs = [this.searchValue];
                    }
                    if (!this.isContainsWorld(arrStrs[0].toLowerCase())) {
                        this.listUserLines.unshift(new UserLine(id, arrStrs[0], arrStrs.length > 1 ? arrStrs[1] : "", false));
                        this.scrollToTop();
                    }
                    else {
                        try {
                            navigator.notification.alert('Этот товар уже есть в списке :)', // message
                            alertDismissed, // callback
                            '', // title
                            'ОК' // buttonName
                            );
                        }
                        catch (err) {
                        }
                    }
                    this.searchValue = "";
                }
            }
        });
    }
    return ListManager;
}());
function alertDismissed() {
}
function setFocusInput() {
    document.getElementById("searchinput").focus();
}
var UserLine = /** @class */ (function () {
    function UserLine(position, text1, text2, isDisabled) {
        this.isDisabled = isDisabled;
        this.position = position;
        this.text1 = text1;
        this.text2 = text2;
    }
    return UserLine;
}());
var main;
var listManager;
var listWorlds;
function onLoadPage() {
    dbTest();
    data = new AppData();
    main = new Main();
    listWorlds = new ListWorlds();
    listManager = new ListManager();
}
function dbTest() {
    initDatabase();
    addRecord();
    selectRecords();
}
var database = null;
var nextUser = 101;
function initDatabase() {
    database = window.sqlitePlugin.openDatabase({ name: 'sample.db', location: 'default' });
    database.transaction(function (transaction) {
        transaction.executeSql('CREATE TABLE SampleTable (name, score)');
    });
}
function echoTest() {
    window.sqlitePlugin.echoTest(function () {
        window.navigator.notification.alert('Echo test OK------------');
    }, function (error) {
        window.navigator.notification.alert('Echo test ERROR: ----------------' + error.message);
    });
}
function addRecord() {
    database.transaction(function (transaction) {
        transaction.executeSql('INSERT INTO SampleTable VALUES (?,?)', ['User ' + nextUser, nextUser]);
    }, function (error) {
        window.navigator.notification.alert('INSERT error: ' + error.message);
    }, function () {
        window.navigator.notification.alert('INSERT OK');
        ++nextUser;
    });
}
function selectRecords() {
    database.transaction(function (transaction) {
        transaction.executeSql('SELECT * FROM SampleTable', [], function (ignored, result) {
            window.navigator.notification.alert("tread console");
            for (var i = 0; i < result.rows.length; i++) {
                console.log(result.rows.item(i).name);
            }
        });
    }, function (error) {
        window.navigator.notification.alert('SELECT count error: ' + error.message);
    });
}
//# sourceMappingURL=list-manager.js.map