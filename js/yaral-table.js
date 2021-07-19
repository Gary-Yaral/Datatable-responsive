class DataTable{
    constructor(container, data){
        this.container = container;
        this.container.classList.add('datatable');
        this.data= data;
        if(this.data[1].length >= 11){
            this.itemPerPage = 10;
        }else{
            this.itemPerPage = this.data[1].length;
        }
        
        this.listValue = false;
        this.data = data;
        this.data[0][this.data[0].length] = '';
        this.pages = [];
        this.id = 0;
        this.active = 0;
    }

    renderTable(){
        this.container.innerHTML = "";
        let tableContainer = document.createElement('div'),
        itemsNumber =  document.createElement('div'),
        selectContainer =document.createElement('div'),
        beforeSelect = document.createElement('div'),
        select = document.createElement('select'),
        afterSelect = document.createElement('div'),
        newTable = document.createElement('table'),
        buttonsPag = document.createElement('div'),
        pageNumber = document.createElement('div'),
        thead = document.createElement('thead'),
        tbody = document.createElement('tbody'),
        tfooter = document.createElement('tfoot');
        tableContainer.classList.add('table-container');
        newTable.append(thead);
        newTable.append(tbody);
        newTable.append(tfooter);
        tableContainer.append(newTable);
        itemsNumber.innerHTML = "<span>Total items: </span> "+ this.data[1].length;
        itemsNumber.classList.add('total-items');
        beforeSelect.innerHTML = 'Show ';
        afterSelect.innerHTML = 'items';

        for(let index = 1; index <= this.data[1].length; index++){
            let option = document.createElement('option');
            option.value = index;
            option.innerHTML = index;
            select.append(option);

        }
        select.classList.add('perPage');
        select.addEventListener('change',(e)=>{
                this.itemPerPage = parseInt(e.target.value);
                this.container.querySelector('tbody').innerHTML = ""; 
                this.id = 0;
                this.hasBeenChanged = true;
                this.pagination();
                this.renderBtns();
                this.renderRows();
                this.activeFirstButton();

        })
        select.selectedIndex = this.itemPerPage -1;
        pageNumber.classList.add('pagination');
        selectContainer.classList.add('select-container');
        selectContainer.append(beforeSelect);
        selectContainer.append(select);
        selectContainer.append(afterSelect);
        buttonsPag.append(selectContainer);
        buttonsPag.append(pageNumber);
        buttonsPag.classList.add('footer-table');
        this.container.append(tableContainer);
        this.container.append(buttonsPag);
        this.container.append(itemsNumber);
        this.renderHeaders();
        this.container.querySelector('tbody').innerHTML = ""; 
        this.pagination();
        this.renderRows();
        this.renderBtns();
        this.activeButton();
    }

    renderHeaders(){
        const tr = document.createElement('tr');
        const headers = this.data[0].map(header=> {
            const th = document.createElement('th');
            th.textContent = header;
            return th});
        headers.forEach(th => {
            tr.append(th);
        })
        tr.classList.add('thead');
        this.container.querySelector('thead').append(tr);
    }

    renderRows(){

        for(let a = 0; a<this.pages[this.id].length; a++){
            let  index = this.pages[this.id][a];
            let rows = this.data[1][index];
            let tr = document.createElement('tr');
            for(let item = 0; item <rows.length; item++){
                let td = document.createElement('td');
                td.textContent = this.data[1][index][item];
                tr.append(td);
            }

            // Create td and insert buttons in td 
            let td = document.createElement('td'),
            updateBTn = document.createElement('a'),
            deleteBTn = document.createElement('a'),
            updateIcon = document.createElement('i'),
            deleteIcon = document.createElement('i');
            updateIcon.classList.add('flaticon-edit-button');
            deleteIcon.classList.add('flaticon-delete');
            updateBTn.setAttribute('href','');
            deleteBTn.setAttribute('href','');
            updateBTn.append(updateIcon);
            deleteBTn.append(deleteIcon);
            td.append(updateBTn);
            td.append(deleteBTn);
            tr.append(td);
            // We add the color styles to the rows
            if(a%2 !== 0){
                tr.classList.add('tr-style');
            }
            this.container.querySelector('tbody').append(tr);         
        }   
    }

    pagination(){
        this.pages = [];
        this.module = this.data[1].length%this.itemPerPage;
        this.pageToGenerate = this.module;
        if(this.module !==0){
            this.pageToGenerate = parseInt((this.data[1].length/this.itemPerPage) + 1);
        }else{
            this.pageToGenerate = this.data[1].length/this.itemPerPage;
        }
         
        for(let x=0; x < this.pageToGenerate; x++){
            let rows = [];
            let index = 0;
            let counter = this.itemPerPage+(this.itemPerPage*x) - 1;
            let init = (x*this.itemPerPage);
            if(x === this.pageToGenerate -1){
                counter = parseInt(this.data[1].length - 1);
            }
            for(let a = init ; a <= counter ; a ++){
                rows[index] = a;
                index++;
            }     
            this.pages[x] = rows;
        }        
    }

    renderBtns(){
        this.container.querySelector('.pagination').innerHTML = "";    
        for(let j = 0 ; j < this.pages.length; j++){
            let btn = document.createElement('a');
            btn.setAttribute('href','');
            btn.setAttribute('id', j);
            btn.addEventListener('click',(e) => {
                this.container.querySelector('tbody').innerHTML = ""; 
                this.showRows(e);
            })
            btn.innerHTML = 1+j;
            btn.classList.add('pag-btn');
            this.container.querySelector('.pagination').append(btn);
        }
    }

    showRows(e){
        e.preventDefault();
        this.id = parseInt(e.target.id);
        this.active = this.id;
        this.activeButton();     
        this.renderRows()
    }

    activeButton(){
        for(let i = 0; i< this.pages.length; i++){
            if((i) === this.active){
                let button = document.getElementById(this.id);
                button.classList.add('active-page');
            }else{
                document.getElementById(i).classList.remove('active-page');
            }
        }   
    }

    activeFirstButton(){
        document.getElementById(0).classList.add('active-page');
    }
}





    





