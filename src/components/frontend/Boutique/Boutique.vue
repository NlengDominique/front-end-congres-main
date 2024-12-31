<template>
  <div class=" bg-gradient-to-b from-[#9C7C13]">
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
    <div class="container mx-auto py-12 ">
      <h2 class="text-3xl font-semibold text-center text-gray-800 mb-8">Nos Produits</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div
          v-for="(product, index) in products"
          :key="index"
          class="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <img
            :src="product.image || `https://picsum.photos/300/200?random=${index}`"
            :alt="product.nom"
            class="w-full h-48 object-cover"
          />
          <div class="p-4">
            <p class="text-gray-600">{{ product.categorie.nom }}</p>
            <h3 class="text-xl font-semibold text-gray-800">{{ product.nom }}</h3>
            <p class="text-lg font-bold text-gray-800">{{ product.prix }} FCFA</p>
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
import ProduitService from "@/services/ProduitService"; // Import du service
import { ref, onMounted } from "vue";

export default {
  name: "Boutique",
  setup() {
    // Déclaration des variables réactives
    const products = ref([]);
    const loading = ref(false);
    const error = ref(null);

    // Charger les produits depuis l'API
    const loadProducts = async () => {
      loading.value = true;
      try {
        const response = await ProduitService.getAllProduits();
        products.value = response;
      } catch (err) {
        error.value = "Une erreur est survenue lors de la récupération des produits.";
        console.error(err);
      } finally {
        loading.value = false;
      }
    };

    // Charger les produits au montage du composant
    onMounted(loadProducts);

    return {
      products,
      loading,
      error,
    };
  },
};
</script>

<style scoped>
/* Styles personnalisés */
</style>
