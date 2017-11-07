var ListManager = (function () {
    function ListManager() {
        var _this = this;
        this.bodyBlock = document.getElementById('deviceready');
        this.searchBlock = this.bodyBlock.querySelector('.search-block');
        var date = [
            new UserLine(0, "Text0", "Text2", false),
            new UserLine(1, "Text1", "Text2", false),
            new UserLine(2, "Text2", "Text2", false),
            new UserLine(3, "Text3", "Text2", false),
            new UserLine(4, "Text4", "Text2", false),
            new UserLine(5, "Text5", "Text2", false),
            new UserLine(6, "Text6", "Text2", false)
        ];
        this.vm = new Vue({
            el: "#listmanager",
            data: {
                isActiveSearch: false,
                searchValue: "",
                isLong: true,
                listUserLines: date,
                listItemWorlds: []
            },
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
                    _this.vm.$data.searchValue = text;
                    _this.vm.$data.isActiveSearch = false;
                }
            }
        });
    }
    return ListManager;
}());
var UserLine = (function () {
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