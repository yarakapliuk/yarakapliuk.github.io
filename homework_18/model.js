var model = [
	{
		name: 'Купить молоко',
		description: 'Сходить на рынок и купить молоко',
		date: '2/18/1015',
		completed: false
	},
	{
		name: 'Посмотреть видео урок по Angular JS',
		description: 'Досмотреть до конца урок на itvdn.com',
		date: '2/18/1015',
		completed: true
	}
];

class Task {
	constructor(name, descr, date, complete) {
		this.name = name;
		this.description = descr;
		this.date = date;
		this.completed = complete;
	}
}