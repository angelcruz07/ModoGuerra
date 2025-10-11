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
    title: "Guía Completa de Frontend Moderno",
    description:
      "Descubre las tecnologías y buenas prácticas para el desarrollo frontend en 2025.",
    content:
      '# Guía Completa de Frontend Moderno\n\nEl desarrollo frontend ha evolucionado rápidamente. Hoy en día, frameworks como React, Vue y Svelte dominan el mercado, pero también es fundamental dominar HTML, CSS y JavaScript puro.\n\n## Consejos clave\n- Utiliza componentes reutilizables.\n- Aprovecha el tipado con TypeScript.\n- Aplica buenas prácticas de accesibilidad (a11y).\n\n## Ejemplo de componente React\n```jsx\nfunction Button({ children }) {\n  return <button className="btn">{children}</button>;\n}\n```\n\n¡No olvides optimizar el rendimiento y la experiencia de usuario!',
    image:
      "https://res.cloudinary.com/dlklqucye/image/upload/v1758493153/codequest25/posts/post01_bbil2o.webp",
    tags: ["frontend", "react", "vue", "svelte", "typescript"],
    slug: "guia-frontend-moderno-2025",
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
  {
    title: "Seguridad Web: Protege tus Aplicaciones",
    description:
      "Consejos prácticos para mejorar la seguridad de tus proyectos web.",
    content:
      '# Seguridad Web: Protege tus Aplicaciones\n\nLa seguridad es fundamental en cualquier aplicación. Algunos consejos:\n\n- Usa HTTPS siempre.\n- Valida y sanitiza la entrada del usuario.\n- Implementa autenticación y autorización robusta.\n\n## Ejemplo de validación en Express\n```js\napp.post("/login", (req, res) => {\n  if (!req.body.user || !req.body.password) {\n    return res.status(400).send("Datos incompletos");\n  }\n  // ...\n});\n```\n\nMantente actualizado sobre vulnerabilidades comunes (OWASP Top 10).',
    image:
      "https://res.cloudinary.com/dlklqucye/image/upload/v1758493156/codequest25/posts/post07_utxhu8.webp",
    tags: ["seguridad", "web", "owasp", "express"],
    slug: "seguridad-web-protege-aplicaciones",
    categories: [categoryNames[7], categoryNames[0]],
    userId: userIds[1],
  },
  {
    title: "Desarrollo Móvil con Flutter",
    description: "Crea apps móviles nativas para iOS y Android con Flutter.",
    content:
      '# Desarrollo Móvil con Flutter\n\nFlutter permite crear aplicaciones móviles nativas con una sola base de código.\n\n## Ejemplo de widget básico\n```dart\nimport "package:flutter/material.dart";\n\nvoid main() => runApp(MyApp());\n\nclass MyApp extends StatelessWidget {\n  @override\n  Widget build(BuildContext context) {\n    return MaterialApp(\n      home: Scaffold(\n        body: Center(child: Text("¡Hola Flutter!")),\n      ),\n    );\n  }\n}\n```\n\nExplora los widgets y plugins disponibles para ampliar funcionalidades.',
    image:
      "https://res.cloudinary.com/dlklqucye/image/upload/v1758493157/codequest25/posts/post08_stto5z.webp",
    tags: ["flutter", "movil", "android", "ios"],
    slug: "desarrollo-movil-flutter",
    categories: [categoryNames[8], categoryNames[0]],
    userId: userIds[2],
  },
  {
    title: "Bases de Datos Relacionales vs NoSQL",
    description: "¿Cuándo elegir una base de datos relacional o NoSQL?",
    content:
      "# Bases de Datos Relacionales vs NoSQL\n\nLa elección de la base de datos depende de las necesidades del proyecto.\n\n## Relacionales (SQL)\n- Estructura fija (tablas).\n- ACID.\n\n## NoSQL\n- Flexible (documentos, grafos, clave-valor).\n- Escalabilidad horizontal.\n\nEvalúa tus requerimientos antes de decidir.",
    image:
      "https://res.cloudinary.com/dlklqucye/image/upload/v1758493159/codequest25/posts/post09_lbsd7x.webp",
    tags: ["bases de datos", "sql", "nosql"],
    slug: "bases-datos-relacionales-vs-nosql",
    categories: [categoryNames[9], categoryNames[1]],
    userId: userIds[3],
  },
  {
    title: "Cloud Computing: Introducción a AWS",
    description: "Conoce los servicios esenciales de AWS para desarrolladores.",
    content:
      "# Cloud Computing: Introducción a AWS\n\nAmazon Web Services (AWS) es la plataforma cloud más utilizada.\n\n## Servicios clave\n- EC2: Servidores virtuales.\n- S3: Almacenamiento de objetos.\n- Lambda: Funciones serverless.\n\nAprende a desplegar y escalar aplicaciones en la nube.",
    image:
      "https://res.cloudinary.com/dlklqucye/image/upload/v1758493160/codequest25/posts/post10_egzisv.webp",
    tags: ["cloud", "aws", "serverless"],
    slug: "cloud-computing-introduccion-aws",
    categories: [categoryNames[10], categoryNames[1]],
    userId: userIds[4],
  },
  {
    title: "Testing Efectivo en JavaScript",
    description: "Aprende a escribir tests unitarios y de integración en JS.",
    content:
      '# Testing Efectivo en JavaScript\n\nEl testing asegura la calidad y robustez del software.\n\n## Ejemplo con Jest\n```js\ntest("suma dos números", () => {\n  expect(1 + 2).toBe(3);\n});\n```\n\nAutomatiza tus pruebas y usa coverage para medir la efectividad.',
    image:
      "https://res.cloudinary.com/dlklqucye/image/upload/v1758493160/codequest25/posts/post11_uu0dcl.webp",
    tags: ["testing", "javascript", "jest"],
    slug: "testing-efectivo-javascript",
    categories: [categoryNames[11], categoryNames[0]],
    userId: userIds[0],
  },
  {
    title: "UI/UX: Principios de Diseño Centrado en el Usuario",
    description:
      "Mejora la experiencia de tus usuarios con estos principios clave.",
    content:
      "# UI/UX: Principios de Diseño Centrado en el Usuario\n\nUn buen diseño UI/UX es esencial para el éxito de cualquier producto digital.\n\n- Simplicidad y claridad.\n- Consistencia visual.\n- Feedback inmediato.\n- Accesibilidad para todos.\n\nRealiza pruebas de usabilidad y escucha a tus usuarios.",
    image:
      "https://res.cloudinary.com/dlklqucye/image/upload/v1758493162/codequest25/posts/post12_lcexhg.webp",
    tags: ["ui", "ux", "diseño", "usabilidad"],
    slug: "ui-ux-principios-diseno-usuario",
    categories: [categoryNames[12], categoryNames[0]],
    userId: userIds[1],
  },
  {
    title: "Gestión Ágil de Proyectos con Scrum",
    description: "Implementa Scrum para mejorar la productividad de tu equipo.",
    content:
      "# Gestión Ágil de Proyectos con Scrum\n\nScrum es el marco ágil más utilizado para la gestión de proyectos de software.\n\n## Roles principales\n- Product Owner\n- Scrum Master\n- Equipo de desarrollo\n\n## Ceremonias\n- Sprint Planning\n- Daily Scrum\n- Sprint Review\n- Retrospective\n\nAdapta Scrum a las necesidades de tu equipo para obtener mejores resultados.",
    image:
      "https://res.cloudinary.com/dlklqucye/image/upload/v1758493880/codequest25/posts/post13_ayreyc.webp",
    tags: ["agile", "scrum", "project management"],
    slug: "gestion-agil-proyectos-scrum",
    categories: [categoryNames[13], categoryNames[14]],
    userId: userIds[2],
  },
  {
    title: "Blockchain: Conceptos Básicos para Desarrolladores",
    description: "Entiende cómo funciona blockchain y sus aplicaciones.",
    content:
      "# Blockchain: Conceptos Básicos para Desarrolladores\n\nBlockchain es una tecnología de registro distribuido con múltiples aplicaciones.\n\n- Descentralización\n- Inmutabilidad\n- Contratos inteligentes\n\nExplora plataformas como Ethereum y aprende a crear smart contracts.",
    image:
      "https://res.cloudinary.com/dlklqucye/image/upload/v1758493163/codequest25/posts/post14_ao1nfv.webp",
    tags: ["blockchain", "ethereum", "smart contracts"],
    slug: "blockchain-conceptos-basicos-desarrolladores",
    categories: [categoryNames[15], categoryNames[1]],
    userId: userIds[3],
  },
  {
    title: "Internet of Things (IoT): Primeros Pasos",
    description: "Descubre cómo conectar dispositivos y crear soluciones IoT.",
    content:
      '# Internet of Things (IoT): Primeros Pasos\n\nEl IoT conecta objetos físicos a internet para recopilar y compartir datos.\n\n## Ejemplo con Arduino\n```cpp\nvoid setup() {\n  Serial.begin(9600);\n}\nvoid loop() {\n  Serial.println("¡Hola IoT!");\n  delay(1000);\n}\n```\n\nExplora plataformas como Raspberry Pi y servicios cloud para IoT.',
    image:
      "https://res.cloudinary.com/dlklqucye/image/upload/v1758494008/codequest25/posts/post15_ehtdav.webp",
    tags: ["iot", "arduino", "raspberry pi"],
    slug: "iot-primeros-pasos",
    categories: [categoryNames[16], categoryNames[10]],
    userId: userIds[4],
  },
];
