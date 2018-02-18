class AppData {
	isActiveSearch = false;
	activeFirstElement = false;
	searchValue = "";
	isLong = true;
	listUserLines: UserLine[] = [];
	listItemWorlds = [];
}

let data: AppData;

class ListManager {
	vm: vuejs.Vue;

	constructor() {

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
				searchValue: function (newValue, oldWalue) {//вызывается когда произошло изменение searchValue
					if (newValue.length < 1) {
						this.isActiveSearch = false;
						return;
					}
					this.isActiveSearch = true;
					this.listItemWorlds = listWorlds.listWorlds.filter(item => { if (item.name.toLowerCase().indexOf(newValue.toLowerCase()) === 0) return item; })
				}
			},
			methods: {
				activatedFirstElement: function () {
					this.activeFirstElement = true;
					var _this = this;
					setTimeout(function () { _this.activeFirstElement = false; }, 2000)

				},
				isContainsWorld: function (text): boolean {	
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
				selectWorld: function (text: string) {
					setFocusInput();

					this.searchValue = text;
					this.isActiveSearch = false;
					this.scrollToTop();
				},
				addWorld: function (text: string) {
					setFocusInput();

					this.searchValue = "";
					this.isActiveSearch = false;
					let id = this.listUserLines.length > 0 ? this.listUserLines.length - 1 : 0;
					this.listUserLines.unshift(new UserLine(id, text, "", false));

					this.scrollToTop();
				},
				addWorldFromInput: function (e) {
					if (e.keyCode !== 13) return;

					this.isActiveSearch = false;

					if (this.searchValue.length === 0) return;

					setFocusInput();

					let id = this.listUserLines.length > 0 ? this.listUserLines.length - 1 : 0;
					let lastSpace = this.searchValue.lastIndexOf(' ');
					let lastStr = this.searchValue.substring(lastSpace + 1);
					let arrStrs = [];
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
					} else {
						arrStrs = [this.searchValue];
					}

					if (!this.isContainsWorld(arrStrs[0].toLowerCase())) {
						this.listUserLines.unshift(new UserLine(id, arrStrs[0], arrStrs.length > 1 ? arrStrs[1] : "", false));
						this.scrollToTop();
					}
					else {
				
						try {
							navigator.notification.alert(
								'Этот товар уже есть в списке :)',  // message
								alertDismissed,                     // callback
								'',			                        // title
								'ОК'                                // buttonName
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
}

function alertDismissed(): void {

}

function setFocusInput() {
	document.getElementById("searchinput").focus();
}

class UserLine {
	position: number;
	text1: string;
	text2: string;
	isDisabled: boolean;

	constructor(position: number, text1: string, text2: string, isDisabled: boolean) {
		this.isDisabled = isDisabled;
		this.position = position;
		this.text1 = text1;
		this.text2 = text2;
	}
}

var main: Main;
var listManager: ListManager;
var listWorlds: ListWorlds;

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
	database = (<any>window).sqlitePlugin.openDatabase({ name: 'sample.db', location: 'default' });

	database.transaction(function (transaction) {
		transaction.executeSql('CREATE TABLE SampleTable (name, score)');
	});
}

function echoTest() {
	(<any>window).sqlitePlugin.echoTest(function () {
		(<any>window).navigator.notification.alert('Echo test OK------------');
	}, function (error) {
		(<any>window).navigator.notification.alert('Echo test ERROR: ----------------' + error.message);
	});
}

function addRecord() {
	database.transaction(function (transaction) {
		transaction.executeSql('INSERT INTO SampleTable VALUES (?,?)', ['User ' + nextUser, nextUser]);
	}, function (error) {
		(<any>window).navigator.notification.alert('INSERT error: ' + error.message);
	}, function () {
		(<any>window).navigator.notification.alert('INSERT OK');
		++nextUser;
	});
}

function selectRecords() {
	database.transaction(function (transaction) {
		transaction.executeSql('SELECT * FROM SampleTable', [], function (ignored, result) {
			(<any>window).navigator.notification.alert("tread console");
			
			for (var i = 0; i < result.rows.length; i++) {
				console.log(result.rows.item(i).name);
			}
			
		
		
		});
	}, function (error) {
		(<any>window).navigator.notification.alert('SELECT count error: ' + error.message);
	});
}