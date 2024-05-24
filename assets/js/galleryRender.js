"use strict";
const texportContainer = document.querySelector(".texport-gallery");
const dec22Container = document.querySelector(".dec22-gallery");
const gallery1519Container = document.querySelector(".gallery-1519");

/* Function to render images in texport gallery */

// This function will create a html template for you this function takes 2 parameters first is foldername from which you want to get images and count of images you want to render
function galleryImagesTemplate(folder, count) {
  let template = "";
  for (let i = 1; i <= count; i++) {
    template += `<div
      class="col-md-3 col-sm-4 thumb"
      data-src="assets/images/gallery-images/${folder}/image${("00" + i).slice(
      -3
    )}.jpg"
    >
      <a class="d-block" title="">
        <img
          src="assets/images/gallery-images/${folder}/image${("00" + i).slice(
      -3
    )}.jpg"
          alt=""
        />
      </a>
    </div>`;
  }
  return template;
}

function renderImages(target, template) {
  target.innerHTML = template;
}

const texportTemplate = galleryImagesTemplate("day02", 10);
// const dec22Template = galleryImagesTemplate("dec22", 26);
const gallery1519Template = galleryImagesTemplate("day01", 15);

renderImages(texportContainer, texportTemplate);
// renderImages(dec22Container, dec22Template);
renderImages(gallery1519Container, gallery1519Template);
