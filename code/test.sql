-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 03, 2023 at 04:17 AM
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
(118, 'Queue', '2023-06-22 22:59:58', 4);

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
(22, 'a2w', 0, 121),
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
(145, 5, 0);

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
  `is_task_done` tinyint(1) NOT NULL,
  `date` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE `subject` (
  `id_subject` int(3) NOT NULL,
  `subject_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `subject`
--

INSERT INTO `subject` (`id_subject`, `subject_name`) VALUES
(1, 'math'),
(2, 'english'),
(3, 'history'),
(4, 'java'),
(5, 'python'),
(6, 'geography'),
(7, 'hebrew'),
(8, 'russian');

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
  `is_done` tinyint(1) NOT NULL DEFAULT 0,
  `id_teacher` int(3) NOT NULL,
  `id_category` int(3) NOT NULL,
  `id_template` int(11) NOT NULL,
  `specific_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`specific_data`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`id_task`, `task_name`, `task_text`, `task_create_date`, `task_weight`, `task_level`, `task_img`, `is_done`, `id_teacher`, `id_category`, `id_template`, `specific_data`) VALUES
(32, 'sdf23sd', '<p><em>Inadf </em>dfgr<strong>eq</strong></p><p><u>werd</u></p>', '2023-07-02 23:12:27', 1, 1, 'uploads/resized_dog.png', 0, 121, 110, 1, '{\"input-0\":\"sdf\",\"input-1\":\"sdwe\"}'),
(33, 'sdf', '', '2023-06-30 19:47:11', 1, 1, 'uploads\\sequence.jpg', 0, 121, 110, 1, '{\"input-0\":\"dfg\",\"input-1\":\"ert\"}'),
(34, 'task1', '', '2023-06-30 19:50:46', 5, 6, 'uploads\\match.jpg', 0, 121, 114, 1, '{\"input-0\":\"ert\",\"input-1\":\"hgj\"}'),
(35, 'task3', '', '2023-06-30 19:52:59', 1, 1, 'uploads\\logo.png', 0, 121, 110, 1, '{\"input-0\":\"we\"}'),
(36, 'Task kuku', '<p>werxcv</p>', '2023-07-02 23:15:53', 1, 1, 'uploads/resized_img_false.png', 0, 121, 110, 1, '{\"input-0\":\"wer\",\"input-1\":\"sdf\",\"input-2\":\"rty\"}'),
(37, 'kuu2', '', '2023-06-30 23:09:14', 1, 1, 'uploads\\sequence.jpg', 0, 121, 110, 1, '{\"input-0\":\"dg\"}'),
(38, 'Kuku3new2', '<p>fdgty new</p>', '2023-07-02 23:11:12', 1, 1, 'uploads/resized_img_false.png', 0, 121, 110, 1, '{\"input-0\":\"hjk\",\"input-1\":\"tyu\",\"input-2\":\"uio\",\"input-3\":\"new\"}'),
(40, 'Task seq', '<p>Instruction of task sequance</p>', '2023-07-02 23:16:10', 1, 1, 'uploads/resized_cat.png', 0, 121, 114, 1, '{\"input-0\":\"seq1\",\"input-1\":\"seq2\",\"input-2\":\"seq3\",\"input-3\":\"seq4\"}'),
(41, 'Task seq3', 'Instruction of task sequance3', '2023-07-01 14:13:14', 3, 8, 'uploads\\edit.png', 0, 121, 112, 1, '{\"input-0\":\"qwe1\",\"input-1\":\"asd2\",\"input-2\":\"zxc3\"}'),
(45, 'dfg', 'dfgrt', '2023-07-01 14:47:57', 3, 4, 'uploads/resized_wp2062648.jpg', 0, 121, 110, 1, '{\"input-0\":\"dfg\"}'),
(49, 'rw', '<p>fdgertgd</p>', '2023-07-01 15:32:31', 1, 1, 'uploads/resized_wp2062648.jpg', 0, 121, 110, 1, '{\"input-0\":\"et\"}'),
(52, 't', '<p>ert</p>', '2023-07-01 15:36:29', 1, 1, 'uploads/resized_levelone_two.png', 0, 121, 110, 1, '{\"input-0\":\"er\"}'),
(53, 'sdf', '<p>wer</p>', '2023-07-01 15:39:33', 1, 1, 'uploads/resized_israel.png', 0, 121, 112, 1, '{\"input-0\":\"rtyu\"}'),
(54, 'Example Sequence', '<h2>Lorem, ipsum dolor </h2><p>Sit amet consectetur adipisicing elit. Beatae, fugit repellendus, non perferendis illum iusto ipsam, incidunt ut sunt sint nostrum molestiae officia eveniet <a href=\"www.google.com\" rel=\"noopener noreferrer\" target=\"_blank\">ullam </a>molestias illo maiores velit atque.</p><p><u>Incidunt </u>ut sunt sint nostrum molestiae officia eveniet ullam molestias illo <strong>maiores </strong>velit atque.</p><ol><li>molestiae </li><li>nostrum </li><li>illum </li></ol>', '2023-07-01 15:49:21', 3, 5, 'uploads/resized_tt.jpg', 0, 121, 110, 1, '{\"input-0\":\"seq1\",\"input-1\":\"seq2\",\"input-2\":\"seq3\",\"input-3\":\"seq4\"}'),
(55, 'tdknnew2', '<p>loihg <strong>sdfkn </strong>adsf</p>', '2023-07-02 22:44:31', 1, 1, 'uploads/resized_exit.png', 0, 121, 110, 1, '{\"input-0\":\"df\",\"input-1\":\"dfer\",\"input-2\":\"reee\"}');

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
(38, 'tasks for 26.06', 0, 22, 2),
(39, 'tasks for 30.06', 1, 22, 2),
(49, 'taskse', 1, 22, 2),
(57, 'java 5.07', 1, 26, 4),
(58, 'java 23.6', 1, 26, 4);

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
(9, 18),
(10, 18),
(11, 39),
(11, 49),
(12, 38),
(12, 49),
(13, 38),
(13, 50),
(13, 51),
(13, 52),
(14, 56),
(21, 38),
(23, 57),
(24, 58),
(25, 58);

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
(146, 0);

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
(122, 4),
(122, 5),
(146, 4),
(146, 5);

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
(2, 'Matching Pairs', 'match.jpg');

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
(146, 'teacher', 'kate@gmail.com', '$2b$10$.6lVybCmI4gtJLhG74/5SOBmH5gCxJGmy6SXBOa5.lhFbsDA0bcsu', 'Kate', 'Branch', 'avatar-2.svg');

--
-- Indexes for dumped tables
--

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
  ADD PRIMARY KEY (`id_user`,`id_task`);

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
  ADD PRIMARY KEY (`id_task`,`id_tskFolder`);

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
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id_category` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=119;

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
  MODIFY `id_subject` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `id_task` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `taskfolder`
--
ALTER TABLE `taskfolder`
  MODIFY `id_tskFolder` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `task_template`
--
ALTER TABLE `task_template`
  MODIFY `id_template` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `template`
--
ALTER TABLE `template`
  MODIFY `id_template` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=148;

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
