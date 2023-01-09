//рендер меню в корневой блок.

import Navigation from "./components/Navigation.js";
import api from "./api/api.js";
const root = document.getElementById("root");
api.getFavourites()
const menu = new Navigation(api.getPages());
menu.render(root);