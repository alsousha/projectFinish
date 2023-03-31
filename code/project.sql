-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 31, 2023 at 12:34 PM
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
-- Database: `project`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id_category` int(10) NOT NULL,
  `category_name` varchar(15) NOT NULL,
  `date_create` date NOT NULL,
  `id_subject` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `certification`
--

CREATE TABLE `certification` (
  `id_certif` int(10) NOT NULL,
  `name_certif` varchar(20) NOT NULL,
  `point` int(10) NOT NULL,
  `flag_as_available` tinyint(1) NOT NULL,
  `description` varchar(100) NOT NULL,
  `img_url` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `class`
--

CREATE TABLE `class` (
  `id_class` int(10) NOT NULL,
  `class_name` varchar(15) NOT NULL,
  `class_level` int(10) NOT NULL,
  `id_teacher` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `class_folder`
--

CREATE TABLE `class_folder` (
  `id_classFolder` int(10) NOT NULL,
  `classFolder_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id_user` int(20) NOT NULL,
  `total_points` int(10) NOT NULL,
  `id_class` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `student_certification`
--

CREATE TABLE `student_certification` (
  `id_user` int(10) NOT NULL,
  `id_certif` int(10) NOT NULL,
  `data_get` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `student_class`
--

CREATE TABLE `student_class` (
  `id_user` int(10) NOT NULL,
  `id_class` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `student_task`
--

CREATE TABLE `student_task` (
  `id_user` int(10) NOT NULL,
  `id_task` int(10) NOT NULL,
  `is_task_done` tinyint(1) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE `subject` (
  `id_subject` int(10) NOT NULL,
  `subject_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `id_task` int(10) NOT NULL,
  `task_name` varchar(20) NOT NULL,
  `create_date` date NOT NULL,
  `task_inner` int(5) NOT NULL,
  `flag_is_done` tinyint(1) NOT NULL DEFAULT 0,
  `count_points` int(10) NOT NULL,
  `id_teacher` int(10) NOT NULL,
  `id_class` int(10) NOT NULL,
  `id_taskTemplate` int(10) NOT NULL,
  `id_category` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `task_foider`
--

CREATE TABLE `task_foider` (
  `id_tskFolder` int(10) NOT NULL,
  `tskFolder_name` int(10) NOT NULL,
  `id_classFolder` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `task_tasksfolder`
--

CREATE TABLE `task_tasksfolder` (
  `id_task` int(10) NOT NULL,
  `id_tskFolder` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `task_template`
--

CREATE TABLE `task_template` (
  `id_template` int(10) NOT NULL,
  `template_name` varchar(15) NOT NULL,
  `template_inner` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `teacher`
--

CREATE TABLE `teacher` (
  `id_user` int(10) NOT NULL,
  `count_of_tasks` int(10) NOT NULL,
  `id_subject` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int(20) NOT NULL,
  `role` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` int(20) NOT NULL,
  `name` varchar(15) NOT NULL,
  `lastNmae` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
-- Indexes for table `class_folder`
--
ALTER TABLE `class_folder`
  ADD PRIMARY KEY (`id_classFolder`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD UNIQUE KEY `id_user` (`id_user`) USING BTREE,
  ADD KEY `student_ibfk_1` (`id_class`);

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
  ADD PRIMARY KEY (`id_user`,`id_task`),
  ADD KEY `id_task` (`id_task`);

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
  ADD KEY `id_class` (`id_class`),
  ADD KEY `id_taskTemplate` (`id_taskTemplate`);

--
-- Indexes for table `task_foider`
--
ALTER TABLE `task_foider`
  ADD PRIMARY KEY (`id_tskFolder`),
  ADD KEY `id_classFolder` (`id_classFolder`);

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
  ADD UNIQUE KEY `id_user` (`id_user`) USING BTREE,
  ADD KEY `teacher_ibfk_1` (`id_subject`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(20) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `category`
--
ALTER TABLE `category`
  ADD CONSTRAINT `category_ibfk_1` FOREIGN KEY (`id_subject`) REFERENCES `subject` (`id_subject`);

--
-- Constraints for table `class`
--
ALTER TABLE `class`
  ADD CONSTRAINT `class_ibfk_1` FOREIGN KEY (`id_teacher`) REFERENCES `teacher` (`id_user`);

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`id_class`) REFERENCES `class` (`id_class`),
  ADD CONSTRAINT `student_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

--
-- Constraints for table `student_certification`
--
ALTER TABLE `student_certification`
  ADD CONSTRAINT `student_certification_ibfk_1` FOREIGN KEY (`id_certif`) REFERENCES `certification` (`id_certif`),
  ADD CONSTRAINT `student_certification_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `student` (`id_user`);

--
-- Constraints for table `student_class`
--
ALTER TABLE `student_class`
  ADD CONSTRAINT `student_class_ibfk_1` FOREIGN KEY (`id_class`) REFERENCES `class` (`id_class`),
  ADD CONSTRAINT `student_class_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `student` (`id_user`);

--
-- Constraints for table `student_task`
--
ALTER TABLE `student_task`
  ADD CONSTRAINT `student_task_ibfk_1` FOREIGN KEY (`id_task`) REFERENCES `task` (`id_task`),
  ADD CONSTRAINT `student_task_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `student` (`id_user`);

--
-- Constraints for table `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `task_ibfk_1` FOREIGN KEY (`id_category`) REFERENCES `category` (`id_category`),
  ADD CONSTRAINT `task_ibfk_2` FOREIGN KEY (`id_teacher`) REFERENCES `teacher` (`id_user`),
  ADD CONSTRAINT `task_ibfk_3` FOREIGN KEY (`id_class`) REFERENCES `class` (`id_class`),
  ADD CONSTRAINT `task_ibfk_4` FOREIGN KEY (`id_taskTemplate`) REFERENCES `task_template` (`id_template`);

--
-- Constraints for table `task_foider`
--
ALTER TABLE `task_foider`
  ADD CONSTRAINT `task_foider_ibfk_1` FOREIGN KEY (`id_classFolder`) REFERENCES `class_folder` (`id_classFolder`);

--
-- Constraints for table `task_tasksfolder`
--
ALTER TABLE `task_tasksfolder`
  ADD CONSTRAINT `task_tasksfolder_ibfk_1` FOREIGN KEY (`id_task`) REFERENCES `task` (`id_task`),
  ADD CONSTRAINT `task_tasksfolder_ibfk_2` FOREIGN KEY (`id_tskFolder`) REFERENCES `task_foider` (`id_tskFolder`);

--
-- Constraints for table `teacher`
--
ALTER TABLE `teacher`
  ADD CONSTRAINT `teacher_ibfk_1` FOREIGN KEY (`id_subject`) REFERENCES `subject` (`id_subject`),
  ADD CONSTRAINT `teacher_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
