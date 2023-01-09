//Класс меню, создание и обработка нажатий.
import Main from "./Main.js";
import Users from "./Users.js";
import Images from "./Images.js";
let current;
export default class Menu extends Main {


	
    render(parent) {

        const block = super.getElement("nav", "nav");
        const menuCatalog = super.getElement("button", {
			"class": "nav__item",
			"type": "button"
		});
        const menuFavourites = super.getElement("button", {
			"class": "nav__item",
			"type": "button"
		});
        menuCatalog.textContent = this.data.menu1;
        menuFavourites.textContent = this.data.menu2;
		const openCatalog = async () => {
			menuFavourites.classList.remove('nav--active')
			menuCatalog.classList.add('nav--active')
			current === 'favorite' && this.clearChildren(parent);
			this.show(parent, async() => {
				const users = new Users(await this.api.getUsers());
				users.render(parent);
			})
			current = 'catalog';
		}
		openCatalog()
		const openFavourites = async () => {
			menuCatalog.classList.remove('nav--active')
			menuFavourites.classList.add('nav--active')
            current === 'catalog' && this.clearChildren(parent);
            this.show(parent, async() => {
                const images = new Images(this.api.getFavourites());
                images.render(parent);
            })
            current = 'favorite'
		}
        menuCatalog.addEventListener("click", openCatalog)
        menuFavourites.addEventListener("click", openFavourites)
        block.appendChild(menuCatalog);
        block.appendChild(menuFavourites);
        parent.appendChild(block);
        return parent;
    }
}