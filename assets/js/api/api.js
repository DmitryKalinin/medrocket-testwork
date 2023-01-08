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
    getFavorite() {
        let response = [];
        let keys = Object.keys(localStorage);
        keys.map(item => {
            response.push(JSON.parse(localStorage.getItem(item)))
        })

        return response;
    },
    getPages() {
        return { menu1: "Каталог", menu2: "Избранное" };
    }
}
export default api;