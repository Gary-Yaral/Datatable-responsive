const ulContainer = document.querySelector('.page-number');
const ul = ulContainer.querySelector('ul');
const indexBtn = {
    index: 1
}

const totalItems = {
    total: 6
}

const limit = 5;


const renderBtns = () => {
    clean();
    if(totalItems.total < limit){
        createPrevBtn();
        for(let i = 1; i<= totalItems.total; i++){
            createBtn(i);
        }
        createNextBtn();
        deactiveBtns()
        activateBtn();
    }

    if(totalItems.total >=limit){
        if(indexBtn.index !== 1) createPrevBtn();
        if(indexBtn.index === 1 || indexBtn.index === 2 || indexBtn.index === 3){
            createBtn(1);
            createBtn(2);
            createBtn(3);
            addDots();
            createBtn(totalItems.total);
            createNextBtn();
            deactiveBtns()
            activateBtn();
        }    
    }



}

const clean = () =>{
    ul.innerHTML ="";
}


const createPrevBtn = () =>{
    let preview = document.createElement('li');
    preview.classList.add('preview');
    preview.innerHTML = 'Prev';
    preview.setAttribute('id', 'Preview');
    if(totalItems.total < limit){
        preview.addEventListener('click',() => activePrevious());
    }

    if(totalItems.total >= limit){
        preview.addEventListener('click',() => renderPrevious());
    }

    ul.append(preview);
}

const createNextBtn = () =>{
    let next = document.createElement('li');
    next.classList.add('next');
    next.innerHTML = 'Next';
    next.setAttribute('id', 'next');
    if(totalItems.total < limit){
        next.addEventListener('click',() => activeNext());
    }

    if(totalItems.total >= limit){
        next.addEventListener('click',() => renderNext());
    }
    ul.append(next);
}

const createBtn = (index) => {
    let li = document.createElement('li');
    li.classList.add('index-page');
    li.innerHTML = index;
    li.setAttribute('index', index);
    li.addEventListener('click',(e) =>{
        indexBtn.index = parseInt(e.target.getAttribute('index'));
        if(totalItems.total < limit){
            deactiveBtns();
            activateBtn();
        }
        if(totalItems.total >= limit){
            if(indexBtn.index === 1){
                clean();
                createBtn(1);      
                createBtn(2);
                createBtn(3);
                addDots();
                createBtn(totalItems.total);
                createNextBtn();
                deactiveBtns();
                activateBtn();
                

            }

            if(indexBtn.index === 2){
                clean();
                createPrevBtn()
                createBtn(1);      
                createBtn(2);
                createBtn(3);
                addDots();
                createBtn(totalItems.total);
                createNextBtn();
                deactiveBtns();
                activateBtn();
            }

            if(indexBtn.index === 3){
                clean();
                createPrevBtn()
                createBtn(1);      
                createBtn(2);
                createBtn(3);
                addDots();
                createBtn(totalItems.total);
                createNextBtn();
                deactiveBtns();
                activateBtn();
            }

            if(indexBtn.index === totalItems.total){
                clean();
                createPrevBtn();
                createBtn(1);
                addDots();
                createBtn(totalItems.total - 2);
                createBtn(totalItems.total - 1);
                createBtn(totalItems.total);
                deactiveBtns();
                activateBtn();

            }

            if(indexBtn.index === totalItems.total - 1){
                clean();
                createPrevBtn();
                createBtn(1);
                addDots();
                createBtn(totalItems.total - 2);
                createBtn(totalItems.total - 1);
                createBtn(totalItems.total);
                deactiveBtns();
                activateBtn();
                createNextBtn();

            }
            if(indexBtn.index === totalItems.total - 2){
                clean();
                createPrevBtn();
                createBtn(1);
                addDots();
                createBtn(totalItems.total - 2);
                createBtn(totalItems.total - 1);
                createBtn(totalItems.total);
                deactiveBtns();
                activateBtn();
                createNextBtn();

            }
        }
    })
    ul.append(li);
}

const addDots = () => {
    dots = document.createElement('li');
    dots.classList.add('dots');
    dots.innerHTML = '...';
    ul.append(dots);
}

const activePrevious = () => {
    if(indexBtn.index > 1){  
        indexBtn.index = indexBtn.index - 1;
        deactiveBtns();
        activateBtn();
    }
}

const activeNext = () => {
    if(indexBtn.index < limit - 1){  
        indexBtn.index = indexBtn.index + 1;
        deactiveBtns();
        activateBtn();
    }
}

const renderPrevious = () => {
    if(indexBtn.index === totalItems.total || indexBtn.index === totalItems.total - 1){
        indexBtn.index = indexBtn.index - 1;
        deactiveBtns();
        activateBtn();
    }

    if(indexBtn.index === 3 || indexBtn.index === 2){
        indexBtn.index = indexBtn.index - 1;
        clean();
        createPrevBtn();
        createBtn(1);
        createBtn(2);
        createBtn(3);
        addDots();
        createBtn(totalItems.total);
        createNextBtn();
        deactiveBtns();
        activateBtn();
    }

    if(indexBtn.index === 1){
        clean();
        createBtn(1);
        createBtn(2);
        createBtn(3);
        addDots();
        createBtn(totalItems.total);
        createNextBtn();
        deactiveBtns();
        activateBtn();
    }
}

const renderNext = () => {
    if(indexBtn.index === 1 || indexBtn.index === 2 ){
        indexBtn.index = indexBtn.index + 1;
        deactiveBtns();
        activateBtn();
    }
}


const deactiveBtns = () => {
    let btns = ul.children;
    console.log(btns.length)
    for(let i = 0 ;i < totalItems.total; i++ ){
        if(btns[i].classList.contains('index-page')){
            btns[i].classList.remove('active-page');
        }
    }
}

const activateBtn = () => {
    let btns = ul.children;
    for(let i = 0 ;i < totalItems.total; i++ ){
        if(btns[i].classList.contains('index-page')){
            let index = parseInt(btns[i].getAttribute('index'));
            if(index === indexBtn.index){
                btns[i].classList.add('active-page');
            }
        }
    }
}

renderBtns();