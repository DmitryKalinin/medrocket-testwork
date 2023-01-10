//Класс меню, создание и обработка нажатий.
import Main from "./Main.js";
import Users from "./Users.js";
import Favourites from "./Favourites.js";

export default class Menu extends Main {

    render() {
		let current;
        const block = this.getElement("nav", "nav");
        const menuCatalog = this.getElement("button", {
			"class": "nav__item",
			"type": "button"
		});
        const menuFavourites = this.getElement("button", {
			"class": "nav__item",
			"type": "button"
		});
        menuCatalog.textContent = "Каталог";
        menuFavourites.textContent = "Избранное";

		const openCatalog = async () => {
			menuFavourites.classList.remove('nav--active')
			menuCatalog.classList.add('nav--active')

			current === 'favorite' && this.clearChildren(this.parent);

			this.show(this.parent, async() => {
				const users = new Users(await this.api.getUsers(), this.parent);
				users.render(this.parent);
			})

			current = 'catalog';
		}
		openCatalog()

		const openFavourites = async () => {
			menuCatalog.classList.remove('nav--active')
			menuFavourites.classList.add('nav--active')
            current === 'catalog' && this.clearChildren(this.parent);
            this.show(this.parent, async() => {
                const images = new Favourites(this.api.getFavourites(), this.parent);
				if(images.data.length===0){
					images.emptyTemplate();
				}else{
					images.render();
				}
            })
            current = 'favorite'
		}

        menuCatalog.addEventListener("click", openCatalog)
        menuFavourites.addEventListener("click", openFavourites)

        block.appendChild(menuCatalog);
        block.appendChild(menuFavourites);

        this.parent.appendChild(block);

        return this.parent;
    }
}