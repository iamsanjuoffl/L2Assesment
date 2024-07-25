document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container');
    const categoryButtons = document.querySelectorAll('.cat');

    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
        .then(response => response.json())
        .then(data => {
            categoryButtons.forEach(button => {
                button.addEventListener('click', () => {
                    categoryButtons.forEach(btn => {
                        btn.classList.remove('active');
                        btn.innerHTML = btn.getAttribute('data-category');
                    });

                    
                    button.classList.add('active');
                    const selectedCategory = button.getAttribute('data-category');
                    if (selectedCategory === "Men") {
                        button.innerHTML = `👨🏻 ${selectedCategory}`;
                    } else if (selectedCategory === "Women") {
                        button.innerHTML = `👩🏻 ${selectedCategory}`;
                    } else if(selectedCategory === "Kids") {
                        button.innerHTML = `👶🏻 ${selectedCategory}`;
                    }
                    const categoryData = data.categories.find(category => category.category_name === selectedCategory);
                    displayProducts(categoryData.category_products);
                    
                });
            });

            
            const defaultCategoryData = data.categories.find(category => category.category_name === 'Men');
            const defaultButton = Array.from(categoryButtons).find(button => button.getAttribute('data-category') === 'Men');
            if (defaultButton) {
                defaultButton.classList.add('active');
                defaultButton.innerHTML = `👨🏻 Men`;
            }
            displayProducts(defaultCategoryData.category_products);
        })
        .catch(error => console.error('Error fetching the products:', error));

    function displayProducts(products) {
        productContainer.innerHTML = '';

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            productCard.innerHTML = `
                ${product.badge_text ? `<div class="tag">${product.badge_text}</div>` : ''}
                <img src="${product.image}" class="san" alt="${product.title}">
                <h2>${product.title} &bull; ${product.vendor}</h2>
                <p class="price">Rs ${product.price} <span class="original-price">Rs ${product.compare_at_price}</span> <span class="discount">${product.discount ? product.discount : ''} Off</span></p>
                <button class="add-to-cart">Add to Cart</button>
            `;

            productContainer.appendChild(productCard);
        });
    }
});
