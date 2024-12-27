<template>
  <div >
    <!-- Hero Banner -->
    <div class="relative bg-gradient-to-b from-[#9C7C13] text-white -z-0">
      <div class="absolute inset-0 bg-opacity-50"></div>
      <div class="container mx-auto px-6 py-20 text-center relative z-10">
        <h1 class="text-5xl font-bold leading-tight animate-fade-in-down">Decouvrir les Associations</h1>
        <p class="mt-4 text-lg animate-fade-in-down">
          Explorez une collection de <span class="font-bold">{{ associations.length }}</span> associations uniques, chacune riche en culture et en traditions.
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
          placeholder="Rechercher une association..."
          class="w-1/2 py-3 pl-10 pr-4 transition duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          @input="handleSearch"
        />
        <MagnifyingGlassIcon class="absolute w-5 h-5 text-gray-400 left-3 top-3" />
      </div>
    </div>

    <!-- Liste des associations -->
    <div class="container mx-auto px-6 py-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3 font-sans">
      <div
        v-for="association in associations"
        :key="association.id"
        class="p-6 bg-white rounded-lg shadow-lg group hover:shadow-xl transition"
      >
        <!-- Logo de l'association depuis Lorem Picsum -->
        <!-- <div class="overflow-hidden rounded-lg mb-4">
          <img
            :src="`https://picsum.photos/200/200?random=${association.id}`"
            :alt="'Logo de ' + association.nom"
            class="w-full h-48 object-cover transition-transform duration-200 group-hover:scale-110"
          />
        </div> -->
        <!-- Nom de l'association -->
        <h2 class="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600">
          {{ association.nom }}
        </h2>

        
        <!-- Description brève -->
        <p class="text-gray-600 text-sm">
          {{ association.description }}
        </p>
        <!-- Informations supplémentaires -->
        <div class="mt-4 ">
          <p class="text-gray-600 text-sm mb-3"><strong>President:</strong> {{ association.president }}</p>
          <p class="text-gray-600 text-sm mb-3"><strong>Sigle:</strong> {{ association.sigle }}</p>
          <p class="text-gray-600 text-sm mb-3"><strong>Adresse:</strong> {{ association.addresse }}</p>
          <p class="text-gray-600 text-sm mb-3"><strong>Email:</strong> {{ association.email }}</p>
          <p class="text-gray-600 text-sm mb-3"><strong>Téléphone:</strong> {{ association.tel }}</p>
          <p class="text-gray-600 text-sm mb-3"><strong>Ville:</strong> {{ association.ville }}</p>
          <p class="text-gray-600 text-sm mb-3"><strong>Pays:</strong> {{ association.pays }}</p>
          <p class="text-gray-600 text-sm mb-3"><strong>Site Web:</strong> <a :href="association.site_web" target="_blank" class="text-blue-500">{{ association.site_web }}</a></p>
        </div>
      </div>
    </div>

    <!-- Message lorsque aucune association n'est trouvée -->
    <div v-if="associations.length === 0" class="flex flex-col items-center justify-center p-10">
      <img
        src="/public/no-results.png"
        alt="Aucune association trouvée"
        class="w-1/2 mb-4"
      />
      <p class="text-lg text-gray-600">Aucune association trouvée. Essayez une autre recherche.</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import AssociationService from "@/services/AssociationService";
import { useToast } from "vue-toastification";
import Separator from "@/components/frontend/separator/Separator.vue";

const toast = useToast();

export default {
  components: {
    Separator,
  },
  setup() {
    const loading = ref(false);
    const associations = ref([]);
    const searchQuery = ref("");

    // Charger les associations
    const loadAssociations = async () => {
      try {
        loading.value = true;
        const response = await AssociationService.getAllAssociations(searchQuery.value);
        associations.value = response.map((association) => ({
          ...association,
          description: association.description || "Découvrez cette association riche en culture et traditions.",
        }));
      } catch (error) {
        toast.error("Une erreur est survenue lors du chargement des associations");
      } finally {
        loading.value = false;
      }
    };

    // Gérer la recherche avec debounce
    let searchTimeout;
    const handleSearch = () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        loadAssociations();
      }, 300);
    };

    // Charger les associations au montage du composant
    onMounted(loadAssociations);

    return {
      loading,
      associations,
      searchQuery,
      handleSearch,
    };
  },
};
</script>

<style scoped>
/* Palette bleue et jaune */
.group:hover .group-hover\:text-blue-600 {
  color: #2563eb; /* Bleu foncé */
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

/* .hover\:shadow-2xl:hover {
  filter: drop-shadow(0 12px 16 contentReference[oaicite:0]{index=0}} */
 
</style>