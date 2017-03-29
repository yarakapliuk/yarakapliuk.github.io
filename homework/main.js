/***** Материалы мастеркласса: *****/

window.onload = function() {
    
    function DomManipulation() {

        // метод записи отредактированных данных из textarea
        document.querySelector('#okBtn').addEventListener('click', function(){
            var textarea = document.querySelector('#textarea');

            data = DomManipulation.prototype.checkData(data);

            data[textarea.dataset.obj][textarea.dataset.key] = textarea.value;
            DomManipulation.prototype.checkState();
            textarea.value = '';
        });

        // метод добавления новых строк
        document.querySelector('#addRow').addEventListener('click', function(){

            data = DomManipulation.prototype.checkData(data);

            var tableItem = data[0];
            var obj = {};

            for(var item in tableItem) {
                obj[item] = '';
            }
            data.push(obj);

            DomManipulation.prototype.checkState();
        });

        // метод очистки localStorage
        document.querySelector('#clearStorage').addEventListener('click', function(){
            localStorage.clear();
            DomManipulation.prototype.checkData();
            DomManipulation.prototype.checkState();
        });
    }
    
    // метод перерисовки таблицы
    DomManipulation.prototype.renderTable = function(toElement, data, nameTable) {
        // проверяем есть ли запись в localStorage
        data = DomManipulation.prototype.checkData(data);

        if(document.querySelector('#' + nameTable)) {
            document.querySelector('#' + nameTable).remove();
        }
        
        var table = document.createElement('table');
        table.id = nameTable;
        
        toElement.appendChild(table);
        
        // в таблицу вставляем ряд с заголовками
        this.renderTableHeader(table, data[0]);
        // в таблицу вставляем ряды с ячейками
        this.renderTableCells(table, data);
        
    }
    
    // метод прорисовки заголовков
    DomManipulation.prototype.renderTableHeader = function(toTable, tableItem){
        
        var tr = document.createElement('tr');
        
        for(var item in tableItem) {
            var th = document.createElement('th');
            th.innerHTML = item;
            tr.appendChild(th);
        }

        // добавляем доп. столбец с кнопками для удаления рядов
        var th = document.createElement('th');
        tr.appendChild(th);

        toTable.appendChild(tr);
    }
    
    // метод прорисовки ячеек
    DomManipulation.prototype.renderTableCells = function(toTable, tableList){
        
        for(var i=0; i<tableList.length; i++) {
            var tr = document.createElement('tr');
            
            tr.dataset.position = i;
            var listItem = tableList[i];
            
            for(var item in listItem) {
                var td = document.createElement('td');
                
                td.dataset.field = item;
                td.innerHTML = listItem[item];
                tr.appendChild(td);
                
                td.addEventListener('click', function(){
                    
                    var textarea = document.querySelector('#textarea');

                    textarea.value = this.innerHTML;
                    textarea.dataset.key = this.dataset.field;
                    textarea.dataset.obj = this.parentNode.dataset.position;
                });
            }
            // создаём ячейки с кнопками для удаления рядов
            var td = document.createElement('td');
            var removeBtn = document.createElement('button');
            removeBtn.classList.add('removeRow');
            removeBtn.innerHTML = 'X';
            td.appendChild(removeBtn);
            tr.appendChild(td);

            // событие удаления строк и перезаписи data
            removeBtn.addEventListener('click',function(){
                var index = this.parentNode.parentNode.dataset.position;

                data = DomManipulation.prototype.checkData(data);

                data.splice(index,1);
                table.removeChild(this.parentNode.parentNode);
                DomManipulation.prototype.checkState();
            });

            toTable.appendChild(tr);
        }
    }
    
    // метод обновления данных
    DomManipulation.prototype.checkState = function() {
        // добавляем запись в localStorage
        IconJson = JSON.stringify(data);
        localStorage.setItem('data',IconJson);

        this.renderTable(container, data, 'table');
    }

    // метод проверки наличия записи в localStorage
    DomManipulation.prototype.checkData = function(data) {
        if(localStorage['data']) {
            data = JSON.parse(localStorage['data']);
        }
        return data;
    }
    
    // метод сортировки по числовому полю
    DomManipulation.prototype.sortByField = function(sortObj, field='num') { // ES6 default value
        bubbleSort(sortObj, field, false);
        this.checkState();
    }
    
    
    // функция сортировки
    function bubbleSort(arrObjs, field, param = true) {
        var length = arrObjs.length;
        
        for(var i = 0; i < length - 2; i++) {
            for(var j = 0; j < length - 1 - i; j++) {
                
                if((arrObjs[j][field] > arrObjs[j + 1][field] && param == true) ||
                   (arrObjs[j][field] < arrObjs[j + 1][field] && param == false)) {
                    var tmp = arrObjs[j];
                    arrObjs[j] = arrObjs[j + 1];
                    arrObjs[j + 1] = tmp;
                }
            }
        }
    }
    
    
    var data = JSON.parse(IconJson),
        container = document.querySelector('.container');
    
    // создаём экземпляр и вызываем главный метод прорисовки таблицы
    var domExemplair = new DomManipulation();
    domExemplair.renderTable(container, data, 'table');
    
    // производим сортировку рядов таблицы
    setTimeout(function(){
        /*domExemplair.sortByField(table);*/
    },2000);
    
}
