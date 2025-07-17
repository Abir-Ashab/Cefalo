function saveCity(city) {
    localStorage.setItem('lastCity', city);
}

function getLastCity() {
    return localStorage.getItem('lastCity');
}

export const Storage = {
    saveCity,
    getLastCity,
};
