-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 10, 2022 at 07:31 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jia`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL DEFAULT 0,
  `name` varchar(255) NOT NULL,
  `fr_name` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `fr_name`, `created_at`, `updated_at`) VALUES
(1, 'splints', 'attelles', '2020-07-04 19:06:33', '2020-07-04 19:06:33'),
(2, 'relax', 'relaxation', '2020-07-04 19:07:02', '2020-07-04 19:07:02'),
(3, 'medication', 'médicaments', '2020-07-04 19:07:24', '2020-07-04 19:07:24'),
(4, 'physical activity', 'activité physique', '2020-07-04 19:07:54', '2020-07-04 19:07:54'),
(5, 'immediate relief', 'soulagement immédiat', '2020-07-04 19:08:18', '2020-07-04 19:08:18'),
(6, 'educational', 'éducatif', '2020-07-04 19:08:37', '2020-07-04 19:08:37'),
(7, 'nutritional', 'nutritionnel', '2020-07-04 19:08:46', '2020-07-04 19:08:46');

-- --------------------------------------------------------

--
-- Table structure for table `classifications`
--

CREATE TABLE `classifications` (
  `id` int(11) NOT NULL DEFAULT 0,
  `name` varchar(255) NOT NULL,
  `fr_name` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `section` varchar(255) NOT NULL,
  `fr_section` varchar(12) CHARACTER SET utf8 DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `classifications`
--

INSERT INTO `classifications` (`id`, `name`, `fr_name`, `section`, `fr_section`, `created_at`, `updated_at`) VALUES
(1, 'Non-steroidal anti-inflammatory drugs (NSAIDs) in pills, liquid, cream or gel', 'Médicaments anti-inflammatoires non stéroïdiens (AINS) sous forme de comprimés, liquide, crème ou gel', 'prescribed', 'prescription', '2020-06-08 21:56:57', '2021-06-09 04:52:46'),
(3, 'Corticosteroids', 'Corticostéroïdes', 'prescribed', 'prescription', '2020-06-08 21:57:17', '2020-06-08 21:57:17'),
(6, 'Disease-modifying anti-rheumatic drugs (DMARDs)', 'Antirhumatismaux modificateurs de la maladie (ARMM)', 'prescribed', 'prescription', '2020-07-22 13:37:05', '2020-07-22 13:37:05'),
(7, 'Biologic agents and biosimilars', 'Agents biologiques et biosimilaires', 'prescribed', 'prescription', '2020-07-22 13:37:14', '2020-07-22 13:37:14');

-- --------------------------------------------------------

--
-- Table structure for table `confidences`
--

CREATE TABLE `confidences` (
  `id` int(11) NOT NULL,
  `level` float DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `effectivenesses`
--

CREATE TABLE `effectivenesses` (
  `id` int(11) NOT NULL,
  `control_arthritis` float DEFAULT NULL,
  `manage_pain` float DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `factors`
--

CREATE TABLE `factors` (
  `id` int(11) NOT NULL DEFAULT 0,
  `title` varchar(255) NOT NULL,
  `fr_title` varchar(56) CHARACTER SET utf8 DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `fr_description` varchar(283) CHARACTER SET utf8 DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `factors`
--

INSERT INTO `factors` (`id`, `title`, `fr_title`, `description`, `fr_description`, `created_at`, `updated_at`) VALUES
(1, 'Lack of information', 'Manque d\'information', 'You can find information about treatment options in Step 3. Speak with your parents and health care team.', 'Vous pouvez trouver des informations sur les options de traitement à l\'étape 3. Parlez à vos parents et à votre équipe soignante.', '2020-05-24 23:19:17', '2020-05-24 23:19:17'),
(2, 'Lack of time', 'Manque de temps', 'Some treatments take as little as 10 or 15 minutes! Try setting aside time in your calendar.', 'Certains traitements ne prennent que 10 ou 15 minutes! Essayez de réserver du temps dans votre agenda.', '2020-05-24 23:20:16', '2020-05-24 23:20:16'),
(9, 'Cost too much', 'Trop coûteux', 'There are many ways to reduce costs. Some treatments are available online for free. Your health insurance may also pay for some treatments. Talk about it with your parents and health care team. They may have other answers.', 'Il existe de nombreuses façons de réduire les coûts. Certains traitements sont disponibles en ligne gratuitement. Votre assurance maladie peut également prendre en charge certains traitements. Parlez-en à vos parents et à votre équipe soignante. Ils peuvent avoir d\'autres solutions.', '2020-08-06 19:38:57', '2020-08-06 19:38:57'),
(10, 'Feeling overwhelmed', 'Sentiment d’être dépassé', 'It’s okay to feel overwhelmed. Take the time you need to consider your options. Talk about your worries with your parents and health care team.', 'C\'est normal de se sentir dépassé(e). Prenez le temps dont vous avez besoin pour réfléchir à vos options. Parlez de vos inquiétudes à vos parents et à votre équipe soignante.', '2020-08-06 19:39:12', '2020-08-06 19:39:12'),
(11, 'Not sure I want to follow this plan', 'Je ne suis pas certain(e) de vouloir suivre ce programme', 'It’s okay to be unsure. If you want to look at your options again, you can use this app any time.', 'C’est normal d’être incertain(e). Si vous souhaitez revoir vos options, vous pouvez utiliser l\'application en tout temps.', '2020-08-06 19:39:25', '2020-08-06 19:39:25'),
(12, 'Other', 'Autre', '', '', '2020-08-06 19:39:33', '2020-08-06 19:39:33');

-- --------------------------------------------------------

--
-- Table structure for table `frequentlies`
--

CREATE TABLE `frequentlies` (
  `id` int(11) NOT NULL,
  `prescribed_meds` varchar(255) DEFAULT NULL,
  `fr_prescribed_meds` varchar(19) CHARACTER SET utf8 DEFAULT NULL,
  `other_treatments` varchar(255) DEFAULT NULL,
  `fr_other_treatments` varchar(19) CHARACTER SET utf8 DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `learns`
--

CREATE TABLE `learns` (
  `id` int(11) NOT NULL,
  `link` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `fr_name` varchar(49) CHARACTER SET utf8 DEFAULT NULL,
  `language` varchar(255) NOT NULL,
  `nationality` varchar(255) NOT NULL,
  `is_app` tinyint(1) NOT NULL,
  `treatment_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `learns`
--

INSERT INTO `learns` (`id`, `link`, `name`, `fr_name`, `language`, `nationality`, `is_app`, `treatment_id`, `created_at`, `updated_at`) VALUES
(1, 'https://teens.aboutkidshealth.ca/Article?contentid=2611&language=English&hub=jiateenhub', 'Canadian “Teens Taking Charge” program: ', NULL, 'English', 'Canadian', 0, 1, '2021-06-26 16:23:22', '2021-06-26 16:23:22'),
(2, 'https://teenstakingcharge.carragroup.org/en/jiateen/Article?contentid=2377&language=English', 'US “Teens Taking Charge” program: ', NULL, 'English', 'American', 0, 1, '2021-06-26 16:23:22', '2021-06-26 16:23:22'),
(190, 'https://www.aboutkidshealth.ca/Article?contentid=1079&language=English', 'Canadian “Teens Taking Charge” program: ', NULL, 'English', 'Canadian', 0, 31, '2021-06-26 16:24:50', '2021-06-26 16:24:50'),
(191, 'https://teenstakingcharge.carragroup.org/en/jiateen/Article?contentid=2376&language=English', 'US “Teens Taking Charge” program: ', NULL, 'English', 'American', 0, 31, '2021-06-26 16:24:50', '2021-06-26 16:24:50'),
(192, 'https://www.versusarthritis.org/about-arthritis/treatments/splints/', '', NULL, 'English', 'Other', 0, 31, '2021-06-26 16:24:50', '2021-06-26 16:24:50'),
(201, 'https://www.aboutkidshealth.ca/Article?contentid=1085&language=English', 'Canadian “Teens Taking Charge” program:', NULL, 'English', 'Canadian', 0, 49, '2021-06-26 16:25:24', '2021-06-26 16:25:24'),
(202, 'https://teenstakingcharge.carragroup.org/en/jiateen/Article?contentid=2382&language=English', 'US “Teens Taking Charge” program: ', NULL, 'English', 'American', 0, 49, '2021-06-26 16:25:24', '2021-06-26 16:25:24'),
(203, 'https://www.aboutkidshealth.ca/Article?contentid=1083&language=English', 'Canadian “Teens Taking Charge” program:', NULL, 'English', 'Canadian', 0, 6, '2021-06-26 16:33:19', '2021-06-26 16:33:19'),
(204, 'https://teenstakingcharge.carragroup.org/en/jiateen/Article?contentid=2379&language=English', 'US “Teens Taking Charge” program: ', NULL, 'English', 'American', 0, 6, '2021-06-26 16:33:19', '2021-06-26 16:33:19'),
(205, 'https://www.aboutkidshealth.ca/article?contentid=1077&language=English', 'Canadian “Teens Taking Charge” program: ', NULL, 'English', 'Canadian', 0, 34, '2022-02-10 06:22:27', '2022-02-10 06:22:27'),
(228, 'http://www.kznhealth.gov.za/occtherapy/jointprotectionprinciples.pdf', '', NULL, 'English', 'American', 0, 53, '2021-06-25 00:57:36', '2021-06-25 00:57:36'),
(229, 'https://www.arthritis.org/living-with-arthritis/pain-management/joint-protection/joint-health.php', '', NULL, 'English', 'American', 0, 53, '2021-06-25 00:57:36', '2021-06-25 00:57:36'),
(230, 'https://www.aboutkidshealth.ca/Article?contentid=62&language=English', 'Canadian “Teens Taking Charge” program:', NULL, 'English', 'Canadian', 0, 54, '2022-02-10 05:56:11', '2022-02-10 05:56:11'),
(232, 'https://teens.aboutkidshealth.ca/Article?contentid=2585&language=English&hub=jiateenhub', 'Canadian “Teens Taking Charge” program links:', NULL, 'English', 'Canadian', 0, 55, '2021-06-26 16:40:37', '2021-06-26 16:40:37'),
(233, 'https://teenstakingcharge.carragroup.org/en/jiateen/Article?contentid=2353&language=English', 'US “Teens Taking Charge” program links:', NULL, 'English', 'American', 0, 55, '2021-06-26 16:40:37', '2021-06-26 16:40:37'),
(234, 'https://www.aboutkidshealth.ca/Article?contentid=3008&language=English', '', NULL, 'English', 'Canadian', 0, 55, '2021-06-26 16:40:37', '2021-06-26 16:40:37'),
(235, 'https://teenstakingcharge.carragroup.org/en/jiateen', '', NULL, 'English', 'American', 0, 55, '2021-06-26 16:40:37', '2021-06-26 16:40:37'),
(236, 'https://www.arthritis.org/health-wellness/treatment/complementary-therapies/natural-therapies/mind-body-techniques-juvenile-arthritis', '', NULL, 'English', 'American', 0, 55, '2021-06-26 16:40:37', '2021-06-26 16:40:37'),
(237, 'https://www.parksmed.co.uk/wp-content/uploads/2013/09/Pain-Toolkit-for-teenagers.pdf', '', NULL, 'English', 'Other', 0, 55, '2021-06-26 16:40:37', '2021-06-26 16:40:37'),
(238, 'https://www.painmanagement.org.au/2014-09-11-13-35-53/2014-09-11-13-36-47/176-progressive-muscle-relaxation.html', '', NULL, 'English', 'Other', 0, 55, '2021-06-26 16:40:37', '2021-06-26 16:40:37'),
(239, 'https://pzizz.com', 'App - PZIZZ (sound sequences and voice narrations to boost somatic awareness, relax muscles and stabilize heart rate):', NULL, 'English', 'American', 1, 55, '2021-06-26 16:40:37', '2021-06-26 16:40:37'),
(248, 'https://www.aboutkidshealth.ca/Article?contentid=1076&language=English', 'Canadian “Teens Taking Charge” program:', NULL, 'English', 'Canadian', 0, 58, '2021-06-26 16:31:40', '2021-06-26 16:31:40'),
(249, 'https://teenstakingcharge.carragroup.org/en/jiateen/Article?contentid=2340&language=English', 'US “Teens Taking Charge” program:', NULL, 'English', 'American', 0, 58, '2021-06-26 16:31:40', '2021-06-26 16:31:40'),
(250, 'https://creakyjoints.org/living-with-arthritis/cold-therapy-for-arthritis/', '', NULL, 'English', 'American', 0, 58, '2021-06-26 16:31:40', '2021-06-26 16:31:40'),
(251, 'https://www.aboutkidshealth.ca/Article?contentid=1083&language=English', 'Canadian “Teens Taking Charge” program:', NULL, 'English', 'Canadian', 0, 59, '2021-06-26 16:32:17', '2021-06-26 16:32:17'),
(252, 'https://teenstakingcharge.carragroup.org/en/jiateen/Article?contentid=2379&language=English', 'US “Teens Taking Charge” program:', NULL, 'English', 'American', 0, 59, '2021-06-26 16:32:17', '2021-06-26 16:32:17'),
(257, 'https://teens.aboutkidshealth.ca/Article?contentid=2626&language=English&hub=jiateenhub', 'Canadian “Teens Taking Charge” program:', NULL, 'English', 'Canadian', 0, 61, '2021-06-26 16:37:39', '2021-06-26 16:37:39'),
(258, 'https://teenstakingcharge.carragroup.org/en/jiateen/Article?contentid=2394&language=English', 'US “Teens Taking Charge” program:', NULL, 'English', 'American', 0, 61, '2021-06-26 16:37:39', '2021-06-26 16:37:39'),
(259, 'https://www.arthritis.org/health-wellness/healthy-living/managing-pain/fatigue-sleep/how-ja-can-impact-sleep', '', NULL, 'English', 'American', 0, 61, '2021-06-26 16:37:39', '2021-06-26 16:37:39'),
(260, 'https://arthritisaustralia.com.au/managing-arthritis/arthritis-and-children/6387-2/', '', NULL, 'English', 'Other', 0, 61, '2021-06-26 16:37:39', '2021-06-26 16:37:39'),
(262, 'https://teens.aboutkidshealth.ca/Article?contentid=2590&language=English&hub=jiateenhub', 'Canadian “Teens Taking Charge” program:', NULL, 'English', 'Canadian', 0, 38, '2021-06-25 01:19:49', '2021-06-25 01:19:49'),
(263, 'https://teenstakingcharge.carragroup.org/en/jiateen/Article?contentid=2367&language=English', 'US “Teens Taking Charge” program:', NULL, 'English', 'American', 0, 38, '2021-06-25 01:19:49', '2021-06-25 01:19:49'),
(264, 'https://www.aci.health.nsw.gov.au/chronic-pain/painbytes/pain-and-mind-body-connection/how-can-distraction-be-used-to-manage-pain', '', NULL, 'English', 'Other', 0, 38, '2021-06-25 01:19:49', '2021-06-25 01:19:49'),
(268, 'http://www.cfp.ca/content/53/5/823', '', NULL, 'English', 'Canadian', 0, 62, '2021-06-25 21:26:51', '2021-06-25 21:26:51'),
(269, 'https://teens.aboutkidshealth.ca/Article?contentid=2591&language=English&hub=jiateenhub', 'Canadian “Teens Taking Charge” program links 1:', NULL, 'English', 'Canadian', 0, 63, '2021-06-26 16:43:19', '2021-06-26 16:43:19'),
(270, 'https://teens.aboutkidshealth.ca/Article?contentid=2592&language=English&hub=jiateenhub', 'Canadian “Teens Taking Charge” program links 2:', NULL, 'English', 'Canadian', 0, 63, '2021-06-26 16:43:19', '2021-06-26 16:43:19'),
(271, 'https://teenstakingcharge.carragroup.org/en/jiateen/Article?contentid=2383&language=English', 'US “Teens Taking Charge” program links 1:', NULL, 'English', 'American', 0, 63, '2021-06-26 16:43:19', '2021-06-26 16:43:19'),
(272, 'https://teenstakingcharge.carragroup.org/en/jiateen/Article?contentid=2384&language=English', 'US “Teens Taking Charge” program links 2:', NULL, 'English', 'American', 0, 63, '2021-06-26 16:43:19', '2021-06-26 16:43:19'),
(273, 'https://www.arthritis.org/health-wellness/treatment/complementary-therapies/natural-therapies/mind-body-techniques-juvenile-arthritis', '', NULL, 'English', 'American', 0, 63, '2021-06-26 16:43:19', '2021-06-26 16:43:19'),
(274, 'https://teens.aboutkidshealth.ca/Article?contentid=2612&language=English&hub=jiateenhub', '', NULL, 'English', 'Canadian', 0, 64, '2021-06-26 16:44:05', '2021-06-26 16:44:05'),
(275, 'https://teenstakingcharge.carragroup.org/en/jiateen/Article?contentid=2378&language=English', '', NULL, 'English', 'American', 0, 64, '2021-06-26 16:44:05', '2021-06-26 16:44:05'),
(276, 'https://www.aboutkidshealth.ca/article?contentid=1080&language=english', '', NULL, 'English', 'Canadian', 0, 64, '2021-06-26 16:44:05', '2021-06-26 16:44:05'),
(277, 'https://www.zoffness.com/what-is-cbt/', '', NULL, 'English', 'American', 0, 64, '2021-06-26 16:44:05', '2021-06-26 16:44:05'),
(282, 'https://teens.aboutkidshealth.ca/Article?contentid=2629&language=English&hub=jiateenhub', 'Canadian “Teens Taking Charge” program:', NULL, 'English', 'Canadian', 0, 67, '2021-06-26 16:45:54', '2021-06-26 16:45:54'),
(284, ' https://teens.aboutkidshealth.ca/Article?contentid=2609&language=English&hub=jiateenhub', 'Canadian “Teens Taking Charge” program links 1: ', NULL, 'English', 'Canadian', 0, 69, '2021-06-26 16:46:44', '2021-06-26 16:46:44'),
(285, 'https://www.aboutkidshealth.ca/Article?contentid=1081&language=English', 'Canadian “Teens Taking Charge” program links 2:', NULL, 'English', 'Canadian', 0, 69, '2021-06-26 16:46:44', '2021-06-26 16:46:44'),
(286, 'https://teenstakingcharge.carragroup.org/en/jiateen/Article?contentid=2375&language=English', 'US “Teens Taking Charge” program:', NULL, 'English', 'American', 0, 69, '2021-06-26 16:46:44', '2021-06-26 16:46:44'),
(287, 'https://food-guide.canada.ca/en/', '', NULL, 'English', 'Canadian', 0, 69, '2021-06-26 16:46:44', '2021-06-26 16:46:44'),
(288, 'https://www.jia.org.uk/diet-and-jia', '', NULL, 'English', 'Other', 0, 69, '2021-06-26 16:46:44', '2021-06-26 16:46:44'),
(291, 'https://www.jia.org.uk/diet-and-jia', '', NULL, 'English', 'Other', 0, 70, '2021-06-26 15:54:23', '2021-06-26 15:54:23'),
(292, 'https://www.arthritis.org/living-with-arthritis/arthritis-diet/anti-inflammatory/anti-inflammatory-diet.php', '', NULL, 'English', 'American', 0, 70, '2021-06-26 15:54:23', '2021-06-26 15:54:23'),
(293, 'https://www.jia.org.uk/diet-and-jia', '', NULL, 'English', 'Other', 0, 71, '2021-06-26 16:47:02', '2021-06-26 16:47:02'),
(294, 'https://www.aboutkidshealth.ca/Article?contentid=1083&language=English', '', NULL, 'English', 'Canadian', 0, 71, '2021-06-26 16:47:02', '2021-06-26 16:47:02'),
(295, 'https://arthritis.ca/support-education/online-learning/eating-well/what-about-supplements', '', NULL, 'English', 'Canadian', 0, 72, '2021-06-26 16:47:19', '2021-06-26 16:47:19'),
(296, 'https://teens.aboutkidshealth.ca/Article?contentid=2609&language=English&hub=jiateenhub', 'Canadian “Teens Taking Charge” program links 1:', NULL, 'English', 'Canadian', 0, 73, '2021-06-26 16:48:03', '2021-06-26 16:48:03'),
(297, 'https://www.aboutkidshealth.ca/Article?contentid=1081&language=English', 'Canadian “Teens Taking Charge” program links 2:', NULL, 'English', 'Canadian', 0, 73, '2021-06-26 16:48:03', '2021-06-26 16:48:03'),
(298, 'https://teenstakingcharge.carragroup.org/en/jiateen/Article?contentid=2375&language=English', 'US “Teens Taking Charge” program:', NULL, 'English', 'American', 0, 73, '2021-06-26 16:48:03', '2021-06-26 16:48:03'),
(299, 'https://www.jia.org.uk/diet-and-jia', '', NULL, 'English', 'Other', 0, 73, '2021-06-26 16:48:03', '2021-06-26 16:48:03'),
(300, 'https://teens.aboutkidshealth.ca/Article?contentid=2609&language=English&hub=jiateenhub', 'Canadian “Teens Taking Charge” program links 1:', NULL, 'English', 'Canadian', 0, 74, '2021-06-26 16:48:24', '2021-06-26 16:48:24'),
(301, 'https://www.aboutkidshealth.ca/Article?contentid=1081&language=English', 'Canadian “Teens Taking Charge” program links 2:', NULL, 'English', 'Canadian', 0, 74, '2021-06-26 16:48:24', '2021-06-26 16:48:24'),
(302, 'https://teenstakingcharge.carragroup.org/en/jiateen/Article?contentid=2375&language=English', 'US “Teens Taking Charge” program:', NULL, 'English', 'American', 0, 74, '2021-06-26 16:48:24', '2021-06-26 16:48:24'),
(303, 'https://www.jia.org.uk/diet-and-jia', '', NULL, 'English', 'Other', 0, 74, '2021-06-26 16:48:24', '2021-06-26 16:48:24'),
(304, 'https://www.arthritis.org/living-with-arthritis/arthritis-diet/anti-inflammatory/vegan-and-vegetarian-diets.php', '', NULL, 'English', 'American', 0, 75, '2021-06-26 16:22:26', '2021-06-26 16:22:26'),
(305, 'https://teens.aboutkidshealth.ca/Article?contentid=2605&language=English&hub=jiateenhub', 'Canadian “Teens Taking Charge” program links 1: ', NULL, 'English', 'Canadian', 0, 5, '2021-06-26 16:26:22', '2021-06-26 16:26:22'),
(306, 'https://teens.aboutkidshealth.ca/Article?contentid=2606&language=English&hub=jiateenhub', 'Canadian “Teens Taking Charge” program links 2: ', NULL, 'English', 'Canadian', 0, 5, '2021-06-26 16:26:22', '2021-06-26 16:26:22'),
(307, 'https://teenstakingcharge.carragroup.org/en/jiateen/Article?contentid=2371&language=English', 'US “Teens Taking Charge” program links 1: ', NULL, 'English', 'American', 0, 5, '2021-06-26 16:26:22', '2021-06-26 16:26:22'),
(308, 'https://teenstakingcharge.carragroup.org/en/jiateen/Article?contentid=2373&language=English', 'US “Teens Taking Charge” program links 2: ', NULL, 'English', 'American', 0, 5, '2021-06-26 16:26:22', '2021-06-26 16:26:22'),
(309, 'https://www.arthritis.org/health-wellness/healthy-living/physical-activity/getting-started/best-exercises-for-children-with-ja', '', NULL, 'English', 'American', 0, 5, '2021-06-26 16:26:22', '2021-06-26 16:26:22'),
(310, 'https://www.ccaa.org.uk/about-jia/treatment-of-jia/podiatry/', '', NULL, 'English', 'Other', 0, 1, '2021-06-26 16:23:22', '2021-06-26 16:23:22'),
(313, 'https://creakyjoints.org/symptoms/arthritis-jaw-pain/', '', NULL, 'English', 'American', 0, 49, '2021-06-26 16:25:24', '2021-06-26 16:25:24'),
(316, 'https://teenstakingcharge.carragroup.org/en/jiateen/Article?contentid=2340&language=English', 'US “Teens Taking Charge” program: ', NULL, 'English', 'American', 0, 34, '2022-02-10 06:22:27', '2022-02-10 06:22:27'),
(318, 'https://apps.apple.com/us/app/your-exercise-solution/id1142267846', 'App', NULL, 'English', 'American', 1, 34, '2022-02-10 06:22:27', '2022-02-10 06:22:27'),
(321, 'https://www.hopkinsarthritis.org/patient-corner/disease-management/yoga-for-arthritis/', '', NULL, 'English', 'American', 0, 5, '2021-06-26 16:26:22', '2021-06-26 16:26:22'),
(322, 'https://apps.apple.com/us/app/your-exercise-solution/id1142267846', 'App', NULL, 'English', 'American', 1, 5, '2021-06-26 16:26:22', '2021-06-26 16:26:22'),
(323, 'https://teens.aboutkidshealth.ca/Article?contentid=2604&language=English&hub=jiateenhub', 'Canadian “Teens Taking Charge” program:', NULL, 'English', 'Canadian', 0, 35, '2021-06-26 16:27:02', '2021-06-26 16:27:02'),
(324, 'https://teenstakingcharge.carragroup.org/en/jiateen/Article?contentid=2370&language=English', 'US “Teens Taking Charge” program:', NULL, 'English', 'American', 0, 35, '2021-06-26 16:27:02', '2021-06-26 16:27:02'),
(325, 'https://www.arthritis.org/health-wellness/healthy-living/physical-activity/getting-started/best-exercises-for-children-with-ja', '', NULL, 'English', 'American', 0, 35, '2021-06-26 16:27:02', '2021-06-26 16:27:02'),
(326, 'https://apps.apple.com/us/app/your-exercise-solution/id1142267846', 'App', NULL, 'English', 'American', 1, 35, '2021-06-26 16:27:02', '2021-06-26 16:27:02'),
(327, 'https://www.arthritis.org/health-wellness/healthy-living/physical-activity/getting-started/best-exercises-for-children-with-ja', '', NULL, 'English', 'American', 0, 50, '2021-06-25 21:46:28', '2021-06-25 21:46:28'),
(328, 'https://creakyjoints.org/diet-exercise/water-exercises-for-arthritis/', '', NULL, 'English', 'American', 0, 50, '2021-06-25 21:46:28', '2021-06-25 21:46:28'),
(329, 'https://apps.apple.com/us/app/your-exercise-solution/id1142267846', 'App', NULL, 'English', 'American', 1, 50, '2021-06-25 21:46:28', '2021-06-25 21:46:28'),
(330, 'https://www.aboutkidshealth.ca/article?contentid=1077&language=English', 'Canadian “Teens Taking Charge” program links 1: ', NULL, 'English', 'Canadian', 0, 51, '2021-06-26 16:27:50', '2021-06-26 16:27:50'),
(331, 'https://www.aboutkidshealth.ca/Article?contentid=1076&language=English', 'Canadian “Teens Taking Charge” program links 2: ', NULL, 'English', 'Canadian', 0, 51, '2021-06-26 16:27:50', '2021-06-26 16:27:50'),
(332, 'https://teenstakingcharge.carragroup.org/en/jiateen/Article?contentid=2340&language=English', 'US “Teens Taking Charge” program links 1: ', NULL, 'English', 'American', 0, 51, '2021-06-26 16:27:50', '2021-06-26 16:27:50'),
(333, 'https://teenstakingcharge.carragroup.org/en/jiateen/Article?contentid=2370&language=English', 'US “Teens Taking Charge” program links 2: ', NULL, 'English', 'American', 0, 51, '2021-06-26 16:27:50', '2021-06-26 16:27:50'),
(334, 'https://myhealth.alberta.ca/Health/Pages/conditions.aspx?hwid=hw100889', '', NULL, 'English', 'Canadian', 0, 51, '2021-06-26 16:27:50', '2021-06-26 16:27:50'),
(335, 'https://teens.aboutkidshealth.ca/Article?contentid=2604&language=English&hub=jiateenhub', 'Canadian “Teens Taking Charge” program:', NULL, 'English', 'Canadian', 0, 52, '2021-06-26 16:28:26', '2021-06-26 16:28:26'),
(336, 'https://teenstakingcharge.carragroup.org/en/jiateen/Article?contentid=2370&language=English', 'US “Teens Taking Charge” program:', NULL, 'English', 'American', 0, 52, '2021-06-26 16:28:26', '2021-06-26 16:28:26'),
(337, 'http://www.kidsgetarthritistoo.org/living-with-ja/daily-life/staying-active/ja-exercise.php', '', NULL, 'English', 'American', 0, 52, '2021-06-26 16:28:26', '2021-06-26 16:28:26'),
(338, 'https://creakyjoints.org/diet-exercise/gentle-stretches-for-arthritis-pain/', '', NULL, 'English', 'American', 0, 52, '2021-06-26 16:28:26', '2021-06-26 16:28:26'),
(339, 'https://www.arthritis.org/health-wellness/healthy-living/physical-activity/getting-started/get-in-the-habit-of-stretching', '', NULL, 'English', 'American', 0, 52, '2021-06-26 16:28:26', '2021-06-26 16:28:26'),
(340, 'https://apps.apple.com/us/app/your-exercise-solution/id1142267846', 'App', NULL, 'English', 'American', 1, 52, '2021-06-26 16:28:26', '2021-06-26 16:28:26'),
(341, 'https://www.aboutkidshealth.ca/Article?contentid=1076&language=English', 'Canadian “Teens Taking Charge” program:', NULL, 'English', 'Canadian', 0, 2, '2021-06-26 16:29:01', '2021-06-26 16:29:01'),
(342, 'https://teenstakingcharge.carragroup.org/en/jiateen/Article?contentid=2340&language=English ', 'US “Teens Taking Charge” program:', NULL, 'English', 'American', 0, 2, '2021-06-26 16:29:01', '2021-06-26 16:29:01'),
(343, 'https://www.arthritis.org/health-wellness/treatment/complementary-therapies/natural-therapies/benefits-of-massage', '', NULL, 'English', 'American', 0, 2, '2021-06-26 16:29:01', '2021-06-26 16:29:01'),
(344, 'https://www.arthritis.org/living-with-arthritis/treatments/natural/other-therapies/massage/self-massage.php', '', NULL, 'English', 'American', 0, 2, '2021-06-26 16:29:01', '2021-06-26 16:29:01'),
(345, 'https://www.aboutkidshealth.ca/Article?contentid=1079&language=English', 'Canadian “Teens Taking Charge” program:', NULL, 'English', 'Canadian', 0, 36, '2021-06-26 16:29:34', '2021-06-26 16:29:34'),
(346, 'https://teenstakingcharge.carragroup.org/en/jiateen/Article?contentid=2376&language=English', 'US “Teens Taking Charge” program:', NULL, 'English', 'American', 0, 36, '2021-06-26 16:29:34', '2021-06-26 16:29:34'),
(347, 'https://www.jia.org.uk/the-occupational-therapist-', '', NULL, 'English', 'Other', 0, 36, '2021-06-26 16:29:34', '2021-06-26 16:29:34'),
(348, 'https://www.ccaa.org.uk/about-jia/treatment-of-jia/occupational-therapy/', '', NULL, 'English', 'Other', 0, 36, '2021-06-26 16:29:34', '2021-06-26 16:29:34'),
(349, 'https://www.aboutkidshealth.ca/Article?contentid=1078&language=English', 'Canadian “Teens Taking Charge” program:', NULL, 'English', 'Canadian', 0, 56, '2021-06-26 16:30:03', '2021-06-26 16:30:03'),
(350, 'https://teenstakingcharge.carragroup.org/en/jiateen/Article?contentid=2368&language=English', 'US “Teens Taking Charge” program: ', NULL, 'English', 'American', 0, 56, '2021-06-26 16:30:03', '2021-06-26 16:30:03'),
(351, 'https://www.jia.org.uk/physiotherapist', '', NULL, 'English', 'Other', 0, 56, '2021-06-26 16:30:03', '2021-06-26 16:30:03'),
(352, 'https://www.ccaa.org.uk/about-jia/treatment-of-jia/physiotherapy/', '', NULL, 'English', 'Other', 0, 56, '2021-06-26 16:30:03', '2021-06-26 16:30:03'),
(353, 'https://myhealth.alberta.ca/Health/Pages/conditions.aspx?hwid=hw100889', '', NULL, 'English', 'Canadian', 0, 56, '2021-06-26 16:30:03', '2021-06-26 16:30:03'),
(361, 'https://www.aboutkidshealth.ca/Article?contentid=1076&language=English', 'Canadian “Teens Taking Charge” program:', NULL, 'English', 'Canadian', 0, 57, '2021-06-26 16:31:16', '2021-06-26 16:31:16'),
(371, 'https://teenstakingcharge.carragroup.org/en/jiateen/Article?contentid=2340&language=English', 'US “Teens Taking Charge” program:', NULL, 'English', 'American', 0, 57, '2021-06-26 16:31:16', '2021-06-26 16:31:16'),
(381, 'https://www.arthritis.org/health-wellness/healthy-living/managing-pain/pain-relief-solutions/heat-therapy-helps-relax-stiff-joints', '', NULL, 'English', 'American', 0, 57, '2021-06-26 16:31:16', '2021-06-26 16:31:16'),
(391, 'https://www.aboutkidshealth.ca/Article?contentid=1083&language=English', 'Canadian “Teens Taking Charge” program:', NULL, 'English', 'Canadian', 0, 37, '2021-06-26 16:32:45', '2021-06-26 16:32:45'),
(401, 'https://teenstakingcharge.carragroup.org/en/jiateen/Article?contentid=2379&language=English', 'US “Teens Taking Charge” program:', NULL, 'English', 'American', 0, 37, '2021-06-26 16:32:45', '2021-06-26 16:32:45'),
(411, 'https://teens.aboutkidshealth.ca/jiateenhub', 'Canadian “Teens Taking Charge” program:', NULL, 'English', 'Canadian', 0, 7, '2021-06-26 16:34:55', '2021-06-26 16:34:55'),
(421, 'https://teenstakingcharge.carragroup.org/en/jiateen', 'US “Teens Taking Charge” program:', NULL, 'English', 'American', 0, 7, '2021-06-26 16:34:55', '2021-06-26 16:34:55'),
(431, 'http://www.bcchildrens.ca/rheumatology-site/Documents/Youyourchild1.pdf', '', NULL, 'English', 'Canadian', 0, 7, '2021-06-26 16:34:55', '2021-06-26 16:34:55'),
(441, 'https://www.msk.org.au/juvenile-idiopathic-arthritis/', '', NULL, 'English', 'Other', 0, 7, '2021-06-26 16:34:55', '2021-06-26 16:34:55'),
(451, 'https://www.cincinnatichildrens.org/health/j/jra', '', NULL, 'English', 'American', 0, 7, '2021-06-26 16:34:55', '2021-06-26 16:34:55'),
(461, 'https://arthritisaustralia.com.au/managing-arthritis/arthritis-and-children/living-with-jia/', '', NULL, 'English', 'Other', 0, 7, '2021-06-26 16:34:55', '2021-06-26 16:34:55'),
(471, 'https://www.rchsd.org/documents/2014/02/juvenile-idiopathic-arthritis-for-teens.pdf/', '', NULL, 'English', 'Other', 0, 7, '2021-06-26 16:34:55', '2021-06-26 16:34:55'),
(481, 'https://www.parksmed.co.uk/wp-content/uploads/2013/09/Pain-Toolkit-for-teenagers.pdf', '', NULL, 'English', 'Other', 0, 7, '2021-06-26 16:34:55', '2021-06-26 16:34:55'),
(491, 'https://apps.apple.com/us/app/sleep-cycle-sleep-tracker/id320606217', 'App: Sleep Cycle – Sleep Tracker', NULL, 'English', 'American', 1, 61, '2021-06-26 16:37:39', '2021-06-26 16:37:39'),
(501, 'https://apps.apple.com/us/app/relax-melodies-sleep-sounds/id314498713', 'App: Relax Melodies (relaxing sounds: nature, melodies, meditations…) - Apple Store', NULL, 'English', 'American', 1, 61, '2021-06-26 16:37:39', '2021-06-26 16:37:39'),
(511, 'https://play.google.com/store/apps/details?id=ipnossoft.rma.free', 'App: Relax Melodies (relaxing sounds: nature, melodies, meditations…) - Google Play', NULL, 'English', 'American', 1, 61, '2021-06-26 16:37:39', '2021-06-26 16:37:39'),
(601, 'https://www.arthritis.org/health-wellness/treatment/complementary-therapies/natural-therapies/types-of-meditation-for-arthritis', '', NULL, 'English', 'American', 0, 63, '2021-06-26 16:43:19', '2021-06-26 16:43:19'),
(611, 'https://themindfulnessapp.com', 'App - The Mindfulness App (introduction to mindfulness, time-guided or silent meditations, personalizes and tracks meditation):', NULL, 'English', 'American', 1, 63, '2021-06-26 16:43:19', '2021-06-26 16:43:19'),
(671, 'https://www.calm.com/?gclid=Cj0KCQjw9YWDBhDyARIsADt6sGYMi9OsMCPN4lkARrzcCvqohjSEdZpSW_JqkekATRZYWQfw2nzN-soaAizzEALw_wcB', 'App - Calm (offers meditations and mind training. Has meditations specific to pain-related illnesses): ', NULL, 'English', 'American', 1, 63, '2021-06-26 16:43:19', '2021-06-26 16:43:19'),
(681, 'https://apps.apple.com/us/app/smiling-mind/id560442518', 'App - Smiling mind (mediation for all ages, section on meditation in the classroom):', NULL, 'English', 'American', 1, 63, '2021-06-26 16:43:19', '2021-06-26 16:43:19'),
(691, 'https://www.petitbambou.com/en/', 'App', NULL, 'English', 'American', 1, 63, '2021-06-26 16:43:19', '2021-06-26 16:43:19'),
(771, 'https://notes.childrenshospital.org/psychological-interventions-for-chronic-pediatric-pain/', '', NULL, 'English', 'American', 0, 64, '2021-06-26 16:44:05', '2021-06-26 16:44:05'),
(821, 'https://teens.aboutkidshealth.ca/Article?contentid=2596&language=English&hub=jiateenhub', 'Canadian “Teens Taking Charge” program:', NULL, 'English', 'Canadian', 0, 10, '2021-06-26 16:44:41', '2021-06-26 16:44:41'),
(831, 'https://teens.aboutkidshealth.ca/Article?contentid=2596&language=English&hub=jiateenhub', 'US “Teens Taking Charge” program links:', NULL, 'English', 'American', 0, 10, '2021-06-26 16:44:41', '2021-06-26 16:44:41'),
(841, 'https://www.jia.org.uk/nsaids-for-children-and-young-people', '', NULL, 'English', 'Other', 0, 10, '2021-06-26 16:44:41', '2021-06-26 16:44:41'),
(851, 'https://www.aboutkidshealth.ca/Article?contentid=1075&language=English', 'Canadian “Teens Taking Charge” program:', NULL, 'English', 'Canadian', 0, 66, '2021-06-26 16:45:33', '2021-06-26 16:45:33'),
(861, 'https://www.arthritis.org/about-arthritis/types/juvenile-idiopathic-arthritis-jia/self-care.php', '', NULL, 'English', 'American', 0, 69, '2021-06-26 16:46:44', '2021-06-26 16:46:44'),
(921, 'https://arthritis.ca/support-education/online-learning/eating-well/what-about-supplements', '', NULL, 'English', 'Canadian', 0, 71, '2021-06-26 16:47:02', '2021-06-26 16:47:02'),
(951, 'https://www.aboutkidshealth.ca/Article?contentid=1083&language=English', '', NULL, 'English', 'Canadian', 0, 72, '2021-06-26 16:47:19', '2021-06-26 16:47:19'),
(971, 'https://arthritis.ca/support-education/online-learning/eating-well/what-about-supplements', '', NULL, 'English', 'Canadian', 0, 73, '2021-06-26 16:48:03', '2021-06-26 16:48:03'),
(1021, 'https://teens.aboutkidshealth.ca/Article?contentid=2611&language=French', '', NULL, 'French', 'Canadian', 0, 1, '2021-06-26 16:23:22', '2021-06-26 16:23:22'),
(1061, 'https://www.aboutkidshealth.ca/Article?contentid=1079&language=French', '', NULL, 'French', 'Canadian', 0, 31, '2021-06-26 16:24:50', '2021-06-26 16:24:50'),
(1101, 'https://www.aboutkidshealth.ca/Article?contentid=1085&language=French', '', NULL, 'French', 'Canadian', 0, 49, '2021-06-26 16:25:24', '2021-06-26 16:25:24'),
(1141, 'https://teens.aboutkidshealth.ca/Article?contentid=2605&language=French', '', NULL, 'French', ' 	Canadian', 0, 5, '2021-06-26 16:26:22', '2021-06-26 16:26:22'),
(1151, 'https://teens.aboutkidshealth.ca/Article?contentid=2606&language=French', '', NULL, 'French', ' Canadian', 0, 5, '2021-06-26 16:26:22', '2021-06-26 16:26:22'),
(1161, 'https://teens.aboutkidshealth.ca/Article?contentid=2608&language=French', '', NULL, 'French', 'Canadian', 0, 5, '2021-06-26 16:26:22', '2021-06-26 16:26:22'),
(1241, 'https://teens.aboutkidshealth.ca/Article?contentid=2604&language=French', '', NULL, 'French', 'Canadian', 0, 35, '2021-06-26 16:27:02', '2021-06-26 16:27:02'),
(1291, 'https://www.aboutkidshealth.ca/Article?contentid=1077&language=French', '', NULL, 'French', 'Canadian', 0, 51, '2021-06-26 16:27:50', '2021-06-26 16:27:50'),
(1301, 'https://www.aboutkidshealth.ca/Article?contentid=1076&language=French', '', NULL, 'French', 'Canadian', 0, 51, '2021-06-26 16:27:50', '2021-06-26 16:27:50'),
(1361, 'https://teens.aboutkidshealth.ca/Article?contentid=2604&language=French', '', NULL, 'French', 'Canadian', 0, 52, '2021-06-26 16:28:26', '2021-06-26 16:28:26'),
(1431, 'https://www.aboutkidshealth.ca/Article?contentid=1076&language=French', '', NULL, 'French', 'Canadian', 0, 2, '2021-06-26 16:29:01', '2021-06-26 16:29:01'),
(1481, 'https://www.aboutkidshealth.ca/Article?contentid=1079&language=French', '', NULL, 'French', 'Canadian', 0, 36, '2021-06-26 16:29:34', '2021-06-26 16:29:34'),
(1531, 'https://www.aboutkidshealth.ca/Article?contentid=1078&language=French', '', NULL, 'French', 'Canadian', 0, 56, '2021-06-26 16:30:03', '2021-06-26 16:30:03'),
(1541, 'https://oppq.qc.ca/blogue/arthrite-chronique-juvenile-et-physiotherapie/', '', NULL, 'French', 'Canadian', 0, 56, '2021-06-26 16:30:03', '2021-06-26 16:30:03'),
(1601, 'https://www.aboutkidshealth.ca/Article?contentid=1076&language=French', '', NULL, 'French', 'Canadian', 0, 57, '2021-06-26 16:31:16', '2021-06-26 16:31:16'),
(1641, 'https://www.aboutkidshealth.ca/Article?contentid=1076&language=French', '', NULL, 'French', 'Canadian', 0, 58, '2021-06-26 16:31:40', '2021-06-26 16:31:40'),
(1681, 'https://www.aboutkidshealth.ca/Article?contentid=1083&language=French', '', NULL, 'French', 'Canadian', 0, 59, '2021-06-26 16:32:17', '2021-06-26 16:32:17'),
(1711, 'https://www.aboutkidshealth.ca/Article?contentid=1083&language=French', '', NULL, 'French', 'Canadian', 0, 37, '2021-06-26 16:32:45', '2021-06-26 16:32:45'),
(1741, 'https://www.aboutkidshealth.ca/Article?contentid=1083&language=French', '', NULL, 'French', 'Canadian', 0, 6, '2021-06-26 16:33:19', '2021-06-26 16:33:19'),
(1771, 'https://teens.aboutkidshealth.ca/fr/aijadolescents', 'Je m\'en charge : gérer l’AIJ en ligne!:', NULL, 'French', 'Canadian', 0, 7, '2021-06-26 16:34:55', '2021-06-26 16:34:55'),
(1861, 'https://www.childhooddisability.ca/wp-content/uploads/2018/11/Newsletter-JIA_FR.pdf', '', NULL, 'French', 'Canadian', 0, 7, '2021-06-26 16:34:55', '2021-06-26 16:34:55'),
(1871, 'https://www.canada.ca/content/dam/phac-aspc/documents/services/publications/diseases-conditions/juvenile-diopathic-arthritis/arthrite-juvenile-fiche-renseignements.pdf', '', NULL, 'French', 'Canadian', 0, 7, '2021-06-26 16:34:55', '2021-06-26 16:34:55'),
(1971, 'https://teens.aboutkidshealth.ca/Article?contentid=2626&language=French', '', NULL, 'French', 'Canadian', 0, 61, '2021-06-26 16:37:39', '2021-06-26 16:37:39'),
(1981, 'https://www.santemonteregie.qc.ca/sites/default/files/2020/12/applications_mobiles_pour_les_enfants_et_adolescents.pdf', 'Application', NULL, 'French', 'Canadian', 1, 61, '2021-06-26 16:37:39', '2021-06-26 16:37:39'),
(2061, 'https://teens.aboutkidshealth.ca/Article?contentid=2585&language=French', '', NULL, 'French', 'Canadian', 0, 55, '2021-06-26 16:40:37', '2021-06-26 16:40:37'),
(2151, 'https://teens.aboutkidshealth.ca/Article?contentid=2591&language=French', '', NULL, 'French', 'Canadian', 0, 63, '2021-06-26 16:43:19', '2021-06-26 16:43:19'),
(2161, 'https://teens.aboutkidshealth.ca/Article?contentid=2592&language=French', '', NULL, 'French', 'Canadian', 0, 63, '2021-06-26 16:43:19', '2021-06-26 16:43:19'),
(2281, 'https://teens.aboutkidshealth.ca/Article?contentid=2612&language=French', '', NULL, 'French', 'Canadian', 0, 64, '2021-06-26 16:44:05', '2021-06-26 16:44:05'),
(2291, 'https://www.aboutkidshealth.ca/Article?contentid=1080&language=French', '', NULL, 'French', 'Canadian', 0, 64, '2021-06-26 16:44:05', '2021-06-26 16:44:05'),
(2351, 'https://www.aboutkidshealth.ca/Article?contentid=1069&language=French', '', NULL, 'French', 'Canadian', 0, 10, '2021-06-26 16:44:41', '2021-06-26 16:44:41'),
(2391, 'https://www.aboutkidshealth.ca/Article?contentid=62&language=French', '', NULL, 'French', 'Canadian', 0, 54, '2022-02-10 05:56:11', '2022-02-10 05:56:11'),
(2411, 'https://www.aboutkidshealth.ca/Article?contentid=1075&language=French', '', NULL, 'French', 'Canadian', 0, 66, '2021-06-26 16:45:33', '2021-06-26 16:45:33'),
(2431, 'https://teens.aboutkidshealth.ca/Article?contentid=2629&language=French', '', NULL, 'French', 'Canadian', 0, 67, '2021-06-26 16:45:54', '2021-06-26 16:45:54'),
(2451, 'https://www.aboutkidshealth.ca/Article?contentid=1081&language=French', '', NULL, 'French', 'Canadian', 0, 69, '2021-06-26 16:46:44', '2021-06-26 16:46:44'),
(2461, 'https://guide-alimentaire.canada.ca/fr/', '', NULL, 'French', 'Canadian', 0, 69, '2021-06-26 16:46:44', '2021-06-26 16:46:44'),
(2471, 'https://www.canada.ca/content/dam/hc-sc/documents/services/canada-food-guide/resources/stakeholder-toolkit/canada-food-guide-presentation-fra.pdf', '', NULL, 'French', 'Canadian', 0, 69, '2021-06-26 16:46:44', '2021-06-26 16:46:44'),
(2541, 'https://arthrite.ca/soutien-et-education/apprentissage-en-ligne-fr/bien-manger/qu-en-est-il-des-supplements', '', NULL, 'French', 'Canadian', 0, 71, '2021-06-26 16:47:02', '2021-06-26 16:47:02'),
(2581, 'https://arthrite.ca/soutien-et-education/apprentissage-en-ligne-fr/bien-manger/qu-en-est-il-des-supplements', '', NULL, 'French', 'Canadian', 0, 72, '2021-06-26 16:47:19', '2021-06-26 16:47:19'),
(2611, 'https://www.aboutkidshealth.ca/fr/Article?contentid=1081&language=French', '', NULL, 'French', 'Canadian', 0, 73, '2021-06-26 16:48:03', '2021-06-26 16:48:03'),
(2671, ' https://arthrite.ca/soutien-et-education/apprentissage-en-ligne-fr/bien-manger/qu-en-est-il-des-supplements', '', NULL, 'French', 'Canadian', 0, 73, '2021-06-26 16:48:03', '2021-06-26 16:48:03'),
(2741, 'https://www.aboutkidshealth.ca/fr/Article?contentid=1081&language=French', '', NULL, 'French', 'Canadian', 0, 74, '2021-06-26 16:48:24', '2021-06-26 16:48:24');

-- --------------------------------------------------------

--
-- Table structure for table `logs`
--

CREATE TABLE `logs` (
  `id` int(11) NOT NULL,
  `purpose` varchar(255) DEFAULT NULL,
  `plan` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`plan`)),
  `step_one` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`step_one`)),
  `preferences` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`preferences`)),
  `step_three` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`step_three`)),
  `user_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `medications`
--

CREATE TABLE `medications` (
  `id` int(11) NOT NULL DEFAULT 0,
  `name` varchar(255) NOT NULL,
  `fr_name` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `classification_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `medications`
--

INSERT INTO `medications` (`id`, `name`, `fr_name`, `classification_id`, `created_at`, `updated_at`) VALUES
(1, 'Abatacept (Orencia®)', 'Abatacept (Orencia®)', 7, '2021-03-16 21:25:40', '2021-03-16 21:25:40'),
(2, 'Adalimumab (Humira®)', 'Adalimumab (Humira®)', 7, '2020-07-22 13:39:27', '2020-07-22 13:39:27'),
(3, 'Anakinra (Kineret®)', 'Anakinra (Kineret®)', 7, '2020-08-06 19:28:16', '2020-08-06 19:28:16'),
(4, 'Apremilast (Otezla®)', 'Aprémilast (Otezla®)', 7, '2021-03-16 21:27:37', '2021-03-16 21:27:37'),
(5, 'Canakinumab (Ilaris®)', 'Canakinumab (Ilaris®)', 7, '2021-03-16 21:24:36', '2021-03-16 21:24:36'),
(6, 'Celecoxib (Celebrex®)', 'Célécoxib (Celebrex®)', 1, '2021-03-16 20:42:22', '2022-02-01 19:22:45'),
(7, 'Certolizumab (Cimzia®)', 'Certolizumab (Cimzia®)', 7, '2021-03-16 21:23:56', '2021-03-16 21:23:56'),
(8, 'Corticosteroid joint injections (in the past three months) ', 'Injections de corticostéroïdes dans les articulations (dans les trois derniers mois) ', 3, '2020-08-06 19:26:18', '2020-08-06 19:26:18'),
(9, 'Diclofenac (Voltaren®)', 'Diclofénac (Voltaren®)', 1, '2021-04-27 23:09:11', '2022-02-01 19:23:03'),
(10, 'Etanercept (Enbrel® or Erelzi®)', 'Etanercept (Enbrel® ou Erelzi®)', 7, '2020-07-22 13:39:03', '2021-03-16 21:21:56'),
(11, 'Golimumab(Symponi®)', 'Golimumab (Symponi®)', 7, '2021-03-16 21:23:31', '2021-03-16 21:23:31'),
(12, 'Hydroxychloroquine (Plaquenil®)', 'Hydroxychloroquine (Plaquenil®)', 6, '2021-03-16 20:55:15', '2021-03-16 20:55:15'),
(13, 'Ibuprofen (Advil®)', 'Ibuprofène (Advil®)', 1, '2020-06-08 23:09:11', '2022-02-01 19:34:40'),
(14, 'Indomethacin (Indocid®)', 'Indométacine (Indocid®)', 1, '2021-03-16 20:41:30', '2022-02-01 19:35:10'),
(15, 'Infliximab (Inflectra® and Renflexis®) biosimilar', 'Infliximab (Inflectra® et Renflexis®) biosimilaire', 7, '2020-08-06 19:28:46', '2020-08-06 19:28:46'),
(16, 'Infliximab (Remicade®)', 'Infliximab (Remicade®)', 7, '2020-07-22 13:39:15', '2020-07-22 13:39:15'),
(17, 'Ixekizumab (Taltz®)', 'Ixekizumab (Taltz®)', 7, '2021-03-16 21:27:14', '2021-03-16 21:27:14'),
(18, 'Leflunomide (Arava®)', 'Léflunomide (Arava®)', 6, '2020-08-06 19:27:29', '2020-08-06 19:27:29'),
(19, 'Meloxicam (Mobics®)', 'Méloxicam (Mobics®)', 1, '2021-03-16 20:29:55', '2022-02-01 19:35:29'),
(20, 'Methotrexate(Metoject®, Rheumatrex®)', 'Méthotrexate (Metoject®, Rheumatrex®)', 6, '2020-08-06 19:27:02', '2020-08-06 19:27:02'),
(21, 'Naproxen (Naprosyn®)', 'Naproxène (Aleve®)', 1, '2020-07-22 13:35:27', '2022-02-01 19:35:46'),
(22, 'Pill or Liquid (Prednisone™ or Prednisolone™)', 'Pilule ou liquide (Prednisone ™ ou Prednisolone ™)', 3, '2020-06-11 16:15:32', '2021-03-16 20:45:13'),
(23, 'Rituximab (Rituxan®)', 'Rituximab (Rituxan®)', 7, '2021-03-16 21:28:00', '2021-03-16 21:28:00'),
(24, 'Secukinumab (Cosentyx®)', 'Secukinumab (Cosentyx®)', 7, '2021-03-16 21:26:57', '2021-03-16 21:26:57'),
(25, 'Sulfasalazine(Metoject®, Rheumatrex®)', 'Sulfasalazine (Metoject®, Rheumatrex®)', 6, '2020-08-06 19:27:13', '2020-08-06 19:27:13'),
(26, 'Tocilizumab (Actemra®)', 'Tocilizumab (Actemra®)', 7, '2021-03-16 21:25:15', '2021-03-16 21:25:15'),
(27, 'Tofacitinib (Xeljanz®)', 'Tofacitinib (Xeljanz®)', 7, '2021-03-16 21:26:06', '2021-03-16 21:26:06'),
(28, 'Ustekinumab (Stelara®)', 'Ustekinumab (Stelara®)', 7, '2021-03-16 21:26:29', '2021-03-16 21:26:29');

-- --------------------------------------------------------

--
-- Table structure for table `motivations`
--

CREATE TABLE `motivations` (
  `id` int(11) NOT NULL,
  `level` float DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `pain_areas`
--

CREATE TABLE `pain_areas` (
  `id` int(11) NOT NULL,
  `ankles` tinyint(1) DEFAULT NULL,
  `elbows` tinyint(1) DEFAULT NULL,
  `hips` tinyint(1) DEFAULT NULL,
  `jaw` tinyint(1) DEFAULT NULL,
  `knees` tinyint(1) DEFAULT NULL,
  `lower_back` tinyint(1) DEFAULT NULL,
  `shoulders` tinyint(1) DEFAULT NULL,
  `wrists` tinyint(1) DEFAULT NULL,
  `neck` tinyint(1) NOT NULL,
  `fingers` tinyint(1) DEFAULT NULL,
  `toes` tinyint(1) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `pain_levels`
--

CREATE TABLE `pain_levels` (
  `id` int(11) NOT NULL,
  `level` float DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `plan_factors_texts`
--

CREATE TABLE `plan_factors_texts` (
  `id` int(11) NOT NULL,
  `text` text DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `preferences`
--

CREATE TABLE `preferences` (
  `id` int(11) NOT NULL DEFAULT 0,
  `description` varchar(255) NOT NULL,
  `fr_description` varchar(82) CHARACTER SET utf8 DEFAULT NULL,
  `recommends` tinyint(1) NOT NULL,
  `left_label` varchar(255) NOT NULL,
  `fr_left_label` varchar(21) CHARACTER SET utf8 DEFAULT NULL,
  `right_label` varchar(255) NOT NULL,
  `fr_right_label` varchar(14) CHARACTER SET utf8 DEFAULT NULL,
  `reversed` tinyint(1) NOT NULL,
  `threshold` float NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `preferences`
--

INSERT INTO `preferences` (`id`, `description`, `fr_description`, `recommends`, `left_label`, `fr_left_label`, `right_label`, `fr_right_label`, `reversed`, `threshold`, `created_at`, `updated_at`) VALUES
(1, 'Relieving pain immediately', 'Soulagement immédiat de la douleur', 1, 'Not Important at All', 'Pas important du tout', 'Very Important', 'Très important', 0, 4, '2020-05-24 23:22:25', '2021-06-14 21:59:00'),
(2, 'Avoiding pain medication on top of my prescribed arthritis medication', 'Éviter de prendre des antidouleurs en plus de mes médicaments contre l’arthrite', 0, 'Not Important at All', 'Pas important du tout', 'Very Important', 'Très important', 0, 4, '2020-05-24 23:22:37', '2020-05-24 23:22:37'),
(3, 'Using treatments that help me relax', 'Utiliser des traitements qui m’aident à relaxer', 1, 'Not Important at All', 'Pas important du tout', 'Very Important', 'Très important', 0, 4, '2020-05-24 23:22:53', '2021-06-11 21:49:55'),
(4, 'Using nutritional approaches that help me stay healthy ', 'Faire appel à des approches nutritionnelles qui m’aident à rester en bonne santé', 1, 'Not Important at All', 'Pas important du tout', 'Very Important', 'Très important', 0, 4, '2020-05-29 02:36:04', '2020-05-29 02:36:04'),
(5, 'Using treatments that help me stay active', 'Utiliser des traitements qui m’aident à rester actif/active', 1, 'Not Important at All', 'Pas important du tout', 'Very Important', 'Très important', 0, 4, '2020-05-29 02:36:30', '2020-05-29 02:36:30'),
(6, 'Using treatments that help me learn to deal with JIA and its symptoms', 'Utiliser des traitements qui m’aident à apprendre à gérer mon AJI et ses symptômes', 1, 'Not Important at All', 'Pas important du tout', 'Very Important', 'Très important', 0, 4, '2020-05-29 02:36:40', '2020-06-22 21:38:24');

-- --------------------------------------------------------

--
-- Table structure for table `preference_category`
--

CREATE TABLE `preference_category` (
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `category_id` int(11) NOT NULL,
  `preference_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `preference_category`
--

INSERT INTO `preference_category` (`created_at`, `updated_at`, `category_id`, `preference_id`) VALUES
('2020-07-04 19:34:28', '2020-07-04 19:34:28', 2, 3),
('2020-07-04 19:33:50', '2020-07-04 19:33:50', 3, 2),
('2020-07-04 19:35:24', '2020-07-04 19:35:24', 4, 5),
('2020-07-27 23:25:52', '2020-07-27 23:25:52', 5, 1),
('2020-07-04 19:35:30', '2020-07-04 19:35:30', 6, 6),
('2020-07-04 19:35:15', '2020-07-04 19:35:15', 7, 4);

-- --------------------------------------------------------

--
-- Table structure for table `preference_texts`
--

CREATE TABLE `preference_texts` (
  `id` int(11) NOT NULL,
  `text` text DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `prescribed_texts`
--

CREATE TABLE `prescribed_texts` (
  `id` int(11) NOT NULL,
  `text` text DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `results`
--

CREATE TABLE `results` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `fr_name` varchar(54) CHARACTER SET utf8 DEFAULT NULL,
  `score` tinyint(4) NOT NULL,
  `statistics` varchar(255) NOT NULL,
  `fr_statistics` varchar(83) CHARACTER SET utf8 DEFAULT NULL,
  `study_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `results`
--

INSERT INTO `results` (`id`, `name`, `fr_name`, `score`, `statistics`, `fr_statistics`, `study_id`, `created_at`, `updated_at`) VALUES
(15, 'Custom-Made Orthotics', 'Orthèses sur mesure', 73, '73 out of 100 youth with JIA have less pain', '73 jeunes sur 100 atteints d’AJI ressentent moins de douleur', 2, '2020-08-10 05:42:42', '2020-08-10 05:42:42'),
(16, 'Store-Bought Insoles', 'Semelles achetées en magasin', 30, '30 out of 100 youth with JIA have less pain', '30 jeunes sur 100 atteints d’AJI ressentent moins de douleur', 2, '2020-08-10 05:42:56', '2020-08-10 17:43:09'),
(17, 'Custom made orthotics', 'Orthèses sur mesure', 71, '71 out of 100 youth with JIA have less pain', '71 jeunes sur 100 atteints d’AJI ressentent moins de douleur', 1, '2020-08-10 05:43:20', '2020-08-10 17:43:05'),
(18, 'Supportive Shoes', 'Chaussures de soutien', 16, '16 out of 100 youth with JIA have less pain', '16 jeunes sur 100 atteints d’AJI ressentent moins de douleur', 1, '2020-08-10 05:43:36', '2020-08-10 05:43:36'),
(19, 'Wrist Splints Worn at Night', 'Attelles de poignet portées la nuit', 66, '66 out of 100 adults with RA have less pain', '66 adultes sur 100 atteints de PR ressentent moins de douleur', 8, '2020-08-10 05:44:06', '2020-08-10 05:44:06'),
(20, 'Wrist Splints Worn for a Short Time', 'Attelles de poignet portées pendant une courte période', 34, '34 out of 100 adults with RA have less pain', '34 adultes sur 100 atteints de PR ressentent moins de douleur', 8, '2020-08-10 05:44:27', '2020-08-10 05:44:27'),
(21, 'Night Mouth Guard', 'Plaque occlusale portée la nuit', 100, '100 out of 100 youth with jaw pain have less pain', '100 jeunes sur 100 souffrant de douleurs à la mâchoire ressentent moins de douleurs', 9, '2020-08-10 05:44:56', '2020-08-10 05:44:56'),
(22, 'Relaxation Therapy', 'Thérapie de relaxation', 9, '9 out of 100 youth with jaw pain have less pain', '9 jeunes sur 100 souffrant de douleurs à la mâchoire ressentent moins de douleur', 9, '2020-08-10 05:45:13', '2020-08-10 05:45:13'),
(23, 'Night Mouth Guard & Brief Information', 'Plaque occlusale portée la nuit et brèves informations', 89, '89 out of 100 youth with jaw pain have less pain', '89 jeunes sur 100 souffrant de douleurs à la mâchoire ressentent moins de douleur', 10, '2020-08-10 05:45:45', '2020-08-10 05:45:45'),
(24, 'Brief Information', 'Brèves informations', 9, '9 out of 100 youth with jaw pain have less pain', '9 jeunes sur 100 souffrant de douleurs à la mâchoire ressentent moins de douleur', 10, '2020-08-10 05:46:07', '2020-08-10 05:46:07'),
(25, 'Pilates', 'Pilates', 75, '75 out of 100 youth with JIA have less pain', '75 jeunes sur 100 atteints d’AJI ressentent moins de douleur', 11, '2020-08-10 05:47:00', '2020-08-10 05:47:00'),
(26, 'General Exercise Program', 'Programme général d\'exercices', 20, '20 out of 100 youth with JIA have less pain', '20 jeunes sur 100 atteints d’AJI ressentent moins de douleur', 11, '2020-08-10 05:47:15', '2020-08-10 05:47:15'),
(27, 'Yoga', 'Yoga', 37, '37 out of 100 adults with RA have less pain', '37 adultes sur 100 atteints de PR ressentent moins de douleur', 3, '2020-08-10 05:47:39', '2020-08-10 05:47:39'),
(28, 'Waitlist', 'Liste d\'attente', 13, '13 out of 100 adults with RA have less pain', '13 adultes sur 100 atteints de PR ressentent moins de douleur', 3, '2020-08-10 05:47:52', '2020-08-10 05:47:52'),
(29, 'Cardio Exercises', 'Exercices cardio', 49, '49 out of 100 adults with RA have less pain', '49 adultes sur 100 atteints de PR ressentent moins de douleur', 12, '2020-08-10 05:48:20', '2020-08-10 05:48:20'),
(30, 'Stretching', 'Étirements', 19, '19 out of 100 adults with RA have less pain', '19 adultes sur 100 atteints de PR ressentent moins de douleur', 12, '2020-08-10 05:48:37', '2020-08-10 05:48:37'),
(31, 'Water Exercise', 'Exercices dans l\'eau', 48, '48 out of 100 adults with RA have less pain', '48 adultes sur 100 atteints de PR ressentent moins de douleur', 13, '2020-08-10 05:49:08', '2020-08-10 05:49:08'),
(32, 'Normal Daily Activities', 'Activités quotidiennes régulières', 13, '13 out of 100 adults with RA have less pain', '13 adultes sur 100 atteints de PR ressentent moins de douleur', 13, '2020-08-10 05:49:24', '2020-08-10 05:49:24'),
(33, 'Cardio Exercises', 'Exercices de cardio', 49, '49 out of 100 adults with RA have less pain', '49 adultes sur 100 atteints de PR ressentent moins de douleur', 15, '2020-08-10 05:49:50', '2020-08-10 05:49:50'),
(34, 'Stretching', 'Étirements', 19, '19 out of 100 adults with RA have less pain', '19 adultes sur 100 atteints de PR ressentent moins de douleur', 15, '2020-08-10 05:50:06', '2020-08-10 05:50:06'),
(35, 'Massage', 'Massothérapie', 96, '96 out of 100 youth with JIA have less pain', '96 jeunes sur 100 atteints d’AJI ressentent moins de douleur', 16, '2020-08-10 05:50:30', '2020-08-10 05:50:30'),
(36, 'Relaxation', 'Relaxation', 12, '12 out of 100 youth with JIA have less pain', '12 jeunes sur 100 atteints d’AJI ressentent moins de douleur', 16, '2020-08-10 05:50:45', '2020-08-10 05:50:45'),
(37, 'Educational Website', 'Site Web éducatif', 39, '39 out of 100 youth with JIA have less pain', '39 jeunes sur 100 atteints d’AJI ressentent moins de douleur', 24, '2020-08-10 05:51:15', '2020-08-10 05:51:15'),
(38, 'Telephone Support', 'Soutien téléphonique', 14, '14 out of 100 youth with JIA have less pain', '14 jeunes sur 100 atteints d’AJI ressentent moins de douleur', 24, '2020-08-10 05:51:33', '2020-08-10 05:51:33'),
(39, 'Joint Protection Program', 'Programme de protection des articulations', 39, '39 out of 100 adults with RA have less pain', '39 adultes sur 100 atteints de PR ressentent moins de douleur', 25, '2020-08-10 05:52:09', '2020-08-10 17:43:22'),
(40, 'Standard Educational Program', 'Programme éducatif standard', 22, '22 out of 100 adults with RA have less pain', '22 adultes sur 100 atteints de PR ressentent moins de douleur', 25, '2020-08-10 05:52:34', '2020-08-10 05:52:34'),
(41, 'Massage', 'Massage', 96, '96 out of 100 youth with JIA have less pain', '96 jeunes sur 100 atteints d’AJI ressentent moins de douleur', 29, '2020-08-10 05:55:20', '2020-08-10 05:55:20'),
(42, 'Relaxation', 'Relaxation', 12, '12 out of 100 youth with JIA have less pain', '12 jeunes sur 100 atteints d’AJI ressentent moins de douleur', 29, '2020-08-10 05:55:46', '2020-08-10 05:55:46'),
(43, 'Fish Oil', 'Huile de poisson', 33, '33 out of 100 adults with RA have less pain', '33 adultes sur 100 atteints de PR ressentent moins de douleur', 39, '2020-08-10 05:56:11', '2020-08-10 05:56:11'),
(44, 'Placebo (fake pill)', 'Placebo (fausse pilule)', 15, '15 out of 100 adults with RA have less pain', '15 adultes sur 100 atteints de PR ressentent moins de douleur', 39, '2020-08-10 05:56:33', '2020-08-10 05:56:33'),
(45, 'Glucosamine Hydrochloride', 'Hydrochlorure de glucosamine', 49, '49 out of 100 adults with RA have less pain', '49 adultes sur 100 atteints de PR ressentent moins de douleur', 40, '2020-08-10 05:57:02', '2020-08-10 05:57:02'),
(46, 'Placebo', 'Placebo', 15, '15 out of 100 adults with RA have less pain', '15 adultes sur 100 atteints de PR ressentent moins de douleur', 40, '2020-08-10 05:57:16', '2020-08-10 05:57:16');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `selection` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `studies`
--

CREATE TABLE `studies` (
  `id` int(11) NOT NULL DEFAULT 0,
  `name` varchar(255) DEFAULT NULL,
  `fr_name` varchar(152) CHARACTER SET utf8 DEFAULT NULL,
  `does_work` varchar(512) NOT NULL,
  `fr_does_work` varchar(422) CHARACTER SET utf8 DEFAULT NULL,
  `is_safe` varchar(512) NOT NULL,
  `fr_is_safe` varchar(576) CHARACTER SET utf8 DEFAULT NULL,
  `believe_research` varchar(255) DEFAULT NULL,
  `fr_believe_research` varchar(119) CHARACTER SET utf8 DEFAULT NULL,
  `rating` tinyint(4) DEFAULT NULL,
  `methods` varchar(1024) DEFAULT NULL,
  `fr_methods` varchar(450) CHARACTER SET utf8 DEFAULT NULL,
  `treatments` varchar(1024) DEFAULT NULL,
  `fr_treatments` varchar(1358) CHARACTER SET utf8 DEFAULT NULL,
  `treatment_results` varchar(1024) DEFAULT NULL,
  `fr_treatment_results` varchar(762) CHARACTER SET utf8 DEFAULT NULL,
  `reference` varchar(1024) DEFAULT NULL,
  `pub_med` varchar(255) DEFAULT NULL,
  `treatment_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `studies`
--

INSERT INTO `studies` (`id`, `name`, `fr_name`, `does_work`, `fr_does_work`, `is_safe`, `fr_is_safe`, `believe_research`, `fr_believe_research`, `rating`, `methods`, `fr_methods`, `treatments`, `fr_treatments`, `treatment_results`, `fr_treatment_results`, `reference`, `pub_med`, `treatment_id`, `created_at`, `updated_at`) VALUES
(1, 'Comparing custom-made foot orthotics to supportive shoes', 'Comparaison des orthèses plantaires sur mesure avec les chaussures de soutien', 'A study of 27 youth with JIA showed that custom-made foot orthotics may reduce pain better than supportive shoes (with good arches) after 3 months.', 'Une étude menée auprès de 27 jeunes atteints d’AJI a montré que les orthèses plantaires sur mesure permettraient de soulager davantage la douleur que les chaussures de soutien (avec un bon soutien de l’arche) après trois mois.', 'Youth with JIA in this study had no side effects.', 'Les jeunes atteints d’AJI dans cette étude n’ont eu aucun effet secondaire.', 'Not sure; it is a low-quality study. It means that we are not sure about these results.', 'Incertain. Il s’agit d’une étude de mauvaise qualité. Cela signifie que nous ne sommes pas certains des résultats.', 2, 'Forty youth with JIA and foot pain were randomly divided into three groups. One group wore custom-made foot orthotics with supportive pads,anothergroup was given store-bought padded insolesmade of neoprene to help absorb shock. The thirdgroup was given supportive sport shoes to wear. Youth wore their new sport shoes for 3 months.', 'Quarante jeunes atteints d’AJI et de douleurs aux pieds ont été séparés au hasard en trois groupes. Un groupe portait des orthèses plantaires sur mesure avec coussinets de soutien, un autre groupe a reçu des semelles intérieures rembourrées en néoprène permettant d’absorber les chocs achetées en magasin. Le troisième groupe a reçu des chaussures de sport de soutien. Les jeunes ont porté leurs nouvelles chaussures de sport pendant trois mois.', 'The custom-made foot orthotics with supportive pads with shock absorbing material. Another group was given store-bought padded insoles made of neoprene, and the third group was given supportive athletic shoes to wear. Youth wore their new sport shoes every time the youth would wear shoes for 3 months.', 'Les orthèses plantaires sur mesure avec des coussinets de soutien et un matériau absorbant les chocs. Un autre groupe a reçu des semelles intérieures rembourrées en néoprène achetées en magasin, et le troisième groupe a reçu des chaussures de sport de soutien. Les jeunes portaient leurs nouvelles chaussures de sport chaque fois qu’ils avaient besoin de porter des chaussures pendant trois mois.', 'The custom-made foot orthotics reduced pain better than the supportive athletic shoes: according to our calculations, 55% morepeople improved in the custom-made foot orthotics group compared to the sport shoes group. The custom-made foot orthotics also reduced pain better than the prefabricated flat neoprene shoe inserts.', 'Les orthèses plantaires sur mesure ont réduit davantage la douleur que les chaussures de sport de soutien. Selon nos calculs, le nombre de personnes qui ont vu une amélioration était 55 % plus élevé dans le groupe portant les orthèses plantaires sur mesure que dans le groupe portant des chaussures de sport. Les orthèses plantaires sur mesure ont également réduit davantage la douleur que les semelles de chaussures plates préfabriquées en néoprène.', 'Powell, M., Seid, M., & Szer, I. S. (2005). Efficacy of custom foot orthotics in improving pain and functional status in children with juvenile idiopathic arthritis: a randomized trial.The Journal of rheumatology,32(5), 943-950.', 'https://www.ncbi.nlm.nih.gov/pubmed/15868634', 1, '2020-06-14 21:45:18', '2020-06-14 21:45:18'),
(2, 'Comparing custom-made foot orthotics to those that are not customized (insoles bought in stores)', 'Comparaison des orthèses plantaires sur mesure avec les orthèses génériques (semelles achetées en magasin)', 'A study of 60 youth with JIA showed that custom-made foot orthotics may reduce pain better than store-bought insoles after 6 months.', 'Une étude menée auprès de 60 jeunes atteints d’AJI a montré que les orthèses plantaires sur mesure permettraient de soulager davantage la douleur que les semelles achetées en magasin après six mois.', 'Youth with JIA in this study had no side effects.', 'Les jeunes atteints d\'AJI dans cette étude n\'ont eu aucun effet secondaire.', 'Yes; it is a high-quality study. It means you can trust these results.', 'Oui. Il s’agit d’une étude de bonne qualité. Cela signifie que vous pouvez faire confiance à ces résultats.', 5, 'Sixty youth with JIA were randomly divided into two groups. One group was given fitted foot orthotics with customized chair-side corrections and the other group was given foot orthotics without corrections.', 'Soixante jeunes atteints d’AJI ont été séparés au hasard en deux groupes. Un groupe a reçu des orthèses plantaires avec des corrections personnalisées alors que l’autre groupe a reçu des orthèses plantaires sans corrections.', 'The fitted foot orthotics with customized chair-side corrections were Slimflex-Plus and the foot orthotics without corrections were made with leather board (1 mm) without corrections. Youth wore them gradually for the first few days and then used them in all shoes at all times including during exercise for 6 months.', 'Les orthèses plantaires avec des corrections personnalisées étaient de la marque Slimflex-Plus et les orthèses plantaires sans corrections ont été réalisées avec une semelle de cuir (1 mm) sans corrections. Les jeunes les ont portés progressivement pendant les premiers jours pour arriver à les porter tout le temps pendant 6 mois, et ce, dans toutes leurs chaussures, y compris en faisant de l’exercice.', 'The fitted foot orthotics with customized chair-side corrections reduced pain better than the foot orthotics without corrections: according to our calculations, 43% morepeople improved in the fitted foot orthotics with customized chair-side corrections group compared to the foot orthotics without corrections group.', 'Les orthèses plantaires ajustées avec corrections personnalisées ont permis de soulager davantage la douleur que les orthèses plantaires sans corrections. Selon nos calculs, le nombre de personnes qui ont vu une amélioration était 43 % plus élevé dans le groupe qui portait des orthèses plantaires ajustées avec corrections personnalisées que dans le groupe qui portait des orthèses plantaires sans correction.', 'Coda, A., Fowlie, P. W., Davidson, J. E., Walsh, J., Carline, T., & Santos, D. (2014). Foot orthoses in children with juvenile idiopathic arthritis: a randomised controlled trial.Archives of disease in childhood,99(7), 649-651.', 'https://www.ncbi.nlm.nih.gov/pubmed/24636956', 1, '2020-06-15 00:58:01', '2020-06-15 00:58:01'),
(3, 'Comparing yoga to being on a waitlist (not doing yoga and not doing a lot of physical activity)', 'Comparaison entre la pratique du yoga et la présence sur une liste d’attente (c.-à-d. ne pas faire de yoga et ne pas faire beaucoup d’activité physique)', 'A study of 53 adults with RA showed that yoga may reduce pain better than being on a waitlist after 2 and half months. Note that there were no studies in JIA.', 'Une étude menée auprès de 53 adultes atteints de PR a montré que le yoga permettrait de soulager la douleur davantage que d’être sur une liste d’attente après deux mois et demi. Aucune étude ne portait spécifiquement sur l’AJI.', 'There were no side effects in this study.', 'Aucun effet secondaire n’a été relevé dans cette étude.', 'Not sure; it is a low-quality study. It means that we are not sure about these results.', 'Pas certain. Il s’agit d’une étude de mauvaise qualité. Cela signifie que nous ne sommes pas certains de ces résultats.', 2, 'Seventy-five adults with rheumatoid arthritis or knee osteoarthritis were randomly divided into two groups. One group was assigned to an Yoga program and one group was waitlisted.', 'Soixante-quinze adultes atteints de polyarthrite rhumatoïde ou d’arthrose du genou ont été séparés au hasard en deux groupes. Un groupe a été affecté à un programme de yoga et un groupe a été inscrit sur une liste d’attente.', 'The IyengarYoga program consisted of 60-min classes held twice weekly for 8 weeks at two hospital-affiliated fitness centers. The program was designed by a registered yoga therapist with input from the Johns Hopkins Arthritis Center faculty. Two experienced yoga therapists taught the classes. Classes began with questions/comments, breathing exercises and chanting, warm-up and moving sequence, and isometric poses to increase strength, flexibility, and balance. Classes ended with deep relaxation, a closing chant, and meditation. Poses included gentle forward bends, backbends, twists, balances, standing, sitting, and lying poses, and were modified for individuals as needed. Written instructions with pictures for home practice and information on the possible benefits of yoga were given weekly. The waitlist group received usual care for 8 weeks and was asked to continue with existing levels of physical activity and inform coordinators of changes in health or arthritis medications.', 'Le programme de yoga Iyengar comprenait des cours de 60 minutes deux fois par semaine pendant huit semaines. Ces cours étaient donnés dans deux centres de conditionnement physique affiliés à l’hôpital. Le programme a été conçu par un thérapeute de yoga agréé avec la participation de membres du Johns Hopkins Arthritis Center. Deux thérapeutes de yoga expérimentés ont enseigné les cours. Les cours commençaient par des questions et commentaires, et se poursuivaient avec des exercices de respiration et des chants, une séquence d’échauffement et de mouvement, et des poses isométriques pour augmenter la force, la flexibilité et l’équilibre. Finalement, les cours se terminaient avec une relaxation profonde, un chant de clôture et une méditation. Les poses comportaient des flexions avant douces, des flexions arrière, des torsions, des équilibres, des postures debout, assise et couchée, et elles étaient modifiées au besoin. Des instructions écrites avec des images pour se pratiquer à la maison ainsi que des informations sur les avantages possibles du yoga étaient données chaque semaine. Les personnes sur la liste d’attente ont reçu leurs soins habituels pendant huit semaines et on leur a demandé de maintenir leur niveau d’activité physique et d’informer les coordonnateurs de tout changement à leur santé ou dans leurs médicaments pour l’arthrite.', 'Iyengar yoga reduced pain better than being on a waitlist:according to our calculations,24% more people improved in the yoga group compared to the waitlist group.', 'Le yoga Iyengar a réduit davantage la douleur que la présence sur une liste d’attente. Selon nos calculs, le nombre de personnes qui ont vu une amélioration était 24 % plus élevé dans le groupe qui faisait du yoga que dans le groupe sur la liste d’attente.', 'Moonaz, S. H., Bingham, C. O., Wissow, L., & Bartlett, S. J. (2015). Yoga in Sedentary Adults with Arthritis: Effects of a Randomized Controlled Pragmatic Trial.The Journal of rheumatology,42(7), 1194–1202. doi:10.3899/jrheum.141129', 'https://www.ncbi.nlm.nih.gov/pubmed/25834206', 5, '2020-06-15 01:02:36', '2020-06-15 01:02:36'),
(8, 'Comparing wrist splints worn at night to wrist splints only worn for a short time.', 'Comparaison des attelles de poignet portées la nuit avec les attelles de poignet portées seulement sur une courte période.', 'A study of 50 adults with RA showed that wrist splints worn at night may reduce pain after 3 months more than wrist splints worn only for a short time. Note that there were no studies in JIA.', 'Une étude menée auprès de 50 adultes atteints de PR a montré que les attelles de poignet portées la nuit permettraient de soulager la douleur davantage après trois mois que les attelles de poignet portées seulement sur une courte période. Aucune étude ne portait spécifiquement sur l’AJI.', 'Adults with RA in this study had no side effects.', 'Les adultes atteints de PR dans cette étude n’ont eu aucun effet secondaire.', 'Probably; it is a moderate-quality study. It means that these results are probably true.', 'Probablement. Il s’agit d’une étude de qualité moyenne. Cela signifie que ces résultats sont probablement vrais.', 3, 'Fifty adults with rheumatoid arthritis were randomly divided into two groups: wrist splints worn at night or wrist splints worn only during evaluations, for 90 days.', 'Cinquante adultes atteints de polyarthrite rhumatoïde ont été séparés au hasard en deux groupes : les personnes qui portaient des attelles de poignet la nuit et celles qui portaient des attelles de poignet uniquement lors des évaluations, et ce, pendant 90 jours.', 'A 3.2-mm thick positioning wrist splint was individually manufactured with thermoplast and fixed with Velcro. The treatment group would wear this splint at night, and the control group would only wear it during evaluations.', 'Une attelle de positionnement de poignet d’une épaisseur de 3,2 mm a été fabriquée pour chaque participant avec du thermoplaste et des fixations en Velcro. Le groupe de traitement portait l’attelle la nuit et le groupe témoin ne la porterait que pendant les évaluations.', 'Wrist splints worn at night reduced pain better than wrist splints worn only during evaluation: according to our calculations, 32% more people improved in the wrist splints worn at night group compared to the wrist splint worn only during evaluation group.', 'Les attelles de poignet portées la nuit ont réduit davantage la douleur que les attelles de poignet portées uniquement lors de l’évaluation. Selon nos calculs, le nombre de personnes qui ont vu une amélioration était de 32 % plus élevé dans le groupe qui portait les attelles de poignet la nuit que dans le groupe qui portait les attelles de poignet uniquement lors de l’évaluation.', 'Silva, A. C., Jones, A., Silva, P. G., & Natour, J. (2008). Effectiveness of a night-time hand positioning splint in rheumatoid arthritis: a randomized controlled trial.Journal of rehabilitation medicine,40(9), 749-754.', 'https://www.ncbi.nlm.nih.gov/pubmed/18843428', 31, '2020-08-09 01:15:23', '2020-08-09 01:15:23'),
(9, 'Comparing mouth guards to relaxation therapy (both with brief information).', 'Comparaison de l’utilisation d’une plaque occlusale avec l’accès à une thérapie de relaxation (les deux avec des informations succinctes).', 'A study of 83 youth with jaw pain showed that mouth guards may reduce pain better than relaxation therapy after 6 months. Note that there were no studies in JIA.', 'Une étude menée auprès de 83 jeunes ayant des douleurs à la mâchoire a montré que l’utilisation d’une plaque occlusale permettrait de soulager la douleur davantage que la thérapie de relaxation après six mois. Aucune étude ne portait spécifiquement sur l’AJI.', 'Youth who used a night mouth guard in this study had no more side effects than youth who did not use a night mouth guard.', 'Les jeunes qui ont utilisé une plaque occlusale la nuit dans cette étude n’avaient pas plus d’effets secondaires que les jeunes qui n’en ont pas utilisé la nuit.', 'Yes; it is a high-quality study. It means you can trust these results.', 'Oui. Il s’agit d’une étude de grande qualité. Cela signifie que vous pouvez faire confiance à ces résultats.', 5, 'One-hundred-and-twenty-two youth who reported pain at least once a week for three months and who had a temporomandibular disorder pain diagnosis were randomly divided into three groups. One group was given brief information and a mouth guard, one group was given brief information and relaxation therapy and one group was given brief information.', 'Cent-vingt-deux jeunes qui signalaient de la douleur au moins une fois par semaine pendant trois mois et qui avaient un diagnostic de douleur associée à un trouble temporomandibulaire ont été séparés au hasard en trois groupes. Le premier groupe a reçu des informations succinctes et une plaque occlusale, le deuxième groupe a reçu des informations succinctes et une thérapie de relaxation, et le troisième groupe a reçu des informations succinctes.', 'Youth who received either brief information and a mouth guard or brief information and relaxation received the treatment in 4 sessions done at 2-week intervals. Those who received brief information alone received information in one session. Those who received the mouth guard were asked to use it every night until the evaluation at 3 months and then when they felt they needed it until the 6-month follow-up. Relaxation training was given to teach youth a quick method to use in everyday situations when they felt bodily tension and pain. Brief information was a 30 minute session given to each youth that explained knowledge related to the disease and about pain and stress.', 'Les jeunes qui ont reçu des informations succinctes et une plaque occlusale ou des informations succinctes et de la relaxation ont reçu le traitement en quatre séances à deux semaines d’intervalles. Les jeunes qui ont reçu des informations succinctes les ont reçues en une seule séance. Les jeunes qui ont reçu la plaque occlusale devaient l’utiliser tous les soirs jusqu’à l’évaluation de trois mois, puis au besoin jusqu’au suivi de six mois. Une formation sur la relaxation a été donnée pour enseigner aux jeunes une méthode rapide à utiliser dans leur quotidien lorsqu’ils ressentaient des tensions et des douleurs corporelles. Les informations succinctes étaient transmises à chaque jeune lors d’une séance de 30 minutes dans le but d’expliquer ce qu’on sait sur la maladie ainsi que sur la douleur et le stress.', 'The brief information and mouth guard reduced pain more than brief information and relaxation therapy:according to our calculations, 91% more people improved in the brief information and mouth guard group compared to the brief information and relaxation therapy group. The brief information and mouth guard reduced pain more than brief information:according to our calculations, 80% more people improved in the brief information and mouth guard group compared to the brief information group.', 'Les informations succinctes et la plaque occlusale ont réduit davantage la douleur que les informations succinctes et la thérapie de relaxation. Selon nos calculs, le nombre de personnes qui ont vu une amélioration était 91 % plus élevé dans le groupe qui a reçu les informations succinctes et la plaque occlusale que dans le groupe qui a reçu les informations succinctes et la thérapie de relaxation. Les informations succinctes et la plaque occlusale ont réduit davantage la douleur que les informations succinctes seules. Selon nos calculs, le nombre de personnes qui ont vu une amélioration était 80 % plus élevé dans le groupe qui a reçu les informations succinctes et la plaque occlusale que dans le groupe qui a seulement reçu les informations succinctes.', 'Wahlund, K. (2003). Temporomandibular disorders in adolescents. Epidemiological and methodological studies and a randomized controlled trial.Swedish dental journal. Supplement, (164), inside-front.', 'https://www.ncbi.nlm.nih.gov/pubmed/14717039', 49, '2020-08-09 01:17:58', '2020-08-09 01:17:58'),
(10, 'Comparing mouth guards with brief information to brief information alone.', 'Comparaison de l’utilisation de plaque occlusale associée à des informations succinctes avec l’accès à des informations succinctes seulement.', 'A study of 81 youth with jaw pain showed that mouth guards and brief information may reduce pain better than brief information alone after 6 months. Note that there were no studies in JIA.', 'Une étude menée auprès de 81 jeunes ayant des douleurs à la mâchoire a montré que l’utilisation d’une plaque occlusale permettrait de soulager davantage la douleur que l’accès à des informations succinctes après six mois. Aucune étude ne portait spécifiquement sur l’AJI.', 'Youth who used a night mouth guard in this study had no more side effects than youth who did not use a night mouth guard.', 'Les jeunes qui ont utilisé une plaque occlusale la nuit dans cette étude n’avaient pas plus d’effets secondaires que les jeunes qui n’en ont pas utilisé la nuit.', 'Yes; it is a high-quality study. It means you can trust these results.', 'Oui', 5, 'One-hundred-and-twenty-two youth who reported pain at least once a week for three months and who had a temporomandibular disorder pain diagnosis were randomly divided into three groups. One group was given brief information and a mouth guard, one group was given brief information and relaxation therapy and one group was given brief information.', 'Cent vingt-deux jeunes qui signalaient de la douleur au moins une fois par semaine pendant trois mois et qui avaient un diagnostic de douleur associée à un trouble temporo-mandibulaire ont été séparés au hasard en trois groupes. Le premier groupe a reçu des informations succinctes et une plaque occlusale, le deuxième groupe a reçu des informations succinctes et une thérapie de relaxation, et le troisième groupe a reçu des informations succinctes.', 'Youth who received either brief information and a mouth guard or brief information and relaxation received the treatment in 4 sessions done at 2-week intervals. Those who received brief information alone received information in one session. Those who received the mouth guard were asked to use it every night until the evaluation at 3 months and then when they felt they needed it until the 6-month follow-up. Relaxation training was given to teach youth a quick method to use in everyday situations when they felt bodily tension and pain. Brief information was a 30 minute session given to each youth that explained knowledge related to the disease and about pain and stress.', 'Les jeunes qui ont reçu soit des informations succinctes et une plaque occlusale ou des informations succinctes et de la relaxation ont reçu le traitement en quatre séances à deux semaines d’intervalles. Les jeunes qui ont reçu des informations succinctes les ont reçues en une seule séance. Les jeunes qui ont reçu la plaque occlusale devaient l’utiliser tous les soirs jusqu’à l’évaluation de trois mois, puis au besoin jusqu’au suivi de six mois. Une formation sur la relaxation a été donnée pour enseigner aux jeunes une méthode rapide à utiliser dans leur quotidien lorsqu’ils ressentaient des tensions et des douleurs corporelles. Les informations succinctes étaient transmises à chaque jeune lors d’une séance de 30 minutes dans le but d’expliquer ce qu’on sait sur la maladie ainsi que sur la douleur et le stress.', 'The brief information and mouth guard reduced pain more than brief information and relaxation therapy: according to our calculations, 91% more people improved in the brief information and mouth guard group compared to the brief information and relaxation therapy group. The brief information and mouth guard reduced pain more than brief information: according to our calculations, 80% more people improved in the brief information and mouth guard group compared to the brief information group.', 'Les informations succinctes et la plaque occlusale ont réduit davantage la douleur que les informations succinctes et la thérapie de relaxation. Selon nos calculs, le nombre de personnes qui ont vu une amélioration était 91 % plus élevé dans le groupe qui a reçu les informations succinctes et la plaque occlusale que dans le groupe qui a reçu les informations succinctes et la thérapie de relaxation. Les informations succinctes et la plaque occlusale ont réduit davantage la douleur que les informations succinctes seules. Selon nos calculs, le nombre de personnes qui ont vu une amélioration était 80 % plus élevé dans le groupe qui a reçu les informations succinctes et la plaque occlusale que dans le groupe qui a seulement reçu les informations succinctes.', 'Wahlund, K. (2003). Temporomandibular disorders in adolescents. Epidemiological and methodological studies and a randomized controlled trial. Swedish dental journal. Supplement, (164), inside-front.', 'https://www.ncbi.nlm.nih.gov/pubmed/14717039', 49, '2020-08-09 16:31:57', '2020-08-09 16:31:57'),
(11, 'Comparing pilates to conventional exercise program', 'Comparaison du Pilates avec un programme d’exercice traditionnel', 'A study of 50 youth with JIA showed that pilates may reduce pain better than a general exercise program after 6 months.', 'Une étude menée auprès de 50 jeunes atteints d’AJI a montré que le Pilates permettrait de soulager davantage la douleur qu’un programme d’exercice traditionnel après six mois.', 'Youth with JIA in this study had no side effects.', 'Les jeunes atteints d’AJI dans cette étude n’ont eu aucun effet secondaire.', 'Probably; it is a moderate-quality study. It means that these results are probably true.', 'Probablement. Il s’agit d’une étude de qualité moyenne. Cela signifie que ces résultats sont probablement vrais.', 3, 'Fifty youth with JIA were randomly divided into two groups. One group was given a conventional exercise program and one group participated in a Pilates exercise program. Each exercise program was done under the supervision of a trained physical therapist. The sessions were 50 minutes and occurred twice per week for 6 months.', 'Cinquante jeunes atteints d’AJI ont été séparés au hasard en deux groupes. Un groupe a reçu un programme d’exercices traditionnel et un groupe a participé à un programme de Pilates. Chaque programme d’exercices a été réalisé sous la supervision d’un physiothérapeute qualifié. Les séances duraient 50 minutes et avaient lieu deux fois par semaine pendant six mois.', 'The Pilates program followed STOTT-PILATES methods and included floor exercises and exercises with the Reformer, Stability Chair, Cadillac and Ladder Barrel. The exercises were adapted to the age and physical and cognitive abilities of youth. Five repetitions of each exercise were done for the first 3 classes, 8 repetitions for the next 3 classes, and 10 repetitions in subsequent classes. The conventional exercise program was also adapted and was available as a handout to patients. It included a warm-up, a workout, and a cooling-down period. The exercises were done with a series of 6 to 10 repetitions in the supine, prone, and seated positions. The stretching exercise positions were maintained for 30 seconds.', 'Le programme de Pilates suivait la méthode STOTT-PILATES et comprenait des exercices au sol et des exercices avec l’appareil reformer, la chaise de stabilité, la table Cadillac et le baril à échelle. Les exercices ont été adaptés à l’âge ainsi qu’aux capacités physiques et cognitives des jeunes. Cinq répétitions de chaque exercice ont été effectuées pour les trois premières classes. Pour les trois classes suivantes, les répétitions ont passé à huit. Enfin, dix répétitions ont été effectuées lors des classes suivantes. Le programme d’exercice traditionnel a également été adapté et a été transmis aux patients sous forme de document papier. Il comprenait un échauffement, une séance d’entraînement et une période de récupération. Les exercices ont été effectués en série de six à dix répétitions en position couchée sur le dos, couchée sur le ventre et assise. Pour les exercices d’étirement, la position était maintenue pendant 30 secondes.', 'The Pilates exercise reduced pain better than the conventional exercise program: according to our calculations, 55% more people improved in the Pilates group compared to the conventional exercise group.', 'Le Pilates a réduit davantage la douleur que le programme d’exercice traditionnel. Selon nos calculs, le nombre de personnes qui ont vu une amélioration était 55 % plus élevé dans le groupe qui faisait du Pilates que dans le groupe qui suivait un prograkke d’exercice traditionnel.', 'Mendonça, T. M., Terreri, M. T., Silva, C. H., Neto, M. B., Pinto, R. M., Natour, J., & Len, C. A. (2013). Effects of Pilates exercises on health-related quality of life in individuals with juvenile idiopathic arthritis.Archives of physical medicine and rehabilitation,94(11), 2093-2102.', 'https://www.ncbi.nlm.nih.gov/pubmed/23806610\"', 34, '2020-08-10 01:21:49', '2020-08-10 01:21:49'),
(12, 'Comparing cardio exercises to stretching', 'Comparaison des exercices de cardio avec les étirements', 'A study of 40 adults with RA showed that cardio exercises may reduce pain better than stretching after 2 weeks. Note that there were no studies in JIA', 'Une étude menée auprès de 40 adultes atteints de PR a montré que les exercices de cardio permettraient de soulager la douleur davantage que les étirements après deux semaines. Aucune étude ne portait spécifiquement sur l’AJI', 'There were no side effects in this study.', 'Aucun effet secondaire n’a été relevé dans cette étude.', 'Not sure; it is a low quality study. It means that we are not sure about these results.', 'Incertain. Il s’agit d’une étude de mauvaise qualité. Cela signifie que nous ne sommes pas certains de ces résultats.', 2, 'Forty adults with rheumatoid arthritis were randomly divided into two groups. One group was assigned to an aerobics exercise program and the other was assigned to a range of motion (ROM) exercise program.', 'Quarante adultes atteints de polyarthrite rhumatoïde ont été séparés au hasard en deux groupes. Un groupe a été affecté à un programme d’aérobique et l’autre à un programme d’exercices d’amplitude de mouvement.', 'The program consisted of five 20-minute sessions weekly for 2 weeks. In the ROM exercise program, all joint movements of the upper and lower extremities were exercised throughout the entire possible ROM. The movements were active and done at a low pace. The exercises were individually supervised by exercise therapists and performed in prone, sitting and standing positions. The aerobics exercise program was done on a treadmill while the heart rate was maintained at 60% of the age predicted maximum heart rate. Evaluations were done at the end of the first and second week.', 'Le programme comprenait cinq séances de 20 minutes par semaine pendant deux semaines. Dans le programme d’exercices d’amplitude, les exercices visaient l’ensemble des mouvements articulaires des membres supérieurs et inférieurs sur toute l’amplitude possible. Les mouvements étaient actifs et effectués à un rythme lent. Les exercices ont été supervisés individuellement par des thérapeutes et exécutés en position couchée sur le ventre, assise et debout. Le programme d’aérobique a été effectué sur un tapis roulant et la fréquence cardiaque a été maintenue à 60 % de la fréquence cardiaque maximale prévue pour l’âge. Les évaluations ont été effectuées à la fin de la première et de la deuxième semaine.', 'The aerobics program reduced pain better than the ROM exercise program:according to our calculations,30more people improved in the aerobics group compared to the ROM exercise group.', 'Le programme d’aérobique a réduit davantage la douleur que le programme d’exercices d’amplitude. Selon nos calculs, 30 personnes de plus ont vu une amélioration dans le groupe qui faisait des exercices d’aérobique que dans le groupe qui faisait des exercices d’amplitude de mouvement.', 'Melikoglu, M. A., Karatay, S., Senel, K., & Akcay, F. (2006). Association between dynamic exercise therapy and IGF-1 and IGFBP-3 concentrations in the patients with rheumatoid arthritis.Rheumatology international,26(4), 309-313.', 'https://www.ncbi.nlm.nih.gov/pubmed/15933856', 35, '2020-08-10 01:23:38', '2020-08-10 01:23:38'),
(13, 'Comparing water activities to normal daily activities', 'Comparaison des activités dans la piscine avec les activités quotidiennes habituelles', 'A study of 30 adults with RA showed that water exercises may reduce pain better than normal daily activities after 3 months. Note that there were no studies in JIA', 'Une étude menée auprès de 30 adultes atteints de PR a montré que les exercices dans la piscine permettraient de soulager la douleur davantage que les activités quotidiennes habituelles après trois mois. Aucune étude ne portait spécifiquement sur l’AJI', 'There were no side effects in this study.', 'Aucun effet secondaire n’a été relevé dans cette étude.', 'Not sure; it is a low-quality study. It means that we are not sure about these results.', 'Pas certain. Il s’agit d’une étude de mauvaise qualité. Cela signifie que nous ne sommes pas certains de ces résultats.', 2, 'Thirty-four adults with rheumatoid arthritis were randomly divided into two groups. One group was assigned to a water exercise program and the other group was assigned to normal daily activity.', 'Trente-quatre adultes atteints de polyarthrite rhumatoïde ont été séparés au hasard en deux groupes. Un groupe a été affecté à un programme d’exercices en piscine et l’autre groupe a été affecté à l’activité quotidienne habituelle.', 'The water exercise program emphasized muscle strength activity and consisted of two sessions a week for 12 weeks. Sessions lasted 45 minutes the first two weeks and gradually increased to 60 minutes the last two weeks.', 'Le programme d’exercices dans l’eau mettait l’accent sur les activités de musculation et consistait en deux séances par semaine pendant 12 semaines. Les séances duraient 45 minutes les deux premières semaines et augmentaient progressivement pour atteindre 60 minutes lors des deux dernières semaines.', 'The water exercise program reduced pain better than normal daily activity:according to our calculations,35% more people improved in the water exercise group compared to the normal daily activity group.', 'Le programme d’exercices en piscine a réduit davantage la douleur que l’activité quotidienne normale. Selon nos calculs, le nombre de personnes qui ont vu une amélioration était 35 % plus élevé dans le groupe qui faisait des exercices dans l’eau que dans le groupe qui faisait des activités quotidiennes habituelles.', 'Rintala, P., Kettunen, H., & McCubbin, J. A. (1996). Effects of a water exercise program for individuals with rheumatoid arthritis.Research in Sports Medicine: An International Journal,7(1), 31-38.', 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3415190/', 50, '2020-08-10 01:24:56', '2020-08-10 17:42:15'),
(14, NULL, '', 'Researchers need to explore whether individualized exercise programs reduce pain. There isn’t enough research yet in JIA. However, individualized exercise programs may help reduce pain among adults.', 'Les chercheurs doivent déterminer si les programmes d’exercices personnalisés soulagent la douleur. Il n’y a pas encore suffisamment d’études spécifiques à l’AJI. Cependant, des programmes d’exercices personnalisés permettraient de soulager la douleur chez les adultes.', 'There are rare side effects when supervised by a health professional.', 'Les effets secondaires sont rares lorsque les exercices sont supervisés par un professionnel de la santé.', NULL, '', 0, NULL, '', NULL, '', NULL, '', NULL, NULL, 51, '2020-08-10 01:25:44', '2020-08-10 01:25:44'),
(15, 'Comparing stretching to cardio exercises', 'Comparaison des étirements avec les exercices de cardio', 'A study of 40 adults with RA showed that cardio exercises may reduce pain better than stretching after 2 weeks. However, some adults with RA still improved with stretching. Note that there were no studies in JIA.', 'Une étude menée auprès de 40 adultes atteints de PR a montré que les exercices de cardio permettraient de soulager la douleur davantage que les étirements après deux semaines. Cependant, certains adultes atteints de PR ont quand même vu des améliorations en faisant des étirements. Aucune étude ne portait spécifiquement sur l\'AJI.', 'There were no side effects in this study.', 'Aucun effet secondaire n’a été relevé dans cette étude.', 'Not sure; it is a low-quality study. It means that we are not sure about these results.', 'Incertain. Il s’agit d’une étude de mauvaise qualité. Cela signifie que nous ne sommes pas certains de ces résultats.', 2, 'Forty adults with rheumatoid arthritis were randomly divided into two groups. One group was assigned to an aerobics exercise program and the other was assigned to a range of motion (ROM) exercise program.', 'Quarante adultes atteints de polyarthrite rhumatoïde ont été séparés au hasard en deux groupes. Un groupe a été affecté à un programme d\'aérobic et l\'autre à un programme d\'exercices d\'amplitude de mouvement.', 'The program consisted of five 20-minute sessions weekly for 2 weeks. In the ROM exercise program, all joint movements of the upper and lower extremities were exercised throughout the entire possible ROM. The movements were active and done at a low pace. The exercises were individually supervised by exercise therapists and performed in prone, sitting and standing positions. The aerobics exercise program was done on a treadmill while the heart rate was maintained at 60% of the age predicted maximum heart rate. Evaluations were done at the end of the first and second week.', 'Le programme comprenait cinq séances de 20 minutes par semaine pendant deux semaines. Dans le programme d’exercices d’amplitude, les exercices visaient l’ensemble des mouvements articulaires des membres supérieurs et inférieurs sur toute l’amplitude possible. Les mouvements étaient actifs et effectués à un rythme lent. Les exercices ont été supervisés individuellement par des thérapeutes et exécutés en position couchée sur le ventre, assise et debout. Le programme d’aérobic a été effectué sur un tapis roulant et la fréquence cardiaque a été maintenue à 60 % de la fréquence cardiaque maximale prévue pour l\'âge. Les évaluations ont été effectuées à la fin de la première et de la deuxième semaine.', 'The aerobics program reduced pain better than the ROM exercise program:according to our calculations, 30 more people improved in the aerobics group compared to the ROM exercise group.', 'Le programme d’aérobique a réduit davantage la douleur que le programme d’exercices d’amplitude. Selon nos calculs, 30 personnes de plus ont vu une amélioration dans le groupe qui faisait des exercices d’aérobique que dans le groupe qui faisait des exercices d’amplitude de mouvement.', 'Melikoglu, M. A., Karatay, S., Senel, K., & Akcay, F. (2006). Association between dynamic exercise therapy and IGF-1 and IGFBP-3 concentrations in the patients with rheumatoid arthritis. Rheumatology international,26(4), 309-313.', 'https://www.ncbi.nlm.nih.gov/pubmed/15933856', 52, '2020-08-10 01:27:10', '2020-08-10 01:27:10'),
(16, 'Comparing massage to relaxation techniques', 'Comparaison du massage avec les techniques de relaxation', 'A study of 20 youth with JIA showed that massage may reduce pain better than relaxation after 1 month.', 'Une étude menée auprès de 20 jeunes atteints d’AJI a montré que le massage permettrait de soulager davantage la douleur que la relaxation après un mois.', 'There were no side effects for youth with JIA.', 'Aucun effet secondaire n’a été relevé chez les jeunes atteints d’AJI.', 'Not sure; it is a low-quality study. It means that we are not sure about these results.', 'Incertain. Il s’agit d’une étude de mauvaise qualité. Cela signifie que nous ne sommes pas certains de ces résultats.', 2, 'Twenty youth with JIA were randomly divided into two groups. One group received massage therapy and the other group received relaxation therapy.', 'Vingt jeunes atteints d’AJI ont été séparés au hasard en deux groupes. Un groupe a reçu de la massothérapie et l’autre groupe a reçu de la thérapie de relaxation.', 'The massage therapy group received a daily 15-minute massage by one of their parents for 30 days. During the massage, the child was first placed in a supine position and the parent applied oil and stroked the child’s face, stomach, legs and arms. Then, in a prone position, the child’s back was massaged. The relaxation therapy group experienced a 15-minute relaxation session with one of their parents (who received training and written instructions) for 30 days. During the relaxation session, the child laid on his/her back and was instructed to tighten and relax different muscles in the face, back, arms, hands, thighs, calves and feet.', 'Le groupe qui faisait de la massothérapie recevait un massage de 15 minutes par l’un de ses parents tous les jours pendant 30 jours. Le massage a commencé avec l’enfant couché sur le dos. Le parent appliquait de l’huile et caressait le visage, l’estomac, les jambes et les bras de l’enfant. Puis, l’enfant se tournait sur le ventre pour que son parent lui masse le dos. Le groupe de thérapie de relaxation faisait une séance de relaxation de 15 minutes avec un parent (qui avait reçu une formation et des instructions écrites) pendant 30 jours. Au cours de la séance de relaxation, l’enfant était allongé sur le dos et recevait l’instruction de serrer et de détendre différents muscles du visage, du dos, des bras, des mains, des cuisses, des mollets et des pieds.', 'Massage therapy reduced pain better than relaxation therapy:according to our calculations, 84% more people improved in the massage group compared to the relaxation group.', 'La massothérapie a réduit davantage la douleur que la relaxation. Selon nos calculs, le nombre de personnes qui ont vu une amélioration était 84 % plus élevé dans le groupe de massothérapie que dans le groupe de relaxation.', 'Field, T., Hernandez-Reif, M., Seligmen, S., Krasnegor, J., Sunshine, W., Rivas-Chacon, R., ... & Kuhn, C. (1997). Juvenile rheumatoid arthritis: benefits from massage therapy.Journal of pediatric Psychology,22(5), 607-617.', 'https://www.ncbi.nlm.nih.gov/pubmed/9383925', 2, '2020-08-10 01:28:37', '2020-08-10 01:28:37'),
(17, NULL, '', 'Researchers need to explore whether occupational therapy interventions reduce pain in JIA. There isn’t enough research yet.', 'Les chercheurs doivent déterminer si les interventions d’ergothérapie réduisent la douleur chez les personnes atteintes d’AJI. Il n’y a pas encore suffisamment d’études à ce sujet.', 'There are rare side effects.', 'Il y a des effets secondaires rares.', NULL, '', 0, NULL, '', NULL, '', NULL, '', NULL, NULL, 36, '2020-08-10 01:29:39', '2020-08-10 01:29:39'),
(18, NULL, '', 'Researchers need to explore whether physiotherapy interventions reduce pain in JIA. There isn’t enough research yet in JIA. However, physiotherapy interventions may help reduce pain among adults.', 'Les chercheurs doivent déterminer si les interventions de physiothérapie réduisent la douleur chez les personnes atteintes d’AJI. Il n’y a pas encore suffisamment d’études spécifiques à l’AJI. Cependant, les interventions de physiothérapie peuvent aider à réduire la douleur chez les adultes.', 'There are rare side effects.', 'Il y a des effets secondaires rares.', NULL, '', 0, NULL, '', NULL, '', NULL, '', NULL, NULL, 56, '2020-08-10 01:30:08', '2020-08-10 01:30:08'),
(19, NULL, '', 'Researchers need to explore whether heat packs reduce pain in JIA. There isn’t enough research yet.', 'Les chercheurs doivent déterminer si les compresses chauffantes réduisent la douleur chez les personnes atteintes l’AJI. Il n’y a pas encore suffisamment d’études à ce sujet.', 'There are rare serious side effects. Heat burns can occur if packs, baths or showers are too hot. It is suggested not to use heat packs if the joints are already red and warm because it may worsen the inflammation in your joints.', 'Il existe de rares effets secondaires graves. Les compresses, les bains ou les douches trop chauds peuvent causer des brûlures. Il est suggéré de ne pas utiliser de compresses chauffantes si les articulations sont déjà rouges et chaudes, car cela pourrait aggraver l’inflammation de vos articulations.', NULL, '', 0, NULL, '', NULL, '', NULL, '', NULL, NULL, 57, '2020-08-10 01:30:28', '2020-08-10 01:30:28'),
(20, NULL, '', 'Researchers need to explore whether cold packs reduce pain in JIA. There isn’t enough research yet.', 'Les chercheurs doivent déterminer si les compresses froides réduisent la douleur chez les personnes atteintes d’AJI. Il n’y a pas encore suffisamment d’études à ce sujet.', 'There are rare serious side effects. Ice burns can occur if ice is used for too long.', 'Il existe de rares effets secondaires graves. Des brûlures par le froid peuvent survenir si la glace est appliquée trop longtemps.', NULL, '', 0, NULL, '', NULL, '', NULL, '', NULL, NULL, 58, '2020-08-10 01:30:49', '2020-08-10 01:30:49'),
(21, NULL, '', 'Researchers need to explore whether acupuncture reduces pain in JIA. There isn’t enough research yet.', 'Les chercheurs doivent déterminer si l’acuponcture réduit la douleur chez les personnes atteintes d’AJI. Il n’y a pas encore suffisamment d’études à ce sujet.', 'Mild side effects such as pain, bruising, bleeding and worsening of symptoms can occur. Serious side effects are rare when health providers are well-trained.', 'Des effets secondaires légers tels que douleur, ecchymoses, saignements et aggravation des symptômes peuvent survenir. Les effets secondaires graves sont rares lorsque les professionnels de la santé sont bien formés.', NULL, '', 0, NULL, '', NULL, '', NULL, '', NULL, NULL, 59, '2020-08-10 01:31:30', '2020-08-10 01:31:30'),
(22, NULL, '', 'Researchers need to explore whether chiropractic treatments reduce pain for youth who have JIA. There isn’t enough research yet.', 'Les chercheurs doivent déterminer si la chiropractie réduit la douleur chez les jeunes atteints d’AJI. Il n’y a pas encore suffisamment d’études à ce sujet.', 'Side effects include soreness, stiffness and headaches. More serious side effects are dislocations and fractures. Serious adverse events may be associated with pediatric manipulation of the spine.', 'Les effets secondaires comprennent la douleur, la raideur et les maux de tête. Les effets secondaires plus graves sont les luxations et les fractures. Des événements indésirables graves peuvent être associés à la manipulation de la colonne vertébrale chez les enfants.', NULL, '', 0, NULL, '', NULL, '', NULL, '', NULL, NULL, 37, '2020-08-10 02:23:30', '2020-08-10 02:23:30'),
(23, NULL, '', 'Researchers need to explore whether osteopathy  reduces pain for youth who have JIA. There isn’t enough research yet.', 'Les chercheurs doivent déterminer si l’ostéopathie réduit la douleur chez les jeunes atteints d’AJI. Il n’y a pas encore suffisamment d’études à ce sujet.', 'There are rare side effects when health providers are well-trained. Minor side effects are worsening of symptoms, irritability, soreness, headache, behaviour problems and pain. You may feel sore within 24 to 48 hours after the first session.', 'Il existe de rares effets secondaires lorsque les professionnels de la santé sont bien formés. Les effets secondaires mineurs sont l’aggravation des symptômes, l’irritabilité, la douleur, les maux de tête, les problèmes de comportement et la douleur. Vous pouvez ressentir des douleurs dans les 24 à 48 heures suivant la première séance.', NULL, '', 0, NULL, '', NULL, '', NULL, '', NULL, NULL, 6, '2020-08-10 02:23:50', '2020-08-10 02:23:50');
INSERT INTO `studies` (`id`, `name`, `fr_name`, `does_work`, `fr_does_work`, `is_safe`, `fr_is_safe`, `believe_research`, `fr_believe_research`, `rating`, `methods`, `fr_methods`, `treatments`, `fr_treatments`, `treatment_results`, `fr_treatment_results`, `reference`, `pub_med`, `treatment_id`, `created_at`, `updated_at`) VALUES
(24, 'Comparing an educational website to telephone support', 'Comparaison de l’utilisation d’un site Web éducatif avec l’utilisation d’un soutien téléphonique', 'A study of 46 youth with JIA showed that internet self-management (“Teens Taking Charge”) may reduce pain better than telephone support after about 2 months.', 'Une étude menée auprès de 46 jeunes atteints d’AJI a montré qu’un programme d’autogestion en ligne (« Je m\'en charge ») permettrait de soulager davantage la douleur que du soutien téléphonique après environ deux mois.', 'There were no side effects for youth with JIA in this study.', 'Aucun effet secondaire n’a été relevé pour les jeunes atteints d’AJI dans cette étude.', 'Not sure; it is a low-quality study. It means that we are not sure about these results.', 'Incertain. Il s’agit d’une étude de mauvaise qualité. Cela signifie que nous ne sommes pas certains de ces résultats.', 2, 'Forty-six youth with JIA were randomly divided into two groups. One group was assigned to an internet self-management program and the other received telephone support to discuss self-management strategies.', 'Quarante-six jeunes atteints d’AJI ont été séparés au hasard en deux groupes. Un groupe a été affecté à un programme d’autogestion en ligne et l’autre a reçu un soutien téléphonique pour discuter des stratégies d’autogestion.', 'The internet self-management program consisted of 20-30 minute modules completed weekly for 12 weeks and included self-management strategies, disease-specific information and social support that was available in English and French. Youth were contacted by a coach on a weekly basis to review the previous week’s module, homework and goals and to provide guidance and help solve problems. Youth also developed their own personal goals for the program and kept track of their progress in a journal. The telephone support program included weekly phone calls with a trained research assistant to discuss the adolescent’s best efforts at managing their JIA.', 'Le programme d’autogestion en ligne comprenait des modules de 20 à 30 minutes par semaine pendant 12 semaines qui incluaient des stratégies d’autogestion, des informations spécifiques à la maladie et un soutien social disponible en anglais et en français. Les jeunes ont été contactés par un coach chaque semaine pour revoir le module, les devoirs et les objectifs de la semaine précédente et pour fournir des conseils et aider à résoudre les problèmes. Les jeunes ont également défini leurs propres objectifs pour le programme et ont suivi leurs progrès dans un journal. Le programme de soutien téléphonique comprenait des appels téléphoniques hebdomadaires avec un assistant de recherche qualifié pour discuter des efforts de l’adolescent pour prendre en charge son AJI.', 'Internet self-management reduced pain better than telephone support:according to our calculations,25% more people improved in the internet self-management group compared to the telephone support group.', 'L’autogestion en ligne a réduit davantage la douleur que le soutien téléphonique. Selon nos calculs, le nombre de personnes qui ont vu une amélioration était 25 % plus élevé dans le groupe qui utilisait le programme d’autogestion en ligne que dans le groupe qui recevait du soutien téléphonique.', 'Stinson, J. N., McGRATH, P. J., Hodnett, E. D., Feldman, B. M., Duffy, C. M., Huber, A. M., ... & Campillo, S. (2010). An internet-based self-management program with telephone support for adolescents with arthritis: a pilot randomized controlled trial.The Journal of Rheumatology,37(9), 1944-1952.', 'https://www.ncbi.nlm.nih.gov/pubmed/20595280', 7, '2020-08-10 02:25:23', '2020-08-10 02:25:23'),
(25, 'Comparing joint protection program to a standard educational program', 'Comparaison d’un programme de protection des articulations avec un programme d’éducation standard', 'A study of 127 adults with RA showed that joint protection programs reduce pain more than standard educational programs. Note that there were no studies in JIA.', 'Une étude menée auprès de 127 adultes atteints de PR a montré que les programmes de protection des articulations permettaient de soulager davantage la douleur que les programmes d’éducation standards. Aucune étude ne portait spécifiquement sur l’AJI.', 'There are rare side effects.', 'Il y a des effets secondaires rares.', 'Probably; it is a moderate-quality study. It means that these results are probably true.', 'Probablement. Il s’agit d’une étude de qualité moyenne. Cela signifie que ces résultats sont probablement vrais.', 3, 'One hundred and twenty-seven adults with RA were randomly divided into two groups. One group attended the joint protection programme and the other was assigned to attend the standard programme. Assessments were made at baseline, then after six and after twelve months.', 'Cent-vingt-sept adultes atteints de PR ont été séparés au hasard en deux groupes. Un groupe a participé au programme de protection des articulations et l’autre a été affecté au programme standard. Une évaluation a été réalisée au départ, puis après six mois et après douze mois.', 'Joint protection programme (information pack, workbook with the principles of joint protection with photographs of these methods) vs. Standard programme (short talks on drug treatments, alternative therapies, diet, exercise, rest and positioning, energy conservation, joint protection, assistive devices, splinting, pain and relaxation and other methods, demonstration and practice of exercise, joint protection and relaxation was included –15 to 45 minutes for each).', 'Le programme de protection des articulations (trousse d’information, cahier d’exercices avec les principes de protection articulaire incluant des photographies des méthodes) vs le programme standard (brèves présentations sur les traitements médicamenteux, les thérapies alternatives, l’alimentation, l’exercice, le repos et le positionnement, la conservation de l’énergie, la protection des articulations, les appareils d’assistance, l’utilisation d’attelles, la douleur et la relaxation, et d’autres méthodes, la démonstration et la pratique d’exercices, la protection des articulations et la relaxation étaient inclus - 15 à 45 minutes pour chacun).', 'Joint protection programme reduced pain better than the standard programme:according to our calculations,17% more people improved in the joint protection programme group compared to the standard programme group', 'Le programme de protection articulaire a réduit davantage la douleur que le programme standard. Selon nos calculs, le nombre de personnes qui ont vu une amélioration était 17 % plus élevé dans le groupe qui suivait le programme de protection des articulations que dans le groupe qui suivait le programme standard.', 'Hammond, A., & Freeman, K. (2001). One‐year outcomes of a randomized controlled trial of an educational–behavioural joint protection programme for people with rheumatoid arthritis.Rheumatology,40(9), 1044-1051.', 'https://www.ncbi.nlm.nih.gov/pubmed/11561117', 53, '2020-08-10 02:26:42', '2020-08-10 02:26:42'),
(26, NULL, '', 'Researchers need to explore whether a good sleeping routine reduces pain for youth who have JIA. There isn’t enough research yet. However, we know that better sleep can reduce your pain.', 'Les chercheurs doivent déterminer si une bonne routine de sommeil réduit la douleur chez les jeunes atteints d’AJI. Il n’y a pas encore suffisamment d’études à ce sujet. Cependant, nous savons qu’un meilleur sommeil peut réduire votre douleur.', 'There are no side effects.', 'Il n’y a pas d’effets secondaires.', NULL, '', 0, NULL, '', NULL, '', NULL, '', NULL, NULL, 61, '2020-08-10 02:27:06', '2020-08-10 02:27:06'),
(27, NULL, '', 'Researchers need to explore whether distraction reduces pain for youth who have JIA. There isn’t enough research yet.', 'Les chercheurs doivent déterminer si la distraction réduit la douleur chez les jeunes atteints d’AJI. Il n’y a pas encore suffisamment d’études à ce sujet.', 'There are rare side effects.', 'Il y a des effets secondaires rares.', NULL, '', 0, NULL, '', NULL, '', NULL, '', NULL, NULL, 38, '2020-08-10 02:47:08', '2020-08-10 02:47:08'),
(28, NULL, '', 'Researchers need to explore whether hypnosis reduces pain for youth who have JIA. There isn’t enough research yet in JIA. However, hypnosis may help reduce pain among adults.', 'Les chercheurs doivent déterminer si l’hypnose réduit la douleur chez les jeunes atteints d’AJI. Il n’y a pas encore suffisamment d’études spécifiques à l’AJI. Cependant, l’hypnose peut aider à réduire la douleur chez les adultes.', 'Side effects include emotional upset, headache, vomiting, fainting, and crying.', 'Les effets secondaires comprennent des troubles émotionnels, des maux de tête, des vomissements, des évanouissements et des pleurs.', NULL, '', 0, NULL, '', NULL, '', NULL, '', NULL, NULL, 62, '2020-08-10 02:48:51', '2020-08-10 02:48:51'),
(29, 'Comparing relaxation techniques to massage', 'Comparaison des techniques de relaxation avec la massothérapie', 'A study of 20 youth with JIA showed that massage may reduce pain better than relaxation after 1 month. However, some of the youth with JIA still improved with relaxation. Some relaxation techniques, such as guided imagery, may also help reduce pain among youth and adults with chronic pain.', 'Une étude menée auprès de 20 jeunes atteints d’AJI a montré que le massage permettrait de soulager davantage la douleur que la relaxation après un mois. Cependant, certains des jeunes atteints d’AJI ont quand même vu des améliorations avec la relaxation. Certaines techniques de relaxation, comme l’imagerie guidée, peuvent également aider à réduire la douleur chez les jeunes et les adultes atteints de douleur chronique.', 'There were no side effects for youth with JIA.', 'Aucun effet secondaire n’a été relevé chez les jeunes atteints d’AJI.', 'Not sure; it is a low-quality study. It means that we are not sure about these results.', 'Incertain. Il s’agit d’une étude de mauvaise qualité. Cela signifie que nous ne sommes pas certains de ces résultats.', 2, 'Twenty youth with JIA were randomly divided into two groups. One group received massage therapy and the other group received relaxation therapy.', 'Vingt jeunes atteints d’AJI ont été séparés au hasard en deux groupes. Un groupe a reçu de la massothérapie et l’autre groupe a reçu de la thérapie de relaxation.', 'The massage therapy group received a daily 15-minute massage by one of their parents for 30 days. During the massage, the child was first placed in a supine position and the parent applied oil and stroked the child’s face, stomach, legs and arms. Then, in a prone position, the child’s back was massaged. The relaxation therapy group experienced a 15-minute relaxation session with one of their parents (who received training and written instructions) for 30 days. During the relaxation session, the child laid on his/her back and was instructed to tighten and relax different muscles in the face, back, arms, hands, thighs, calves and feet.', 'Le groupe qui faisait de la massothérapie recevait un massage de 15 minutes par l’un de ses parents tous les jours pendant 30 jours. Le massage a commencé avec l’enfant couché sur le dos. Le parent appliquait de l’huile et caressait le visage, l’estomac, les jambes et les bras de l’enfant. Puis, l’enfant se tournait sur le ventre pour que son parent lui masse le dos. Le groupe de thérapie de relaxation faisait une séance de relaxation de 15 minutes avec un parent (qui avait reçu une formation et des instructions écrites) pendant 30 jours. Au cours de la séance de relaxation, l’enfant était allongé sur le dos et recevait l’instruction de serrer et de détendre différents muscles du visage, du dos, des bras, des mains, des cuisses, des mollets et des pieds.', 'Massage therapy reduced pain better than relaxation therapy: according to our calculations, 84% more people improved in the massage group compared to the relaxation group.', 'La massothérapie a réduit davantage la douleur que la relaxation. Selon nos calculs, le nombre de personnes qui ont vu une amélioration était 84 % plus élevé dans le groupe de massothérapie que dans le groupe de relaxation.', 'Field, T., Hernandez-Reif, M., Seligmen, S., Krasnegor, J., Sunshine, W., Rivas-Chacon, R., ... & Kuhn, C. (1997). Juvenile rheumatoid arthritis: benefits from massage therapy.Journal of pediatric Psychology,22(5), 607-617.', 'https://www.ncbi.nlm.nih.gov/pubmed/9383925', 55, '2020-08-10 02:56:44', '2020-08-10 02:56:44'),
(30, NULL, '', 'Researchers need to explore whether mindfulness reduces pain for youth who have JIA. There isn’t enough research yet.', 'Les chercheurs doivent déterminer si la méditation pleine conscience réduit la douleur chez les jeunes atteints d’AJI. Il n’y a pas encore suffisamment d’études à ce sujet.', 'There are rare side effects.', 'Il y a des effets secondaires rares.', NULL, '', 0, NULL, '', NULL, '', NULL, '', NULL, NULL, 63, '2020-08-10 02:57:19', '2020-08-10 02:57:19'),
(31, NULL, '', 'Researchers need to explore whether cognitive-behavioural therapy reduces pain for youth who have JIA. There isn’t enough research yet in JIA. However, cognitive-behavioural therapy seems to help reduce pain among adults with chronic pain.', 'Les chercheurs doivent déterminer si la thérapie cognitivocorportementale réduit la douleur chez les jeunes atteints d’AJI. Il n’y a pas encore suffisamment d’études spécifiques à l’AJI. Cependant, la thérapie cognitivocorportementale semble aider à réduire la douleur chez les adultes atteints de douleur chronique.', 'There are rare no side effects.\"', 'Il n’y a pas d’effets secondaires rares.', NULL, '', 0, NULL, '', NULL, '', NULL, '', NULL, NULL, 64, '2020-08-10 02:58:16', '2020-08-10 02:58:16'),
(32, NULL, '', 'Researchers need to explore whether a healthy diet reduces pain for youth who have JIA. There isn’t enough research yet. It may reduce inflammation, but each person is different.', 'Les chercheurs doivent déterminer si une saine alimentation réduit la douleur chez les jeunes atteints d’AJI. Il n’y a pas encore suffisamment d’études à ce sujet. Une saine alimentation pourrait réduire l’inflammation, mais chaque personne est différente.', 'There are no side effects except potential intolerances and allergies to some foods.', 'Il n’y a pas d’effets secondaires à l’exception des intolérances et allergies potentielles à certains aliments.', NULL, '', 0, NULL, '', NULL, '', NULL, '', NULL, NULL, 69, '2020-08-10 02:59:27', '2020-08-10 02:59:27'),
(33, NULL, '', 'Researchers need to explore whether Acetaminophen reduces pain for youth who have JIA. There isn’t enough research yet. There are a few old studies of low quality that tested Acetaminophen for adults with rheumatoid arthritis (RA) pain. It shows that acetaminophen may help reduce pain.', 'Les chercheurs doivent déterminer si l’acétaminophène réduit la douleur chez les jeunes atteints d’AJI. Il n’y a pas encore suffisamment d’études à ce sujet. Quelques vieilles études de faible qualité ont testé l’acétaminophène chez les adultes qui avaient de la douleur associée à la polyarthrite rhumatoïde (PR). Cela montre que l’acétaminophène pourrait aider à réduire la douleur.', 'There are few side effects, but at higher doses, it can be toxic to the liver.', 'Il y a peu d’effets secondaires, mais à des doses plus élevées, l’acétaminophène peut être toxique pour le foie.', NULL, '', 0, NULL, '', NULL, '', NULL, '', NULL, NULL, 54, '2020-08-10 03:00:14', '2020-08-10 03:00:14'),
(34, NULL, '', 'Researchers need to explore whether NSAIDs in creams reduce pain for youth who have JIA. There isn’t enough research yet in JIA. A review of the literature showed that they may reduce pain in adults with osteoarthritis (which is another type of arthritis).', 'Les chercheurs doivent déterminer si les AINS en crème réduisent la douleur chez les jeunes atteints d’AJI. Il n’y a pas encore suffisamment d’études spécifiques à l’AJI. Une revue de la littérature a montré qu’ils peuvent soulager la douleur chez les adultes atteints d’arthrose (qui est une autre forme d’arthrite).', 'There are few side effects such as skin irritation. NSAIDs in creams should not be used in combination with other oral NSAIDs as it may increase the dose.', 'Il y a quelques effets secondaires tels que l’irritation cutanée. Les AINS en crème ne doivent pas être utilisés en association avec d’autres AINS oraux, car cela pourrait augmenter le dosage.', NULL, '', 0, NULL, '', NULL, '', NULL, '', NULL, NULL, 65, '2020-08-10 03:00:42', '2020-08-10 03:00:42'),
(35, NULL, '', 'Researchers need to explore whether opioids reduce pain for youth who have JIA. There isn’t enough research yet in JIA.', 'Les chercheurs doivent déterminer si les opioïdes réduisent la douleur chez les jeunes atteints d’AJI. Il n’y a pas encore suffisamment d’études spécifiques à l’AJI.', 'You can become addicted to them  and they can cause slow breathing which could make you faint. Other possible side effects include constipation, drowsiness, itchiness, nausea, vomiting, mood changes and hallucinations.', 'Vous pouvez devenir accro aux opioïdes. Ils peuvent aussi ralentir la respiration, ce qui pourrait causer des évanouissements. D’autres effets secondaires possibles incluent la constipation, la somnolence, les démangeaisons, les nausées, les vomissements, les changements d’humeur et les hallucinations.', NULL, '', 0, NULL, '', NULL, '', NULL, '', NULL, NULL, 66, '2020-08-10 03:01:04', '2020-08-10 03:01:04'),
(36, NULL, '', 'Researchers need to explore whether Cannabis and marijuana  reduce pain for youth who have JIA. There isn’t enough research yet.', 'Les chercheurs doivent déterminer si la marijuana et les cannabinoïdes réduisent la douleur chez les jeunes atteints d’AJI. Il n’y a pas encore suffisamment d’études à ce sujet.', 'Serious side effects include brain changes, mood changes, anxiety, depression, a fast heartbeat, and it can make day-to-day tasks harder to do. It can also be addictive, meaning that having a bit could make you want more and more, even if you don’t need it. When marijuana is smoked, tars end up in your lungs, which could lead to cancer.', 'Les effets secondaires graves comprennent les changements au cerveau, les changements d’humeur, l’anxiété, la dépression, l’augmentation du rythme cardiaque, et les tâches quotidiennes peuvent être plus difficiles à faire. Il est également possible de développer une dépendance, ce qui signifie qu’en prendre un peu peut donner envie de plus en plus, même sans en avoir besoin. Lorsque la marijuana est fumée, les goudrons se retrouvent dans vos poumons, ce qui peut causer le cancer.', NULL, '', 0, NULL, '', NULL, '', NULL, '', NULL, NULL, 67, '2020-08-10 03:03:31', '2020-08-10 03:03:31'),
(37, NULL, '', 'There isn’t enough research.', 'Il n’y a pas assez d’études à ce sujet.', 'Aspirin® can cause Reye syndrome (a disease that can lead to permanent brain injury or death that can appear after a virus like a cold, flu, or chicken pox) in youth which affects the brain and liver and is very dangerous.', 'L’Aspirine® peut causer le syndrome de Reye (une maladie qui peut entraîner des lésions cérébrales permanentes ou la mort et qui peut apparaître après un virus comme le rhume, la grippe ou la varicelle) chez les jeunes. Ce syndrome très dangereux affecte le cerveau et le foie.', NULL, '', 0, NULL, '', NULL, '', NULL, '', NULL, NULL, 68, '2020-08-10 03:04:03', '2020-08-10 03:04:03'),
(38, NULL, '', 'The Mediterranean diet may reduce inflammation. Researchers need to explore whether a healthy diet reduces pain for youth who have JIA. There isn’t enough research yet in JIA. However, the Mediterranean diet seems to help reduce pain among adults with rheumatoid arthritis.', 'Le régime méditerranéen permettrait de réduire l’inflammation. Les chercheurs doivent déterminer si une saine alimentation réduit la douleur chez les jeunes atteints d’AJI. Il n’y a pas encore suffisamment d’études spécifiques à l’AJI. Cependant, le régime méditerranéen semble aider à réduire la douleur chez les adultes atteints de polyarthrite rhumatoïde.', 'There are no known side effects except potential intolerances and allergies to some foods.', 'Il n’y a pas d’effets secondaires connus à l’exception des intolérances et allergies potentielles à certains aliments.', NULL, '', 0, NULL, '', NULL, '', NULL, '', NULL, NULL, 70, '2020-08-10 03:07:28', '2020-08-10 03:07:28'),
(39, 'Comparing fish oil to a placebo', 'Comparaison de l’huile de poisson avec un placebo', 'A study of 97 of adults with RA showed that fish oil (Omega-3) may reduce pain better than placebo, which is a fake pill after 9 months. Note that there were no studies in JIA.', 'Une étude menée auprès de 97 adultes atteints de PR a montré que l’huile de poisson (oméga-3) permettrait de soulager davantage la douleur qu’un placebo (une fausse pilule) après neuf mois. Aucune étude ne portait spécifiquement sur l’AJI.', 'In the study there were no more side effects in the treatment than the placebo.', 'Dans l’étude, il n’y a pas eu plus d’effets secondaires dans le traitement que le placebo.', 'Probably;  it is a moderate-quality study. It means that these results are probably true.', 'Probablement. Il s’agit d’une étude de qualité moyenne. Cela signifie que ces résultats sont probablement vrais.', 3, 'Fifty-eight adults with rheumatoid arthritis were randomly divided into two groups. One group received cod liver oil and the other group received placebo capsules.', 'Cinquante-huit adultes atteints de polyarthrite rhumatoïde ont été séparés au hasard en deux groupes. Un groupe a reçu de l’huile de foie de morue et l’autre groupe a reçu des capsules placebo.', 'The cod liver oil contained n-3 essential fatty acids (EFAs) and the placebo was an identical capsule. Both were taken daily for 9 months.', 'L’huile de foie de morue contenait des acides gras essentiels (AGE) n-3 et le placebo était une capsule identique. Les deux ont été pris tous les jours pendant neuf mois.', 'The cod liver oil reduced pain better than the placebo capsules: according to our calculations, 18% more people improved in the cod liver group compared to the placebo group.', 'L’huile de foie de morue a réduit davantage la douleur que les capsules placebo. Selon nos calculs, le nombre de personnes qui ont vu une amélioration était 18 % plus élevé dans le groupe qui prenait de l’huile de foie de morue que dans le groupe qui prenait le placebo.', 'Galarraga, B., Ho, M., Youssef, H. M., Hill, A., McMahon, H., Hall, C., ... & Belch, J. J. F. (2008). Cod liver oil (n-3 fatty acids) as a non-steroidal anti-inflammatory drugs paring agent in rheumatoid arthritis.Rheumatology,47(5), 665-669.', 'https://www.ncbi.nlm.nih.gov/pubmed/18362100', 71, '2020-08-10 03:10:32', '2020-08-10 03:10:32'),
(40, 'Comparing glucosamine hydrochloride to a placebo', 'Comparaison du chlorhydrate de glucosamine avec un placebo', 'A study of 51 adults with RA showed that glucosamine hydrochloride may reduce pain better than placebo after 3 months.', 'Une étude menée auprès de 51 adultes atteints de PR a montré que le chlorhydrate de glucosamine permettrait de soulager davantage la douleur que le placebo après trois mois.', 'There were no reported side effects of glucosamine hydrochloride in this study. Individuals with allergies to shellfish should avoid glucosamine.', 'Aucun effet secondaire du chlorhydrate de glucosamine n’a été signalé dans cette étude. Les personnes allergiques aux crustacés devraient éviter la glucosamine.', 'Not sure; it is a low-quality study. It means that we are not sure about these results.', 'Incertain.', 2, 'Fifty-one adults with rheumatoid arthritis were randomly divided into two groups. One group was given glucosamine hydrochloride tablets and the other group was given placebo tablets.', '', 'A daily dose of glucosamine hydrochloride was administered for 12 weeks. Participants were instructed to continue their previous treatment for rheumatoid arthritis in addition to the glucosamine or placebo.', '', 'Glucosamine hydrochloride reduces pain better than placebo:according to our calculations,34% more people improved in the glucosamine hydrochloride group compared to the placebo group.', '', 'Nakamura, H., Masuko, K., Yudoh, K., Kato, T., Kamada, T., & Kawahara, T. (2007). Effects of glucosamine administration on patients with rheumatoid arthritis.Rheumatology international,27(3), 213-218.', 'https://www.ncbi.nlm.nih.gov/pubmed/16953394', 72, '2020-08-10 05:33:16', '2020-08-10 05:33:16'),
(41, NULL, '', 'Researchers need to explore whether Vitamin D reduces pain for youth who have JIA. There isn’t enough research yet in JIA. However, Vitamin D may help reduce pain among adults.', 'Les chercheurs doivent déterminer si la vitamine D réduit la douleur chez les jeunes atteints d’AJI. Il n’y a pas encore suffisamment d’études spécifiques à l’AJI. Cependant, la vitamine D peut aider à réduire la douleur chez les adultes.', 'It is important not to exceed 4,000 international units per day.', 'Il est important de ne pas dépasser 4 000 unités internationales par jour.', NULL, '', 0, NULL, '', NULL, '', NULL, '', NULL, NULL, 73, '2020-08-10 05:33:34', '2020-08-10 05:33:34'),
(42, NULL, '', 'Researchers need to explore whether calcium  reduces pain for youth who have JIA. There isn’t enough research yet.', 'Les chercheurs doivent déterminer si le calcium réduit la douleur chez les jeunes atteints d’AJI. Il n’y a pas encore suffisamment d’études à ce sujet.', 'It is important not to exceed 3000 mg per day.', 'Il est important de ne pas dépasser 3000 mg par jour.', NULL, '', 0, NULL, '', NULL, '', NULL, '', NULL, NULL, 74, '2020-08-10 05:33:54', '2020-08-10 05:33:54'),
(43, NULL, '', 'Researchers need to explore whether a vegetarian or vegan diet reduces pain for youth who have JIA. There isn’t enough research yet.', 'Les chercheurs doivent déterminer si un régime végétarien ou végétalien réduit la douleur chez les jeunes atteints d’AJI. Il n’y a pas encore suffisamment d’études à ce sujet.', 'Some of these diets can be unhealthy, because of the lack of nutrients. They can lack in calories, which are important for growth, as well as protein, fatty acids, amino acids, iron, zinc, calcium and vitamins. Since vegan diets are deficient in omega-3 fatty acids, flaxseed, canola oils, walnuts and soy are recommended. Since they are often deficient in amino acids, quinoa, soy, and chia seeds can be added.', 'Certains de ces régimes peuvent être mauvais pour la santé en raison de carences en nutriments. Ils peuvent manquer de calories, qui sont importantes pour la croissance, ainsi que de protéines, d’acides gras, d’acides aminés, de fer, de zinc, de calcium et de vitamines. Comme l’apport en acides gras oméga-3 est faible dans les régimes végétariens ou végétaliens, la consommation de graines de lin, d’huiles de canola, de noix et de soja est recommandée. Comme l’apport en acides aminés est souvent faible, il est possible d’ajouter des graines de quinoa, de soja et de chia.', NULL, '', 0, NULL, '', NULL, '', NULL, '', NULL, NULL, 75, '2020-08-10 05:34:21', '2020-08-10 05:34:21'),
(44, NULL, '', 'Researchers need to explore whether a gluten-free diet reduces pain for youth who have JIA. There isn’t enough research yet.', 'Les chercheurs doivent déterminer si un régime sans gluten réduit la douleur chez les jeunes atteints d’AJI. Il n’y a pas encore suffisamment d’études à ce sujet.', 'Some of the ingredients in processed gluten-free food can be unhealthy and people following this diet may lack in certain nutrients if they are not carefully planning such diets with a registered dietician.', 'Certains des ingrédients des aliments transformés sans gluten peuvent être mauvais pour la santé. Les personnes qui suivent ce régime peuvent manquer de certains nutriments si elles ne planifient pas soigneusement de tels régimes avec un diététiste.', NULL, '', 0, NULL, '', NULL, '', NULL, '', NULL, NULL, 76, '2020-08-10 05:34:44', '2020-08-10 05:34:44'),
(45, NULL, '', 'Researchers need to explore whether NSAIDs reduce pain for youth who have JIA. There isn’t enough research yet. Studies on adults with rheumatoid arthritis (RA) show that Celecoxib and Naproxen are moderately effective. There are not a lot of studies looking at arthritis pain since NSAIDs are often used to reduce inflammation. ', 'Les chercheurs doivent déterminer si les AINS réduisent la douleur chez les jeunes atteints d\'AJI. Il n\'y a pas encore assez de recherches. Des études sur des adultes atteints de polyarthrite rhumatoïde (PR) montrent que le célécoxib et le naproxène sont modérément efficaces. Il n\'y a pas beaucoup d\'études portant sur la douleur arthritique puisque les AINS sont souvent utilisés pour réduire l\'inflammation.', 'Most people feel fine after taking NSAIDs, but your stomach may hurt and you may have stomach bleeding. In rare cases, NSAIDs can cause a rash, and affect sleep, how you behave and your kidneys. If NSAIDs are contraindicated, a COX-2 inhibitor such as Celecoxib or Meloxicam might be used. NSAIDS should be stopped 7-10 days before a surgery.', 'La plupart des gens se sentent bien après avoir pris des AINS, mais votre estomac peut vous faire mal et vous pouvez avoir des saignements d\'estomac. Dans de rares cas, les AINS peuvent provoquer une éruption cutanée et affecter le sommeil, votre comportement et vos reins. Si les AINS sont contre-indiqués, un inhibiteur de la COX-2 tel que le célécoxib ou le méloxicam peut être utilisé. Les AINS doivent être arrêtés 7 à 10 jours avant une intervention chirurgicale.', NULL, '', 0, NULL, '', NULL, '', NULL, '', NULL, NULL, 10, '2020-08-10 03:00:42', '2020-08-10 03:00:42');

-- --------------------------------------------------------

--
-- Table structure for table `suggestions`
--

CREATE TABLE `suggestions` (
  `id` int(11) NOT NULL DEFAULT 0,
  `title` varchar(255) NOT NULL,
  `fr_title` varchar(131) CHARACTER SET utf8 DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `fr_description` varchar(322) CHARACTER SET utf8 DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `suggestions`
--

INSERT INTO `suggestions` (`id`, `title`, `fr_title`, `description`, `fr_description`, `created_at`, `updated_at`) VALUES
(1, 'Talk with your family or friends', 'Parlez avec votre famille ou vos amis', NULL, '', '2020-05-24 23:15:06', '2020-05-24 23:15:06'),
(2, 'Talk with your health care team', 'Parlez avec votre équipe soignante.', NULL, '', '2020-05-24 23:15:18', '2020-05-24 23:15:18'),
(3, 'Find out where I can get treatments nearby', 'Trouver où je peux me faire soigner à proxomité.', 'Your health care team may be able to connect you with other health care providers. You can also find lists of treatment providers online. Make sure you find a health care provider that is well-trained and experienced with juvenile arthritis.', 'Votre équipe soignante pourrait peut-être vous mettre en contact avec d’autres professionnels de la santé. Vous pouvez également trouver des listes de professionnels qui offrent ces traitements en ligne. Assurez-vous de trouver un professionnel de la santé bien formé et expérimenté dans le domaine de l\'arthrite juvénile.', '2020-05-24 23:15:57', '2020-05-24 23:15:57'),
(4, 'Find out how to pay for the treatments. (For example, does my health insurance pay for it?)', 'En savoir plus sur les options de paiement pour les traitements. (Par exemple, est-ce que c\'est couvert par mon assurance maladie?)', NULL, '', '2020-05-24 23:16:11', '2020-05-24 23:16:11');

-- --------------------------------------------------------

--
-- Table structure for table `treatments`
--

CREATE TABLE `treatments` (
  `id` int(11) NOT NULL DEFAULT 0,
  `name` varchar(255) NOT NULL,
  `fr_name` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `supervision` varchar(255) NOT NULL,
  `evidence_level` tinyint(4) NOT NULL,
  `order_number` tinyint(4) NOT NULL,
  `specification` varchar(255) DEFAULT NULL,
  `fr_specification` varchar(8) CHARACTER SET utf8 DEFAULT NULL,
  `description` varchar(512) NOT NULL,
  `fr_description` varchar(283) CHARACTER SET utf8 DEFAULT NULL,
  `traffic_level` tinyint(4) NOT NULL,
  `traffic_description` varchar(512) NOT NULL,
  `fr_traffic_description` varchar(360) CHARACTER SET utf8 DEFAULT NULL,
  `experts_suggest` varchar(512) NOT NULL,
  `fr_experts_suggest` varchar(412) CHARACTER SET utf8 DEFAULT NULL,
  `how_use` varchar(1024) DEFAULT NULL,
  `fr_how_use` varchar(570) CHARACTER SET utf8 DEFAULT NULL,
  `how_soon` varchar(512) DEFAULT NULL,
  `fr_how_soon` varchar(230) CHARACTER SET utf8 DEFAULT NULL,
  `cost` varchar(512) DEFAULT NULL,
  `fr_cost` varchar(287) CHARACTER SET utf8 DEFAULT NULL,
  `where` varchar(512) DEFAULT NULL,
  `fr_where` varchar(384) CHARACTER SET utf8 DEFAULT NULL,
  `consider` varchar(1024) DEFAULT NULL,
  `fr_consider` varchar(418) CHARACTER SET utf8 DEFAULT NULL,
  `image` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `treatment_classification_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `treatments`
--

INSERT INTO `treatments` (`id`, `name`, `fr_name`, `supervision`, `evidence_level`, `order_number`, `specification`, `fr_specification`, `description`, `fr_description`, `traffic_level`, `traffic_description`, `fr_traffic_description`, `experts_suggest`, `fr_experts_suggest`, `how_use`, `fr_how_use`, `how_soon`, `fr_how_soon`, `cost`, `fr_cost`, `where`, `fr_where`, `consider`, `fr_consider`, `image`, `treatment_classification_id`, `created_at`, `updated_at`) VALUES
(1, 'Custom-Made Foot Orthotics', 'Orthèses plantaires sur mesure', 'HCP', 1, 1, 'legs', 'Jambes', 'A custom-made foot orthotics are pads made specially for your foot that you place in your shoe to help support, align and improve the function of your foot.', 'Les orthèses plantaires sur mesure sont des coussinets spécialement conçus pour votre pied que vous placez dans votre chaussure pour aider à soutenir, aligner et améliorer la fonction de votre pied.', 1, 'Custom-made foot orthotics seem to be effective and safe for youth with JIA. They may be used by youth with JIA to manage pain after a discussion with health professionals.', 'Les orthèses plantaires sur mesure semblent être efficaces et sécuritaires pour les jeunes atteints d’AJI. Les jeunes atteints d’AJI peuvent utiliser des orthèses plantaires pour soulager leur douleur après en avoir parlé à un professionnel de la santé.', 'Experts suggest that foot orthotics can be used when needed with the guidance of your health care team', 'Les experts suggèrent que les orthèses plantaires peuvent être utilisées au besoin en suivant les conseils de votre équipe soignante.', 'You may have to wear orthotics all day, every day in your shoes. It may take about two weeks to adjust to new custom made foot orthotics. It is suggested to wear orthotics for an hour on the first day, two hours on the second day, and continuously progress each day so that by the end of the two weeks, you can wear orthotics comfortably all day. Fittings or adjustments may be needed.', 'Vous devrez peut-être porter des orthèses en tout temps dans vos chaussures. L’adaptation aux nouvelles orthèses plantaires sur mesure peut prendre environ deux semaines. Il est suggéré de porter des orthèses pendant une heure le premier jour, deux heures le deuxième jour et de progresser chaque jour pour qu’après deux semaines, vous soyez confortable toute la journée. Des ajustements pourraient être nécessaires.', 'It may help right away or it may take up a few months to feel better. Everybody is different.', 'Vous pouvez ressentir les bienfaits tout de suite ou après quelques mois. Tout le monde est différent.', 'Custom made foot orthotics usually cost more money than store bought soles and supportive shoes. Your health insurance may cover some of these costs.', 'Les orthèses plantaires sur mesure coûtent généralement plus cher que les semelles et les chaussures de soutien achetées en magasin. Votre assurance maladie peut couvrir certains de ces frais.', 'Physiotherapists, occupational therapists, and podiatrists usually provide custom made foot orthotics. You can talk about it with your health care team to help you access it.', 'Les physiothérapeutes, les ergothérapeutes et les podiatres peuvent généralement fournir des orthèses plantaires sur mesure. Votre équipe soignante pourrait vous aider à y avoir accès.', 'Since custom-made foot orthotics seem to be effective and safe but they cost money, you can try first wearing comfortable shoes with good arches and also buying insoles in a store.  These may be helpful. Not everybody likes the same type of footwear and orthotics. You can try them out to see if you like them.', 'Étant donné que les orthèses plantaires sur mesure semblent être efficaces et sécuritaires, mais coûtent de l’argent, vous pouvez d’abord essayer de porter des chaussures confortables avec un bon support pour l’arche et acheter des semelles en magasin.  Ces options pourraient vous aider. Le type de chaussures et d’orthèses préférées varie d’une personne à l’autre. Vous pouvez en essayer pour voir si vous les aimez.', 'uploads\\1623704879211foot_ortho.jpg', 1, '2020-06-09 23:11:49', '2021-06-14 21:07:59'),
(2, 'Massage', 'Massothérapie', 'SC', 1, 3, 'general', 'général', 'Rubbing or kneading your muscle or joints to help you relax.', 'Frotter ou pétrir vos muscles ou vos articulations pour vous aider à vous détendre.', 1, 'Massage seems be effective and safe for youth with JIA. It may be used by youth with JIA to manage pain.', 'La massothérapie semble être efficace et sans danger pour les jeunes atteints d’AJI. Elle peut être utilisée par les jeunes atteints d’AJI pour soulager la douleur.', 'Experts suggest that youth with JIA can use massage.', 'Les experts suggèrent que les jeunes atteints d’AJI peuvent recevoir des massages.', 'Massages as short as 15 minutes a day can help to reduce pain. You could also have longer massages less often since most massage therapists will give a massage for at least 30 minutes.', 'Même un massage de 15 minutes par jour peut aider à atténuer la douleur. Vous pourriez aussi recevoir un massage plus long moins souvent puisque chez les massothérapeutes, les massages durent au moins 30 minutes.', 'It may help right away or it may take up to a month to feel better with a massage per day. It may take longer if you have massages less often. Everybody is different.', 'Vous pourriez ressentir les bienfaits tout de suite ou après jusqu’à un mois avec un massage par jour. Les bienfaits pourraient prendre plus de temps si vos massages sont plus espacés. Tout le monde est différent.', 'Massage can be free if done by yourself or a family member. Professional massages may be covered by health insurance or may require out-of-pocket cost depending on your insurance.', 'Vous pouvez recevoir des massages gratuitement si vous le faites vous-même ou si un membre de votre famille vous aide. Les massages professionnels sont parfois couverts par l’assurance maladie ou peuvent nécessiter des frais supplémentaires en fonction de votre assurance.', 'Massage therapists usually provide this treatment. It is better to consult with a registered massage therapist who has experience with treating patients who have JIA. You may also seek training to do massages on your own or purchase massaging devices that can be used at home.', 'Ce traitement est généralement offert par des massothérapeutes. Il est préférable de consulter un massothérapeute agréé qui a déjà traité des patients atteints d’AJI. Vous pouvez également suivre une formation pour vous faire des massages ou acheter des appareils de massage à utiliser à la maison.', 'If massages are causing more pain, then you should stop this treatment option. You should also consider your comfort level with receiving massage from a trained professional who is a stranger or from your parents. If you choose to try massage, make sure to advocate for yourself about your comfort level.', 'Si votre douleur empire avec le massage, vous devez cesser cette option de traitement. Vous devez également tenir compte de votre niveau de confort à recevoir un massage d’un professionnel qualifié qui est un étranger ou de vos parents. Si vous choisissez d’essayer le massage, assurez-vous de respecter votre niveau de confort.', 'uploads/1595422649352massage.jpg', 3, '2020-06-10 00:33:38', '2021-06-10 22:38:56'),
(5, 'Yoga', 'Yoga', 'SC', 3, 8, 'general', 'général', 'Exercises including stretching and focused breathing that help relax you.', 'Exercices axés sur les étirements et la respiration en profondeur qui vous aident à vous détendre.', 1, 'Yoga seems to be effective and safe for adults with rheumatoid arthritis (RA). It may be used by youth with JIA to manage pain.', 'Le yoga semble être efficace et sans danger pour les adultes atteints de polyarthrite rhumatoïde (PR). Il peut être utilisé par les jeunes atteints d’AJI pour soulager la douleur.', 'Experts suggest that youth with JIA should participate in regular physical activity.', 'Les experts suggèrent que les jeunes atteints d’AJI devraient pratiquer une activité physique de façon régulière.', 'Youth should do about an hour of physical activity (moderate to vigorous intensity) per day but you can do it in sessions of about 15 minutes depending on your schedule. It may be important to gradually increase how often and how long you do physical activity over time.', 'Les jeunes devraient faire environ une heure d’activité physique (intensité modérée à vigoureuse) par jour, mais vous pouvez la diviser en séances d’environ 15 minutes en fonction de votre emploi du temps. Il peut être important d’augmenter progressivement la fréquence et la durée de l’activité physique.', 'It may help right away or it may take up to a few months to feel better. Everybody is different.', 'Vous pouvez ressentir les bienfaits tout de suite ou après quelques mois. Tout le monde est différent.', 'Yoga can cost money if you attend classes. You can avoid the cost by following an online program.', 'Il pourrait y avoir des coûts associés si vous suivez un cours de yoga. Suivre un programme en ligne vous permettrait d’éviter ces frais.', 'There are yoga classes at community centres and gyms. Also, there are video tutorials online (see the links below).', 'Des cours de yoga sont offerts dans les centres communautaires et dans les gyms. Des tutoriels sont également disponibles en ligne (voir les liens ci-dessous).', 'It is important to do movements at your own pace to avoid hurting yourself. It helps to start with a warm up and end with cool down exercises to help prevent injuries.', 'Il est important de faire les mouvements à votre rythme pour éviter de vous blesser. Pour éviter les blessures, il est utile de commencer par un échauffement et de terminer par des exercices de récupération.', 'uploads/1595423805028yoga.jpg', 2, '2020-06-12 20:21:18', '2021-06-08 15:18:56'),
(6, 'Osteopathic Manipulation', 'Ostéopathie', 'HCP', 7, 31, 'general', 'général', 'Osteopathic manipulation includes hands-on-treatments that work on bones, muscles, and fascia to optimize the body’s alignment.', 'L’ostéopathie comprend des traitements pratiques qui agissent sur les os, les muscles et les fascias pour optimiser l’alignement du corps.', 2, 'Osteopathy is not mentioned in guidelines for youth with JIA. They may be used by youth with JIA to manage pain after a discussion with their health care team.', 'L’ostéopathie n’est pas mentionnée dans les lignes directrices pour les jeunes atteints d’AJI. Les jeunes atteints d’AJI peuvent recourir à l’ostéopathie pour soulager leur douleur après en avoir parlé à leur équipe soignante.', 'Osteopathy is not mentioned in guidelines for JIA.', 'L’ostéopathie n’est pas mentionnée dans les lignes directrices pour l’AJI.', 'The first few sessions may be about an hour each and follow-up visits may take up to 30 minutes. Weekly sessions may be recommended, but everybody is different.', 'Les premières séances peuvent durer environ une heure chacune et les visites de suivi peuvent prendre jusqu’à 30 minutes. Des sessions hebdomadaires pourraient vous être recommandées, mais tout le monde est différent.', 'It is difficult to say because of the lack of research. Improvements may vary because everybody is different.', 'C’est difficile à dire en raison du manque de recherche. Les améliorations peuvent varier, car tout le monde est différent.', 'Osteopathy may take time to do and cost money depending on your health insurance.', 'L’ostéopathie peut prendre du temps et coûter de l’argent en fonction de votre assurance maladie.', 'Osteopaths provide this treatment. You can talk about it with your health care team to help you access it.', 'Ce traitement est offert par les ostéopathes. Votre équipe soignante pourrait vous aider à y avoir accès.', 'If you use this treatment, tt is important to see a well-trained osteopath who has experience with treating JIA. You may not feel comfortable with receiving osteopathic treatments from a stranger.', 'Si vous choisissez ce traitement, il est important de consulter un ostéopathe bien formé et qui connaît l’AJI. Il est possible de se sentir mal à l’aise de recevoir des traitements d’ostéopathie de la part d’un étranger.', 'uploads/1596758628004osteoathy.jpg', 3, '2020-06-12 20:25:27', '2020-08-07 00:04:22'),
(7, 'Educational Website', 'Site Web éducatif', 'SC', 1, 4, 'general', 'général', 'A website with information about JIA, and strategies on how to manage JIA.', 'Un site Web qui présente des informations sur l’AJI et des stratégies pour la prendre en charge.', 1, 'Educational websites are recommended by experts for youth with JIA. It may be used by youth with JIA to manage pain.', 'Les experts recommandent l’utilisation de sites Web éducatifs pour les jeunes atteints d’AJI. Les jeunes atteints d’AJI peuvent les utiliser pour gérer leur douleur.', 'Experts suggest in guidelines that youth with JIA may use self-management tools.', 'Les experts suggèrent dans les lignes directrices que les jeunes atteints d’AJI peuvent utiliser des outils d’autogestion.', 'An educational website can take as little as 10 minutes and as long as an hour or two to browse. It will depend how long you wish to use it for. It can give you many tricks to help manage your arthritis and your pain.', 'Vous pouvez parcourir un site Web éducatif en 10 minutes ou deux heures. Tout dépend du temps que vous souhaitez y passer. Vous pourriez y trouver de nombreuses astuces pour vous aider à gérer votre arthrite et votre douleur.', 'It may take about 3 months to feel better, but everybody is different.', 'Cela peut prendre environ trois mois pour voir une amélioration, mais tout le monde est différent.', 'This intervention is free since it is accessible online.', 'Cette option est gratuite puisqu’elle est accessible en ligne.', 'The “Teens Taking Charge” program is online (see link below). There are also other educational websites for JIA online.', 'Le programme « Je m’en charge » est disponible en ligne (voir lien ci-dessous). Il existe également d’autres sites Web éducatifs en ligne pour les personnes atteintes d’AJI.', 'You can look at the various educational programs and find the one you like the most to help you manage your arthritis and your pain.', 'Consultez les différents programmes offerts pour trouver celui que vous préférez et qui saura vous aider à prendre en main votre arthrite et votre douleur.', 'uploads/1596687745933educational_website.jpg', 4, '2020-06-13 19:52:43', '2020-08-16 03:10:46'),
(10, 'NSAIDs in Pills (For example Advil®, Aleve®, Motrin® and Naprosyn®)', 'AINS en comprimés (Par exemple Advil®, Aleve®, Motrin® et Naprosyn®)', 'HCP', 3, 10, 'general', 'général', 'A pill that could block the production of certain chemicals in your body that cause inflammation. It may reduce pain, fever, and inflammation. (e.g., Advil®, Aleve®, Motrin® and Naprosyn®).', 'Une pilule pouvant bloquer la production de certains produits chimiques dans votre corps qui provoquent une inflammation. Les AINS peuvent réduire la douleur, la fièvre et l’inflammation. (par exemple, Advil®, Aleve®, Motrin® et Naprosyn®).', 1, 'Nonsteroidal anti-inflammatory drugs (NSAIDs) in pills are recommended by experts for pain in JIA. NSAIDs may be used by youth with JIA to manage pain after a discussion with their health care team. NSAIDs may also be prescribed to reduce inflammation.', 'Les experts recommandent la prise d’anti-inflammatoires non stéroïdiens (AINS) en comprimés pour la traiter douleur causée par l’AJI. Les jeunes atteints d’AJI peuvent utiliser des AINS pour soulager leur douleur après en avoir parlé à leur équipe soignante. Les AINS peuvent aussi être prescrits pour réduire l’inflammation.', 'Experts suggest that NSAIDs in pills can be used for pain management in JIA.', 'Les experts suggèrent que les AINS en comprimés peuvent être utilisés pour soulager la douleur causée par l’AJI.', 'It is important to talk with your health care team first before using this treatment. If your health care team has prescribed NSAIDs for you, it is important to keep taking them. You may be able to use NSAIDs when you have pain according to your physician’s advice. Dosing is dependent on age and weight and it should be the lowest dose possible. Only one NSAID (in pills or creams) or COX-2 inhibitor should be used at the same time. It may be given to children who are on methotrexate.', 'Il est important de parler avec votre équipe soignante avant d’en prendre. Si votre équipe soignante vous a prescrit des AINS, vous devez continuer à les prendre. Vous pourriez peut-être prendre des AINS lorsque vous ressentez de la douleur, selon les conseils de votre médecin. La posologie dépend de l’âge et du poids. La dose doit être la plus petite possible. Un seul AINS (sous forme de pilules ou de crèmes) ou un seul inhibiteur de la COX-2 doit être utilisé à la fois. Il peut être administré aux enfants qui prennent du méthotrexate.', 'NSAIDs in pills may start working within a few hours, but everybody is different.', 'Les AINS en comprimés peuvent commencer à agir en quelques heures, mais tout le monde est différent.', 'NSAIDs may cost money depending on your health insurance.', 'Les AINS peuvent coûter de l’argent en fonction de la couverture de votre assurance maladie.', 'Your healthcare team can help you access this treatment. NSAIDs are also available over the counter.', 'Votre équipe de soins peut vous aider à avoir accès à ce traitement. Les AINS sont également disponibles en vente libre.', 'You may need to try different kinds of NSAIDs to find one that works well for you. You have to take NSAIDs with food. Liquid forms are available for children who can’t swallow tablets.', 'Vous devrez peut-être essayer différents types d’AINS pour en trouver un qui fonctionne bien pour vous. Les AINS doivent être pris avec de la nourriture. Des formes liquides sont disponibles pour les enfants qui ne peuvent pas avaler de comprimés.', 'uploads/1596924066904NSAIDs_pills.jpg', 5, '2020-07-05 04:06:48', '2021-06-21 20:56:08'),
(31, 'Wrist Splints Worn at Night', 'Attelles de poignet portées la nuit', 'HCP', 2, 5, 'wrists', 'poignets', 'A piece of material that you wear on your wrist to support and protect it.', 'Un morceau de tissu que vous portez à votre poignet pour le soutenir et le protéger.', 1, 'Wrist splints worn at night seem to be effective and safe for adults with rheumatoid arthritis (RA). They may be used by youth with JIA to manage pain after discussion with health professionals.', 'Les attelles de poignet portées la nuit semblent être efficaces et sans danger pour les adultes atteints de polyarthrite rhumatoïde (PR). Les jeunes atteints d’AJI peuvent en utiliser pour soulager leur douleur après en avoir parlé un professionnel de la santé.', 'Experts suggest that splints can be considered when needed with the guidance of your health care team', 'Les experts suggèrent que les attelles peuvent être utilisées au besoin en suivant les conseils de votre équipe soignante.', 'You may have to wear wrist splints all night.', 'Vous devrez peut-être les porter toute la nuit.', 'It may help right away or it may take up to a few months to feel better. Everybody is different.', 'Vous pouvez ressentir les bienfaits tout de suite ou après quelques mois. Tout le monde est différent.', 'Wrist splints may cost money. Your health insurance may cover some of these costs.', 'Les attelles de poignet peuvent coûter de l’argent. Votre assurance maladie peut couvrir certains de ces frais.', 'Occupational therapists usually provide this treatment. You can talk about wrist splints with your health care team to help you access them. You can also buy wrist splints that are not customized in stores.', 'Ce traitement est généralement offert par des ergothérapeutes. Votre équipe soignante pourrait vous aider à y avoir accès. Vous pouvez également acheter des attelles de poignet qui ne sont pas personnalisées en magasin.', 'Some people may not like to wear splints at night. You can talk about it with your health care team and try it out to see if you like it.', 'Certaines personnes peuvent ne pas aimer porter des attelles la nuit. Parlez à votre équipe soignante pour savoir si vous pouvez en essayer afin de voir si vous aimez ça.', 'uploads/1596745046393wrist_splints.jpg', 1, '2020-07-22 13:03:56', '2021-06-10 14:30:54'),
(34, 'Pilates', 'Pilates', 'SC', 1, 2, 'general', 'général', 'Exercises that help you improve your strength, flexibility and posture.', 'Des exercices qui vous aident à améliorer votre force, votre flexibilité et votre posture.', 1, 'Pilates seems to be effective and safe for youth with JIA. It may be used by youth with JIA to manage pain.', 'Le Pilates semble être efficace et sans danger pour les jeunes atteints d’AJI. Les jeunes atteints d’AJI peuvent en appliquer pour soulager leur douleur.', 'Experts suggest that youth with JIA should participate in regular physical activity.', 'Les experts suggèrent que les jeunes atteints d’AJI devraient participer à une activité physique régulière.', 'Youth should do about an hour of physical activity (moderate to vigorous intensity) per day but you can do it in sessions of about 15 minutes depending on your schedule. It may be important to gradually increase how often and how long you do physical activity over time.', 'Les jeunes devraient faire environ une heure d’activité physique (intensité modérée à vigoureuse) par jour, mais vous pouvez la diviser en séances d’environ 15 minutes en fonction de votre emploi du temps. Il peut être important d’augmenter progressivement la fréquence et la durée de l’activité physique.', 'It may help right away or it may take up to a few months to feel better. Everybody is different.', 'Vous pouvez ressentir les bienfaits tout de suite ou après quelques mois. Tout le monde est différent.', 'Pilates  can cost money if you attend classes. You can avoid the cost by following an online program.', 'Il pourrait y avoir des coûts associés si vous suivez un cours de Pilates. Suivre un programme en ligne vous permettrait d’éviter ces frais.', 'There are pilates classes at community centres and gyms. Also, there are video tutorials online (see the links below).', 'Des cours de Pilates sont offerts dans les centres communautaires et les gyms. Des tutoriels sont également disponibles en ligne (voir les liens ci-dessous).', 'It is important to do movements at your own pace to avoid hurting yourself. It helps to start with a warm-up and end with cool-down exercises to help prevent injuries.', 'Il est important de faire les mouvements à votre rythme pour éviter de vous blesser. Pour éviter les blessures, il est utile de commencer par un échauffement et de terminer par des exercices de récupération.', 'uploads/1596749513210pilates.jpg', 2, '2020-07-22 13:13:15', '2022-02-10 06:22:27'),
(35, 'Cardio', 'Exercices de cardio', 'SC', 2, 7, 'general', 'général', 'Cardio exercise seems to be effective and safe in adults with rheumatoid arthritis (RA). It may be used by youth with JIA to manage pain.', 'Les exercices de cardio semblent être efficaces et sans danger pour les adultes atteints de polyarthrite rhumatoïde (PR). Ils peuvent être utilisés par les jeunes atteints d’AJI pour gérer la douleur.', 1, 'Experts suggest that youth with JIA should participate in regular physical activity.', 'Les experts suggèrent que les jeunes atteints d’AJI devraient participer à une activité physique régulière.', 'Experts suggest that youth with JIA should participate in regular physical activity.', 'Les experts suggèrent que les jeunes atteints d’AJI devraient participer à une activité physique régulière.', 'Youth should do about an hour of physical activity (moderate to vigorous intensity) per day but you can do it in sessions of about 15 minutes depending on your schedule.', 'Les jeunes devraient faire environ une heure d’activité physique (intensité modérée à vigoureuse) par jour, mais vous pouvez la diviser en séances d’environ 15 minutes en fonction de votre emploi du temps.', 'It may help right away or it may take up to a few months to feel better. Everybody is different.', 'Vous pouvez ressentir les bienfaits tout de suite ou après quelques mois. Tout le monde est différent.', 'Cardio exercises can cost money if you attend classes. You can avoid the cost by following an online program.', 'Il pourrait y avoir des coûts associés si vous suivez un cours de cardio. Suivre un programme en ligne vous permettrait d’éviter ces frais.', 'There are cardio exercise classes at community centres and gyms. Also, there are video tutorials online (see links below).', 'Des cours de cardio sont offerts dans les centres communautaires et les gyms. Des tutoriels sont également disponibles en ligne (voir liens ci-dessous).', 'It is important to do movements at your own pace to avoid hurting yourself. It may be important to gradually increase how often and how long you do physical activity over time. Even though stretching is not as helpful as cardio exercises, it may help you feel better.', 'Il est important de faire les mouvements à votre rythme pour éviter de vous blesser. Il peut être important d’augmenter progressivement la fréquence et la durée de l’activité physique. Même si les étirements ne sont pas aussi utiles que les exercices de cardio, ils peuvent vous aider à vous sentir mieux.', 'uploads/1596759159723cardio.jpg', 2, '2020-07-22 13:18:35', '2021-06-10 22:06:15'),
(36, 'Occupational Therapy Interventions', 'Interventions d’ergothérapie', 'HCP', 4, 17, 'general', 'général', 'A professional gives you exercises and activities that help you do daily tasks and activities that are important to you.', 'Un professionnel vous propose des exercices et des activités qui vous aident à accomplir les tâches quotidiennes et les activités qui sont importantes pour vous.', 1, 'Occupational therapy is recommended by experts for youth with JIA. They may be used by youth with JIA to manage pain after a discussion with their health care team.', 'Les experts recommandent l’ergothérapie pour les jeunes atteints d’AJI. Les jeunes atteints d’AJI peuvent recourir à l’ergothérapie pour soulager leur douleur après en avoir parlé à leur équipe soignante.', 'Experts suggest that occupational therapy may help youth with JIA.', 'Les experts suggèrent que l’ergothérapie peut aider les jeunes atteints d’AJI.', 'Weekly treatment sessions may be recommended and sessions may take about 45 minutes, with the first appointment lasting longer.', 'Des séances de traitement hebdomadaires peuvent être recommandées. Elles durent environ 45 minutes, mais le premier rendez-vous est habituellement plus long.', 'It depends on which intervention your occupational therapist recommends. It may help right away or it may take up to a few months to feel better. Everybody is different.', 'Cela dépend de l’intervention recommandée par votre ergothérapeute. Vous pouvez ressentir les bienfaits tout de suite ou après quelques mois. Tout le monde est différent.', 'Occupational therapy interventions may take time to do and cost money depending on your health insurance. The initial visit may be more expensive than follow-up sessions.', 'Les interventions d’ergothérapie peuvent prendre du temps et coûter de l’argent en fonction de votre assurance maladie. La visite initiale peut être plus coûteuse que les visites de suivi.', 'Occupational therapists provide this treatment. You can talk about it with your health care team to help you access it, in the US a referral is often indicated from a physician..', 'Ce traitement est offert par des ergothérapeutes. Votre équipe soignante pourrait vous aider à y avoir accès. Aux États-Unis, il faut souvent présenter une demande de consultation signée par un médecin.', 'It is better to consult with a registered occupational therapist who has experience with treating JIA.', 'Il est préférable de consulter un ergothérapeute agréé qui a déjà traité des patients atteints d’AJI.', 'uploads/1595424024791OTI.jpg', 3, '2020-07-22 13:20:24', '2021-06-10 22:42:49'),
(37, 'Chiropractic', 'Chiropractie', 'HCP', 8, 34, 'general', 'général', 'A professional uses his or her hands to align your spine.', 'Un professionnel utilise ses mains pour aligner votre colonne vertébrale.', 3, 'Chiropractic treatments are not mentioned in guidelines for youth with JIA. They may not be recommended for some youth with JIA.', 'La chiropractie n’est pas mentionnée dans les lignes directrices pour les jeunes atteints d’AJI. Il est possible qu’elle ne soit pas recommandée pour certains jeunes atteints d’AJI.', 'Chiropractic is not mentioned in guidelines for JIA.', 'La chiropractie n’est pas mentionnée dans les lignes directrices pour l’AJI.', 'The first few sessions may be about 30 minutes each and follow-up visits may be as short as 5 to 10 minutes.', 'Les premières séances peuvent durer environ 30 minutes chacune et les visites de suivi peuvent prendre 5 à 10 minutes seulement.', 'It is difficult to say because of the lack of research. Improvements may vary because everybody is different.', 'C’est difficile à dire en raison du manque de recherche. Les améliorations peuvent varier, car tout le monde est différent.', 'Chiropractic may cost money depending on your health insurance.', 'La chiropractie peut coûter de l’argent en fonction de votre assurance maladie.', 'Chiropractors provide this treatment. It is important to discuss this treatment with your health care team to see if it is safe for you.', 'Ce traitement est offert par les chiropraticiens. Il est important de discuter de ce traitement avec votre équipe soignante pour voir s’il est sécuritaire pour vous.', 'If you use this treatment, it is important to see a well-trained chiropractor who has experience with treating JIA. You may not feel comfortable with receiving chiropractic treatments from a stranger.', 'Si vous choisissez ce traitement, il est important de consulter un chiropraticien bien formé et qui connaît l’AJI. Il est possible de se sentir mal à l’aise de recevoir des traitements de chiropractie de la part d’un étranger.', 'uploads/1595424174990chriopractic.jpg', 3, '2020-07-22 13:22:54', '2021-06-24 17:44:30'),
(38, 'Distraction', 'Distraction', 'SC', 4, 16, 'general', 'général', 'Techniques and strategies you can use to stop focusing on the pain.', 'Techniques et stratégies que vous pouvez utiliser pour arrêter de penser uniquement à la douleur.', 1, 'Distraction is recommended by experts for pain management in JIA. It may be used by youth with JIA to manage pain.', 'Les experts recommandent de se distraire pour soulager la douleur causée par l’AJI. Ces techniques peuvent être utilisées par les jeunes atteints d’AJI pour gérer leur douleur.', 'Experts suggest that distraction can be used for pain management in JIA. It can be used during painful procedures.', 'Les experts suggèrent que la distraction peut être utilisée pour soulager la douleur causée par l’AJI. La distraction peut être utile lors de procédures douloureuses.', 'You can use distraction each time you have pain. You can think of things you really enjoy, play games like counting and do activities such as listening to music and talking to friends.', 'Vous pouvez utiliser la distraction chaque fois que vous ressentez de la douleur. Vous pouvez penser à des choses que vous aimez vraiment, jouer à des jeux comme compter ou faire des activités comme écouter de la musique et parler à des amis.', 'You may feel better when you use distraction, but everybody is different.', 'Se distraire peut vous aider à vous sentir mieux, mais tout le monde est différent.', 'Distraction takes time to do and may cost money if provided by a health professional. The costs can be avoided by doing distraction on your own.', 'Développer les techniques et stratégies pour se distraire peut prendre du temps et peut coûter de l’argent si c’est fait avec le soutien d’un professionnel de la santé. Les coûts peuvent être évités si vous vous entraînez à vous distraire par vous-même.', 'You can talk about it with your health care team or find information online (see links below)', 'Vous pouvez en parler avec votre équipe soignante ou trouver des informations en ligne (voir les liens ci-dessous).', 'You can use different distraction methods and find the one that works best for you.', 'Vous pouvez essayer différentes méthodes de distraction pour trouver celle qui vous convient le mieux.', 'uploads/1595424320823distraction.jpg', 6, '2020-07-22 13:25:20', '2020-08-08 20:57:21'),
(49, 'Night Mouth Guards', 'Plaque occlusale portée la nuit', 'HCP', 5, 25, 'jaw', 'Mâchoire', 'A plastic piece that you wear on top of your teeth to protect when you clench your jaw or grind your teeth at night.', 'Un morceau de plastique que vous portez sur vos dents pour vous protéger lorsque vous serrez la mâchoire ou grincez des dents la nuit.', 2, 'Night mouth guards seem to be effective and safe for youth with jaw pain. They may be used by youth with JIA to manage pain after a discussion with health professionals.', 'La plaque occlusale portée la nuit semble être efficace et sans danger pour les jeunes qui ont de la douleur à la mâchoire. Les jeunes atteints d’AJI peuvent utiliser une plaque occlusale pendant la nuit pour soulager leur douleur après en avoir parlé à un professionnel de la santé.', 'Night mouth guards are not mentioned in guidelines for JIA.', 'Les plaques occlusales portées la nuit ne sont pas mentionnées dans les directives de l’AJI.', 'Mouth guards are often worn at night.', 'Les plaques occlusales sont souvent portées la nuit.', 'It may take up to a month to adjust to sleeping with a mouth guard. It may help right away or it may take up to a few months to feel better. Everybody is different.', 'S’habituer à dormir avec une plaque occlusale peut prendre jusqu’à un mois. Vous pouvez ressentir les bienfaits tout de suite ou après quelques mois. Tout le monde est différent.', 'Mouth guards usually cost money. Your health insurance may cover some of these costs.', 'Les plaques occlusales coûtent généralement de l’argent. Votre assurance maladie peut couvrir certains de ces frais.', 'Dentists usually provide this treatment. You can talk about it with your health care team to help you access it.', 'Ce traitement est généralement offert par les dentistes. Votre équipe soignante pourrait vous aider à y avoir accès.', 'Some people may not like to wear mouth guards at night. You can try it out to see if you can tolerate it.', 'Certaines personnes peuvent ne pas aimer porter une plaque occlusale la nuit. Vous pouvez l’essayer pour voir si vous aimez ça.', 'uploads/1596749180919mouth_guard.jpg', 1, '2020-08-06 20:53:32', '2021-06-07 02:37:09'),
(50, 'Water Exercises', 'Exercice dans l’eau', 'SC', 2, 6, 'general', 'général', 'Exercises that you do in water and that help you stay active, like water aerobics.', 'Des exercices que vous faites dans l’eau et qui vous aident à rester actif/active, comme l’aquaforme.', 1, 'Water exercise seems to be effective and safe in adults with rheumatoid arthritis (RA). It may be used by youth with JIA to manage pain.', 'Les exercices dans l’eau semblent être efficaces et sans danger pour les adultes atteints de polyarthrite rhumatoïde (PR). Les jeunes atteints d’AJI peuvent en faire pour gérer leur douleur.', 'Experts suggest that youth with JIA should participate in regular physical activity.', 'Les experts suggèrent que les jeunes atteints d’AJI devraient participer à une activité physique régulière.', 'Youth should do about an hour of physical activity (moderate to vigorous intensity) per day but you can do it in sessions of about 15 minutes depending on your schedule.', 'Les jeunes devraient faire environ une heure d’activité physique (intensité modérée à vigoureuse) par jour, mais vous pouvez la diviser en séances d’environ 15 minutes en fonction de votre emploi du temps.', 'It may help right away or it may take up to a few months to feel better. Everybody is different.', 'Vous pouvez ressentir les bienfaits tout de suite ou après quelques mois. Tout le monde est différent.', 'Water exercise can cost money if you attend classes and if you have to pay to go to a pool.', 'L’exercice dans l’eau peut coûter de l’argent si vous suivez des cours et si vous devez payer pour avoir accès à une piscine.', 'here are water exercise classes at community centres and pools.', 'Voici des cours aquatiques qui sont offerts dans les centres communautaires et les piscines.', 'It is important to do movements at your own pace to avoid hurting yourself. It may be important to gradually increase how often and how long you do physical activity over time.', 'Il est important de faire les mouvements à votre rythme pour éviter de vous blesser. Il peut être important d’augmenter progressivement la fréquence et la durée de l’activité physique.', 'uploads/1596759403477water_excercise.jpg', 2, '2020-08-07 00:16:43', '2021-06-10 22:05:28'),
(51, 'Individualized Exercise Program', 'Programme d’exercices personnalisé', 'HCP', 2, 19, 'general', 'général', 'An exercise routine that is created just for you based on what you need, want and can do to stay healthy. These include cardio (that makes your heart go faster), stretching and balance exercises.', 'Un programme d’exercice créé juste pour vous en fonction de ce dont vous avez besoin, de que vous voulez faire et de ce que vous pouvez faire afin de rester en bonne santé. Ce programme inclut le cardio (qui accélère le rythme cardiaque), les étirements et les exercices d’équilibre.', 1, 'Individualized exercise programs are recommended by experts for youth with JIA. They may be used by youth with JIA to manage pain after a discussion with health professionals.\"', 'Les experts recommandent les programmes d’exercices personnalisés pour les jeunes atteints d’AJI. Les jeunes atteints d’AJI peuvent suivre un programme d’exercice pour soulager leur douleur après en avoir parlé à un professionnel de la santé.', 'Experts suggest that youth with JIA should participate in regular physical activity. Custom designed programs may have even more benefits.', 'Les experts suggèrent que les jeunes atteints d’AJI devraient participer à une activité physique régulière. Les programmes conçus sur mesure peuvent avoir encore plus de bienfaits.', 'Youth should do about an hour of physical activity (moderate to vigorous intensity) per day, but you can talk to your health care team to figure out what is best for you.', 'Les jeunes devraient faire environ une heure d’activité physique (intensité modérée à vigoureuse) par jour, mais vous pouvez la diviser en séances d’environ 15 minutes en fonction de votre emploi du temps.', 'It may help right away or it may take up to a few months to feel better. Everybody is different.', 'Vous pouvez ressentir les bienfaits tout de suite ou après quelques mois. Tout le monde est différent.', 'This treatment can cost money if provided by a health professional such as  a physiotherapist or occupational therapist. Your insurance may also pay some of it. It may be important to gradually increase how often and how long you do physical activity over time.', 'Ce traitement peut coûter de l’argent s’il est fourni par un professionnel de la santé tel qu’un physiothérapeute ou un ergothérapeute. Votre assurance peut également en payer une partie. Il peut être important d’augmenter progressivement la fréquence et la durée de l’activité physique.', 'Physical exercise programs can be provided by physiotherapists and occupational therapists. You can talk about it with your health care team to help you access it.', 'Les physiothérapeutes et les ergothérapeutes peuvent offrir des programmes d’exercices physiques. Votre équipe soignante pourrait vous aider à y avoir accès.', 'It is important to do movements at your own pace to avoid hurting yourself and to follow the advice of a health professional. It may be helpful to start with a warm-up and end with cool-down exercises to help prevent injuries.', 'Il est important de faire les mouvements à son rythme pour éviter de se blesser et de suivre les conseils d’un professionnel de la santé. Pour éviter les blessures, il pourrait être utile de commencer par un échauffement et de terminer par des exercices de récupération.', 'uploads/1596845774762individualized_exer.jpg', 2, '2020-08-07 00:17:30', '2021-06-10 22:11:11'),
(52, 'Stretching', 'Étirements', 'SC', 4, 12, 'general', 'général', 'Exercise that allows you to stretch different parts of your body.', 'Exercices qui vous permettent d’étirer différentes parties de votre corps.', 1, 'Stretching is recommended by experts for youth with JIA. They may be used by youth with JIA to manage pain.', 'Les experts recommandent les exercices pour les jeunes atteints d’AJI. Les jeunes atteints d’AJI peuvent en faire pour soulager leur douleur.', 'Experts suggest that youth with JIA should participate in regular physical activity.', 'Les experts suggèrent que les jeunes atteints d’AJI devraient participer à une activité physique régulière.', 'Youth should do about an hour of physical activity (moderate to vigorous intensity) per day but you can do it in sessions of about 15 minutes depending on your schedule. It is better to warm up before doing stretches to avoid getting hurt. It is also important to stretch slowly and to hold the pause for about 20 seconds.', 'Les jeunes devraient faire environ une heure d’activité physique (intensité modérée à vigoureuse) par jour, mais vous pouvez la diviser en séances d’environ 15 minutes en fonction de votre emploi du temps. Pour éviter de se blesser, il est préférable de s’échauffer avant de faire des étirements. Il est également important de s’étirer lentement et de maintenir la pause pendant environ 20 secondes.', 'It may help right away or it may take up to a few months to feel better. Everybody is different.', 'Vous pouvez ressentir les bienfaits tout de suite ou après quelques mois. Tout le monde est différent.', 'Stretching can cost money if you attend exercise classes. You can avoid the cost by following an online program.', 'Cette activité peut coûter de l’argent si vous assistez à des cours d’étirements. Suivre un programme en ligne vous permettrait d’éviter ces frais.', 'There are exercise classes at community centres and gyms. Also, there are video tutorials online (see links below).', 'Des cours d’étirement sont offerts dans les centres communautaires et les gyms. Des tutoriels sont également disponibles en ligne (voir liens ci-dessous).', 'It is important to do movements at your own pace to avoid hurting yourself. It may be important to gradually increase the time and intensity of stretches over time.', 'Il est important de faire les mouvements à votre rythme pour éviter de vous blesser. Il peut être important d’augmenter progressivement la durée et l’intensité des étirements au fil du temps.', 'uploads/1596851771932stretching.jpg', 2, '2020-08-08 01:56:11', '2021-06-10 22:37:13'),
(53, 'Joint Protection Program', 'Programme de protection des articulations', 'SC', 2, 9, 'general', 'général', 'Information on what you can do to avoid hurting your joints.', 'Informations sur ce que vous pouvez faire pour protéger vos articulations.', 1, 'Joint protection programs seem to be effective and safe for adults with rheumatoid arthritis (RA). They may be used by youth with JIA to manage pain.', 'Les programmes de protection des articulations semblent être efficaces et sans danger pour les adultes atteints de polyarthrite rhumatoïde (PR). Les jeunes atteints d’AJI peuvent les suivre pour soulager leur douleur.', 'Experts suggest that youth with JIA can use joint protection programs.', 'Les experts suggèrent que les jeunes atteints d’AJI peuvent recourir à des programmes de protection des articulations.', 'When provided by health professionals, sessions can last about forty-five minutes to an hour. However, you can read online about it and spend less time on it. You can use joint protection techniques  every day to help protect your joints.  These include  resting before you are tired, stop an activity before feeling pain and  using  stronger joints to do activities.', 'Lorsque les programmes sont offerts par des professionnels de la santé, les séances peuvent durer entre 45 minutes et une heure. Cependant, vous pouvez y consacrer moins de temps en lisant sur le sujet en ligne. Vous pouvez utiliser des techniques de protection des articulations tous les jours pour aider à les protéger.  Il s’agit notamment de se reposer avant d’être fatigué, d’arrêter une activité avant de ressentir de la douleur et d’utiliser les articulations les plus fortes pour faire des activités.', 'You may feel better each time you use joint protection techniques but it may take a few months to feel better. Everybody is different.', 'Vous pouvez vous sentir mieux chaque fois que vous utilisez des techniques de protection des articulations, mais cela peut aussi prendre quelques mois. Tout le monde est différent.', 'oint protection programs may take time and may cost money if provided by a health professional. Your health insurance may cover some of these costs.', 'Les programmes de protection des articulations peuvent prendre du temps et coûter de l’argent s’ils sont offerts par un professionnel de la santé. Votre assurance maladie peut couvrir certains de ces frais.', 'Occupational therapists and other health professionals usually provide this treatment. You can talk about it with your health care team to get information on joint protection. You can also find information online (see links below).', 'Ces programmes sont généralement offerts par les ergothérapeutes et autres professionnels. Votre équipe soignante pourrait vous aider à y avoir accès. Vous pouvez également trouver des informations en ligne (voir les liens ci-dessous).', 'You can try different ways to protect your joints and see what helps you the most.', 'Vous pouvez essayer différentes façons de protéger vos articulations et voir ce qui vous aide le plus.', 'uploads/1596856347415joint_protection_program.jpg', 4, '2020-08-08 02:05:05', '2020-08-08 03:12:27'),
(54, 'Acetaminophen (Tylenol®)', 'Acétaminophène (Tylenol®)', 'HCP', 3, 11, 'general', 'général', 'Medicine that helps with pain and fever (also called Paracetamol, for example; Tylenol®).', 'Médicament qui aide à soulager la douleur et la fièvre (également appelé paracétamol, par exemple Tylenol®).', 1, 'Acetaminophen (Tylenol®) is recommended by experts for pain in JIA. Acetaminophen may be used by youth with JIA to manage pain after a discussion with their health care team.', 'L’acétaminophène (Tylenol®) est recommandé par les experts pour soulager la douleur causée par l’AJI. Les jeunes atteints d’AJI peuvent en prendre pour soulager leur douleur après en avoir parlé à leur équipe soignante.', 'Experts suggest that acetaminophen can be used for moderate pain in JIA.', 'Les experts suggèrent que l’acétaminophène peut être utilisé pour soulager la douleur modérée causée par l’AJI.', 'It is important to talk with your health care team first before using this treatment since it may interact with other medication. You may be able to use Acetaminophen when you have pain according to your physician’s advice. Dosing is dependent on age and weight and it should be the lowest dose possible.', 'Il est important de parler d’avec votre équipe soignante avant d’en prendre, car l’acétaminophène peut interagir avec d’autres médicaments. Vous pourriez peut-être prendre de l’acétaminophène lorsque vous ressentez de la douleur, selon les recommandations de votre médecin. La posologie dépend de l’âge et du poids. La dose doit être la plus petite possible.', 'It may take up to 45 minutes for an oral, liquid, or tablet acetaminophen to start working. You may feel better for up to 4 hours, but everybody is different.', 'Cela peut prendre jusqu’à 45 minutes pour qu’un acétaminophène oral, liquide ou en comprimé commence à agir. Vous pouvez vous sentir mieux pendant jusqu’à 4 heures, mais tout le monde est différent.', 'Acetaminophen costs money.', 'L’acétaminophène coûte de l’argent.', 'Acetaminophen is available over the counter.', 'L’acétaminophène est disponible en vente libre.', 'Liquid forms are available for children who can’t swallow tablets.', 'Des formes liquides sont disponibles pour les enfants qui ne peuvent pas avaler de comprimés.', 'uploads/1596856707170acetaminophen_tylenol .jpg', 5, '2020-08-08 03:14:47', '2022-02-10 05:56:11');
INSERT INTO `treatments` (`id`, `name`, `fr_name`, `supervision`, `evidence_level`, `order_number`, `specification`, `fr_specification`, `description`, `fr_description`, `traffic_level`, `traffic_description`, `fr_traffic_description`, `experts_suggest`, `fr_experts_suggest`, `how_use`, `fr_how_use`, `how_soon`, `fr_how_soon`, `cost`, `fr_cost`, `where`, `fr_where`, `consider`, `fr_consider`, `image`, `treatment_classification_id`, `created_at`, `updated_at`) VALUES
(55, 'Relaxation', 'Relaxation', 'SC', 4, 13, 'general', 'général', 'Techniques and strategies you can use to be calm.', 'Techniques et stratégies que vous pouvez utiliser pour vous calmer.', 1, 'Relaxation is recommended by experts for pain management in JIA. It may be used by youth with JIA to manage pain.', 'Les experts recommandent la relaxation pour soulager la douleur causée par l’AJI. Les jeunes atteints d’AJI peuvent en faire pour gérer leur douleur.', 'Experts suggest that relaxation can be used for pain management in JIA. It can be used during painful procedures.', 'Les experts suggèrent d’utiliser la relaxation pour soulager la douleur causée par l’AJI. La relaxation peut être utile lors de procédures douloureuses.', 'You may use different types of relaxation techniques and breathing exercises daily.', 'Vous pouvez utiliser différents types de techniques de relaxation et d’exercices de respiration chaque jour.', 'You may feel better after practicing relaxation, but everybody is different.', 'Faire de la relaxation peut vous aider à vous sentir mieux, mais tout le monde est différent.', 'Relaxation takes time to do and may cost money if provided by a health professional. The costs can be avoided by doing relaxation on your own.', 'Faire de la relaxation peut prendre du temps et coûter de l’argent si c’est fait avec le soutien d’un professionnel de la santé. Les coûts peuvent être évités en faisant de la relaxation par vous-même.', 'You can talk about it with your health care team or find information online (see links below).', 'Vous pouvez en parler avec votre équipe soignante ou trouver des informations en ligne (voir les liens ci-dessous).', 'You can try different types of relaxation and find the one that works best for you.', 'Vous pouvez essayer différentes méthodes de relaxation pour trouver celle qui vous convient le mieux.', 'uploads/1596856916988relaxation.jpg', 6, '2020-08-08 03:21:56', '2020-08-08 03:21:56'),
(56, 'Physiotherapy Interventions', 'Interventions de physiothérapie', 'HCP', 4, 18, 'general', 'général', 'A professional gives you physical treatments, stretches and activities that help with your strength, balance, range of motion and functioning.', 'Un professionnel vous donne des traitements physiques, des étirements et des activités qui vous aident à améliorer votre force, votre équilibre, votre amplitude de mouvement et votre fonctionnement physique.', 1, 'Physiotherapy is recommended by experts for youth with JIA. They may be used by youth with JIA to manage pain after a discussion with their health care team.', 'Les experts recommandent la physiothérapie pour les jeunes atteints d’AJI. Les jeunes atteints d’AJI peuvent recourir à la physiothérapie pour soulager leur douleur après en avoir parlé à leur équipe soignante.', 'Experts suggest that youth with JIA can use physiotherapy.', 'Les experts suggèrent que les jeunes atteints d’AJI peuvent faire de la physiothérapie.', 'Weekly treatment sessions may be recommended and sessions may take from 20 to 45 minutes, with the first appointment lasting longer. Sessions may vary in length because everybody is different.', 'Des séances hebdomadaires peuvent être recommandées. Elles durent de 20 à 45 minutes, mais le premier rendez-vous est habituellement plus long. La durée des visites peut varier, car tout le monde est différent.', 'It depends on which intervention your physiotherapist recommends. It may help right away or it may take up to a few months to feel better. Everybody is different.', 'Cela dépend du type d’intervention recommandé par votre physiothérapeute. Vous pouvez ressentir les bienfaits tout de suite ou après quelques mois. Tout le monde est différent.', 'Physiotherapy interventions may take time to do and cost money depending on your health insurance.', 'Les interventions de physiothérapie peuvent prendre du temps et coûter de l’argent en fonction de votre assurance maladie.', 'Physiotherapists provide this treatment. You can talk about it with your health care team to help you access it.', 'Ce traitement est offert par les physiothérapeutes. Votre équipe soignante pourrait vous aider à en avoir.', 'It is important to do movements at your own pace to avoid hurting yourself and to follow the advice of a health professional. It is better to consult with a registered physiotherapist who has experience with treating JIA.', 'Il est important de faire les mouvements à son rythme pour éviter de se blesser et de suivre les conseils d’un professionnel de la santé. Il est préférable de consulter un physiothérapeute agréé qui a déjà traité des patients atteints d’AJI.', 'uploads/1596857137898phys_inter.jpg', 3, '2020-08-08 03:25:37', '2021-06-10 22:46:37'),
(57, 'Heat', 'Chaleur', 'SC', 4, 14, 'general', 'général', 'A hot towel or heating pad that you apply to your joints to help with stiffness and pain.', 'Une serviette chaude ou un coussin chauffant que vous appliquez sur vos articulations pour soulager la raideur et la douleur.', 1, 'Heat is recommended by experts for youth with JIA. It may be used by youth with JIA to manage pain and stiffness.', 'Les experts recommandent l’application de chaleur pour les jeunes atteints d’AJI. Les jeunes atteints d’AJI peuvent mettre de la chaleur pour soulager leur douleur et leur raideur.', 'Experts suggest that youth with JIA can use heat packs, pads, and warm baths or showers to reduce pain.', 'Les experts suggèrent aux jeunes atteints d’AJI d’utiliser des compresses ou des coussins chauffants et de prendre des bains ou des douches chauds pour réduire la douleur.', 'It is suggested to use a heat pack for 20 minutes every 2 to 4 hours. Sometimes, heat and cold can also be used one after the other.', 'Il est suggéré d’utiliser une compresse chaude pendant 20 minutes toutes les deux à quatre heures. Parfois, il est possible d’appliquer de la chaleur et du froid l’un après l’autre.', 'It may help right away or it may take up to a few days to feel better. Everybody is different. You may be less stiff in the morning if your affected joints are kept warm during the night.', 'Vous pouvez ressentir les bienfaits tout de suite ou après quelques jours. Tout le monde est différent. Vous pourriez être moins raide le matin en maintenant vos articulations touchées par l’arthrite au chaud pendant la nuit.', 'Heat packs usually cost money. You may use what you have at home. Hot water bottle, warm towel, warm bath and warm shower can all provide heat.', 'Les compresses chaudes coûtent généralement de l’argent. Vous pouvez utiliser ce que vous avez à la maison. Une bouillotte, une serviette chaude, un bain chaud et une douche chaude sont tous des moyens d’avoir de la chaleur.', 'Heat is easy to use at home.', 'Il est facile d’appliquer de la chaleur à la maison.', 'Some people prefer heat to cold. You can try and see what you prefer. Sometimes, heat and cold can also be used one after the other.', 'Certaines personnes préfèrent le chaud au froid. Vous pouvez essayer les deux pour voir ce que vous préférez. Parfois, il est possible d’appliquer de la chaleur et du froid l’un après l’autre.', 'uploads\\1596857295062heat.jpg', 3, '2020-08-08 03:28:15', '2021-06-10 14:31:30'),
(58, 'Cold', 'Froid', 'SC', 4, 15, 'general', 'général', 'A cold towel , cold packs, or an ice bag that you apply to your joints to help with inflammation.', 'Une serviette froide, des compresses froides ou un sac de glace que vous appliquez sur vos articulations pour lutter contre l’inflammation.', 1, 'Cold is recommended by experts for youth with JIA. It may be used by youth with JIA to manage pain.', 'Les experts recommandent l’application de froid pour les jeunes atteints d’AJI. Les jeunes atteints d’AJI peuvent en appliquer pour soulager leur douleur.', 'Experts suggest that youth with JIA can use cold packs and ice massage to decrease pain, especially in inflamed joints.', 'Les experts suggèrent aux jeunes atteints d’AJI d’utiliser des compresses froides et des massages de glace pour diminuer la douleur, en particulier dans les articulations enflées.', 'It is suggested to use a cold pack for 10 minutes every 1 to 2 hours, with a thin layer of cloth between the pack and the skin to avoid direct contact. A cold, damp cloth may be more effective. Instead, you may use a cold water bottle, plastic bag with ice chips, or bag of frozen vegetables. Ice massage could be done using gentle circular motions for no more than 5 minutes at a time. Sometimes, heat and cold can also be used one after the other.', 'Il est suggéré d’appliquer une compresse froide pendant dix minutes toutes les unes à deux heures, en plaçant une mince couche de tissu entre la compresse et la peau pour éviter tout contact direct. Un linge froid et humide peut être plus efficace. Sinon, vous pouvez utiliser une bouteille d’eau froide, un sac en plastique avec des glaçons ou un sac de légumes surgelés. Pour faire un massage de glace, effectuez de légers mouvements circulaires sans dépasser cinq minutes chaque fois. Parfois, il est possible d’appliquer de la chaleur et du froid l’un après l’autre.', 'It may help right away or it may take up to a few days to feel better. Everybody is different. Cold therapy may be helpful to reduce swelling and inflammation, especially after physical activity.', 'Vous pouvez ressentir les bienfaits tout de suite ou après quelques jours. Tout le monde est différent. La thérapie par le froid peut être utile pour réduire l’enflure et l’inflammation, en particulier après une activité physique.', 'Cold packs usually cost money. To avoid spending money, you may use a cold, damp cloth, a cold water bottle, a plastic bag with ice chips, or a bag of frozen vegetables.', 'Les compresses froides coûtent généralement de l’argent. Pour éviter de payer, vous pouvez utiliser un linge froid et humide, une bouteille d’eau froide, un sac en plastique avec des glaçons ou un sac de légumes surgelés.', 'Cold packs can be purchased in health care store, pharmacies, or sometimes home department stores.', 'Les compresses froides peuvent être achetées dans les magasins de produits de santé, les pharmacies ou parfois les grands magasins.', 'Some people prefer heat to cold. You can try and see what you prefer. Sometimes, heat and cold can also be used one after the other.', 'Certaines personnes préfèrent le chaud au froid. Vous pouvez essayer les deux pour voir ce que vous préférez. Parfois, il est possible d’appliquer de la chaleur et du froid l’un après l’autre.', 'uploads/1596857457693cold.jpg', 3, '2020-08-08 03:30:57', '2020-08-08 03:30:57'),
(59, 'Acupuncture', 'Acupuncture', 'HCP', 6, 29, 'general', 'général', 'A professional uses thin needles to prick the surface of your skin.', 'Un professionnel utilise de fines aiguilles pour piquer la surface de votre peau.', 2, 'Acupuncture is not mentioned in guidelines for JIA. They may be used by youth with JIA to manage pain after a discussion with their health care team.', 'L’acupuncture n’est pas mentionnée dans les lignes directrices pour l’AJI. Les jeunes atteints d’AJI peuvent recourir à l’acupuncture pour soulager leur douleur après en avoir parlé à leur équipe soignante.', 'Acupuncture is not mentioned in guidelines for JIA.', 'L’acupuncture n’est pas mentionnée dans les lignes directrices pour l’AJI.', 'Weekly treatment sessions may be recommended and sessions may take from 30 minutes to 2 hours, with the first appointment lasting longer. Sessions may vary in length because everybody is different.', 'Des séances hebdomadaires peuvent être recommandées. Elles durent de 30 minutes à 2 heures, mais le premier rendez-vous est habituellement plus long. La durée des visites peut varier, car tout le monde est différent.', 'It may help right away or it may take up to a few months to feel better. Everybody is different.', 'Vous pouvez ressentir les bienfaits tout de suite ou après quelques mois. Tout le monde est différent.', 'Acupuncture may cost money depending on your health insurance.', 'L’acupuncture peut coûter de l’argent en fonction de votre assurance maladie.', 'Acupuncturists provide this treatment. You can talk about it with your health care team to help you access it.', 'Ce traitement est offert par les acupuncteurs. Votre équipe soignante pourrait vous aider à en avoir.', 'It is important to see a well-trained acupuncturist who has experience with treating JIA. You may not feel comfortable with acupuncture because of the needles.', 'Il est important de consulter un acupuncteur bien formé et qui connaît l’AJI. Les aiguilles pourraient vous incommoder.', 'uploads/1596906722903acupunture.jpg', 3, '2020-08-08 17:12:02', '2020-08-08 17:12:02'),
(61, 'Sleep Routine', 'Routine de sommeil', 'SC', 4, 20, 'general', 'général', 'A sleep routine is a variety of different habits that may help to have a good night-time sleep.', 'Une routine de sommeil est une variété d’habitudes qui peuvent aider à bien dormir la nuit.', 1, 'Sleep routines are recommended by experts for youth. It may be used by youth with JIA to manage pain.', 'Les experts recommandent aux jeunes d’adopter une routine de sommeil. Ils peuvent être utilisés par les jeunes atteints d’AJI pour gérer la douleur.', 'Experts recommend for teens to sleep continuously for 8 to 10 hours each night, with consistent bed and wake-up times.', 'Les experts recommandent aux adolescents de dormir en continu pendant 8 à 10 heures chaque nuit, et d’avoir un horaire de sommeil régulier.', 'You can use a sleep routine each night to help you fall asleep and have a good sleep at night. You can go to bed and wake up at the same time every day, do relaxing activities before going to sleep and avoid using electronic devices before going to bed.', 'Vous pouvez utiliser une routine de sommeil chaque nuit pour vous aider à vous endormir et à bien dormir la nuit. Vous pouvez vous coucher et vous réveiller à la même heure tous les jours, faire des activités relaxantes avant d’aller au lit et éviter d’utiliser des appareils électroniques avant de vous coucher.', 'You may feel better in the morning if you slept well at night. It may take a few months to have less pain, but everybody is different.', 'Bien dormir la nuit pourrait vous aider à vous sentir mieux le matin. Cela peut prendre quelques mois pour voir une amélioration au niveau de votre douleur, mais tout le monde est différent.', 'Information on sleep routines may cost money if provided by a health professional. Your health insurance may cover some of these costs. You can avoid the cost by reading about it online.', 'Recevoir de l’information sur les habitudes de sommeil peuvent coûter de l’argent si elles sont fournies par un professionnel de la santé. Votre assurance maladie peut couvrir certains de ces frais. Lire sur le sujet en ligne vous permettrait d’éviter ces frais.', 'You can talk about it with your health care team or find information online (see links below).', 'Vous pouvez en parler avec votre équipe soignante ou trouver des informations en ligne (voir les liens ci-dessous).', 'You can use different ways to help you sleep well and find the best sleep routine for you.', 'Vous pouvez essayer différentes stratégies pour bien dormir afin de trouver la routine de sommeil qui vous convient le mieux.', 'uploads/1596920106834sleep_routine.jpg', 4, '2020-08-08 20:55:06', '2020-08-08 20:55:06'),
(62, 'Hypnosis', 'Hypnose', 'HCP', 7, 32, 'general', 'général', 'A professional puts you in a sleepy state to relax your mind.', 'Un professionnel vous met dans un état de sommeil pour détendre votre esprit.', 2, 'Hypnosis is not mentioned in guidelines made by experts as a treatment for pain in JIA. They may be used by youth with JIA to manage pain after a discussion with their health care team.', 'Les lignes directrices élaborées par les experts ne mentionnent pas l’hypnose comme option pour traiter la douleur causée par l’AJI. Les jeunes atteints d’AJI peuvent recourir à l’hypnose pour soulager leur douleur après en avoir parlé à leur équipe soignante.', 'Guidelines in JIA do not mention hypnosis.', 'Les lignes directrices pour l’AJI ne mentionnent pas l’hypnose.', 'A general hypnotherapy session may take about an hour. Weekly visits may be recommended, but everybody is different.', 'Une séance régulière d’hypnothérapie peut durer environ une heure. Des séances hebdomadaires peuvent être recommandées, mais tout le monde est différent.', 'It will depend on each person and on your health professional’s recommendations. It may take up to a few months to feel better.', 'La fréquence dépend de chaque personne et des recommandations du professionnel de la santé. Vous pouvez ressentir les bienfaits après quelques mois.', 'The intervention takes time to do and may cost money if provided by a health professional. Your health insurance may cover some of these costs.', 'Les séances d’hypnose peuvent prendre du temps et coûter de l’argent si c’est fait avec le soutien d’un professionnel de la santé. Votre assurance maladie peut couvrir certains de ces frais.', 'Your health care team can help you access this treatment. Psychologists and hypnotherapists usually provide this treatment.', 'Votre équipe soignante peut vous aider à avoir accès à ce traitement. Ce traitement est offert par les psychologues et les hypnothérapeutes.', 'It is important to see a well-trained professional. You may not feel comfortable with receiving hypnosis.', 'Il est important de consulter un professionnel bien formé. Vous pourriez ne pas vous sentir à l’aise avec l’hypnose.', 'uploads/1596920374275hypnosis.jpg', 6, '2020-08-08 20:59:34', '2020-08-08 20:59:34'),
(63, 'Mindfulness', 'Méditation pleine conscience', 'SC', 6, 30, 'general', 'général', 'When you focus and pay attention to how you feel in the moment.', 'Lorsque vous vous fixez dans le moment présent et vous concentrez sur ce que vous ressentez.', 2, 'Mindfulness is not mentioned in guidelines made by experts as a treatment for pain in JIA. It may be used by youth with JIA to manage pain.', 'Les lignes directrices élaborées par les experts ne mentionnent pas la méditation pleine conscience comme option pour traiter la douleur causée par l’AJI. Ils peuvent être utilisés par les jeunes atteints d’AJI pour gérer la douleur.', 'Guidelines in JIA do not mention mindfulness.', 'Les lignes directrices pour l’AJI ne mentionnent pas la méditation pleine conscience.', 'You may use mindfulness daily.', 'Vous pouvez pratiquer la méditation pleine conscience quotidiennement.', 'You may feel better after practicing mindfulness, but everybody is different. ', 'Faire de la méditation pleine conscience peut vous aider à vous sentir mieux, mais tout le monde est différent. ', 'The intervention takes time to do and may cost money if provided by a health professional. The costs can be avoided by doing mindfulness on your own.', 'Les séances de méditation pleine conscience peuvent prendre du temps et coûter de l’argent si c’est fait avec le soutien d’un professionnel de la santé. Les coûts peuvent être évités en faisant en faisant par vous-même.', 'You can talk about it with your health care team or find information online (see links below).', 'Vous pouvez en parler avec votre équipe soignante ou trouver des informations en ligne (voir les liens ci-dessous).', 'You can try different types of mindfulness techniques and find the one that works best for you.', 'Vous pouvez essayer différentes techniques de méditation pleine conscience pour trouver celle qui vous convient le mieux.', 'uploads/1596920489949mindfulness.jpg', 6, '2020-08-08 21:01:29', '2020-08-08 21:01:29'),
(64, 'Cognitive-Behavioural Therapy', 'Thérapie cognitivocomportementale', 'HCP', 6, 28, 'general', 'général', 'A treatment usually directed by a professional and which focuses on the way you think and act to encourage healthy living.', 'Traitement généralement guidé par un professionnel qui met l’accent sur votre façon de penser et d’agir pour favoriser une vie saine.', 2, 'Cognitive-behavioural therapy is not mentioned in guidelines made by experts as a treatment for pain in JIA. They may be used by youth with JIA to manage pain after a discussion with their health care team.', 'Les lignes directrices élaborées par les experts ne mentionnent pas la thérapie cognitivocomportementale comme option pour traiter la douleur causée par l’AJI. Les jeunes atteints d’AJI peuvent recourir à la thérapie cognitivocomportementale pour soulager leur douleur après en avoir parlé à leur équipe soignante.', 'Guidelines in JIA do not mention cognitive-behavioural therapy.', 'Les lignes directrices pour l’AJI ne mentionnent pas la thérapie cognitivocomportementale.', 'Weekly treatment sessions of about 30 to 60 minutes may be recommended, with the first appointment lasting longer. Within these sessions, professionals can help you find ways to manage your pain, such as guided imagery or meditative breathing.', 'Des séances hebdomadaires peuvent être recommandées. Elles durent de 30 minutes à 2 heures, mais le premier rendez-vous est habituellement plus long. Au cours de ces séances, le professionnel peut vous aider à trouver des moyens de gérer votre douleur, comme l’imagerie guidée ou la respiration méditative.', 'You may feel better after 12 to 20 sessions, but everybody is different. It can vary depending on your health professional’s recommendations.', 'Vous pouvez vous sentir mieux après 12 à 20 séances, mais tout le monde est différent. Le nombre de séances peut varier selon les recommandations de votre professionnel de la santé.', 'The intervention takes time to do and may cost money if provided by a health professional such as a psychologist. Your health insurance may cover some of these costs.', 'La thérapie cognitivocomportementale peut prendre du temps et coûter de l’argent si c’est fait avec le soutien d’un professionnel de la santé. Votre assurance maladie peut couvrir certains de ces frais.', 'Your healthcare team can help you access this treatment. Psychologists usually provide this treatment.', 'Votre équipe soignante peut vous aider à y avoir accès. Ce traitement est généralement offert par les psychologues.', 'It is important to see a well-trained professional.', 'Il est important de consulter un professionnel bien formé.', 'uploads/1596920632501cognitive_therapy.jpg', 6, '2020-08-08 21:03:52', '2020-08-08 21:03:52'),
(65, 'NSAIDs in Creams (Voltaren®)', 'AINS sous forme de crème (Voltaren®)', 'HCP', 7, 33, 'general', 'général', 'A cream (i.e., Voltaren®) that is rubbed on the joints and may help with pain, fever and inflammation.', 'Une crème (c.-à-d. Voltaren®) qui est frottée sur les articulations et peut aider à soulager la douleur, la fièvre et l’inflammation.', 2, 'NSAIDs in cream (Voltaren®) are not recommended in guidelines made by experts. They may sometimes be used by youth with JIA to manage pain after a discussion with their health care team.', 'Les lignes directrices élaborées par les experts ne recommandent pas les AINS sous forme de crème (Voltaren®). Les jeunes atteints d’AJI peuvent parfois en prendre pour soulager leur douleur après en avoir parlé à leur équipe soignante.', 'Experts in guidelines suggest that NSAIDs in creams (Voltaren®) are not recommended and should be avoided in JIA due to lack of scientific proofs. However, clinicians sometimes recommend them in practice.', 'Les lignes directrices élaborées par les experts ne recommandent pas les AINS sous forme de crème (Voltaren®) et ces derniers devraient être évités pour traiter l’AJI en raison du manque de preuves scientifiques. Cependant, les cliniciens les recommandent parfois dans leur pratique.', 'It is important to talk with your health care team first before using this treatment.', 'Il est important de parler avec votre équipe soignante avant d’en prendre.', 'NSAIDs in creams may take a few hours before you feel better, but everybody is different.', 'Les AINS sous forme de crème peuvent prendre quelques heures avant d’agir, mais tout le monde est différent.', 'NSAIDs in cream may cost money depending on your health insurance.', 'Les AINS sous forme de crème peuvent coûter de l’argent en fonction de la couverture de votre assurance maladie.', 'NSAIDs in cream can be available over the counter or as prescription drugs depending on where you live.', 'Certains AINS en crème sont disponibles en vente libre ou sous forme de médicaments sous ordonnance selon l’endroit où vous vivez.', '', '', 'uploads/1596924261773NSAIDs_cream.jpg', 5, '2020-08-08 22:04:21', '2021-06-21 22:32:00'),
(66, 'Opioids', 'Opioïdes', 'HCP', 9, 37, 'general', 'général', 'Opioids are a class of drugs naturally found in the opium poppy plant, that are often used in medicines to relax the body by blocking certain pain receptors to reduce pain. (E.g., morphine, codeine, oxycodone (OxyContin®)).', 'Les opioïdes sont une classe de médicaments naturellement présents dans le pavot à opium, qui sont souvent utilisés dans les médicaments pour détendre le corps en bloquant certains récepteurs de la douleur pour la soulager. (Par exemple, morphine, codéine, oxycodone [OxyContin®]).', 3, 'Opioids are usually not recommended by experts to manage pain in JIA because they have serious side effects. Youth should try other treatments before thinking about trying this treatment.', 'Les opioïdes ne sont généralement pas recommandés par les experts pour gérer la douleur causée par l’AJI, car ils ont des effets secondaires graves. Les jeunes devraient essayer d’autres traitements avant d’envisager celui-ci.', 'Opioids are not recommended in JIA guidelines for most patients. They are a last resort for JIA pain, because of the potential dangerous side effects.', 'Les opioïdes ne sont pas recommandés dans les lignes directrices pour l’AJI pour la plupart des patients. Ces médicaments sont un dernier recours pour soulager la douleur JIA, en raison des effets secondaires potentiellement dangereux.', 'If you have severe pain that is not going away with other treatments, opioids may be an option to discuss with your health care team. The use of opioids is often monitored by a chronic pain team.', 'Si vous ressentez une douleur intense qui ne disparaît pas avec d’autres traitements, les opioïdes peuvent être une option à discuter avec votre équipe soignante. L’utilisation d’opioïdes est souvent surveillée par une équipe spécialisée dans la douleur chronique.', 'It may take about 20 to 30 minutes for opioids to start working and may last up to 4 hours to feel better, but everybody is different.', 'Les opioïdes peuvent prendre environ 20 à 30 minutes pour commencer à agir et leur action peut durer jusqu’à 4 heures, mais tout le monde est différent.', 'Opioids may cost money depending on your health insurance.', 'Les opioïdes peuvent coûter de l’argent en fonction de votre assurance maladie.', 'Your healthcare team can give you information about opioids if it is indicated for you. It is very important not to take any opioids that are not prescribed to you because you do not know what the medication contains and it may be very dangerous. Also, it is very dangerous to give opioids to other people that were not prescribed this drug.', 'Votre équipe soignante peut vous donner des informations sur les opioïdes si cela vous est indiqué. Il est très important de ne prendre aucun opioïde qui ne vous a pas été prescrit, car vous ne savez pas ce que contient le médicament et cela peut être très dangereux. De plus, il est très dangereux de donner des opioïdes à d’autres personnes à qui ce médicament n’a pas été prescrit.', '', '', 'uploads/1596925032322opioids.jpg', 5, '2020-08-08 22:17:12', '2020-08-08 22:17:31'),
(67, 'Cannabis/Marijuana', 'Marijuana/Cannabinoïdes', 'HCP', 9, 38, 'general', 'général', 'A substance that can be taken in various forms (as a pill, oil or inhaled) that comes from a marijuana plant that may cause heightened perception, affect mood and can cause relaxation.', 'Une substance qui peut être prise sous diverses formes (pilule, huile ou inhalation) provenant d’une plante de marijuana qui peut provoquer une perception accrue, affecter l’humeur et provoquer la relaxation.', 3, 'Marijuana is not recommended by experts for JIA pain because it has not shown to be helpful and has serious side effects for the developing brain. Youth should try other treatments before thinking about trying this treatment. It is important to have a discussion about it with your health care team if you wish to use it.', 'Les experts ne recommandent pas la marijuana pour soulager la douleur causée par l’AJI, car elle ne s’est pas révélée utile et a des effets secondaires graves sur le cerveau en développement. Les jeunes devraient essayer d’autres traitements avant d’envisager celui-ci. Il est important d’en discuter avec votre équipe soignante si vous souhaitez en consommer.', 'Marijuana or Cannabis are not recommended in JIA guidelines.', 'Les lignes directrices pour l’AJI ne recommandent pas la marijuana ou les cannabinoïdes.', 'You can discuss this treatment with your health care team if have questions about Cannabis/Marijuana.', 'Si vous avez des questions sur la marijuana ou les cannabinoïdes, vous pouvez en discuter avec votre équipe soignante.', 'It is difficult to say because of the lack of research. Improvements may vary depending on the type of product used and each person’s characteristics.', 'C\'est difficile à dire en raison du manque de recherche. Les bienfaits peuvent varier selon le type de produit utilisé et les caractéristiques de chaque personne.', 'Cannabis/Marijuana may cost money. Health insurance may cover some of these costs.', 'La marijuana/cannabinoïdes peut coûter de l’argent. L’assurance maladie peut couvrir certains de ces frais.', 'Your healthcare team can give you information about Cannabis/Marijuana/cannabinoid oils if it is indicated for you. It is very important to talk about it with your health care team if you have been using it on your own since these products can interact with your JIA treatments.', 'Votre équipe soignante peut vous donner de l’information sur la marijuana/les cannabinoïdes/les huiles de cannabinoïdes si cela vous est indiqué. Il est très important d’en parler avec votre équipe soignante si vous choisissez d’en prendre, car ces produits peuvent interagir avec vos traitements pour l’AJI.', 'It may be illegal depending on where you live.', 'Selon l’endroit où vous vivez, sa consommation peut être illégale.', 'uploads/1596925167324marijuana.jpg', 5, '2020-08-08 22:19:27', '2020-08-08 22:19:27'),
(68, 'Acetylsalicylic Acid (Aspirin®)', 'Acide acétylsalicylique (Aspirin®)', 'HCP', 9, 39, 'general', 'général', 'A pill that is commonly used as a possible pain reliever for minor aches and to reduce fever. It is also called ASA (acetylsalicylic acid) (another brand name is Motrin®).', 'Une pilule couramment utilisée comme antidouleur pour soulager les douleurs mineures et faire baisser la fièvre. On l’appelle également ASA (acide acétylsalicylique). Un autre nom de marque est Motrin®.', 3, 'Aspirin® is not recommended for youth with JIA.', 'L’Aspirin® n’est pas recommandé pour les jeunes atteints d’AJI.', 'Aspirin® is not recommended in JIA guidelines, because this treatment can cause the Reye syndrome among youth.', 'Les lignes directrices pour l’AJI ne recommandent pas l’Aspirin®, car ce médicament peut provoquer le syndrome de Reye chez les jeunes.', 'You can discuss this treatment with your health care team if you have questions about Aspirin®.', 'Si vous avez des questions sur l’Aspirine, vous pouvez en discuter avec votre équipe soignante.', '', '', 'Aspirin® can cost money. Health insurance may cover some of these costs.', 'L’Aspirin® peut coûter de l’argent. L’assurance maladie peut couvrir certains de ces frais.', 'Aspirin® should be discussed with your health care team. It can be purchased over the counter in pharmacies.', 'Vous pouvez également en discuter avec votre équipe soignante. On peut en acheter en vente libre dans les pharmacies.', '', '', 'uploads/1596925338220acetylsalicylic .jpg', 5, '2020-08-08 22:22:18', '2021-06-21 22:32:11'),
(69, 'Healthy Diet', 'Saine alimentation', 'SC', 4, 21, 'general', 'général', 'A balanced diet of vegetables, fruits, protein, and whole grains that helps you stay healthy.', 'Une alimentation équilibrée composée de légumes, de fruits, de protéines et de grains entiers qui vous aide à rester en bonne santé.', 1, 'A healthy diet is recommended by experts for all. It should be used to stay healthy and may be used by youth with JIA to manage pain.', 'Les experts recommandent à tous d’avoir une saine alimentation. Une alimentation saine devrait être adoptée pour rester en bonne santé et elle peut être utile aux jeunes atteints d’AJI pour soulager leur douleur.', 'A healthy diet is recommended for all.', 'Une alimentation saine est recommandée pour tous.', 'Youth and caregivers can look online or talk to their health care team for ways to have a healthy diet. One of the best ways to eat well is to prepare you own food instead of eating processed food.', 'Les jeunes et les aidants peuvent chercher des moyens d’avoir une alimentation saine en ligne ou en discuter avec leur équipe soignante. L’un des meilleurs moyens de bien manger est de préparer ses propres repas au lieu de manger des aliments transformés.', 'It may take up to a few months to feel better, but everybody is different.', 'Cela peut prendre jusqu’à quelques mois avant de voir une amélioration, mais tout le monde est différent.', 'The intervention takes time to do. Food costs can vary.', 'Avoir une saine alimentation prend du temps. Les coûts de la nourriture peuvent varier.', 'You can read online for information and look at Canada’s Food Guide and the Dietary Guidelines for Americans online.', 'Des renseignements sont disponibles en ligne, dont le Guide alimentaire canadien et les Directives diététiques pour les Américains.', 'Healthy eating may be slightly more expensive and not as convenient because of meals cooked at home.', 'Une alimentation saine peut coûter légèrement plus cher et être moins pratique en raison des repas cuisinés à la maison.', 'uploads/1596925822268healthy_diet.jpg', 8, '2020-08-08 22:30:22', '2020-08-08 22:30:22'),
(70, 'Mediterranean Diet', 'Diète méditerranéenne', 'SC', 4, 24, 'general', 'général', 'A diet that mainly includes on fruits and vegetables, whole grains, beans, fish and olive oil, that helps you stay healthy.', 'Un régime qui comprend principalement des fruits et légumes, des grains entiers, des haricots, du poisson et de l’huile d’olive, et qui vous aide à rester en bonne santé.', 1, 'Mediterranean diets are often recommended by dieticians. It should be used to stay healthy and may be used by youth with JIA to help manage pain.', 'Les diététiciens recommandent souvent les régimes méditerranéens. Ces régimes devraient être suivis pour rester en bonne santé et peuvent être utilisés par les jeunes atteints d’AJI pour aider à soulager leur douleur.', 'The Mediterranean diet is often recommended by dieticians.', 'Les diététiciens recommandent souvent le régime méditerranéen.', 'Youth and caregivers can look online or talk to their health care team for specific guidelines for this diet.', 'Les jeunes et les aidants peuvent chercher de l’information sur ce régime en ligne ou en discuter avec leur équipe soignante.', 'It may take up to a few months to feel better, but everybody is different.', 'Cela peut prendre jusqu’à quelques mois avant de voir une amélioration, mais tout le monde est différent.', 'Food costs can vary.', 'Les coûts de la nourriture peuvent varier.', 'You can find Mediterranean diet guidelines online.', 'Vous pouvez trouver de l’information sur le régime méditerranéen en ligne.', 'Following a Mediterranean diet may be slightly more expensive and not as convenient because of meals that have to be cooked at home.', 'Suivre un régime méditerranéen peut être légèrement plus cher et pas aussi pratique en raison des repas qui doivent être cuisinés à la maison.', 'uploads/1596925909914mediterranean_diet.jpg', 8, '2020-08-08 22:31:49', '2020-08-08 22:31:49'),
(71, 'Fish Oil (Omega-3)', 'Huile de poisson (oméga-3)', 'HCP', 5, 26, 'general', 'général', 'A pill with an oil that comes from fish that may keep you healthy.', 'Une pilule contenant une huile de poisson qui peut vous garder en bonne santé.', 2, 'Fish oil is not mentioned in clinical practice guidelines for youth with JIA. They may be used by youth with JIA to manage pain after a discussion with their health care team.', 'Les lignes directrices cliniques ne mentionnent pas l’huile de poisson pour les jeunes atteints d’AJI. Les jeunes atteints d’AJI peuvent prendre de l’huile de poisson pour soulager leur douleur après en avoir parlé à leur équipe soignante.', 'Fish oil (Omega-3) is not mentioned in JIA guidelines.', 'Les lignes directrices pour l’AJI ne mentionnent pas l’huile de poisson (oméga-3).', 'It is suggested to first discuss with your health care team about taking fish oils. Doses of Cod liver oil supplements contain vitamin A. If you are taking other multivitamins, it is important to ensure the total dose is below 9,000 international units per day. Cod liver oil supplements also contain vitamin D (usually 400 international units) and may contain vitamin E in low doses.', 'Il est suggéré de discuter avec votre équipe soignante avant de prendre de l’huile de poisson. Les doses de suppléments d’huile de foie de morue contiennent de la vitamine A. Si vous prenez d’autres multivitamines, il est important de vous assurer que la dose totale est inférieure à 9 000 unités internationales par jour. Les suppléments d’huile de foie de morue contiennent également de la vitamine D (généralement 400 unités internationales) et peuvent contenir de la vitamine E à faibles doses.', 'It may take up to a few months to feel better, but everybody is different.', 'Cela peut prendre jusqu’à quelques mois avant de voir une amélioration, mais tout le monde est différent.', 'Fish oil can cost money.', 'L’huile de poisson peut coûter de l’argent.', 'Fish oil can be purchased over the counter in stores.', 'On peut acheter de l’huile de poisson en vente libre dans les magasins.', 'It is better to have a healthy diet than to use supplements and have an unhealthy diet. Including fish oil in your diet may be slightly more expensive.', 'Il est préférable d’avoir une alimentation saine plutôt que d’utiliser des suppléments en mangeant mal. L’ajout de l’huile de poisson à votre alimentation peut coûter légèrement plus cher.', 'uploads/1596926013915fish_oil.jpg', 8, '2020-08-08 22:33:33', '2021-06-21 22:32:22'),
(72, 'Glucosamine Hydrochloride', 'Chlorhydrate de glucosamine', 'HCP', 5, 27, 'general', 'général', 'A pill that is used as a supplement with an amino sugar (glucosamine) that our body naturally produces to help make a “cushion” that surrounds our joints (also can be found in shellfish or created in a laboratory).', 'Une pilule qui est utilisée comme supplément contenant un sucre aminé (glucosamine) que notre corps produit naturellement pour aider à former le « coussin » qui entoure nos articulations. On peut également en trouver dans les crustacés ou le créer en laboratoire.', 2, 'Glucosamine hydrochloride is not mentioned in guidelines for youth with JIA. They may be used by youth with JIA to manage pain after a discussion with their health care team.', 'Les lignes directrices ne mentionnent pas le chlorhydrate de glucosamine pour les jeunes atteints d’AJI. Les jeunes atteints d’AJI peuvent prendre du chlorhydrate de glucosamine pour soulager leur douleur après en avoir parlé à leur équipe soignante.', 'Glucosamine hydrochloride is not mentioned in JIA guidelines.', 'Les lignes directrices pour l’AJI ne mentionnent pas le chlorhydrate de glucosamine.', 'It is suggested to first discuss with your health care team about taking this glucosamine hydrochloride.', 'Il est suggéré de discuter avec votre équipe soignante avant de prendre du chlorhydrate de glucosamine.', 'Improvements vary, but everybody is different.', 'Les améliorations peuvent varier, car tout le monde est différent.', 'Glucosamine hydrochloride costs money.', 'Le chlorhydrate de glucosamine coûte de l’argent.', 'Glucosamine hydrochloride can be purchased over the counter in stores.', 'On peut acheter du chlorhydrate de glucosamine en vente libre dans les magasins.', 'In osteoarthritis, glucosamine sulfate seems to work better. However, it is another type of arthritis. It is be better to have a healthy diet than to use supplements and have an unhealthy diet.', 'Le sulfate de glucosamine semble mieux fonctionner pour soulager l’arthrose. Cependant, il s’agit d’une forme différente d’arthrite. Il est préférable d’avoir une alimentation saine plutôt que d’utiliser des suppléments en mangeant mal.', 'uploads/1596926101092glucosamine.jpg', 8, '2020-08-08 22:35:01', '2021-06-21 22:32:31'),
(73, 'Vitamin D', 'Vitamine D', 'SC', 4, 22, 'general', 'général', 'A vitamin that you get from the sun and some foods and that is good for your bones.', 'Une vitamine que vous obtenez du soleil et de certains aliments, et qui est bonne pour vos os.', 1, 'Vitamin D is needed to maintain a healthy diet.', 'La vitamine D est nécessaire pour avoir une saine alimentation.', 'Youth and teens should take a minimum of 600 international units of Vitamin D per day to ensure good bone health. Typical diets are deficient in vitamin D. A supplement of 400-1,000 international units per day is recommended.', 'Les jeunes et les adolescents devraient prendre au moins 600 unités internationales de vitamine D par jour pour s’assurer que leurs os sont en santé. Il manque habituellement de vitamine D dans notre alimentation. Un supplément de 400 à 1 000 unités internationales par jour est recommandé.', 'You may wish to take vitamin D according to instructions provided by your health care team or you pharmacist.', 'Vous voudrez peut-être prendre de la vitamine D selon les consignes de votre équipe soignante ou de votre pharmacien.', 'It may take up to a few months to feel better, but everybody is different.', 'Cela peut prendre jusqu’à quelques mois avant de voir une amélioration, mais tout le monde est différent.', 'Vitamin D supplements costs money.', 'Les suppléments de vitamine D coûtent de l’argent.', 'Vitamin D supplements can be purchased over the counter in stores.', 'On peut acheter des suppléments de vitamine D en vente libre dans les magasins.', '', '', 'uploads/1596926775463vitamin_d.jpg', 8, '2020-08-08 22:46:15', '2020-08-08 22:52:56'),
(74, 'Calcium', 'Calcium', 'SC', 4, 23, 'general', 'général', 'A nutrient that you get from certain foods and that is good for your bones.', 'Un nutriment que vous obtenez de certains aliments, et qui est bon pour vos os.', 1, 'Calcium is needed to maintain a healthy diet.', 'Le calcium est nécessaire pour avoir une saine alimentation.', 'Youth and teens should take a minimum of 1,300 mg of calcium per day to ensure good bone health. A typical diet will contain 200 mg calcium from all non-dairy foods combined. Youth and teens should get an additional 800-1,000 mg from dairy products, calcium-enriched dairy alternatives or, if needed, from a supplement.', 'Les jeunes et les adolescents devraient prendre au moins 1 300 mg de calcium par jour pour s’assurer que leurs os sont en santé. En combinant tous les aliments non laitiers, on consomme habituellement 200 mg de calcium. Les jeunes et les adolescents devraient obtenir 800 à 1000 mg supplémentaires en consommant des produits laitiers, des substituts laitiers enrichis en calcium ou, si nécessaire, un supplément.', 'You may wish to take Calcium according to instructions provided by your health care team or you pharmacist.', 'Vous voudrez peut-être prendre du calcium selon les instructions fournies par votre équipe de soins de santé ou votre pharmacien.', 'It may take up to a few months to feel better, but everybody is different.', 'Cela peut prendre jusqu’à quelques mois avant de voir une amélioration, mais tout le monde est différent.', 'Calcium supplements cost money.', 'Les suppléments de calcium coûtent de l’argent.', 'It can be purchased over the counter in stores.', 'On peut en acheter en vente libre dans les magasins.', '', '', 'uploads/1596926895107calcium.jpg', 8, '2020-08-08 22:48:15', '2020-08-08 22:48:15'),
(75, 'Vegetarian & Vegan Diets', 'Régimes végétariens et végétaliens', 'HCP', 8, 35, 'general', 'général', 'A diet without animal meat or animal products like eggs and dairy products.', 'Une alimentation sans viande animale ou sans produits d’origine animale comme les œufs et les produits laitiers.', 3, 'Vegetarian and vegan diets are not mentioned in guidelines for youth with JIA. We are not sure if they work and they may be unhealthy because of a lack of nutrients. It is important to have a discussion about it with your health care team if you wish to use it.', 'Les lignes directrices ne mentionnent pas les régimes végétariens et végétaliens pour les jeunes atteints d’AJI. Nous ne savons pas si ces régimes fonctionnent et le manque de nutriments peut être mauvais pour la santé. Il est important d’en discuter avec votre équipe soignante si vous souhaitez adopter un de ces régimes.', 'Guidelines do not mention vegetarian and vegan diets for arthritis pain.', 'Les lignes directrices ne mentionnent pas les régimes végétariens et végétaliens pour soulager les douleurs arthritiques.', 'Youth and caregivers can look online or talk to their health care team for ways to have a healthy diet and for specific information on this diet.', 'Les jeunes et les aidants peuvent chercher de l’information sur des moyens d’avoir une saine alimentation et sur des régimes spécifiques en ligne ou en discuter avec leur équipe soignante.', 'It is difficult to say because of the lack of research. Improvements may vary because everybody is different.', 'C’est difficile à dire en raison du manque de recherche. Les améliorations peuvent varier, car tout le monde est différent.', 'Planning and preparing vegetarian diets may take time. Food costs can vary.', 'La planification et la préparation de régimes végétariens peuvent prendre du temps. Les coûts de la nourriture peuvent varier.', 'You can find vegetarian and vegan diets online. Food can be purchased at local grocery stores.', 'Vous pouvez trouver des régimes végétariens et végétaliens en ligne. La nourriture peut être achetée dans les épiceries locales.', '', '', 'uploads/1596926968631veg_vegan_diet.jpg', 8, '2020-08-08 22:49:28', '2020-08-08 22:49:28'),
(76, 'Gluten-Free Diets', 'Régimes sans gluten', 'HCP', 8, 36, 'general', 'général', 'A diet without gluten. Gluten is a substance found in cereal grains. It is found in wheat products like bread, pasta and cereal.', 'Un régime sans gluten. Le gluten est une substance présente dans les céréales. On le trouve dans les produits à base de blé comme le pain, les pâtes et les céréales.', 3, 'Gluten-free diets are not mentioned in guidelines for youth with JIA. We are not sure if they work and they may be unhealthy because of added ingredients in foods. It is important to have a discussion about it with your health care team if you wish to use it.', 'Les lignes directrices ne mentionnent pas les régimes sans gluten pour les jeunes atteints d’AJI. Nous ne savons pas s’ils fonctionnent et ils peuvent être mauvais pour la santé en raison de l’ajout d’ingrédients dans les aliments. Il est important d’en discuter avec votre équipe soignante si vous souhaitez adopter ce régime.', 'Guidelines do not mention gluten-free diets for arthritis pain. This diet is recommended for people with celiac disease.', 'Les lignes directrices ne mentionnent pas les régimes sans gluten pour les douleurs arthritiques. Ce régime est recommandé pour les personnes atteintes de la maladie cœliaque.', 'Youth and caregivers can look online or talk to their health care team for ways to have a healthy diet and for specific information on this diet.', 'Les jeunes et les aidants peuvent chercher de l’information sur des moyens d’avoir une saine alimentation et sur ce régime en ligne ou en discuter avec leur équipe soignante.', 'It is difficult to say because of the lack of research. Improvements may vary because everybody is different.', 'C’est difficile à dire en raison du manque de recherche. Les améliorations peuvent varier, car tout le monde est différent.', 'Planning and preparing gluten-free meals may take time. Gluten-free foods are usually more expensive.', 'La planification et la préparation de repas sans gluten peuvent prendre du temps. Les aliments sans gluten sont généralement plus chers.', 'You can find gluten-free diets online. Food can be purchased at local grocery stores.', 'Vous pouvez trouver des régimes sans gluten en ligne. La nourriture peut être achetée dans les épiceries locales.', '', '', 'uploads/1596927039732gluten_free_diet.jpg', 8, '2020-08-08 22:50:39', '2020-08-08 22:50:39');

-- --------------------------------------------------------

--
-- Table structure for table `treatment_category`
--

CREATE TABLE `treatment_category` (
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `category_id` int(11) NOT NULL,
  `treatment_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `treatment_category`
--

INSERT INTO `treatment_category` (`created_at`, `updated_at`, `category_id`, `treatment_id`) VALUES
('2020-07-04 19:14:35', '2020-07-04 19:14:35', 1, 1),
('2020-08-06 20:17:26', '2020-08-06 20:17:26', 1, 31),
('2020-08-06 20:53:33', '2020-08-06 20:53:33', 1, 49),
('2020-07-04 19:15:46', '2020-07-04 19:15:46', 2, 2),
('2020-07-04 19:15:59', '2020-07-04 19:15:59', 2, 5),
('2020-08-08 20:57:21', '2020-08-08 20:57:21', 2, 38),
('2020-08-08 01:56:12', '2020-08-08 01:56:12', 2, 52),
('2020-08-08 03:21:57', '2020-08-08 03:21:57', 2, 55),
('2020-08-08 03:28:15', '2020-08-08 03:28:15', 2, 57),
('2020-08-08 20:55:07', '2020-08-08 20:55:07', 2, 61),
('2020-08-08 21:01:30', '2020-08-08 21:01:30', 2, 63),
('2020-07-05 04:16:34', '2020-07-05 04:16:34', 3, 10),
('2020-08-08 03:14:47', '2020-08-08 03:14:47', 3, 54),
('2020-08-08 22:04:22', '2020-08-08 22:04:22', 3, 65),
('2020-08-08 22:17:12', '2020-08-08 22:17:12', 3, 66),
('2020-08-08 22:19:27', '2020-08-08 22:19:27', 3, 67),
('2020-08-08 22:22:18', '2020-08-08 22:22:18', 3, 68),
('2020-07-04 19:16:13', '2020-07-04 19:16:13', 4, 5),
('2020-08-06 21:29:13', '2020-08-06 21:29:13', 4, 6),
('2020-08-06 21:31:00', '2020-08-06 21:31:00', 4, 34),
('2020-08-06 21:40:25', '2020-08-06 21:40:25', 4, 35),
('2020-08-07 00:16:43', '2020-08-07 00:16:43', 4, 50),
('2020-08-07 00:17:31', '2020-08-07 00:17:31', 4, 51),
('2020-08-08 01:56:12', '2020-08-08 01:56:12', 4, 52),
('2020-07-04 19:15:36', '2020-07-04 19:15:36', 5, 2),
('2020-07-04 19:16:05', '2020-07-04 19:16:05', 5, 5),
('2020-08-08 22:01:42', '2020-08-08 22:01:42', 5, 10),
('2020-08-06 21:31:41', '2020-08-06 21:31:41', 5, 34),
('2020-08-08 20:57:21', '2020-08-08 20:57:21', 5, 38),
('2020-08-08 01:56:12', '2020-08-08 01:56:12', 5, 52),
('2020-08-08 03:14:47', '2020-08-08 03:14:47', 5, 54),
('2020-08-08 03:21:57', '2020-08-08 03:21:57', 5, 55),
('2020-08-08 03:28:15', '2020-08-08 03:28:15', 5, 57),
('2020-08-08 03:30:58', '2020-08-08 03:30:58', 5, 58),
('2020-08-08 21:01:30', '2020-08-08 21:01:30', 5, 63),
('2020-08-08 22:04:22', '2020-08-08 22:04:22', 5, 65),
('2020-08-06 04:22:26', '2020-08-06 04:22:26', 6, 7),
('2020-08-08 01:59:19', '2020-08-08 01:59:19', 6, 36),
('2020-08-08 02:05:05', '2020-08-08 02:05:05', 6, 53),
('2020-08-08 03:25:38', '2020-08-08 03:25:38', 6, 56),
('2020-08-08 20:55:07', '2020-08-08 20:55:07', 6, 61),
('2020-08-08 21:03:52', '2020-08-08 21:03:52', 6, 64),
('2020-08-08 22:30:22', '2020-08-08 22:30:22', 7, 69),
('2020-08-08 22:31:50', '2020-08-08 22:31:50', 7, 70),
('2020-08-08 22:33:34', '2020-08-08 22:33:34', 7, 71),
('2020-08-08 22:35:01', '2020-08-08 22:35:01', 7, 72),
('2020-08-08 22:46:15', '2020-08-08 22:46:15', 7, 73),
('2020-08-08 22:48:15', '2020-08-08 22:48:15', 7, 74),
('2020-08-08 22:49:28', '2020-08-08 22:49:28', 7, 75),
('2020-08-08 22:50:40', '2020-08-08 22:50:40', 7, 76);

-- --------------------------------------------------------

--
-- Table structure for table `treatment_classifications`
--

CREATE TABLE `treatment_classifications` (
  `id` int(11) NOT NULL DEFAULT 0,
  `name` varchar(255) NOT NULL,
  `fr_name` varchar(40) CHARACTER SET utf8 NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `treatment_classifications`
--

INSERT INTO `treatment_classifications` (`id`, `name`, `fr_name`, `created_at`, `updated_at`) VALUES
(1, 'Splints, orthotics and other devices', 'Attelles, orthèses et autres appareils', '2020-06-09 23:09:47', '2020-06-09 23:09:47'),
(2, 'Physical activities', 'Activités physiques', '2020-06-09 23:10:13', '2020-06-09 23:10:13'),
(3, 'Physical treatments', 'Traitements physiques', '2020-06-09 23:10:30', '2020-06-09 23:10:30'),
(4, 'Educational approaches', 'Approches pédagogiques', '2020-06-13 19:50:33', '2020-06-13 19:50:33'),
(5, 'Pain medications', 'Médicaments contre la douleur', '2020-07-05 04:03:04', '2020-07-05 04:03:04'),
(6, 'Psychological & spiritual approaches', 'Approches psychologiques et spirituelles', '2020-07-06 03:49:44', '2020-07-22 13:25:36'),
(8, 'Nutrition', 'Nutrition', '2020-08-08 22:27:41', '2020-08-08 22:27:41');

-- --------------------------------------------------------

--
-- Table structure for table `treatment_texts`
--

CREATE TABLE `treatment_texts` (
  `id` int(11) NOT NULL,
  `text` text DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `type`, `created_at`, `updated_at`) VALUES
(111, 'admin', '$2b$14$P6FNMJbuGmL9DNgMCPgj9.bUl7S23TaJcIm.5T0fETuTmY2aZOgjC', 'admin', '2021-02-03 12:07:34', '2021-02-03 22:34:06'),
(112, 'user', '$2b$14$65rYBSSjUPb1g2mChqT3Oujg5aNMbYTEe4yFcPdAZGqtGfwkZ15iu', 'user', '2021-03-22 17:18:07', '2021-03-22 17:18:07'),
(121, 'test', '$2b$14$c9S9KJdl5ISM.FWt7Lf82.l8Q6XuQq0kKtsfQYuXMLs2Sh3uSJJZG', 'admin', '2021-06-23 23:57:10', '2021-06-23 23:57:10');

-- --------------------------------------------------------

--
-- Table structure for table `user_factor`
--

CREATE TABLE `user_factor` (
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `factor_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_favourite`
--

CREATE TABLE `user_favourite` (
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `treatment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_hcp`
--

CREATE TABLE `user_hcp` (
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `treatment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_medication`
--

CREATE TABLE `user_medication` (
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `medication_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_plan`
--

CREATE TABLE `user_plan` (
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `treatment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_preferences`
--

CREATE TABLE `user_preferences` (
  `value` float DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `preference_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_sc`
--

CREATE TABLE `user_sc` (
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `treatment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_suggestion`
--

CREATE TABLE `user_suggestion` (
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `suggestion_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_treatment`
--

CREATE TABLE `user_treatment` (
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `treatment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `id` int(11) NOT NULL,
  `link` varchar(1024) NOT NULL,
  `name` varchar(255) NOT NULL,
  `fr_name` varchar(37) CHARACTER SET utf8 DEFAULT NULL,
  `language` varchar(255) NOT NULL,
  `treatment_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `videos`
--

INSERT INTO `videos` (`id`, `link`, `name`, `fr_name`, `language`, `treatment_id`, `created_at`, `updated_at`) VALUES
(1, 'https://www.youtube.com/user/yogawithadriene/search?query=arthritis', 'Youtube: Yoga with Adriene', NULL, 'English', 1, '2021-06-26 16:23:22', '2021-06-26 16:23:22'),
(33, 'https://www.nhs.uk/conditions/nhs-fitness-studio/arthritis-pilates-exercise-video/?tabname=pilates-and-yoga', '', NULL, 'English', 34, '2022-02-10 06:22:27', '2022-02-10 06:22:27'),
(42, 'https://www.youtube.com/watch?v=uKD4k_DUf_Y', '', NULL, 'English', 38, '2021-06-25 01:19:49', '2021-06-25 01:19:49'),
(43, 'https://teens.aboutkidshealth.ca/Article?contentid=2608&language=English&hub=jiateenhub', 'Canadian “Teens Taking Charge” program videos: ', NULL, 'English', 5, '2021-06-26 16:26:22', '2021-06-26 16:26:22'),
(44, 'https://teenstakingcharge.carragroup.org/en/jiateen/Article?contentid=2374&language=English', 'US “Teens Taking Charge” program videos: ', NULL, 'English', 5, '2021-06-26 16:26:22', '2021-06-26 16:26:22'),
(45, 'https://www.youtube.com/user/yogawithadriene/search?query=arthritis', '', NULL, 'English', 5, '2021-06-26 16:26:22', '2021-06-26 16:26:22'),
(46, 'https://www.youtube.com/watch?v=1j4984Mqx7Q', '', NULL, 'English', 5, '2021-06-26 16:26:22', '2021-06-26 16:26:22'),
(48, 'https://www.youtube.com/watch?v=0Kuv7blrV6U', '', NULL, 'English', 35, '2021-06-26 16:27:02', '2021-06-26 16:27:02'),
(51, 'https://www.youtube.com/watch?v=tED1RYb27ng ', '', NULL, 'French', 35, '2021-06-26 16:27:02', '2021-06-26 16:27:02');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `classifications`
--
ALTER TABLE `classifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `confidences`
--
ALTER TABLE `confidences`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `effectivenesses`
--
ALTER TABLE `effectivenesses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `factors`
--
ALTER TABLE `factors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `frequentlies`
--
ALTER TABLE `frequentlies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `frequentlies_ibfk_1` (`user_id`);

--
-- Indexes for table `learns`
--
ALTER TABLE `learns`
  ADD PRIMARY KEY (`id`),
  ADD KEY `learns_ibfk_1` (`treatment_id`);

--
-- Indexes for table `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `medications`
--
ALTER TABLE `medications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `classification_id` (`classification_id`);

--
-- Indexes for table `motivations`
--
ALTER TABLE `motivations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `pain_areas`
--
ALTER TABLE `pain_areas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `pain_levels`
--
ALTER TABLE `pain_levels`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `plan_factors_texts`
--
ALTER TABLE `plan_factors_texts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `preferences`
--
ALTER TABLE `preferences`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `preference_category`
--
ALTER TABLE `preference_category`
  ADD PRIMARY KEY (`category_id`,`preference_id`),
  ADD KEY `preference_id` (`preference_id`);

--
-- Indexes for table `preference_texts`
--
ALTER TABLE `preference_texts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `prescribed_texts`
--
ALTER TABLE `prescribed_texts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `results`
--
ALTER TABLE `results`
  ADD PRIMARY KEY (`id`),
  ADD KEY `results_ibfk_1` (`study_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `studies`
--
ALTER TABLE `studies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `studies_ibfk_1` (`treatment_id`);

--
-- Indexes for table `suggestions`
--
ALTER TABLE `suggestions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `treatments`
--
ALTER TABLE `treatments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `treatment_classification_id` (`treatment_classification_id`);

--
-- Indexes for table `treatment_category`
--
ALTER TABLE `treatment_category`
  ADD PRIMARY KEY (`category_id`,`treatment_id`),
  ADD KEY `treatment_id` (`treatment_id`);

--
-- Indexes for table `treatment_classifications`
--
ALTER TABLE `treatment_classifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `treatment_texts`
--
ALTER TABLE `treatment_texts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`) USING BTREE;

--
-- Indexes for table `user_factor`
--
ALTER TABLE `user_factor`
  ADD PRIMARY KEY (`factor_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_favourite`
--
ALTER TABLE `user_favourite`
  ADD PRIMARY KEY (`treatment_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_hcp`
--
ALTER TABLE `user_hcp`
  ADD PRIMARY KEY (`treatment_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_medication`
--
ALTER TABLE `user_medication`
  ADD PRIMARY KEY (`medication_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_plan`
--
ALTER TABLE `user_plan`
  ADD PRIMARY KEY (`treatment_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_preferences`
--
ALTER TABLE `user_preferences`
  ADD PRIMARY KEY (`preference_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_sc`
--
ALTER TABLE `user_sc`
  ADD PRIMARY KEY (`treatment_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_suggestion`
--
ALTER TABLE `user_suggestion`
  ADD PRIMARY KEY (`suggestion_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_treatment`
--
ALTER TABLE `user_treatment`
  ADD PRIMARY KEY (`treatment_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `videos_ibfk_1` (`treatment_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `confidences`
--
ALTER TABLE `confidences`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `effectivenesses`
--
ALTER TABLE `effectivenesses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `frequentlies`
--
ALTER TABLE `frequentlies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `learns`
--
ALTER TABLE `learns`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2834;

--
-- AUTO_INCREMENT for table `logs`
--
ALTER TABLE `logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=304;

--
-- AUTO_INCREMENT for table `motivations`
--
ALTER TABLE `motivations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `pain_areas`
--
ALTER TABLE `pain_areas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `pain_levels`
--
ALTER TABLE `pain_levels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `plan_factors_texts`
--
ALTER TABLE `plan_factors_texts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `preference_texts`
--
ALTER TABLE `preference_texts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `prescribed_texts`
--
ALTER TABLE `prescribed_texts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `results`
--
ALTER TABLE `results`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `treatment_texts`
--
ALTER TABLE `treatment_texts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=125;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `confidences`
--
ALTER TABLE `confidences`
  ADD CONSTRAINT `confidences_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `effectivenesses`
--
ALTER TABLE `effectivenesses`
  ADD CONSTRAINT `effectivenesses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `frequentlies`
--
ALTER TABLE `frequentlies`
  ADD CONSTRAINT `frequentlies_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `learns`
--
ALTER TABLE `learns`
  ADD CONSTRAINT `learns_ibfk_1` FOREIGN KEY (`treatment_id`) REFERENCES `treatments` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `medications`
--
ALTER TABLE `medications`
  ADD CONSTRAINT `medications_ibfk_1` FOREIGN KEY (`classification_id`) REFERENCES `classifications` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `motivations`
--
ALTER TABLE `motivations`
  ADD CONSTRAINT `motivations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `results`
--
ALTER TABLE `results`
  ADD CONSTRAINT `results_ibfk_1` FOREIGN KEY (`study_id`) REFERENCES `studies` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `studies`
--
ALTER TABLE `studies`
  ADD CONSTRAINT `studies_ibfk_1` FOREIGN KEY (`treatment_id`) REFERENCES `treatments` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `treatments`
--
ALTER TABLE `treatments`
  ADD CONSTRAINT `treatments_ibfk_1` FOREIGN KEY (`treatment_classification_id`) REFERENCES `treatment_classifications` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `videos`
--
ALTER TABLE `videos`
  ADD CONSTRAINT `videos_ibfk_1` FOREIGN KEY (`treatment_id`) REFERENCES `treatments` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
