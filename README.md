# <p align="center">🛠️ Backend – InfosPerso </p>

Projet informatique fait dans le cadre de la validation du diplôme de niveau 6 "Concepteur Développeur d'Applications" de chez [Alt/](https://www.alt.bzh/).

---


## 🧐 Features    

- Système d'auhtentification
- Ajout d'amis
- Ajout de données
- Personalisation niveau de sensibilité par données
- Système de notification
- Messagerie
- Système de groupe

---

## 🛠️ Technologies utilisées

- NestJS  
- Prisma  
- Docker  

---
        

## 🚀 Installation et lancement

1. **Installer les dépendances**
```bash
npm install
```

2. **Démarrer les conteneurs Docker**

- Démarer l'application Docker Desktop
- Prenez le fichier docker-compose.yaml du back-end, et mettez le à la racine du projet:
```bash
InfosPerso/
├── front/
│   └── ...
├── back/
│   └── ...
└── docker-compose.yaml
```
- Taper la commande :
```bash
docker compose up -d
```

3. **Générer le client Prisma**
```bash
npx prisma generate
```

4. **Réinitialiser et appliquer les migrations**
```bash
npx prisma migrate reset --force
```

5. **Exécuter le seed pour générer des données de dev**
```bash
npx ts-node prisma/seed/index.ts
```

6. **Démarrer le serveur en mode développement**
```bash
npm run start:dev
```

7. **Ouvrir l'application**
- Accéder à : [http://localhost:8081/](http://localhost:8081/)
- Identifiants par défaut :  
  **Username :** `root`  
  **Password :** `root`

8. **Récupérer un email pour se connecter au front**
- Aller dans la section **user-data**
- Trouver la colonne `content`
- Copier l'une des adresses email valide affichées (exemple ligne 21)
- Utiliser cette email et le mot de passe "Password123!" pour ce connecter au front

---

## 🧪 Tests (optionnel)
Lancer les tests unitaires :
```bash
npx jest
```


---


## 🙇 Author
#### Vincent LEGOUT
- [Linkedin](https://www.linkedin.com/in/vincent-legout-7a902b211/)
#### Dorian CAILLAT
- [Linkedin](https://www.linkedin.com/in/dorian-caillat-658723310/)
#### David SPANJAARD
- [Linkedin](https://www.linkedin.com/in/david-spanjaard-383246b0/)
        
