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
        let star = this.getElement("img", "star");
        if (!this.api.findFavourite(image)) {
            star.setAttribute("src", this.api.starEmpty);
        } else {
            star.setAttribute("src", this.api.starActive);
        }

        star.addEventListener("click", () => {
            this.addImagetoLocalStorage(star, image);
        })
        return star;
    }

    popupText = (text) => {
        let titleImage = this.getElement("span", "popup-text");
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
        if(this.api.findFavourite(image)){
            this.api.removeFavourite(image);
            star.setAttribute("src", this.api.starEmpty);
        }
        else {
            this.api.setFavourites(image);
            star.setAttribute("src", this.api.starActive);
        }
    }

    render() {

        const usersBlock = this.getElement("div", "images");
        this.data.map(user => {
            const imageBlock = this.getElement("div", "image-block");
            let titleImage = this.popupText(user.title)
            const image = this.getElement("img",{
                "src":  user.thumbnailUrl
            })
            
            const star = this.starElement(user);
            titleImage.textContent = user.title;
            imageBlock.appendChild(star);
            imageBlock.appendChild(image);
            imageBlock.appendChild(titleImage);
            image.addEventListener("click", () => {
                this.showPopup(user);
            })
           
            usersBlock.appendChild(imageBlock);
        })
        
        usersBlock.addEventListener("mouseover", function(e) {
            const imageBlock = e.target.closest('.image-block')
            if(imageBlock){
                imageBlock.querySelector('.popup-text').style.display = "block";
            }
            
        })
        usersBlock.addEventListener("mouseout", function(e) {
            const imageBlock = e.target.closest('.image-block')
            if(imageBlock){
                imageBlock.querySelector('.popup-text').style.display = "none";
            }
        })
        this.parent.appendChild(usersBlock);
    }
}