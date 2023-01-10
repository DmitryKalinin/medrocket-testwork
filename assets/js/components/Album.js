//Класс блока альбомов
import Main from "./Main.js"
import Images from "./Images.js"

export default class Album extends Main {
    render() {
        const usersBlock = this.getElement("div", "albums");

        this.data.map(user => {
            const userBlock = this.getElement("div", "album");
            const albumName = this.getElement("h4", "album__name");

            albumName.textContent = user.title;
            albumName.addEventListener("click", () => {
                this.show(userBlock, async() => {
                    const images = new Images(await this.api.getImages(user.id), userBlock);
                    images.render()
                })

            })

            userBlock.appendChild(albumName);
            usersBlock.appendChild(userBlock);
        })

        this.parent.appendChild(usersBlock)
    }

}