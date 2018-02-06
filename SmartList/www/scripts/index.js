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
        let data = new AppData();
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
                    this.listItemWorlds = listWorlds.listWorlds.filter(item => { if (item.name.toLowerCase().indexOf(newValue.toLowerCase()) === 0)
                        return item; });
                }
            },
            methods: {
                selectWorld: function (text) {
                    this.searchValue = text;
                    this.isActiveSearch = false;
                },
                addWorld: function (text) {
                    this.searchValue = "";
                    this.isActiveSearch = false;
                    let id = this.listUserLines.length > 0 ? this.listUserLines.length - 1 : 0;
                    this.listUserLines.push(new UserLine(id, text, "", false));
                },
                addWorldFromInput: function (e) {
                    if (e.keyCode === 13) {
                        if (this.searchValue.length === 0) {
                            this.isActiveSearch = false;
                            return;
                        }
                        this.isActiveSearch = false;
                        let id = this.listUserLines.length > 0 ? this.listUserLines.length - 1 : 0;
                        let lastSpace = this.searchValue.lastIndexOf(' ');
                        let arrStrs = [];
                        if (lastSpace > 0) {
                            arrStrs = [this.searchValue.substring(0, lastSpace), this.searchValue.substring(lastSpace + 1)];
                        }
                        else {
                            arrStrs = [this.searchValue];
                        }
                        this.listUserLines.push(new UserLine(id, arrStrs[0], arrStrs.length > 1 ? arrStrs[1] : "", false));
                        this.searchValue = "";
                    }
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
                this.listWorlds.push(new ItemWorld(1, "Абиу", Language.rus));
                this.listWorlds.push(new ItemWorld(2, "Абрикос", Language.rus));
                this.listWorlds.push(new ItemWorld(3, "Авокадо", Language.rus));
                this.listWorlds.push(new ItemWorld(4, "Айва", Language.rus));
                this.listWorlds.push(new ItemWorld(5, "Аки", Language.rus));
                this.listWorlds.push(new ItemWorld(6, "Алиберция", Language.rus));
                this.listWorlds.push(new ItemWorld(7, "Алыча", Language.rus));
                this.listWorlds.push(new ItemWorld(8, "Амбарелла", Language.rus));
                this.listWorlds.push(new ItemWorld(9, "Американский абрикос", Language.rus));
                this.listWorlds.push(new ItemWorld(10, "Американский орех", Language.rus));
                this.listWorlds.push(new ItemWorld(11, "Ананас", Language.rus));
                this.listWorlds.push(new ItemWorld(12, "Аннона горная", Language.rus));
                this.listWorlds.push(new ItemWorld(13, "Аннона колючая", Language.rus));
                this.listWorlds.push(new ItemWorld(14, "Аннона сетчатая", Language.rus));
                this.listWorlds.push(new ItemWorld(15, "Аннона черимола", Language.rus));
                this.listWorlds.push(new ItemWorld(16, "Аннона чешуйчатая", Language.rus));
                this.listWorlds.push(new ItemWorld(17, "Антильский крыжовник", Language.rus));
                this.listWorlds.push(new ItemWorld(18, "Апельсин", Language.rus));
                this.listWorlds.push(new ItemWorld(19, "Арабика", Language.rus));
                this.listWorlds.push(new ItemWorld(20, "Араза", Language.rus));
                this.listWorlds.push(new ItemWorld(21, "Арахис", Language.rus));
                this.listWorlds.push(new ItemWorld(22, "Арбуз обыкновенный", Language.rus));
                this.listWorlds.push(new ItemWorld(23, "Астрокариум колючий", Language.rus));
                this.listWorlds.push(new ItemWorld(24, "Атимойя", Language.rus));
                this.listWorlds.push(new ItemWorld(25, "Африканский колючий огурец", Language.rus));
                this.listWorlds.push(new ItemWorld(26, "Африканский тамаринд", Language.rus));
                this.listWorlds.push(new ItemWorld(27, "Бакау", Language.rus));
                this.listWorlds.push(new ItemWorld(28, "Баклажан", Language.rus));
                this.listWorlds.push(new ItemWorld(29, "Балия", Language.rus));
                this.listWorlds.push(new ItemWorld(30, "Бананы", Language.rus));
                this.listWorlds.push(new ItemWorld(31, "Баобаб", Language.rus));
                this.listWorlds.push(new ItemWorld(32, "Барбадин (Большая гранадилла)", Language.rus));
                this.listWorlds.push(new ItemWorld(33, "Барбадосская вишня", Language.rus));
                this.listWorlds.push(new ItemWorld(34, "Бархатное яблоко", Language.rus));
                this.listWorlds.push(new ItemWorld(35, "Баэль", Language.rus));
                this.listWorlds.push(new ItemWorld(36, "Белая сапота", Language.rus));
                this.listWorlds.push(new ItemWorld(37, "Бергамот", Language.rus));
                this.listWorlds.push(new ItemWorld(38, "Билимби", Language.rus));
                this.listWorlds.push(new ItemWorld(39, "Бирсонима", Language.rus));
                this.listWorlds.push(new ItemWorld(40, "Блигия вкусная", Language.rus));
                this.listWorlds.push(new ItemWorld(41, "Большой змеиный фрукт", Language.rus));
                this.listWorlds.push(new ItemWorld(42, "Боярышник", Language.rus));
                this.listWorlds.push(new ItemWorld(43, "Бразильский орех", Language.rus));
                this.listWorlds.push(new ItemWorld(44, "Бычье сердце", Language.rus));
                this.listWorlds.push(new ItemWorld(45, "Вампи", Language.rus));
                this.listWorlds.push(new ItemWorld(46, "Вангерия", Language.rus));
                this.listWorlds.push(new ItemWorld(47, "Ваниль", Language.rus));
                this.listWorlds.push(new ItemWorld(48, "Виноград", Language.rus));
                this.listWorlds.push(new ItemWorld(49, "Вишня", Language.rus));
                this.listWorlds.push(new ItemWorld(50, "Воаванга", Language.rus));
                this.listWorlds.push(new ItemWorld(51, "Водяное(восковое) яблоко", Language.rus));
                this.listWorlds.push(new ItemWorld(52, "Гандария", Language.rus));
                this.listWorlds.push(new ItemWorld(53, "Генипа", Language.rus));
                this.listWorlds.push(new ItemWorld(54, "Гибискус съедобный", Language.rus));
                this.listWorlds.push(new ItemWorld(55, "Гнетум гнемон", Language.rus));
                this.listWorlds.push(new ItemWorld(56, "Голубиная слива", Language.rus));
                this.listWorlds.push(new ItemWorld(57, "Голубой квандонг", Language.rus));
                this.listWorlds.push(new ItemWorld(58, "Горлянка", Language.rus));
                this.listWorlds.push(new ItemWorld(59, "Горький огурец", Language.rus));
                this.listWorlds.push(new ItemWorld(60, "Гранадилла (Маракуйа)", Language.rus));
                this.listWorlds.push(new ItemWorld(61, "Гранадилла большая (Барбадин)", Language.rus));
                this.listWorlds.push(new ItemWorld(62, "Гранадилла сладкая", Language.rus));
                this.listWorlds.push(new ItemWorld(63, "Гранат", Language.rus));
                this.listWorlds.push(new ItemWorld(64, "Грейпфрут", Language.rus));
                this.listWorlds.push(new ItemWorld(65, "Грумичама", Language.rus));
                this.listWorlds.push(new ItemWorld(66, "Груша", Language.rus));
                this.listWorlds.push(new ItemWorld(67, "Гуайява земляничная", Language.rus));
                this.listWorlds.push(new ItemWorld(68, "Гуайява коста-риканская", Language.rus));
                this.listWorlds.push(new ItemWorld(69, "Гуайява красная", Language.rus));
                this.listWorlds.push(new ItemWorld(70, "Гуайява обыкновенная", Language.rus));
                this.listWorlds.push(new ItemWorld(71, "Гуарана", Language.rus));
                this.listWorlds.push(new ItemWorld(72, "Давидсония", Language.rus));
                this.listWorlds.push(new ItemWorld(73, "Дамские пальчики", Language.rus));
                this.listWorlds.push(new ItemWorld(74, "Деревянное яблоко", Language.rus));
                this.listWorlds.push(new ItemWorld(75, "Десертный квандонг", Language.rus));
                this.listWorlds.push(new ItemWorld(76, "Джекфрут", Language.rus));
                this.listWorlds.push(new ItemWorld(77, "Древесная калебаса", Language.rus));
                this.listWorlds.push(new ItemWorld(78, "Дуку", Language.rus));
                this.listWorlds.push(new ItemWorld(79, "Дуриан", Language.rus));
                this.listWorlds.push(new ItemWorld(80, "Дуриан цибетиновый", Language.rus));
                this.listWorlds.push(new ItemWorld(81, "Дынная груша", Language.rus));
                this.listWorlds.push(new ItemWorld(82, "Дынное дерево", Language.rus));
                this.listWorlds.push(new ItemWorld(83, "Дыня обыкновенная", Language.rus));
                this.listWorlds.push(new ItemWorld(84, "Евгения одноцветковая", Language.rus));
                this.listWorlds.push(new ItemWorld(85, "Жаботикаба", Language.rus));
                this.listWorlds.push(new ItemWorld(86, "Звездчатое яблоко", Language.rus));
                this.listWorlds.push(new ItemWorld(87, "Земляничная груша", Language.rus));
                this.listWorlds.push(new ItemWorld(88, "Земляничный томат", Language.rus));
                this.listWorlds.push(new ItemWorld(89, "Земляной орех", Language.rus));
                this.listWorlds.push(new ItemWorld(90, "Зизифус мавританский", Language.rus));
                this.listWorlds.push(new ItemWorld(91, "Золотая слива", Language.rus));
                this.listWorlds.push(new ItemWorld(92, "Золотистый апельсин", Language.rus));
                this.listWorlds.push(new ItemWorld(93, "Индийские бобы", Language.rus));
                this.listWorlds.push(new ItemWorld(94, "Индийский инжир", Language.rus));
                this.listWorlds.push(new ItemWorld(95, "Индийский миндаль", Language.rus));
                this.listWorlds.push(new ItemWorld(96, "Индийское розовое яблоко", Language.rus));
                this.listWorlds.push(new ItemWorld(97, "Инжир", Language.rus));
                this.listWorlds.push(new ItemWorld(98, "Кабачки", Language.rus));
                this.listWorlds.push(new ItemWorld(99, "Каинито", Language.rus));
                this.listWorlds.push(new ItemWorld(100, "Какао", Language.rus));
                this.listWorlds.push(new ItemWorld(101, "Кактус инжировый", Language.rus));
                this.listWorlds.push(new ItemWorld(102, "Каламондин", Language.rus));
                this.listWorlds.push(new ItemWorld(103, "Калебаса", Language.rus));
                this.listWorlds.push(new ItemWorld(104, "Канариум яйцевидный", Language.rus));
                this.listWorlds.push(new ItemWorld(105, "Капский крыжовник", Language.rus));
                this.listWorlds.push(new ItemWorld(106, "Карамбола", Language.rus));
                this.listWorlds.push(new ItemWorld(107, "Кас", Language.rus));
                this.listWorlds.push(new ItemWorld(108, "Квини", Language.rus));
                this.listWorlds.push(new ItemWorld(109, "Квислендский орех", Language.rus));
                this.listWorlds.push(new ItemWorld(110, "Кепель", Language.rus));
                this.listWorlds.push(new ItemWorld(111, "Кетамбилла", Language.rus));
                this.listWorlds.push(new ItemWorld(112, "Кивано", Language.rus));
                this.listWorlds.push(new ItemWorld(113, "Киви", Language.rus));
                this.listWorlds.push(new ItemWorld(114, "Китайская калебаса", Language.rus));
                this.listWorlds.push(new ItemWorld(115, "Клементин", Language.rus));
                this.listWorlds.push(new ItemWorld(116, "Кокколоба ягодоносная", Language.rus));
                this.listWorlds.push(new ItemWorld(117, "Кокос", Language.rus));
                this.listWorlds.push(new ItemWorld(118, "Корилла", Language.rus));
                this.listWorlds.push(new ItemWorld(119, "Кофейные деревья", Language.rus));
                this.listWorlds.push(new ItemWorld(120, "Кранжи", Language.rus));
                this.listWorlds.push(new ItemWorld(121, "Кумкват овальный", Language.rus));
                this.listWorlds.push(new ItemWorld(122, "Купуасу", Language.rus));
                this.listWorlds.push(new ItemWorld(123, "Курбарил", Language.rus));
                this.listWorlds.push(new ItemWorld(124, "Кустовой горошек", Language.rus));
                this.listWorlds.push(new ItemWorld(125, "Лайм настоящий", Language.rus));
                this.listWorlds.push(new ItemWorld(126, "Лангсат", Language.rus));
                this.listWorlds.push(new ItemWorld(127, "Лансиум домашний", Language.rus));
                this.listWorlds.push(new ItemWorld(128, "Леуцена светлоголовчатая", Language.rus));
                this.listWorlds.push(new ItemWorld(129, "Либерика", Language.rus));
                this.listWorlds.push(new ItemWorld(130, "Ликания", Language.rus));
                this.listWorlds.push(new ItemWorld(131, "Лимон грубокожистый", Language.rus));
                this.listWorlds.push(new ItemWorld(132, "Лимон обыкновенный", Language.rus));
                this.listWorlds.push(new ItemWorld(133, "Лимон Мейера", Language.rus));
                this.listWorlds.push(new ItemWorld(134, "Лимонная осина", Language.rus));
                this.listWorlds.push(new ItemWorld(135, "Личи", Language.rus));
                this.listWorlds.push(new ItemWorld(136, "Лобия", Language.rus));
                this.listWorlds.push(new ItemWorld(137, "Ложный мангустан", Language.rus));
                this.listWorlds.push(new ItemWorld(138, "Лох узколистный", Language.rus));
                this.listWorlds.push(new ItemWorld(139, "Лукума", Language.rus));
                this.listWorlds.push(new ItemWorld(140, "Луло", Language.rus));
                this.listWorlds.push(new ItemWorld(141, "Люффа остроребристая", Language.rus));
                this.listWorlds.push(new ItemWorld(142, "Маболо", Language.rus));
                this.listWorlds.push(new ItemWorld(143, "Мадагаскарская слива", Language.rus));
                this.listWorlds.push(new ItemWorld(144, "Макадамия цельнолистная", Language.rus));
                this.listWorlds.push(new ItemWorld(145, "Малабарская тыква", Language.rus));
                this.listWorlds.push(new ItemWorld(146, "Малабарский апельсин", Language.rus));
                this.listWorlds.push(new ItemWorld(147, "Малайское яблоко", Language.rus));
                this.listWorlds.push(new ItemWorld(148, "Малуко", Language.rus));
                this.listWorlds.push(new ItemWorld(149, "Мальпигия гранатолистная", Language.rus));
                this.listWorlds.push(new ItemWorld(150, "Маммея американская", Language.rus));
                this.listWorlds.push(new ItemWorld(151, "Мамончилло (Лайм испанский)", Language.rus));
                this.listWorlds.push(new ItemWorld(152, "Манго благоухающее", Language.rus));
                this.listWorlds.push(new ItemWorld(153, "Манго великолепное", Language.rus));
                this.listWorlds.push(new ItemWorld(154, "Манго индийское", Language.rus));
                this.listWorlds.push(new ItemWorld(155, "Манго резко пахнущее", Language.rus));
                this.listWorlds.push(new ItemWorld(156, "Мангостан", Language.rus));
                this.listWorlds.push(new ItemWorld(157, "Мангустан", Language.rus));
                this.listWorlds.push(new ItemWorld(158, "Мандарин", Language.rus));
                this.listWorlds.push(new ItemWorld(159, "Манилкара", Language.rus));
                this.listWorlds.push(new ItemWorld(160, "Маракуйя", Language.rus));
                this.listWorlds.push(new ItemWorld(161, "Мармеладный плод", Language.rus));
                this.listWorlds.push(new ItemWorld(162, "Марула", Language.rus));
                this.listWorlds.push(new ItemWorld(163, "Мауриция извилистая", Language.rus));
                this.listWorlds.push(new ItemWorld(164, "Маш", Language.rus));
                this.listWorlds.push(new ItemWorld(165, "Мексиканская земляная вишня", Language.rus));
                this.listWorlds.push(new ItemWorld(166, "Мексиканский огурец", Language.rus));
                this.listWorlds.push(new ItemWorld(167, "Мелинжо", Language.rus));
                this.listWorlds.push(new ItemWorld(168, "Моква", Language.rus));
                this.listWorlds.push(new ItemWorld(169, "Момбин желтый", Language.rus));
                this.listWorlds.push(new ItemWorld(170, "Момбин красный", Language.rus));
                this.listWorlds.push(new ItemWorld(171, "Момордика", Language.rus));
                this.listWorlds.push(new ItemWorld(172, "Моринда", Language.rus));
                this.listWorlds.push(new ItemWorld(173, "Мунду", Language.rus));
                this.listWorlds.push(new ItemWorld(174, "Мускатный орех", Language.rus));
                this.listWorlds.push(new ItemWorld(175, "Мушмула японская", Language.rus));
                this.listWorlds.push(new ItemWorld(176, "Наранхилла", Language.rus));
                this.listWorlds.push(new ItemWorld(177, "Ням-ням", Language.rus));
                this.listWorlds.push(new ItemWorld(178, "Обезьяний хлеб", Language.rus));
                this.listWorlds.push(new ItemWorld(179, "Огурец", Language.rus));
                this.listWorlds.push(new ItemWorld(180, "Огуречное дерево", Language.rus));
                this.listWorlds.push(new ItemWorld(181, "Орех кешью", Language.rus));
                this.listWorlds.push(new ItemWorld(182, "Пальма катеху", Language.rus));
                this.listWorlds.push(new ItemWorld(183, "Пальма кокосовая", Language.rus));
                this.listWorlds.push(new ItemWorld(184, "Пальма масличная африканская", Language.rus));
                this.listWorlds.push(new ItemWorld(185, "Пальма персиковая", Language.rus));
                this.listWorlds.push(new ItemWorld(186, "Пальчиковый лайм", Language.rus));
                this.listWorlds.push(new ItemWorld(187, "Папайя", Language.rus));
                this.listWorlds.push(new ItemWorld(188, "Папайя горная", Language.rus));
                this.listWorlds.push(new ItemWorld(189, "Папеда", Language.rus));
                this.listWorlds.push(new ItemWorld(190, "Паприка", Language.rus));
                this.listWorlds.push(new ItemWorld(191, "Пара-гуайява", Language.rus));
                this.listWorlds.push(new ItemWorld(192, "Паркия красивая", Language.rus));
                this.listWorlds.push(new ItemWorld(193, "Пассифлора съедобная", Language.rus));
                this.listWorlds.push(new ItemWorld(194, "Пекуи", Language.rus));
                this.listWorlds.push(new ItemWorld(195, "Пепино", Language.rus));
                this.listWorlds.push(new ItemWorld(196, "Перец", Language.rus));
                this.listWorlds.push(new ItemWorld(197, "Перец кайенский", Language.rus));
                this.listWorlds.push(new ItemWorld(198, "Перец стручковый", Language.rus));
                this.listWorlds.push(new ItemWorld(199, "Персик", Language.rus));
                this.listWorlds.push(new ItemWorld(200, "Перуанская вишня", Language.rus));
                this.listWorlds.push(new ItemWorld(201, "Питайя", Language.rus));
                this.listWorlds.push(new ItemWorld(202, "Питомба", Language.rus));
                this.listWorlds.push(new ItemWorld(203, "Пиши", Language.rus));
                this.listWorlds.push(new ItemWorld(204, "Помело", Language.rus));
                this.listWorlds.push(new ItemWorld(205, "Померанец", Language.rus));
                this.listWorlds.push(new ItemWorld(206, "Помидор", Language.rus));
                this.listWorlds.push(new ItemWorld(207, "Помпельмус", Language.rus));
                this.listWorlds.push(new ItemWorld(208, "Понцирус (несъедобный плод)", Language.rus));
                this.listWorlds.push(new ItemWorld(209, "Приморский виноград", Language.rus));
                this.listWorlds.push(new ItemWorld(210, "Путерия", Language.rus));
                this.listWorlds.push(new ItemWorld(211, "Пуласан", Language.rus));
                this.listWorlds.push(new ItemWorld(212, "Ракум-салакка", Language.rus));
                this.listWorlds.push(new ItemWorld(213, "Рамбай", Language.rus));
                this.listWorlds.push(new ItemWorld(214, "Рамбутан", Language.rus));
                this.listWorlds.push(new ItemWorld(215, "Робуста", Language.rus));
                this.listWorlds.push(new ItemWorld(216, "Розовое яблоко", Language.rus));
                this.listWorlds.push(new ItemWorld(217, "Роллиния слизистая", Language.rus));
                this.listWorlds.push(new ItemWorld(218, "Салакка", Language.rus));
                this.listWorlds.push(new ItemWorld(219, "Салакка скученная", Language.rus));
                this.listWorlds.push(new ItemWorld(220, "Саламандровое дерево", Language.rus));
                this.listWorlds.push(new ItemWorld(221, "Сантол", Language.rus));
                this.listWorlds.push(new ItemWorld(222, "Саподилла", Language.rus));
                this.listWorlds.push(new ItemWorld(223, "Сатсума", Language.rus));
                this.listWorlds.push(new ItemWorld(224, "Сахарное яблоко", Language.rus));
                this.listWorlds.push(new ItemWorld(225, "Сахарный горошек", Language.rus));
                this.listWorlds.push(new ItemWorld(226, "Свечное дерево", Language.rus));
                this.listWorlds.push(new ItemWorld(227, "Свити", Language.rus));
                this.listWorlds.push(new ItemWorld(228, "Сизигиум аквеум", Language.rus));
                this.listWorlds.push(new ItemWorld(229, "Сизигиум малаккский", Language.rus));
                this.listWorlds.push(new ItemWorld(230, "Сизигиум ямбоза", Language.rus));
                this.listWorlds.push(new ItemWorld(231, "Сингапурский миндаль", Language.rus));
                this.listWorlds.push(new ItemWorld(232, "Слива", Language.rus));
                this.listWorlds.push(new ItemWorld(233, "Слива какаду", Language.rus));
                this.listWorlds.push(new ItemWorld(234, "Слоновье яблоко", Language.rus));
                this.listWorlds.push(new ItemWorld(235, "Сметанное яблоко", Language.rus));
                this.listWorlds.push(new ItemWorld(236, "Сонсоя", Language.rus));
                this.listWorlds.push(new ItemWorld(237, "Соя", Language.rus));
                this.listWorlds.push(new ItemWorld(238, "Спаржевая фасоль", Language.rus));
                this.listWorlds.push(new ItemWorld(239, "Страстоцвет", Language.rus));
                this.listWorlds.push(new ItemWorld(240, "Суринамская вишня", Language.rus));
                this.listWorlds.push(new ItemWorld(241, "Съедобный таитянский орех", Language.rus));
                this.listWorlds.push(new ItemWorld(242, "Таитянское яблоко", Language.rus));
                this.listWorlds.push(new ItemWorld(243, "Такако", Language.rus));
                this.listWorlds.push(new ItemWorld(244, "Тамарилло", Language.rus));
                this.listWorlds.push(new ItemWorld(245, "Тамаринд", Language.rus));
                this.listWorlds.push(new ItemWorld(246, "Танжерин", Language.rus));
                this.listWorlds.push(new ItemWorld(247, "Терминалия катаппа", Language.rus));
                this.listWorlds.push(new ItemWorld(248, "Томат настоящий", Language.rus));
                this.listWorlds.push(new ItemWorld(249, "Томатное дерево", Language.rus));
                this.listWorlds.push(new ItemWorld(250, "Тукума", Language.rus));
                this.listWorlds.push(new ItemWorld(251, "Тупа", Language.rus));
                this.listWorlds.push(new ItemWorld(252, "Тыква бутылочная", Language.rus));
                this.listWorlds.push(new ItemWorld(253, "Тыква восковая", Language.rus));
                this.listWorlds.push(new ItemWorld(254, "Тыква мускатная", Language.rus));
                this.listWorlds.push(new ItemWorld(255, "Тыква обыкновенная", Language.rus));
                this.listWorlds.push(new ItemWorld(256, "Тыква фиголистная", Language.rus));
                this.listWorlds.push(new ItemWorld(257, "Тыквенное дерево", Language.rus));
                this.listWorlds.push(new ItemWorld(258, "Фейхоа", Language.rus));
                this.listWorlds.push(new ItemWorld(259, "Ферония лимонная", Language.rus));
                this.listWorlds.push(new ItemWorld(260, "Ферония слоновая", Language.rus));
                this.listWorlds.push(new ItemWorld(261, "Физалис земляничный", Language.rus));
                this.listWorlds.push(new ItemWorld(262, "Филиппинское розовое яблоко", Language.rus));
                this.listWorlds.push(new ItemWorld(263, "Филлантус кислый", Language.rus));
                this.listWorlds.push(new ItemWorld(264, "Финик", Language.rus));
                this.listWorlds.push(new ItemWorld(265, "Флакурция", Language.rus));
                this.listWorlds.push(new ItemWorld(266, "Хлебное дерево", Language.rus));
                this.listWorlds.push(new ItemWorld(267, "Хлебные бобы", Language.rus));
                this.listWorlds.push(new ItemWorld(268, "Хурма восточная (японская)", Language.rus));
                this.listWorlds.push(new ItemWorld(269, "Цейлонский крыжовник", Language.rus));
                this.listWorlds.push(new ItemWorld(270, "Циклантера", Language.rus));
                this.listWorlds.push(new ItemWorld(271, "Цуккини", Language.rus));
                this.listWorlds.push(new ItemWorld(272, "Чайот", Language.rus));
                this.listWorlds.push(new ItemWorld(273, "Чампедак", Language.rus));
                this.listWorlds.push(new ItemWorld(274, "Черешня", Language.rus));
                this.listWorlds.push(new ItemWorld(275, "Черимойя", Language.rus));
                this.listWorlds.push(new ItemWorld(276, "Черная гуайява", Language.rus));
                this.listWorlds.push(new ItemWorld(277, "Черная сапота", Language.rus));
                this.listWorlds.push(new ItemWorld(278, "Черная хурма", Language.rus));
                this.listWorlds.push(new ItemWorld(279, "Черный тамаринд", Language.rus));
                this.listWorlds.push(new ItemWorld(280, "Чили", Language.rus));
                this.listWorlds.push(new ItemWorld(281, "Чилибуха колючая", Language.rus));
                this.listWorlds.push(new ItemWorld(282, "Чупа", Language.rus));
                this.listWorlds.push(new ItemWorld(283, "Шоколадное дерево", Language.rus));
                this.listWorlds.push(new ItemWorld(284, "Яблоко", Language.rus));
                this.listWorlds.push(new ItemWorld(285, "Яблоко-кажу", Language.rus));
                this.listWorlds.push(new ItemWorld(286, "Яботикаба", Language.rus));
                this.listWorlds.push(new ItemWorld(287, "Ямайская вишня", Language.rus));
                this.listWorlds.push(new ItemWorld(288, "Ятоба", Language.rus));
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
