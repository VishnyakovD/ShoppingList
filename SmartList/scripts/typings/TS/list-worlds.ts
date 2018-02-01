class ListWorlds {
	listWorlds: ItemWorld[];
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
	id: number;
	name: string;
	lang: Language;

	constructor(id: number, name: string, lang: Language) {
		this.id = id;
		this.name = name;
		this.lang = lang;
	}
}


enum Language {
	"rus" = 1,
	"eng" = 2,
	"ukr" = 3
}