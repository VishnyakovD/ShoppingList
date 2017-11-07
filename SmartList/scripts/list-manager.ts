class ListManager {
	vm: vuejs.Vue;
	bodyBlock;
	searchBlock;
	constructor() {
		this.bodyBlock = document.getElementById('deviceready');
		this.searchBlock = this.bodyBlock.querySelector('.search-block');

		var date =
			[
				new UserLine(0, "Text0", "Text2", false),
				new UserLine(1, "Text1", "Text2", false),
				new UserLine(2, "Text2", "Text2", false),
				new UserLine(3, "Text3", "Text2", false),
				new UserLine(4, "Text4", "Text2", false),
				new UserLine(5, "Text5", "Text2", false),
				new UserLine(6, "Text6", "Text2", false)
			]
		
		this.vm = new Vue({
			el: "#listmanager",
			data: {
				isActiveSearch:false,
				searchValue: "",
				isLong: true,
				listUserLines: date,
				listItemWorlds: []
			},
			watch: {
				searchValue: function (newValue, oldWalue) {//вызывается когда произошло изменение searchValue
					if (newValue.length < 1)
					{
						this.isActiveSearch = false;
						return;
					}
					this.isActiveSearch = true;
					this.listItemWorlds = listWorlds.listWorlds.filter(item => { if (item.name.toLowerCase().indexOf(newValue.toLowerCase())===0) return item; })
				}
			},
			methods: {
				addUserLine: () => {
					//listUserLines.push(new UserLine(this.vm.$data.listUserLines.length - 1, this.vm.$data.searchValue, "Text2", false));
				},
				selectWorld: (text: string) => {

					this.vm.$data.searchValue = text;
					this.vm.$data.isActiveSearch = false;
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

