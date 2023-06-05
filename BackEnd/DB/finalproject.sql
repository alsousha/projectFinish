-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 05, 2023 at 10:30 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `finalproject`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id_category` int(3) NOT NULL,
  `category_name` varchar(15) NOT NULL,
  `date_create` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_subject` int(3) NOT NULL,
  `id_user` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id_category`, `category_name`, `date_create`, `id_subject`, `id_user`) VALUES
(1, 'test1', '2023-06-04 19:01:35', 3, 49),
(4, 'test2', '2023-06-05 18:48:35', 3, 49);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `certification`
--

INSERT INTO `certification` (`id_certif`, `name_certif`, `point`, `flag_as_available`, `description`, `img_url`) VALUES
(1, 'test1', 12, 1, 'hfhfghfgh', '');

-- --------------------------------------------------------

--
-- Table structure for table `class`
--

CREATE TABLE `class` (
  `id_class` int(3) NOT NULL,
  `class_name` varchar(15) NOT NULL,
  `class_level` int(12) NOT NULL,
  `id_teacher` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `class`
--

INSERT INTO `class` (`id_class`, `class_name`, `class_level`, `id_teacher`) VALUES
(1, 'geo class', 12, 66),
(2, 'math class', 12, 66),
(3, 'test class', 8, 66),
(4, 'test class', 8, 66);

-- --------------------------------------------------------

--
-- Table structure for table `class_folder`
--

CREATE TABLE `class_folder` (
  `id_classFolder` int(3) NOT NULL,
  `classFolder_name` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id_user` int(3) NOT NULL,
  `class_level` int(2) UNSIGNED NOT NULL,
  `total_points` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id_user`, `class_level`, `total_points`) VALUES
(38, 0, 0),
(47, 0, 0),
(50, 0, 0),
(54, 0, 0),
(60, 12, 0),
(61, 12, 0),
(62, 12, 0),
(64, 12, 0);

-- --------------------------------------------------------

--
-- Table structure for table `student_certification`
--

CREATE TABLE `student_certification` (
  `id_user` int(3) NOT NULL,
  `id_certif` int(3) NOT NULL,
  `data_get` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `student_certification`
--

INSERT INTO `student_certification` (`id_user`, `id_certif`, `data_get`) VALUES
(64, 1, '2023-06-03 14:01:04');

-- --------------------------------------------------------

--
-- Table structure for table `student_class`
--

CREATE TABLE `student_class` (
  `id_user` int(3) NOT NULL,
  `id_class` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `student_class`
--

INSERT INTO `student_class` (`id_user`, `id_class`) VALUES
(62, 1),
(64, 1),
(64, 2);

-- --------------------------------------------------------

--
-- Table structure for table `student_task`
--

CREATE TABLE `student_task` (
  `id_user` int(3) NOT NULL,
  `id_task` int(3) NOT NULL,
  `is_task_done` tinyint(1) NOT NULL,
  `date` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE `subject` (
  `id_subject` int(3) NOT NULL,
  `subject_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  `task_name` varchar(15) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `task_inner` longtext NOT NULL,
  `count_points` int(2) NOT NULL,
  `id_teacher` int(3) NOT NULL,
  `id_class` int(3) NOT NULL,
  `id_taskTemplate` int(3) NOT NULL,
  `id_category` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `task_folder`
--

CREATE TABLE `task_folder` (
  `id_tskFolder` int(3) NOT NULL,
  `tskFolder_name` varchar(15) NOT NULL,
  `id_classFolder` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `task_tasksfolder`
--

CREATE TABLE `task_tasksfolder` (
  `id_task` int(11) NOT NULL,
  `id_tskFolder` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `task_template`
--

CREATE TABLE `task_template` (
  `id_template` int(3) NOT NULL,
  `template_name` varchar(10) NOT NULL,
  `template_inner` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `teacher`
--

CREATE TABLE `teacher` (
  `id_user` int(3) NOT NULL,
  `count_of_tasks` int(3) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `teacher`
--

INSERT INTO `teacher` (`id_user`, `count_of_tasks`) VALUES
(49, 0),
(56, 0),
(58, 0),
(59, 0),
(66, 0),
(78, 0);

-- --------------------------------------------------------

--
-- Table structure for table `teacher_sbjs`
--

CREATE TABLE `teacher_sbjs` (
  `id_user` int(3) NOT NULL,
  `id_subject` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `teacher_sbjs`
--

INSERT INTO `teacher_sbjs` (`id_user`, `id_subject`) VALUES
(49, 3),
(59, 12),
(66, 1),
(78, 2),
(78, 3);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `role`, `email`, `password`, `name`, `lastname`, `img_url`) VALUES
(36, 'teacher', 'alex@df.dsf', '$2b$10$sI2xoY2Ubh/hcBU8hf2TtucVRgFYuOUeixCwI0HhM79cDyAGf5QEu', 'Alexx', 'agronvv', '0'),
(38, 'student', 'alexstudent@df.dsf', '$2b$10$.gv4uI5zOxcbYWP9XNSOyeBbFcwoEvZUhV.jCCzH7Qw3goDs/PVTC', 'Alexstud', 'agronovdd', '0'),
(47, 'student', 'qwe@qwe.we', '$2b$10$dSzxiUDrtMulnFTU6GHTU.JJhUnVYDg24pyMjwDAW9gXztrCzhsJe', 'Ben', 'Las', '0'),
(49, 'teacher', 'qwe@qwe.qwe', '$2b$10$FOwLiYhwo0ZLZbyYi9SWvuyjP/kWlMk2np6UhS7CQmKY6dkeYY4yy', 'Benw', 'Dan', '0'),
(50, 'student', 'qaz@qaz.qa', '$2b$10$dySC6c0qqySZaoVDDb4wF.52Y2QU1DfPkyFTvS.oivuffHh71r/qi', 'Stud', 'dd', '0'),
(52, 'student', 'Istuduuu@df.dsf', '$2b$10$LYKATxS9LX6boxrci5zJl.qqBifu2PUYT.dKIdLGonynkAKyXU2Qe', 'alsouuuuu', 'mustuduuuu', '0'),
(53, 'student', 'Istuduuuert@df.dsf', '$2b$10$kkcSR.7P0WktWYp8NDzEoOqEJUhZcAkLymSTtFmE4URPXMa022oIC', 'alsouuuuu23', 'mustuduuuu', '0'),
(54, 'student', 'Istuduuuert4@df.dsf', '$2b$10$fqhmy9nAJliaSUUUj6g8ee5Wq6YXCIIbnPZVjfIE3ZSQLOfCx8Q6e', 'alsouuuuu234', 'mustuduuuu', '0'),
(55, 'teacher', 'Istuduuuert445@df.dsf', '$2b$10$OAyPUn0.xHED5Sbyln3TAepBwRZCxKkE8W3qhN6KXRXmt5L36a8X6', 'alsouuuuu23445', 'mustuduuuu', '0'),
(56, 'teacher', 'Isdfs@df.dsf', '$2b$10$KjxwPxByfmFiN7RrGtKT9ukWzizXLsHxV2DPptZepd8fIjQAcVNWW', 'alfsdsd', 'mustuduuuu', '0'),
(57, 'teacher', 'newtest@df.dsf', '$2b$10$l8OND86VEgUSJH0zc58AEusbBHPLqByGTApRX2uux4IGz5DEKl3ri', 'newtest', 'new', ''),
(58, 'teacher', 'newtest2@df.dsf', '$2b$10$8/RjVC0m1693qg4LAt6i/uSlHg5brQRNUJPoub76kqIf7HJ7fKiSO', 'newtest2', 'new', ''),
(59, 'teacher', 'newtest22@df.dsf', '$2b$10$dUp.OyQ2MJGT3EV/yzTVa.wYy.6zfliLO.bXHr.JvvGQpLRWCxIC.', 'newtest22', 'new', ''),
(60, 'student', 'newstud22@df.dsf', '$2b$10$oF5ustMUvp9BGeflJ1iBC.fovWWAaovrFTzgxcui10j7LzCZCDvKu', 'newstud22', 'new', ''),
(61, 'student', 'newstud223@df.dsf', '$2b$10$iDhEi5HZOAe.L3n7xAO7ROYvXfDmrpHvEzkGbRLgKcGK9ETCW.oea', 'newstud223', 'new', ''),
(62, 'student', 'newstud23@df.dsf', '$2b$10$MkZIionzlwUwrj4Pqb2I4.0xQh3DJ.CoLsZHPAYHxUuHFAwNt63oe', 'newstud23', 'new', ''),
(64, 'student', 'newstud2311@df.dsf', '$2b$10$ddTmCMCE2YF6QECMs5vTa.mDtYfqkIKIev0vQ25vcK3rpnEGWv0Nq', 'newstud2311', 'new', ''),
(66, 'teacher', 'testteacher1@df.dsf', '$2b$10$mee0DipJ5miS.F2gWC2y1uTonRgeQ0QOGoLa/A9Lt6VrcScV4SuS2', 'testteacher1', 'new', ''),
(78, 'teacher', 'testteacher2@df.dsf', '$2b$10$8ej63s3DrCj1xD2wqzrQsOkDOFTiPbANRUwJMTbek86VoE0OhumJ2', 'testteacher2', 'new', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id_category`),
  ADD UNIQUE KEY `uk_category_user_category` (`id_user`,`id_category`),
  ADD KEY `fk_category_subject` (`id_subject`);

--
-- Indexes for table `certification`
--
ALTER TABLE `certification`
  ADD PRIMARY KEY (`id_certif`);

--
-- Indexes for table `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`id_class`,`id_teacher`),
  ADD KEY `fk_class_teacher` (`id_teacher`);

--
-- Indexes for table `class_folder`
--
ALTER TABLE `class_folder`
  ADD PRIMARY KEY (`id_classFolder`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id_user`);

--
-- Indexes for table `student_certification`
--
ALTER TABLE `student_certification`
  ADD PRIMARY KEY (`id_user`,`id_certif`),
  ADD KEY `fk_student_certification_certification` (`id_certif`);

--
-- Indexes for table `student_class`
--
ALTER TABLE `student_class`
  ADD PRIMARY KEY (`id_user`,`id_class`),
  ADD KEY `fk_student_class_class` (`id_class`);

--
-- Indexes for table `student_task`
--
ALTER TABLE `student_task`
  ADD PRIMARY KEY (`id_user`,`id_task`),
  ADD KEY `fk_student_task_task` (`id_task`);

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
  ADD KEY `fk_task_category` (`id_category`),
  ADD KEY `fk_task_class` (`id_class`),
  ADD KEY `fk_task_task_template` (`id_taskTemplate`),
  ADD KEY `fk_task_teacher` (`id_teacher`);

--
-- Indexes for table `task_folder`
--
ALTER TABLE `task_folder`
  ADD PRIMARY KEY (`id_tskFolder`),
  ADD KEY `fk_task_folder_class_folder` (`id_classFolder`);

--
-- Indexes for table `task_tasksfolder`
--
ALTER TABLE `task_tasksfolder`
  ADD PRIMARY KEY (`id_task`,`id_tskFolder`),
  ADD KEY `fk_task_tasksfolder_task_folder` (`id_tskFolder`);

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
  ADD PRIMARY KEY (`id_user`,`id_subject`);

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
  MODIFY `id_category` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `certification`
--
ALTER TABLE `certification`
  MODIFY `id_certif` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `class_folder`
--
ALTER TABLE `class_folder`
  MODIFY `id_classFolder` int(3) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subject`
--
ALTER TABLE `subject`
  MODIFY `id_subject` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `id_task` int(3) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `task_folder`
--
ALTER TABLE `task_folder`
  MODIFY `id_tskFolder` int(3) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `task_template`
--
ALTER TABLE `task_template`
  MODIFY `id_template` int(3) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `category`
--
ALTER TABLE `category`
  ADD CONSTRAINT `category_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `teacher` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_category_subject` FOREIGN KEY (`id_subject`) REFERENCES `subject` (`id_subject`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `class`
--
ALTER TABLE `class`
  ADD CONSTRAINT `fk_class_teacher` FOREIGN KEY (`id_teacher`) REFERENCES `teacher` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student_certification`
--
ALTER TABLE `student_certification`
  ADD CONSTRAINT `fk_student_certification_certification` FOREIGN KEY (`id_certif`) REFERENCES `certification` (`id_certif`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_student_certification_student` FOREIGN KEY (`id_user`) REFERENCES `student` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student_class`
--
ALTER TABLE `student_class`
  ADD CONSTRAINT `fk_student_class_class` FOREIGN KEY (`id_class`) REFERENCES `class` (`id_class`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_student_class_student` FOREIGN KEY (`id_user`) REFERENCES `student` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student_task`
--
ALTER TABLE `student_task`
  ADD CONSTRAINT `fk_student_task_student` FOREIGN KEY (`id_user`) REFERENCES `student` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_student_task_task` FOREIGN KEY (`id_task`) REFERENCES `task` (`id_task`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `fk_task_category` FOREIGN KEY (`id_category`) REFERENCES `category` (`id_category`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_task_class` FOREIGN KEY (`id_class`) REFERENCES `class` (`id_class`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_task_task_template` FOREIGN KEY (`id_taskTemplate`) REFERENCES `task_template` (`id_template`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_task_teacher` FOREIGN KEY (`id_teacher`) REFERENCES `teacher` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `task_folder`
--
ALTER TABLE `task_folder`
  ADD CONSTRAINT `fk_task_folder_class_folder` FOREIGN KEY (`id_classFolder`) REFERENCES `class_folder` (`id_classFolder`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `task_tasksfolder`
--
ALTER TABLE `task_tasksfolder`
  ADD CONSTRAINT `fk_task_tasksfolder_task` FOREIGN KEY (`id_task`) REFERENCES `task` (`id_task`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_task_tasksfolder_task_folder` FOREIGN KEY (`id_tskFolder`) REFERENCES `task_folder` (`id_tskFolder`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `teacher`
--
ALTER TABLE `teacher`
  ADD CONSTRAINT `teacher_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `teacher_sbjs`
--
ALTER TABLE `teacher_sbjs`
  ADD CONSTRAINT `teacher_sbjs_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `teacher` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
