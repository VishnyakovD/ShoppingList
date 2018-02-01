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
        this.bodyBlock = document.getElementById('deviceready');
        this.searchBlock = this.bodyBlock.querySelector('.search-block');
        var data = new AppData();
        data.listUserLines.push(new UserLine(0, "Text0", "Text2", false));
        data.listUserLines.push(new UserLine(1, "Text1", "Text2", false));
        data.listUserLines.push(new UserLine(2, "Text2", "Text2", false));
        data.listUserLines.push(new UserLine(3, "Text3", "Text2", false));
        data.listUserLines.push(new UserLine(4, "Text4", "Text2", false));
        data.listUserLines.push(new UserLine(5, "Text5", "Text2", false));
        data.listUserLines.push(new UserLine(6, "Text6", "Text2", false));
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
                addUserLine: function () {
                    //listUserLines.push(new UserLine(this.vm.$data.listUserLines.length - 1, this.vm.$data.searchValue, "Text2", false));
                },
                selectWorld: function (text) {
                    this.searchValue = text;
                    this.isActiveSearch = false;
                },
                addWorld: function (text) {
                    this.searchValue = "";
                    this.isActiveSearch = false;
                    this.listUserLines.push(new UserLine(444, text, "", false));
                }
            }
        });
    }
    return ListManager;
}());
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