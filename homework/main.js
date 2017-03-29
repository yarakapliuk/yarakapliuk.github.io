/***** Материалы мастеркласса: *****/

window.onload = function() {
    
    function DomManipulation() {
        document.querySelector('#okBtn').addEventListener('click', function(){
            var textarea = document.querySelector('#textarea');
            data[textarea.dataset.obj][textarea.dataset.key] = textarea.value;
            DomManipulation.prototype.checkState();
            textarea.value = '';
        });
    }
    
    // метод перерисовки таблицы
    DomManipulation.prototype.renderTable = function(toElement, tableList, nameTable) {
        
        if(document.querySelector('#' + nameTable)) {
            document.querySelector('#' + nameTable).remove();
        }
        
        var table = document.createElement('table');
        table.id = nameTable;
        
        toElement.appendChild(table);
        
        // в таблицу вставляем ряд с заголовками
        this.renderTableHeader(table, tableList[0]);
        // в таблицу вставляем ряды с ячейками
        this.renderTableCells(table, tableList);
        
    }
    
    // метод прорисовки заголовков
    DomManipulation.prototype.renderTableHeader = function(toTable, tableItem){
        
        var tr = document.createElement('tr');
        
        for(var item in tableItem) {
            var th = document.createElement('th');
            th.innerHTML = item;
            tr.appendChild(th);
        }
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
            
            toTable.appendChild(tr);
        }
    }
    
    // метод обновления данных
    DomManipulation.prototype.checkState = function() {
        this.renderTable(container, data, 'table');
        IconJson = JSON.stringify(data);
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
    
    // дз: справа от таблицы столбец с кнопками удалить ряд
    // добавить кнопку добавления пустого ряда с записью в JSON
    // запись в локалсторедж
    // добавить кнопку очистки стореджа
}
