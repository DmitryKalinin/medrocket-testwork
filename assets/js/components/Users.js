//Класс блока пользователей
import Main from "./Main.js";
import Album from "./Album.js"

export default class Users extends Main {


    render(parent) {
        console.log(this.data);
        const usersBlock = this.getElement("div", "users");
        this.data.map(user => {
            const userBlock = this.getElement("div", "user");
            const userName = this.getElement("h3", "user__name");
            userName.textContent = user.name;
            userBlock.appendChild(userName);
            userName.addEventListener("click", () => {
                this.show(userBlock, async() => {
                    const album = new Album(await this.api.getAlbums(user.id));
                    album.render(userBlock)
                })
            })
            usersBlock.appendChild(userBlock);
        })
        parent.appendChild(usersBlock)
    }
}