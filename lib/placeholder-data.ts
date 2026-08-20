// Contenu d'exemple affiché tant que Supabase n'est pas connecté
// (voir lib/supabase/is-configured.ts). À remplacer par les vraies
// données une fois la base de données en place — voir /admin.

export const placeholderCourses = [
  {
    id: "1",
    slug: "initiation-fitness-canin",
    title: "Initiation au fitness canin",
    description:
      "Les bases de la préparation physique de votre chien : échauffement, exercices de proprioception et renforcement doux.",
    price_cents: 4900,
    published: true,
  },
  {
    id: "2",
    slug: "perfectionnement-fitness-canin",
    title: "Perfectionnement",
    description:
      "Des exercices plus techniques pour progresser : équilibre, coordination et gainage, avec correction personnalisée.",
    price_cents: 7900,
    published: true,
  },
  {
    id: "3",
    slug: "preparation-sport-canin",
    title: "Préparation aux sports canins",
    description:
      "Un programme complet pour préparer physiquement votre chien à l'agility, au canicross ou à l'obé-rythmée.",
    price_cents: 9900,
    published: true,
  },
];

// Vrai témoignage reçu par Marie (source : ancien site). D'autres avis
// arriveront via le formulaire de /temoignages, en attente de validation.
export const placeholderTestimonials = [
  {
    id: "1",
    name: "Client·e DOGFIT",
    title: "Au top",
    content:
      "Marie a suivi chacun de mes chiens, à différents stades : le chiot, le chien sportif, et le chien plus âgé. À chacun son programme, à chacun son rythme. Un budget tout à fait chouette quand on voit le professionnalisme ! Je recommande.",
  },
];

export const placeholderFaqs = [
  {
    question: "Faut-il du matériel spécifique pour suivre les cours ?",
    answer:
      "La plupart des exercices se pratiquent avec un tapis d'équilibre ou des objets du quotidien. Le matériel recommandé est indiqué au début de chaque cours.\n\nMatériel nécessaire minimum :\n– Une plateforme adaptée à la taille de votre chien (facile à fabriquer soi-même, ou sur mesure via « Le Vince du Bois » sur Facebook)\n– Cavaletti : cônes à trous + barres (optionnel mais fortement recommandé)\n– Sol antidérapant : tapis de yoga, moquette, dalles en caoutchouc, etc.\n– Un appareil pour filmer + une application de montage (pour couper les temps morts)\n\nPour fabriquer votre plateforme :\n– Longueur : petit chien (ex. shetland) → longueur du chien + 20 cm ; moyen chien (ex. border, kelpie) → + 35 cm ; grand chien (ex. malinois, berger australien) → + 50 cm\n– Hauteur : entre 3 cm (petits chiens) et 8 cm (grands chiens)\n– Largeur : distance entre l'extérieur des pattes avant\n\nPossibilités simples : une planche surélevée de tasseaux ou des plaques isolantes, recouverte impérativement d'un revêtement antidérapant — idéalement en 2 parties pour plus de polyvalence.",
    images: [
      { src: "/materiel/longueur-plateforme.jpg", alt: "Mesure de la longueur de plateforme sur un chien", width: 1200, height: 617 },
      { src: "/materiel/largeur-plateforme.jpg", alt: "Mesure de la largeur de plateforme, chien debout et assis dessus", width: 1200, height: 598 },
      { src: "/materiel/plateforme-deux-parties.jpg", alt: "Plateforme en deux parties utilisée avec un chien", width: 1200, height: 617 },
      { src: "/materiel/revetement-antiderapant.jpg", alt: "Plateforme en bois brut puis recouverte d'un revêtement antidérapant", width: 1200, height: 598 },
      { src: "/materiel/materiaux-antiderapants.jpg", alt: "Exemples de matériaux antidérapants : tapis, ruban adhésif, dalle caoutchouc", width: 1200, height: 598 },
    ],
  },
  {
    question: "Comment fonctionne la correction des exercices ?",
    answer:
      "Vous envoyez une vidéo ou une description de votre séance depuis votre espace élève. Marie la visionne et vous renvoie une correction avec note, commentaires écrits et parfois une vidéo annotée.",
  },
  {
    question: "Puis-je suivre un cours si mon chien a une pathologie ?",
    answer:
      "Certains programmes conviennent en complément d'un suivi vétérinaire ou en rééducation, mais un avis vétérinaire préalable est recommandé. Contactez Marie pour être orienté·e vers le bon programme.",
  },
  {
    question: "Combien de temps ai-je accès à un cours ?",
    answer:
      "L'accès à un cours acheté est illimité dans le temps : vous pouvez avancer à votre rythme et revenir sur les leçons quand vous le souhaitez.",
  },
];

// Vrais articles de blog écrits par Marie (issus de ses publications
// Instagram, légèrement mis en forme pour le web — titres et paragraphes
// nettoyés, coquilles corrigées). Les lignes commençant par "## " sont
// affichées comme des sous-titres par la page /blog/[slug].
export const placeholderBlogPosts = [
  {
    id: "1",
    slug: "surentrainement-agility",
    title: "Quel est le problème du surentraînement ?",
    excerpt:
      "Trop d'agility, ça existe : stagnation des performances, blessures, épuisement mental... Ce qu'il faut savoir sur le surentraînement et comment doser l'activité de votre chien.",
    content:
      "J'ai traduit pour que tout le monde puisse en profiter !! Je ne cesserai jamais de le répéter, économisez vos chiens ! Entraînez intelligemment pour ne pas arriver à du surentraînement !\n\n« Beaucoup d'entre nous sont accros à l'agility. Nous structurons des aspects de notre vie autour de notre passe-temps et sélectionnons des chiens spécifiquement pour leurs aptitudes physiques. Nous passons des soirées au club, des week-ends en concours et avons beaucoup d'amis agilistes qui comprennent notre passion. Il y a des cours en ligne, des leçons, des stages. Il y a vraiment tellement d'options de nos jours !\n\nMais... nous choisissons de faire de l'agility, pas nos chiens, et il y a certainement un problème à faire trop d'agility.\n\n## Qu'est-ce que le surentraînement ? Surcharge vs surentraînement\n\nLe surentraînement est défini comme un entraînement excessif. Dans le monde du sport, il existe un principe appelé principe de surcharge : pour améliorer les performances physiques, les exigences imposées à l'organisme sont accrues. Un exemple de ceci est lors de l'entraînement de la force, un humain soulèvera des poids progressivement plus lourds. En agility, nous pensons qu'à l'entraînement, le chien doit être capable d'effectuer une séquence aussi longue, voire plus longue, que nécessaire en compétition. Et puis nous pourrions faire cette séquence plus de fois que nécessaire pour être sur-préparés pour une compétition.\n\nMais... de nos jours, les athlètes professionnels et amateurs ont généralement un plan d'entraînement, qui comprend un entraînement aux compétences spécifiques au sport (l'agility dans notre cas), un entraînement de préparation physique, et des jours de repos programmés. Il est également prévu tout au long de l'année d'inclure de grandes périodes de repos et de se préparer avec une augmentation et une diminution de l'entraînement avant les grands événements.\n\nNos athlètes canins, aussi enthousiastes soient-ils, ne choisissent pas quand, où et combien d'agility ils pratiquent. Nous décidons pour eux. À mon avis, il y a beaucoup de chiens qui font beaucoup trop d'agility. Aussi bien à l'entraînement qu'en compétition.\n\n## Quel est le problème de trop pratiquer l'agility ?\n\nLe surentraînement a de nombreux impacts physiques et psychologiques négatifs.\n\nLe surentraînement peut entraîner une stagnation ou une diminution des performances plutôt qu'une amélioration. Cela pourrait ressembler à moins de force, de coordination et d'endurance. Le surentraînement peut également ralentir le temps de réaction et la vitesse de course.\n\nFaire trop d'exercice sans se reposer suffisamment entre les deux peut entraîner de faibles niveaux de testostérone et des niveaux élevés de cortisol, l'hormone du stress. Ces changements hormonaux peuvent être associés à une perte de tissu musculaire et à une augmentation de la graisse. Cela peut également entraîner des lésions musculaires, qui peuvent se transformer en blessures. Lorsque nous nous entraînons, nos muscles ont régulièrement des micro-déchirures à la suite de l'activité physique. Ceci est normal et fait en fait partie de la construction musculaire. Cependant, si le corps n'a pas le temps de réparer ces microdéchirures, il est possible qu'elles deviennent des blessures, et/ou que d'autres zones du corps compensent les déchirures musculaires et deviennent douloureuses ou blessées.\n\nLe surentraînement peut également avoir des impacts psychologiques négatifs tels que :\n\n– Fatigue générale prolongée\n– Augmentation de la tension, de la dépression, de la colère ou de la confusion\n– Incapacité à se détendre\n– Sommeil de mauvaise qualité\n– Manque d'énergie, baisse de motivation, sautes d'humeur\n– Ne pas ressentir la joie de choses qui étaient autrefois agréables\n\nLe problème, c'est que beaucoup des choses ci-dessus ne sont pas facilement observables ! Beaucoup de nos chiens « high drive » pourraient être décrits comme ayant une incapacité à se détendre... est-ce le résultat d'un manque d'entraînement à la relaxation, de leur tempérament génétique intégré, ou avons-nous créé cela avec un surentraînement ? La plupart des personnes qui pratiquent l'agility n'ont pas développé un œil pour détecter les différences subtiles de mouvement et de posture, ou être capables de dire si un muscle est tendu ou douloureux.\n\n## Qu'est-ce qu'une quantité appropriée d'agility ?\n\nChaque cas sera différent. Chaque chien aura besoin de choses différentes à la fois en ce qui concerne leur santé physique et leur santé émotionnelle. Pour vous aider à établir ce qui constitue une quantité appropriée d'agility et d'entraînement pour votre chien, vous devez utiliser votre propre jugement, mais aussi les conseils de professionnels de confiance tels qu'un physiothérapeute, un hydrothérapeute qualifié, un vétérinaire spécialisé dans le sport, l'orthopédie ou la réadaptation.\n\nJe ferai une mention spéciale des jeunes chiens ici, car je vois régulièrement de jeunes chiens d'agility être surentraînés. Il s'agit d'un problème sérieux, car même après la fermeture des plaques de croissance, le corps d'un jeune chien prend du temps pour mûrir physiquement : le tissu conjonctif s'étire pour s'adapter à la croissance, les muscles doivent se développer et la stabilité autour des articulations n'est vraiment pas développée tant que ces dernières ne se sont pas produites. Je ne suis pas fan de voir de jeunes chiens de 12 mois ou moins faire des zones, des slaloms et des séquences.\n\n## Quelles lignes de conduite avoir ? Quoi et combien devriez-vous faire ?\n\n– Les chiens ne devraient pas participer à tous les concours disponibles. 2 week-ends par mois c'est déjà beaucoup, encore moins 3 ou 4.\n– Les chiens doivent avoir au moins deux pauses d'agility par an. C'est 6 à 8 semaines sans agility. Pas d'ateliers, de séminaires, de concours, d'entraînement sur du matériel de quelque nature que ce soit.\n– Les chiens doivent être préparés pour s'assurer qu'ils sont suffisamment en forme pour faire de l'agility, et non faire de l'agility pour être en forme.\n– Les chiens ont besoin d'une pause physique après un concours. Pas d'entraînement le lendemain, rien ou juste une promenade.\n– Sur une semaine, un chien devrait faire des promenades de décompression, des exercices de fitness et de l'agility. Les séances d'entraînement d'agility et de préparation physique devraient avoir un jour après sans entraînement physique exigeant pour permettre aux muscles de récupérer.\n– Les bébés chiens d'agility (12 mois et moins) devraient faire des choses variées comme des tricks, des apprentissages utiles à la vie de tous les jours, des soins coopératifs, des bases de fitness et quelques compétences d'agility simples.\n– Les jeunes chiens d'agility (12 à 20 mois) devraient minimiser l'entraînement d'agility et ne pas s'entraîner tous les jours. Vous devriez faire autant de fitness, ou plus, que d'agility.\n– Votre chien a besoin de pauses physiques et mentales. Ce n'est pas correct de faire des entraînements ou des concours tous les week-ends, comme par exemple enchaîner un week-end d'agility, puis un stage d'agility, puis une compétition de nosework ou mantrailing, puis un autre stage d'agility. Il a besoin de week-ends de décompression ! L'épuisement physique et mental (burnout) est bien réel !!\n\n## Chiots (12 mois et moins)\n\nLes jeunes chiens ne doivent être entraînés que sur de courtes sessions, en évitant les entraînements très répétitifs et les mouvements à hauts impacts physiques. L'accent devrait être mis sur l'enseignement d'une variété de compétences, de mouvements et de mémoire musculaire pour des positions qui seront utiles plus tard dans la vie. Ils devraient avoir une introduction spécifique à l'équipement (vous pouvez enseigner les concepts !), mais insister sur le calme et le contrôle autour de l'équipement.\n\n## Jeunes chiens (12 à 18 mois)\n\nLes jeunes chiens commenceront l'entraînement sur du matériel, mais cela ne devrait représenter qu'une petite partie de leur semaine, avec des séances courtes et variées. Ils devraient également, comme les chiens adultes, faire des promenades, des activités de décompression et commencer la préparation physique avec des séances de fitness. On commence généralement les jeunes chiens avec des tunnels, puis un travail de saut autour des chandeliers, puis les bases des zones. On ne fait généralement pas de zones à hauteur max, ni de slalom, ni de séquence d'équipement avant au moins 16 mois. Ce sont les activités les plus exigeantes physiquement, qui contiennent le plus de risques de blessures.\n\n## Chiens adultes (à l'échelle d'une semaine)\n\nIl est important d'avoir des jours calmes après une activité physique intense, comme le lundi après un concours d'agility, ou après un entraînement d'agility. Cela permet une récupération musculaire. Votre semaine devrait également inclure des activités de décompression telles que des marches plus longues et de la préparation physique, comme des exercices de fitness. Pour cette raison, plus de 2 séances d'entraînement d'agility par semaine seraient considérées comme du surentraînement.\n\n## Chiens adultes (à l'échelle du mois)\n\n3 week-ends ou plus de compétition d'agility, ou de grandes quantités d'entraînement comme un séminaire ou un atelier, pourraient être considérés comme du surentraînement. Visez 2 week-ends spécifiques à l'agility, ou moins, par mois.\n\n## Chiens adultes (à l'échelle de l'année)\n\nLes chiens ont besoin de pauses, tout comme nous les humains. Sur une année, prévoyez au moins deux pauses substantielles pour votre chien. Celles-ci devraient durer de 4 à 8 semaines.\n\n## Conclusion\n\nJe vais répéter quelque chose que j'ai déjà dit : votre chien n'a qu'un nombre limité de sauts au cours de sa vie. Nous ne savons pas quel est ce chiffre.\n\nN'oubliez pas que votre coéquipier canin est aussi un membre de votre famille. Ils ont besoin de pauses, de week-ends canapé, de longues marches de décompression... d'autres choses dans leur vie que l'agility ! »",
    published_at: "2023-11-14",
  },
  {
    id: "2",
    slug: "la-perfection",
    title: "La perfection",
    excerpt:
      "Nos chiens ne sont pas des robots : pourquoi la recherche de perfection à tout prix fait plus de mal que de bien, et comment avancer avec bienveillance.",
    content:
      "## Introduction\n\nJ'avais déjà évoqué ce sujet, mais je voulais revenir dessus...\n\n🔵 Si je suis hyper exigeante sur la qualité des postures et mouvements en fitness (mes clients peuvent en témoigner 😅), je sais aussi m'adapter au binôme, au mental et au physique du chien, et aux compétences et connaissances de son humain. 🟡 Nos chiens ne sont pas des robots, ils sont vivants, et le mouvement c'est la vie !\n\n🔴 Merci les réseaux où l'on voit des vidéos de chiens parfaitement parfaits (que ce soit en fitness, soins coopératifs et même en agility) : elles mettent tellement la pression sur les gens, car ils n'arrivent pas à obtenir cette perfection. Et cette recherche de perfection entraîne souvent frustration, stress, puis abandon...\n\n✅ « Travailler » avec du vivant, cela veut dire s'adapter, changer de plan d'entraînement si besoin, changer les exercices si besoin, mais surtout être un peu plus indulgent envers soi-même et envers eux. Parce qu'ils le font pour nous, et que la pression de cette perfection n'amène que du stress !\n\n‼️ Ceci dit, il est important de ne pas faire n'importe quoi et se lancer sans un minimum de connaissances, parce que trop d'erreurs d'apprentissage ou d'exécution des exercices seront aussi délétères que cette recherche de perfection ‼️\n\n➡️ Illustration en vidéo d'une séance avec Croco, pas parfaitement parfaite, mais avec un p'tit chien concentré et vivant 🌀🌀.\n\nPas parfaite, entre autres, car :\n\n🔺 J'aimerais qu'il ne fasse pas une abduction des postérieurs quand je lui demande de les lever, mais plutôt une flexion.\n🔺 Car il lève trop son antérieur gauche et du coup ne répartit pas bien son poids du corps.\n\n✅ Mais on va travailler pour rectifier ces imperfections en préservant son mental, pour ne pas l'éteindre et garder sa joie de travailler 🥰\n\n## Conclusion\n\nFaites de votre mieux dans la bienveillance (envers vous-même et votre chien), et faites-vous aider si vous doutez !",
    published_at: "2024-03-02",
  },
  {
    id: "3",
    slug: "symetrie-chien",
    title: "Focus sur la symétrie",
    excerpt:
      "La nature n'aime pas la symétrie : pourquoi vouloir une symétrie parfaite chez son chien peut être contre-productif, et quand elle doit au contraire alerter.",
    content:
      "## Introduction\n\nLa nature n'aime pas la symétrie : ce sont nous, les humains, qui avons un penchant pour la symétrie, alors que pourtant la nature nous a faits dissymétriques... gaucher ou droitier...\n\n🐎 Dans le monde du cheval, cette notion de symétrie, de rectitude dans le travail, est très répandue et recherchée... pour avoir les meilleures notes possibles en concours... Mais aussi parce que notre esprit d'humain, enfermé dans une boîte, nous pousse à cela...\n\n🐕 Et pour nos chiens c'est pareil : vouloir pousser la symétrie à l'extrême pour de meilleurs résultats, ou tout simplement parce que nos convictions et nos habitudes nous poussent à cela, est pour moi contre-productif.\n\n## Conclusion\n\nSavoir travailler autour de cette dissymétrie naturelle, c'est respecter l'intégrité physique de nos chiens, c'est respecter leur unicité et leurs particularités.\n\n‼️ Ceci dit ‼️ la dissymétrie est aussi, et souvent, un signe de problème physique ou de pathologie sous-jacente : il est donc important d'en tenir compte et de prendre l'avis d'un professionnel de santé si une dissymétrie s'accentue ou apparaît.",
    published_at: "2024-07-19",
  },
  {
    id: "4",
    slug: "froid-et-sport",
    title: "Le froid et le sport",
    excerpt:
      "Le froid est aussi dangereux que la chaleur pour un chien sportif : échauffement, hydratation, coussinets... ce qu'il faut savoir pour s'entraîner en hiver en toute sécurité.",
    content:
      "## Introduction\n\nC'est l'hiver, et on ne pense pas souvent que le froid peut être tout aussi dangereux que le chaud quand nos chiens font du sport.\n\n## 1. Lutter contre le froid\n\n‼️ Pour lutter contre le froid, le système nerveux envoie des signaux au corps qu'il faut se réchauffer... on a alors une contraction des muscles et une vasoconstriction des vaisseaux sanguins, qui deviennent alors plus étroits et limitent la circulation sanguine ; le sang devient aussi plus visqueux... Tout cela résulte en un moins bon apport d'oxygène et de nutriments vers les tissus les plus superficiels (muscles, peau, tendons, ligaments), mais aussi une moins bonne évacuation des déchets. La transmission nerveuse devient aussi plus lente, les muscles se contractent alors moins vite. Tout cela entraîne un muscle qui fonctionne moins bien, et qui est donc plus à risque de blessure.\n\n## 2. Articulations et tendons\n\n‼️ Mais le froid a aussi un impact sur le liquide synovial des articulations et tendons... il devient plus visqueux, et son rôle de lubrifiant, d'absorbeur d'impacts et d'apport en nutriments est diminué... Tendons et articulations ne peuvent donc pas fonctionner au mieux, et le risque de blessures augmente.\n\n## 3. Hydratation et respiration\n\n‼️ L'air froid et sec fait consommer beaucoup d'eau à l'organisme pour réchauffer et hydrater l'appareil respiratoire ; de plus, par temps froid, un processus hormonal normal de notre organisme fait diminuer la sensation de soif. Or l'organisme est composé majoritairement d'eau, et les fluides corporels jouent un rôle de transport des éléments nutritifs essentiels à la production d'énergie et à l'élimination des déchets. De plus, le cœur doit battre plus vite pour contrer la déshydratation et maintenir une pression artérielle correcte. L'organisme fonctionne alors moins bien quand il est en manque d'eau.\n\n## Conclusion\n\n✅ Il est donc primordial, pour des entraînements par temps froid, de bien ÉCHAUFFER vos chiens par paliers progressifs, et de les couvrir entre les temps d'attente, au début (et pendant, pour des chiens sans trop de poils) de l'échauffement, et pendant la récupération.\n\nSi vous voulez en savoir plus sur l'échauffement et la récupération, j'ai un cours en ligne sur ce sujet.\n\n✅ Pensez à hydrater vos chiens régulièrement, en ajoutant quelque chose d'appétant à l'eau si besoin (personnellement j'utilise des boîtes de sardines au naturel), et vous pouvez ajouter des produits de réhydratation pour des efforts intenses.\n\n✅ Pensez à vérifier leurs coussinets régulièrement et à les hydrater si besoin avec un baume.\n\nNB : je ne suis pas partenaire des produits que je cite, je n'en tire aucun profit, je vous fais juste part de mon retour d'expérience.",
    published_at: "2024-12-05",
  },
  {
    id: "5",
    slug: "les-courbatures",
    title: "Les courbatures",
    excerpt:
      "Sport doit-il forcément rimer avec courbatures ? Ce qu'elles sont vraiment, si elles sont nécessaires, comment les éviter, et que faire quand elles apparaissent.",
    content:
      "## Introduction\n\nSport doit-il forcément rimer avec courbatures chez nos chiens sportifs... et nous-mêmes d'ailleurs ?\n\n## 1. Tout d'abord, que sont les courbatures ?\n\nElles sont un phénomène physiologique normal suite à une activité physique trop intense, qui crée alors des micro-lésions au niveau des fibres musculaires. Donc non, ce n'est pas l'acide lactique qui crée les courbatures... on devrait d'ailleurs plutôt dire le lactate... mais là n'est pas le sujet (peut-être en parlerai-je dans une autre publication).\n\n## 2. Sont-elles nécessaires ?\n\nJe vais vous donner une réponse de Normande : oui, ponctuellement, mais non en règle générale. Par exemple, lors de l'introduction d'un nouvel exercice physique, il y a de grandes chances que des courbatures apparaissent. Mais elles ne devraient pas faire partie du quotidien des entraînements, au risque de créer des déchirures ou ruptures. Car faire travailler un chien sur des courbatures, donc sur des lésions musculaires, fragilise encore plus ces lésions.\n\n## 3. Comment les éviter ?\n\nEn aménageant les entraînements avec des phases de repos, pour éviter la fatigue musculaire, et donc les lésions.\nEn préparant progressivement le chien à faire de nouveaux exercices physiques.\nEn hydratant correctement votre chien.\nAvec l'apport d'une bonne alimentation.\n\n## Conclusion\n\n🔹 Que faire en cas de courbatures ? 🔹\n\nDU REPOS !! Pour laisser le temps aux fibres lésées de se réparer.",
    published_at: "2025-05-22",
  },
  {
    id: "6",
    slug: "les-griffes",
    title: "Les griffes",
    excerpt:
      "« Pas de griffes, pas de chien » : pourquoi des griffes trop longues changent les aplombs, la posture et les performances de votre chien, et comment y remédier facilement.",
    content:
      "## Introduction\n\nDans le monde du cheval, on dit « pas de pieds, pas de cheval » ; dans le monde du chien, on devrait dire « pas de griffes, pas de chien »...\n\nLes griffes trop longues sont malheureusement souvent de la « maltraitance » par ignorance. 😢\n\nLes griffes trop longues changent les aplombs des chiens, c'est-à-dire modifient la structure du chien — et qui dit modification de structure, dit modification de fonction. On aura alors toute une série de compensations possibles qui vont se mettre en place, pouvant entraîner douleur, mal-être, baisse de performance pour les sportifs...\n\nEt pour le fitness, c'est une hérésie de vouloir faire des exercices et obtenir certaines postures avec des griffes trop longues...\n\n## Conclusion\n\nIl existe des tas de sites sur internet qui expliquent comment couper les griffes de vos chiens, et avec tous les nouveaux outils à disposition, il n'y a pas vraiment d'excuse pour ne pas commencer dès aujourd'hui ! À vos coupe-griffes, limes, grattoirs ! 💪💪\n\nJe ne pourrai pas tous les citer, mais il existe de bonnes sources d'information en ligne — n'hésitez pas à vous renseigner avant de vous lancer.",
    published_at: "2026-02-10",
  },
];

// Vue d'ensemble des prestations DOGFIT (issue de l'ancien site de Marie).
// "href" externe = lien direct, "href" interne commençant par "#" = ancre
// vers la section correspondante plus bas sur la page /cours.
export const dogfitPrestations = [
  {
    id: "classe-en-ligne",
    name: "Classe en ligne",
    description:
      "Retrouvez les formations en ligne de Marie sur la plateforme Canissimo, avec Yannick Toulon.",
    href: "https://www.canissimoenligne.fr/nos-formations/",
    hrefLabel: "Voir les formations",
    external: true,
  },
  {
    id: "presentiel",
    name: "Cours de fitness en présentiel",
    description:
      "Retrouvez Marie chez elle pour un bilan et un plan d'entraînement adapté à votre chien.",
    href: "#presentiel",
    hrefLabel: "Voir les informations",
  },
  {
    id: "coaching-en-ligne",
    name: "Coaching personnalisé en ligne",
    description:
      "Vous ne pouvez pas vous déplacer, ou préférez organiser vos séances selon votre emploi du temps ? Marie vous crée un suivi sur un groupe Facebook privé.",
    href: "#formules",
    hrefLabel: "Voir les formules",
  },
  {
    id: "technique-saut",
    name: "Technique de saut",
    description:
      "Fort de son expérience, Marie vous accompagne sur la technique de saut pour améliorer et optimiser en sécurité les sauts de votre chien.",
    href: "#technique-saut",
    hrefLabel: "Voir le programme",
  },
] as const;

// Contenu du stage "Technique de saut et fitness adapté aux sauts",
// destiné aux clubs/organisateurs qui accueillent Marie pour une journée
// ou demi-journée de stage.
export const dogfitJumpStage = {
  hooks: [
    "fait régulièrement tomber des barres ?",
    "hésite ou piétine devant les haies ?",
    "prend ses appels trop près ou trop loin de la haie ?",
    "a des difficultés à gérer ses foulées entre les haies ?",
    "manque de fluidité sur les enroulés ou les sauts à plat ?",
    "peine à ralentir ou à relancer efficacement sa course ?",
  ],
  programme: [
    "Analyse de la technique de saut de chaque chien",
    "Exercices progressifs pour améliorer la qualité du geste",
    "Travail de la coordination, de la gestion des foulées et du contrôle du corps",
    "Exercices de fitness spécifiquement adaptés aux exigences du saut",
  ],
  formules: [
    "Journée complète Technique de saut",
    "Journée complète Fitness adapté au saut",
    "Formule mixte : ½ journée Technique de saut, ½ journée Fitness adapté au saut",
  ],
  conditions: [
    "Seuls les chiens en bonne santé et aptes à la pratique d'une activité physique sont acceptés, quel que soit leur niveau",
    "Les chiots sont acceptés à partir de 8 mois (doit savoir aller chercher un jouet ou de la nourriture)",
    "Maximum 8 binômes par journée, ou 4 par demi-journée",
    "Auditeurs libres acceptés",
  ],
  infrastructures: [
    "Technique de saut : un terrain plat (herbe, synthétique ou sable) d'au moins 20 m × 20 m, et 3 haies d'agility",
    "Fitness adapté au saut : un espace abrité (barnum, salle, auvent...) d'environ 5 m × 5 m",
    "Marie apporte l'ensemble du matériel spécifique nécessaire au déroulement du stage",
  ],
  horaires: [
    "Arrivée : 8h30 pour sortir les chiens et prendre un café",
    "Début : 9h",
    "Pause déjeuner : 13h – 14h",
    "Fin : 18h",
  ],
  aPrevoir: [
    "Des friandises et/ou un jouet de motivation",
    "De quoi prendre des notes pour reproduire les exercices à la maison",
    "De l'eau pour le chien (et pour vous !)",
    "De quoi permettre au chien de patienter confortablement en voiture entre les passages",
  ],
} as const;

// Contenu réel (services et tarifs de coaching en ligne DOGFIT), fourni par
// Marie. Ne dépend pas de Supabase : ce sont des forfaits fixes, pas des
// cours individuels gérés depuis /admin.
export const dogfitFormulas = [
  {
    id: "fondations",
    name: "Fondations",
    tagline: "Pour chiens débutants, en construction",
    description:
      "Construire des bases solides : proprioception (conscience du corps et des pattes) et bases posturales (debout, assis, couché). Fortement recommandé avant d'envisager un programme de renforcement musculaire.",
    features: [
      "Questionnaire initial",
      "Exercices adaptés et évolutifs",
      "Corrections détaillées de vidéos",
    ],
    details: [
      "Cette formule est adaptée pour les jeunes chiens ou les chiens débutants en fitness canin. Elle permet de développer la proprioception, c'est-à-dire la conscience du corps et des pattes, mais aussi de poser les bases du travail de postures (debout, assis, couché).",
      "Ces fondations sont indispensables pour pouvoir ensuite passer sur une formule de préparation physique — elle est donc fortement recommandée avant d'envisager un programme de renforcement musculaire.",
      "Un questionnaire vous sera envoyé afin de connaître ce que votre chien sait déjà faire, mais aussi vos attentes ou un objectif particulier s'il y en a (travail spécifique pour les zones d'agility, les postures en obé, etc.).",
      "Pour commencer le suivi, vous trouverez dans le groupe Facebook, dans l'onglet « guide » : un guide avec les informations générales pour organiser vos séances, un guide avec une série d'exercices en vidéo démo, et un guide par semaine de suivi pour publier vos vidéos. Des exercices sont ajoutés au fur et à mesure de votre évolution.",
    ],
  },
  {
    id: "fitness",
    name: "Fitness",
    tagline: "Renforcement musculaire, objectifs sportifs spécifiques",
    description:
      "Approche technique et ciblée pour améliorer un objectif précis (vitesse, sauts, souplesse, mobilité...) ou le bien-être général, à partir d'un bilan postural et locomoteur complet et de votre historique.",
    features: [
      "Évaluation posturale + questionnaire initial",
      "Programme personnalisé envoyé en PDF",
      "Corrections détaillées de vidéos",
    ],
    details: [
      "Cette formule est adaptée pour les chiens ayant besoin d'un renforcement musculaire global, ou pour ceux qui ont un objectif précis (amélioration de la vitesse, des sauts, de la souplesse, de la mobilité...).",
      "Chaque accompagnement débute par un bilan initial permettant d'évaluer la posture et les appuis du chien, sa locomotion, ses capacités physiques actuelles, son historique (blessure, douleur, sport, reprise d'activité...) ainsi que vos objectifs. Un questionnaire vous sera envoyé avec toutes les infos pour réaliser les vidéos nécessaires à cette évaluation.",
      "Avant de débuter un programme de fitness, il est fortement recommandé que votre chien ait bénéficié récemment d'un suivi ostéopathique, idéalement dans le mois précédant le début du programme — cela permet de prendre en compte d'éventuelles restrictions ou déséquilibres locomoteurs avant d'augmenter les contraintes liées à l'entraînement.",
      "Avec toutes ces informations, Marie crée votre programme de travail, envoyé au format PDF. Il contient la conclusion de l'analyse posturale et dynamique, un planning hebdomadaire, des informations générales à connaître, les exercices répartis en circuits, et le nombre de répétitions ou la durée recommandée pour chacun. Dans le groupe Facebook de suivi, vous trouverez aussi les vidéos démo des exercices et un guide par semaine pour publier vos vidéos.",
    ],
  },
] as const;

export const dogfitVideoAnalysis = [
  "Pour les deux niveaux, vous pouvez condenser la durée totale autorisée par semaine en une seule vidéo, ou la répartir sur plusieurs vidéos.",
  "Si vous n'utilisez pas la totalité de la durée d'une semaine, il n'est pas possible de la reporter sur une autre semaine.",
  "Les corrections écrites de Marie peuvent être accompagnées de schémas explicatifs, de vidéos démo supplémentaires, et/ou d'un changement de plan d'entraînement pour vous faire progresser au mieux.",
  "Conseil : réalisez un montage de vos séances pour couper les temps morts — il existe de nombreuses applications gratuites de montage vidéo sur téléphone.",
] as const;

export const dogfitFollowUpLevels = [
  {
    id: "light",
    name: "Suivi Light",
    description: "Envoi de 8 min de vidéo par semaine pour correction.",
  },
  {
    id: "intensif",
    name: "Suivi Intensif",
    description: "Envoi de 12 min de vidéo par semaine pour correction.",
  },
  {
    id: "solo",
    name: "Suivi Solo",
    description:
      "Pas de correction vidéo : envoi du programme et des vidéos démo uniquement. Réservé à la formule Fitness, possible après 3 mois de suivi.",
  },
] as const;

// Prix en euros, TTC, pour un forfait d'un mois. "Renouvellement" ne
// s'applique que si le suivi précédent s'est terminé il y a moins d'un mois.
export const dogfitPricing = [
  { level: "Light — 1er mois", fondations: 75, fitness: 110 },
  { level: "Light — Renouvellement", fondations: 60, fitness: 85 },
  { level: "Intensif — 1er mois", fondations: 100, fitness: 145 },
  { level: "Intensif — Renouvellement", fondations: 85, fitness: 120 },
  { level: "Solo", fondations: null, fitness: 65 },
] as const;

export const dogfitFollowUpDetails = [
  "Le suivi en ligne se fait via un groupe Facebook privé et secret, uniquement entre vous et Marie.",
  "Réponses sous 24 à 48h. En cas d'absence de plus de 72h (raisons professionnelles ou autres), le suivi est prolongé d'autant de temps.",
  "En cas de blessure du chien, le suivi est prolongé d'autant.",
  "Le mois de suivi débute à la date d'envoi du programme (formule Fitness), ou des premiers exercices publiés (formule Fondations).",
  "Marie se réserve le droit de refuser un suivi si elle juge le chien inapte.",
] as const;

export const dogfitContact = {
  name: "Marie Démaris — DOGFIT",
  siret: "830 970 638 00011",
  email: "dogfit.md@gmail.com",
  phone: "06 59 49 28 24",
} as const;

// Pas d'événements d'exemple : à ajouter directement via /admin/evenements
// quand Marie a de vrais ateliers/stages à annoncer.
export const placeholderEvents: {
  id: string;
  title: string;
  location: string;
  starts_at: string;
  is_past: boolean;
  description: string;
}[] = [];
