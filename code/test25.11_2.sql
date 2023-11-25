-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 25, 2023 at 08:58 PM
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
(124, 61, 92, 0, '2023-11-25 19:55:19'),
(124, 78, 92, 0, '2023-11-25 19:55:19'),
(125, 61, 92, 0, '2023-11-25 19:55:19'),
(125, 78, 92, 0, '2023-11-25 19:55:19'),
(126, 61, 92, 0, '2023-11-25 19:55:19'),
(126, 78, 92, 0, '2023-11-25 19:55:19'),
(127, 33, 87, 0, '2023-08-25 16:40:46'),
(127, 34, 66, 0, '2023-07-08 16:49:43'),
(127, 36, 80, 0, '2023-08-15 09:59:40'),
(127, 53, 75, 0, '2023-08-15 04:30:21'),
(127, 54, 68, 0, '2023-07-12 13:47:08'),
(127, 66, 71, 0, '2023-07-31 08:19:46'),
(127, 66, 88, 0, '2023-08-30 15:12:51'),
(127, 71, 88, 0, '2023-08-30 15:12:51'),
(128, 33, 87, 0, '2023-08-25 16:40:46'),
(128, 34, 66, 0, '2023-07-08 16:49:43'),
(128, 36, 80, 0, '2023-08-15 09:59:40'),
(128, 53, 75, 1, '2023-08-15 04:30:21'),
(128, 54, 68, 0, '2023-07-12 13:47:08'),
(128, 66, 71, 0, '2023-07-31 08:19:46'),
(128, 66, 88, 0, '2023-08-30 15:12:51'),
(128, 71, 88, 0, '2023-08-30 15:12:51'),
(131, 33, 87, 0, '2023-08-25 16:40:46'),
(131, 34, 66, 0, '2023-07-08 16:49:43'),
(131, 36, 80, 1, '2023-08-15 09:59:40'),
(131, 53, 75, 0, '2023-08-15 04:30:21'),
(131, 54, 68, 0, '2023-07-12 13:47:08'),
(131, 66, 71, 0, '2023-07-31 08:19:46'),
(131, 66, 88, 0, '2023-08-30 15:12:51'),
(131, 71, 88, 0, '2023-08-30 15:12:51'),
(132, 52, 72, 0, '2023-08-14 20:55:22'),
(132, 53, 76, 0, '2023-08-15 04:35:46'),
(132, 69, 83, 0, '2023-08-15 10:26:24'),
(133, 52, 72, 1, '2023-08-14 20:55:22'),
(133, 53, 76, 1, '2023-08-15 04:35:46'),
(133, 61, 92, 1, '2023-11-25 19:55:19'),
(133, 69, 83, 1, '2023-08-15 10:26:24'),
(133, 78, 92, 0, '2023-11-25 19:55:19'),
(134, 52, 72, 0, '2023-08-14 20:55:22'),
(134, 53, 76, 1, '2023-08-15 04:35:46'),
(135, 61, 92, 0, '2023-11-25 19:55:19'),
(135, 78, 92, 0, '2023-11-25 19:55:19'),
(138, 61, 92, 0, '2023-11-25 19:55:19'),
(138, 78, 92, 0, '2023-11-25 19:55:19'),
(143, 33, 87, 0, '2023-08-25 16:40:46'),
(143, 36, 80, 0, '2023-08-15 09:59:40'),
(143, 53, 75, 0, '2023-08-15 04:30:21'),
(143, 66, 88, 0, '2023-08-30 15:12:51'),
(143, 71, 88, 0, '2023-08-30 15:12:51'),
(144, 33, 87, 0, '2023-08-25 16:40:46'),
(144, 36, 80, 0, '2023-08-15 09:59:40'),
(144, 53, 75, 0, '2023-08-15 04:30:21'),
(144, 66, 88, 0, '2023-08-30 15:12:51'),
(144, 71, 88, 0, '2023-08-30 15:12:51'),
(145, 33, 87, 1, '2023-08-25 16:40:46'),
(145, 34, 66, 0, '2023-07-08 16:49:43'),
(145, 36, 80, 0, '2023-08-15 09:59:40'),
(145, 53, 75, 1, '2023-08-15 04:30:21'),
(145, 54, 68, 1, '2023-07-12 13:47:08'),
(145, 61, 57, 0, '2023-07-12 13:25:44'),
(145, 62, 58, 0, '2023-07-12 13:25:58'),
(145, 66, 71, 0, '2023-07-31 08:19:46'),
(145, 66, 88, 0, '2023-08-30 15:12:51'),
(145, 71, 88, 0, '2023-08-30 15:12:51');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `student_task`
--
ALTER TABLE `student_task`
  ADD PRIMARY KEY (`id_user`,`id_task`,`id_tskFolder`),
  ADD KEY `id_task` (`id_task`),
  ADD KEY `id_tskFolder` (`id_tskFolder`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `student_task`
--
ALTER TABLE `student_task`
  ADD CONSTRAINT `student_task_ibfk_1` FOREIGN KEY (`id_task`) REFERENCES `task` (`id_task`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `student_task_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `student_task_ibfk_3` FOREIGN KEY (`id_tskFolder`) REFERENCES `taskfolder` (`id_tskFolder`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
