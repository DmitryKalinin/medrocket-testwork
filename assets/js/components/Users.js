//Класс блока пользователей
import Main from "./Main.js";
import Album from "./Album.js"

export default class Users extends Main {


    render() {

        const usersWrapper = this.getElement("div", "users");
        this.data.map(user => {
            const userBlock = this.getElement("div", "user");
            const userName = this.getElement("h3", "user__name");

            userName.textContent = user.name;
            userName.addEventListener("click", () => {
                this.show(userBlock, async() => {
                    const album = new Album(await this.api.getAlbums(user.id), userBlock);
                    album.render()
                })
            })

            userBlock.appendChild(userName);
            usersWrapper.appendChild(userBlock);
        })
        this.parent.appendChild(usersWrapper)
    }
}