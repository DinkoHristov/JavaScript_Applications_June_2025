import { showView } from "./util.js";
import { detailsPage } from "./details.js";

const editSection = document.querySelector("#edit-movie");
const form = editSection.querySelector("form");

export async function editPage(id) {
  showView(editSection);

  const response = await fetch(`http://localhost:3030/data/movies/${id}`);
  const movie = await response.json();

  console.log("movie: ", movie);

  editSection.querySelector('[name="title"]').value = movie.title;
  editSection.querySelector('[name="description"]').value = movie.description;
  editSection.querySelector('[name="img"]').value = movie.img;
  form.setAttribute("id", id);
  form.addEventListener("submit", editMovie);
}

export async function editMovie(ev) {
  ev.preventDefault();
  let formData = new FormData(form);
  let title = formData.get("title");
  let description = formData.get("description");
  let img = formData.get("img");

  if (title !== "" && description !== "" && img !== "") {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      console.log("ev.target.id: ", ev.target.id);
      const editResponse = await fetch(
        `http://localhost:3030/data/movies/${ev.target.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-Authorization": user.accessToken,
          },
          body: JSON.stringify({ title, description, img }),
        }
      );

      if (!editResponse.ok || editResponse.status !== 200) {
        let data = await editResponse.json();
        throw new Error(data.message);
      }
    } catch (error) {
      alert(error.message);
    }

    detailsPage(ev.target.id);
  }
}
