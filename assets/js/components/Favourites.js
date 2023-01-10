
import  Images  from "./Images.js";

export default class Favourites extends Images {
   emptyTemplate(){
        this.clearChildren(this.parent)
        const wrapper = this.getElement("div", "empty");
        const img = this.getElement("img",{
            "class": "empty__img",
            "src": "./assets/img/empty.png"
        })
        const title = this.getElement("h2", "empty__title");
        title.textContent = "Список избранного пуст"

        const subtitle = this.getElement("p", "empty__subtitle")
        subtitle.textContent = "Добавляйте изображения, нажимая на звездочки"

        wrapper.appendChild(img)
        wrapper.appendChild(title)
        wrapper.appendChild(subtitle)
        this.parent.appendChild(wrapper)
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
        if(this.api.emptyFavourites()){
            this.emptyTemplate()
        }
    }

   render() {

    const usersBlock = this.getElement("div",{
        "class": "images images--favourites"
    });

    this.data.map(user => {
        const imageBlock = this.getElement("div", "image-block");
        
        const image = this.getElement("img",{
            "src":  user.thumbnailUrl
        })
        const imgTitle = this.getElement("p","image-block__title")
        imgTitle.textContent = user.title

        const star = this.starElement(user);

        imageBlock.appendChild(star);
        imageBlock.appendChild(image);
        imageBlock.appendChild(imgTitle);

        image.addEventListener("click", () => {
            this.showPopup(user);
        })

        usersBlock.appendChild(imageBlock);
    })
    this.parent.appendChild(usersBlock);
}
}