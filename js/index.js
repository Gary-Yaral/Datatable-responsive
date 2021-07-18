const container = document.querySelector('#container');
const btns = document.querySelector('#pagination');
const headers = ['Cedula','Name', 'Email'];
const data = [
    ['1232442445','Gary','gary.yaral@gmail.com'],
    ['092424244','Pedro', 'pedrolimones2020@gmail.com'],
    ['092424244','Carlos', 'carlos23jk@gmail.com'],
    ['1232442445','Julio','juliomb29@gmail.com'],
    ['092424244','Andrés', 'arebolledo2020@gmail.com'],
    ['1232442445','María','mafer2020@gmail.com'],
    ['092424244','Juliana', 'julibebes@gmail.com'],
    ['1232442445','Cecilia','cecilianarvaez@gmail.com']
]

const itemsPerPage = 4;

const object = [headers, data];
const table = new DataTable(container,object);
table.renderTable();
