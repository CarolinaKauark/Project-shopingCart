const fetchProducts = async (query) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  
  try {
    const resultado = await fetch(url); 
    const data = await resultado.json();
    return data.results;  
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
