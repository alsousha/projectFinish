-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 25, 2023 at 09:17 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

CREATE TABLE `blog` (
  `id_article` int(11) NOT NULL,
  `art_title` varchar(255) NOT NULL,
  `art_text` varchar(6000) NOT NULL,
  `art_img` varchar(50) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`id_article`, `art_title`, `art_text`, `art_img`, `create_date`) VALUES
(2, 'Article #2', '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, enim qui vel harum autem, dignissimos vitae ullam delectus non quaerat ea animi officiis soluta voluptates aliquid vero distinctio fugit veniam impedit numquam labore. In accusantium, quis vero ut rem itaque. Nihil maxime sed aperiam eveniet similique impedit repudiandae nesciunt dolore doloremque aspernatur. Animi repellendus aperiam hic esse ratione eos quasi est. Consequuntur sed laboriosam culpa tenetur error consectetur minus dolores perferendis quaerat repellat aut at repellendus magni maxime, debitis laudantium beatae quibusdam dolor voluptas iusto. Optio sequi exercitationem facilis, consectetur dolor sint, dolorum harum magni repellendus, vitae perferendis quidem. Eos, voluptas voluptates. Praesentium atque labore consectetur assumenda recusandae provident, officiis temporibus doloremque perspiciatis fuga est tempore alias eaque! Illo ab culpa quibusdam dolore sapiente mollitia aspernatur quaerat ducimus aliquid, eos quisquam non sunt nesciunt facere? Voluptate optio possimus architecto saepe ab rerum consequuntur est. Labore, dignissimos, quos magni facere accusantium id molestiae nostrum voluptatem nihil iure, et eveniet illo provident repellendus consequatur libero quidem explicabo vitae quo error mollitia perspiciatis fugit deserunt dolores! Id molestias ut, temporibus commodi accusantium dignissimos quasi tenetur repellat quos beatae ad consequatur deserunt eveniet laudantium maxime debitis magnam quisquam nam placeat rem nulla ex quibusdam nihil error? Hic nam doloribus ullam sunt ipsam distinctio eveniet molestias laudantium vero deleniti sapiente harum doloremque ad dolor, ex mollitia minima ducimus non facilis esse impedit! Quo placeat dignissimos facilis harum nesciunt! Ea provident tempore quo animi earum iure sapiente dolore, nemo similique tempora, assumenda eius ipsum, sint mollitia repellendus cupiditate? Neque, mollitia! Laudantium iure delectus corrupti autem, perferendis cumque rem doloribus architecto exercitationem. Iste porro aut quae laborum inventore et eligendi optio exercitationem quo atque eos mollitia at commodi corrupti voluptatem odio praesentium, eveniet reprehenderit. Nobis laudantium, maxime esse modi ad aut mollitia. Soluta maiores culpa quisquam, error sequi molestias! Ex explicabo perspiciatis ducimus, eos, sint quia libero ratione voluptate qui, deleniti recusandae labore officiis. Numquam unde porro dignissimos, aperiam suscipit asperiores. Ipsum nam impedit, mollitia ipsam officia maiores minima, et exercitationem ducimus nobis nemo illo dolorum aspernatur molestias doloribus debitis laborum, quo voluptatibus sapiente placeat minus? Numquam molestiae perferendis dolore necessitatibus itaque dolores dolorem officiis doloribus optio ipsam voluptatem cum fuga corporis quo beatae iste earum enim veniam, quisquam nisi? Impedit quidem quibusdam minus ea incidunt soluta, cupiditate voluptas. Temporibus molestias quam culpa, ipsa esse provident cupiditate, nihil commodi animi a neque quod ad consequatur, corrupti sunt assumenda magnam? Autem doloribus culpa accusantium dignissimos non cumque ipsam repellendus deleniti iure. Perferendis libero amet provident quod, vero harum hic maiores iusto officiis, assumenda expedita placeat praesentium laborum, voluptatem earum tenetur molestiae magnam quisquam quasi in eos pariatur vel aliquid! Voluptas excepturi optio error corporis dolorum fugiat quaerat aspernatur mollitia, nostrum porro corrupti amet asperiores itaque iste odit ut exercitationem dolores in consequuntur dolor officiis. Iste laboriosam eos nobis. Voluptates saepe magnam ex sed esse tenetur, deserunt consequatur ea optio aspernatur suscipit itaque ad obcaecati earum, omnis laudantium? Blanditiis maxime eius dolor facere nulla laborum modi, error ullam quasi dignissimos iure autem et nostrum dicta adipisci, maiores quas beatae iste! Illo delectus velit ducimus porro impedit molestiae!</p>', 'uploads/resized_art2.png', '2023-08-07 15:00:42'),
(3, 'Article #3', '<p>In accusantium, quis vero ut rem itaque. Nihil maxime sed aperiam eveniet similique impedit repudiandae nesciunt dolore doloremque aspernatur. Animi repellendus aperiam hic esse ratione eos quasi est. Consequuntur sed laboriosam culpa tenetur error consectetur minus dolores perferendis quaerat repellat aut at repellendus magni maxime, debitis laudantium beatae quibusdam dolor voluptas iusto. Optio sequi exercitationem facilis, consectetur dolor sint, dolorum harum magni repellendus, vitae perferendis quidem. Eos, voluptas voluptates. Praesentium atque labore consectetur assumenda recusandae provident, officiis temporibus doloremque perspiciatis fuga est tempore alias eaque! Illo ab culpa quibusdam dolore sapiente mollitia aspernatur quaerat ducimus aliquid, eos quisquam non sunt nesciunt facere? Voluptate optio possimus architecto saepe ab rerum consequuntur est. Labore, dignissimos, quos magni facere accusantium id molestiae nostrum voluptatem nihil iure, et eveniet illo provident repellendus consequatur libero quidem explicabo vitae quo error mollitia perspiciatis fugit deserunt dolores! Id molestias ut, temporibus commodi accusantium dignissimos quasi tenetur repellat quos beatae ad consequatur deserunt eveniet laudantium maxime debitis magnam quisquam nam placeat rem nulla ex quibusdam nihil error? Hic nam doloribus ullam sunt ipsam distinctio eveniet molestias laudantium vero deleniti sapiente harum doloremque ad dolor, ex mollitia minima ducimus non facilis esse impedit! Quo placeat dignissimos facilis harum nesciunt! Ea provident tempore quo animi earum iure sapiente dolore, nemo similique tempora, assumenda eius ipsum, sint mollitia repellendus cupiditate? Neque, mollitia! Laudantium iure delectus corrupti autem, perferendis cumque rem doloribus architecto exercitationem. Iste porro aut quae laborum inventore et eligendi optio exercitationem quo atque eos mollitia at commodi corrupti voluptatem odio praesentium, eveniet reprehenderit. Nobis laudantium, maxime esse modi ad aut mollitia. Soluta maiores culpa quisquam, error sequi molestias! Ex explicabo perspiciatis ducimus, eos, sint quia libero ratione voluptate qui, deleniti recusandae labore officiis. Numquam unde porro dignissimos, aperiam suscipit asperiores. Ipsum nam impedit, mollitia ipsam officia maiores minima, et exercitationem ducimus nobis nemo illo dolorum aspernatur molestias doloribus debitis laborum, quo voluptatibus sapiente placeat minus? Numquam molestiae perferendis dolore necessitatibus itaque dolores dolorem officiis doloribus optio ipsam voluptatem cum fuga corporis quo beatae iste earum enim veniam, quisquam nisi? Impedit quidem quibusdam minus ea incidunt soluta, cupiditate voluptas. Temporibus molestias quam culpa, ipsa esse provident cupiditate, nihil commodi animi a neque quod ad consequatur, corrupti sunt assumenda magnam? Autem doloribus culpa accusantium dignissimos non cumque ipsam repellendus deleniti iure. Perferendis libero amet provident quod, vero harum hic maiores iusto officiis, assumenda expedita placeat praesentium laborum, voluptatem earum tenetur molestiae magnam quisquam quasi in eos pariatur vel aliquid! Voluptas excepturi optio error corporis dolorum fugiat quaerat aspernatur mollitia, nostrum porro corrupti amet asperiores itaque iste odit ut exercitationem dolores in consequuntur dolor officiis. Iste laboriosam eos nobis.</p>', 'uploads/resized_art3.png', '2023-08-07 15:00:42'),
(8, 'article#1', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>', 'uploads/resized_art1.jpg', '2023-11-18 08:16:43');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id_category` int(10) NOT NULL,
  `category_name` varchar(15) NOT NULL,
  `date_create` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_subject` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id_category`, `category_name`, `date_create`, `id_subject`) VALUES
(91, 'Functions', '2023-06-12 01:48:16', 5),
(94, 'variables', '2023-06-12 02:04:33', 5),
(105, 'math1', '2023-06-12 15:22:26', 1),
(106, 'math2', '2023-06-12 15:22:36', 1),
(110, 'Present Simple', '2023-06-12 15:33:26', 2),
(112, 'Past Simple', '2023-06-12 15:38:41', 2),
(114, 'Future', '2023-06-12 21:04:52', 2),
(115, 'Israel', '2023-06-12 21:05:03', 3),
(116, 'Europe', '2023-06-13 13:04:23', 3),
(117, 'Nodes', '2023-06-22 22:58:12', 4),
(118, 'Queue', '2023-06-22 22:59:58', 4),
(119, 'Verbs', '2023-07-03 17:08:18', 2),
(120, 'USA', '2023-08-30 11:23:44', 3);

-- --------------------------------------------------------

--
-- Table structure for table `certification`
--

CREATE TABLE `certification` (
  `id_certif` int(10) NOT NULL,
  `certif_name` varchar(255) NOT NULL,
  `certif_img_sm` varchar(100) NOT NULL,
  `certif_img_lg` varchar(255) NOT NULL,
  `certif_imgs_group` longtext NOT NULL,
  `certif_point` int(3) NOT NULL,
  `certif_bg_color` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `certification`
--

INSERT INTO `certification` (`id_certif`, `certif_name`, `certif_img_sm`, `certif_img_lg`, `certif_imgs_group`, `certif_point`, `certif_bg_color`) VALUES
(44, 'Skater', 'cat_img5.svg', 'cat_img_lg5.svg', '[{\"img_id\":\"c1bf4f8a-8e74-40f9-a6f4-342f1cd12884\",\"originalname\":\"e43.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e43.svg\",\"path\":\"uploads\\\\e43.svg\",\"size\":8858},{\"img_id\":\"4c3c8323-0063-44bf-bfbb-f949cfba0e95\",\"originalname\":\"e44.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e44.svg\",\"path\":\"uploads\\\\e44.svg\",\"size\":8239},{\"img_id\":\"36493f13-7c8e-4bc1-9ab5-faf6c8f6e9a1\",\"originalname\":\"e46.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e46.svg\",\"path\":\"uploads\\\\e46.svg\",\"size\":5701},{\"img_id\":\"01024db6-d09b-47c1-b723-d1cd2cf6275b\",\"originalname\":\"e47.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e47.svg\",\"path\":\"uploads\\\\e47.svg\",\"size\":1571},{\"img_id\":\"2e9dcf6e-306f-4635-9748-a9c9a4514ced\",\"originalname\":\"e48.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e48.svg\",\"path\":\"uploads\\\\e48.svg\",\"size\":4701},{\"img_id\":\"c6d9eddc-71b5-4393-8f0f-c2e7ea806d8c\",\"originalname\":\"e49.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e49.svg\",\"path\":\"uploads\\\\e49.svg\",\"size\":6439},{\"img_id\":\"77397207-868d-4f9b-b7bb-3f2db0f6c03e\",\"originalname\":\"e410.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e410.svg\",\"path\":\"uploads\\\\e410.svg\",\"size\":19558},{\"img_id\":\"69704a4f-be8d-4f10-b375-bd9541685a74\",\"originalname\":\"e411.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e411.svg\",\"path\":\"uploads\\\\e411.svg\",\"size\":7308},{\"img_id\":\"2258c83d-b912-409f-9082-da9f195e1021\",\"originalname\":\"e412.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e412.svg\",\"path\":\"uploads\\\\e412.svg\",\"size\":10921},{\"img_id\":\"0eb1c2a9-8b4e-497a-9ad9-c96ff4724fd4\",\"originalname\":\"e413.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e413.svg\",\"path\":\"uploads\\\\e413.svg\",\"size\":14963},{\"img_id\":\"3c9174d9-9a0b-476d-a610-32fe614881bf\",\"originalname\":\"e414.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e414.svg\",\"path\":\"uploads\\\\e414.svg\",\"size\":8576},{\"img_id\":\"fe92f140-9d61-427a-bf8e-e68d3c510a3d\",\"originalname\":\"e415.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e415.svg\",\"path\":\"uploads\\\\e415.svg\",\"size\":11302},{\"img_id\":\"5d63bcae-7006-40c2-90bc-70590da8222b\",\"originalname\":\"e416.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e416.svg\",\"path\":\"uploads\\\\e416.svg\",\"size\":7100},{\"img_id\":\"5f586db0-9ecc-483f-aea4-62ac11c492b4\",\"originalname\":\"e442.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e442.svg\",\"path\":\"uploads\\\\e442.svg\",\"size\":7629},{\"img_id\":\"90cb9c7b-e836-472e-872c-dd6c280a7e1c\",\"originalname\":\"preview_6127ac3e7fc88.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"preview_6127ac3e7fc88.svg\",\"path\":\"uploads\\\\preview_6127ac3e7fc88.svg\",\"size\":7160}]', 2, '#8574eb'),
(45, 'Scientist', 'cat_img1.svg', 'cat_img_lg1.svg', '[{\"img_id\":\"50732f23-814d-46b5-8503-f0fdcb198dc9\",\"originalname\":\"el1.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"el1.svg\",\"path\":\"uploads\\\\el1.svg\",\"size\":9838},{\"img_id\":\"82b79537-9058-48bf-b35e-dda3d0f29ce8\",\"originalname\":\"el12.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"el12.svg\",\"path\":\"uploads\\\\el12.svg\",\"size\":12345},{\"img_id\":\"a850d37b-0852-45cd-9efb-15af16ba6def\",\"originalname\":\"el13.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"el13.svg\",\"path\":\"uploads\\\\el13.svg\",\"size\":6881},{\"img_id\":\"c23f212f-5750-41a7-98fa-def6b5e35604\",\"originalname\":\"el14.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"el14.svg\",\"path\":\"uploads\\\\el14.svg\",\"size\":2753},{\"img_id\":\"7a75f7a2-998d-4770-b7a6-8376063cfb88\",\"originalname\":\"el15.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"el15.svg\",\"path\":\"uploads\\\\el15.svg\",\"size\":3549},{\"img_id\":\"7130c576-ec94-4420-96a9-13b0321549f6\",\"originalname\":\"el16.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"el16.svg\",\"path\":\"uploads\\\\el16.svg\",\"size\":3032},{\"img_id\":\"3a711299-3526-4e22-b70c-39af57afda77\",\"originalname\":\"el17.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"el17.svg\",\"path\":\"uploads\\\\el17.svg\",\"size\":6107},{\"img_id\":\"d320f24d-e643-47f3-92ee-58a59b9e6aa1\",\"originalname\":\"el18.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"el18.svg\",\"path\":\"uploads\\\\el18.svg\",\"size\":5935},{\"img_id\":\"1a4fac70-cd8a-46f3-bd2f-5b92cfd0a0fd\",\"originalname\":\"el19.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"el19.svg\",\"path\":\"uploads\\\\el19.svg\",\"size\":11362},{\"img_id\":\"23ea27ed-2399-47f3-a2aa-08707782e973\",\"originalname\":\"el110.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"el110.svg\",\"path\":\"uploads\\\\el110.svg\",\"size\":5093},{\"img_id\":\"fa61951d-1581-4b44-8e97-2aa5669bb527\",\"originalname\":\"el111.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"el111.svg\",\"path\":\"uploads\\\\el111.svg\",\"size\":2023},{\"img_id\":\"933e84ca-6eb0-4c45-92c6-eacfe71a880d\",\"originalname\":\"el112.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"el112.svg\",\"path\":\"uploads\\\\el112.svg\",\"size\":8554},{\"img_id\":\"2fdd78d7-e227-4b99-9e87-45380e0442b3\",\"originalname\":\"el113.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"el113.svg\",\"path\":\"uploads\\\\el113.svg\",\"size\":23041}]', 3, '#46ace5'),
(46, 'Life of a scout', 'cat_img8.svg', 'cat_img_lg2.svg', '[{\"img_id\":\"fb84a71b-ba9d-4c64-b09f-307f6c0a708a\",\"originalname\":\"e21.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e21.svg\",\"path\":\"uploads\\\\e21.svg\",\"size\":8713},{\"img_id\":\"f1d440af-de37-4587-93cf-86ef6aa74b46\",\"originalname\":\"e22.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e22.svg\",\"path\":\"uploads\\\\e22.svg\",\"size\":23896},{\"img_id\":\"8dcf8ab7-387b-4741-bdec-15af6f2d6710\",\"originalname\":\"e23.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e23.svg\",\"path\":\"uploads\\\\e23.svg\",\"size\":9987},{\"img_id\":\"5e774453-2d06-4292-998f-05e73bae3c5f\",\"originalname\":\"e24.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e24.svg\",\"path\":\"uploads\\\\e24.svg\",\"size\":15974},{\"img_id\":\"7976c84e-6cf9-4bfb-8c73-7d2eec7a98ef\",\"originalname\":\"e25.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e25.svg\",\"path\":\"uploads\\\\e25.svg\",\"size\":5299},{\"img_id\":\"0fd5fd47-4507-4f1b-bbc5-1f7b7938ed96\",\"originalname\":\"e26.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e26.svg\",\"path\":\"uploads\\\\e26.svg\",\"size\":4739},{\"img_id\":\"623a4b47-09ce-425f-8b29-dcd9cd800e38\",\"originalname\":\"e27.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e27.svg\",\"path\":\"uploads\\\\e27.svg\",\"size\":3888},{\"img_id\":\"186f5c24-7165-4b89-ba59-3f75d4ab04a2\",\"originalname\":\"e28.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e28.svg\",\"path\":\"uploads\\\\e28.svg\",\"size\":8418},{\"img_id\":\"78041d5d-2f06-41fa-a97d-d2c441ed821d\",\"originalname\":\"e29.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e29.svg\",\"path\":\"uploads\\\\e29.svg\",\"size\":4891},{\"img_id\":\"2a2ccfb2-671a-4749-8f03-2f3ae1e02b38\",\"originalname\":\"e210.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e210.svg\",\"path\":\"uploads\\\\e210.svg\",\"size\":8468},{\"img_id\":\"1e18ee28-d70c-4f40-aa9b-a0903eef0b88\",\"originalname\":\"e211.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e211.svg\",\"path\":\"uploads\\\\e211.svg\",\"size\":10655},{\"img_id\":\"841b9094-6e90-48ba-9ca8-b5940f99e970\",\"originalname\":\"e212.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e212.svg\",\"path\":\"uploads\\\\e212.svg\",\"size\":7256},{\"img_id\":\"2004e907-7b27-4424-9698-26f19a57b960\",\"originalname\":\"e213.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e213.svg\",\"path\":\"uploads\\\\e213.svg\",\"size\":4447},{\"img_id\":\"abb5d580-f126-40b3-9ff3-5cb1ecebb71a\",\"originalname\":\"e214.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e214.svg\",\"path\":\"uploads\\\\e214.svg\",\"size\":2472},{\"img_id\":\"695032a0-f0de-45bd-b089-68c2ee3bd0c7\",\"originalname\":\"e215.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e215.svg\",\"path\":\"uploads\\\\e215.svg\",\"size\":7174},{\"img_id\":\"17ad1fa1-cbaf-4a1b-abe9-578cc3999d33\",\"originalname\":\"e216.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e216.svg\",\"path\":\"uploads\\\\e216.svg\",\"size\":4997},{\"img_id\":\"11e196df-3a62-4b1c-a038-045ef7c5fe1f\",\"originalname\":\"e217.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e217.svg\",\"path\":\"uploads\\\\e217.svg\",\"size\":19296}]', 3, '#60bf60'),
(47, 'Business style', 'cat_img7.svg', 'cat_img_lg10.svg', '[{\"img_id\":\"8461acfd-d228-4d9d-ba30-5dfb94d1207b\",\"originalname\":\"catD1.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"catD1.svg\",\"path\":\"uploads\\\\catD1.svg\",\"size\":9328},{\"img_id\":\"dca84e83-ddb5-4a5b-bf34-63518a0e4e48\",\"originalname\":\"catD2.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"catD2.svg\",\"path\":\"uploads\\\\catD2.svg\",\"size\":5226},{\"img_id\":\"ccb5e517-f229-4e14-aa45-b1a36e75abc3\",\"originalname\":\"catD3.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"catD3.svg\",\"path\":\"uploads\\\\catD3.svg\",\"size\":75721}]', 6, '#6287fb'),
(48, 'Life of a detective', 'cat_img6.svg', 'cat_img_lg4.svg', '[{\"img_id\":\"f96daeca-b35f-4cbc-ad0b-b9e27286ad29\",\"originalname\":\"e31.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e31.svg\",\"path\":\"uploads\\\\e31.svg\",\"size\":4140},{\"img_id\":\"61456f9c-278d-4849-b53f-e7e45bd226c4\",\"originalname\":\"e32.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e32.svg\",\"path\":\"uploads\\\\e32.svg\",\"size\":10280},{\"img_id\":\"0109db8e-5f2d-4bf4-906a-02dda82d768b\",\"originalname\":\"e33.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e33.svg\",\"path\":\"uploads\\\\e33.svg\",\"size\":4438},{\"img_id\":\"4834e9de-f6f6-4eb3-8c58-9e6eea5ccc47\",\"originalname\":\"e34.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e34.svg\",\"path\":\"uploads\\\\e34.svg\",\"size\":2265},{\"img_id\":\"4f49f066-5ad6-44ab-a69f-9e5bba201daa\",\"originalname\":\"e35.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e35.svg\",\"path\":\"uploads\\\\e35.svg\",\"size\":4504},{\"img_id\":\"379893e0-e724-4eb3-aead-9aa878be9612\",\"originalname\":\"e36.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e36.svg\",\"path\":\"uploads\\\\e36.svg\",\"size\":8637},{\"img_id\":\"dfbbed8c-1e8d-4cd1-afb1-7c5d337a4ebe\",\"originalname\":\"e37.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e37.svg\",\"path\":\"uploads\\\\e37.svg\",\"size\":11340},{\"img_id\":\"341ed2c6-f480-44f7-8d20-9508fa6cd1b5\",\"originalname\":\"e38.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e38.svg\",\"path\":\"uploads\\\\e38.svg\",\"size\":5844},{\"img_id\":\"021356f6-5924-4d7f-9ce6-bb756ce37fa2\",\"originalname\":\"e39.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e39.svg\",\"path\":\"uploads\\\\e39.svg\",\"size\":12401},{\"img_id\":\"1ae9e658-da3b-4154-85e7-bd634c56a6d3\",\"originalname\":\"e310.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e310.svg\",\"path\":\"uploads\\\\e310.svg\",\"size\":3564},{\"img_id\":\"0f09db3e-bdfe-45b9-a083-69019cd06b39\",\"originalname\":\"e311.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e311.svg\",\"path\":\"uploads\\\\e311.svg\",\"size\":10204},{\"img_id\":\"9b4ee983-3e3d-4d65-a3de-b729b3091b6a\",\"originalname\":\"e312.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e312.svg\",\"path\":\"uploads\\\\e312.svg\",\"size\":5988},{\"img_id\":\"93b93722-52f8-4403-8d6c-fd92bdab4e07\",\"originalname\":\"e313.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e313.svg\",\"path\":\"uploads\\\\e313.svg\",\"size\":6186},{\"img_id\":\"3290011c-9fa2-46b3-bb59-f374fbf3079f\",\"originalname\":\"e314.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e314.svg\",\"path\":\"uploads\\\\e314.svg\",\"size\":2198},{\"img_id\":\"123dec03-715f-46e0-b597-628d27b928ce\",\"originalname\":\"e315.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e315.svg\",\"path\":\"uploads\\\\e315.svg\",\"size\":3377},{\"img_id\":\"28d01e13-7164-45fc-b1a4-d842a1ef4b46\",\"originalname\":\"e316.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e316.svg\",\"path\":\"uploads\\\\e316.svg\",\"size\":7720},{\"img_id\":\"7aeeb6d6-bf91-41e5-9fb6-9e8ef71bcf6c\",\"originalname\":\"e317.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e317.svg\",\"path\":\"uploads\\\\e317.svg\",\"size\":43864}]', 2, '#119e9e'),
(49, 'Rock star', 'cat_img4.svg', 'cat_img_lg6.svg', '[{\"img_id\":\"72bb6ef7-31a6-4a80-bf45-3fc2ef1c2fcd\",\"originalname\":\"e52.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e52.svg\",\"path\":\"uploads\\\\e52.svg\",\"size\":10861},{\"img_id\":\"1c28c793-1ab2-4d8c-9bfb-14588a72af79\",\"originalname\":\"e53.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e53.svg\",\"path\":\"uploads\\\\e53.svg\",\"size\":7468},{\"img_id\":\"ed6fbead-af88-4d8d-9eee-2761c3be3b13\",\"originalname\":\"e54.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e54.svg\",\"path\":\"uploads\\\\e54.svg\",\"size\":8587},{\"img_id\":\"fb5b458c-1064-4165-830e-fdd7465991c7\",\"originalname\":\"e55.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e55.svg\",\"path\":\"uploads\\\\e55.svg\",\"size\":13011},{\"img_id\":\"a107c1c4-d3c8-456c-9805-39984f6bd9ac\",\"originalname\":\"e56.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e56.svg\",\"path\":\"uploads\\\\e56.svg\",\"size\":24204},{\"img_id\":\"04e5ef94-dd10-4a40-b9cf-1deba8ef035a\",\"originalname\":\"e57.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"e57.svg\",\"path\":\"uploads\\\\e57.svg\",\"size\":60462}]', 3, '#9c4050'),
(50, 'Cook', 'cat_img3.svg', 'cat_img_lg7.svg', '[{\"img_id\":\"284fc6b7-6784-4fe7-8de8-96aecdb2c7da\",\"originalname\":\"co1.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"co1.svg\",\"path\":\"uploads\\\\co1.svg\",\"size\":15000},{\"img_id\":\"a0e805d4-9194-4838-a9e9-086d39ed1fd6\",\"originalname\":\"co2.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"co2.svg\",\"path\":\"uploads\\\\co2.svg\",\"size\":1817},{\"img_id\":\"fe607f23-9037-400c-aa30-6a291db3a694\",\"originalname\":\"co3.svg\",\"encoding\":\"7bit\",\"mimetype\":\"image/svg+xml\",\"destination\":\"uploads/\",\"filename\":\"co3.svg\",\"path\":\"uploads\\\\co3.svg\",\"size\":2916}]', 200, '#ff8754');

-- --------------------------------------------------------

--
-- Table structure for table `class`
--

CREATE TABLE `class` (
  `id_class` int(3) NOT NULL,
  `class_name` varchar(15) NOT NULL,
  `class_level` int(2) UNSIGNED NOT NULL,
  `id_teacher` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `class`
--

INSERT INTO `class` (`id_class`, `class_name`, `class_level`, `id_teacher`) VALUES
(19, 'a1', 0, 120),
(20, 'a2', 0, 120),
(22, '1a', 0, 121),
(23, '1b', 0, 121),
(24, 'a5', 0, 122),
(25, 'a6', 0, 122),
(26, '1a', 0, 146),
(27, '2a', 0, 121),
(28, '3a', 0, 121);

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id_user` int(3) NOT NULL,
  `class_level` int(2) UNSIGNED NOT NULL,
  `total_points` int(5) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id_user`, `class_level`, `total_points`) VALUES
(124, 0, 0),
(125, 2, 0),
(126, 2, 0),
(127, 3, 0),
(128, 3, 2),
(129, 0, 0),
(130, 2, 0),
(131, 3, 1),
(132, 4, 0),
(133, 4, 76),
(134, 4, 1),
(135, 5, 0),
(136, 5, 0),
(137, 5, 0),
(138, 6, 0),
(139, 6, 0),
(140, 6, 0),
(141, 6, 0),
(142, 0, 0),
(143, 0, 0),
(144, 2, 0),
(145, 5, 88),
(149, 2, 0);

-- --------------------------------------------------------

--
-- Table structure for table `student_certification`
--

CREATE TABLE `student_certification` (
  `id_user` int(3) NOT NULL,
  `id_certif_item` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `student_certification`
--

INSERT INTO `student_certification` (`id_user`, `id_certif_item`) VALUES
(133, '01024db6-d09b-47c1-b723-d1cd2cf6275b'),
(133, '0eb1c2a9-8b4e-497a-9ad9-c96ff4724fd4'),
(133, '77397207-868d-4f9b-b7bb-3f2db0f6c03e'),
(133, '82b79537-9058-48bf-b35e-dda3d0f29ce8'),
(133, 'a850d37b-0852-45cd-9efb-15af16ba6def'),
(133, 'fe607f23-9037-400c-aa30-6a291db3a694');

-- --------------------------------------------------------

--
-- Table structure for table `student_class`
--

CREATE TABLE `student_class` (
  `id_user` int(3) NOT NULL,
  `id_class` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `student_class`
--

INSERT INTO `student_class` (`id_user`, `id_class`) VALUES
(124, 19),
(125, 20),
(126, 20),
(127, 22),
(128, 22),
(129, 19),
(130, 20),
(131, 22),
(132, 23),
(133, 23),
(134, 28),
(135, 24),
(136, 24),
(137, 24),
(138, 25),
(139, 25),
(140, 25),
(141, 25),
(142, 19),
(143, 19),
(143, 22),
(143, 27),
(144, 20),
(144, 22),
(145, 22),
(145, 26);

-- --------------------------------------------------------

--
-- Table structure for table `student_task`
--

CREATE TABLE `student_task` (
  `id_user` int(3) NOT NULL,
  `id_task` int(3) NOT NULL,
  `id_tskFolder` int(11) NOT NULL,
  `is_task_done` tinyint(1) NOT NULL,
  `date` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `student_task`
--

INSERT INTO `student_task` (`id_user`, `id_task`, `id_tskFolder`, `is_task_done`, `date`) VALUES
(127, 33, 87, 0, '2023-08-25 16:40:46'),
(127, 34, 66, 0, '2023-07-08 16:49:43'),
(127, 36, 80, 0, '2023-08-15 09:59:40'),
(127, 40, 66, 0, '2023-07-08 16:49:43'),
(127, 53, 75, 0, '2023-08-15 04:30:21'),
(127, 54, 68, 0, '2023-07-12 13:47:08'),
(127, 66, 71, 0, '2023-07-31 08:19:46'),
(127, 66, 88, 0, '2023-08-30 15:12:51'),
(127, 67, 73, 0, '2023-08-14 19:57:41'),
(127, 71, 88, 0, '2023-08-30 15:12:51'),
(128, 33, 87, 0, '2023-08-25 16:40:46'),
(128, 34, 66, 0, '2023-07-08 16:49:43'),
(128, 36, 80, 0, '2023-08-15 09:59:40'),
(128, 40, 66, 1, '2023-07-08 16:49:43'),
(128, 53, 75, 1, '2023-08-15 04:30:21'),
(128, 54, 68, 0, '2023-07-12 13:47:08'),
(128, 66, 71, 0, '2023-07-31 08:19:46'),
(128, 66, 88, 0, '2023-08-30 15:12:51'),
(128, 67, 73, 0, '2023-08-14 19:57:41'),
(128, 71, 88, 0, '2023-08-30 15:12:51'),
(131, 33, 87, 0, '2023-08-25 16:40:46'),
(131, 34, 66, 0, '2023-07-08 16:49:43'),
(131, 36, 80, 1, '2023-08-15 09:59:40'),
(131, 40, 66, 0, '2023-07-08 16:49:43'),
(131, 53, 75, 0, '2023-08-15 04:30:21'),
(131, 54, 68, 0, '2023-07-12 13:47:08'),
(131, 66, 71, 0, '2023-07-31 08:19:46'),
(131, 66, 88, 0, '2023-08-30 15:12:51'),
(131, 67, 73, 0, '2023-08-14 19:57:41'),
(131, 71, 88, 0, '2023-08-30 15:12:51'),
(132, 52, 72, 0, '2023-08-14 20:55:22'),
(132, 53, 76, 0, '2023-08-15 04:35:46'),
(132, 69, 83, 0, '2023-08-15 10:26:24'),
(132, 71, 84, 0, '2023-08-25 07:54:33'),
(133, 52, 72, 1, '2023-08-14 20:55:22'),
(133, 53, 76, 1, '2023-08-15 04:35:46'),
(133, 69, 83, 1, '2023-08-15 10:26:24'),
(133, 71, 84, 0, '2023-08-25 07:54:33'),
(134, 52, 72, 0, '2023-08-14 20:55:22'),
(134, 53, 76, 1, '2023-08-15 04:35:46'),
(143, 33, 87, 0, '2023-08-25 16:40:46'),
(143, 36, 80, 0, '2023-08-15 09:59:40'),
(143, 53, 75, 0, '2023-08-15 04:30:21'),
(143, 66, 88, 0, '2023-08-30 15:12:51'),
(143, 67, 73, 0, '2023-08-14 19:57:41'),
(143, 71, 88, 0, '2023-08-30 15:12:51'),
(144, 33, 87, 0, '2023-08-25 16:40:46'),
(144, 36, 80, 0, '2023-08-15 09:59:40'),
(144, 53, 75, 0, '2023-08-15 04:30:21'),
(144, 66, 88, 0, '2023-08-30 15:12:51'),
(144, 67, 73, 0, '2023-08-14 19:57:41'),
(144, 71, 88, 0, '2023-08-30 15:12:51'),
(145, 33, 87, 1, '2023-08-25 16:40:46'),
(145, 34, 66, 0, '2023-07-08 16:49:43'),
(145, 36, 80, 0, '2023-08-15 09:59:40'),
(145, 40, 66, 1, '2023-07-08 16:49:43'),
(145, 53, 75, 1, '2023-08-15 04:30:21'),
(145, 54, 68, 1, '2023-07-12 13:47:08'),
(145, 61, 57, 0, '2023-07-12 13:25:44'),
(145, 62, 58, 0, '2023-07-12 13:25:58'),
(145, 66, 71, 0, '2023-07-31 08:19:46'),
(145, 66, 88, 0, '2023-08-30 15:12:51'),
(145, 67, 73, 0, '2023-08-14 19:57:41'),
(145, 71, 88, 0, '2023-08-30 15:12:51');

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE `subject` (
  `id_subject` int(3) NOT NULL,
  `subject_name` varchar(20) NOT NULL,
  `subject_icon` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `subject`
--

INSERT INTO `subject` (`id_subject`, `subject_name`, `subject_icon`) VALUES
(1, 'math', 'math.svg'),
(2, 'english', 'eng.svg'),
(3, 'history', 'history.svg'),
(4, 'programming', 'prog.svg'),
(5, 'biology', 'bio.svg'),
(6, 'geography', 'geography.svg'),
(7, 'geometry', 'geometry.svg'),
(8, 'literature', 'literature.svg'),
(9, 'physics', 'physics.svg'),
(10, 'chemistry', 'chemistry.svg'),
(11, 'social', 'social.svg'),
(12, 'russian ', 'rus.svg');

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `id_task` int(3) NOT NULL,
  `task_name` varchar(255) NOT NULL,
  `task_text` varchar(500) NOT NULL,
  `task_create_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `task_weight` int(2) NOT NULL,
  `task_level` int(2) UNSIGNED NOT NULL,
  `task_img` varchar(255) NOT NULL,
  `id_teacher` int(3) NOT NULL,
  `id_category` int(3) NOT NULL,
  `id_template` int(11) NOT NULL,
  `specific_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`specific_data`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`id_task`, `task_name`, `task_text`, `task_create_date`, `task_weight`, `task_level`, `task_img`, `id_teacher`, `id_category`, `id_template`, `specific_data`) VALUES
(33, 'sdf', '<p>rty</p>', '2023-07-08 01:28:59', 1, 1, 'uploads/resized_boy.png', 121, 110, 1, '{\"input-0\":\"rty1\",\"input-1\":\"fgh2\"}'),
(34, 'task1', '<p>Task1 instructions</p>', '2023-08-12 05:28:09', 1, 1, 'uploads/resized_dog.png', 121, 114, 1, '{\"input-0\":\"ert\",\"input-1\":\"hgj\"}'),
(36, 'Task kuku', '<p>werxcv</p>', '2023-07-02 23:15:53', 1, 1, 'uploads/resized_img_false.png', 121, 110, 1, '{\"input-0\":\"wer1\",\"input-1\":\"rty2\"}'),
(37, 'kuu2', '', '2023-06-30 23:09:14', 1, 1, 'uploads\\sequence.jpg', 121, 110, 1, '{\"input-0\":\"dg\"}'),
(40, 'Task seq', '<p>Instruction of task sequance</p>', '2023-07-02 23:16:10', 1, 1, 'uploads/resized_cat.png', 121, 114, 1, '{\"input-0\":\"seq1\",\"input-1\":\"seq2\",\"input-2\":\"seq3\",\"input-3\":\"seq4\"}'),
(49, 'rw', '<p>fdgertgd</p>', '2023-07-01 15:32:31', 1, 1, 'uploads/resized_wp2062648.jpg', 121, 110, 1, '{\"input-0\":\"et\"}'),
(52, 'task11', '<p>ert</p>', '2023-07-01 15:36:29', 1, 1, 'uploads/resized_levelone_two.png', 121, 110, 1, '{\"input-0\":\"er1\",\"input-1\":\"we2\"}'),
(53, 'Tasks for all', '<p>wer</p>', '2023-07-01 15:39:33', 1, 1, 'uploads/resized_israel.png', 121, 112, 1, '{\"input-0\":\"rtyu\"}'),
(54, 'Example Sequence', '<h2>Lorem, ipsum dolor </h2><p>Sit amet consectetur adipisicing elit. Beatae, fugit repellendus, non perferendis illum iusto ipsam, incidunt ut sunt sint nostrum molestiae officia eveniet <a href=\"www.google.com\" rel=\"noopener noreferrer\" target=\"_blank\">ullam </a>molestias illo maiores velit atque.</p><p><u>Incidunt </u>ut sunt sint nostrum molestiae officia eveniet ullam molestias illo <strong>maiores </strong>velit atque.</p><ol><li>molestiae </li><li>nostrum </li><li>illum </li></ol>', '2023-07-01 15:49:21', 3, 5, 'uploads/resized_tt.jpg', 121, 110, 1, '{\"input-0\":\"seq1\",\"input-1\":\"seq2\",\"input-2\":\"seq3\",\"input-3\":\"seq4\"}'),
(56, 'sdf', '<p>rty</p>', '2023-07-08 01:29:33', 1, 1, 'uploads/resized_boy.png', 121, 110, 1, '{\"input-0\":\"rty1\",\"input-1\":\"fgh2\"}'),
(57, 'sdf', '<p>rty</p>', '2023-07-08 01:30:20', 1, 1, 'uploads/resized_boy.png', 121, 110, 1, '{\"input-0\":\"rty1\",\"input-1\":\"fgh2\"}'),
(58, 'sdf', '<p>hk</p>', '2023-07-08 01:30:39', 1, 1, 'uploads/resized_levelone_eight.png', 121, 110, 1, '{\"input-0\":\"hjk\",\"input-1\":\"hjk\"}'),
(59, 'my Task2', '<p>Text my Task2, <strong>instruction</strong></p>', '2023-07-08 01:32:30', 1, 1, 'uploads/resized_tiger.png', 121, 110, 1, '{\"input-0\":\"qwe1\",\"input-1\":\"qwe2\",\"input-2\":\"qwe3\"}'),
(60, 'Task Sec', '<p>Instr sdf <strong>ytdutu</strong></p><ul><li>gyhu</li><li>rtset</li><li>fcty</li></ul>', '2023-07-08 13:54:15', 4, 8, 'uploads/resized_cat.png', 121, 110, 1, '{\"input-0\":\"sdf1\",\"input-1\":\"dfg2\",\"input-2\":\"dfg3\"}'),
(61, 'Node1', '<p>discription of task Node</p>', '2023-07-12 10:24:41', 2, 1, 'uploads/resized_levelone_eight.png', 146, 117, 1, '{\"input-0\":\"qwe1\",\"input-1\":\"asd2\",\"input-2\":\"zxc3\"}'),
(62, 'Node2', '<p>Discrtption Node2</p>', '2023-07-12 10:25:28', 1, 1, 'uploads/resized_levelone_three.png', 146, 117, 1, '{\"input-0\":\"ert1\",\"input-1\":\"dfg2\",\"input-2\":\"cvb3\",\"input-3\":\"wer4\"}'),
(63, 'asd', '<p>asd</p>', '2023-07-29 13:08:25', 1, 10, 'uploads/resized_8.jpg', 121, 115, 3, '{\"leftBoxTitle\":\"asd\",\"rightBoxITitle\":\"dfg\",\"leftBoxItems\":{\"0\":\"tyu\",\"1\":\"bnm\"},\"rightBoxItems\":{\"0\":\"tgh\",\"1\":\"uio\"}}'),
(66, 'groupTask', '<p>Group instruction</p>', '2023-07-30 05:31:12', 1, 1, 'uploads/resized_restlogo.png', 121, 112, 3, '{\"leftBoxTitle\":\"Left title2\",\"rightBoxITitle\":\"Right title\",\"leftBoxItems\":{\"0\":\"left1\",\"1\":\"left3\",\"2\":\"left4\",\"3\":\"left5\"},\"rightBoxItems\":{\"0\":\"right1\",\"1\":\"right2\",\"2\":\"right3\",\"3\":\"right4\"}}'),
(67, 'esfd', '<p>Descr task</p>', '2023-07-31 12:39:47', 1, 1, 'uploads/resized_home.png', 121, 114, 3, '{\"leftBoxTitle\":\"Animal\",\"rightBoxITitle\":\"Plant\",\"leftBoxItems\":{\"0\":\"dog\",\"1\":\"cat\"},\"rightBoxItems\":{\"0\":\"tree\",\"1\":\"cactus\"}}'),
(68, 'Taskname', '<p>sgsg</p>', '2023-07-31 12:49:34', 1, 1, 'uploads/resized_cat.png', 121, 112, 3, '{\"leftBoxTitle\":\"eee\",\"rightBoxITitle\":\"ddd\",\"leftBoxItems\":{\"0\":\"rw\",\"1\":\"wet4\"},\"rightBoxItems\":{\"0\":\"dfh\"}}'),
(69, 'History task', '<p>History task description </p>', '2023-08-12 04:24:51', 1, 6, 'uploads/resized_spain.png', 121, 116, 1, '{\"input-0\":\"h1\",\"input-1\":\"h2\",\"input-2\":\"h3\"}'),
(70, 'Task10', '<p>desc Task10</p>', '2023-08-15 06:54:15', 6, 6, 'uploads/resized_spain.png', 121, 119, 1, '{\"input-0\":\"aaa1\",\"input-1\":\"aaa2\",\"input-2\":\"aaa3\"}'),
(71, 'task25', '<p>task25</p>', '2023-08-25 04:53:43', 1, 1, 'uploads/resized_favorite.png', 121, 112, 1, '{\"input-0\":\"qq1\",\"input-1\":\"qq2\"}'),
(72, 'ww', '<p>www</p>', '2023-11-18 06:45:49', 1, 1, 'uploads/resized_france.png', 121, 110, 1, '{\"input-0\":\"123\",\"input-1\":\"qwe\"}');

-- --------------------------------------------------------

--
-- Table structure for table `taskfolder`
--

CREATE TABLE `taskfolder` (
  `id_tskFolder` int(3) NOT NULL,
  `tskFolder_name` varchar(15) NOT NULL,
  `is_publish` tinyint(1) NOT NULL DEFAULT 0,
  `id_class` int(3) NOT NULL,
  `id_subject` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `taskfolder`
--

INSERT INTO `taskfolder` (`id_tskFolder`, `tskFolder_name`, `is_publish`, `id_class`, `id_subject`) VALUES
(18, 'mathclass1', 0, 19, 1),
(19, 'historyclass1', 0, 20, 3),
(57, 'java 5.07', 1, 26, 4),
(58, 'java 23.6', 1, 26, 4),
(66, 'tasks for 12.07', 1, 22, 2),
(68, 'tasks for 13.07', 1, 22, 2),
(71, 'test', 1, 22, 2),
(72, 'fA4_1', 1, 23, 2),
(73, 'tasks for 14.08', 1, 22, 2),
(75, 'tasks for 15,08', 1, 22, 2),
(76, 'a4f15.08', 1, 23, 2),
(77, 'a1f15.08', 1, 27, 2),
(78, 'b3f15.08', 1, 28, 2),
(80, 'tasks for 17.08', 1, 22, 2),
(83, 'his1', 1, 23, 3),
(84, 'a425.08', 1, 23, 2),
(87, 'tasks for 3.09', 1, 22, 2),
(88, 'tasks for 1.09', 1, 22, 2),
(89, 'taskHistory1', 0, 22, 3);

-- --------------------------------------------------------

--
-- Table structure for table `task_tasksfolder`
--

CREATE TABLE `task_tasksfolder` (
  `id_task` int(3) NOT NULL,
  `id_tskFolder` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `task_tasksfolder`
--

INSERT INTO `task_tasksfolder` (`id_task`, `id_tskFolder`) VALUES
(33, 87),
(34, 66),
(36, 80),
(40, 66),
(52, 72),
(53, 75),
(53, 76),
(53, 77),
(53, 78),
(54, 68),
(61, 57),
(62, 58),
(66, 71),
(66, 88),
(67, 73),
(69, 83),
(71, 84),
(71, 88);

-- --------------------------------------------------------

--
-- Table structure for table `task_template`
--

CREATE TABLE `task_template` (
  `id_template` int(3) NOT NULL,
  `template_name` varchar(10) NOT NULL,
  `template_inner` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `task_template`
--

INSERT INTO `task_template` (`id_template`, `template_name`, `template_inner`) VALUES
(1, 'template1', ''),
(2, 'template2', '');

-- --------------------------------------------------------

--
-- Table structure for table `teacher`
--

CREATE TABLE `teacher` (
  `id_user` int(30) NOT NULL,
  `count_of_tasks` int(3) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teacher`
--

INSERT INTO `teacher` (`id_user`, `count_of_tasks`) VALUES
(120, 0),
(121, 0),
(122, 0),
(146, 0),
(148, 0);

-- --------------------------------------------------------

--
-- Table structure for table `teacher_sbjs`
--

CREATE TABLE `teacher_sbjs` (
  `id_user` int(3) NOT NULL,
  `id_subject` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `teacher_sbjs`
--

INSERT INTO `teacher_sbjs` (`id_user`, `id_subject`) VALUES
(120, 1),
(120, 3),
(121, 2),
(121, 3),
(122, 4),
(122, 5),
(146, 4),
(146, 5),
(148, 4);

-- --------------------------------------------------------

--
-- Table structure for table `template`
--

CREATE TABLE `template` (
  `id_template` int(11) NOT NULL,
  `template_name` varchar(255) NOT NULL,
  `template_img` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `template`
--

INSERT INTO `template` (`id_template`, `template_name`, `template_img`) VALUES
(1, 'Sequance', 'sequence.jpg'),
(3, 'Group Assigment', 'groupAssigment.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int(3) NOT NULL,
  `role` varchar(7) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(15) NOT NULL,
  `lastname` varchar(15) NOT NULL,
  `img_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `role`, `email`, `password`, `name`, `lastname`, `img_url`) VALUES
(120, 'teacher', 'alexagronov@gmail.com', '$2b$10$MskEw0m3eErbaEkLnXHW1umFevqVn9qLXxuwU7Lm7IRyOPBtUA/LO', 'Alex', 'Agronov', 'avatar-2.svg'),
(121, 'teacher', 'alsu@gmail.com', '$2b$10$KotdRWbF0cpl2idkVeNwQOWVElVw7v6pw9lAarY8bJ7Lje6N9pEJ2', 'Alsu', 'Bogdanova', 'avatar-2.svg'),
(122, 'teacher', 'anton@gmail.com', '$2b$10$owpGhUMeYj1S0CnTPo3p7eD1ZB0zrGbE8o3MW/1L8hN1CAcefJeSq', 'Anton', 'Antonov', 'avatar-2.svg'),
(124, 'student', 'avraham@gmail.com', '$2b$10$VmtrDvJix3IJyxdhxpHLPOZb.GCT8.4dfQTOS3T5Az/ymswQyMaWq', 'Avraham', 'Avramov', 'avatar-2.svg'),
(125, 'student', 'bety@gmail.com', '$2b$10$vVavTanmI21giNjLCL.qS.hlhG0py212ABfXGbWL02WAu5lR1M2om', 'Bety', 'Betynov', 'avatar-2.svg'),
(126, 'student', 'carl@gmail.com', '$2b$10$rEpHdJ56XckshaFWvIS.EuDxOepIT3uUR6MLByo0gMxuPc/iokwrS', 'Carl', 'Carlov', 'avatar-2.svg'),
(127, 'student', 'david@gmail.com', '$2b$10$sS93eM9r/3H3Ro5F53eeSeDU.bV4lvHKGoMeKUtGqaqDEr.jN7PGG', 'David', 'Davidov', 'avatar-2.svg'),
(128, 'student', 'hely@gmail.com', '$2b$10$72zvBwGxZDV0iiR3iMSyoOYewCo9ijkEpzMjAMD1Oi1xjapHoH70S', 'Hely', 'Helynov', 'avatar-2.svg'),
(129, 'student', 'reuven@gmail.com', '$2b$10$.6OEUwLpgQsmuRERJcPO3epEJvwEdqsFK3.KpVz.6KF0hIkflcyqO', 'Reuven', 'Reuvenov', 'avatar-2.svg'),
(130, 'student', 'valery@gmail.com', '$2b$10$xkT4c.J.xNMJMLrB3dL2LeNWvicu5QbAawRnSDKn/foq5wFxOMyMK', 'Valery', 'valerynov', 'avatar-2.svg'),
(131, 'student', 'tania@gmail.com', '$2b$10$4EE.wsZmXBN67kpxo/jXZufFgqIVDdWKopJXLgugcuYuQ86S./UPO', 'Tania', 'Tanianov', 'avatar-2.svg'),
(132, 'student', 'shem@gmail.com', '$2b$10$am3NkloaaxoW1yA4WIwrQe5di22RPGAzlxZuRgxtN.TUtg2aytsuC', 'Shem', 'Shemov', 'avatar-2.svg'),
(133, 'student', 'gil@gmail.com', '$2b$10$2rW2wPMZzjgu2TNB9ZXH4ualAtCNYjrhL6nHcl4vIkGENx6DphOde', 'Gil', 'Gilov', 'avatar-2.svg'),
(134, 'student', 'artyom@gmail.com', '$2b$10$aq7dEoZXDP.uh.1VoVRAbetpb79hhZuYoxWPmmD82quMZdcrGfG3O', 'Artyom', 'Artyomov', 'avatar-2.svg'),
(135, 'student', 'diana@gmail.com', '$2b$10$Ku.nwWg/3K8PyhNShUHxh.xvzKFlKXil/wkognOXuuhVO6RwJcFmG', 'Diana', 'Dianov', 'avatar-2.svg'),
(136, 'student', 'alon@gmail.com', '$2b$10$owq6OI5q9eYXp8xyBXA/LexriLPRs7ujhmjfuMb9iZqF51a2nYrLu', 'Alon', 'Alonov', 'avatar-2.svg'),
(137, 'student', 'shimi@gmail.com', '$2b$10$mAxZA2tP9fluQdV4T3/hxOrVOLOzmSqndZ5VIKqtyQVGFeFweDPEy', 'shimi', 'shimov', 'avatar-2.svg'),
(138, 'student', 'revital@gmail.com', '$2b$10$ihfO5xNVWrifT2TEDAONnenk12342saiDdYoGHOpFwArU/bLKYmQS', 'Revital', 'Revitalov', 'avatar-2.svg'),
(139, 'student', 'sky@gmail.com', '$2b$10$RtFwr0iG8bY7vMSHlipaAuXUfarZqqmtUdTdtJ4zSSTG2O7zbPlbG', 'Sky', 'Skyov', 'avatar-2.svg'),
(140, 'student', 'ira@gmail.com', '$2b$10$kg9n6i1TVphnl.AFMjZkp.Cqe94u6qRDGpQmi/nhJaYBmJojLBQn6', 'Ira', 'Iranov', 'avatar-2.svg'),
(141, 'student', 'tolik@gmail.com', '$2b$10$9L7MN41jmQYPZ/wulrUUjumI7ZTPTFg6gMnOwOfW.RPvp.9bp6QO.', 'Tolik', 'Tolikov', 'avatar-2.svg'),
(142, 'student', 'rina@gmail.com', '$2b$10$HQNIjZTfAPbf44yp0H/OkePwoytrkT.U2zbL4SDKOHb70zJi.Joz6', 'Rina', 'Rinov', 'avatar-2.svg'),
(143, 'student', 'ola@gmail.com', '$2b$10$RdX1mEXfVIBQqI.b3j3P0uu1vifRul3/5hUfuGmSTUW6mPKYPEuUu', 'ola', 'olanov', 'avatar-2.svg'),
(144, 'student', 'keren@gmail.com', '$2b$10$wHz0CYWRRG33V2mC9nMgz.BTRWC7WAkp7Dy2Tz9TgjKmu9w6vx8vK', 'Keren', 'Kerenov', 'avatar-2.svg'),
(145, 'student', 'ivan@gmail.com', '$2b$10$qgEGALMrH.DhnUfC72A4ceSYsR4JMpRoGdTg4O76UvS7ShVqGqt1S', 'Ivan', 'Ivanov', 'avatar-2.svg'),
(146, 'teacher', 'kate@gmail.com', '$2b$10$.6lVybCmI4gtJLhG74/5SOBmH5gCxJGmy6SXBOa5.lhFbsDA0bcsu', 'Kate', 'Branch', 'avatar-2.svg'),
(148, 'teacher', 'alsousha21@gmail.com', '$2b$10$hngIwI1LyGSuLtrQ7nbZje5ELxKGxg0ZSRiBnp3Kpjmq0DPzkM6xe', 'Alsu2', 'Bogdanova', 'avatar-2.svg'),
(149, 'student', 'alsousha211@gmail.com', '$2b$10$55Ju7BWgFk6aAY5V1jzOROOCrs2XtrzqneOvbgvD91KychxUDxpku', 'Anna', 'Fust', 'avatar-2.svg'),
(151, 'admin', 'adb.kzn@gmail.com', '$2b$10$aka6qP2fcsaYhS24z8w.kuXeNck8RkBeV2Kp42AtYqsL8KX3xxTeu', 'Oleg', 'Sunny', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id_article`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id_category`),
  ADD KEY `id_subject` (`id_subject`);

--
-- Indexes for table `certification`
--
ALTER TABLE `certification`
  ADD PRIMARY KEY (`id_certif`);

--
-- Indexes for table `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`id_class`),
  ADD KEY `id_teacher` (`id_teacher`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `student_certification`
--
ALTER TABLE `student_certification`
  ADD PRIMARY KEY (`id_user`,`id_certif_item`);

--
-- Indexes for table `student_class`
--
ALTER TABLE `student_class`
  ADD PRIMARY KEY (`id_user`,`id_class`),
  ADD KEY `id_class` (`id_class`);

--
-- Indexes for table `student_task`
--
ALTER TABLE `student_task`
  ADD PRIMARY KEY (`id_user`,`id_task`,`id_tskFolder`),
  ADD KEY `id_task` (`id_task`),
  ADD KEY `id_tskFolder` (`id_tskFolder`);

--
-- Indexes for table `subject`
--
ALTER TABLE `subject`
  ADD PRIMARY KEY (`id_subject`);

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id_task`),
  ADD KEY `id_category` (`id_category`),
  ADD KEY `id_teacher` (`id_teacher`),
  ADD KEY `id_template` (`id_template`);

--
-- Indexes for table `taskfolder`
--
ALTER TABLE `taskfolder`
  ADD PRIMARY KEY (`id_tskFolder`),
  ADD KEY `id_class` (`id_class`),
  ADD KEY `id_subject` (`id_subject`);

--
-- Indexes for table `task_tasksfolder`
--
ALTER TABLE `task_tasksfolder`
  ADD PRIMARY KEY (`id_task`,`id_tskFolder`),
  ADD KEY `id_tskFolder` (`id_tskFolder`);

--
-- Indexes for table `task_template`
--
ALTER TABLE `task_template`
  ADD PRIMARY KEY (`id_template`);

--
-- Indexes for table `teacher`
--
ALTER TABLE `teacher`
  ADD KEY `teacher_ibfk_1` (`id_user`);

--
-- Indexes for table `teacher_sbjs`
--
ALTER TABLE `teacher_sbjs`
  ADD PRIMARY KEY (`id_user`,`id_subject`),
  ADD KEY `id_subject` (`id_subject`);

--
-- Indexes for table `template`
--
ALTER TABLE `template`
  ADD PRIMARY KEY (`id_template`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blog`
--
ALTER TABLE `blog`
  MODIFY `id_article` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id_category` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=121;

--
-- AUTO_INCREMENT for table `certification`
--
ALTER TABLE `certification`
  MODIFY `id_certif` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `class`
--
ALTER TABLE `class`
  MODIFY `id_class` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `subject`
--
ALTER TABLE `subject`
  MODIFY `id_subject` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `id_task` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `taskfolder`
--
ALTER TABLE `taskfolder`
  MODIFY `id_tskFolder` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT for table `task_template`
--
ALTER TABLE `task_template`
  MODIFY `id_template` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `template`
--
ALTER TABLE `template`
  MODIFY `id_template` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=153;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `category`
--
ALTER TABLE `category`
  ADD CONSTRAINT `category_ibfk_1` FOREIGN KEY (`id_subject`) REFERENCES `subject` (`id_subject`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `class`
--
ALTER TABLE `class`
  ADD CONSTRAINT `class_ibfk_1` FOREIGN KEY (`id_teacher`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student_certification`
--
ALTER TABLE `student_certification`
  ADD CONSTRAINT `student_certification_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student_class`
--
ALTER TABLE `student_class`
  ADD CONSTRAINT `student_class_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `student_class_ibfk_2` FOREIGN KEY (`id_class`) REFERENCES `class` (`id_class`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student_task`
--
ALTER TABLE `student_task`
  ADD CONSTRAINT `student_task_ibfk_1` FOREIGN KEY (`id_task`) REFERENCES `task` (`id_task`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `student_task_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `student_task_ibfk_3` FOREIGN KEY (`id_tskFolder`) REFERENCES `taskfolder` (`id_tskFolder`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `task_ibfk_1` FOREIGN KEY (`id_category`) REFERENCES `category` (`id_category`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `task_ibfk_2` FOREIGN KEY (`id_teacher`) REFERENCES `teacher` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `task_ibfk_3` FOREIGN KEY (`id_template`) REFERENCES `template` (`id_template`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `taskfolder`
--
ALTER TABLE `taskfolder`
  ADD CONSTRAINT `taskfolder_ibfk_1` FOREIGN KEY (`id_class`) REFERENCES `class` (`id_class`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `taskfolder_ibfk_2` FOREIGN KEY (`id_subject`) REFERENCES `subject` (`id_subject`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `task_tasksfolder`
--
ALTER TABLE `task_tasksfolder`
  ADD CONSTRAINT `task_tasksfolder_ibfk_1` FOREIGN KEY (`id_task`) REFERENCES `task` (`id_task`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `task_tasksfolder_ibfk_2` FOREIGN KEY (`id_tskFolder`) REFERENCES `taskfolder` (`id_tskFolder`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `teacher`
--
ALTER TABLE `teacher`
  ADD CONSTRAINT `teacher_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `teacher_sbjs`
--
ALTER TABLE `teacher_sbjs`
  ADD CONSTRAINT `teacher_sbjs_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `teacher_sbjs_ibfk_2` FOREIGN KEY (`id_subject`) REFERENCES `subject` (`id_subject`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
