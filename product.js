async function loadProducts() {
    try {
      const response = await fetch('products.json'); // Fetch the JSON file
      if (!response.ok) throw new Error('Failed to load products');
      
      const products = await response.json();
      const productContainer = document.querySelector('.product-container');
      productContainer.innerHTML = ''; // Clear the product container before adding new products
  
      products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.id = product.id;
  
        productCard.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h4>${product.name}</h4>
          <p class="price">₹${Object.values(product.prices)[0]}.00</p>
          <label for="size-${product.id}">Size:</label>
          <select id="size-${product.id}" class="size-select">
            ${Object.entries(product.prices)
              .map(([size, price]) => `<option value="${size}" data-price="${price}">${size}</option>`)
              .join('')}
          </select>
          <button class="cta buy-now" onclick="sendWhatsAppMessage('${product.name}', 'size-${product.id}')">Buy Now</button>
        `;
  
        productContainer.appendChild(productCard);
      });
  
      // Re-add the search functionality after the products are loaded
      const searchInput = document.querySelector('.search-input');
      const productCards = document.querySelectorAll('.product-card');
  
      searchInput.addEventListener('input', function() {
        const query = searchInput.value.toLowerCase();
        productCards.forEach(function(card) {
          const productName = card.querySelector('h4').textContent.toLowerCase();
          if (productName.includes(query)) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
  
      // Update the price dynamically based on the selected size
      document.querySelectorAll('.size-select').forEach(select => {
        select.addEventListener('change', function () {
          const priceElement = select.closest('.product-card').querySelector('.price');
          const selectedPrice = select.options[select.selectedIndex].getAttribute('data-price');
          priceElement.textContent = `₹${selectedPrice}.00`;
        });
      });
  
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }
  