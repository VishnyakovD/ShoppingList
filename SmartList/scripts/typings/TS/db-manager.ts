class DBManager {
	url: string = "http://ext.inf.ua/smartlist.json";
	isHasDB: boolean = false;
	database = null;
	dbName = "shoppinglist";

	constructor() {
		//проверить наличие базы данных
		if (!this.hasDB()) {
			//создать базу
		}

	}

	hasDB(): boolean {	//проверить наличие базы днных
		if (database !== null) return true;	

		  //Добавить флаг, нужно ли пересоздавать базу даных



		(<any>window).resolveLocalFileSystemURL(cordova.file.applicationStorageDirectory + `/databases/${this.dbName}.db`, this.fillDB, this.createDB);
		

		return false;
	}

	createDB() {	//создать базу даных


		this.createTables();
	}

	createTables() {	//создание таблиц
				   
		this.fillDB();
	}

	fillDB() {	//заполнение базы данных

	}

	getDataByText(text: string) { //получить данные по пользовательской строке

	}
}