//Global container
const datatable = document.querySelector('#datatable');
const ulContainer = document.querySelector('#ulContainer');
ulContainer.classList.add('page-number');
const pages = [];
itemPerPage = 10;
// Initial index button
const indexBtn = {index: 1};

//Data to render
const objectParseToArray = data[1].map(element =>{
    let tr = document.createElement('tr');
    let tds = Object.values(element);
    tds.forEach(td => {
        let newTd = document.createElement('td');
        newTd.innerHTML = td;
        tr.append(newTd);
    })

    let tdButtons = document.createElement('td'),
    updateIcon = document.createElement('i'),
    deleteIcon = document.createElement('i'),
    updateBtn = document.createElement('a');
    updateBtn.setAttribute('href','');
    deleteBtn = document.createElement('a');
    deleteBtn.setAttribute('href','');
    updateIcon.classList.add('flaticon-edit-button');
    deleteIcon.classList.add('flaticon-delete');
    updateBtn.append(updateIcon);
    deleteBtn.append(deleteIcon);
    tdButtons.append(updateBtn);
    tdButtons.append(deleteBtn);
    tr.append(tdButtons);
    return tr;
})

//Total pages to generate
const totalItems = {
    total: (objectParseToArray.length >10) ? parseInt(objectParseToArray.length/10) + 1 : 1 
}
//

// Create table 
const renderTable = () => {
    const containerTable = document.createElement('div');
    containerTable.innerHTML = "";
    let table = document.createElement('table');
    const tbody = document.createElement('tbody');
    table.append(renderHeaders());
    table.append(tbody);
    containerTable.append(table);
    datatable.append(containerTable);
}

//Create headers table
const renderHeaders = () => {
    let thead = document.createElement('thead');
    let tr = document.createElement('tr');
    data[0].forEach(th => {
        let newTh = document.createElement('th');
        newTh.innerHTML = th;
        tr.append(newTh);
    })
    let newTh = document.createElement('th');
    newTh.innerHTML = '';
    tr.append(newTh);
    thead.append(tr);
    return thead;
}

//Add rows to the tbody 
const renderBody = (indexBtn) => {
    let tbody =  datatable.querySelector('tbody');
    tbody.innerHTML = "";
        for(let u = 0; u < pages[indexBtn - 1].length; u++){
            let i = pages[indexBtn - 1][u]
            tbody.append(objectParseToArray[i]);
        }
       
    }

//Count and save the pages to generate
const pagination = () => {    
    for(let x=0; x <totalItems.total ; x++){
        let rows = [];
        let index = 0;
        let counter = 10+(10*x) - 1;
        let init = (x*itemPerPage);
        if(x === totalItems.total -1){
            counter = parseInt(objectParseToArray.length - 1);
        }
        for(let a = init ; a <= counter ; a ++){
            rows[index] = a;
            index++;
        }     
        pages[x] = rows;
    }        
}

// Create all pagination buttons 
const renderBtns = () => {   
    if(totalItems.total > 5){
        const ul = document.createElement('ul');
        ulContainer.innerHTML = "";
        ulContainer.append(ul);
        switch(indexBtn.index){
            case 1:
                renderFirstForm(ul);
                break;
            case 2:
                renderFirstForm(ul);
                break;
            case 3:
                renderFirstForm(ul);
                break;
            case totalItems.total-2:
                renderSecondForm(ul);
                break;
            case totalItems.total-1:
                renderSecondForm(ul);
                break;
            case totalItems.total:
                renderSecondForm(ul);
                break;
            default:
                renderThirdForm(ul);
                break;
        }
    }
    
    if(totalItems.total <= 5 && totalItems.total > 0){
        const ul = document.createElement('ul');
        ulContainer.innerHTML = "";
        ulContainer.append(ul);
        renderSmall(ul)
    }
}

// This fuction create one to five buttons
const renderSmall = (ul) =>{
    renderPrevious(ul);
    for(let i= 1; i <= totalItems.total; i++){
        renderBtn(i,ul);
    }
    renderNext(ul)
    deactiveBtns(totalItems.total +1,ul);
    activateBtn(totalItems.total +1,ul);

}
 
const renderFirstForm = (ul) => {
    renderPrevious(ul);
    renderBtn(1, ul);
    renderBtn(2, ul);
    renderBtn(3,ul);
    renderDots(ul);
    renderBtn(totalItems.total,ul);
    renderNext(ul);
    deactiveBtns(7,ul);
    activateBtn(7,ul);
}

const renderSecondForm = (ul) => {
    renderPrevious(ul);
    renderBtn(1, ul);
    renderDots(ul);
    renderBtn(totalItems.total-2, ul);
    renderBtn(totalItems.total-1, ul);
    renderBtn(totalItems.total,ul);
    renderNext(ul);
    deactiveBtns(7,ul);
    activateBtn(7,ul);
}

const renderThirdForm = (ul) => {
    renderPrevious(ul);
    renderBtn(1, ul);
    renderDots(ul);
    renderBtn(indexBtn.index - 1, ul);
    renderBtn(indexBtn.index, ul);
    renderBtn(indexBtn.index+1, ul);
    renderDots(ul);
    renderBtn(totalItems.total, ul);
    renderNext(ul);
    deactiveBtns(9,ul);
    activateBtn(9,ul);
}

const renderBtn = (index, ul) => {
    let li = document.createElement('li');
    li.classList.add('index-page');
    li.innerHTML = index;
    li.setAttribute('index', index);
    li.addEventListener('click',(e) =>{
        indexBtn.index = parseInt(e.target.getAttribute('index'));
        renderBtns();
    })
    ul.append(li);
}

const renderDots = (ul) => {
    let li = document.createElement('li');
    li.classList.add('dots');
    li.innerHTML = '...';
    ul.append(li);
}

const renderPrevious = (ul) =>{
    let preview = document.createElement('li');
    preview.classList.add('preview');
    preview.innerHTML = 'Prev';
    preview.setAttribute('id', 'Preview');
    preview.addEventListener('click',() => {
        if(indexBtn.index > 1 ) {
            indexBtn.index = indexBtn.index - 1;
            renderBtns();
        }
    })
    ul.append(preview);
}

const renderNext = (ul) =>{
    let next = document.createElement('li');
    next.classList.add('next');
    next.innerHTML = 'Next';
    next.setAttribute('id', 'next');
    next.addEventListener('click', () => {
        if(indexBtn.index < totalItems.total){
            indexBtn.index = indexBtn.index + 1;
            renderBtns();
        }
    })
    ul.append(next);
}

const deactiveBtns = (limit, ul) => {
    let btns = ul.children;
    for(let i = 0 ;i < limit; i++ ){
        if(btns[i].classList.contains('index-page')){
            btns[i].classList.remove('active-page');
        }
    }
}

const activateBtn = (limit, ul) => {
    let btns = ul.children;
    for(let i = 0 ;i < limit; i++ ){
        if(btns[i].classList.contains('index-page')){
            let index = parseInt(btns[i].getAttribute('index'));
            if(index === indexBtn.index){
                btns[i].classList.add('active-page');
            }
        }
    }
    renderBody(indexBtn.index);
}


renderTable()
pagination();
renderBtns();