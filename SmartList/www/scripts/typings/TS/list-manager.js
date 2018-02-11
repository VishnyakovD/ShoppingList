var AppData = /** @class */ (function () {
    function AppData() {
        this.isActiveSearch = false;
        this.searchValue = "";
        this.isLong = true;
        this.listUserLines = [];
        this.listItemWorlds = [];
    }
    return AppData;
}());
var ListManager = /** @class */ (function () {
    function ListManager() {
        var data = new AppData();
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
                scrollToTop: function () {
                    var container = document.querySelector("#userlist");
                    container.scrollTop = 0;
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
                    if (e.keyCode === 13) {
                        if (this.searchValue.length === 0) {
                            this.isActiveSearch = false;
                            return;
                        }
                        setFocusInput();
                        this.isActiveSearch = false;
                        var id = this.listUserLines.length > 0 ? this.listUserLines.length - 1 : 0;
                        var lastSpace = this.searchValue.lastIndexOf(' ');
                        var arrStrs = [];
                        if (lastSpace > 0) {
                            arrStrs = [this.searchValue.substring(0, lastSpace), this.searchValue.substring(lastSpace + 1)];
                        }
                        else {
                            arrStrs = [this.searchValue];
                        }
                        this.listUserLines.unshift(new UserLine(id, arrStrs[0], arrStrs.length > 1 ? arrStrs[1] : "", false));
                        this.searchValue = "";
                        this.scrollToTop();
                    }
                }
            }
        });
    }
    return ListManager;
}());
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
    main = new Main();
    listWorlds = new ListWorlds();
    listManager = new ListManager();
}
//# sourceMappingURL=list-manager.js.map