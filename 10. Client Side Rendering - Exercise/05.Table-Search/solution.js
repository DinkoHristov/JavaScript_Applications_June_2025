import { html, render } from './node_modules/lit-html/lit-html.js'

const url = `http://localhost:3030/jsonstore/advanced/table`;
const root = document.querySelector('tbody');
const input = document.getElementById('searchField');

let students = null;

function studentTemplate(student) {
   let isMatch = input.value.trim() != '' &&
                 (student.firstName.toLowerCase().includes(input.value.toLowerCase()) || 
                 student.lastName.toLowerCase().includes(input.value.toLowerCase()) || 
                 student.email.toLowerCase().includes(input.value.toLowerCase()) ||
                 student.course.toLowerCase().includes(input.value.toLowerCase()));

   let studentTemp = html `
      <tr class="${isMatch ? 'select' : ''}">
            <td>${student.firstName} ${student.lastName}</td>
            <td>${student.email}</td>
            <td>${student.course}</td>
      </tr>
   `;

   return studentTemp;
}

solve();

async function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   await loadTable();

   async function onClick() {
      await loadTable();
      input.value = '';
   }
}

async function loadStudents() {
   let response = await fetch(url);
   let data = await response.json();

   return data;
}

async function loadTable() {
   if (students == null) {
      students = await loadStudents();
   }

   let studentTempl = Object.keys(students).map(s => studentTemplate(students[s]));
   render(studentTempl, root);
}