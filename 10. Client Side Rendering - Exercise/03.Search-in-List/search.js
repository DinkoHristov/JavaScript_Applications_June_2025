import { towns } from './towns.js'
import { html, render } from './node_modules/lit-html/lit-html.js'

const root = document.getElementById('towns');
const resultMatches = document.getElementById('result');
const input = document.getElementById('searchText');

document.querySelector('button').addEventListener('click', search);

const ulTemplate = () => html `
   <ul>
      ${towns.map(t => townTemplate(t))}
   </ul>
`;

function townTemplate(town) {
   let isMatch = input.value.trim() != '' && town.includes(input.value);

   let townTemp = html `
      <li class="${isMatch ? 'active' : ''}">${town}</li>
   `;

   return townTemp;
}

search();

function search(e) {
   let matches = null;

   if (e != undefined) {
      e.preventDefault();
      matches = towns.filter(t => input.value.trim() != '' && t.includes(input.value))?.length;
      render(html`<p>${matches} matches found</p>`, resultMatches);
   }

   render(ulTemplate(), root);
}