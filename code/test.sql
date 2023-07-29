-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 26, 2023 at 09:34 PM
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
  `art_img` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`id_article`, `art_title`, `art_text`, `art_img`) VALUES
(1, 'Article #1', '				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque, ducimus laborum amet est in repellendus vero iusto at alias explicabo, quod nisi saepe error, sapiente aliquid inventore excepturi. Incidunt beatae laborum dicta quaerat impedit, blanditiis nesciunt, sequi dignissimos delectus voluptas ab corporis illo repudiandae autem? Odio earum porro sequi similique dolore? \r\nAt tempore, nisi libero eaque molestias pariatur assumenda explicabo, itaque repellat, quia iure aspernatur laudantium veritatis harum labore! Sequi nulla dolor optio, molestiae officia aut at in, quasi magni harum quo! Earum possimus distinctio enim dignissimos magni! Nesciunt molestias perspiciatis libero! Eos magnam distinctio adipisci provident dicta eum veniam error? Fuga perferendis totam, repellat saepe sed temporibus ut ipsum, consequuntur magnam aspernatur nostrum ullam dolor voluptatum sapiente vel. Laborum blanditiis vitae ipsa tempora quos, rem velit facere fugit porro assumenda natus eum modi eligendi optio? Delectus quo exercitationem pariatur, qui ab, possimus unde ea quibusdam dolore, ducimus labore. \r\n\r\nDolorum atque expedita quis omnis adipisci doloribus molestiae similique quisquam incidunt facilis, impedit sed modi, eligendi architecto. Iste porro magnam, deleniti odit earum eveniet itaque in nulla voluptas non reiciendis voluptatibus ipsum nisi reprehenderit? \r\nMollitia impedit, id minima praesentium ipsam officiis similique at, quos labore vel esse sed laudantium soluta accusamus recusandae nobis blanditiis ducimus commodi earum nostrum, aperiam enim quam! Quia perferendis illum eius qui dolor dolore quidem, doloribus velit sapiente optio dicta ducimus harum laudantium totam explicabo necessitatibus iusto minus debitis deserunt labore rem! \r\n\r\nLaborum, neque eligendi? Iure tempora quod error alias libero, incidunt vel voluptate quibusdam dolorem consectetur odio sapiente repellendus! Eius, similique amet. Facere accusamus voluptas, eveniet sed optio quas alias maxime. Harum porro error velit minima dolor aliquid unde aspernatur eos voluptatibus amet, maxime quidem molestiae eius vel iusto reiciendis id qui officia veritatis culpa quas ipsam similique assumenda magnam? Ab dolor laboriosam sequi quis dicta.\r\n', 'art1.svg'),
(2, 'Article #2', '				Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, enim qui vel harum autem, dignissimos vitae ullam delectus non quaerat ea animi officiis soluta voluptates aliquid vero distinctio fugit veniam impedit numquam labore. In accusantium, quis vero ut rem itaque. Nihil maxime sed aperiam eveniet similique impedit repudiandae nesciunt dolore doloremque aspernatur. Animi repellendus aperiam hic esse ratione eos quasi est. Consequuntur sed laboriosam culpa tenetur error consectetur minus dolores perferendis quaerat repellat aut at repellendus magni maxime, debitis laudantium beatae quibusdam dolor voluptas iusto. Optio sequi exercitationem facilis, consectetur dolor sint, dolorum harum magni repellendus, vitae perferendis quidem. Eos, voluptas voluptates. Praesentium atque labore consectetur assumenda recusandae provident, officiis temporibus doloremque perspiciatis fuga est tempore alias eaque! Illo ab culpa quibusdam dolore sapiente mollitia aspernatur quaerat ducimus aliquid, eos quisquam non sunt nesciunt facere? Voluptate optio possimus architecto saepe ab rerum consequuntur est. Labore, dignissimos, quos magni facere accusantium id molestiae nostrum voluptatem nihil iure, et eveniet illo provident repellendus consequatur libero quidem explicabo vitae quo error mollitia perspiciatis fugit deserunt dolores! Id molestias ut, temporibus commodi accusantium dignissimos quasi tenetur repellat quos beatae ad consequatur deserunt eveniet laudantium maxime debitis magnam quisquam nam placeat rem nulla ex quibusdam nihil error? Hic nam doloribus ullam sunt ipsam distinctio eveniet molestias laudantium vero deleniti sapiente harum doloremque ad dolor, ex mollitia minima ducimus non facilis esse impedit! Quo placeat dignissimos facilis harum nesciunt! Ea provident tempore quo animi earum iure sapiente dolore, nemo similique tempora, assumenda eius ipsum, sint mollitia repellendus cupiditate? Neque, mollitia! Laudantium iure delectus corrupti autem, perferendis cumque rem doloribus architecto exercitationem. Iste porro aut quae laborum inventore et eligendi optio exercitationem quo atque eos mollitia at commodi corrupti voluptatem odio praesentium, eveniet reprehenderit. Nobis laudantium, maxime esse modi ad aut mollitia. Soluta maiores culpa quisquam, error sequi molestias! Ex explicabo perspiciatis ducimus, eos, sint quia libero ratione voluptate qui, deleniti recusandae labore officiis. Numquam unde porro dignissimos, aperiam suscipit asperiores. Ipsum nam impedit, mollitia ipsam officia maiores minima, et exercitationem ducimus nobis nemo illo dolorum aspernatur molestias doloribus debitis laborum, quo voluptatibus sapiente placeat minus? Numquam molestiae perferendis dolore necessitatibus itaque dolores dolorem officiis doloribus optio ipsam voluptatem cum fuga corporis quo beatae iste earum enim veniam, quisquam nisi?\r\n\r\nImpedit quidem quibusdam minus ea incidunt soluta, cupiditate voluptas. Temporibus molestias quam culpa, ipsa esse provident cupiditate, nihil commodi animi a neque quod ad consequatur, corrupti sunt assumenda magnam? \r\n\r\n\r\nAutem doloribus culpa accusantium dignissimos non cumque ipsam repellendus deleniti iure. Perferendis libero amet provident quod, vero harum hic maiores iusto officiis, assumenda expedita placeat praesentium laborum, voluptatem earum tenetur molestiae magnam quisquam quasi in eos pariatur vel aliquid! Voluptas excepturi optio error corporis dolorum fugiat quaerat aspernatur mollitia, nostrum porro corrupti amet asperiores itaque iste odit ut exercitationem dolores in consequuntur dolor officiis. Iste laboriosam eos nobis. Voluptates saepe magnam ex sed esse tenetur, deserunt consequatur ea optio aspernatur suscipit itaque ad obcaecati earum, omnis laudantium? Blanditiis maxime eius dolor facere nulla laborum modi, error ullam quasi dignissimos iure autem et nostrum dicta adipisci, maiores quas beatae iste! Illo delectus velit ducimus porro impedit molestiae! \r\n\r\n', 'art2.svg'),
(3, 'Article #3', 'In accusantium, quis vero ut rem itaque. Nihil maxime sed aperiam eveniet similique impedit repudiandae nesciunt dolore doloremque aspernatur. Animi repellendus aperiam hic esse ratione eos quasi est. Consequuntur sed laboriosam culpa tenetur error consectetur minus dolores perferendis quaerat repellat aut at repellendus magni maxime, debitis laudantium beatae quibusdam dolor voluptas iusto. Optio sequi exercitationem facilis, consectetur dolor sint, dolorum harum magni repellendus, vitae perferendis quidem. Eos, voluptas voluptates. Praesentium atque labore consectetur assumenda recusandae provident, officiis temporibus doloremque perspiciatis fuga est tempore alias eaque! Illo ab culpa quibusdam dolore sapiente mollitia aspernatur quaerat ducimus aliquid, eos quisquam non sunt nesciunt facere? Voluptate optio possimus architecto saepe ab rerum consequuntur est. Labore, dignissimos, quos magni facere accusantium id molestiae nostrum voluptatem nihil iure, et eveniet illo provident repellendus consequatur libero quidem explicabo vitae quo error mollitia perspiciatis fugit deserunt dolores! Id molestias ut, temporibus commodi accusantium dignissimos quasi tenetur repellat quos beatae ad consequatur deserunt eveniet laudantium maxime debitis magnam quisquam nam placeat rem nulla ex quibusdam nihil error? Hic nam doloribus ullam sunt ipsam distinctio eveniet molestias laudantium vero deleniti sapiente harum doloremque ad dolor, ex mollitia minima ducimus non facilis esse impedit! Quo placeat dignissimos facilis harum nesciunt! Ea provident tempore quo animi earum iure sapiente dolore, nemo similique tempora, assumenda eius ipsum, sint mollitia repellendus cupiditate? Neque, mollitia! Laudantium iure delectus corrupti autem, perferendis cumque rem doloribus architecto exercitationem. Iste porro aut quae laborum inventore et eligendi optio exercitationem quo atque eos mollitia at commodi corrupti voluptatem odio praesentium, eveniet reprehenderit. Nobis laudantium, maxime esse modi ad aut mollitia. Soluta maiores culpa quisquam, error sequi molestias! Ex explicabo perspiciatis ducimus, eos, sint quia libero ratione voluptate qui, deleniti recusandae labore officiis. Numquam unde porro dignissimos, aperiam suscipit asperiores. Ipsum nam impedit, mollitia ipsam officia maiores minima, et exercitationem ducimus nobis nemo illo dolorum aspernatur molestias doloribus debitis laborum, quo voluptatibus sapiente placeat minus? Numquam molestiae perferendis dolore necessitatibus itaque dolores dolorem officiis doloribus optio ipsam voluptatem cum fuga corporis quo beatae iste earum enim veniam, quisquam nisi? Impedit quidem quibusdam minus ea incidunt soluta, cupiditate voluptas. Temporibus molestias quam culpa, ipsa esse provident cupiditate, nihil commodi animi a neque quod ad consequatur, corrupti sunt assumenda magnam? Autem doloribus culpa accusantium dignissimos non cumque ipsam repellendus deleniti iure. Perferendis libero amet provident quod, vero harum hic maiores iusto officiis, assumenda expedita placeat praesentium laborum, voluptatem earum tenetur molestiae magnam quisquam quasi in eos pariatur vel aliquid! Voluptas excepturi optio error corporis dolorum fugiat quaerat aspernatur mollitia, nostrum porro corrupti amet asperiores itaque iste odit ut exercitationem dolores in consequuntur dolor officiis. Iste laboriosam eos nobis.', 'art3.svg');

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
(119, 'Verbs', '2023-07-03 17:08:18', 2);

-- --------------------------------------------------------

--
-- Table structure for table `certification`
--

CREATE TABLE `certification` (
  `id_certif` int(10) NOT NULL,
  `name_certif` varchar(15) NOT NULL,
  `point` int(3) NOT NULL,
  `flag_as_available` tinyint(4) NOT NULL,
  `description` varchar(100) NOT NULL,
  `img_url` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
(22, 'a21', 0, 121),
(23, 'a4', 0, 121),
(24, 'a5', 0, 122),
(25, 'a6', 0, 122),
(26, '1a', 0, 146),
(27, 'a1', 0, 121);

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
(123, 0, 0),
(124, 0, 0),
(125, 2, 0),
(126, 2, 0),
(127, 3, 0),
(128, 3, 0),
(129, 0, 0),
(130, 2, 0),
(131, 3, 0),
(132, 4, 0),
(133, 4, 0),
(134, 4, 0),
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
(145, 5, 73),
(149, 2, 0);

-- --------------------------------------------------------

--
-- Table structure for table `student_certification`
--

CREATE TABLE `student_certification` (
  `id_user` int(3) NOT NULL,
  `id_certif` int(3) NOT NULL,
  `data_get` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
(123, 19),
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
(134, 23),
(135, 24),
(136, 24),
(137, 24),
(138, 25),
(139, 25),
(140, 25),
(141, 25),
(142, 19),
(143, 19),
(144, 20),
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
(127, 34, 66, 0, '2023-07-08 16:49:43'),
(127, 40, 66, 0, '2023-07-08 16:49:43'),
(127, 52, 64, 0, '2023-07-04 21:26:36'),
(127, 54, 68, 0, '2023-07-12 13:47:08'),
(128, 34, 66, 0, '2023-07-08 16:49:43'),
(128, 40, 66, 0, '2023-07-08 16:49:43'),
(128, 52, 64, 0, '2023-07-04 21:26:36'),
(128, 54, 68, 0, '2023-07-12 13:47:08'),
(131, 34, 66, 0, '2023-07-08 16:49:43'),
(131, 40, 66, 0, '2023-07-08 16:49:43'),
(131, 52, 64, 0, '2023-07-04 21:26:36'),
(131, 54, 68, 0, '2023-07-12 13:47:08'),
(145, 34, 66, 0, '2023-07-08 16:49:43'),
(145, 40, 66, 0, '2023-07-08 16:49:43'),
(145, 52, 64, 0, '2023-07-04 21:26:36'),
(145, 54, 68, 0, '2023-07-12 13:47:08'),
(145, 61, 57, 0, '2023-07-12 13:25:44'),
(145, 62, 58, 0, '2023-07-12 13:25:58');

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
(34, 'task1', '', '2023-06-30 19:50:46', 5, 6, 'uploads\\match.jpg', 121, 114, 1, '{\"input-0\":\"ert\",\"input-1\":\"hgj\"}'),
(36, 'Task kuku', '<p>werxcv</p>', '2023-07-02 23:15:53', 1, 1, 'uploads/resized_img_false.png', 121, 110, 1, '{\"input-0\":\"wer1\",\"input-1\":\"rty2\"}'),
(37, 'kuu2', '', '2023-06-30 23:09:14', 1, 1, 'uploads\\sequence.jpg', 121, 110, 1, '{\"input-0\":\"dg\"}'),
(40, 'Task seq', '<p>Instruction of task sequance</p>', '2023-07-02 23:16:10', 1, 1, 'uploads/resized_cat.png', 121, 114, 1, '{\"input-0\":\"seq1\",\"input-1\":\"seq2\",\"input-2\":\"seq3\",\"input-3\":\"seq4\"}'),
(49, 'rw', '<p>fdgertgd</p>', '2023-07-01 15:32:31', 1, 1, 'uploads/resized_wp2062648.jpg', 121, 110, 1, '{\"input-0\":\"et\"}'),
(52, 't', '<p>ert</p>', '2023-07-01 15:36:29', 1, 1, 'uploads/resized_levelone_two.png', 121, 110, 1, '{\"input-0\":\"er\"}'),
(53, 'sdf', '<p>wer</p>', '2023-07-01 15:39:33', 1, 1, 'uploads/resized_israel.png', 121, 112, 1, '{\"input-0\":\"rtyu\"}'),
(54, 'Example Sequence', '<h2>Lorem, ipsum dolor </h2><p>Sit amet consectetur adipisicing elit. Beatae, fugit repellendus, non perferendis illum iusto ipsam, incidunt ut sunt sint nostrum molestiae officia eveniet <a href=\"www.google.com\" rel=\"noopener noreferrer\" target=\"_blank\">ullam </a>molestias illo maiores velit atque.</p><p><u>Incidunt </u>ut sunt sint nostrum molestiae officia eveniet ullam molestias illo <strong>maiores </strong>velit atque.</p><ol><li>molestiae </li><li>nostrum </li><li>illum </li></ol>', '2023-07-01 15:49:21', 3, 5, 'uploads/resized_tt.jpg', 121, 110, 1, '{\"input-0\":\"seq1\",\"input-1\":\"seq2\",\"input-2\":\"seq3\",\"input-3\":\"seq4\"}'),
(56, 'sdf', '<p>rty</p>', '2023-07-08 01:29:33', 1, 1, 'uploads/resized_boy.png', 121, 110, 1, '{\"input-0\":\"rty1\",\"input-1\":\"fgh2\"}'),
(57, 'sdf', '<p>rty</p>', '2023-07-08 01:30:20', 1, 1, 'uploads/resized_boy.png', 121, 110, 1, '{\"input-0\":\"rty1\",\"input-1\":\"fgh2\"}'),
(58, 'sdf', '<p>hk</p>', '2023-07-08 01:30:39', 1, 1, 'uploads/resized_levelone_eight.png', 121, 110, 1, '{\"input-0\":\"hjk\",\"input-1\":\"hjk\"}'),
(59, 'my Task2', '<p>Text my Task2, <strong>instruction</strong></p>', '2023-07-08 01:32:30', 1, 1, 'uploads/resized_tiger.png', 121, 110, 1, '{\"input-0\":\"qwe1\",\"input-1\":\"qwe2\",\"input-2\":\"qwe3\"}'),
(60, 'Task Sec', '<p>Instr sdf <strong>ytdutu</strong></p><ul><li>gyhu</li><li>rtset</li><li>fcty</li></ul>', '2023-07-08 13:54:15', 4, 8, 'uploads/resized_cat.png', 121, 110, 1, '{\"input-0\":\"sdf1\",\"input-1\":\"dfg2\",\"input-2\":\"dfg3\"}'),
(61, 'Node1', '<p>discription of task Node</p>', '2023-07-12 10:24:41', 2, 1, 'uploads/resized_levelone_eight.png', 146, 117, 1, '{\"input-0\":\"qwe1\",\"input-1\":\"asd2\",\"input-2\":\"zxc3\"}'),
(62, 'Node2', '<p>Discrtption Node2</p>', '2023-07-12 10:25:28', 1, 1, 'uploads/resized_levelone_three.png', 146, 117, 1, '{\"input-0\":\"ert1\",\"input-1\":\"dfg2\",\"input-2\":\"cvb3\",\"input-3\":\"wer4\"}');

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
(59, 'tasks for 30.06', 1, 22, 2),
(64, 'tasks for 4.07', 0, 22, 2),
(65, 'tasks for 7.07', 1, 22, 2),
(66, 'tasks for 12.07', 1, 22, 2),
(68, 'tasks for 13.07', 0, 22, 2),
(69, 'test', 0, 22, 2);

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
(34, 66),
(40, 66),
(54, 68),
(61, 57),
(62, 58);

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
(2, 'Matching Pairs', 'match.jpg'),
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
(123, 'student', 'avi@gmail.com', '$2b$10$gtxQLRLPEhmnIrozt5BjqOua8cn0Lw/KLRmbCSPQdA.fVS4UiILcC', 'Avi', 'Avinov', 'avatar-2.svg'),
(124, 'student', 'avraham@gmail.com', '$2b$10$VmtrDvJix3IJyxdhxpHLPOZb.GCT8.4dfQTOS3T5Az/ymswQyMaWq', 'Avraham', 'Avramov', 'avatar-2.svg'),
(125, 'student', 'bety@gmail.com', '$2b$10$vVavTanmI21giNjLCL.qS.hlhG0py212ABfXGbWL02WAu5lR1M2om', 'Bety', 'Betynov', 'avatar-2.svg'),
(126, 'student', 'carl@gmail.com', '$2b$10$rEpHdJ56XckshaFWvIS.EuDxOepIT3uUR6MLByo0gMxuPc/iokwrS', 'Carl', 'Carlov', 'avatar-2.svg'),
(127, 'student', 'david@gmail.com', '$2b$10$sS93eM9r/3H3Ro5F53eeSeDU.bV4lvHKGoMeKUtGqaqDEr.jN7PGG', 'David', 'Davidov', 'avatar-2.svg'),
(128, 'student', 'hely@gmail.com', '$2b$10$72zvBwGxZDV0iiR3iMSyoOYewCo9ijkEpzMjAMD1Oi1xjapHoH70S', 'Hely', 'Helynov', 'avatar-2.svg'),
(129, 'student', 'reuven@gmail.com', '$2b$10$.6OEUwLpgQsmuRERJcPO3epEJvwEdqsFK3.KpVz.6KF0hIkflcyqO', 'Reuven', 'Reuvenov', 'avatar-2.svg'),
(130, 'student', 'valery@gmail.com', '$2b$10$xkT4c.J.xNMJMLrB3dL2LeNWvicu5QbAawRnSDKn/foq5wFxOMyMK', 'Valery', 'valerynov', 'avatar-2.svg'),
(131, 'student', 'tania@gmail.com', '$2b$10$4EE.wsZmXBN67kpxo/jXZufFgqIVDdWKopJXLgugcuYuQ86S./UPO', 'Tania', 'Tanianov', 'avatar-2.svg'),
(132, 'student', 'shem@gmail.com', '$2b$10$am3NkloaaxoW1yA4WIwrQe5di22RPGAzlxZuRgxtN.TUtg2aytsuC', 'Shem', 'Shemov', 'avatar-2.svg'),
(133, 'student', 'gil@gmail.com', '$2b$10$2rW2wPMZzjgu2TNB9ZXH4ualAtCNYjrhL6nHcl4vIkGENx6DphOde', 'Gil', 'gilov', 'avatar-2.svg'),
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
(149, 'student', 'alsousha211@gmail.com', '$2b$10$55Ju7BWgFk6aAY5V1jzOROOCrs2XtrzqneOvbgvD91KychxUDxpku', 'Anna', 'Fust', 'avatar-2.svg');

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
  ADD PRIMARY KEY (`id_user`,`id_certif`),
  ADD KEY `id_certif` (`id_certif`);

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
  MODIFY `id_article` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id_category` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=120;

--
-- AUTO_INCREMENT for table `certification`
--
ALTER TABLE `certification`
  MODIFY `id_certif` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `class`
--
ALTER TABLE `class`
  MODIFY `id_class` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `subject`
--
ALTER TABLE `subject`
  MODIFY `id_subject` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `id_task` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `taskfolder`
--
ALTER TABLE `taskfolder`
  MODIFY `id_tskFolder` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

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
  MODIFY `id_user` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=150;

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
  ADD CONSTRAINT `student_certification_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `student_certification_ibfk_2` FOREIGN KEY (`id_certif`) REFERENCES `certification` (`id_certif`) ON DELETE CASCADE ON UPDATE CASCADE;

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
