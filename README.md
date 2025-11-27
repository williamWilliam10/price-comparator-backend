

# 💻 Price Comparator — Frontend

````
Interface utilisateur du comparateur de prix.  
Développé avec **React + Vite** et une architecture **feature-based** pour maintenir un code propre, scalable et facile à faire évoluer.

---

## 📂 Architecture du projet

```

src/
app/                         # Routing & providers globaux
features/                    # Modules métier indépendants
products/                  # Feature "Produits"
components/              # UI (ProductCard, VendorTable…)
pages/                   # Pages (ProductsHome, ProductDetail…)
api/                     # Fonctions d'appel à l'API backend
shared/
components/                # Composants UI réutilisables
lib/                       # Helpers / outils (format prix, fetch wrapper…)

````

🎯 **Objectif de cette architecture**  
- Chaque fonctionnalité vit dans son propre dossier  
- Pas de fichiers géants (mélange logique + UI + réseau)  
- Le projet peut grandir sans devenir chaotique

---

## 🚀 Installation & lancement

```bash
npm install
npm run dev
````

Application locale : **[http://localhost:5173](http://localhost:5173)**

---

## 🔌 Connexion au backend

Les appels API se font via **Axios**, strictement à l’intérieur des fichiers :

```
src/features/products/api/
```

Aucune requête réseau ne doit être faite directement dans les composants React.

Structure d’un produit attendu depuis l’API :

```ts
Product {
  id: string
  slug: string
  name: string
  description: string
  imageUrl: string
  minPrice: number        // prix minimum parmi les vendeurs
}
```

---

## 🎨 UI / Design

* **Bootstrap** chargé globalement dans `main.jsx`
* Interface pensée pour la conversion :

  * tableaux comparatifs
  * scoring des vendeurs
  * CTA “Voir l’offre” orienté affiliation

---

## 🧭 Règles de développement

| Règle                                       | Pourquoi                       |
| ------------------------------------------- | ------------------------------ |
| Une feature = un dossier                    | Isolation / maintenabilité     |
| Composants UI dans `shared/`                | Réutilisables partout          |
| Pas de logique API dans les composants      | Séparation claire UI vs Data   |
| `App.jsx` ne contient aucune logique métier | Routing & structure uniquement |

---

## 🗺️ Roadmap UI

| Version | Fonctionnalité                        |
| ------- | ------------------------------------- |
| v1      | Liste des produits depuis le backend  |
| v2      | Page Produit + tableau des vendeurs   |
| v3      | Filtres & catégories                  |
| v4      | Page des promotions & deals           |
| v5      | Mode sombre & préférences utilisateur |

---

## 🛠️ Technologies

| Type         | Choix         |
| ------------ | ------------- |
| Framework    | React         |
| Build tool   | Vite          |
| HTTP client  | Axios         |
| UI           | Bootstrap     |
| Architecture | Feature-based |

---

## ✔️ Statut du projet

🔹 Lecture seule (aucun compte utilisateur)
🔹 Site vitrine (comparaison des prix en temps réel via API backend)
🔹 Prêt à évoluer vers favoris / alertes de prix / filtres

---

Made with ❤️ for a clean and scalable frontend.
