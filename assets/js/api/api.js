const api = {
    getUsers: async function() {
        const result = await fetch('https://json.medrocket.ru/users/')
            .then(response => response.json())
            .catch(err => console.log(err))
        return result;
    },
    getAlbums: async function(id) {
        const result = await fetch(`https://json.medrocket.ru/albums?userId=${id}`)
            .then(response => response.json())
            .catch(err => console.log(err))
        return result;
    },
    getImages: function(id) {
        const result = fetch(`https://json.medrocket.ru/photos?albumId=${id}`)
            .then(response => response.json())
            .catch(err => console.log(err))
        return result;
    },
    getImage: function(id) {
        const result = fetch(`https://json.medrocket.ru/photos?id=${id}`)
            .then(response => response.json())
            .catch(err => console.log(err))
        return result;
    },
    getFavourites() {
        let favourites = JSON.parse(localStorage.getItem('favourites'));
        if(!favourites){
            favourites = [];
            localStorage.setItem('favourites', JSON.stringify(favourites))
        }
        return favourites
    },
    setFavourites(image){
        let favourites = JSON.parse(localStorage.getItem('favourites'));
        
        //Если нет элемента в локальном хранилище
        if(!this.findFavourite(image)){
            favourites.push(image);
            localStorage.setItem('favourites', JSON.stringify(favourites))
        }
        else{
            favourites = [];
            favourites.push(image);
            localStorage.setItem('favourites', JSON.stringify(favourites))
        }
    },
    removeFavourite(image){
        let favourites = JSON.parse(localStorage.getItem('favourites'));
        if(favourites?.length){
            //Если нет элемента в локальном хранилище
            favourites = favourites.filter(favImg => favImg.id !== image.id)
            localStorage.setItem('favourites', JSON.stringify(favourites))
        }
    },
    findFavourite(image){
        let favourites = JSON.parse(localStorage.getItem('favourites'));
        if(favourites?.length){
            if(favourites.find(favImg => favImg.id === image.id)){
                return true
            }
        }
        return false;
    },
    emptyFavourites(){
        let favourites = JSON.parse(localStorage.getItem('favourites'));
        if(favourites?.length){
           return false;
        }
        return true;
    },
    starEmpty: "./assets/img/star_empty.png",
    starActive: "./assets/img/star_active.png"
}
export default api;