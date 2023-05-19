-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 19, 2023 at 09:58 AM
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

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id_category`, `category_name`, `date_create`, `id_subject`) VALUES
(1, 'numbers', '2023-01-01', 1),
(2, 'multiplication', '2023-01-03', 1),
(3, 'division', '2023-01-11', 1),
(4, 'variables', '2023-01-03', 2),
(5, 'strings', '2023-01-11', 2),
(6, 'variables', '2023-01-14', 3),
(7, 'variables', '2023-01-15', 3),
(8, 'Israel', '2023-02-03', 4),
(9, 'Europe', '2023-02-11', 4);

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

--
-- Dumping data for table `certification`
--

INSERT INTO `certification` (`id_certif`, `name_certif`, `point`, `flag_as_available`, `description`, `img_url`) VALUES
(1, 'certification1', 15, 1, 'This is certification 1', 'url1'),
(2, 'certification2', 20, 1, 'This is certification 2', 'url2'),
(3, 'certification3', 30, 1, 'This is certification 3', 'url3'),
(4, 'certification4', 40, 1, 'This is certification 4', 'url4');

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

--
-- Dumping data for table `class`
--

INSERT INTO `class` (`id_class`, `class_name`, `class_level`, `id_teacher`) VALUES
(1, 'a1', 1, 123816023),
(2, 'a2', 2, 213816023),
(3, 'b2', 2, 230331111),
(4, 'c1', 3, 333306023);

-- --------------------------------------------------------

--
-- Table structure for table `class_folder`
--

CREATE TABLE `class_folder` (
  `id_classFolder` int(10) NOT NULL,
  `classFolder_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `class_folder`
--

INSERT INTO `class_folder` (`id_classFolder`, `classFolder_name`) VALUES
(1, 'a1'),
(2, 'a2'),
(3, 'b2'),
(4, 'c1');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id_user` int(20) NOT NULL,
  `id_class` int(10) DEFAULT NULL,
  `total_points` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id_user`, `id_class`, `total_points`) VALUES
(230306023, 1, 20),
(230334523, 1, 40),
(231816023, 2, 35),
(321816023, 3, 45),
(321816092, 4, 15),
(333306036, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `student_certification`
--

CREATE TABLE `student_certification` (
  `id_user` int(10) NOT NULL,
  `id_certif` int(10) NOT NULL,
  `data_get` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `student_certification`
--

INSERT INTO `student_certification` (`id_user`, `id_certif`, `data_get`) VALUES
(230306023, 1, '2022-02-04'),
(230306023, 2, '2022-02-20'),
(230334523, 1, '2022-02-06'),
(230334523, 2, '2022-02-15'),
(230334523, 3, '2022-02-25'),
(230334523, 4, '2022-03-03'),
(231816023, 1, '2022-02-10'),
(231816023, 2, '2022-02-20'),
(231816023, 3, '2022-02-28'),
(321816023, 1, '2022-02-10'),
(321816023, 2, '2022-02-18'),
(321816023, 3, '2022-02-25'),
(321816023, 4, '2022-03-15'),
(321816092, 1, '2022-02-10');

-- --------------------------------------------------------

--
-- Table structure for table `student_task`
--

CREATE TABLE `student_task` (
  `id_user` int(10) NOT NULL,
  `id_task` int(10) NOT NULL,
  `is_task_done` tinyint(1) NOT NULL,
  `date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `student_task`
--

INSERT INTO `student_task` (`id_user`, `id_task`, `is_task_done`, `date`) VALUES
(230306023, 1, 1, '2023-02-13'),
(230306023, 2, 1, '2023-02-15'),
(230306023, 3, 1, '2023-02-16'),
(230306023, 4, -1, NULL),
(230306023, 5, -1, NULL),
(230334523, 1, 1, '2023-01-23'),
(230334523, 2, 1, '2023-02-01'),
(230334523, 3, 1, '2023-02-08'),
(230334523, 4, 1, '2023-02-10'),
(230334523, 5, -1, NULL),
(231816023, 1, 1, '2023-01-25'),
(231816023, 2, 1, '2023-02-01'),
(231816023, 3, -1, NULL),
(231816023, 4, -1, NULL),
(231816023, 5, -1, NULL),
(321816023, 1, 1, '2023-01-25'),
(321816023, 2, 1, '2023-02-01'),
(321816023, 3, 1, '2023-02-25'),
(321816023, 4, -1, NULL),
(321816023, 5, -1, NULL),
(321816092, 1, 1, '2023-02-11'),
(321816092, 2, 1, '2023-02-13'),
(321816092, 3, -1, NULL),
(321816092, 4, -1, NULL),
(321816092, 5, -1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE `subject` (
  `id_subject` int(10) NOT NULL,
  `subject_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `subject`
--

INSERT INTO `subject` (`id_subject`, `subject_name`) VALUES
(1, 'math'),
(2, 'java'),
(3, 'python'),
(4, 'history');

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `id_task` int(10) NOT NULL,
  `task_name` varchar(20) NOT NULL,
  `create_date` date NOT NULL,
  `task_inner` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`task_inner`)),
  `count_points` int(10) NOT NULL,
  `id_teacher` int(10) NOT NULL,
  `id_class` int(10) NOT NULL,
  `id_taskTemplate` int(10) NOT NULL,
  `id_category` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`id_task`, `task_name`, `create_date`, `task_inner`, `count_points`, `id_teacher`, `id_class`, `id_taskTemplate`, `id_category`) VALUES
(1, 'task1', '2022-05-05', '1', 10, 123816023, 1, 1, 1),
(2, 'task2', '2022-05-15', '2', 5, 213816023, 2, 2, 2),
(3, 'task3', '2022-05-25', '3', 8, 230331111, 3, 3, 3),
(4, 'task4', '2022-07-15', '4', 12, 333306023, 3, 3, 3),
(5, 'task5', '2022-10-15', '5', 7, 123816023, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `task_folder`
--

CREATE TABLE `task_folder` (
  `id_tskFolder` int(10) NOT NULL,
  `tskFolder_name` varchar(15) NOT NULL,
  `id_classFolder` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `task_folder`
--

INSERT INTO `task_folder` (`id_tskFolder`, `tskFolder_name`, `id_classFolder`) VALUES
(1, 'taskfolder1', 1),
(2, 'taskfolder2', 2),
(3, 'taskfolder3', 3),
(4, 'taskfolder4', 4);

-- --------------------------------------------------------

--
-- Table structure for table `task_tasksfolder`
--

CREATE TABLE `task_tasksfolder` (
  `id_task` int(10) NOT NULL,
  `id_tskFolder` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `task_tasksfolder`
--

INSERT INTO `task_tasksfolder` (`id_task`, `id_tskFolder`) VALUES
(1, 1),
(1, 2),
(2, 2),
(2, 3),
(3, 3),
(3, 4),
(4, 4),
(5, 4);

-- --------------------------------------------------------

--
-- Table structure for table `task_template`
--

CREATE TABLE `task_template` (
  `id_template` int(10) NOT NULL,
  `template_name` varchar(15) NOT NULL,
  `template_inner` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `task_template`
--

INSERT INTO `task_template` (`id_template`, `template_name`, `template_inner`) VALUES
(1, 'template num1', 'inner1'),
(2, 'template num2', 'inner2'),
(3, 'template num3', 'inner3'),
(4, 'template num4', 'inner4'),
(5, 'template num5', 'inner5'),
(6, 'template num6', 'inner6');

-- --------------------------------------------------------

--
-- Table structure for table `teacher`
--

CREATE TABLE `teacher` (
  `id_user` int(10) NOT NULL,
  `count_of_tasks` int(10) NOT NULL,
  `id_subject` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `teacher`
--

INSERT INTO `teacher` (`id_user`, `count_of_tasks`, `id_subject`) VALUES
(123816023, 2, 1),
(213816023, 2, 2),
(230331111, 2, 3),
(333306023, 2, 4),
(333306032, 0, 1),
(333306034, 0, 1),
(333306035, 0, 3);

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
  `lastName` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `role`, `email`, `password`, `name`, `lastName`) VALUES
(321816092, 'student', 'alex@gmail.com', 12345, 'Alex', 'Agronov'),
(123816023, 'teacher', 'Alsu@gmail.com', 12345, 'Alsu', 'Bogdanova'),
(333306023, 'teacher', 'Anton@gmail.com', 12345, 'Anton', 'Antonov'),
(333306024, 'teacher', 'asd@gmail.com', 12345678, 'asdf', 'fdsa'),
(230334523, 'student', 'Avi@gmail.com', 12345, 'Avi', 'Abramov'),
(213816023, 'teacher', 'Daria@gmail.com', 12345, 'Daria', 'Darina'),
(230331111, 'teacher', 'Dario@gmail.com', 12345, 'Dario', 'Mario'),
(333306025, 'teacher', 'john.doe@example.com', 123, 'John', 'Doe'),
(333306027, 'teacher', 'john.doegfgf@example.com', 12367, 'gfdgfdgn', 'fgfd'),
(231816023, 'student', 'Katerina@gmail.com', 12345, 'Katerina', 'Kate'),
(230306023, 'student', 'Mariya@gmail.com', 12345, 'Mariya', 'Mery'),
(333306034, 'teacher', 'test.doegfgf2@example.com', 323678902, 'test2name', 'test2'),
(333306035, 'teacher', 'test.doegfgf3@example.com', 323678902, 'test3name', 'test3'),
(333306032, 'teacher', 'test.doegfgf@example.com', 12367890, 'testname', 'test'),
(333306036, 'student', 'teststud@gmail.com', 321856325, 'firststud', 'firstud'),
(321816023, 'student', 'yossi@gmail.com', 12345, 'Yossi', 'Yosef');

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
  ADD KEY `id_class` (`id_class`);

--
-- Indexes for table `student_certification`
--
ALTER TABLE `student_certification`
  ADD PRIMARY KEY (`id_user`,`id_certif`),
  ADD KEY `id_certif` (`id_certif`);

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
-- Indexes for table `task_folder`
--
ALTER TABLE `task_folder`
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
  ADD PRIMARY KEY (`email`),
  ADD UNIQUE KEY `id_user` (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=333306037;

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
  ADD CONSTRAINT `student_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`),
  ADD CONSTRAINT `student_ibfk_3` FOREIGN KEY (`id_class`) REFERENCES `class` (`id_class`);

--
-- Constraints for table `student_certification`
--
ALTER TABLE `student_certification`
  ADD CONSTRAINT `student_certification_ibfk_1` FOREIGN KEY (`id_certif`) REFERENCES `certification` (`id_certif`),
  ADD CONSTRAINT `student_certification_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `student` (`id_user`);

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
-- Constraints for table `task_folder`
--
ALTER TABLE `task_folder`
  ADD CONSTRAINT `task_folder_ibfk_1` FOREIGN KEY (`id_classFolder`) REFERENCES `class_folder` (`id_classFolder`);

--
-- Constraints for table `task_tasksfolder`
--
ALTER TABLE `task_tasksfolder`
  ADD CONSTRAINT `task_tasksfolder_ibfk_1` FOREIGN KEY (`id_task`) REFERENCES `task` (`id_task`),
  ADD CONSTRAINT `task_tasksfolder_ibfk_2` FOREIGN KEY (`id_tskFolder`) REFERENCES `task_folder` (`id_tskFolder`);

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
