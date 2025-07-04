document.addEventListener('DOMContentLoaded', function() {
    console.log("DOMContentLoaded fired."); // Mensagem de depuração

    // Função para carregar produtos e aplicar filtros
    function loadProducts() {
        console.log("loadProducts called."); // Mensagem de depuração
        const productsGrid = document.getElementById('products-grid');
        const categoryFilter = document.getElementById('category-filter');
        const priceFilter = document.getElementById('price-filter');

        // Simulação de dados de produtos (você pode substituir por uma API real)
        const products = [
            // PCs Completos
            { name: "PC Gamer XTREME", price: 4999.90, image: "https://placehold.co/200x150/e5e7eb/374151?text=PC+Gamer+XTREME", category: "pcs" },
            { name: "PC Gamer Essencial", price: 2500.00, image: "https://placehold.co/200x150/e5e7eb/374151?text=PC+Gamer+Essencial", category: "pcs" },
            { name: "PC Gamer PRO", price: 8500.00, image: "https://placehold.co/200x150/e5e7eb/374151?text=PC+Gamer+PRO", category: "pcs" },
            { name: "PC Workstation", price: 6000.00, image: "https://placehold.co/200x150/e5e7eb/374151?text=PC+Workstation", category: "pcs" },

            // Placas de Vídeo
            { name: "Placa de Vídeo RTX 4080", price: 7500.00, image: "https://placehold.co/200x150/e5e7eb/374151?text=RTX+4080", category: "gpu" },
            { name: "Placa de Vídeo RX 7900 XT", price: 6800.00, image: "https://placehold.co/200x150/e5e7eb/374151?text=RX+7900+XT", category: "gpu" },
            { name: "Placa de Vídeo GTX 1660 Super", price: 1500.00, image: "https://placehold.co/200x150/e5e7eb/374151?text=GTX+1660S", category: "gpu" },

            // Processadores
            { name: "Processador Intel i9-13900K", price: 3200.00, image: "https://placehold.co/200x150/e5e7eb/374151?text=Intel+i9-13900K", category: "cpu" },
            { name: "Processador AMD Ryzen 7 7800X3D", price: 2800.00, image: "https://placehold.co/200x150/e5e7eb/374151?text=Ryzen+7+7800X3D", category: "cpu" },
            { name: "Processador Intel i5-12400F", price: 1000.00, image: "https://placehold.co/200x150/e5e7eb/374151?text=Intel+i5-12400F", category: "cpu" },

            // Memórias RAM
            { name: "Memória RAM Corsair Vengeance RGB Pro 16GB", price: 699.99, image: "https://placehold.co/200x150/e5e7eb/374151?text=RAM+16GB", category: "ram" },
            { name: "Memória RAM Kingston Fury Beast 32GB", price: 1200.00, image: "https://placehold.co/200x150/e5e7eb/374151?text=RAM+32GB", category: "ram" },

            // Armazenamento
            { name: "SSD NVMe Samsung 980 Pro 1TB", price: 750.00, image: "https://placehold.co/200x150/e5e7eb/374151?text=SSD+1TB", category: "storage" },
            { name: "HD Seagate Barracuda 2TB", price: 350.00, image: "https://placehold.co/200x150/e5e7eb/374151?text=HD+2TB", category: "storage" },

            // Coolers
            { name: "Water Cooler Corsair H100i RGB", price: 800.00, image: "https://placehold.co/200x150/e5e7eb/374151?text=Water+Cooler", category: "cooler" },
            { name: "Air Cooler Cooler Master Hyper 212", price: 250.00, image: "https://placehold.co/200x150/e5e7eb/374151?text=Air+Cooler", category: "cooler" },

            // Monitores
            { name: "Monitor Gamer Curvo 240Hz", price: 1800.00, image: "https://placehold.co/200x150/e5e7eb/374151?text=Monitor+240Hz", category: "monitor" },
            { name: "Monitor Profissional 4K", price: 2500.00, image: "https://placehold.co/200x150/e5e7eb/374151?text=Monitor+4K", category: "monitor" },

            // Periféricos
            { name: "Teclado Mecânico RGB", price: 450.00, image: "https://placehold.co/200x150/e5e7eb/374151?text=Teclado+Mecânico", category: "peripherals" },
            { name: "Mouse Gamer Ergonômico", price: 250.00, image: "https://placehold.co/200x150/e5e7eb/374151?text=Mouse+Gamer", category: "peripherals" },
            { name: "Fone de Ouvido Gamer 7.1", price: 600.00, image: "https://placehold.co/200x150/e5e7eb/374151?text=Fone+Gamer", category: "peripherals" },

            // Fontes
            { name: "Fonte Corsair RM850e 850W 80 Plus Gold", price: 900.00, image: "https://placehold.co/200x150/e5e7eb/374151?text=Fonte+850W", category: "fonte" },
            { name: "Fonte XPG Core Reactor 750W 80 Plus Gold", price: 700.00, image: "https://placehold.co/200x150/e5e7eb/374151?text=Fonte+750W", category: "fonte" },
            { name: "Fonte EVGA 600W 80 Plus White", price: 300.00, image: "https://placehold.co/200x150/e5e7eb/374151?text=Fonte+600W", category: "fonte" }
        ];
            
        function renderProducts(filteredProducts) {
            if (productsGrid) {
                productsGrid.innerHTML = ''; // Limpa o grid
                if (filteredProducts.length === 0) {
                    productsGrid.innerHTML = '<p class="col-span-full text-center text-gray-600">Nenhum produto encontrado com os filtros selecionados.</p>';
                    return;
                }
                filteredProducts.forEach(product => {
                    const productCard = document.createElement('div');
                    productCard.className = 'bg-white rounded-lg shadow-md overflow-hidden p-6 text-center product-card'; // Tailwind classes + custom class
                    productCard.innerHTML = `
                        <img src="${product.image}" alt="${product.name}" class="w-full h-40 object-contain mb-4 rounded-md">
                        <h3 class="text-lg font-semibold text-gray-800 mb-2">${product.name}</h3>
                        <p class="text-purple-700 font-bold text-xl mb-4">R$ ${product.price.toFixed(2).replace('.', ',')}</p>
                        <button class="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors duration-200">Comprar</button>
                    `;
                    productsGrid.appendChild(productCard);
                });
            }
        }

        function applyFilters() {
            const selectedCategory = categoryFilter ? categoryFilter.value : 'all';
            const selectedPriceRange = priceFilter ? priceFilter.value : 'all';
            console.log("applyFilters called. Category:", selectedCategory, "Price:", selectedPriceRange); // Mensagem de depuração

            let filtered = products;

            // Filtrar por categoria
            if (selectedCategory !== 'all') {
                filtered = filtered.filter(product => product.category === selectedCategory);
            }

            // Filtrar por preço
            if (selectedPriceRange !== 'all') {
                filtered = filtered.filter(product => {
                    if (selectedPriceRange === 'low') {
                        return product.price <= 1000;
                    } else if (selectedPriceRange === 'medium') {
                        return product.price > 1000 && product.price <= 3000;
                    } else if (selectedPriceRange === 'high') {
                        return product.price > 3000;
                    }
                    return true;
                });
            }
            
            console.log("Filtered products count after filters:", filtered.length, filtered); // Mensagem de depuração

            // Lógica para mostrar no máximo 2 produtos por categoria quando um filtro de categoria específico é aplicado
            // Esta condição só deve ser aplicada se houver um filtro de categoria específico E o número de produtos filtrados for maior que 2.
            if (selectedCategory !== 'all' && filtered.length > 2) {
                renderProducts(filtered.slice(0, 2));
                console.log("Displaying sliced products (first 2)."); // Mensagem de depuração
            } else {
                renderProducts(filtered);
                console.log("Displaying all filtered products."); // Mensagem de depuração
            }
        }
        
        if (productsGrid && window.location.pathname.includes('produtos.html')) {
            if (categoryFilter) {
                categoryFilter.addEventListener('change', applyFilters);
            }
            if (priceFilter) {
                priceFilter.addEventListener('change', applyFilters);
            }
            applyFilters(); // Aplica filtros iniciais para carregar todos os produtos na página de produtos
        } else if (window.location.pathname.includes('index.html')) {
            // Para a página inicial, exibe os 4 primeiros produtos em destaque
            renderProducts(products.slice(0, 4));
        }
    }
    
    loadProducts();

    // Formulário de contato
    const contactForm = document.getElementById('contactForm');
    const contactMessageDiv = document.getElementById('contact-message');

    if (contactForm && contactMessageDiv) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulação de envio
            contactMessageDiv.classList.remove('hidden');
            contactMessageDiv.classList.add('bg-green-100', 'text-green-800'); // Cor de sucesso
            contactMessageDiv.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
            
            this.reset(); // Limpa o formulário

            // Esconde a mensagem após 5 segundos
            setTimeout(() => {
                contactMessageDiv.classList.add('hidden');
                contactMessageDiv.classList.remove('bg-green-100', 'text-green-800');
            }, 5000);
        });
    }
});