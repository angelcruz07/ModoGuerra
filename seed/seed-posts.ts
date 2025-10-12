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
    title: "¿Como mantenerse atractivo en una relación?",
    description:
      "Que es reciprocidad?",
    content:
      `# Ser congruente es fundamental

Uno se relaciona con una morra porque ella también se relaciona con uno; es una conexión mutua, no una adoración. La morra no es una diosa, son iguales. No hay que convencerla de nada: ella lo quiere o no lo quiere a uno por lo que realmente es.

## Reflexión

La reciprocidad es la base de las relaciones sanas. Cuando ambas personas se tratan como iguales, se crea un espacio de respeto y autenticidad. Intentar convencer o idealizar a la otra persona rompe esa igualdad y puede generar dinámicas dañinas.

### Puntos clave
- Relación mutua: las dos partes participan activamente.
- Respeto: no hay pedestal ni sumisión.
- Autenticidad: ser uno mismo y aceptarse mutuamente.
`,
    image:
      "https://res.cloudinary.com/dlklqucye/image/upload/v1760240405/modoguerra/posts/post1_hj4me9.png",
    tags: ["relaciones", "reciprocidad"],
    slug: "como-mantenerse-atractivo-en-una-relacion",
    categories: [categoryNames[0], categoryNames[12]],
    userId: userIds[0],
  },
  {
    title: "La disciplina comienza con uno mismo",
    description:
      "Deseas ser disciplinado, por eso te ves rodeado de tentaciones.",
   content:
    `# La disciplina comienza con uno mismo

La disciplina no es una cualidad mágica que aparece de la noche a la mañana. Es el resultado de decisiones pequeñas y consistentes tomadas cada día. Si deseas ser disciplinado, aceptarás que estarás rodeado de tentaciones: redes sociales, ocio fácil, excusas y distracciones. El punto no es eliminarlas —eso es imposible— sino crear hábitos y límites que te permitan actuar según tus prioridades.

## Por qué la disciplina importa

- Genera progreso sostenido: las acciones repetidas construyen resultados.
- Reduce la fatiga de decisión: los hábitos automatizan lo importante.
- Refuerza la autoestima: cumplir compromisos contigo mismo fortalece la confianza.

## Estrategias prácticas para ser más disciplinado

1. Define metas claras y pequeñas

  En lugar de objetivos vagos, establece metas diarias alcanzables. Por ejemplo: "Leer 20 páginas" o "trabajar 60 minutos sin distracciones". Las metas pequeñas se acumulan.

2. Diseña tu entorno

  Elimina o dificulta las tentaciones cuando trabajes en tareas importantes. Si las redes sociales te distraen, usa apps que bloqueen sitios por periodos o deja el teléfono en otra habitación.

3. Usa bloques de tiempo y rituales

  Trabaja por bloques (por ejemplo, 25–50 minutos) y toma descansos cortos. Un ritual de inicio —como preparar una bebida o anotar la tarea del día— ayuda a entrar en modo productivo.

4. Compromisos públicos o con un compañero

  Decir tus objetivos en voz alta o comprometerte con alguien aumenta la probabilidad de cumplimiento.

5. Acepta la fricción y planifica recaídas

  La disciplina no es perfección. Habrá días flojos. Anticipa recaídas y ten planes sencillos para retomarlo: reinicia el día siguiente o reduce la meta temporalmente.

## Hábitos que refuerzan la disciplina

- Dormir lo suficiente: la voluntad decrece cuando estás cansado.
- Alimentación y ejercicio: mantienen la energía y claridad mental.
- Revisar tu progreso semanalmente: ajustar metas evita la deriva.

## Reflexión final

Si deseas ser disciplinado, no luches sólo contra las tentaciones: crea sistemas que las neutralicen. La disciplina surge cuando tus valores, tus rutinas y tu entorno trabajan juntos para hacer lo correcto también cuando no te apetece.
`,
    image:
      "https://res.cloudinary.com/dlklqucye/image/upload/v1760300590/modoguerra/posts/post2_z9ijkq.png",
    tags: ["disiplina", "habitos", "productividad"],
    slug: "disciplina-comienza-con-uno-mismo",
    categories: [categoryNames[0], categoryNames[7]],
    userId: userIds[1],
  },
  {
    title: "Cómo el entorno moldea al individuo",
    description: "El hombre es un ser inevitablemente determinado por su entorno.",
    content:
      `# Cómo el entorno moldea al individuo

La afirmación "El hombre es un ser inevitablemente determinado por su entorno" resume una perspectiva sociológica y psicológica: nuestras creencias, hábitos y oportunidades están fuertemente influidas por el contexto en el que vivimos.

## Factores ambientales que nos definen

- Familia y crianza: los valores, expectativas y recursos de la familia configuran la base de comportamiento.
- Educación y escuela: la exposición a modelos, conocimientos y normas académicas amplía (o limita) horizontes.
- Comunidad y cultura: normas sociales, idioma y rituales que guían lo aceptable y lo aspiracional.
- Entorno económico: la disponibilidad de recursos determina opciones y decisiones a corto y largo plazo.

## Determinismo vs. agencia

Aunque el entorno tiene un peso grande, no anula por completo la agencia individual. La mayoría de los teóricos modernos plantean una interacción: el entorno condiciona posibilidades, pero las personas pueden tomar decisiones que alteran su trayectoria.

## Reflexión final

Entender que el entorno nos moldea no es resignarse: es usar esa comprensión para crear mejores ambientes y habilitar elecciones más libres. Nuestra responsabilidad es tanto transformar el entorno como desarrollar la resiliencia necesaria para navegarlo.
`,
    image:
      "https://res.cloudinary.com/dlklqucye/image/upload/v1760301186/modoguerra/posts/image_acjztw.png",
    tags: ["entorno", "sociologia", "psicologia"],
    slug: "el-entorno-moldea-al-individuo",
    categories: [categoryNames[13], categoryNames[8]],
    userId: userIds[2],
  }
];
