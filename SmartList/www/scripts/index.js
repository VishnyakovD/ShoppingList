// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397705
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
define("application", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function initialize() {
        document.addEventListener('deviceready', onDeviceReady, false);
    }
    exports.initialize = initialize;
    function onDeviceReady() {
        document.addEventListener('pause', onPause, false);
        document.addEventListener('resume', onResume, false);
        onLoadPage();
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        //var parentElement = document.getElementById('deviceready');
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');
        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');
    }
    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    }
    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    }
});
define("startup", ["require", "exports", "application"], function (require, exports, Application) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // Try and load platform-specific code from the /merges folder.
    // More info at http://taco.visualstudio.com/en-us/docs/configure-app/#Content.
    require(["./platformOverrides"], () => Application.initialize(), () => Application.initialize());
});
class AppData {
    constructor() {
        this.isActiveSearch = false;
        this.searchValue = "";
        this.isLong = true;
        this.listUserLines = [];
        this.listItemWorlds = [];
    }
}
class ListManager {
    constructor() {
        this.bodyBlock = document.getElementById('deviceready');
        this.searchBlock = this.bodyBlock.querySelector('.search-block');
        let data = new AppData();
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
                    this.listItemWorlds = listWorlds.listWorlds.filter(item => { if (item.name.toLowerCase().indexOf(newValue.toLowerCase()) === 0)
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
}
class UserLine {
    constructor(position, text1, text2, isDisabled) {
        this.isDisabled = isDisabled;
        this.position = position;
        this.text1 = text1;
        this.text2 = text2;
    }
}
var main;
var listManager;
var listWorlds;
function onLoadPage() {
    main = new Main();
    listWorlds = new ListWorlds();
    listManager = new ListManager();
}
class ListWorlds {
    constructor() {
        this.listWorlds = [];
        switch (main.lang) {
            case Language.rus:
                this.listWorlds.push(new ItemWorld(1, "Батон", Language.rus));
                this.listWorlds.push(new ItemWorld(2, "Мясо", Language.rus));
                this.listWorlds.push(new ItemWorld(3, "Яйца", Language.rus));
                this.listWorlds.push(new ItemWorld(4, "Колбаса", Language.rus));
                this.listWorlds.push(new ItemWorld(5, "Банан", Language.rus));
                this.listWorlds.push(new ItemWorld(6, "Персик", Language.rus));
                break;
            case Language.eng:
                break;
            case Language.ukr:
                break;
        }
    }
}
class ItemWorld {
    constructor(id, name, lang) {
        this.id = id;
        this.name = name;
        this.lang = lang;
    }
}
var Language;
(function (Language) {
    Language[Language["rus"] = 1] = "rus";
    Language[Language["eng"] = 2] = "eng";
    Language[Language["ukr"] = 3] = "ukr";
})(Language || (Language = {}));
class Main {
    constructor() {
        this.lang = Language.rus;
    }
}
