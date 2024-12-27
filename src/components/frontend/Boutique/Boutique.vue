<template>
    <div class="">
      <!-- Bannière héroïque -->
      <div class="relative">
        <img
          src="https://picsum.photos/1920/600?grayscale&blur=2"
          alt="Bannière de la boutique"
          class="w-full h-96 object-cover"
        />
        <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <h1 class="text-4xl font-bold text-white">Commander</h1>
        </div>
      </div>
  
      <!-- Section des produits -->
      <div class="container mx-auto py-12  ">
        <h2 class="text-3xl font-semibold text-center  text-gray-800 mb-8 ">Nos Produits</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div
            v-for="(product, index) in products"
            :key="index"
            class="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              :src="`https://picsum.photos/300/200?random=${index}`"
              :alt="product.name"
              class="w-full h-48 object-cover"
            />
            <div class="p-4">
                <p class="text-gray-600">{{ product.category }}</p>
              <h3 class="text-xl font-semibold text-gray-800">{{ product.name }}</h3>
              
              <p class="text-lg font-bold text-gray-800">{{ product.price }} €</p>
              <button
                class="mt-4 w-full py-2 bg-green-700 text-white font-semibold rounded-lg flex items-center justify-center"
              >
                Acheter
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5 12h14M12 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Boutique',
    data() {
      return {
        products: [
          { name: 'Produit 1', price: 19.99, category: 'Catégorie A' },
          { name: 'Produit 2', price: 29.99, category: 'Catégorie B' },
          { name: 'Produit 3', price: 39.99, category: 'Catégorie C' },
          { name: 'Produit 4', price: 49.99, category: 'Catégorie D' },
          { name: 'Produit 1', price: 19.99, category: 'Catégorie A' },
          { name: 'Produit 2', price: 29.99, category: 'Catégorie B' },
          { name: 'Produit 3', price: 39.99, category: 'Catégorie C' },
          { name: 'Produit 4', price: 49.99, category: 'Catégorie D' },
          // Ajoutez d'autres produits ici
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  /* Styles personnalisés */
  </style>
  