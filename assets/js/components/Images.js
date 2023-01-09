/*Класс блока с изображениями. 
imageElement - создает изображение и добавляет обработчики
starElement - создает звезду и обрабатывает нажатие
popupText - появляющийся текст названия изображения
showPopup - появление полноразмерного изображения
addImagetoLocalStorage - добавляет/удаляет изображение из localStorage
*/
import  Main  from "./Main.js";

export default class Images extends Main {
    
    starElement = (image) => {
        let star = document.createElement("img");
        if (localStorage.getItem(`${image.id}`) === null) {
            star.setAttribute("src", "./assets/img/star_empty.png");
        } else {
            star.setAttribute("src", "./assets/img/star_active.png");
        }
        //star.setAttribute("width", "15px");
        star.classList.add("star");
        star.addEventListener("click", () => {
            this.addImagetoLocalStorage(star, image);
        })
        return star;
    }
    popupText = (text) => {
        let titleImage = document.createElement("span");
        titleImage.classList.add("popup-text");
        titleImage.textContent = text;
        return titleImage;
    }
    showPopup = (image) => {
        const popup = document.getElementById("popup")
        popup.innerHTML = "";
        popup.style.display = "block";

        let img = this.getElement("img",{
            "src": image.url,
        })
       
        popup.appendChild(img);
        popup.style.display = "block";
        popup.addEventListener("click", () => {
            popup.style.display = "none";
            popup.innerHTML = "";
        })
    }
    addImagetoLocalStorage = (star, image) => {
       
        if (localStorage.getItem(`${image.id}`) === null) {
            localStorage.setItem(`${image.id}`, JSON.stringify(image));
            star.setAttribute("src", "./assets/img/star_active.png");
        } else {
            localStorage.removeItem(`${image.id}`);
            star.setAttribute("src", "./assets/img/star_empty.png");
        }
    }
    render(parent) {

        const usersBlock = this.getElement("div", "images");
        this.data.map(user => {
            const imageBlock = this.getElement("div", "image-block");
            let titleImage = this.popupText(user.title)
            const image = this.getElement("img",{
                "src":  user.thumbnailUrl,
                "width": "150px"
            })
            
            const star = this.starElement(user);
            titleImage.textContent = user.title;
            imageBlock.appendChild(star);
            imageBlock.appendChild(image);
            imageBlock.appendChild(titleImage);
            image.addEventListener("click", () => {
                this.showPopup(user);
            })
            imageBlock.addEventListener("mouseover", () => {
                titleImage.style.display = "block";
            })
            imageBlock.addEventListener("mouseout", () => {
                titleImage.style.display = "none";
            })
            usersBlock.appendChild(imageBlock);
        })
        parent.appendChild(usersBlock)
    }
}