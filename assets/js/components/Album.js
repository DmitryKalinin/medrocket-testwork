//Класс блока альбомов
import Main from "./Main.js"
import Images from "./Images.js"
export default class Album extends Main {



    render(parent) {
        const usersBlock = this.getElement("div", "albums");
        this.data.map(user => {
            const userBlock = this.getElement("div", "album");
            const albumName = this.getElement("h4", "album__name");
            albumName.textContent = user.title;
            userBlock.appendChild(albumName);
            albumName.addEventListener("click", () => {
                this.show(userBlock, async() => {
                    const images = new Images(await this.api.getImages(user.id));
                    images.render(userBlock)
                })

            })
            usersBlock.appendChild(userBlock);
        })
        parent.appendChild(usersBlock)
    }

}