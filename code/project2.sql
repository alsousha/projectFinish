-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 02, 2023 at 09:32 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project2`
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
  `class_level` int(12) NOT NULL,
  `id_teacher` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `class_folder`
--

CREATE TABLE `class_folder` (
  `id_classFolder` int(3) NOT NULL,
  `classFolder_name` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id_user` int(3) NOT NULL,
  `class_level` int(2) UNSIGNED NOT NULL,
  `total_points` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id_user`, `class_level`, `total_points`) VALUES
(38, 0, 0),
(47, 0, 0),
(50, 0, 0);

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
(2, 'english');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `task_folder`
--

CREATE TABLE `task_folder` (
  `id_tskFolder` int(3) NOT NULL,
  `tskFolder_name` varchar(15) NOT NULL,
  `id_classFolder` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `task_tasksfolder`
--

CREATE TABLE `task_tasksfolder` (
  `id_task` int(3) NOT NULL,
  `id_tskFolder` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `task_template`
--

CREATE TABLE `task_template` (
  `id_template` int(3) NOT NULL,
  `template_name` varchar(10) NOT NULL,
  `template_inner` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `teacher`
--

CREATE TABLE `teacher` (
  `id_user` int(30) NOT NULL,
  `count_of_tasks` int(3) NOT NULL DEFAULT 0,
  `id_subject` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teacher`
--

INSERT INTO `teacher` (`id_user`, `count_of_tasks`, `id_subject`) VALUES
(46, 0, 2),
(48, 0, NULL),
(49, 0, 2);

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
  `img_url` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `role`, `email`, `password`, `name`, `lastname`, `img_url`) VALUES
(36, 'teacher', 'alex@df.dsf', '$2b$10$GyDxPheIF1GxZmU712w3puuFgixTE09I8URgFtBzCu5s70I.pRAZm', 'Alex', 'agronov', 0),
(38, 'student', 'alexstudent@df.dsf', '$2b$10$.gv4uI5zOxcbYWP9XNSOyeBbFcwoEvZUhV.jCCzH7Qw3goDs/PVTC', 'Alexstud', 'agronovdd', 0),
(46, 'teacher', 'asd@asd.asd', '$2b$10$E0ciFUB07pYF7J.OLs9jwOzaTkecT8tYnN965w6iQNgEARmeccewK', 'fgh', 'Bogdanov', 0),
(47, 'student', 'qwe@qwe.we', '$2b$10$dSzxiUDrtMulnFTU6GHTU.JJhUnVYDg24pyMjwDAW9gXztrCzhsJe', 'Ben', 'Las', 0),
(48, 'teacher', 'bj@gbj.h', '$2b$10$xNwy1.1kIq1MUJWCkC8s9ekiYzX.jlzqS.myIzDcMOsuYueyuaCHa', 'bhj', ' bhjy', 0),
(49, 'teacher', 'qwe@qwe.qwe', '$2b$10$FOwLiYhwo0ZLZbyYi9SWvuyjP/kWlMk2np6UhS7CQmKY6dkeYY4yy', 'Benw', 'Dan', 0),
(50, 'student', 'qaz@qaz.qa', '$2b$10$dySC6c0qqySZaoVDDb4wF.52Y2QU1DfPkyFTvS.oivuffHh71r/qi', 'Stud', 'dd', 0);

--
-- Triggers `user`
--
DELIMITER $$
CREATE TRIGGER `asd` AFTER INSERT ON `user` FOR EACH ROW BEGIN
  IF NEW.role = 'student' THEN
    INSERT INTO `student` (`id_user`) VALUES (NEW.id_user);
  END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `user_insert_trigger` AFTER INSERT ON `user` FOR EACH ROW BEGIN
  IF NEW.role = 'teacher' THEN
    INSERT INTO `teacher` (`id_user`) VALUES (NEW.id_user);
  END IF;
END
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id_category`);

--
-- Indexes for table `certification`
--
ALTER TABLE `certification`
  ADD PRIMARY KEY (`id_certif`);

--
-- Indexes for table `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`id_class`);

--
-- Indexes for table `class_folder`
--
ALTER TABLE `class_folder`
  ADD PRIMARY KEY (`id_classFolder`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `student_certification`
--
ALTER TABLE `student_certification`
  ADD PRIMARY KEY (`id_user`,`id_certif`);

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
  ADD PRIMARY KEY (`id_task`);

--
-- Indexes for table `task_folder`
--
ALTER TABLE `task_folder`
  ADD PRIMARY KEY (`id_tskFolder`);

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
  ADD KEY `teacher_ibfk_1` (`id_user`),
  ADD KEY `id_subject` (`id_subject`);

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
  MODIFY `id_category` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `certification`
--
ALTER TABLE `certification`
  MODIFY `id_certif` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `class`
--
ALTER TABLE `class`
  MODIFY `id_class` int(3) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `class_folder`
--
ALTER TABLE `class_folder`
  MODIFY `id_classFolder` int(3) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subject`
--
ALTER TABLE `subject`
  MODIFY `id_subject` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
  MODIFY `id_user` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `teacher`
--
ALTER TABLE `teacher`
  ADD CONSTRAINT `teacher_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `teacher_ibfk_2` FOREIGN KEY (`id_subject`) REFERENCES `subject` (`id_subject`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
