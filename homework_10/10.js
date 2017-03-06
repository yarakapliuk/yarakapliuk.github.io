window.onload = function() {

	function MenuItem(name, desc, img, url) {
		this.name = name;
		this.desc = desc;
		this.img = img;
		this.url = url;
	}

	var MenuItems = [];
	// Добавляем в массив экземпляры класса
	for(i = 0; i < 5; i++) {
		MenuItems.push(new MenuItem("Name"+i,"Desc"+i,"js.png","#"));
	}
	// Создаём меню-список
	for(var i=0; i<MenuItems.length; i++) {

		var li = document.createElement("li");
		li.innerHTML = "<span class='name'>" 
					   + MenuItems[i].name 
					   + "<span class='desc'>" 
					   + MenuItems[i].desc 
					   + "</span></span>";

		var img = document.createElement("img");
		img.src = MenuItems[i].img;
		img.width = 20;
		// Вставляем картинку в начало li
		li.insertBefore(img, li.firstChild);
		document.querySelector(".container ul").appendChild(li);
	}

	var container = document.querySelector(".container"),
		nameItems = document.querySelectorAll(".name");

	// Открываем и закрывваем меню по клику
	container.onclick = function() {
		this.classList.toggle('open');
	}

	// Показываем description при наведении мыши (но проще это было бы сделать в css :) 
	for(i=0; i<nameItems.length; i++) {
		nameItems[i].onmouseover = function() {
			this.querySelector('.desc').classList.add('show');
		}
		nameItems[i].onmouseout = function() {
			this.querySelector('.desc').classList.remove('show');
		}
	}
}