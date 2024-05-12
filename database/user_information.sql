-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 12, 2024 at 05:28 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `user_information`
--

-- --------------------------------------------------------

--
-- Table structure for table `useraccount`
--

CREATE TABLE `useraccount` (
  `userName` varchar(255) NOT NULL,
  `userID` varchar(255) NOT NULL,
  `userEmail` varchar(255) NOT NULL,
  `userPassword` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `useraccount`
--

INSERT INTO `useraccount` (`userName`, `userID`, `userEmail`, `userPassword`) VALUES
('user1', '1328425e6387d7267ad1ab1e129b8683af5ac1e73b2d4cc18c325aa6704cc965', 'user1@email.com', '$argon2id$v=19$m=65536,t=3,p=4$HOSiqa/Rw8VX+gDA6nsaDQ$RVN3BF1V/TeciCIQobFogCCf+qdgPazzmiDYhyoCiLM'),
('user5', '30673abc4c12257973bee1febe909c0085109db0ab3350376a961ed980dd6d20', 'user5@email.com', '$argon2id$v=19$m=65536,t=3,p=4$I3eRXlmb+rHJEaRJmJjlqQ$76qrz/CkScqx+an4DF1M2/FSnMwEEWV1f6g2jaFLUag'),
('user3', 'cab67a542de8b8d5813946e6f2d460106e554971a5d3ae6f4a6c7c7173d94659', 'user3@email.com', '$argon2id$v=19$m=65536,t=3,p=4$J/L9WuZb8qtzSp+yveWO7Q$37kKEshLjkSRsOMWcVfD7Cp6XgnQXGcUVgQOQvzr42Q'),
('user2', 'd7ba220371eb628698e1c4aefd1535593d4a234eb7706af074c9dc7e427fa6c6', 'user2@email.com', '$argon2id$v=19$m=65536,t=3,p=4$t7X4yll59QEyDCQAzl2j4A$FwEmgE92nhmVJ7g3YMJa/+zSajJ2DwRyqfRr0XH7dnM'),
('user4', 'f6844f4134acefa2a8cd6fdf3c8749bd7f36c30f9d159d6e24408b8b659d312e', 'user4@email.com', '$argon2id$v=19$m=65536,t=3,p=4$gc3XNnZKl5gZfUTL2ET0IQ$9sT0l/PXVbu1SJsWlH2RntuvImluYxLtQk904GoQf7o');

-- --------------------------------------------------------

--
-- Table structure for table `userinfo`
--

CREATE TABLE `userinfo` (
  `userID` varchar(255) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `middleName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userinfo`
--

INSERT INTO `userinfo` (`userID`, `firstName`, `middleName`, `lastName`) VALUES
('1328425e6387d7267ad1ab1e129b8683af5ac1e73b2d4cc18c325aa6704cc965', 'fName1', 'mName1', 'lName1'),
('30673abc4c12257973bee1febe909c0085109db0ab3350376a961ed980dd6d20', 'fName5', 'mName5', 'lName5'),
('cab67a542de8b8d5813946e6f2d460106e554971a5d3ae6f4a6c7c7173d94659', 'fName3', 'mName3', 'lName3'),
('d7ba220371eb628698e1c4aefd1535593d4a234eb7706af074c9dc7e427fa6c6', 'fName2', 'mName2', 'lName2'),
('f6844f4134acefa2a8cd6fdf3c8749bd7f36c30f9d159d6e24408b8b659d312e', 'fName4', 'mName4', 'lName4');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `useraccount`
--
ALTER TABLE `useraccount`
  ADD PRIMARY KEY (`userID`),
  ADD UNIQUE KEY `userName` (`userName`),
  ADD UNIQUE KEY `userEmail` (`userEmail`);

--
-- Indexes for table `userinfo`
--
ALTER TABLE `userinfo`
  ADD PRIMARY KEY (`userID`),
  ADD UNIQUE KEY `userID` (`userID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
