-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : jeu. 19 déc. 2024 à 13:03
-- Version du serveur : 5.7.39
-- Version de PHP : 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ift`
--

-- --------------------------------------------------------

--
-- Structure de la table `Admin`
--

CREATE TABLE `Admin` (
  `id` int(11) NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `Admin`
--

INSERT INTO `Admin` (`id`, `email`, `password`) VALUES
(1, 'bonjour@gmail.fr', '$2b$10$fQf94wM2vEcSg4POblZhfu.9.VhSKVdXOEiljFFHD9tUUP86Koeui');

-- --------------------------------------------------------

--
-- Structure de la table `Creator`
--

CREATE TABLE `Creator` (
  `id` int(11) NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `linkedin` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `Creator`
--

INSERT INTO `Creator` (`id`, `email`, `linkedin`, `image`, `name`) VALUES
(22, 'madalina.nicolae@edu.devinci.fr', '', 'uploads/images/1734604109129-madalina.jpg', 'Madalina NICOLAE'),
(23, 'Zacharie.guillaume@edu.devinci.fr', '', 'uploads/images/1734604139666-zacharie.png', 'Zacharie GUILLAUME'),
(24, 'Valentin.MARTINEZ-MISSIZ@edu.devinci.fr', '', 'uploads/images/1734604169430-valentin.jpg', 'Valentin MARTINEZ-MISSIZ'),
(25, 'Tristan.JOURNEL@edu.devinci.fr', '', 'uploads/images/1734604500895-tristan.jpeg', 'Tristan JOURNEL'),
(26, 'Clement.DUHART@edu.devinci.fr', '', 'uploads/images/1734604523199-clement.jpg', 'Clement DUHART'),
(27, 'Marc.TEYSSIER@edu.devinci.fr', '', 'uploads/images/1734605654199-marc.jpg', 'Marc TEYSSIER');

-- --------------------------------------------------------

--
-- Structure de la table `Etiquette`
--

CREATE TABLE `Etiquette` (
  `id` int(11) NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `creatorId` int(11) NOT NULL,
  `background` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bannerImage` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `descriptionContainer1` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `descriptionContainer2` text COLLATE utf8mb4_unicode_ci,
  `descriptionContainer3` text COLLATE utf8mb4_unicode_ci,
  `descriptionContainer4` text COLLATE utf8mb4_unicode_ci,
  `descriptionProject` text COLLATE utf8mb4_unicode_ci,
  `imageContainer2` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `imageContainer3` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `imageContainer4` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quoteBanner` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `titleContainer1` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `titleContainer2` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `titleContainer3` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `titleContainer4` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `titleProject` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `Etiquette`
--

INSERT INTO `Etiquette` (`id`, `slug`, `creatorId`, `background`, `bannerImage`, `descriptionContainer1`, `descriptionContainer2`, `descriptionContainer3`, `descriptionContainer4`, `descriptionProject`, `imageContainer2`, `imageContainer3`, `imageContainer4`, `logo`, `quoteBanner`, `titleContainer1`, `titleContainer2`, `titleContainer3`, `titleContainer4`, `titleProject`) VALUES
(40, 'exit-panel-algae-incubator', 12, 'uploads/images/1734379148706-ywrasqu38m9z5dvxmx7izjg5xt5u9e.jpg', 'uploads/images/1734379148723-iisr0c4p7nrtgtu0y71xuruy2xzlhk.jpg', 'The developed project involves integrating an algae incubator into an emergency exit sign, a commonplace item. This initiative carries ecological implications, such as mitigating the carbon footprint in the implementation area through algae\'s CO2 absorption, repurposing neglected everyday items, and fostering ecological awareness among those encountering this object in their daily routines. Additionally, the project holds aesthetic and functional significance by discreetly incorporating algae into a common object, reducing intrusiveness in the urban environment, and enhancing the appeal and harmony of everyday objects with their surroundings. An algae incubator is defined as a device creating optimal conditions for algae growth and development, encompassing components like nutrients, a lighting system, temperature regulation, and other environmental factors to facilitate photosynthesis and algae multiplication. Algae, as photosynthetic organisms, serve various purposes, including biomass production, CO2 capture, oxygen generation, and other potential applications. In ongoing initiatives, LIQUID3 stands out as an urban photo-bioreactor harnessing microalgae\'s power to efficiently eliminate CO2 while producing O2 and biomass [^1]. Additionally, efforts involve the development of a sealed panel to prevent contaminations/evaporations and enhance biomass concentration, as detailed in the study by Bajwa and Bishnoi in 2021 [^2]. Inspired by the idea of giving new life to overlooked everyday objects, the project transforms discarded signs into innovative algae cultivation systems.', 'Materials The project utilizes a diverse array of objects and tools to create an efficient algae cultivation system. The materials used in the incubator can be divided into two main categories : Structural Materials Acrylic glass Glue Silicon Nuts Functional Materials Led strip Air pump Arduino uno Wires 220V-5V power adaptater Power strip', 'The emergency exit sign is made of 5mm thick acrylic and was cut using a laser cutting machine. The Fig. 2 is a cross-section of the incubator with dimensions. We made a plexiglass box with an initial internal volume 𝑉 = 𝐿𝑥𝑙𝑥 ℎ = 240 𝑥 110 𝑥 10 mm = 264,000 mm3 = 264 ml. The man, arrow, and door were glued inside this box. The water and algae therefore circulate around these shapes. The box was then closed with a cover also made of acrylic, machined with several holes to attach the incubator to the ceiling, insert the air pump pipe, and allow air to escape, as can be seen in Fig. 3. Once the incubator was closed, silicone was added to ensure the system\'s watertightness. We then added a LED strip to allow the algae to grow. This RGB addressable LED strip is controlled by an Arduino board. The transparent acrylic case of the incubator allows light to reach the algae. Finally, an air pump is integrated into the system and the air is directly sent into the incubator through a pipe. This also creates a current in the incubator, which is favorable to algae growth.', 'The overall design of the incubator is aesthetically pleasing and attention-grabbing, raising awareness of both algae cultivation and the potential for sustainable innovation. However, there are still some areas where the project could be improved. Four potential improvements are discussed below Light diffuser : A light diffuser would help to distribute light more evenly throughout the incubator, which would be beneficial for algae growth. Temperature control : A temperature sensor and heater would help to maintain the water temperature in an optimal range for algae growth. Nutrient level control : A nutrient sensor would help to ensure that the algae have the nutrients they need to grow. Harvesting mechanism : A harvesting mechanism would make it easier to collect the algae once the incubator is full. These improvements would make the algae incubator project more efficient, more user-friendly and guarantee optimal algae growth.', 'An algae incubator is a controlled environment that provides the optimal conditions for algae growth, including temperature, light, and nutrient supply. Algae are unicellular aquatic organisms that can grow rapidly and are relatively easy to cultivate. They have the potential to be used for a variety of purposes, including food, feed, biofuel, and bioplastics. Our project integrates an algae incubator into an emergency exit sign, transforming an often overlooked object into a sustainable and multifunctional element. By combining an emergency exit sign with an algae incubator, we demonstrate a novel approach to enhancing the functionality and sustainability of everyday objects. The algae can be harvested for various applications, while the sign serves its primary purpose as a visual aid in emergency situations. The overall design is visually appealing and attention-grabbing, raising awareness of both algae cultivation and the potential for sustainable innovation.', 'uploads/images/1734379148721-xxm6o2upfreacw5jqtsmb0v006s367.png', 'uploads/images/1734379148715-nkfd92iz1a85n6uwcwfmun0zoc57or.jpg', 'uploads/images/1734379148718-hr2d4n9clms1jwmq7me0gr6cqiw147.png', 'uploads/images/1734379148704-oru38c7nd534b072x1gk4pqaib8gb3.png', '\"Reconnect with food production through indoor , modulable , adjustable, educational aquaponic production', 'CONTEXT', 'SYSTEM OPERATION', 'Manufacturing', 'DISCUSSIONS', 'Exit Panel Algae Incubator'),
(41, 'the-rise-of-organic-soft-robotics', 22, 'uploads/images/1734604371061-soft robotics logo.jpeg', NULL, 'The Rise of Organic Soft Robotics : Strategies for Fabrication Madalina Nicolae, Zacharie Guillaume, Valentin Martinez Missir, Théo Rossignol, and Marc Teyssier. 2022 Workshop paper proposed for Actuated Materials and Soft Robotics Strategies for Human-Computer Interaction Design. In CHI Conference on Human Factors in Computing Systems Extended Abstracts (CHI ’22 Extended Abstracts), April 29-May 5, 2022, New Orleans, LA, USA. ACM, New York, NY, USA, 7 pages. https://doi.org/10.1145/3491101.3503711 [PDF]', NULL, 'Soft Robotics rapidly emerged as an area of interest in Human-Computer Interaction (HCI). Simple DIY fabrication processes and platforms were re-adapted from traditional digital fabrication tools, resulting in making soft materials-based prototyping accessible to the design and maker community. There is a growing interest in the use of bio-based and bio-degradable materials in design and prototyping, creating discussions around sustainable design practices as new motor of interdisciplinary exchange.', NULL, 'Strategies for Fabrication of soft actuators with Bioplastics\r\n', NULL, 'uploads/images/1734604371062-index_header.webp', NULL, 'uploads/images/1734604371061-soft robotics logo.jpeg', NULL, 'FABRICATION', NULL, 'MANUFACTURING', NULL, 'The Rise of Organic Soft Robotics'),
(42, 'food-computer', 25, 'uploads/images/1734605405258-backgroundFood.jpg', 'uploads/images/1734605405260-backgroundFood.jpg', 'Population growth, urbanization, water supply, and climate change are all factors reducing the world\'s supply of arable land. This raises the question of sustainability and feeding the population. Will we provide an ever-growing population that will reach approximately 9.7 billion inhabitants in 2050?\r\n\r\nThe human diet has evolved over the centuries and is now composed of an extensive range of ingredients worldwide. It is no longer limited to seasonal or local products. French people consume 2.4 kg of food every day, two-thirds are plant-based, and the share of imported fruit and vegetables exceeds 40% [^1]. This consumption requires a lot of transport and has a high energy cost. The challenge of CF is to allow the user to grow all the fruits and vegetables of his choice locally in an environment that reproduces the ideal conditions for their growth.\r\n\r\nThe Food Computer (FC) democratizes indoor cultivation and reduces carbon footprint. It responds to the growing need for new cultivable areas. Indeed, we want people to cultivate everywhere, especially in big cities. Whether in an apartment or in the office, where it\'s possible to grow your own fresh produce. It brings greenery and clean air and reduces the transportation of food products.\r\n\r\n', 'This scheme is the functional diagram of the Food Computer. It illustrates how the FC. The different interactions between the environment, the computer and database.\r\n\r\n', 'The implementation of CEA systems [^1][^2] can significantly improve productivity and proves to be an effective solution against the decrease of agricultural land with vertical farming. Methods like vertical agriculture or hydroponics exist and constitute an alternative to traditional agriculture that gradually shows its limits.\r\n\r\nThe Food Computer is a controlled environment where the temperature, humidity, luminosity, and air composition are predetermined and optimized to get the best products. The data are collected thanks to a multi-sensor during the project\'s development and analyzed to determine the best parameters to grow the plants. It allows the user to grow the farm products he needs to be adapted to his food habits without buying imported products.\r\n\r\n', 'The technical setup is composed of all the components of the FC: the structure, the multi-sensor, a water mister, gas bottle (CO2, O2, N2), heater system, and a display screen.\r\n\r\nThe food computer consists of two interlocking parts. The lower part is a box where the plants and soil are placed. The upper part is a hermetic Plexiglas; it avoids contact with the outside and keeps its own humidity and temperature. The different gas mixtures and the cables used for the sensors and the LEDs pass through holes in the box. They are fixed on a wooden structure inside the FC to avoid hanging and oxidation.\r\n\r\n', 'Controlled Environments Agriculture\r\n', 'uploads/images/1734605405259-diagram.jpg', 'uploads/images/1734605405258-foodImage1.jpg', 'uploads/images/1734605405259-image.jpg', 'uploads/images/1734605405258-food logo.jpg', '\"Carbon emission is a significant cause of pollution. Each person emits carbon to move, to heat, to eat. Each individual can reduce his food-related carbon footprint  \"', 'Introduction', 'Functional diagram', 'Food Computer', 'Solution and evaluation', 'Food Computer'),
(43, 'haptic-kit-prosthesis', 25, 'uploads/images/1734605972250-backgroundHand.jpeg', NULL, 'According to the World Report on Disability published by the OMS, more than 1 billion people live with a disability, and nearly 200 million have severe functional difficulties. There are 37,400 amputees out of 6 billion inhabitants, and we place 14 000 prostheses yearly. Today, prostheses vary from 3,900 euros for a simple joint to 11,000 euros for a myoelectric one [^1]; not everyone can afford this type of prosthesis. The field of prostheses is vast and diversified, with mechanical, myoelectric, hydraulic, or aesthetic prostheses[^2][^3][^4]. The prostheses integrating a control system by nerve connection or tactile perception are complex and expensive. The solution is an inexpensive kit for forearm amputees, allowing them to feel shapes and textures or fingertip pressure using haptics. Haptics is a scientific field that focuses on the sense of touch. It can be divided into two primary areas: kinesthetic haptics and vibrotactile haptics. Haptics transmits different sensations through various methods, such as vibrations, pressure changes, or other physical sensations[^5][^6][^7][^8][^9][^10][^11][^12]. Due to its relatively recent emergence, this field offers a broad range of possibilities for improvement, in medical innovation. And more particularly the field of prostheses. Allowing to link these two fields.\r\n\r\n', 'Microcontrollers are used to facilitate data processing and communications in electronic devices. They can be programmed to perform tasks such as data collection, analog-to-digital conversion, and transmission. They receive the analog values from the different sensors as input and transmit these data to the haptic controller. It is possible to use an Arduino or a Teensy.\r\n\r\nThe DRV2605 is an advanced haptic motor controller that enables the creation of rich and personalized tactile feedback experiences in electronic devices, enhancing the user experience and functionality of electronic products. Using different functions, it can transform analog values into vibrations. It is also possible to convert audio into vibration. It allows controlling other vibrating motors.', 'This project aims to create a haptic kit for prostheses, enabling amputees to experience a range of sensations, including the force exerted by their fingertips and the texture and relief of different surfaces and materials. The components used in this kit have been designed to be straightforward and user-friendly to make it accessible and affordable for as many people as possible.', NULL, 'Affordable and accessible kit\r\n', 'uploads/images/1734605972269-components.jpg', 'uploads/images/1734605972265-imageHand.jpeg', NULL, 'uploads/images/1734605972250-logoHand.jpg', NULL, 'Introduction', 'Components', 'Solution', NULL, 'Haptic Kit Prosthesis'),
(44, 'bacterial-cellulose-coated-scaffold', 22, 'uploads/images/1734611593548-backgroundBacterial.jpeg', NULL, 'In France, healthcare budgets will be worth over €235.8 billion by 2022, or 8.9% of GDP [^1]. The medical sector is an expensive industry, facing ever-increasing costs. There is therefore a constant search for innovative solutions to optimize patient care and well-being. On the patient side, personalized treatment is a topic for the future and is projected to grow at a compound annual growth rate (CAGR) of 7.20% from 2023 to 2030 [^2]. Personal biofabrication is therefore proving to be a promising field for the development of innovative medical technologies.\r\n\r\n', 'Biomaterials are natural products that are synthesised and catabolised by different organisms and that have found broad biotechnological applications.\r\n\r\nBiomaterials include biopolymers, large natural molecules of which bacterial cellulose (BC) is one. Bacterial cellulose is produced by certain bacteria. This material is characterized by its purity, mechanical strength and flexibility, making it ideal for a variety of applications, from the medical and cosmetics fields to innovative product design and sustainable fashion [^8]. In the medical sector, BC is used in biomedical fields such as tissue engineering and drug delivery. But also for medical devices such as dental implants, artificial blood vessels, artificial cornea, as it has key characteristics such as non-toxicity, the ability to maintain moist, etc [^9].', 'The medical sector offers a wealth of innovative possibilities for personal manufacturing. The idea is to make these innovations accessible to every scientist or person connected with the medical field who wishes to explore cutting-edge technologies in a DIY way. What\'s more, in recent years, a number of materials have emerged that have mechanical qualities similar to those of commonly used materials, but are biosourced and biodegradable. The biomaterials market is worth around a hundred billion dollars, and is expected to grow by 17% per year between 2023 and 2030 [^3]. So it\'s worth exploring theses, because innovation also lies in the choice of materials. The aim is therefore to work on devices that have sustainability advantages, but which also explore cutting-edge topics that are early stage and offer vast possibilities for innovation. Rising healthcare costs and the need for more personalized medicine have thus led to the emergence of this project. It is part of this trend, exploring the use of bacterial cellulose, a sustainable and innovative material, as a coating on 3D-printed resin scaffolds. This project is also investigating the effect of cellulose colonization of a complex 3D structure, whose 3D growth characteristics have yet to be truly qualified. This innovation is intended to be used in medical applications for bone regeneration over time.\r\n\r\n', NULL, 'Exploring innovative materials for personal biofabrication in the medical sector\r\n', 'uploads/images/1734611593557-image2.png', 'uploads/images/1734611593549-imageBacterial.jpg', NULL, 'uploads/images/1734611593537-logoBacterial.png', NULL, 'Context', 'Innovative Materials: Bacterial Cellulose', 'Motivation', NULL, 'Bacterial cellulose-coated scaffold'),
(45, 'biocomposite-longboards', 22, 'uploads/images/1734613116362-background.jpg', 'uploads/images/1734613116369-background copie.jpg', 'Carbon and glass are used as main or reinforcement materials in applications where a lot of resistance to stress is needed, especially in the board-sport industry where it gives great mechanical properties to various kinds of boards. Carbon fiber is lighter and stiffer than glass fiber whereas glass fiber has elastic properties when deformed under stress. In the boardsport industry, these fibers are used in addition to core materials and resin to make strong and resilient composite boards. Fibers are used as a way to control a board\'s flexibility and resistance to daily use. However, there are many environmental drawbacks to using petroleum-fiber composites as they are not recyclable, and their fabrication request a lot of energy. Indeed, their high carbon footprint questions their promise to be tomorrow\'s material for reinforcements and opens a new direction of research toward finding environmentally friendly alternatives for these materials. Natural fibers like flax fiber also have excellent mechanical properties. Their affordable price and low carbon footprint highlight them as a competitive alternative to petroleum-based fibers [^1][^2]. The purpose of this innovation project is to test the applicability of replacing petroleum-based fibers with natural fibers in the making of boards for riding sports.\r\n\r\n', 'Riding sports communities are close to the environment because their sports often involve natural phenomena. Indeed, a lot of brands with a riding identity communicate about their ways to respect the environment. For example, in the ski industry, a lot of efforts were made concerning carbon footprint as brands tend to produce with the local primary matter. Moreover, this trend moves board sports companies toward bio-sourced and eco-friendly materials, leading some brands to sometimes use natural fibers instead of petroleum fiber in the making of boards. For example, Airush Kiteboarding designed and produced the Apex Eco, a kitesurf board using basalt fiber as a reinforcement [^3]. Overall, the use of flax and basalt fibers in the making of boards is still a relatively new field of research, and there is a need for more extensive testing to fully understand their potential and limitations. However, the results so far are promising, and these materials could play a significant role in the development of more sustainable boardsport products in the future.\r\n\r\n', 'After doing research, the flax and basalt fibers were selected as the most promising natural fibers to study. First, a carbon-based composite longboard prototype was created to practice the fabrication methods and also have a base model to work on. Lots of test samples were also fabricated following the same processes. These samples were used during flexion tests to determine their constraints curves and find estimations of their young modulus. Finally, the young modulus are implemented on a 3D model on Abaqus, allowing us to simulate resistance tests to optimize the shapes of our prototypes.', NULL, 'The search for a sustainable board construction\r\n', 'uploads/images/1734613116368-8ofz235mrprp3n487capbjcmzhkph6.png', NULL, NULL, 'uploads/images/1734613116349-logo.png', 'During the first weeks of the project, it is important to set up all the experience and process parameters and to manipulate the materials.', 'Introduction', 'State of the art', 'Overview', NULL, 'Biocomposite Longboards');

-- --------------------------------------------------------

--
-- Structure de la table `EtiquetteInnovation`
--

CREATE TABLE `EtiquetteInnovation` (
  `etiquetteId` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `EtiquetteInnovation`
--

INSERT INTO `EtiquetteInnovation` (`etiquetteId`, `categoryId`) VALUES
(44, 4),
(40, 6),
(41, 6),
(42, 6),
(43, 6),
(45, 6);

-- --------------------------------------------------------

--
-- Structure de la table `EtiquetteTag`
--

CREATE TABLE `EtiquetteTag` (
  `etiquetteId` int(11) NOT NULL,
  `tagId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `EtiquetteTag`
--

INSERT INTO `EtiquetteTag` (`etiquetteId`, `tagId`) VALUES
(41, 3),
(44, 3),
(41, 4),
(44, 4),
(42, 5),
(43, 5),
(44, 5),
(42, 6),
(43, 6),
(45, 6),
(45, 8);

-- --------------------------------------------------------

--
-- Structure de la table `Innovation`
--

CREATE TABLE `Innovation` (
  `id` int(11) NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `Innovation`
--

INSERT INTO `Innovation` (`id`, `name`, `description`, `image`) VALUES
(4, 'Artificial Lives', 'Exploring new opportunities in Human-Computer Interaction, Swarm Cobotic and AI-base Extended Intelligence, Cross Reality, Wearable and Internet of Things.', 'uploads/images/al.png'),
(5, 'Human Learning', 'Developing Sustainable and Resilient Technologies, embracing long term perspectives of Climate Change. Exploring both Alternative Materials, and Low Tech Methodologies.', 'uploads/images/rf.png'),
(6, 'Resilient Futures', 'Creating Tools that empower the lifelong constructor of Knowledge and Know-How, engaging drivers Learners through Embodied and Multimodal Experiences.', 'uploads/images/hl.png');

-- --------------------------------------------------------

--
-- Structure de la table `Mail`
--

CREATE TABLE `Mail` (
  `id` int(11) NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `type` enum('entreprise','particulier') COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `Mail`
--

INSERT INTO `Mail` (`id`, `email`, `createdAt`, `type`) VALUES
(11, 'nicolassung01@gmail.com', '2024-12-18 13:01:22.562', 'particulier');

-- --------------------------------------------------------

--
-- Structure de la table `Tag`
--

CREATE TABLE `Tag` (
  `id` int(11) NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `Tag`
--

INSERT INTO `Tag` (`id`, `slug`, `name`, `description`) VALUES
(3, 'research', 'research', 'research'),
(4, 'soft-robotics', 'soft-robotics', 'soft-robotics\n'),
(5, 'createch', 'createch', 'createch'),
(6, 'project', 'project', 'project'),
(7, '2024', '2024', '2024'),
(8, '2023', '2023', '2023');

-- --------------------------------------------------------

--
-- Structure de la table `_EtiquetteCreators`
--

CREATE TABLE `_EtiquetteCreators` (
  `A` int(11) NOT NULL,
  `B` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `_EtiquetteCreators`
--

INSERT INTO `_EtiquetteCreators` (`A`, `B`) VALUES
(22, 41),
(23, 41),
(24, 41),
(23, 42),
(25, 42),
(26, 42),
(22, 43),
(25, 43),
(27, 43),
(22, 44),
(25, 44),
(27, 44),
(22, 45),
(26, 45),
(27, 45);

-- --------------------------------------------------------

--
-- Structure de la table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('3bb86362-aced-44f4-9cf1-d81b7980979c', 'b681fa90d58fb49afc77bc714f3a4101a0be9b0756526a6fb6275dc5922bf4a7', '2024-12-13 00:52:55.298', '20241116211243_add_creator_id_to_etiquette', NULL, NULL, '2024-12-13 00:52:55.251', 1),
('3bf1a7b8-fc95-43f5-8c59-42ec319f84f8', '18b0a694f29c118a6cd082fc5c7834f2d52bce1f850f54cf819a7dd357ba3172', '2024-12-13 00:52:55.145', '20241031112727_init', NULL, NULL, '2024-12-13 00:52:55.122', 1),
('40b8b3bf-932a-4afb-a260-e29f6bd34d54', 'e8a1bc8a6576e42e5bfeaa270705c8bf715fe088f2a7fc7710ab81509f18bf7e', '2024-12-13 00:52:55.422', '20241129113132_add_required_columns_to_etiquette', NULL, NULL, '2024-12-13 00:52:55.376', 1),
('6c53e0fb-c1c3-4429-856d-6a8a1bce7b77', '7ff5884372506b0ac2f69a50416272e5219f1728967852a1786efdd0585f334e', '2024-12-13 00:52:55.376', '20241119084721_update_mail', NULL, NULL, '2024-12-13 00:52:55.362', 1),
('6c670325-da2e-491b-b0e7-39af76519717', '7b4db1d22b004492540171aef8fba8171c1d62fb6958ca3231674c0cf6c20edb', '2024-12-13 00:52:55.205', '20241113214446_add_mail_model', NULL, NULL, '2024-12-13 00:52:55.198', 1),
('70b637aa-459a-4714-8f20-c8da5b39c0d4', 'c64118517a28fa28da648040c1b9b9f633f1f5a17c899a4de798a15b9f283ca1', '2024-12-13 00:52:55.334', '20241116213344_add_etiq_tag_creator_relations', NULL, NULL, '2024-12-13 00:52:55.298', 1),
('7897531a-af45-4213-ab14-e47e89d580ce', '97f6bb69fac2da3597e8b1aecf651d2d0e6463c4dae9a430c52c334535eee56d', '2024-12-16 19:47:58.385', '20241216194758_text', NULL, NULL, '2024-12-16 19:47:58.369', 1),
('85f259e3-ab1f-47dd-a22f-3b003649c2f4', 'b85023a560591cf05cd2c205332c9f4adbb083d8e795694a05e2684b97dacb49', '2024-12-13 00:52:55.198', '20241107105943_init', NULL, NULL, '2024-12-13 00:52:55.177', 1),
('af5f5d70-0fcc-4c42-b199-8ffff68978a6', '91e850e94cfb7014f24dfbe4b944c0b0e6fcaaab059577bb5fb5ef19d17207d6', '2024-12-16 15:25:59.721', '20241216152559_long_text', NULL, NULL, '2024-12-16 15:25:59.679', 1),
('b5a2b6ab-4bc8-413a-ac06-163e917ec4d7', '65f9f96eee712be351c0a6806091ae2db832fc7d650af9083b911bba67fbad72', '2024-12-13 00:52:55.362', '20241117110600_update_relation_creator', NULL, NULL, '2024-12-13 00:52:55.334', 1),
('c77383cb-0eb2-41d0-bb6d-7112ae6b0fd1', 'cf7ade1519df28ff8457c379f7c614cc2f7ad39d8b3f21e1236a4fda4088c9b9', '2024-12-13 00:52:55.250', '20241114082816_update_creator', NULL, NULL, '2024-12-13 00:52:55.205', 1),
('fc1c7375-8afc-453b-bd46-e6c70094d9ef', 'fcc93b610a297d9de604031236c4c1e18f40733bb0b1e40dc3825af7f6ab2c14', '2024-12-13 00:52:55.176', '20241107102719_init', NULL, NULL, '2024-12-13 00:52:55.146', 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Admin`
--
ALTER TABLE `Admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Admin_email_key` (`email`);

--
-- Index pour la table `Creator`
--
ALTER TABLE `Creator`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Creator_email_key` (`email`),
  ADD UNIQUE KEY `Creator_name_key` (`name`);

--
-- Index pour la table `Etiquette`
--
ALTER TABLE `Etiquette`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Etiquette_slug_key` (`slug`),
  ADD UNIQUE KEY `Etiquette_titleProject_key` (`titleProject`);

--
-- Index pour la table `EtiquetteInnovation`
--
ALTER TABLE `EtiquetteInnovation`
  ADD PRIMARY KEY (`etiquetteId`,`categoryId`),
  ADD KEY `EtiquetteInnovation_categoryId_fkey` (`categoryId`);

--
-- Index pour la table `EtiquetteTag`
--
ALTER TABLE `EtiquetteTag`
  ADD PRIMARY KEY (`etiquetteId`,`tagId`),
  ADD KEY `EtiquetteTag_tagId_fkey` (`tagId`);

--
-- Index pour la table `Innovation`
--
ALTER TABLE `Innovation`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Innovation_name_key` (`name`);

--
-- Index pour la table `Mail`
--
ALTER TABLE `Mail`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Mail_email_key` (`email`);

--
-- Index pour la table `Tag`
--
ALTER TABLE `Tag`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Tag_slug_key` (`slug`),
  ADD UNIQUE KEY `Tag_name_key` (`name`);

--
-- Index pour la table `_EtiquetteCreators`
--
ALTER TABLE `_EtiquetteCreators`
  ADD UNIQUE KEY `_EtiquetteCreators_AB_unique` (`A`,`B`),
  ADD KEY `_EtiquetteCreators_B_index` (`B`);

--
-- Index pour la table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Admin`
--
ALTER TABLE `Admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `Creator`
--
ALTER TABLE `Creator`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT pour la table `Etiquette`
--
ALTER TABLE `Etiquette`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT pour la table `Innovation`
--
ALTER TABLE `Innovation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `Mail`
--
ALTER TABLE `Mail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT pour la table `Tag`
--
ALTER TABLE `Tag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `EtiquetteInnovation`
--
ALTER TABLE `EtiquetteInnovation`
  ADD CONSTRAINT `EtiquetteInnovation_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Innovation` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `EtiquetteInnovation_etiquetteId_fkey` FOREIGN KEY (`etiquetteId`) REFERENCES `Etiquette` (`id`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `EtiquetteTag`
--
ALTER TABLE `EtiquetteTag`
  ADD CONSTRAINT `EtiquetteTag_etiquetteId_fkey` FOREIGN KEY (`etiquetteId`) REFERENCES `Etiquette` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `EtiquetteTag_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag` (`id`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `_EtiquetteCreators`
--
ALTER TABLE `_EtiquetteCreators`
  ADD CONSTRAINT `_EtiquetteCreators_A_fkey` FOREIGN KEY (`A`) REFERENCES `Creator` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_EtiquetteCreators_B_fkey` FOREIGN KEY (`B`) REFERENCES `Etiquette` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
