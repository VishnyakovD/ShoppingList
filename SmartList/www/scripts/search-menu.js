var ListManager = (function () {
    function ListManager() {
        this.bodyBlock = document.getElementById('deviceready');
        this.searchBlock = this.bodyBlock.querySelector('.search-block');
        this.vm = new Vue({
            el: "#search",
            data: {
                searchValue: "",
                isLong: true
            },
            watch: {
                searchValue: function (newValue, oldWalue) {
                    var its = listWorlds.listWorlds.filter(function (item) { if (item.name.toLowerCase().includes(newValue.toLowerCase()))
                        return item; });
                }
            },
            methods: {}
        });
    }
    return ListManager;
}());
var main;
var listManager;
var smartList;
var listWorlds;
function onLoadPage() {
    main = new Main();
    listManager = new ListManager();
    smartList = new SmartList();
    listWorlds = new ListWorlds();
}
//# sourceMappingURL=search-menu.js.map