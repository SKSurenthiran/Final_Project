-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 19, 2024 at 08:39 AM
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
-- Database: `vehicle_service_booking`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `appointment_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `service_id` int(11) DEFAULT NULL,
  `appointment_date` datetime NOT NULL,
  `status` enum('scheduled','in progress','completed','cancelled') NOT NULL,
  `feedback` text DEFAULT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` >= 1 and `rating` <= 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`appointment_id`, `user_id`, `service_id`, `appointment_date`, `status`, `feedback`, `rating`) VALUES
(17, 1, 27, '2024-07-19 19:28:00', 'scheduled', NULL, NULL),
(18, 11, 27, '2024-07-16 20:33:00', 'scheduled', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `customermanagement`
--

CREATE TABLE `customermanagement` (
  `customer_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `service_history` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customermanagement`
--

INSERT INTO `customermanagement` (`customer_id`, `user_id`, `service_history`) VALUES
(4, 5, 'Emily Davis frequently visits for electrical system checks.'),
(5, 6, 'Daniel Jones has his suspension checked annually.'),
(6, 7, 'John Doe has had regular maintenance services.');

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `inventory_id` int(11) NOT NULL,
  `item_name` varchar(100) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price_per_unit` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`inventory_id`, `item_name`, `quantity`, `price_per_unit`) VALUES
(1, 'Engine Oil (5W-30)', 50, 1500.00),
(2, 'Brake Pads (Front)', 20, 3000.00),
(3, 'Air Filters', 30, 800.00),
(4, 'Spark Plugs (Set of 4)', 40, 1200.00),
(5, 'Transmission Fluid (1L)', 25, 2000.00),
(6, 'Tires (Set of 4)', 15, 15000.00),
(7, 'Battery (12V)', 10, 5000.00),
(8, 'Headlight Bulbs (Pair)', 35, 500.00),
(9, 'Windshield Wipers', 25, 700.00);

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `invoice_id` int(11) NOT NULL,
  `appointment_id` int(11) DEFAULT NULL,
  `invoice_date` datetime NOT NULL,
  `total_amount` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`invoice_id`, `appointment_id`, `invoice_date`, `total_amount`) VALUES
(14, 17, '2024-07-18 00:00:00', 3000.00);

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `service_id` int(11) NOT NULL,
  `service_name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`service_id`, `service_name`, `description`, `price`, `image_url`) VALUES
(27, 'Car wash', 'complete car wash', 2000.00, '/uploads/image-1721137018674.png'),
(28, 'Oil Change', 'Full Oil change and filter change', 10000.00, '/uploads/image-1721137785506.png'),
(29, 'Electrical System Service', 'Electrical complete check', 5000.00, '/uploads/image-1721369426690.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `technicians`
--

CREATE TABLE `technicians` (
  `technician_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `specialization` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `technicians`
--

INSERT INTO `technicians` (`technician_id`, `name`, `specialization`, `phone`) VALUES
(1, 'John Doe', 'Engine Specialist', '1234567899'),
(2, 'Jane Smith', 'Brake System Expert', '2345678901'),
(3, 'Michael Brown', 'Transmission Technician', '3456789012'),
(4, 'Emily Davis', 'Electrical Systems', '4567890123'),
(5, 'Daniel Jones', 'Suspension and Steering', '5678901234'),
(6, 'Linda Wilson', 'AC and Heating Systems', '6789012345'),
(7, 'James Taylor', 'Diagnostic Technician', '7890123456'),
(8, 'Susan Moore', 'Tire and Wheel Alignment', '8901234567');

-- --------------------------------------------------------

--
-- Table structure for table `technicianschedules`
--

CREATE TABLE `technicianschedules` (
  `schedule_id` int(11) NOT NULL,
  `technician_id` int(11) DEFAULT NULL,
  `appointment_id` int(11) DEFAULT NULL,
  `date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `role` enum('customer','admin','staff') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `email`, `phone`, `role`) VALUES
(1, 'Admin', 'Admin123', 'admin@example.com', '1234567890', 'admin'),
(2, 'john_doe', 'CustomerPass1', 'john.doe@example.com', '2345678901', 'customer'),
(5, 'emily_davis', 'CustomerPass4', 'emily.davis@example.com', '5678901234', 'customer'),
(6, 'daniel_jones', 'CustomerPass5', 'daniel.jones@example.com', '6789012345', 'customer'),
(7, 'linda_wilson', 'StaffPass1', 'linda.wilson@example.com', '7890123456', 'staff'),
(8, 'james_taylor', 'StaffPass2', 'james.taylor@example.com', '8901234567', 'staff'),
(9, 'susan_moore', 'StaffPass3', 'susan.moore@example.com', '9012345678', 'staff'),
(11, 'kunalan', 'kuna123', 'kunalankuna04@gmail.com', '2345678901', 'customer'),
(13, 'Lathu', '1234', 'lathu@gmail.com', '0789456734', 'customer'),
(14, 'Aathi', '123', 'Aathi@gmail.com', NULL, 'customer'),
(15, 'Athiththan', 'Athi123', 'Athi@gmail.com', '2345678901', 'customer');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`appointment_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `service_id` (`service_id`);

--
-- Indexes for table `customermanagement`
--
ALTER TABLE `customermanagement`
  ADD PRIMARY KEY (`customer_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`inventory_id`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`invoice_id`),
  ADD KEY `appointment_id` (`appointment_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`service_id`);

--
-- Indexes for table `technicians`
--
ALTER TABLE `technicians`
  ADD PRIMARY KEY (`technician_id`);

--
-- Indexes for table `technicianschedules`
--
ALTER TABLE `technicianschedules`
  ADD PRIMARY KEY (`schedule_id`),
  ADD KEY `technician_id` (`technician_id`),
  ADD KEY `appointment_id` (`appointment_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `appointment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `customermanagement`
--
ALTER TABLE `customermanagement`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `inventory_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `invoice_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `service_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `technicians`
--
ALTER TABLE `technicians`
  MODIFY `technician_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `technicianschedules`
--
ALTER TABLE `technicianschedules`
  MODIFY `schedule_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `services` (`service_id`);

--
-- Constraints for table `customermanagement`
--
ALTER TABLE `customermanagement`
  ADD CONSTRAINT `customermanagement_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`appointment_id`);

--
-- Constraints for table `technicianschedules`
--
ALTER TABLE `technicianschedules`
  ADD CONSTRAINT `technicianschedules_ibfk_1` FOREIGN KEY (`technician_id`) REFERENCES `technicians` (`technician_id`),
  ADD CONSTRAINT `technicianschedules_ibfk_2` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`appointment_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
