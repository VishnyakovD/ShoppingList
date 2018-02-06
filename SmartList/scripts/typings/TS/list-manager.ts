class AppData {
	isActiveSearch = false;
	searchValue = "";
	isLong = true;
	listUserLines: UserLine[] = [];
	listItemWorlds = [];
}

class ListManager {
	vm: vuejs.Vue;

	constructor() {


		let data: AppData = new AppData();
		

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

				selectWorld: function (text: string) { 
					this.searchValue = text;
					this.isActiveSearch = false;
				},
				addWorld: function (text: string) {
					this.searchValue = "";
					this.isActiveSearch = false;
					let id = this.listUserLines.length > 0 ?  this.listUserLines.length - 1 : 0;
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
						} else {
							arrStrs = [this.searchValue];
						}


						
						this.listUserLines.push(new UserLine(id, arrStrs[0], arrStrs.length > 1 ? arrStrs[1]:"", false));						
						this.searchValue = "";
					}
				}


			}
		});
	}
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
	main = new Main();
	listWorlds = new ListWorlds();
	listManager = new ListManager();

}

