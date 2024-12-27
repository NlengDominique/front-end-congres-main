import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Hynme from "@/views/Hynme.vue";
import loginadmin from "@/views/loginadmin.vue";
import AboutCongress from "@/components/frontend/aboutCongress/AboutCongress.vue";
import ListeVillages from "@/components/frontend/liste-villages/ListeVillages.vue";
import Inscription from "@/components/frontend/inscription/Inscription.vue";
import Paiement from "@/components/frontend/paiement/Paiement.vue";
import Sponsor from "@/components/frontend/sponsor/Sponsor.vue";
import Introduction from "@/components/frontend/sponsor/introduction.vue"; 
import Contact from "@/components/frontend/contact/Contact.vue";

// Imported once, for both routes
import VideoList from "@/components/frontend/videotheque/VideoList.vue"; 
import Admin from "@/views/Admin/dashboard.vue";
import payslist from "@/views/Admin/pays/payslist.vue";
import VilleList from "@/views/Admin/villes/VilleList.vue";
import NotFound from "@/views/NotFound.vue"; 
import motChef from "@/components/frontend/MotDuChef/motChef.vue";
import motPresident from "@/components/frontend/motDuPresident/motPresident.vue";
import presentationCanton from "@/components/frontend/presentationCanton/presentationCanton.vue";
import { useAuthStore } from "../stores/auth";
import { path } from "framer-motion/client";
import hoteCongres from "../components/frontend/hoteCongres/hoteCongres.vue";
import ListeAssociations from "../components/frontend/liste-associations/ListeAssociations.vue";
import Boutique from "../components/frontend/Boutique/Boutique.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/about-congress",
    component: AboutCongress,
  },
  {
    path:"/motChef",
    component:motChef,
  },
  {
    path:"/motPresident",
    component:motPresident,
  },
  {
    path:"/presentation-canton",
    component:presentationCanton,
  },
  {
    path:"/liste-associations",
    component:ListeAssociations,
  },
  {
    path:"/hote-congres",
    component:hoteCongres,
  },
  {
    path: "/liste-villages",
    component: ListeVillages,
  },
  {
    path: "/videotheque",
    component: VideoList,
  },
  {
    path: "/boutique",
    component: Boutique,
  },
  {
    path: "/hynme",
    name: "Hynme",
    component: Hynme,
  },
  {
    path: "/loginadmin",
    name: "loginadmin",
    component: loginadmin,
  },
  {
    path: "/inscription",
    component: Inscription,
  },
  {
    path: "/paiement",
    component: Paiement,
  },
  {
    path: "/sponsor",
    component: Sponsor,
  },
  {
    path: "/introduction", // Nouvelle route pour Introduction
    component: Introduction,
  },
  {
    path: "/contact",
    component: Contact,
  },
  {
    path: "/Admin",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Admin,
      },
      {
        path: "pays",
        name: "payslist",
        component: payslist,
      },
      {
        path: "videos",
        name: "VideoList",
        component: VideoList, // Admin route
      },
      {
        path: "villes",
        name: "VilleList",
        component: VilleList, 
      },
    ],
    meta: { requiresAuth: true },
  },
  // Route "catch-all" pour les URL non définies
  {
    path: "/:catchAll(.*)", // Cela attrape toutes les routes non définies
    name: "notfound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth) {
    if (authStore.isAuthenticated) {
      next();
    } else {
      next({ name: "loginadmin" });
    }
  } else {
    next();
  }
});

export default router;