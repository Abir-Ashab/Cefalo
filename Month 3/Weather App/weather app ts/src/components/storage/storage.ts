function saveCity(city: string): void {
    localStorage.setItem('lastCity', city);
  }
  
  function getLastCity(): string | null {
    return localStorage.getItem('lastCity');
  }
  
  export const Storage = {
    saveCity,
    getLastCity,
  };