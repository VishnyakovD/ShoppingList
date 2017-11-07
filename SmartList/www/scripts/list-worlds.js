var ListWorlds = (function () {
    function ListWorlds() {
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
    return ListWorlds;
}());
var ItemWorld = (function () {
    function ItemWorld(id, name, lang) {
        this.id = id;
        this.name = name;
        this.lang = lang;
    }
    return ItemWorld;
}());
var Language;
(function (Language) {
    Language[Language["rus"] = 1] = "rus";
    Language[Language["eng"] = 2] = "eng";
    Language[Language["ukr"] = 3] = "ukr";
})(Language || (Language = {}));
//# sourceMappingURL=list-worlds.js.map