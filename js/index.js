const container = document.querySelector('#container');
const btns = document.querySelector('#pagination');
const headers = ['Nº','Product','Price', 'Description'];
const data = [
    ['1','HP Computer','$570','HP computer, I3 processor'],
    ['2','Smart Phone','$230', 'Samsung J7'],
    ['3','Iron','$30', 'Oster Iron'],
    ['4','Glasses','$120','Giani Glass'],
    ['5','TV','$670', 'LG TV 50 pulg'],
    ['6','Smart Watch','$150','Sony'],
    ['7','Air Conditioner','$750', 'Air conditioner, LG 900 BTU'],
    ['8','Guitar','$200','Freedom Strato Castell']
]

const itemsPerPage = 4;

const object = [headers, data];
const table = new DataTable(container,object);
table.renderTable();
