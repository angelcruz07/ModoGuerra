import { categories as categorySeed } from "./seed-categories.ts";
import { users as userSeed } from "./seed-users.ts";

interface Post {
  title: string;
  description: string;
  content: string;
  image: string;
  tags: string[];
  slug: string;
  categories: string[];
  userId: string;
}

const categoryNames = categorySeed.map((c) => c.name);
const userIds = userSeed.map((u) => u.id);

export const posts: Post[] = [
  {
    title: "¿Qué es Modo Guerra?",
    description:
      "Mi compa, tome el tiempo de refrescar su memoria y recoderle cual es su modo guerra.",
    content:
      '# Guía Completa de Frontend Moderno\n\nEl desarrollo frontend ha evolucionado rápidamente. Hoy en día, frameworks como React, Vue y Svelte dominan el mercado, pero también es fundamental dominar HTML, CSS y JavaScript puro.\n\n## Consejos clave\n- Utiliza componentes reutilizables.\n- Aprovecha el tipado con TypeScript.\n- Aplica buenas prácticas de accesibilidad (a11y).\n\n## Ejemplo de componente React\n```jsx\nfunction Button({ children }) {\n  return <button className="btn">{children}</button>;\n}\n```\n\n¡No olvides optimizar el rendimiento y la experiencia de usuario!',
    image:
      "https://res.cloudinary.com/dlklqucye/image/upload/v1723741683/Modoguerrashop/eltokio.webp",
    tags: ["frontend", "react", "vue", "svelte", "typescript"],
    slug: "que-es-modo-guerra",
    categories: [categoryNames[0], categoryNames[12]],
    userId: userIds[0],
  },
  {
    title: "API RESTful con Node.js y Express",
    description:
      "Aprende a crear una API RESTful profesional usando Node.js y Express.",
    content:
      '# API RESTful con Node.js y Express\n\nCrear una API RESTful es esencial para conectar el frontend y el backend. Express es el framework más popular para Node.js.\n\n## Pasos básicos\n1. Instala Express: `npm install express`\n2. Crea un archivo `index.js`:\n```js\nconst express = require("express");\nconst app = express();\napp.get("/", (req, res) => res.send("¡Hola Mundo!"));\napp.listen(3000);\n```\n\n## Buenas prácticas\n- Usa middlewares para validación y autenticación.\n- Documenta tu API con Swagger.',
    image:
      "https://res.cloudinary.com/dlklqucye/image/upload/v1758607446/codequest25/wggvodfzdzdsxwgyxwlj.webp",
    tags: ["backend", "api", "nodejs", "express"],
    slug: "api-restful-node-express",
    categories: [categoryNames[1], categoryNames[20]],
    userId: userIds[1],
  },
  {
    title: "Introducción a DevOps: CI/CD con GitHub Actions",
    description: "Automatiza tus despliegues y pruebas con pipelines modernos.",
    content:
      "# Introducción a DevOps: CI/CD con GitHub Actions\n\nDevOps integra desarrollo y operaciones para entregar software de calidad rápidamente. GitHub Actions permite crear flujos de CI/CD fácilmente.\n\n## Ejemplo de workflow\n```yaml\nname: Node.js CI\non: [push]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v2\n      - name: Instalar dependencias\n        run: npm install\n      - name: Ejecutar tests\n        run: npm test\n```\n\nAutomatiza pruebas, builds y despliegues para mayor eficiencia.",
    image:
      "https://res.cloudinary.com/dlklqucye/image/upload/v1758493154/codequest25/posts/post03_gj3ky1.webp",
    tags: ["devops", "ci/cd", "github", "actions"],
    slug: "introduccion-devops-cicd-github-actions",
    categories: [categoryNames[3], categoryNames[10]],
    userId: userIds[2],
  },
  {
    title: "Data Science: Análisis Exploratorio con Python",
    description:
      "Aprende a analizar datos y obtener insights usando Python y pandas.",
    content:
      '# Data Science: Análisis Exploratorio con Python\n\nEl análisis exploratorio de datos (EDA) es el primer paso en cualquier proyecto de ciencia de datos.\n\n## Ejemplo básico con pandas\n```python\nimport pandas as pd\ndf = pd.read_csv("datos.csv")\nprint(df.describe())\n```\n\nVisualiza tus datos con matplotlib o seaborn para detectar patrones y anomalías.',
    image:
      "https://res.cloudinary.com/dlklqucye/image/upload/v1758493154/codequest25/posts/post04_cilafq.webp",
    tags: ["data science", "python", "pandas", "eda"],
    slug: "data-science-analisis-exploratorio-python",
    categories: [categoryNames[4], categoryNames[19]],
    userId: userIds[3],
  },
  {
    title: "Machine Learning: Primer Modelo de Clasificación",
    description:
      "Construye tu primer modelo de clasificación con scikit-learn.",
    content:
      "# Machine Learning: Primer Modelo de Clasificación\n\nScikit-learn es la librería más popular para machine learning en Python.\n\n## Ejemplo de clasificación\n```python\nfrom sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import RandomForestClassifier\n\niris = load_iris()\nX_train, X_test, y_train, y_test = train_test_split(iris.data, iris.target)\nclf = RandomForestClassifier()\nclf.fit(X_train, y_train)\nprint(clf.score(X_test, y_test))\n```\n\nExperimenta con diferentes algoritmos y parámetros.",
    image:
      "https://res.cloudinary.com/dlklqucye/image/upload/v1758493156/codequest25/posts/post05_qubsxy.webp",
    tags: ["machine learning", "python", "scikit-learn", "clasificacion"],
    slug: "machine-learning-primer-modelo-clasificacion",
    categories: [categoryNames[5], categoryNames[4]],
    userId: userIds[4],
  },
  {
    title: "Arquitectura de Software: Principios SOLID",
    description: "Mejora la mantenibilidad de tu código aplicando SOLID.",
    content:
      "# Arquitectura de Software: Principios SOLID\n\nLos principios SOLID ayudan a escribir código más limpio y escalable:\n\n- **S**: Responsabilidad Única\n- **O**: Abierto/Cerrado\n- **L**: Sustitución de Liskov\n- **I**: Segregación de Interfaces\n- **D**: Inversión de Dependencias\n\n## Ejemplo en TypeScript\n```typescript\ninterface Notificador { enviar(mensaje: string): void; }\nclass Email implements Notificador {\n  enviar(mensaje: string) { /* ... */ }\n}\n```\n\nAplica estos principios en tus proyectos para facilitar el mantenimiento.",
    image:
      "https://res.cloudinary.com/dlklqucye/image/upload/v1758493156/codequest25/posts/post06_jw83ou.webp",
    tags: ["arquitectura", "solid", "typescript", "software"],
    slug: "arquitectura-software-principios-solid",
    categories: [categoryNames[6], categoryNames[2]],
    userId: userIds[0],
  },
];
