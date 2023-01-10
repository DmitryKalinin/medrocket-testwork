//рендер меню в корневой блок.

import Navigation from "./components/Navigation.js";
import api from "./api/api.js";

const root = document.getElementById("root");

const menu = new Navigation(null, root);
menu.render();