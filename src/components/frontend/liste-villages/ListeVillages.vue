<template>
  <div>
    <!-- Hero Banner -->
    <div class="relative bg-gradient-to-b from-[#4CAF50] to-[#A8E6A1]
 text-white -z-0">
      <div class="absolute inset-0 bg-opacity-50"></div>
      <div class="container mx-auto px-6 py-20 text-center relative z-10">
        <h1 class="text-4xl font-bold leading-tight animate-fade-in-down md:text-5xl ">Découvrir les Villages Ndogbatjeck</h1>
        <p class="mt-4 text-lg animate-fade-in-down">
          Explorez une collection de <span class="font-bold">{{ villages.length }}</span> villages uniques, chacun riche en culture et en traditions.
        </p>
      </div>
    </div>

    <Separator />
    <br />

    <!-- Zone de recherche -->
    <div class="container mx-auto px-6 py-6">
      <div class="relative flex justify-center">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Rechercher un village..."
          class="w-3/4 md:w-1/2 py-3 pl-10 pr-4 rounded-full shadow-md  focus:ring-blue-500 focus:border-blue-500"
          @input="handleSearch"
        />
        <MagnifyingGlassIcon class="absolute w-5 h-5 text-gray-400 left-3 top-3" />
      </div>
    </div>

    <!-- Liste des villages -->
    <div class="container mx-auto px-6 py-6 flex flex-col gap-6">
      <div
        v-for="village in villages"
        :key="village.id"
        class="p-6 rounded-lg shadow-lg group hover:shadow-xl transition w-full cursor-pointer"
        @click="toggleDescription(village.id)"
      >
        <!-- Nom du village -->
        <h2 class="text-xl font-bold text-gray-800 mb-2 group-hover:text-yellow-300">
          {{ village.nom }}
        </h2>
        <h2 class="text-xl font-bold text-gray-800 mb-2 group-hover:text-yellow-300">
          Chef du village : {{ village.chef }}
        </h2>
        <!-- Description brève -->
        <p class="text-gray-600 text-sm">
          {{ village.description }}
        </p>

        <!-- Description supplémentaire dépliable -->
        <div v-if="village.isOpen" class="mt-4 p-4 bg-gray-100 rounded-lg">
          <p>{{ village.detailedDescription }}</p>
        </div>
      </div>
    </div>

    <!-- Message lorsque aucun village n'est trouvé -->
    <div v-if="villages.length === 0" class="flex flex-col items-center justify-center p-10">
      <img
        src="/public/no-results.png"
        alt="Aucun village trouvé"
        class="w-1/2 mb-4"
      />
      <p class="text-lg text-gray-600">Aucun village trouvé. Essayez une autre recherche.</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import VillageService from "@/services/VillageService";
import { useToast } from "vue-toastification";
import Separator from "@/components/frontend/separator/Separator.vue";

const toast = useToast();

export default {
  components: {
    Separator,
  },
  setup() {
    const loading = ref(false);
    const villages = ref([]);
    const searchQuery = ref("");

    // Charger les villages
    const loadVillages = async () => {
      try {
        loading.value = true;
        const response = await VillageService.getAllVillages(searchQuery.value);
        villages.value = response.map((village) => ({
          ...village,
          description: village.description || "Découvrez ce village riche en culture et traditions.",
          isOpen: false, // Initialisation de l'état pour la description
          detailedDescription: village.detailedDescription || "Ceci est une description plus détaillée du village, avec son histoire et ses traditions."
        }));
      } catch (error) {
        toast.error("Une erreur est survenue lors du chargement des villages");
      } finally {
        loading.value = false;
      }
    };

    // Gérer la recherche avec debounce
    let searchTimeout;
    const handleSearch = () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        loadVillages();
      }, 300);
    };

    // Toggle de l'état pour afficher/masquer la description détaillée
    const toggleDescription = (villageId) => {
      const village = villages.value.find(v => v.id === villageId);
      if (village) {
        village.isOpen = !village.isOpen;
      }
    };

    // Charger les villages au montage du composant
    onMounted(loadVillages);

    return {
      loading,
      villages,
      searchQuery,
      handleSearch,
      toggleDescription,
    };
  },
};
</script>

<style scoped>
/* Palette verte et jaune */
.group:hover .group-hover\:text-green-600 {
  color: #16a34a; /* Vert foncé */
}
.group:hover .group-hover\:shadow-xl {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
}

img {
  transition: transform 0.2s ease-in-out;
}

button:hover {
  background-color: #eab308; /* Jaune plus foncé au survol */
}
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-down {
  animation: fadeInDown 1.2s ease-out;
}

.animate-fade-in-up {
  animation: fadeInUp 1.2s ease-out;
}

/* Effet d'ombre et de transition sur le titre */
.drop-shadow-lg {
  filter: drop-shadow(0 6px 8px rgba(0, 0, 0, 0.2));
}

.hover\:shadow-2xl:hover {
  filter: drop-shadow(0 12px 16px rgba(0, 0, 0, 0.3));
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

.hover\:translate-y-2:hover {
  transform: translateY(-0.5rem);
}
/* Hero Banner Styles */

</style>
