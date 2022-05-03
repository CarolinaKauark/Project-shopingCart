const fetchItem = async (ItemID) => {
  const url = `https://api.mercadolibre.com/items/${ItemID}`;
  
  try {
    const resultado = await fetch(url); 
    const data = await resultado.json();
    return data;  
  } catch (error) {
    return error;
  }
};

// console.log(fetchItem('MLB1341706310'));

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
