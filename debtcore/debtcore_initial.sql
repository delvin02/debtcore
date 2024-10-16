-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: debtcore
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `app_company`
--

DROP TABLE IF EXISTS `app_company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_company` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(254) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `streetAddress` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `postcode` varchar(255) DEFAULT NULL,
  `meta_access_token` longtext,
  `meta_token_created_date` datetime(6) DEFAULT NULL,
  `meta_user_id` varchar(255) DEFAULT NULL,
  `meta_is_valid` tinyint(1) NOT NULL,
  `business_registration_id` varchar(255) DEFAULT NULL,
  `whatsapp_business_account_id` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) NOT NULL,
  `last_updated_date` datetime(6) DEFAULT NULL,
  `notes` longtext,
  `is_active` tinyint(1) NOT NULL,
  `is_onboarded` tinyint(1) NOT NULL,
  `date_live` date DEFAULT NULL,
  `created_by_id` char(32) DEFAULT NULL,
  `last_updated_by_id` char(32) DEFAULT NULL,
  `country_id` int NOT NULL,
  `bukku_access_token` longtext,
  `bukku_api` varchar(255) DEFAULT NULL,
  `bukku_subdomain` varchar(255) DEFAULT NULL,
  `bukku_last_sync_time` datetime(6) DEFAULT NULL,
  `default_country_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `email` (`email`),
  KEY `app_company_created_by_id_dd152eae_fk_app_user_id` (`created_by_id`),
  KEY `app_company_last_updated_by_id_f42cbbe9_fk_app_user_id` (`last_updated_by_id`),
  KEY `app_company_country_id_4b6d00b1_fk_app_country_id` (`country_id`),
  KEY `app_company_default_country_id_f3aa5692_fk_app_country_id` (`default_country_id`),
  CONSTRAINT `app_company_country_id_4b6d00b1_fk_app_country_id` FOREIGN KEY (`country_id`) REFERENCES `app_country` (`id`),
  CONSTRAINT `app_company_created_by_id_dd152eae_fk_app_user_id` FOREIGN KEY (`created_by_id`) REFERENCES `app_user` (`id`),
  CONSTRAINT `app_company_default_country_id_f3aa5692_fk_app_country_id` FOREIGN KEY (`default_country_id`) REFERENCES `app_country` (`id`),
  CONSTRAINT `app_company_last_updated_by_id_f42cbbe9_fk_app_user_id` FOREIGN KEY (`last_updated_by_id`) REFERENCES `app_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_company`
--

LOCK TABLES `app_company` WRITE;
/*!40000 ALTER TABLE `app_company` DISABLE KEYS */;
INSERT INTO `app_company` VALUES (1,'DebtCore',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-06-30 07:01:53.576756',NULL,0,'305227442669438','305227442669438','2024-06-10 08:43:40.722125',NULL,NULL,1,1,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL),(2,'SEMIX SDN BHD','','','',NULL,NULL,NULL,NULL,'EAAQSRdvQYq0BO6hMZCRRYsocKjO6mEFT54V2SQn8ONrygrGrHsLmfaw5YefULqdg0vxmYMwrhZC8XSQBA8Awigw1mHU2rOaZAtwiQ1lVZBCSJLz9LDtlmp7pyBo433RaPoKDPvUahqetlT1PEgCwfJVgiOzEFBcWDdHmsJbjcOD3DzXynVuhn9sOrZC2QH3TZBRcLx1MbIQWIxuVbKPAm5KhdZA0qDrgwODuZBkxADEJQVTHDPWbVYUYJOEROkdi9My94SGw4Y5RnwZDZD','2024-07-02 11:49:55.693791',NULL,0,NULL,'384264271429243','2024-06-11 12:13:51.213660','2024-06-11 12:13:51.213272',NULL,1,1,'2024-06-29','14a6ebc6fb26491abddab243e48afada','14a6ebc6fb26491abddab243e48afada',1,NULL,NULL,NULL,NULL,NULL),(11,'FACEBOOK','hello@facebook.com','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,'','2024-06-30 12:01:01.890908','2024-06-30 12:01:01.890627',NULL,0,0,NULL,'14a6ebc6fb26491abddab243e48afada','14a6ebc6fb26491abddab243e48afada',2,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `app_company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_conversation`
--

DROP TABLE IF EXISTS `app_conversation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_conversation` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `company_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `app_conversation_company_id_8440b029_fk_app_company_id` (`company_id`),
  CONSTRAINT `app_conversation_company_id_8440b029_fk_app_company_id` FOREIGN KEY (`company_id`) REFERENCES `app_company` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_conversation`
--

LOCK TABLES `app_conversation` WRITE;
/*!40000 ALTER TABLE `app_conversation` DISABLE KEYS */;
/*!40000 ALTER TABLE `app_conversation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_conversation_participants`
--

DROP TABLE IF EXISTS `app_conversation_participants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_conversation_participants` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `conversation_id` bigint NOT NULL,
  `whatsappuser_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `app_conversation_partici_conversation_id_whatsapp_4e8ea60f_uniq` (`conversation_id`,`whatsappuser_id`),
  KEY `app_conversation_par_whatsappuser_id_ddd63a6d_fk_app_whats` (`whatsappuser_id`),
  CONSTRAINT `app_conversation_par_conversation_id_9261c6af_fk_app_conve` FOREIGN KEY (`conversation_id`) REFERENCES `app_conversation` (`id`),
  CONSTRAINT `app_conversation_par_whatsappuser_id_ddd63a6d_fk_app_whats` FOREIGN KEY (`whatsappuser_id`) REFERENCES `app_whatsappuser` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_conversation_participants`
--

LOCK TABLES `app_conversation_participants` WRITE;
/*!40000 ALTER TABLE `app_conversation_participants` DISABLE KEYS */;
/*!40000 ALTER TABLE `app_conversation_participants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_country`
--

DROP TABLE IF EXISTS `app_country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_country` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `code` varchar(2) NOT NULL,
  `phone_code` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `code` (`code`),
  UNIQUE KEY `phone_code` (`phone_code`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_country`
--

LOCK TABLES `app_country` WRITE;
/*!40000 ALTER TABLE `app_country` DISABLE KEYS */;
INSERT INTO `app_country` VALUES (1,'Malaysia','MY','60'),(2,'Singapore','SG','65'),(3,'Thailand','TH','66'),(4,'Australia','AU','61');
/*!40000 ALTER TABLE `app_country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_customer`
--

DROP TABLE IF EXISTS `app_customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_customer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `business_registration_id` varchar(255) DEFAULT NULL,
  `whatsapp_phone_number` varchar(20) DEFAULT NULL,
  `email` varchar(254) DEFAULT NULL,
  `streetAddress` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `postcode` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) NOT NULL,
  `last_updated_date` datetime(6) DEFAULT NULL,
  `company_id` int NOT NULL,
  `country_id` int NOT NULL,
  `created_by_id` char(32) DEFAULT NULL,
  `last_updated_by_id` char(32) DEFAULT NULL,
  `accounting_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `app_customer_company_id_989b41a6_fk_app_company_id` (`company_id`),
  KEY `app_customer_country_id_6ae19c41_fk_app_country_id` (`country_id`),
  KEY `app_customer_created_by_id_7ecce5ff_fk_app_user_id` (`created_by_id`),
  KEY `app_customer_last_updated_by_id_167fa82a_fk_app_user_id` (`last_updated_by_id`),
  CONSTRAINT `app_customer_company_id_989b41a6_fk_app_company_id` FOREIGN KEY (`company_id`) REFERENCES `app_company` (`id`),
  CONSTRAINT `app_customer_country_id_6ae19c41_fk_app_country_id` FOREIGN KEY (`country_id`) REFERENCES `app_country` (`id`),
  CONSTRAINT `app_customer_created_by_id_7ecce5ff_fk_app_user_id` FOREIGN KEY (`created_by_id`) REFERENCES `app_user` (`id`),
  CONSTRAINT `app_customer_last_updated_by_id_167fa82a_fk_app_user_id` FOREIGN KEY (`last_updated_by_id`) REFERENCES `app_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_customer`
--

LOCK TABLES `app_customer` WRITE;
/*!40000 ALTER TABLE `app_customer` DISABLE KEYS */;
INSERT INTO `app_customer` VALUES (1,'George Sdn Bhd','AAABC-02','01125480175','weeiwaai02@gmail.com','','','','','2024-06-10 09:26:15.673018','2024-06-10 09:26:15.672807',1,1,'14a6ebc6fb26491abddab243e48afada','14a6ebc6fb26491abddab243e48afada',NULL),(2,'WAAI','','0478643029','weei@gmail.com','','','','','2024-06-11 13:18:40.282460','2024-06-11 13:18:40.282259',1,4,'14a6ebc6fb26491abddab243e48afada','14a6ebc6fb26491abddab243e48afada',NULL),(3,'KHOR WEEI CHENG','','01125480175','weeiwaai02@gmail.com','','','','','2024-06-11 14:27:39.132680','2024-06-11 14:27:39.132523',1,1,'14a6ebc6fb26491abddab243e48afada','14a6ebc6fb26491abddab243e48afada',NULL),(4,'HONG WEI JIAN','','0103666828','test@gmail.com','','','','','2024-06-11 14:39:19.493946','2024-06-11 14:39:19.493784',1,1,'14a6ebc6fb26491abddab243e48afada','14a6ebc6fb26491abddab243e48afada',NULL),(5,'ASNX','','0478643029','','','','','','2024-06-12 04:27:19.089941','2024-06-12 04:27:19.089733',1,4,'14a6ebc6fb26491abddab243e48afada','14a6ebc6fb26491abddab243e48afada',NULL),(6,'Good Llama','','0126473363','','','','','','2024-06-12 10:04:29.278538','2024-06-12 10:04:29.278332',1,1,'14a6ebc6fb26491abddab243e48afada','14a6ebc6fb26491abddab243e48afada',NULL),(7,'Soon Seng','','0129383989','','','','','','2024-06-12 11:15:14.280260','2024-06-12 11:15:14.280052',1,1,'14a6ebc6fb26491abddab243e48afada','14a6ebc6fb26491abddab243e48afada',NULL),(8,'SENG2','','01158859955','','','','','','2024-06-12 11:26:01.432869','2024-06-12 11:26:01.432702',1,1,'14a6ebc6fb26491abddab243e48afada','14a6ebc6fb26491abddab243e48afada',NULL),(9,'Jordan','','0164167418','','','','','','2024-06-14 11:48:49.051027','2024-06-14 11:48:49.050796',1,1,'14a6ebc6fb26491abddab243e48afada','14a6ebc6fb26491abddab243e48afada',NULL),(10,'JIA WEI','','0142161787','','','','','','2024-06-15 06:35:59.946370','2024-06-15 06:35:59.946204',1,1,'14a6ebc6fb26491abddab243e48afada','14a6ebc6fb26491abddab243e48afada',NULL),(11,'Geroge Sdn Bhd','','0478643029','','','','','','2024-06-30 08:24:16.587636','2024-06-30 08:24:16.587434',2,4,'14a6ebc6fb26491abddab243e48afada','14a6ebc6fb26491abddab243e48afada',NULL);
/*!40000 ALTER TABLE `app_customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_debt`
--

DROP TABLE IF EXISTS `app_debt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_debt` (
  `id` int NOT NULL AUTO_INCREMENT,
  `invoice` varchar(255) NOT NULL,
  `invoice_date` date NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `status` varchar(12) NOT NULL,
  `document` varchar(100) NOT NULL,
  `created_date` datetime(6) NOT NULL,
  `last_updated_date` datetime(6) DEFAULT NULL,
  `company_id` int NOT NULL,
  `created_by_id` char(32) DEFAULT NULL,
  `customer_id` int NOT NULL,
  `last_updated_by_id` char(32) DEFAULT NULL,
  `term` int DEFAULT NULL,
  `due_date` date NOT NULL,
  `accounting_id` int DEFAULT NULL,
  `bukku_updated_at` varchar(255) DEFAULT NULL,
  `bukku_is_voided` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `app_debt_company_id_bf7880a4_fk_app_company_id` (`company_id`),
  KEY `app_debt_created_by_id_f1b5998a_fk_app_user_id` (`created_by_id`),
  KEY `app_debt_customer_id_1c899ee5_fk_app_customer_id` (`customer_id`),
  KEY `app_debt_last_updated_by_id_3784c2cd_fk_app_user_id` (`last_updated_by_id`),
  CONSTRAINT `app_debt_company_id_bf7880a4_fk_app_company_id` FOREIGN KEY (`company_id`) REFERENCES `app_company` (`id`),
  CONSTRAINT `app_debt_created_by_id_f1b5998a_fk_app_user_id` FOREIGN KEY (`created_by_id`) REFERENCES `app_user` (`id`),
  CONSTRAINT `app_debt_customer_id_1c899ee5_fk_app_customer_id` FOREIGN KEY (`customer_id`) REFERENCES `app_customer` (`id`),
  CONSTRAINT `app_debt_last_updated_by_id_3784c2cd_fk_app_user_id` FOREIGN KEY (`last_updated_by_id`) REFERENCES `app_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_debt`
--

LOCK TABLES `app_debt` WRITE;
/*!40000 ALTER TABLE `app_debt` DISABLE KEYS */;
INSERT INTO `app_debt` VALUES (1,'in892','2024-06-05',27.27,'1','upload/1/debt/b8de/Invoice_MYIN24_132768.pdf','2024-06-10 09:26:33.421959','2024-06-10 09:26:33.421741',1,'14a6ebc6fb26491abddab243e48afada',1,'14a6ebc6fb26491abddab243e48afada',7,'2024-06-12',NULL,NULL,0),(2,'INV-001','2024-06-11',250.00,'1','upload/1/debt/9372/TEST.pdf','2024-06-11 13:20:01.722736','2024-06-11 13:20:01.722449',1,'14a6ebc6fb26491abddab243e48afada',2,'14a6ebc6fb26491abddab243e48afada',0,'2024-06-11',NULL,NULL,0),(3,'INV-001','2024-06-11',257.00,'3','upload/1/debt/5bdd/Weei_Waai_KHOR_6104865_0.pdf','2024-06-11 14:27:54.360531','2024-06-11 14:27:54.360358',1,'14a6ebc6fb26491abddab243e48afada',3,'14a6ebc6fb26491abddab243e48afada',7,'2024-06-18',NULL,NULL,0),(4,'INV-002A','2024-06-13',700.00,'1','upload/1/debt/7851/Weei_Waai_KHOR_6104865_0.pdf','2024-06-11 14:39:59.550103','2024-06-11 14:39:59.549925',1,'14a6ebc6fb26491abddab243e48afada',4,'14a6ebc6fb26491abddab243e48afada',7,'2024-06-20',NULL,NULL,0),(5,'ASNX-01','2024-06-12',360.00,'1','upload/1/debt/75a9/Invoice_INV_2024_00003.pdf','2024-06-12 04:27:56.074917','2024-06-12 04:27:56.074686',1,'14a6ebc6fb26491abddab243e48afada',5,'14a6ebc6fb26491abddab243e48afada',7,'2024-06-19',NULL,NULL,0),(6,'INV-001','2024-06-19',250.00,'1','upload/1/debt/2fb2/Invoice-9468659.pdf','2024-06-12 10:04:54.900389','2024-06-12 10:04:54.900132',1,'14a6ebc6fb26491abddab243e48afada',6,'14a6ebc6fb26491abddab243e48afada',7,'2024-06-26',NULL,NULL,0),(7,'INV-002','2024-06-06',700.00,'1','upload/1/debt/be7f/Invoice_MYIN24_132768.pdf','2024-06-12 11:15:43.048490','2024-06-12 11:15:43.048305',1,'14a6ebc6fb26491abddab243e48afada',7,'14a6ebc6fb26491abddab243e48afada',7,'2024-06-13',NULL,NULL,0),(8,'INV-001','2024-06-13',360.00,'1','upload/1/debt/1ed7/Invoice-STSST-1597502.pdf','2024-06-12 11:26:21.973714','2024-06-12 11:26:21.973508',1,'14a6ebc6fb26491abddab243e48afada',8,'14a6ebc6fb26491abddab243e48afada',7,'2024-06-20',NULL,NULL,0),(9,'J-001','2024-06-10',250.00,'1','upload/1/debt/d7b8/Invoice-9468659.pdf','2024-06-14 11:49:22.943165','2024-06-14 11:49:22.942901',1,'14a6ebc6fb26491abddab243e48afada',9,'14a6ebc6fb26491abddab243e48afada',7,'2024-06-17',NULL,NULL,0),(10,'INV-001','2024-06-05',2500.00,'2','upload/1/debt/5144/2024-02-20T14-54_Transaction_7104781222967844-14149697.pdf','2024-06-15 06:36:30.242220','2024-06-15 06:36:30.241997',1,'14a6ebc6fb26491abddab243e48afada',10,'14a6ebc6fb26491abddab243e48afada',14,'2024-06-19',NULL,NULL,0),(11,'INV-001','2024-06-11',360.00,'1','upload/2/debt/11bc/Invoice_MYIN24_132768.pdf','2024-06-30 08:24:35.734441','2024-06-30 08:24:35.734219',2,'14a6ebc6fb26491abddab243e48afada',11,'14a6ebc6fb26491abddab243e48afada',7,'2024-06-18',NULL,NULL,0);
/*!40000 ALTER TABLE `app_debt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_debtbacklog`
--

DROP TABLE IF EXISTS `app_debtbacklog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_debtbacklog` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` longtext NOT NULL,
  `created_date` datetime(6) NOT NULL,
  `is_system_generated` tinyint(1) NOT NULL,
  `created_by_id` char(32) DEFAULT NULL,
  `debt_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `app_debtbacklog_created_by_id_c45d0ef5_fk_app_user_id` (`created_by_id`),
  KEY `app_debtbacklog_debt_id_ee3e10a8_fk_app_debt_id` (`debt_id`),
  CONSTRAINT `app_debtbacklog_created_by_id_c45d0ef5_fk_app_user_id` FOREIGN KEY (`created_by_id`) REFERENCES `app_user` (`id`),
  CONSTRAINT `app_debtbacklog_debt_id_ee3e10a8_fk_app_debt_id` FOREIGN KEY (`debt_id`) REFERENCES `app_debt` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_debtbacklog`
--

LOCK TABLES `app_debtbacklog` WRITE;
/*!40000 ALTER TABLE `app_debtbacklog` DISABLE KEYS */;
INSERT INTO `app_debtbacklog` VALUES (1,'Debt invoice created for George Sdn Bhd with invoice number in892.','2024-06-10 09:26:33.429341',0,'14a6ebc6fb26491abddab243e48afada',1),(2,'Debt invoice created for KHOR WEEI ZHEE with invoice number INV-001.','2024-06-11 13:20:01.731067',0,'14a6ebc6fb26491abddab243e48afada',2),(3,'testasdasd','2024-06-11 13:26:22.465650',0,'14a6ebc6fb26491abddab243e48afada',2),(4,'Debt invoice created for KHOR WEEI CHENG with invoice number INV-001.','2024-06-11 14:27:54.365453',0,'14a6ebc6fb26491abddab243e48afada',3),(5,'Debt invoice created for HONG WEI JIAN with invoice number INV-002A.','2024-06-11 14:39:59.554668',0,'14a6ebc6fb26491abddab243e48afada',4),(6,'Debt invoice created for ASNX with invoice number ASNX-01.','2024-06-12 04:27:56.080536',0,'14a6ebc6fb26491abddab243e48afada',5),(7,'Debt invoice created for Good Llama with invoice number INV-001.','2024-06-12 10:04:54.905158',0,'14a6ebc6fb26491abddab243e48afada',6),(8,'Debt invoice created for Soon Seng with invoice number INV-002.','2024-06-12 11:15:43.053218',0,'14a6ebc6fb26491abddab243e48afada',7),(9,'Debt invoice created for SENG2 with invoice number INV-001.','2024-06-12 11:26:21.983259',0,'14a6ebc6fb26491abddab243e48afada',8),(10,'x angkat','2024-06-13 01:42:27.484271',0,'14a6ebc6fb26491abddab243e48afada',8),(11,'ollolo','2024-06-13 01:42:45.809217',0,'14a6ebc6fb26491abddab243e48afada',8),(12,'lololo','2024-06-13 01:42:49.760289',0,'14a6ebc6fb26491abddab243e48afada',8),(13,'lolololo','2024-06-13 01:42:51.877721',0,'14a6ebc6fb26491abddab243e48afada',8),(14,'xdasdas','2024-06-13 01:42:56.727103',0,'14a6ebc6fb26491abddab243e48afada',8),(15,'bill jelas','2024-06-13 01:43:04.576778',0,'14a6ebc6fb26491abddab243e48afada',8),(16,'NV-002.','2024-06-13 01:43:32.906645',0,'14a6ebc6fb26491abddab243e48afada',7),(17,'NV-002.','2024-06-13 01:43:34.571436',0,'14a6ebc6fb26491abddab243e48afada',7),(18,'NV-002.NV-002.NV-002.','2024-06-13 01:43:37.630735',0,'14a6ebc6fb26491abddab243e48afada',7),(19,'NV-002.NV-002.NV-002.NV-002.NV-002.','2024-06-13 01:43:40.669400',0,'14a6ebc6fb26491abddab243e48afada',7),(20,'NV-002.NV-002.NV-002.NV-002.NV-002.NV-002.','2024-06-13 01:43:43.268245',0,'14a6ebc6fb26491abddab243e48afada',7),(21,'NV-002.NV-002.NV-002.NV-002.NV-002.NV-002.','2024-06-13 01:43:45.615922',0,'14a6ebc6fb26491abddab243e48afada',7),(22,'NV-002.NV-002.NV-002.NV-002.NV-002.NV-002.','2024-06-13 01:43:47.859450',0,'14a6ebc6fb26491abddab243e48afada',7),(23,'NV-002.NV-002.NV-002.NV-002.NV-002.','2024-06-13 01:43:50.209498',0,'14a6ebc6fb26491abddab243e48afada',7),(24,'lol test','2024-06-14 05:46:35.634059',0,'14a6ebc6fb26491abddab243e48afada',8),(25,'lol test','2024-06-14 05:46:35.793716',0,'14a6ebc6fb26491abddab243e48afada',8),(26,'lol test','2024-06-14 05:46:41.153795',0,'14a6ebc6fb26491abddab243e48afada',8),(27,'teat sa','2024-06-14 05:46:52.741918',0,'14a6ebc6fb26491abddab243e48afada',8),(28,'teat sa','2024-06-14 05:46:52.823980',0,'14a6ebc6fb26491abddab243e48afada',8),(29,'teweqweqw','2024-06-14 05:54:05.067593',0,'14a6ebc6fb26491abddab243e48afada',1),(30,'asdasdas da','2024-06-14 05:54:10.274555',0,'14a6ebc6fb26491abddab243e48afada',8),(31,'asdasdsa','2024-06-14 05:54:13.057483',0,'14a6ebc6fb26491abddab243e48afada',8),(32,'ddd a','2024-06-14 05:54:15.809708',0,'14a6ebc6fb26491abddab243e48afada',8),(33,'Debt invoice created for Jordan with invoice number J-001.','2024-06-14 11:49:22.948645',0,'14a6ebc6fb26491abddab243e48afada',9),(34,'Debt invoice created for JIA WEI with invoice number INV-001.','2024-06-15 06:36:30.248384',0,'14a6ebc6fb26491abddab243e48afada',10),(35,'Debt invoice created for Geroge Sdn Bhd with invoice number INV-001.','2024-06-30 08:24:35.743698',0,'14a6ebc6fb26491abddab243e48afada',11);
/*!40000 ALTER TABLE `app_debtbacklog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_session`
--

DROP TABLE IF EXISTS `app_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_session` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) NOT NULL,
  `completed_date` datetime(6) DEFAULT NULL,
  `transaction_status` int NOT NULL,
  `company_id` int DEFAULT NULL,
  `webhook_id` int DEFAULT NULL,
  `status_code` int NOT NULL,
  `whatsapp_message_id` varchar(255) DEFAULT NULL,
  `additional_info` longtext NOT NULL DEFAULT (_utf8mb3'2024-06-10 08:43:31.316719+00:00'),
  `customer_name` varchar(255) NOT NULL,
  `debt_id` int DEFAULT NULL,
  `invoice` varchar(255) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `event_type` int NOT NULL,
  `scheduled_date` date DEFAULT NULL,
  `change_info` longtext,
  PRIMARY KEY (`id`),
  KEY `app_session_company_id_230bb765_fk_app_company_id` (`company_id`),
  KEY `app_session_debt_id_e3547cfb_fk_app_debt_id` (`debt_id`),
  KEY `app_session_webhook_id_50d282cc_fk_app_webhook_id` (`webhook_id`),
  CONSTRAINT `app_session_company_id_230bb765_fk_app_company_id` FOREIGN KEY (`company_id`) REFERENCES `app_company` (`id`),
  CONSTRAINT `app_session_debt_id_e3547cfb_fk_app_debt_id` FOREIGN KEY (`debt_id`) REFERENCES `app_debt` (`id`),
  CONSTRAINT `app_session_webhook_id_50d282cc_fk_app_webhook_id` FOREIGN KEY (`webhook_id`) REFERENCES `app_webhook` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_session`
--

LOCK TABLES `app_session` WRITE;
/*!40000 ALTER TABLE `app_session` DISABLE KEYS */;
INSERT INTO `app_session` VALUES (1,'2024-06-10 09:26:33.591697','2024-06-10 14:30:00.000000',1,1,NULL,200,'wamid.HBgMNjAxMTI1NDgwMTc1FQIAERgSODcxQ0ZDMjI0MzMxMThFQjE3AA==','Payment reminder sent to George Sdn Bhd at 601125480175','',1,'in892',NULL,11,'2024-05-29',NULL),(2,'2024-06-10 09:26:33.595399','2024-06-11 14:30:00.000000',1,1,NULL,200,'wamid.HBgMNjAxMTI1NDgwMTc1FQIAERgSMzFGNDUzRjc3QzkzNzY5MDJEAA==','Payment reminder sent to George Sdn Bhd at 601125480175','',1,'in892',NULL,11,'2024-06-12',NULL),(3,'2024-06-10 09:26:33.599006',NULL,0,1,NULL,0,NULL,'30 days after notification scheduled on 2024-07-05','',1,'in892',NULL,11,'2024-07-05',NULL),(4,'2024-06-10 09:26:33.606599',NULL,0,1,NULL,0,NULL,'60 days after notification scheduled on 2024-08-04','',1,'in892',NULL,11,'2024-08-04',NULL),(5,'2024-06-10 09:26:33.609728',NULL,0,1,NULL,0,NULL,'90 days after notification scheduled on 2024-09-03','',1,'in892',NULL,11,'2024-09-03',NULL),(6,'2024-06-11 13:20:01.825138','2024-06-14 07:27:55.413773',1,1,NULL,200,'wamid.HBgLNjE0Nzg2NDMwMjkVAgARGBIzQUIwQ0IzQTI4M0NBOEMwQzAA','Payment reminder sent to WAAI at 61478643029 (Overdued by 3 days)','',2,'INV-001',NULL,11,'2024-06-04',NULL),(7,'2024-06-11 13:20:01.844552','2024-06-15 06:00:02.692589',1,1,NULL,200,'wamid.HBgLNjE0Nzg2NDMwMjkVAgARGBI5QTFGREQwMDIxODIzMzBDREEA','Payment reminder sent to WAAI at 61478643029 (Overdued by 4 days)','',2,'INV-001',NULL,11,'2024-06-15','Last update by Admin, scheduled from 2024-06-18 to 2024-06-15'),(8,'2024-06-11 13:20:01.866336',NULL,3,1,NULL,203,NULL,'Debt Claimed, operation terminated.','',2,'INV-001',NULL,11,'2024-07-11',NULL),(9,'2024-06-11 13:20:01.899165','2024-06-10 14:30:00.000000',1,1,NULL,200,'wamid.HBgLNjE0Nzg2NDMwMjkVAgARGBJENjk2Q0Y5MTFCODQ1RDg0ODAA','Payment reminder sent to KHOR WEEI ZHEE at 61478643029','',2,'INV-001',NULL,11,'2024-08-10',NULL),(10,'2024-06-11 13:20:01.927193','2024-06-14 11:55:14.225153',1,1,NULL,200,'wamid.HBgLNjE0Nzg2NDMwMjkVAgARGBJGRjFCNUIyOThDMkIzNDYzM0MA','Payment reminder sent to WAAI at 61478643029 (Overdued by 3 days)','',2,'INV-001',NULL,11,'2024-09-09',NULL),(11,'2024-06-11 14:27:54.384059','2024-06-10 14:30:00.000000',1,1,NULL,200,'wamid.HBgMNjAxMTI1NDgwMTc1FQIAERgSNkZDODMxRUYyRjA3NjZBRjI5AA==','Payment reminder sent to KHOR WEEI CHENG at 601125480175','',3,'INV-001',NULL,11,'2024-06-04',NULL),(12,'2024-06-11 14:27:54.387772',NULL,3,1,NULL,203,NULL,'Debt Canceled, operation terminated.','',3,'INV-001',NULL,11,'2024-06-18',NULL),(13,'2024-06-11 14:27:54.394524',NULL,3,1,NULL,203,NULL,'Debt Canceled, operation terminated.','',3,'INV-001',NULL,11,'2024-07-11',NULL),(14,'2024-06-11 14:27:54.399017',NULL,3,1,NULL,203,NULL,'Debt Canceled, operation terminated.','',3,'INV-001',NULL,11,'2024-08-10',NULL),(15,'2024-06-11 14:27:54.405368',NULL,3,1,NULL,203,NULL,'Debt Canceled, operation terminated.','',3,'INV-001',NULL,11,'2024-09-09',NULL),(16,'2024-06-11 14:39:59.578418','2024-06-10 14:30:00.000000',1,1,NULL,200,'wamid.HBgLNjAxMDM2NjY4MjgVAgARGBI0ODNGNEU5RUU2NkRDM0Y1RUMA','Payment reminder sent to HONG WEI JIAN at 60103666828','',4,'INV-002A',NULL,11,'2024-06-06',NULL),(17,'2024-06-11 14:39:59.584269','2024-06-17 06:00:01.519444',1,1,NULL,200,'wamid.HBgLNjAxMDM2NjY4MjgVAgARGBJCNTFDMTUwNTNCMTQ1NjdGMEYA','Payment reminder sent to HONG WEI JIAN at 60103666828','',4,'INV-002A',NULL,11,'2024-06-17','Last update by Admin, scheduled from 2024-06-20 to 2024-06-18'),(18,'2024-06-11 14:39:59.587899',NULL,0,1,NULL,0,NULL,'30 days after notification scheduled on 2024-07-13','',4,'INV-002A',NULL,11,'2024-07-13',NULL),(19,'2024-06-11 14:39:59.592240',NULL,0,1,NULL,0,NULL,'60 days after notification scheduled on 2024-08-12','',4,'INV-002A',NULL,11,'2024-08-12',NULL),(20,'2024-06-11 14:39:59.598369',NULL,0,1,NULL,0,NULL,'90 days after notification scheduled on 2024-09-11','',4,'INV-002A',NULL,11,'2024-09-11',NULL),(21,'2024-06-12 04:27:56.152568','2024-06-15 07:24:51.625254',1,1,NULL,200,'wamid.HBgLNjE0Nzg2NDMwMjkVAgARGBIxRTVFOTcyM0FENEU3QjFDOTkA','Payment reminder sent to ASNX at 61478643029','',5,'ASNX-01',NULL,11,'2024-06-15','Last update by Admin, scheduled from 2024-06-14 to 2024-06-15'),(22,'2024-06-12 04:27:56.157452','2024-06-20 03:38:32.124152',1,1,NULL,200,'wamid.HBgLNjE0Nzg2NDMwMjkVAgARGBIxMzUxMTFBNjYwNzU5OUZCMjEA','Payment reminder sent to ASNX at 61478643029 (Overdued by 1 days)','',5,'ASNX-01',NULL,11,'2024-06-16','Last update by Admin, scheduled from 2024-06-19 to 2024-06-16'),(23,'2024-06-12 04:27:56.163607','2024-06-20 03:40:41.774165',1,1,NULL,200,'wamid.HBgLNjE0Nzg2NDMwMjkVAgARGBI2MjIwODdBQTQ1RkI5OTZBQzkA','Payment reminder sent to ASNX at 61478643029 (Overdued by 1 days)','',5,'ASNX-01',NULL,11,'2024-07-12',NULL),(24,'2024-06-12 04:27:56.178771','2024-06-11 16:00:00.000000',1,1,NULL,200,'wamid.HBgLNjE0Nzg2NDMwMjkVAgARGBJGNjc0NEFEOUI5MjY0NzU3N0IA','Payment reminder sent to ASNX at 61478643029','',5,'ASNX-01',NULL,11,'2024-08-11',NULL),(25,'2024-06-12 04:27:56.189619','2024-06-11 16:00:00.000000',1,1,NULL,200,'wamid.HBgLNjE0Nzg2NDMwMjkVAgARGBJERUVDNTMyOTkyQUE3REJCNzgA','Payment reminder sent to ASNX at 61478643029','',5,'ASNX-01',NULL,11,'2024-09-10',NULL),(26,'2024-06-12 10:04:55.287403','2024-06-11 16:00:00.000000',1,1,NULL,200,'wamid.HBgLNjAxMjY0NzMzNjMVAgARGBI0RTJDQUM1QzEzNjcwQjI3NTgA','Payment reminder sent to Good Llama at 60126473363','',6,'INV-001',NULL,11,'2024-06-12',NULL),(27,'2024-06-12 10:04:55.292938','2024-06-26 06:00:01.695900',1,1,NULL,200,'wamid.HBgLNjAxMjY0NzMzNjMVAgARGBI4Q0Y0Q0NEOTlGQjM0NUUzQTcA','Payment reminder sent to Good Llama at 60126473363','',6,'INV-001',NULL,11,'2024-06-26',NULL),(28,'2024-06-12 10:04:55.303522',NULL,0,1,NULL,0,NULL,'30 days after notification scheduled on 2024-07-19','',6,'INV-001',NULL,11,'2024-07-19',NULL),(29,'2024-06-12 10:04:55.311691',NULL,0,1,NULL,0,NULL,'60 days after notification scheduled on 2024-08-18','',6,'INV-001',NULL,11,'2024-08-18',NULL),(30,'2024-06-12 10:04:55.319938',NULL,0,1,NULL,0,NULL,'90 days after notification scheduled on 2024-09-17','',6,'INV-001',NULL,11,'2024-09-17',NULL),(31,'2024-06-12 11:15:43.075921',NULL,3,1,NULL,202,NULL,'7 days before notification skipped as it is past due.','',7,'INV-002',NULL,11,'2024-05-30',NULL),(32,'2024-06-12 11:15:43.080201','2024-06-11 16:00:00.000000',1,1,NULL,200,'wamid.HBgLNjAxMjkzODM5ODkVAgARGBI1ODU2Nzc5RDI3Q0U4NkQwQkUA','Payment reminder sent to Soon Seng at 60129383989','',7,'INV-002',NULL,11,'2024-06-13',NULL),(33,'2024-06-12 11:15:43.087379','2024-06-11 16:00:00.000000',1,1,NULL,200,'wamid.HBgLNjAxMjkzODM5ODkVAgARGBI2QUZGMzUwRjRBMUNFODBFOEMA','Payment reminder sent to Soon Seng at 60129383989','',7,'INV-002',NULL,11,'2024-07-06',NULL),(34,'2024-06-12 11:15:43.091424','2024-06-11 16:00:00.000000',1,1,NULL,200,'wamid.HBgLNjAxMjkzODM5ODkVAgARGBJCMzMwNzIyMkU0QzZCN0YzRjQA','Payment reminder sent to Soon Seng at 60129383989','',7,'INV-002',NULL,11,'2024-08-05',NULL),(35,'2024-06-12 11:15:43.098667',NULL,0,1,NULL,0,NULL,'90 days after notification scheduled on 2024-09-04','',7,'INV-002',NULL,11,'2024-09-04',NULL),(36,'2024-06-12 11:26:22.053447',NULL,3,1,NULL,202,NULL,'7 days before notification skipped as it is past due.','',8,'INV-001',NULL,11,'2024-06-06',NULL),(37,'2024-06-12 11:26:22.057449','2024-06-11 16:00:00.000000',1,1,NULL,200,'wamid.HBgMNjAxMTU4ODU5OTU1FQIAERgSQTk3MzlGMUFEMzIzRDZFMEJDAA==','Payment reminder sent to SENG2 at 601158859955','',8,'INV-001',NULL,11,'2024-06-20',NULL),(38,'2024-06-12 11:26:22.066094',NULL,0,1,NULL,0,NULL,'30 days after notification scheduled on 2024-07-13','',8,'INV-001',NULL,11,'2024-07-13',NULL),(39,'2024-06-12 11:26:22.070595',NULL,0,1,NULL,0,NULL,'60 days after notification scheduled on 2024-08-12','',8,'INV-001',NULL,11,'2024-08-12',NULL),(40,'2024-06-12 11:26:22.076468',NULL,0,1,NULL,0,NULL,'90 days after notification scheduled on 2024-09-11','',8,'INV-001',NULL,11,'2024-09-11',NULL),(41,'2024-06-14 11:49:23.332888',NULL,3,1,NULL,202,NULL,'7 days before notification skipped as it is past due.','',9,'J-001',NULL,11,'2024-06-03',NULL),(42,'2024-06-14 11:49:23.336903','2024-06-14 11:52:05.944643',1,1,NULL,200,'wamid.HBgLNjAxNjQxNjc0MTgVAgARGBI4MEM4NEIzNDI1RjE0OTlFN0YA','Payment reminder sent to Jordan at 60164167418','',9,'J-001',NULL,11,'2024-06-17',NULL),(43,'2024-06-14 11:49:23.345740','2024-06-14 11:53:59.087770',1,1,NULL,200,'wamid.HBgLNjAxNjQxNjc0MTgVAgARGBJFNTMzRTc3OTBGQ0NBOUJGQkIA','Payment reminder sent to Jordan at 60164167418','',9,'J-001',NULL,11,'2024-07-10',NULL),(44,'2024-06-14 11:49:23.355265','2024-06-14 11:56:11.296935',1,1,NULL,200,'wamid.HBgLNjAxNjQxNjc0MTgVAgARGBJBNkQyNkIzNEQyNDUxNjcwQzIA','Payment reminder sent to Jordan at 60164167418','',9,'J-001',NULL,11,'2024-08-09',NULL),(45,'2024-06-14 11:49:23.365093',NULL,0,1,NULL,0,NULL,'90 days after notification scheduled on 2024-09-08','',9,'J-001',NULL,11,'2024-09-08',NULL),(46,'2024-06-15 06:36:30.267829',NULL,3,1,NULL,202,NULL,'7 days before notification skipped as it is past due.','',10,'INV-001',NULL,11,'2024-05-29',NULL),(47,'2024-06-15 06:36:30.272078','2024-06-15 06:36:46.060063',1,1,NULL,200,'wamid.HBgLNjAxNDIxNjE3ODcVAgARGBIxNjY3NDQ1REYyM0E1OEExRDAA','Payment reminder sent to JIA WEI at 60142161787 (Overdued by 3 days)','',10,'INV-001',NULL,11,'2024-06-12',NULL),(48,'2024-06-15 06:36:30.278144',NULL,3,1,NULL,203,NULL,'Debt Claimed, operation terminated.','',10,'INV-001',NULL,11,'2024-07-05',NULL),(49,'2024-06-15 06:36:30.283882',NULL,3,1,NULL,203,NULL,'Debt Claimed, operation terminated.','',10,'INV-001',NULL,11,'2024-08-04',NULL),(50,'2024-06-15 06:36:30.291282',NULL,3,1,NULL,203,NULL,'Debt Claimed, operation terminated.','',10,'INV-001',NULL,11,'2024-09-03',NULL),(51,'2024-06-30 08:24:36.092472',NULL,3,2,NULL,202,NULL,'7 days before notification skipped as it is past due.','',11,'INV-001',NULL,11,'2024-06-04',NULL),(52,'2024-06-30 08:24:36.113444',NULL,3,2,NULL,202,NULL,'7 days after notification skipped as it is past due.','',11,'INV-001',NULL,11,'2024-06-18',NULL),(53,'2024-06-30 08:24:36.116975','2024-06-30 11:49:41.363020',2,2,NULL,230,NULL,'Payment reminder failed to send','',11,'INV-001',NULL,11,'2024-07-12','Last update by Admin, scheduled from 2024-07-11 to 2024-07-12'),(54,'2024-06-30 08:24:36.121451',NULL,0,2,NULL,0,NULL,'60 days after notification scheduled on 2024-08-10','',11,'INV-001',NULL,11,'2024-08-10',NULL),(55,'2024-06-30 08:24:36.125487',NULL,0,2,NULL,0,NULL,'90 days after notification scheduled on 2024-09-09','',11,'INV-001',NULL,11,'2024-09-09',NULL);
/*!40000 ALTER TABLE `app_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_user`
--

DROP TABLE IF EXISTS `app_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_user` (
  `password` varchar(128) NOT NULL,
  `id` char(32) NOT NULL,
  `email` varchar(254) NOT NULL,
  `name` varchar(255) NOT NULL,
  `surname` varchar(100) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `role` varchar(12) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `company_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `app_user_company_id_ef47d247_fk_app_company_id` (`company_id`),
  CONSTRAINT `app_user_company_id_ef47d247_fk_app_company_id` FOREIGN KEY (`company_id`) REFERENCES `app_company` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_user`
--

LOCK TABLES `app_user` WRITE;
/*!40000 ALTER TABLE `app_user` DISABLE KEYS */;
INSERT INTO `app_user` VALUES ('pbkdf2_sha256$720000$Uh4vQCZtd1CoQISj5Zg1qW$gle+aPumSlnKbKgYBUUJw//DbsI/fF8Fey58dxyNWD8=','14a6ebc6fb26491abddab243e48afada','admin@gmail.com','Admin',NULL,1,1,1,'1','2024-06-10 08:43:40.733027','2024-10-10 11:06:59.703878',2),('pbkdf2_sha256$720000$Uguxdslu2jwqRwSFvXjngX$qd7J9uniTBwC+PxtH5+SzGLD2zFUH60bTe5FIUCO4hs=','1a2c409ebf354414be2c3423c30f3041','aminah@gmail.com','Sufian','Aminah',1,0,0,'3','2024-06-10 09:28:55.916874',NULL,1),('pbkdf2_sha256$720000$sZajH9kQfZwH2MA0ElIalU$oZAOhqtRQJ0JUpl4VLf7KqeU4qP39a9wndG4hzuHulA=','240bcba899734a9e99d6d1223c0787da','duc@debtcore.com','le','Duc',1,0,0,'3','2024-06-11 06:56:20.060507',NULL,1),('pbkdf2_sha256$720000$fI0rPXOvW8Zfd0s5PHm2qt$2NTlK4r2aFsRJW5WWe0+bCd3pgmZd2ulAkUChBr5L7U=','9524589708424e309e433ca53b78dc0b','facebook@gmail.com','user','facebook',1,0,0,'2','2024-06-30 12:01:43.188448','2024-06-30 12:34:50.545954',11),('pbkdf2_sha256$720000$9Rp8Sry2CyiGigUopP2DFq$3CREwuQLO+vAaollToFF2WG+X2Otqf5Pny1JUqCPpCY=','a96592562d364f5a83a96fd3b0c18eed','manager@kckok.my','Zhee','Weei',1,0,0,'3','2024-06-11 13:33:31.016781','2024-06-30 04:28:05.842887',2);
/*!40000 ALTER TABLE `app_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_user_groups`
--

DROP TABLE IF EXISTS `app_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` char(32) NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `app_user_groups_user_id_group_id_73b8e940_uniq` (`user_id`,`group_id`),
  KEY `app_user_groups_group_id_e774d92c_fk_auth_group_id` (`group_id`),
  CONSTRAINT `app_user_groups_group_id_e774d92c_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `app_user_groups_user_id_e6f878f6_fk_app_user_id` FOREIGN KEY (`user_id`) REFERENCES `app_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_user_groups`
--

LOCK TABLES `app_user_groups` WRITE;
/*!40000 ALTER TABLE `app_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `app_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_user_user_permissions`
--

DROP TABLE IF EXISTS `app_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` char(32) NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `app_user_user_permissions_user_id_permission_id_7c8316ce_uniq` (`user_id`,`permission_id`),
  KEY `app_user_user_permis_permission_id_4ef8e133_fk_auth_perm` (`permission_id`),
  CONSTRAINT `app_user_user_permis_permission_id_4ef8e133_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `app_user_user_permissions_user_id_24780b52_fk_app_user_id` FOREIGN KEY (`user_id`) REFERENCES `app_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_user_user_permissions`
--

LOCK TABLES `app_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `app_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `app_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_webhook`
--

DROP TABLE IF EXISTS `app_webhook`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_webhook` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hook_type` int NOT NULL,
  `created_date` datetime(6) NOT NULL,
  `payload` longtext NOT NULL,
  `status_code` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_webhook`
--

LOCK TABLES `app_webhook` WRITE;
/*!40000 ALTER TABLE `app_webhook` DISABLE KEYS */;
/*!40000 ALTER TABLE `app_webhook` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_whatsappcompanyprofile`
--

DROP TABLE IF EXISTS `app_whatsappcompanyprofile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_whatsappcompanyprofile` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quality_rating` varchar(50) NOT NULL,
  `platform_type` varchar(100) NOT NULL,
  `last_onboarded_time` datetime(6) NOT NULL,
  `is_default_phone` tinyint(1) NOT NULL,
  `image_url` varchar(1024) DEFAULT NULL,
  `about` varchar(13) DEFAULT NULL,
  `address` varchar(256) DEFAULT NULL,
  `description` longtext,
  `email` varchar(128) DEFAULT NULL,
  `vertical` varchar(14) DEFAULT NULL,
  `website1` varchar(256) DEFAULT NULL,
  `website2` varchar(256) DEFAULT NULL,
  `company_id` int NOT NULL,
  `whatsapp_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `whatsapp_id` (`whatsapp_id`),
  KEY `app_whatsappphonenumber_company_id_88b2ee91_fk_app_company_id` (`company_id`),
  CONSTRAINT `app_whatsappphonenumber_company_id_88b2ee91_fk_app_company_id` FOREIGN KEY (`company_id`) REFERENCES `app_company` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_whatsappcompanyprofile`
--

LOCK TABLES `app_whatsappcompanyprofile` WRITE;
/*!40000 ALTER TABLE `app_whatsappcompanyprofile` DISABLE KEYS */;
INSERT INTO `app_whatsappcompanyprofile` VALUES (1,'GREEN','CLOUD_API','2024-04-24 03:15:08.000000',0,'https://pps.whatsapp.net/v/t61.24694-24/439004300_1257008155262042_3314985939628292917_n.jpg?ccb=11-4&oh=01_Q5AaIPdaFMyrxs1p3uHsD7RFqvtyyby8qJEgpTlTIfpV3w9q&oe=666FA92C&_nc_sid=e6ed6c&_nc_cat=102','Semix','Lot 2959, Kampung Padang Landak,22000 Jerteh Terengganu test','Payment reminder software from DebtCore. For more inquiries please contact 012-8326682 (SEMIX)','hello@kckok.my','OTHER','https://kckok.my/blog',NULL,1,'292572367271170'),(2,'UNKNOWN','NOT_APPLICABLE','2024-06-30 07:01:49.000000',1,NULL,NULL,NULL,NULL,NULL,'OTHER','https://kckok.my/',NULL,1,'377612765430791'),(3,'UNKNOWN','NOT_APPLICABLE','2024-06-30 08:21:57.000000',0,NULL,NULL,NULL,NULL,NULL,'OTHER','https://kckok.my/',NULL,2,'358410170689475'),(4,'UNKNOWN','NOT_APPLICABLE','2024-07-02 11:38:15.000000',1,NULL,NULL,NULL,'test',NULL,'GROCERY','https://kckok.my/',NULL,2,'348937924974471');
/*!40000 ALTER TABLE `app_whatsappcompanyprofile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_whatsappmessage`
--

DROP TABLE IF EXISTS `app_whatsappmessage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_whatsappmessage` (
  `whatsapp_message_id` varchar(128) NOT NULL,
  `message_text` longtext NOT NULL,
  `message_type` varchar(10) NOT NULL,
  `media_url` varchar(200) DEFAULT NULL,
  `sent_at` datetime(6) NOT NULL,
  `read_at` datetime(6) DEFAULT NULL,
  `delivered_at` datetime(6) DEFAULT NULL,
  `company_id` int NOT NULL,
  `conversation_id` bigint NOT NULL,
  `recipient_id` int NOT NULL,
  `sender_id` int NOT NULL,
  `footer` varchar(60) DEFAULT NULL,
  `header` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`whatsapp_message_id`),
  KEY `app_whatsappmessage_company_id_230274ec_fk_app_company_id` (`company_id`),
  KEY `app_whatsappmessage_conversation_id_05b40688_fk_app_conve` (`conversation_id`),
  KEY `app_whatsappmessage_recipient_id_aaec7dc8_fk_app_whatsappuser_id` (`recipient_id`),
  KEY `app_whatsappmessage_sender_id_f476299b_fk_app_whatsappuser_id` (`sender_id`),
  CONSTRAINT `app_whatsappmessage_company_id_230274ec_fk_app_company_id` FOREIGN KEY (`company_id`) REFERENCES `app_company` (`id`),
  CONSTRAINT `app_whatsappmessage_conversation_id_05b40688_fk_app_conve` FOREIGN KEY (`conversation_id`) REFERENCES `app_conversation` (`id`),
  CONSTRAINT `app_whatsappmessage_recipient_id_aaec7dc8_fk_app_whatsappuser_id` FOREIGN KEY (`recipient_id`) REFERENCES `app_whatsappuser` (`id`),
  CONSTRAINT `app_whatsappmessage_sender_id_f476299b_fk_app_whatsappuser_id` FOREIGN KEY (`sender_id`) REFERENCES `app_whatsappuser` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_whatsappmessage`
--

LOCK TABLES `app_whatsappmessage` WRITE;
/*!40000 ALTER TABLE `app_whatsappmessage` DISABLE KEYS */;
/*!40000 ALTER TABLE `app_whatsappmessage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_whatsapptemplate`
--

DROP TABLE IF EXISTS `app_whatsapptemplate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_whatsapptemplate` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `language` varchar(10) NOT NULL,
  `status` varchar(50) NOT NULL,
  `category` varchar(100) NOT NULL,
  `template_id` varchar(255) NOT NULL,
  `message_delivered` int NOT NULL,
  `message_read` int NOT NULL,
  `components` json NOT NULL,
  `created_date` datetime(6) NOT NULL,
  `last_updated_date` datetime(6) DEFAULT NULL,
  `company_id` int NOT NULL,
  `created_by_id` char(32) DEFAULT NULL,
  `last_updated_by_id` char(32) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `app_whatsapptemplate_company_id_dc152711_fk_app_company_id` (`company_id`),
  KEY `app_whatsapptemplate_created_by_id_4d8e8ab6_fk_app_user_id` (`created_by_id`),
  KEY `app_whatsapptemplate_last_updated_by_id_6ca3b3ed_fk_app_user_id` (`last_updated_by_id`),
  CONSTRAINT `app_whatsapptemplate_company_id_dc152711_fk_app_company_id` FOREIGN KEY (`company_id`) REFERENCES `app_company` (`id`),
  CONSTRAINT `app_whatsapptemplate_created_by_id_4d8e8ab6_fk_app_user_id` FOREIGN KEY (`created_by_id`) REFERENCES `app_user` (`id`),
  CONSTRAINT `app_whatsapptemplate_last_updated_by_id_6ca3b3ed_fk_app_user_id` FOREIGN KEY (`last_updated_by_id`) REFERENCES `app_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_whatsapptemplate`
--

LOCK TABLES `app_whatsapptemplate` WRITE;
/*!40000 ALTER TABLE `app_whatsapptemplate` DISABLE KEYS */;
INSERT INTO `app_whatsapptemplate` VALUES (1,'payment_reminder','en','APPROVED','UTILITY','1637331583669715',0,0,'[{\"type\": \"HEADER\", \"format\": \"DOCUMENT\", \"example\": {\"header_handle\": [\"https://scontent.whatsapp.net/v/t61.29466-34/389368984_1637331587003048_2292145599275960093_n.pdf?ccb=1-7&_nc_sid=8b1bef&_nc_ohc=OaCIXPHwRf4Q7kNvgE_21jM&_nc_ht=scontent.whatsapp.net&edm=AH51TzQEAAAA&oh=01_Q5AaIJOPTNOqyGnIfB9nZhBPF0FIJ7BF-aoORE8G-XUTjYa5&oe=669341BC\"]}}, {\"text\": \"Hi {{1}},\\n\\nThis is a friendly reminder about invoice #{{2}} for {{3}}.\\n\\n- *Invoice Date*: {{4}}\\n- *Due Date*: {{5}}\\n- *Days Overdue*: {{6}}\\n\\n*Please note: This is an automated message, please do not reply.*\\n\\nThanks,\\n{{7}}\", \"type\": \"BODY\", \"example\": {\"body_text\": [[\"SEMIX SDN BHD\", \"001\", \"RM 720\", \"2023-03-20\", \"2023-03-22\", \"5 days\", \"KCK KOK ENGINEERING SDN BHD\"]]}}, {\"text\": \"Powered by DebtCore\", \"type\": \"FOOTER\"}]','2024-06-11 13:08:44.445902','2024-06-14 06:35:55.005753',1,'14a6ebc6fb26491abddab243e48afada','14a6ebc6fb26491abddab243e48afada'),(2,'payment_reminder3','ms','APPROVED','UTILITY','1896415190801146',0,0,'[{\"type\": \"HEADER\", \"format\": \"DOCUMENT\", \"example\": {\"header_handle\": [\"https://scontent.whatsapp.net/v/t61.29466-34/425263981_1896415194134479_4955137757337674649_n.pdf?ccb=1-7&_nc_sid=8b1bef&_nc_ohc=7QZzi9Sk9NUQ7kNvgE-OFtx&_nc_ht=scontent.whatsapp.net&edm=AH51TzQEAAAA&oh=01_Q5AaIM3E9wvUQ233K0-0Xz9p-Ko09bwjx3GRGS3beJ9lPx__&oe=66935C2E\"]}}, {\"text\": \"Hai {{1}},\\n\\nIni adalah peringatan mesra mengenai invois #{{2}} untuk {{3}} yang perlu dibayar pada {{4}}.\\n\\nUntuk kemudahan anda, sila buat pembayaran ke bank ini:\\nBank: {{5}}\\nNombor Akaun: {{6}}\\n\\nSetelah pemindahan dibuat, sila lampirkan bukti pembayaran untuk rujukan kami.\\nSila maklumkan kepada kami jika ada sebarang soalan.\\n\\nTerima kasih,\\n{{7}}\", \"type\": \"BODY\", \"example\": {\"body_text\": [[\"John Doe\", \"001\", \"RM 500\", \"2023-03-27\", \"CIMB CLICKS\", \"1122 1060\", \"Semix SDN BHD\"]]}}, {\"text\": \"Powered by DebtCore\", \"type\": \"FOOTER\"}]','2024-06-11 13:08:44.455564','2024-06-14 06:35:55.010450',1,'14a6ebc6fb26491abddab243e48afada','14a6ebc6fb26491abddab243e48afada'),(3,'payment_reminder3','en','APPROVED','UTILITY','967978844528394',0,0,'[{\"type\": \"HEADER\", \"format\": \"DOCUMENT\", \"example\": {\"header_handle\": [\"https://scontent.whatsapp.net/v/t61.29466-34/380078603_967978847861727_819911942973944654_n.pdf?ccb=1-7&_nc_sid=8b1bef&_nc_ohc=_I1nn2mF-i4Q7kNvgEA5xws&_nc_ht=scontent.whatsapp.net&edm=AH51TzQEAAAA&oh=01_Q5AaIM668jMq8ABRWDlEeiH1c30dQ32Y7cRHXBfDBRSoJmo_&oe=66933CB8\"]}}, {\"text\": \"Hi {{1}},\\n\\nThis is a friendly reminder about invoice #{{2}} for {{3}} which is due on {{4}}.\\n\\nFor your convenience, please make payment to this bank:\\nBank: {{5}}\\nAccount Number: {{6}}\\n\\nOnce transferred, please add the payment attachment for our reference.\\nLet us know if you have any questions.\\n\\nThanks,\\n{{7}}\", \"type\": \"BODY\", \"example\": {\"body_text\": [[\"John Doe\", \"12345\", \"RM 500\", \"2024-04-22\", \"CIMB Bank\", \"987654321\", \"SEMIX SDN BHD\"]]}}, {\"text\": \"Powered by DebtCore\", \"type\": \"FOOTER\"}]','2024-06-11 13:08:44.463360','2024-06-14 06:35:55.015296',1,'14a6ebc6fb26491abddab243e48afada','14a6ebc6fb26491abddab243e48afada'),(4,'payment_reminder2','en','APPROVED','UTILITY','279092805260371',0,0,'[{\"type\": \"HEADER\", \"format\": \"DOCUMENT\", \"example\": {\"header_handle\": [\"https://scontent.whatsapp.net/v/t61.29466-34/386378259_279092808593704_2382054739694394179_n.pdf?ccb=1-7&_nc_sid=8b1bef&_nc_ohc=1cBwB8ojm5gQ7kNvgHk73Fp&_nc_ht=scontent.whatsapp.net&edm=AH51TzQEAAAA&oh=01_Q5AaIL7jrM00kq29akZwAgQd0RQA8oqQEEFw6UMYcPTbdMwV&oe=6693504C\"]}}, {\"text\": \"Hi {{1}},\\n\\nThis is a friendly reminder about invoice #{{2}} for {{3}} which is due on {{4}}.\\n\\nFor your convenience, please make payment to this bank:\\nBank: {{5}}\\nAccount Number: {{6}}\\n\\nOnce transferred, please add the payment attachment for our reference.\\nLet us know if you have any questions.\\n\\nThanks,\\n{{7}}\", \"type\": \"BODY\", \"example\": {\"body_text\": [[\"John Doe\", \"12345\", \"RM 500\", \"2024-04-22\", \"CIMB Bank\", \"987654321\", \"SEMIX SDN BHD\"]]}}, {\"text\": \"Powered by DebtCore\", \"type\": \"FOOTER\"}]','2024-06-11 13:08:44.471985','2024-06-14 06:35:55.019161',1,'14a6ebc6fb26491abddab243e48afada','14a6ebc6fb26491abddab243e48afada'),(5,'payment_reminder1','en','APPROVED','UTILITY','778268824270840',0,0,'[{\"type\": \"HEADER\", \"format\": \"DOCUMENT\", \"example\": {\"header_handle\": [\"https://scontent.whatsapp.net/v/t61.29466-34/421855704_778268827604173_1750446061640283546_n.pdf?ccb=1-7&_nc_sid=8b1bef&_nc_ohc=OR1Y0atUgKEQ7kNvgEE0CND&_nc_ht=scontent.whatsapp.net&edm=AH51TzQEAAAA&oh=01_Q5AaIHNsqzSF5-1MLWTDH_OybujP2yyfSniVAF71RH5WAl-X&oe=66934DBF\"]}}, {\"text\": \"Hi {{1}},\\n\\nThis is a friendly reminder about invoice #{{2}} for {{3}} which is due on {{4}}.\\n\\nFor your convenience, please make payment to this bank:\\nBank: {{5}}\\nAccount Number: {{6}}\\n\\nOnce transferred, please add the payment attachment for our reference.\\nLet us know if you have any questions.\\n\\nThanks,\\n{{7}}\", \"type\": \"BODY\", \"example\": {\"body_text\": [[\"John Doe\", \"12345\", \"RM 500\", \"2024-04-22\", \"CIMB Bank\", \"987654321\", \"SEMIX SDN BHD\"]]}}, {\"text\": \"Powered by DebtCore\", \"type\": \"FOOTER\"}]','2024-06-11 13:08:44.477548','2024-06-14 06:35:55.022837',1,'14a6ebc6fb26491abddab243e48afada','14a6ebc6fb26491abddab243e48afada'),(6,'payment_test','en','APPROVED','UTILITY','356503416857639',0,0,'[{\"type\": \"HEADER\", \"format\": \"DOCUMENT\", \"example\": {\"header_handle\": [\"https://scontent.whatsapp.net/v/t61.29466-34/418930682_356503420190972_5268444704761093738_n.pdf?ccb=1-7&_nc_sid=8b1bef&_nc_ohc=Az6RAcPn8P8Q7kNvgFCK8L7&_nc_ht=scontent.whatsapp.net&edm=AH51TzQEAAAA&oh=01_Q5AaIJqWXLigfdOp74_0vliY2Sw8Y9ld2w31wII3XbOFEJEJ&oe=66935EEB\"]}}, {\"text\": \"Hi {{1}},\\n\\nThis is a friendly reminder about invoice #{{2}} for {{3}} which is due on {{4}}.\", \"type\": \"BODY\", \"example\": {\"body_text\": [[\"John Doe\", \"12345\", \"RM 500\", \"2024-04-22\"]]}}, {\"text\": \"Powered by DebtCore\", \"type\": \"FOOTER\"}]','2024-06-11 13:08:44.484220','2024-06-14 06:35:55.026769',1,'14a6ebc6fb26491abddab243e48afada','14a6ebc6fb26491abddab243e48afada'),(7,'payment','en','APPROVED','UTILITY','978369583398350',0,0,'[{\"type\": \"HEADER\", \"format\": \"DOCUMENT\", \"example\": {\"header_handle\": [\"https://scontent.whatsapp.net/v/t61.29466-34/417062202_978369590065016_1757270754123688534_n.pdf?ccb=1-7&_nc_sid=8b1bef&_nc_ohc=fmCNmZqEO9UQ7kNvgHz9kaP&_nc_ht=scontent.whatsapp.net&edm=AH51TzQEAAAA&oh=01_Q5AaIKWGF6p4OMEK3HOwS4E9FEBX5jYUZ92vW6UafGMlnNro&oe=66935B7A\"]}}, {\"text\": \"Hi {{1}},\\n\\nThis is a friendly reminder about invoice #{{2}} for {{3}} which is due on {{4}}.\", \"type\": \"BODY\", \"example\": {\"body_text\": [[\"John Doe\", \"12345\", \"RM 500\", \"2024-04-22\"]]}}, {\"text\": \"Powered by DebtCore\", \"type\": \"FOOTER\"}]','2024-06-11 13:08:44.490822','2024-06-14 06:35:55.030670',1,'14a6ebc6fb26491abddab243e48afada','14a6ebc6fb26491abddab243e48afada'),(8,'thank_you_message','en','APPROVED','UTILITY','3675039969403084',0,0,'[{\"text\": \"Thank you for your payment!\", \"type\": \"HEADER\", \"format\": \"TEXT\"}, {\"text\": \"Hi {{1}},\\n\\n Invoice {{2}} has been paid. Hope you have a great day.\", \"type\": \"BODY\", \"example\": {\"body_text\": [[\"John Doe\", \"RM720\"]]}}, {\"text\": \"Powered by DebtCore\", \"type\": \"FOOTER\"}]','2024-06-11 13:08:44.496819','2024-06-14 06:35:55.034392',1,'14a6ebc6fb26491abddab243e48afada','14a6ebc6fb26491abddab243e48afada'),(9,'payment_reminder','en','PENDING','UTILITY','1203228910691702',0,0,'[{\"type\": \"HEADER\", \"format\": \"DOCUMENT\", \"example\": {\"header_handle\": [\"https://scontent.whatsapp.net/v/t61.29466-34/328287858_1203228917358368_9017738507662003924_n.pdf?ccb=1-7&_nc_sid=8b1bef&_nc_ohc=iZx_CxQVIHIQ7kNvgGVQSnJ&_nc_ht=scontent.whatsapp.net&edm=AH51TzQEAAAA&oh=01_Q5AaIJVP_43eID6J1EsHOYWfpuPHkdSwdTubXjvxS21KxC9Z&oe=66A8876F\"]}}, {\"text\": \"Hi {{1}},\\n\\nThis is a friendly reminder about invoice #{{2}} for {{3}}.\\n\\n- *Invoice Date*: {{4}}\\n- *Due Date*: {{5}}\\n- *Days Overdue*: {{6}}\\n\\n*Please note: This is an automated message, please do not reply.*\\n\\nThanks,\\n{{7}}\", \"type\": \"BODY\", \"example\": {\"body_text\": [[\"John Doe\", \"001\", \"RM 500\", \"2024-04-22\", \"2024-04-26\", \"5 days\", \"SEMIX SDN BHD\"]]}}, {\"text\": \"Powered by DebtCore\", \"type\": \"FOOTER\"}]','2024-06-30 07:02:23.208110','2024-06-30 07:02:24.513304',1,'14a6ebc6fb26491abddab243e48afada','14a6ebc6fb26491abddab243e48afada'),(10,'payment_reminder','en','APPROVED','UTILITY','357348424046683',0,0,'[{\"type\": \"HEADER\", \"format\": \"DOCUMENT\", \"example\": {\"header_handle\": [\"https://scontent.whatsapp.net/v/t61.29466-34/377464529_357348427380016_3918807998326305624_n.pdf?ccb=1-7&_nc_sid=8b1bef&_nc_ohc=iIaE0-CQexUQ7kNvgFNrwot&_nc_ht=scontent.whatsapp.net&edm=AH51TzQEAAAA&oh=01_Q5AaIBve4emPnsbWe49foTzKK0JuZ9qIf7E57JyZB4codbZO&oe=66A8C92C\"]}}, {\"text\": \"Hi {{1}},\\n\\nThis is a friendly reminder about invoice #{{2}} for {{3}}.\\n\\n- *Invoice Date*: {{4}}\\n- *Due Date*: {{5}}\\n- *Days Overdue*: {{6}}\\n\\n*Please note: This is an automated message, please do not reply.*\\n\\nThanks,\\n{{7}}\", \"type\": \"BODY\", \"example\": {\"body_text\": [[\"John Doe\", \"001\", \"RM 500\", \"2024-04-22\", \"2024-04-26\", \"5 days\", \"SEMIX SDN BHD\"]]}}, {\"text\": \"Powered by DebtCore\", \"type\": \"FOOTER\"}]','2024-06-30 08:23:58.897225','2024-06-30 11:24:33.656707',2,'14a6ebc6fb26491abddab243e48afada','14a6ebc6fb26491abddab243e48afada'),(11,'payment_reminder','en','PENDING','UTILITY','999592924996470',0,0,'[{\"type\": \"HEADER\", \"format\": \"DOCUMENT\", \"example\": {\"header_handle\": [\"4::YXBwbGljYXRpb24vcGRm:ARa_fUYPJ9t67pOJbfVYS-YFax3Myj-7mRLKVHlQoQeAdkDqSsbuSNfNzlXaCNOtHxc9mb97ln6owSLGFZX9rx8Ye3FnSQe-umZLu-dabECTyQ:e:1720265930:1145991156753069:61558054183506:ARabn4vkGCZUmiHM0HA\"]}}, {\"text\": \"Hi {{1}},\\n\\nThis is a friendly reminder about invoice #{{2}} for {{3}}.\\n\\n- *Invoice Date*: {{4}}\\n- *Due Date*: {{5}}\\n- *Days Overdue*: {{6}}\\n\\n*Please note: This is an automated message, please do not reply.*\\n\\nThanks,\\n{{7}}\", \"type\": \"BODY\", \"example\": {\"body_text\": [[\"John Doe\", \"001\", \"RM 500\", \"2024-04-22\", \"2024-04-26\", \"5 days\", \"SEMIX SDN BHD\"]]}}, {\"text\": \"Powered by DebtCore\", \"type\": \"FOOTER\"}]','2024-07-02 11:38:54.342299','2024-07-02 11:38:54.342308',2,'14a6ebc6fb26491abddab243e48afada','14a6ebc6fb26491abddab243e48afada');
/*!40000 ALTER TABLE `app_whatsapptemplate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_whatsappuser`
--

DROP TABLE IF EXISTS `app_whatsappuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_whatsappuser` (
  `id` int NOT NULL AUTO_INCREMENT,
  `phone_number` varchar(20) DEFAULT NULL,
  `name` varchar(120) DEFAULT NULL,
  `whatsapp_id` varchar(120) DEFAULT NULL,
  `company_profile_id` int DEFAULT NULL,
  `company_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `app_whatsappuser_company_profile_id_4b408aab_uniq` (`company_profile_id`),
  KEY `app_whatsappuser_company_id_b542bc36_fk_app_company_id` (`company_id`),
  CONSTRAINT `app_whatsappuser_company_id_b542bc36_fk_app_company_id` FOREIGN KEY (`company_id`) REFERENCES `app_company` (`id`),
  CONSTRAINT `app_whatsappuser_company_profile_id_4b408aab_fk_app_whats` FOREIGN KEY (`company_profile_id`) REFERENCES `app_whatsappcompanyprofile` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_whatsappuser`
--

LOCK TABLES `app_whatsappuser` WRITE;
/*!40000 ALTER TABLE `app_whatsappuser` DISABLE KEYS */;
INSERT INTO `app_whatsappuser` VALUES (1,'60104669121','SMX','292572367271170',1,1),(2,'60178759255','SEMIX','377612765430791',2,1),(3,'601120636885','SEMIX','358410170689475',3,2),(4,'601120755730','SEMIX SDN BHD','348937924974471',4,2);
/*!40000 ALTER TABLE `app_whatsappuser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add site',6,'add_site'),(22,'Can change site',6,'change_site'),(23,'Can delete site',6,'delete_site'),(24,'Can view site',6,'view_site'),(25,'Can add country',7,'add_country'),(26,'Can change country',7,'change_country'),(27,'Can delete country',7,'delete_country'),(28,'Can view country',7,'view_country'),(29,'Can add web hook',8,'add_webhook'),(30,'Can change web hook',8,'change_webhook'),(31,'Can delete web hook',8,'delete_webhook'),(32,'Can view web hook',8,'view_webhook'),(33,'Can add user',9,'add_user'),(34,'Can change user',9,'change_user'),(35,'Can delete user',9,'delete_user'),(36,'Can view user',9,'view_user'),(37,'Can add company',10,'add_company'),(38,'Can change company',10,'change_company'),(39,'Can delete company',10,'delete_company'),(40,'Can view company',10,'view_company'),(41,'Can add conversation',11,'add_conversation'),(42,'Can change conversation',11,'change_conversation'),(43,'Can delete conversation',11,'delete_conversation'),(44,'Can view conversation',11,'view_conversation'),(45,'Can add customer',12,'add_customer'),(46,'Can change customer',12,'change_customer'),(47,'Can delete customer',12,'delete_customer'),(48,'Can view customer',12,'view_customer'),(49,'Can add debt',13,'add_debt'),(50,'Can change debt',13,'change_debt'),(51,'Can delete debt',13,'delete_debt'),(52,'Can view debt',13,'view_debt'),(53,'Can add debt backlog',14,'add_debtbacklog'),(54,'Can change debt backlog',14,'change_debtbacklog'),(55,'Can delete debt backlog',14,'delete_debtbacklog'),(56,'Can view debt backlog',14,'view_debtbacklog'),(57,'Can add session',15,'add_session'),(58,'Can change session',15,'change_session'),(59,'Can delete session',15,'delete_session'),(60,'Can view session',15,'view_session'),(61,'Can add whatsapp template',16,'add_whatsapptemplate'),(62,'Can change whatsapp template',16,'change_whatsapptemplate'),(63,'Can delete whatsapp template',16,'delete_whatsapptemplate'),(64,'Can view whatsapp template',16,'view_whatsapptemplate'),(65,'Can add whats app user',17,'add_whatsappuser'),(66,'Can change whats app user',17,'change_whatsappuser'),(67,'Can delete whats app user',17,'delete_whatsappuser'),(68,'Can view whats app user',17,'view_whatsappuser'),(69,'Can add whats app message',18,'add_whatsappmessage'),(70,'Can change whats app message',18,'change_whatsappmessage'),(71,'Can delete whats app message',18,'delete_whatsappmessage'),(72,'Can view whats app message',18,'view_whatsappmessage'),(73,'Can add whats app company profile',19,'add_whatsappcompanyprofile'),(74,'Can change whats app company profile',19,'change_whatsappcompanyprofile'),(75,'Can delete whats app company profile',19,'delete_whatsappcompanyprofile'),(76,'Can view whats app company profile',19,'view_whatsappcompanyprofile'),(77,'Can add Token',20,'add_token'),(78,'Can change Token',20,'change_token'),(79,'Can delete Token',20,'delete_token'),(80,'Can view Token',20,'view_token'),(81,'Can add Token',21,'add_tokenproxy'),(82,'Can change Token',21,'change_tokenproxy'),(83,'Can delete Token',21,'delete_tokenproxy'),(84,'Can view Token',21,'view_tokenproxy'),(85,'Can add crontab',22,'add_crontabschedule'),(86,'Can change crontab',22,'change_crontabschedule'),(87,'Can delete crontab',22,'delete_crontabschedule'),(88,'Can view crontab',22,'view_crontabschedule'),(89,'Can add interval',23,'add_intervalschedule'),(90,'Can change interval',23,'change_intervalschedule'),(91,'Can delete interval',23,'delete_intervalschedule'),(92,'Can view interval',23,'view_intervalschedule'),(93,'Can add periodic task',24,'add_periodictask'),(94,'Can change periodic task',24,'change_periodictask'),(95,'Can delete periodic task',24,'delete_periodictask'),(96,'Can view periodic task',24,'view_periodictask'),(97,'Can add periodic tasks',25,'add_periodictasks'),(98,'Can change periodic tasks',25,'change_periodictasks'),(99,'Can delete periodic tasks',25,'delete_periodictasks'),(100,'Can view periodic tasks',25,'view_periodictasks'),(101,'Can add solar event',26,'add_solarschedule'),(102,'Can change solar event',26,'change_solarschedule'),(103,'Can delete solar event',26,'delete_solarschedule'),(104,'Can view solar event',26,'view_solarschedule'),(105,'Can add clocked',27,'add_clockedschedule'),(106,'Can change clocked',27,'change_clockedschedule'),(107,'Can delete clocked',27,'delete_clockedschedule'),(108,'Can view clocked',27,'view_clockedschedule');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authtoken_token`
--

DROP TABLE IF EXISTS `authtoken_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authtoken_token` (
  `key` varchar(40) NOT NULL,
  `created` datetime(6) NOT NULL,
  `user_id` char(32) NOT NULL,
  PRIMARY KEY (`key`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `authtoken_token_user_id_35299eff_fk_app_user_id` FOREIGN KEY (`user_id`) REFERENCES `app_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authtoken_token`
--

LOCK TABLES `authtoken_token` WRITE;
/*!40000 ALTER TABLE `authtoken_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `authtoken_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `celery_taskmeta`
--

DROP TABLE IF EXISTS `celery_taskmeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `celery_taskmeta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `task_id` varchar(155) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `result` blob,
  `date_done` datetime DEFAULT NULL,
  `traceback` text,
  `name` varchar(155) DEFAULT NULL,
  `args` blob,
  `kwargs` blob,
  `worker` varchar(155) DEFAULT NULL,
  `retries` int DEFAULT NULL,
  `queue` varchar(155) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `task_id` (`task_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1305 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `celery_taskmeta`
--

LOCK TABLES `celery_taskmeta` WRITE;
/*!40000 ALTER TABLE `celery_taskmeta` DISABLE KEYS */;
INSERT INTO `celery_taskmeta` VALUES (1257,'b0b508be-eb47-4bae-bf0a-a1bd9270b7b2','SUCCESS',NULL,'2024-06-13 06:00:03',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1258,'dd8fccb1-e0ba-4376-8c8e-2377e1b02063','SUCCESS',NULL,'2024-06-13 20:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1259,'cc36bfb2-fc6c-4efe-b4f1-5a7d26ed2a2f','SUCCESS',NULL,'2024-06-14 06:00:02',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1260,'1ad39895-f02f-4e4c-a2e0-b8f9a5bb1209','SUCCESS',NULL,'2024-06-14 06:01:40',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1261,'987d39b8-9605-46df-808b-4680e4e522ce','SUCCESS',NULL,'2024-06-14 11:49:23',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1262,'c37ad6cf-80d5-41d2-ac6a-183300187018','FAILURE',_binary 'Çòƒ\0\0\0\0\0\0\0}ö(îexc_typeöîOperationalErroröîexc_messageöîK(MySQLdb.OperationalError) (2013, \'Lost connection to server during query\')öàöî\nexc_moduleöîsqlalchemy.excöu.','2024-06-14 20:00:00','Traceback (most recent call last):\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1967, in _exec_single_context\n    self.dialect.do_execute(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/default.py\", line 924, in do_execute\n    cursor.execute(statement, parameters)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 179, in execute\n    res = self._query(mogrified_query)\n          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 330, in _query\n    db.query(q)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/connections.py\", line 261, in query\n    _mysql.connection.query(self, query)\nMySQLdb.OperationalError: (2013, \'Lost connection to server during query\')\n\nThe above exception was the direct cause of the following exception:\n\nTraceback (most recent call last):\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/trace.py\", line 453, in trace_task\n    R = retval = fun(*args, **kwargs)\n                 ^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/trace.py\", line 736, in __protected_call__\n    return self.run(*args, **kwargs)\n           ^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/builtins.py\", line 22, in backend_cleanup\n    app.backend.cleanup()\n  File \"/usr/local/lib/python3.12/site-packages/celery/backends/database/__init__.py\", line 211, in cleanup\n    self.task_cls.date_done < (now - expires)).delete()\n                                               ^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/query.py\", line 3161, in delete\n    result: CursorResult[Any] = self.session.execute(\n                                ^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/session.py\", line 2351, in execute\n    return self._execute_internal(\n           ^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/session.py\", line 2236, in _execute_internal\n    result: Result[Any] = compile_state_cls.orm_execute_statement(\n                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/bulk_persistence.py\", line 1953, in orm_execute_statement\n    return super().orm_execute_statement(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/context.py\", line 293, in orm_execute_statement\n    result = conn.execute(\n             ^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1418, in execute\n    return meth(\n           ^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/sql/elements.py\", line 515, in _execute_on_connection\n    return connection._execute_clauseelement(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1640, in _execute_clauseelement\n    ret = self._execute_context(\n          ^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1846, in _execute_context\n    return self._exec_single_context(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1986, in _exec_single_context\n    self._handle_dbapi_exception(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 2353, in _handle_dbapi_exception\n    raise sqlalchemy_exception.with_traceback(exc_info[2]) from e\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1967, in _exec_single_context\n    self.dialect.do_execute(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/default.py\", line 924, in do_execute\n    cursor.execute(statement, parameters)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 179, in execute\n    res = self._query(mogrified_query)\n          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 330, in _query\n    db.query(q)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/connections.py\", line 261, in query\n    _mysql.connection.query(self, query)\nsqlalchemy.exc.OperationalError: (MySQLdb.OperationalError) (2013, \'Lost connection to server during query\')\n[SQL: DELETE FROM celery_taskmeta WHERE celery_taskmeta.date_done < %s]\n[parameters: (datetime.datetime(2024, 6, 14, 4, 0, 0, 19044, tzinfo=zoneinfo.ZoneInfo(key=\'Asia/Kuala_Lumpur\')),)]\n(Background on this error at: https://sqlalche.me/e/20/e3q8)\n',NULL,NULL,NULL,NULL,NULL,NULL),(1263,'a5580525-6e39-4c1d-a4f0-761284b3af5c','SUCCESS',NULL,'2024-06-15 06:00:03',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1264,'283da661-a7a9-4bb4-8d2a-4605c9a6c14a','SUCCESS',NULL,'2024-06-15 06:36:30',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1265,'578f44dd-5a1c-4998-aa83-194d3ce350eb','FAILURE',_binary 'Çòì\0\0\0\0\0\0\0}ö(îexc_typeöîOperationalErroröîexc_messageöî9(MySQLdb.OperationalError) (2006, \'Server has gone away\')öàöî\nexc_moduleöîsqlalchemy.excöu.','2024-06-15 20:00:00','Traceback (most recent call last):\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1967, in _exec_single_context\n    self.dialect.do_execute(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/default.py\", line 924, in do_execute\n    cursor.execute(statement, parameters)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 179, in execute\n    res = self._query(mogrified_query)\n          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 330, in _query\n    db.query(q)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/connections.py\", line 261, in query\n    _mysql.connection.query(self, query)\nMySQLdb.OperationalError: (2006, \'Server has gone away\')\n\nThe above exception was the direct cause of the following exception:\n\nTraceback (most recent call last):\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/trace.py\", line 453, in trace_task\n    R = retval = fun(*args, **kwargs)\n                 ^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/trace.py\", line 736, in __protected_call__\n    return self.run(*args, **kwargs)\n           ^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/builtins.py\", line 22, in backend_cleanup\n    app.backend.cleanup()\n  File \"/usr/local/lib/python3.12/site-packages/celery/backends/database/__init__.py\", line 211, in cleanup\n    self.task_cls.date_done < (now - expires)).delete()\n                                               ^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/query.py\", line 3161, in delete\n    result: CursorResult[Any] = self.session.execute(\n                                ^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/session.py\", line 2351, in execute\n    return self._execute_internal(\n           ^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/session.py\", line 2236, in _execute_internal\n    result: Result[Any] = compile_state_cls.orm_execute_statement(\n                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/bulk_persistence.py\", line 1953, in orm_execute_statement\n    return super().orm_execute_statement(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/context.py\", line 293, in orm_execute_statement\n    result = conn.execute(\n             ^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1418, in execute\n    return meth(\n           ^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/sql/elements.py\", line 515, in _execute_on_connection\n    return connection._execute_clauseelement(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1640, in _execute_clauseelement\n    ret = self._execute_context(\n          ^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1846, in _execute_context\n    return self._exec_single_context(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1986, in _exec_single_context\n    self._handle_dbapi_exception(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 2353, in _handle_dbapi_exception\n    raise sqlalchemy_exception.with_traceback(exc_info[2]) from e\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1967, in _exec_single_context\n    self.dialect.do_execute(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/default.py\", line 924, in do_execute\n    cursor.execute(statement, parameters)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 179, in execute\n    res = self._query(mogrified_query)\n          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 330, in _query\n    db.query(q)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/connections.py\", line 261, in query\n    _mysql.connection.query(self, query)\nsqlalchemy.exc.OperationalError: (MySQLdb.OperationalError) (2006, \'Server has gone away\')\n[SQL: DELETE FROM celery_taskmeta WHERE celery_taskmeta.date_done < %s]\n[parameters: (datetime.datetime(2024, 6, 15, 4, 0, 0, 3715, tzinfo=zoneinfo.ZoneInfo(key=\'Asia/Kuala_Lumpur\')),)]\n(Background on this error at: https://sqlalche.me/e/20/e3q8)\n',NULL,NULL,NULL,NULL,NULL,NULL),(1266,'f5805fab-a908-4c47-aec0-26d192a4ee5f','SUCCESS',NULL,'2024-06-16 06:00:01',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1267,'a2357b23-6372-4919-9043-6e20edd3afb3','FAILURE',_binary 'Çòì\0\0\0\0\0\0\0}ö(îexc_typeöîOperationalErroröîexc_messageöî9(MySQLdb.OperationalError) (2006, \'Server has gone away\')öàöî\nexc_moduleöîsqlalchemy.excöu.','2024-06-16 20:00:00','Traceback (most recent call last):\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1967, in _exec_single_context\n    self.dialect.do_execute(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/default.py\", line 924, in do_execute\n    cursor.execute(statement, parameters)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 179, in execute\n    res = self._query(mogrified_query)\n          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 330, in _query\n    db.query(q)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/connections.py\", line 261, in query\n    _mysql.connection.query(self, query)\nMySQLdb.OperationalError: (2006, \'Server has gone away\')\n\nThe above exception was the direct cause of the following exception:\n\nTraceback (most recent call last):\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/trace.py\", line 453, in trace_task\n    R = retval = fun(*args, **kwargs)\n                 ^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/trace.py\", line 736, in __protected_call__\n    return self.run(*args, **kwargs)\n           ^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/builtins.py\", line 22, in backend_cleanup\n    app.backend.cleanup()\n  File \"/usr/local/lib/python3.12/site-packages/celery/backends/database/__init__.py\", line 211, in cleanup\n    self.task_cls.date_done < (now - expires)).delete()\n                                               ^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/query.py\", line 3161, in delete\n    result: CursorResult[Any] = self.session.execute(\n                                ^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/session.py\", line 2351, in execute\n    return self._execute_internal(\n           ^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/session.py\", line 2236, in _execute_internal\n    result: Result[Any] = compile_state_cls.orm_execute_statement(\n                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/bulk_persistence.py\", line 1953, in orm_execute_statement\n    return super().orm_execute_statement(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/context.py\", line 293, in orm_execute_statement\n    result = conn.execute(\n             ^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1418, in execute\n    return meth(\n           ^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/sql/elements.py\", line 515, in _execute_on_connection\n    return connection._execute_clauseelement(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1640, in _execute_clauseelement\n    ret = self._execute_context(\n          ^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1846, in _execute_context\n    return self._exec_single_context(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1986, in _exec_single_context\n    self._handle_dbapi_exception(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 2353, in _handle_dbapi_exception\n    raise sqlalchemy_exception.with_traceback(exc_info[2]) from e\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1967, in _exec_single_context\n    self.dialect.do_execute(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/default.py\", line 924, in do_execute\n    cursor.execute(statement, parameters)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 179, in execute\n    res = self._query(mogrified_query)\n          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 330, in _query\n    db.query(q)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/connections.py\", line 261, in query\n    _mysql.connection.query(self, query)\nsqlalchemy.exc.OperationalError: (MySQLdb.OperationalError) (2006, \'Server has gone away\')\n[SQL: DELETE FROM celery_taskmeta WHERE celery_taskmeta.date_done < %s]\n[parameters: (datetime.datetime(2024, 6, 16, 4, 0, 0, 3719, tzinfo=zoneinfo.ZoneInfo(key=\'Asia/Kuala_Lumpur\')),)]\n(Background on this error at: https://sqlalche.me/e/20/e3q8)\n',NULL,NULL,NULL,NULL,NULL,NULL),(1268,'8587e725-729e-4c62-bf75-12c46d1eb282','SUCCESS',NULL,'2024-06-17 03:14:02',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1269,'ef173811-31bb-4168-bb60-070fe05c042b','SUCCESS',NULL,'2024-06-17 06:00:02',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1270,'26873642-4776-4ad8-820c-8c2dc94be6e1','FAILURE',_binary 'Çòì\0\0\0\0\0\0\0}ö(îexc_typeöîOperationalErroröîexc_messageöî9(MySQLdb.OperationalError) (2006, \'Server has gone away\')öàöî\nexc_moduleöîsqlalchemy.excöu.','2024-06-17 20:00:00','Traceback (most recent call last):\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1967, in _exec_single_context\n    self.dialect.do_execute(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/default.py\", line 924, in do_execute\n    cursor.execute(statement, parameters)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 179, in execute\n    res = self._query(mogrified_query)\n          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 330, in _query\n    db.query(q)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/connections.py\", line 261, in query\n    _mysql.connection.query(self, query)\nMySQLdb.OperationalError: (2006, \'Server has gone away\')\n\nThe above exception was the direct cause of the following exception:\n\nTraceback (most recent call last):\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/trace.py\", line 453, in trace_task\n    R = retval = fun(*args, **kwargs)\n                 ^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/trace.py\", line 736, in __protected_call__\n    return self.run(*args, **kwargs)\n           ^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/builtins.py\", line 22, in backend_cleanup\n    app.backend.cleanup()\n  File \"/usr/local/lib/python3.12/site-packages/celery/backends/database/__init__.py\", line 211, in cleanup\n    self.task_cls.date_done < (now - expires)).delete()\n                                               ^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/query.py\", line 3161, in delete\n    result: CursorResult[Any] = self.session.execute(\n                                ^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/session.py\", line 2351, in execute\n    return self._execute_internal(\n           ^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/session.py\", line 2236, in _execute_internal\n    result: Result[Any] = compile_state_cls.orm_execute_statement(\n                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/bulk_persistence.py\", line 1953, in orm_execute_statement\n    return super().orm_execute_statement(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/context.py\", line 293, in orm_execute_statement\n    result = conn.execute(\n             ^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1418, in execute\n    return meth(\n           ^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/sql/elements.py\", line 515, in _execute_on_connection\n    return connection._execute_clauseelement(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1640, in _execute_clauseelement\n    ret = self._execute_context(\n          ^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1846, in _execute_context\n    return self._exec_single_context(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1986, in _exec_single_context\n    self._handle_dbapi_exception(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 2353, in _handle_dbapi_exception\n    raise sqlalchemy_exception.with_traceback(exc_info[2]) from e\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1967, in _exec_single_context\n    self.dialect.do_execute(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/default.py\", line 924, in do_execute\n    cursor.execute(statement, parameters)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 179, in execute\n    res = self._query(mogrified_query)\n          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 330, in _query\n    db.query(q)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/connections.py\", line 261, in query\n    _mysql.connection.query(self, query)\nsqlalchemy.exc.OperationalError: (MySQLdb.OperationalError) (2006, \'Server has gone away\')\n[SQL: DELETE FROM celery_taskmeta WHERE celery_taskmeta.date_done < %s]\n[parameters: (datetime.datetime(2024, 6, 17, 4, 0, 0, 4055, tzinfo=zoneinfo.ZoneInfo(key=\'Asia/Kuala_Lumpur\')),)]\n(Background on this error at: https://sqlalche.me/e/20/e3q8)\n',NULL,NULL,NULL,NULL,NULL,NULL),(1271,'c5970259-2c63-4089-9998-dae3816539d9','SUCCESS',NULL,'2024-06-18 06:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1272,'aa3e361d-94bb-436b-892e-88606d40f8d4','FAILURE',_binary 'Çòì\0\0\0\0\0\0\0}ö(îexc_typeöîOperationalErroröîexc_messageöî9(MySQLdb.OperationalError) (2006, \'Server has gone away\')öàöî\nexc_moduleöîsqlalchemy.excöu.','2024-06-18 20:00:00','Traceback (most recent call last):\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1967, in _exec_single_context\n    self.dialect.do_execute(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/default.py\", line 924, in do_execute\n    cursor.execute(statement, parameters)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 179, in execute\n    res = self._query(mogrified_query)\n          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 330, in _query\n    db.query(q)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/connections.py\", line 261, in query\n    _mysql.connection.query(self, query)\nMySQLdb.OperationalError: (2006, \'Server has gone away\')\n\nThe above exception was the direct cause of the following exception:\n\nTraceback (most recent call last):\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/trace.py\", line 453, in trace_task\n    R = retval = fun(*args, **kwargs)\n                 ^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/trace.py\", line 736, in __protected_call__\n    return self.run(*args, **kwargs)\n           ^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/builtins.py\", line 22, in backend_cleanup\n    app.backend.cleanup()\n  File \"/usr/local/lib/python3.12/site-packages/celery/backends/database/__init__.py\", line 211, in cleanup\n    self.task_cls.date_done < (now - expires)).delete()\n                                               ^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/query.py\", line 3161, in delete\n    result: CursorResult[Any] = self.session.execute(\n                                ^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/session.py\", line 2351, in execute\n    return self._execute_internal(\n           ^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/session.py\", line 2236, in _execute_internal\n    result: Result[Any] = compile_state_cls.orm_execute_statement(\n                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/bulk_persistence.py\", line 1953, in orm_execute_statement\n    return super().orm_execute_statement(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/context.py\", line 293, in orm_execute_statement\n    result = conn.execute(\n             ^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1418, in execute\n    return meth(\n           ^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/sql/elements.py\", line 515, in _execute_on_connection\n    return connection._execute_clauseelement(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1640, in _execute_clauseelement\n    ret = self._execute_context(\n          ^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1846, in _execute_context\n    return self._exec_single_context(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1986, in _exec_single_context\n    self._handle_dbapi_exception(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 2353, in _handle_dbapi_exception\n    raise sqlalchemy_exception.with_traceback(exc_info[2]) from e\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1967, in _exec_single_context\n    self.dialect.do_execute(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/default.py\", line 924, in do_execute\n    cursor.execute(statement, parameters)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 179, in execute\n    res = self._query(mogrified_query)\n          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 330, in _query\n    db.query(q)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/connections.py\", line 261, in query\n    _mysql.connection.query(self, query)\nsqlalchemy.exc.OperationalError: (MySQLdb.OperationalError) (2006, \'Server has gone away\')\n[SQL: DELETE FROM celery_taskmeta WHERE celery_taskmeta.date_done < %s]\n[parameters: (datetime.datetime(2024, 6, 18, 4, 0, 0, 4108, tzinfo=zoneinfo.ZoneInfo(key=\'Asia/Kuala_Lumpur\')),)]\n(Background on this error at: https://sqlalche.me/e/20/e3q8)\n',NULL,NULL,NULL,NULL,NULL,NULL),(1273,'1044645e-edfe-4d69-a5df-263027f1f227','SUCCESS',NULL,'2024-06-19 06:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1274,'9e544bd2-3d91-491d-8378-86ed4721442b','FAILURE',_binary 'Çòì\0\0\0\0\0\0\0}ö(îexc_typeöîOperationalErroröîexc_messageöî9(MySQLdb.OperationalError) (2006, \'Server has gone away\')öàöî\nexc_moduleöîsqlalchemy.excöu.','2024-06-19 20:00:00','Traceback (most recent call last):\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1967, in _exec_single_context\n    self.dialect.do_execute(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/default.py\", line 924, in do_execute\n    cursor.execute(statement, parameters)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 179, in execute\n    res = self._query(mogrified_query)\n          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 330, in _query\n    db.query(q)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/connections.py\", line 261, in query\n    _mysql.connection.query(self, query)\nMySQLdb.OperationalError: (2006, \'Server has gone away\')\n\nThe above exception was the direct cause of the following exception:\n\nTraceback (most recent call last):\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/trace.py\", line 453, in trace_task\n    R = retval = fun(*args, **kwargs)\n                 ^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/trace.py\", line 736, in __protected_call__\n    return self.run(*args, **kwargs)\n           ^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/builtins.py\", line 22, in backend_cleanup\n    app.backend.cleanup()\n  File \"/usr/local/lib/python3.12/site-packages/celery/backends/database/__init__.py\", line 211, in cleanup\n    self.task_cls.date_done < (now - expires)).delete()\n                                               ^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/query.py\", line 3161, in delete\n    result: CursorResult[Any] = self.session.execute(\n                                ^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/session.py\", line 2351, in execute\n    return self._execute_internal(\n           ^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/session.py\", line 2236, in _execute_internal\n    result: Result[Any] = compile_state_cls.orm_execute_statement(\n                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/bulk_persistence.py\", line 1953, in orm_execute_statement\n    return super().orm_execute_statement(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/context.py\", line 293, in orm_execute_statement\n    result = conn.execute(\n             ^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1418, in execute\n    return meth(\n           ^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/sql/elements.py\", line 515, in _execute_on_connection\n    return connection._execute_clauseelement(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1640, in _execute_clauseelement\n    ret = self._execute_context(\n          ^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1846, in _execute_context\n    return self._exec_single_context(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1986, in _exec_single_context\n    self._handle_dbapi_exception(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 2353, in _handle_dbapi_exception\n    raise sqlalchemy_exception.with_traceback(exc_info[2]) from e\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1967, in _exec_single_context\n    self.dialect.do_execute(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/default.py\", line 924, in do_execute\n    cursor.execute(statement, parameters)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 179, in execute\n    res = self._query(mogrified_query)\n          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 330, in _query\n    db.query(q)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/connections.py\", line 261, in query\n    _mysql.connection.query(self, query)\nsqlalchemy.exc.OperationalError: (MySQLdb.OperationalError) (2006, \'Server has gone away\')\n[SQL: DELETE FROM celery_taskmeta WHERE celery_taskmeta.date_done < %s]\n[parameters: (datetime.datetime(2024, 6, 19, 4, 0, 0, 3819, tzinfo=zoneinfo.ZoneInfo(key=\'Asia/Kuala_Lumpur\')),)]\n(Background on this error at: https://sqlalche.me/e/20/e3q8)\n',NULL,NULL,NULL,NULL,NULL,NULL),(1275,'3f041882-103e-4ecb-8368-32a9effcdc67','SUCCESS',NULL,'2024-06-20 06:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1276,'20d02489-9bef-4b33-b169-62d641780cf3','FAILURE',_binary 'Çòì\0\0\0\0\0\0\0}ö(îexc_typeöîOperationalErroröîexc_messageöî9(MySQLdb.OperationalError) (2006, \'Server has gone away\')öàöî\nexc_moduleöîsqlalchemy.excöu.','2024-06-20 20:00:00','Traceback (most recent call last):\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1967, in _exec_single_context\n    self.dialect.do_execute(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/default.py\", line 924, in do_execute\n    cursor.execute(statement, parameters)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 179, in execute\n    res = self._query(mogrified_query)\n          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 330, in _query\n    db.query(q)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/connections.py\", line 261, in query\n    _mysql.connection.query(self, query)\nMySQLdb.OperationalError: (2006, \'Server has gone away\')\n\nThe above exception was the direct cause of the following exception:\n\nTraceback (most recent call last):\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/trace.py\", line 453, in trace_task\n    R = retval = fun(*args, **kwargs)\n                 ^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/trace.py\", line 736, in __protected_call__\n    return self.run(*args, **kwargs)\n           ^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/builtins.py\", line 22, in backend_cleanup\n    app.backend.cleanup()\n  File \"/usr/local/lib/python3.12/site-packages/celery/backends/database/__init__.py\", line 211, in cleanup\n    self.task_cls.date_done < (now - expires)).delete()\n                                               ^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/query.py\", line 3161, in delete\n    result: CursorResult[Any] = self.session.execute(\n                                ^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/session.py\", line 2351, in execute\n    return self._execute_internal(\n           ^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/session.py\", line 2236, in _execute_internal\n    result: Result[Any] = compile_state_cls.orm_execute_statement(\n                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/bulk_persistence.py\", line 1953, in orm_execute_statement\n    return super().orm_execute_statement(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/context.py\", line 293, in orm_execute_statement\n    result = conn.execute(\n             ^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1418, in execute\n    return meth(\n           ^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/sql/elements.py\", line 515, in _execute_on_connection\n    return connection._execute_clauseelement(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1640, in _execute_clauseelement\n    ret = self._execute_context(\n          ^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1846, in _execute_context\n    return self._exec_single_context(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1986, in _exec_single_context\n    self._handle_dbapi_exception(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 2353, in _handle_dbapi_exception\n    raise sqlalchemy_exception.with_traceback(exc_info[2]) from e\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1967, in _exec_single_context\n    self.dialect.do_execute(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/default.py\", line 924, in do_execute\n    cursor.execute(statement, parameters)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 179, in execute\n    res = self._query(mogrified_query)\n          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 330, in _query\n    db.query(q)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/connections.py\", line 261, in query\n    _mysql.connection.query(self, query)\nsqlalchemy.exc.OperationalError: (MySQLdb.OperationalError) (2006, \'Server has gone away\')\n[SQL: DELETE FROM celery_taskmeta WHERE celery_taskmeta.date_done < %s]\n[parameters: (datetime.datetime(2024, 6, 20, 4, 0, 0, 5814, tzinfo=zoneinfo.ZoneInfo(key=\'Asia/Kuala_Lumpur\')),)]\n(Background on this error at: https://sqlalche.me/e/20/e3q8)\n',NULL,NULL,NULL,NULL,NULL,NULL),(1277,'f9fb431f-227a-4928-9bde-e065c2a53a1b','SUCCESS',NULL,'2024-06-21 06:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1278,'a7cc6201-1278-405f-82b8-ce676559a01b','FAILURE',_binary 'Çòì\0\0\0\0\0\0\0}ö(îexc_typeöîOperationalErroröîexc_messageöî9(MySQLdb.OperationalError) (2006, \'Server has gone away\')öàöî\nexc_moduleöîsqlalchemy.excöu.','2024-06-21 20:00:00','Traceback (most recent call last):\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1967, in _exec_single_context\n    self.dialect.do_execute(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/default.py\", line 924, in do_execute\n    cursor.execute(statement, parameters)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 179, in execute\n    res = self._query(mogrified_query)\n          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 330, in _query\n    db.query(q)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/connections.py\", line 261, in query\n    _mysql.connection.query(self, query)\nMySQLdb.OperationalError: (2006, \'Server has gone away\')\n\nThe above exception was the direct cause of the following exception:\n\nTraceback (most recent call last):\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/trace.py\", line 453, in trace_task\n    R = retval = fun(*args, **kwargs)\n                 ^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/trace.py\", line 736, in __protected_call__\n    return self.run(*args, **kwargs)\n           ^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/builtins.py\", line 22, in backend_cleanup\n    app.backend.cleanup()\n  File \"/usr/local/lib/python3.12/site-packages/celery/backends/database/__init__.py\", line 211, in cleanup\n    self.task_cls.date_done < (now - expires)).delete()\n                                               ^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/query.py\", line 3161, in delete\n    result: CursorResult[Any] = self.session.execute(\n                                ^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/session.py\", line 2351, in execute\n    return self._execute_internal(\n           ^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/session.py\", line 2236, in _execute_internal\n    result: Result[Any] = compile_state_cls.orm_execute_statement(\n                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/bulk_persistence.py\", line 1953, in orm_execute_statement\n    return super().orm_execute_statement(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/context.py\", line 293, in orm_execute_statement\n    result = conn.execute(\n             ^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1418, in execute\n    return meth(\n           ^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/sql/elements.py\", line 515, in _execute_on_connection\n    return connection._execute_clauseelement(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1640, in _execute_clauseelement\n    ret = self._execute_context(\n          ^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1846, in _execute_context\n    return self._exec_single_context(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1986, in _exec_single_context\n    self._handle_dbapi_exception(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 2353, in _handle_dbapi_exception\n    raise sqlalchemy_exception.with_traceback(exc_info[2]) from e\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1967, in _exec_single_context\n    self.dialect.do_execute(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/default.py\", line 924, in do_execute\n    cursor.execute(statement, parameters)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 179, in execute\n    res = self._query(mogrified_query)\n          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 330, in _query\n    db.query(q)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/connections.py\", line 261, in query\n    _mysql.connection.query(self, query)\nsqlalchemy.exc.OperationalError: (MySQLdb.OperationalError) (2006, \'Server has gone away\')\n[SQL: DELETE FROM celery_taskmeta WHERE celery_taskmeta.date_done < %s]\n[parameters: (datetime.datetime(2024, 6, 21, 4, 0, 0, 3957, tzinfo=zoneinfo.ZoneInfo(key=\'Asia/Kuala_Lumpur\')),)]\n(Background on this error at: https://sqlalche.me/e/20/e3q8)\n',NULL,NULL,NULL,NULL,NULL,NULL),(1279,'7e65da59-da67-4e46-a1da-547460a50ccd','SUCCESS',NULL,'2024-06-22 06:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1280,'2d7b50ff-fbf8-449a-bddd-fa8d66530cb3','FAILURE',_binary 'Çòì\0\0\0\0\0\0\0}ö(îexc_typeöîOperationalErroröîexc_messageöî9(MySQLdb.OperationalError) (2006, \'Server has gone away\')öàöî\nexc_moduleöîsqlalchemy.excöu.','2024-06-22 20:00:00','Traceback (most recent call last):\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1967, in _exec_single_context\n    self.dialect.do_execute(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/default.py\", line 924, in do_execute\n    cursor.execute(statement, parameters)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 179, in execute\n    res = self._query(mogrified_query)\n          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 330, in _query\n    db.query(q)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/connections.py\", line 261, in query\n    _mysql.connection.query(self, query)\nMySQLdb.OperationalError: (2006, \'Server has gone away\')\n\nThe above exception was the direct cause of the following exception:\n\nTraceback (most recent call last):\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/trace.py\", line 453, in trace_task\n    R = retval = fun(*args, **kwargs)\n                 ^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/trace.py\", line 736, in __protected_call__\n    return self.run(*args, **kwargs)\n           ^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/builtins.py\", line 22, in backend_cleanup\n    app.backend.cleanup()\n  File \"/usr/local/lib/python3.12/site-packages/celery/backends/database/__init__.py\", line 211, in cleanup\n    self.task_cls.date_done < (now - expires)).delete()\n                                               ^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/query.py\", line 3161, in delete\n    result: CursorResult[Any] = self.session.execute(\n                                ^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/session.py\", line 2351, in execute\n    return self._execute_internal(\n           ^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/session.py\", line 2236, in _execute_internal\n    result: Result[Any] = compile_state_cls.orm_execute_statement(\n                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/bulk_persistence.py\", line 1953, in orm_execute_statement\n    return super().orm_execute_statement(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/context.py\", line 293, in orm_execute_statement\n    result = conn.execute(\n             ^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1418, in execute\n    return meth(\n           ^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/sql/elements.py\", line 515, in _execute_on_connection\n    return connection._execute_clauseelement(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1640, in _execute_clauseelement\n    ret = self._execute_context(\n          ^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1846, in _execute_context\n    return self._exec_single_context(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1986, in _exec_single_context\n    self._handle_dbapi_exception(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 2353, in _handle_dbapi_exception\n    raise sqlalchemy_exception.with_traceback(exc_info[2]) from e\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1967, in _exec_single_context\n    self.dialect.do_execute(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/default.py\", line 924, in do_execute\n    cursor.execute(statement, parameters)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 179, in execute\n    res = self._query(mogrified_query)\n          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 330, in _query\n    db.query(q)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/connections.py\", line 261, in query\n    _mysql.connection.query(self, query)\nsqlalchemy.exc.OperationalError: (MySQLdb.OperationalError) (2006, \'Server has gone away\')\n[SQL: DELETE FROM celery_taskmeta WHERE celery_taskmeta.date_done < %s]\n[parameters: (datetime.datetime(2024, 6, 22, 4, 0, 0, 3696, tzinfo=zoneinfo.ZoneInfo(key=\'Asia/Kuala_Lumpur\')),)]\n(Background on this error at: https://sqlalche.me/e/20/e3q8)\n',NULL,NULL,NULL,NULL,NULL,NULL),(1281,'c288e202-6d91-4a66-bba5-ba0856c69f83','SUCCESS',NULL,'2024-06-23 06:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1282,'a7aad242-72ee-4bb7-9f9f-fa82c8dc8e94','FAILURE',_binary 'Çòì\0\0\0\0\0\0\0}ö(îexc_typeöîOperationalErroröîexc_messageöî9(MySQLdb.OperationalError) (2006, \'Server has gone away\')öàöî\nexc_moduleöîsqlalchemy.excöu.','2024-06-23 20:00:00','Traceback (most recent call last):\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1967, in _exec_single_context\n    self.dialect.do_execute(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/default.py\", line 924, in do_execute\n    cursor.execute(statement, parameters)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 179, in execute\n    res = self._query(mogrified_query)\n          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 330, in _query\n    db.query(q)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/connections.py\", line 261, in query\n    _mysql.connection.query(self, query)\nMySQLdb.OperationalError: (2006, \'Server has gone away\')\n\nThe above exception was the direct cause of the following exception:\n\nTraceback (most recent call last):\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/trace.py\", line 453, in trace_task\n    R = retval = fun(*args, **kwargs)\n                 ^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/trace.py\", line 736, in __protected_call__\n    return self.run(*args, **kwargs)\n           ^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/builtins.py\", line 22, in backend_cleanup\n    app.backend.cleanup()\n  File \"/usr/local/lib/python3.12/site-packages/celery/backends/database/__init__.py\", line 211, in cleanup\n    self.task_cls.date_done < (now - expires)).delete()\n                                               ^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/query.py\", line 3161, in delete\n    result: CursorResult[Any] = self.session.execute(\n                                ^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/session.py\", line 2351, in execute\n    return self._execute_internal(\n           ^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/session.py\", line 2236, in _execute_internal\n    result: Result[Any] = compile_state_cls.orm_execute_statement(\n                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/bulk_persistence.py\", line 1953, in orm_execute_statement\n    return super().orm_execute_statement(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/context.py\", line 293, in orm_execute_statement\n    result = conn.execute(\n             ^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1418, in execute\n    return meth(\n           ^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/sql/elements.py\", line 515, in _execute_on_connection\n    return connection._execute_clauseelement(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1640, in _execute_clauseelement\n    ret = self._execute_context(\n          ^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1846, in _execute_context\n    return self._exec_single_context(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1986, in _exec_single_context\n    self._handle_dbapi_exception(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 2353, in _handle_dbapi_exception\n    raise sqlalchemy_exception.with_traceback(exc_info[2]) from e\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1967, in _exec_single_context\n    self.dialect.do_execute(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/default.py\", line 924, in do_execute\n    cursor.execute(statement, parameters)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 179, in execute\n    res = self._query(mogrified_query)\n          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 330, in _query\n    db.query(q)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/connections.py\", line 261, in query\n    _mysql.connection.query(self, query)\nsqlalchemy.exc.OperationalError: (MySQLdb.OperationalError) (2006, \'Server has gone away\')\n[SQL: DELETE FROM celery_taskmeta WHERE celery_taskmeta.date_done < %s]\n[parameters: (datetime.datetime(2024, 6, 23, 4, 0, 0, 3693, tzinfo=zoneinfo.ZoneInfo(key=\'Asia/Kuala_Lumpur\')),)]\n(Background on this error at: https://sqlalche.me/e/20/e3q8)\n',NULL,NULL,NULL,NULL,NULL,NULL),(1283,'bb4a4ec2-ac28-4534-8b6f-95f96461e5ef','SUCCESS',NULL,'2024-06-24 06:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1284,'0ee64a01-ccde-4731-8477-8e5d0edee28a','FAILURE',_binary 'Çòì\0\0\0\0\0\0\0}ö(îexc_typeöîOperationalErroröîexc_messageöî9(MySQLdb.OperationalError) (2006, \'Server has gone away\')öàöî\nexc_moduleöîsqlalchemy.excöu.','2024-06-24 20:00:00','Traceback (most recent call last):\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1967, in _exec_single_context\n    self.dialect.do_execute(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/default.py\", line 924, in do_execute\n    cursor.execute(statement, parameters)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 179, in execute\n    res = self._query(mogrified_query)\n          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 330, in _query\n    db.query(q)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/connections.py\", line 261, in query\n    _mysql.connection.query(self, query)\nMySQLdb.OperationalError: (2006, \'Server has gone away\')\n\nThe above exception was the direct cause of the following exception:\n\nTraceback (most recent call last):\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/trace.py\", line 453, in trace_task\n    R = retval = fun(*args, **kwargs)\n                 ^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/trace.py\", line 736, in __protected_call__\n    return self.run(*args, **kwargs)\n           ^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/builtins.py\", line 22, in backend_cleanup\n    app.backend.cleanup()\n  File \"/usr/local/lib/python3.12/site-packages/celery/backends/database/__init__.py\", line 211, in cleanup\n    self.task_cls.date_done < (now - expires)).delete()\n                                               ^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/query.py\", line 3161, in delete\n    result: CursorResult[Any] = self.session.execute(\n                                ^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/session.py\", line 2351, in execute\n    return self._execute_internal(\n           ^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/session.py\", line 2236, in _execute_internal\n    result: Result[Any] = compile_state_cls.orm_execute_statement(\n                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/bulk_persistence.py\", line 1953, in orm_execute_statement\n    return super().orm_execute_statement(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/context.py\", line 293, in orm_execute_statement\n    result = conn.execute(\n             ^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1418, in execute\n    return meth(\n           ^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/sql/elements.py\", line 515, in _execute_on_connection\n    return connection._execute_clauseelement(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1640, in _execute_clauseelement\n    ret = self._execute_context(\n          ^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1846, in _execute_context\n    return self._exec_single_context(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1986, in _exec_single_context\n    self._handle_dbapi_exception(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 2353, in _handle_dbapi_exception\n    raise sqlalchemy_exception.with_traceback(exc_info[2]) from e\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1967, in _exec_single_context\n    self.dialect.do_execute(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/default.py\", line 924, in do_execute\n    cursor.execute(statement, parameters)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 179, in execute\n    res = self._query(mogrified_query)\n          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 330, in _query\n    db.query(q)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/connections.py\", line 261, in query\n    _mysql.connection.query(self, query)\nsqlalchemy.exc.OperationalError: (MySQLdb.OperationalError) (2006, \'Server has gone away\')\n[SQL: DELETE FROM celery_taskmeta WHERE celery_taskmeta.date_done < %s]\n[parameters: (datetime.datetime(2024, 6, 24, 4, 0, 0, 3797, tzinfo=zoneinfo.ZoneInfo(key=\'Asia/Kuala_Lumpur\')),)]\n(Background on this error at: https://sqlalche.me/e/20/e3q8)\n',NULL,NULL,NULL,NULL,NULL,NULL),(1285,'06b50996-e8dc-4332-a919-72b11104832d','SUCCESS',NULL,'2024-06-25 06:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1286,'3c6092f0-1b60-4ce7-88ae-92a794865cee','FAILURE',_binary 'Çòì\0\0\0\0\0\0\0}ö(îexc_typeöîOperationalErroröîexc_messageöî9(MySQLdb.OperationalError) (2006, \'Server has gone away\')öàöî\nexc_moduleöîsqlalchemy.excöu.','2024-06-25 20:00:00','Traceback (most recent call last):\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1967, in _exec_single_context\n    self.dialect.do_execute(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/default.py\", line 924, in do_execute\n    cursor.execute(statement, parameters)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 179, in execute\n    res = self._query(mogrified_query)\n          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 330, in _query\n    db.query(q)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/connections.py\", line 261, in query\n    _mysql.connection.query(self, query)\nMySQLdb.OperationalError: (2006, \'Server has gone away\')\n\nThe above exception was the direct cause of the following exception:\n\nTraceback (most recent call last):\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/trace.py\", line 453, in trace_task\n    R = retval = fun(*args, **kwargs)\n                 ^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/trace.py\", line 736, in __protected_call__\n    return self.run(*args, **kwargs)\n           ^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/builtins.py\", line 22, in backend_cleanup\n    app.backend.cleanup()\n  File \"/usr/local/lib/python3.12/site-packages/celery/backends/database/__init__.py\", line 211, in cleanup\n    self.task_cls.date_done < (now - expires)).delete()\n                                               ^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/query.py\", line 3161, in delete\n    result: CursorResult[Any] = self.session.execute(\n                                ^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/session.py\", line 2351, in execute\n    return self._execute_internal(\n           ^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/session.py\", line 2236, in _execute_internal\n    result: Result[Any] = compile_state_cls.orm_execute_statement(\n                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/bulk_persistence.py\", line 1953, in orm_execute_statement\n    return super().orm_execute_statement(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/context.py\", line 293, in orm_execute_statement\n    result = conn.execute(\n             ^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1418, in execute\n    return meth(\n           ^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/sql/elements.py\", line 515, in _execute_on_connection\n    return connection._execute_clauseelement(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1640, in _execute_clauseelement\n    ret = self._execute_context(\n          ^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1846, in _execute_context\n    return self._exec_single_context(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1986, in _exec_single_context\n    self._handle_dbapi_exception(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 2353, in _handle_dbapi_exception\n    raise sqlalchemy_exception.with_traceback(exc_info[2]) from e\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1967, in _exec_single_context\n    self.dialect.do_execute(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/default.py\", line 924, in do_execute\n    cursor.execute(statement, parameters)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 179, in execute\n    res = self._query(mogrified_query)\n          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 330, in _query\n    db.query(q)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/connections.py\", line 261, in query\n    _mysql.connection.query(self, query)\nsqlalchemy.exc.OperationalError: (MySQLdb.OperationalError) (2006, \'Server has gone away\')\n[SQL: DELETE FROM celery_taskmeta WHERE celery_taskmeta.date_done < %s]\n[parameters: (datetime.datetime(2024, 6, 25, 4, 0, 0, 3986, tzinfo=zoneinfo.ZoneInfo(key=\'Asia/Kuala_Lumpur\')),)]\n(Background on this error at: https://sqlalche.me/e/20/e3q8)\n',NULL,NULL,NULL,NULL,NULL,NULL),(1287,'74f76ee5-cce6-4927-a34a-6a8a2ccb99a0','SUCCESS',NULL,'2024-06-26 06:00:02',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1288,'7f7079d1-56c9-426c-94fc-c8f30eea1bc3','FAILURE',_binary 'Çòì\0\0\0\0\0\0\0}ö(îexc_typeöîOperationalErroröîexc_messageöî9(MySQLdb.OperationalError) (2006, \'Server has gone away\')öàöî\nexc_moduleöîsqlalchemy.excöu.','2024-06-26 20:00:00','Traceback (most recent call last):\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1967, in _exec_single_context\n    self.dialect.do_execute(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/default.py\", line 924, in do_execute\n    cursor.execute(statement, parameters)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 179, in execute\n    res = self._query(mogrified_query)\n          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 330, in _query\n    db.query(q)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/connections.py\", line 261, in query\n    _mysql.connection.query(self, query)\nMySQLdb.OperationalError: (2006, \'Server has gone away\')\n\nThe above exception was the direct cause of the following exception:\n\nTraceback (most recent call last):\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/trace.py\", line 453, in trace_task\n    R = retval = fun(*args, **kwargs)\n                 ^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/trace.py\", line 736, in __protected_call__\n    return self.run(*args, **kwargs)\n           ^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/builtins.py\", line 22, in backend_cleanup\n    app.backend.cleanup()\n  File \"/usr/local/lib/python3.12/site-packages/celery/backends/database/__init__.py\", line 211, in cleanup\n    self.task_cls.date_done < (now - expires)).delete()\n                                               ^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/query.py\", line 3161, in delete\n    result: CursorResult[Any] = self.session.execute(\n                                ^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/session.py\", line 2351, in execute\n    return self._execute_internal(\n           ^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/session.py\", line 2236, in _execute_internal\n    result: Result[Any] = compile_state_cls.orm_execute_statement(\n                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/bulk_persistence.py\", line 1953, in orm_execute_statement\n    return super().orm_execute_statement(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/context.py\", line 293, in orm_execute_statement\n    result = conn.execute(\n             ^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1418, in execute\n    return meth(\n           ^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/sql/elements.py\", line 515, in _execute_on_connection\n    return connection._execute_clauseelement(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1640, in _execute_clauseelement\n    ret = self._execute_context(\n          ^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1846, in _execute_context\n    return self._exec_single_context(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1986, in _exec_single_context\n    self._handle_dbapi_exception(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 2353, in _handle_dbapi_exception\n    raise sqlalchemy_exception.with_traceback(exc_info[2]) from e\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1967, in _exec_single_context\n    self.dialect.do_execute(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/default.py\", line 924, in do_execute\n    cursor.execute(statement, parameters)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 179, in execute\n    res = self._query(mogrified_query)\n          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 330, in _query\n    db.query(q)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/connections.py\", line 261, in query\n    _mysql.connection.query(self, query)\nsqlalchemy.exc.OperationalError: (MySQLdb.OperationalError) (2006, \'Server has gone away\')\n[SQL: DELETE FROM celery_taskmeta WHERE celery_taskmeta.date_done < %s]\n[parameters: (datetime.datetime(2024, 6, 26, 4, 0, 0, 3643, tzinfo=zoneinfo.ZoneInfo(key=\'Asia/Kuala_Lumpur\')),)]\n(Background on this error at: https://sqlalche.me/e/20/e3q8)\n',NULL,NULL,NULL,NULL,NULL,NULL),(1289,'fedc8e06-bdc8-45b9-adad-c9af299c2ab1','SUCCESS',NULL,'2024-06-27 06:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1290,'3c9bd8e7-611e-452b-b95c-473b918468d9','FAILURE',_binary 'Çòì\0\0\0\0\0\0\0}ö(îexc_typeöîOperationalErroröîexc_messageöî9(MySQLdb.OperationalError) (2006, \'Server has gone away\')öàöî\nexc_moduleöîsqlalchemy.excöu.','2024-06-27 20:00:00','Traceback (most recent call last):\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1967, in _exec_single_context\n    self.dialect.do_execute(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/default.py\", line 924, in do_execute\n    cursor.execute(statement, parameters)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 179, in execute\n    res = self._query(mogrified_query)\n          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 330, in _query\n    db.query(q)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/connections.py\", line 261, in query\n    _mysql.connection.query(self, query)\nMySQLdb.OperationalError: (2006, \'Server has gone away\')\n\nThe above exception was the direct cause of the following exception:\n\nTraceback (most recent call last):\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/trace.py\", line 453, in trace_task\n    R = retval = fun(*args, **kwargs)\n                 ^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/trace.py\", line 736, in __protected_call__\n    return self.run(*args, **kwargs)\n           ^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/builtins.py\", line 22, in backend_cleanup\n    app.backend.cleanup()\n  File \"/usr/local/lib/python3.12/site-packages/celery/backends/database/__init__.py\", line 211, in cleanup\n    self.task_cls.date_done < (now - expires)).delete()\n                                               ^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/query.py\", line 3161, in delete\n    result: CursorResult[Any] = self.session.execute(\n                                ^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/session.py\", line 2351, in execute\n    return self._execute_internal(\n           ^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/session.py\", line 2236, in _execute_internal\n    result: Result[Any] = compile_state_cls.orm_execute_statement(\n                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/bulk_persistence.py\", line 1953, in orm_execute_statement\n    return super().orm_execute_statement(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/context.py\", line 293, in orm_execute_statement\n    result = conn.execute(\n             ^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1418, in execute\n    return meth(\n           ^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/sql/elements.py\", line 515, in _execute_on_connection\n    return connection._execute_clauseelement(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1640, in _execute_clauseelement\n    ret = self._execute_context(\n          ^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1846, in _execute_context\n    return self._exec_single_context(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1986, in _exec_single_context\n    self._handle_dbapi_exception(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 2353, in _handle_dbapi_exception\n    raise sqlalchemy_exception.with_traceback(exc_info[2]) from e\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1967, in _exec_single_context\n    self.dialect.do_execute(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/default.py\", line 924, in do_execute\n    cursor.execute(statement, parameters)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 179, in execute\n    res = self._query(mogrified_query)\n          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 330, in _query\n    db.query(q)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/connections.py\", line 261, in query\n    _mysql.connection.query(self, query)\nsqlalchemy.exc.OperationalError: (MySQLdb.OperationalError) (2006, \'Server has gone away\')\n[SQL: DELETE FROM celery_taskmeta WHERE celery_taskmeta.date_done < %s]\n[parameters: (datetime.datetime(2024, 6, 27, 4, 0, 0, 3823, tzinfo=zoneinfo.ZoneInfo(key=\'Asia/Kuala_Lumpur\')),)]\n(Background on this error at: https://sqlalche.me/e/20/e3q8)\n',NULL,NULL,NULL,NULL,NULL,NULL),(1291,'a64bfa97-8a74-4d1c-a52f-2ad4ece85ef5','SUCCESS',NULL,'2024-06-28 06:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1292,'e7a1e3d3-d313-46ba-8c35-6b2ecb5f85f9','FAILURE',_binary 'Çòì\0\0\0\0\0\0\0}ö(îexc_typeöîOperationalErroröîexc_messageöî9(MySQLdb.OperationalError) (2006, \'Server has gone away\')öàöî\nexc_moduleöîsqlalchemy.excöu.','2024-06-28 20:00:00','Traceback (most recent call last):\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1967, in _exec_single_context\n    self.dialect.do_execute(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/default.py\", line 924, in do_execute\n    cursor.execute(statement, parameters)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 179, in execute\n    res = self._query(mogrified_query)\n          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 330, in _query\n    db.query(q)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/connections.py\", line 261, in query\n    _mysql.connection.query(self, query)\nMySQLdb.OperationalError: (2006, \'Server has gone away\')\n\nThe above exception was the direct cause of the following exception:\n\nTraceback (most recent call last):\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/trace.py\", line 453, in trace_task\n    R = retval = fun(*args, **kwargs)\n                 ^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/trace.py\", line 736, in __protected_call__\n    return self.run(*args, **kwargs)\n           ^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/builtins.py\", line 22, in backend_cleanup\n    app.backend.cleanup()\n  File \"/usr/local/lib/python3.12/site-packages/celery/backends/database/__init__.py\", line 211, in cleanup\n    self.task_cls.date_done < (now - expires)).delete()\n                                               ^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/query.py\", line 3161, in delete\n    result: CursorResult[Any] = self.session.execute(\n                                ^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/session.py\", line 2351, in execute\n    return self._execute_internal(\n           ^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/session.py\", line 2236, in _execute_internal\n    result: Result[Any] = compile_state_cls.orm_execute_statement(\n                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/bulk_persistence.py\", line 1953, in orm_execute_statement\n    return super().orm_execute_statement(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/context.py\", line 293, in orm_execute_statement\n    result = conn.execute(\n             ^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1418, in execute\n    return meth(\n           ^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/sql/elements.py\", line 515, in _execute_on_connection\n    return connection._execute_clauseelement(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1640, in _execute_clauseelement\n    ret = self._execute_context(\n          ^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1846, in _execute_context\n    return self._exec_single_context(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1986, in _exec_single_context\n    self._handle_dbapi_exception(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 2353, in _handle_dbapi_exception\n    raise sqlalchemy_exception.with_traceback(exc_info[2]) from e\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1967, in _exec_single_context\n    self.dialect.do_execute(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/default.py\", line 924, in do_execute\n    cursor.execute(statement, parameters)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 179, in execute\n    res = self._query(mogrified_query)\n          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 330, in _query\n    db.query(q)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/connections.py\", line 261, in query\n    _mysql.connection.query(self, query)\nsqlalchemy.exc.OperationalError: (MySQLdb.OperationalError) (2006, \'Server has gone away\')\n[SQL: DELETE FROM celery_taskmeta WHERE celery_taskmeta.date_done < %s]\n[parameters: (datetime.datetime(2024, 6, 28, 4, 0, 0, 4289, tzinfo=zoneinfo.ZoneInfo(key=\'Asia/Kuala_Lumpur\')),)]\n(Background on this error at: https://sqlalche.me/e/20/e3q8)\n',NULL,NULL,NULL,NULL,NULL,NULL),(1293,'f82adb83-5e54-443f-ad90-64fd2c80b6f8','SUCCESS',NULL,'2024-06-29 06:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1294,'0ec2bed7-ae79-4e70-857c-f3d0d8904109','FAILURE',_binary 'Çòì\0\0\0\0\0\0\0}ö(îexc_typeöîOperationalErroröîexc_messageöî9(MySQLdb.OperationalError) (2006, \'Server has gone away\')öàöî\nexc_moduleöîsqlalchemy.excöu.','2024-06-29 20:00:00','Traceback (most recent call last):\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1967, in _exec_single_context\n    self.dialect.do_execute(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/default.py\", line 924, in do_execute\n    cursor.execute(statement, parameters)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 179, in execute\n    res = self._query(mogrified_query)\n          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 330, in _query\n    db.query(q)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/connections.py\", line 261, in query\n    _mysql.connection.query(self, query)\nMySQLdb.OperationalError: (2006, \'Server has gone away\')\n\nThe above exception was the direct cause of the following exception:\n\nTraceback (most recent call last):\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/trace.py\", line 453, in trace_task\n    R = retval = fun(*args, **kwargs)\n                 ^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/trace.py\", line 736, in __protected_call__\n    return self.run(*args, **kwargs)\n           ^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/builtins.py\", line 22, in backend_cleanup\n    app.backend.cleanup()\n  File \"/usr/local/lib/python3.12/site-packages/celery/backends/database/__init__.py\", line 211, in cleanup\n    self.task_cls.date_done < (now - expires)).delete()\n                                               ^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/query.py\", line 3161, in delete\n    result: CursorResult[Any] = self.session.execute(\n                                ^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/session.py\", line 2351, in execute\n    return self._execute_internal(\n           ^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/session.py\", line 2236, in _execute_internal\n    result: Result[Any] = compile_state_cls.orm_execute_statement(\n                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/bulk_persistence.py\", line 1953, in orm_execute_statement\n    return super().orm_execute_statement(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/context.py\", line 293, in orm_execute_statement\n    result = conn.execute(\n             ^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1418, in execute\n    return meth(\n           ^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/sql/elements.py\", line 515, in _execute_on_connection\n    return connection._execute_clauseelement(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1640, in _execute_clauseelement\n    ret = self._execute_context(\n          ^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1846, in _execute_context\n    return self._exec_single_context(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1986, in _exec_single_context\n    self._handle_dbapi_exception(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 2353, in _handle_dbapi_exception\n    raise sqlalchemy_exception.with_traceback(exc_info[2]) from e\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1967, in _exec_single_context\n    self.dialect.do_execute(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/default.py\", line 924, in do_execute\n    cursor.execute(statement, parameters)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 179, in execute\n    res = self._query(mogrified_query)\n          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 330, in _query\n    db.query(q)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/connections.py\", line 261, in query\n    _mysql.connection.query(self, query)\nsqlalchemy.exc.OperationalError: (MySQLdb.OperationalError) (2006, \'Server has gone away\')\n[SQL: DELETE FROM celery_taskmeta WHERE celery_taskmeta.date_done < %s]\n[parameters: (datetime.datetime(2024, 6, 29, 4, 0, 0, 3518, tzinfo=zoneinfo.ZoneInfo(key=\'Asia/Kuala_Lumpur\')),)]\n(Background on this error at: https://sqlalche.me/e/20/e3q8)\n',NULL,NULL,NULL,NULL,NULL,NULL),(1295,'6df6a2e6-4443-41c4-bf73-791c3b1f27a4','SUCCESS',NULL,'2024-06-30 08:24:36',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1296,'89dba39e-79ad-49d4-aed1-60ea7eaa7212','FAILURE',_binary 'Çòì\0\0\0\0\0\0\0}ö(îexc_typeöîOperationalErroröîexc_messageöî9(MySQLdb.OperationalError) (2006, \'Server has gone away\')öàöî\nexc_moduleöîsqlalchemy.excöu.','2024-06-30 20:00:00','Traceback (most recent call last):\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1967, in _exec_single_context\n    self.dialect.do_execute(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/default.py\", line 924, in do_execute\n    cursor.execute(statement, parameters)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 179, in execute\n    res = self._query(mogrified_query)\n          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 330, in _query\n    db.query(q)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/connections.py\", line 261, in query\n    _mysql.connection.query(self, query)\nMySQLdb.OperationalError: (2006, \'Server has gone away\')\n\nThe above exception was the direct cause of the following exception:\n\nTraceback (most recent call last):\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/trace.py\", line 453, in trace_task\n    R = retval = fun(*args, **kwargs)\n                 ^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/trace.py\", line 736, in __protected_call__\n    return self.run(*args, **kwargs)\n           ^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/builtins.py\", line 22, in backend_cleanup\n    app.backend.cleanup()\n  File \"/usr/local/lib/python3.12/site-packages/celery/backends/database/__init__.py\", line 211, in cleanup\n    self.task_cls.date_done < (now - expires)).delete()\n                                               ^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/query.py\", line 3161, in delete\n    result: CursorResult[Any] = self.session.execute(\n                                ^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/session.py\", line 2351, in execute\n    return self._execute_internal(\n           ^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/session.py\", line 2236, in _execute_internal\n    result: Result[Any] = compile_state_cls.orm_execute_statement(\n                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/bulk_persistence.py\", line 1953, in orm_execute_statement\n    return super().orm_execute_statement(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/context.py\", line 293, in orm_execute_statement\n    result = conn.execute(\n             ^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1418, in execute\n    return meth(\n           ^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/sql/elements.py\", line 515, in _execute_on_connection\n    return connection._execute_clauseelement(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1640, in _execute_clauseelement\n    ret = self._execute_context(\n          ^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1846, in _execute_context\n    return self._exec_single_context(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1986, in _exec_single_context\n    self._handle_dbapi_exception(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 2353, in _handle_dbapi_exception\n    raise sqlalchemy_exception.with_traceback(exc_info[2]) from e\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1967, in _exec_single_context\n    self.dialect.do_execute(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/default.py\", line 924, in do_execute\n    cursor.execute(statement, parameters)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 179, in execute\n    res = self._query(mogrified_query)\n          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 330, in _query\n    db.query(q)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/connections.py\", line 261, in query\n    _mysql.connection.query(self, query)\nsqlalchemy.exc.OperationalError: (MySQLdb.OperationalError) (2006, \'Server has gone away\')\n[SQL: DELETE FROM celery_taskmeta WHERE celery_taskmeta.date_done < %s]\n[parameters: (datetime.datetime(2024, 6, 30, 4, 0, 0, 3369, tzinfo=zoneinfo.ZoneInfo(key=\'Asia/Kuala_Lumpur\')),)]\n(Background on this error at: https://sqlalche.me/e/20/e3q8)\n',NULL,NULL,NULL,NULL,NULL,NULL),(1297,'f4ee8364-0307-4eee-8f79-a88ad76864e2','SUCCESS',NULL,'2024-07-01 06:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1298,'51f4bf71-5613-4de7-897f-b1a9fb3f495b','FAILURE',_binary 'Çòì\0\0\0\0\0\0\0}ö(îexc_typeöîOperationalErroröîexc_messageöî9(MySQLdb.OperationalError) (2006, \'Server has gone away\')öàöî\nexc_moduleöîsqlalchemy.excöu.','2024-07-01 20:00:00','Traceback (most recent call last):\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1967, in _exec_single_context\n    self.dialect.do_execute(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/default.py\", line 924, in do_execute\n    cursor.execute(statement, parameters)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 179, in execute\n    res = self._query(mogrified_query)\n          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 330, in _query\n    db.query(q)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/connections.py\", line 261, in query\n    _mysql.connection.query(self, query)\nMySQLdb.OperationalError: (2006, \'Server has gone away\')\n\nThe above exception was the direct cause of the following exception:\n\nTraceback (most recent call last):\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/trace.py\", line 453, in trace_task\n    R = retval = fun(*args, **kwargs)\n                 ^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/trace.py\", line 736, in __protected_call__\n    return self.run(*args, **kwargs)\n           ^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/celery/app/builtins.py\", line 22, in backend_cleanup\n    app.backend.cleanup()\n  File \"/usr/local/lib/python3.12/site-packages/celery/backends/database/__init__.py\", line 211, in cleanup\n    self.task_cls.date_done < (now - expires)).delete()\n                                               ^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/query.py\", line 3161, in delete\n    result: CursorResult[Any] = self.session.execute(\n                                ^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/session.py\", line 2351, in execute\n    return self._execute_internal(\n           ^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/session.py\", line 2236, in _execute_internal\n    result: Result[Any] = compile_state_cls.orm_execute_statement(\n                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/bulk_persistence.py\", line 1953, in orm_execute_statement\n    return super().orm_execute_statement(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/context.py\", line 293, in orm_execute_statement\n    result = conn.execute(\n             ^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1418, in execute\n    return meth(\n           ^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/sql/elements.py\", line 515, in _execute_on_connection\n    return connection._execute_clauseelement(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1640, in _execute_clauseelement\n    ret = self._execute_context(\n          ^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1846, in _execute_context\n    return self._exec_single_context(\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1986, in _exec_single_context\n    self._handle_dbapi_exception(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 2353, in _handle_dbapi_exception\n    raise sqlalchemy_exception.with_traceback(exc_info[2]) from e\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/base.py\", line 1967, in _exec_single_context\n    self.dialect.do_execute(\n  File \"/usr/local/lib/python3.12/site-packages/sqlalchemy/engine/default.py\", line 924, in do_execute\n    cursor.execute(statement, parameters)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 179, in execute\n    res = self._query(mogrified_query)\n          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/cursors.py\", line 330, in _query\n    db.query(q)\n  File \"/usr/local/lib/python3.12/site-packages/MySQLdb/connections.py\", line 261, in query\n    _mysql.connection.query(self, query)\nsqlalchemy.exc.OperationalError: (MySQLdb.OperationalError) (2006, \'Server has gone away\')\n[SQL: DELETE FROM celery_taskmeta WHERE celery_taskmeta.date_done < %s]\n[parameters: (datetime.datetime(2024, 7, 1, 4, 0, 0, 3975, tzinfo=zoneinfo.ZoneInfo(key=\'Asia/Kuala_Lumpur\')),)]\n(Background on this error at: https://sqlalche.me/e/20/e3q8)\n',NULL,NULL,NULL,NULL,NULL,NULL),(1299,'0ad63eed-c609-4bdc-a55e-e9c6e49def4e','SUCCESS',NULL,'2024-07-02 06:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1300,'85e34c98-6503-40ec-899d-9180ff661010','SUCCESS',NULL,'2024-07-14 12:19:34',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1301,'6039b415-0c96-4f23-bba2-b3277f2953ce','SUCCESS',NULL,'2024-07-14 12:19:34',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1302,'894911de-7a6c-4a25-8203-c8aa1b5a36bb','SUCCESS',NULL,'2024-07-14 12:19:34',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1303,'9ba94bca-9c6e-4634-ba4d-0378fcbc03c9','SUCCESS',NULL,'2024-07-14 12:19:34',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1304,'f5ae2c57-2af2-4716-adbd-ae0eed0c1fca','SUCCESS',NULL,'2024-07-14 12:19:34',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `celery_taskmeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `celery_tasksetmeta`
--

DROP TABLE IF EXISTS `celery_tasksetmeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `celery_tasksetmeta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `taskset_id` varchar(155) DEFAULT NULL,
  `result` blob,
  `date_done` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `taskset_id` (`taskset_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `celery_tasksetmeta`
--

LOCK TABLES `celery_tasksetmeta` WRITE;
/*!40000 ALTER TABLE `celery_tasksetmeta` DISABLE KEYS */;
/*!40000 ALTER TABLE `celery_tasksetmeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` char(32) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_app_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_app_user_id` FOREIGN KEY (`user_id`) REFERENCES `app_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_celery_beat_clockedschedule`
--

DROP TABLE IF EXISTS `django_celery_beat_clockedschedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_celery_beat_clockedschedule` (
  `id` int NOT NULL AUTO_INCREMENT,
  `clocked_time` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_celery_beat_clockedschedule`
--

LOCK TABLES `django_celery_beat_clockedschedule` WRITE;
/*!40000 ALTER TABLE `django_celery_beat_clockedschedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_celery_beat_clockedschedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_celery_beat_crontabschedule`
--

DROP TABLE IF EXISTS `django_celery_beat_crontabschedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_celery_beat_crontabschedule` (
  `id` int NOT NULL AUTO_INCREMENT,
  `minute` varchar(240) NOT NULL,
  `hour` varchar(96) NOT NULL,
  `day_of_week` varchar(64) NOT NULL,
  `day_of_month` varchar(124) NOT NULL,
  `month_of_year` varchar(64) NOT NULL,
  `timezone` varchar(63) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_celery_beat_crontabschedule`
--

LOCK TABLES `django_celery_beat_crontabschedule` WRITE;
/*!40000 ALTER TABLE `django_celery_beat_crontabschedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_celery_beat_crontabschedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_celery_beat_intervalschedule`
--

DROP TABLE IF EXISTS `django_celery_beat_intervalschedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_celery_beat_intervalschedule` (
  `id` int NOT NULL AUTO_INCREMENT,
  `every` int NOT NULL,
  `period` varchar(24) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_celery_beat_intervalschedule`
--

LOCK TABLES `django_celery_beat_intervalschedule` WRITE;
/*!40000 ALTER TABLE `django_celery_beat_intervalschedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_celery_beat_intervalschedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_celery_beat_periodictask`
--

DROP TABLE IF EXISTS `django_celery_beat_periodictask`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_celery_beat_periodictask` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `task` varchar(200) NOT NULL,
  `args` longtext NOT NULL,
  `kwargs` longtext NOT NULL,
  `queue` varchar(200) DEFAULT NULL,
  `exchange` varchar(200) DEFAULT NULL,
  `routing_key` varchar(200) DEFAULT NULL,
  `expires` datetime(6) DEFAULT NULL,
  `enabled` tinyint(1) NOT NULL,
  `last_run_at` datetime(6) DEFAULT NULL,
  `total_run_count` int unsigned NOT NULL,
  `date_changed` datetime(6) NOT NULL,
  `description` longtext NOT NULL,
  `crontab_id` int DEFAULT NULL,
  `interval_id` int DEFAULT NULL,
  `solar_id` int DEFAULT NULL,
  `one_off` tinyint(1) NOT NULL,
  `start_time` datetime(6) DEFAULT NULL,
  `priority` int unsigned DEFAULT NULL,
  `headers` longtext NOT NULL DEFAULT (_utf8mb3'{}'),
  `clocked_id` int DEFAULT NULL,
  `expire_seconds` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `django_celery_beat_p_crontab_id_d3cba168_fk_django_ce` (`crontab_id`),
  KEY `django_celery_beat_p_interval_id_a8ca27da_fk_django_ce` (`interval_id`),
  KEY `django_celery_beat_p_solar_id_a87ce72c_fk_django_ce` (`solar_id`),
  KEY `django_celery_beat_p_clocked_id_47a69f82_fk_django_ce` (`clocked_id`),
  CONSTRAINT `django_celery_beat_p_clocked_id_47a69f82_fk_django_ce` FOREIGN KEY (`clocked_id`) REFERENCES `django_celery_beat_clockedschedule` (`id`),
  CONSTRAINT `django_celery_beat_p_crontab_id_d3cba168_fk_django_ce` FOREIGN KEY (`crontab_id`) REFERENCES `django_celery_beat_crontabschedule` (`id`),
  CONSTRAINT `django_celery_beat_p_interval_id_a8ca27da_fk_django_ce` FOREIGN KEY (`interval_id`) REFERENCES `django_celery_beat_intervalschedule` (`id`),
  CONSTRAINT `django_celery_beat_p_solar_id_a87ce72c_fk_django_ce` FOREIGN KEY (`solar_id`) REFERENCES `django_celery_beat_solarschedule` (`id`),
  CONSTRAINT `django_celery_beat_periodictask_chk_1` CHECK ((`total_run_count` >= 0)),
  CONSTRAINT `django_celery_beat_periodictask_chk_2` CHECK ((`priority` >= 0)),
  CONSTRAINT `django_celery_beat_periodictask_chk_3` CHECK ((`expire_seconds` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_celery_beat_periodictask`
--

LOCK TABLES `django_celery_beat_periodictask` WRITE;
/*!40000 ALTER TABLE `django_celery_beat_periodictask` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_celery_beat_periodictask` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_celery_beat_periodictasks`
--

DROP TABLE IF EXISTS `django_celery_beat_periodictasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_celery_beat_periodictasks` (
  `ident` smallint NOT NULL,
  `last_update` datetime(6) NOT NULL,
  PRIMARY KEY (`ident`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_celery_beat_periodictasks`
--

LOCK TABLES `django_celery_beat_periodictasks` WRITE;
/*!40000 ALTER TABLE `django_celery_beat_periodictasks` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_celery_beat_periodictasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_celery_beat_solarschedule`
--

DROP TABLE IF EXISTS `django_celery_beat_solarschedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_celery_beat_solarschedule` (
  `id` int NOT NULL AUTO_INCREMENT,
  `event` varchar(24) NOT NULL,
  `latitude` decimal(9,6) NOT NULL,
  `longitude` decimal(9,6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_celery_beat_solar_event_latitude_longitude_ba64999a_uniq` (`event`,`latitude`,`longitude`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_celery_beat_solarschedule`
--

LOCK TABLES `django_celery_beat_solarschedule` WRITE;
/*!40000 ALTER TABLE `django_celery_beat_solarschedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_celery_beat_solarschedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(10,'app','company'),(11,'app','conversation'),(7,'app','country'),(12,'app','customer'),(13,'app','debt'),(14,'app','debtbacklog'),(15,'app','session'),(9,'app','user'),(8,'app','webhook'),(19,'app','whatsappcompanyprofile'),(18,'app','whatsappmessage'),(16,'app','whatsapptemplate'),(17,'app','whatsappuser'),(3,'auth','group'),(2,'auth','permission'),(20,'authtoken','token'),(21,'authtoken','tokenproxy'),(4,'contenttypes','contenttype'),(27,'django_celery_beat','clockedschedule'),(22,'django_celery_beat','crontabschedule'),(23,'django_celery_beat','intervalschedule'),(24,'django_celery_beat','periodictask'),(25,'django_celery_beat','periodictasks'),(26,'django_celery_beat','solarschedule'),(5,'sessions','session'),(6,'sites','site');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2024-06-10 08:43:23.137521'),(2,'contenttypes','0002_remove_content_type_name','2024-06-10 08:43:23.249203'),(3,'auth','0001_initial','2024-06-10 08:43:23.630745'),(4,'auth','0002_alter_permission_name_max_length','2024-06-10 08:43:23.713354'),(5,'auth','0003_alter_user_email_max_length','2024-06-10 08:43:23.723124'),(6,'auth','0004_alter_user_username_opts','2024-06-10 08:43:23.736165'),(7,'auth','0005_alter_user_last_login_null','2024-06-10 08:43:23.743431'),(8,'auth','0006_require_contenttypes_0002','2024-06-10 08:43:23.752761'),(9,'auth','0007_alter_validators_add_error_messages','2024-06-10 08:43:23.772138'),(10,'auth','0008_alter_user_username_max_length','2024-06-10 08:43:23.779492'),(11,'auth','0009_alter_user_last_name_max_length','2024-06-10 08:43:23.786144'),(12,'auth','0010_alter_group_name_max_length','2024-06-10 08:43:23.833355'),(13,'auth','0011_update_proxy_permissions','2024-06-10 08:43:23.843380'),(14,'auth','0012_alter_user_first_name_max_length','2024-06-10 08:43:23.852323'),(15,'app','0001_initial','2024-06-10 08:43:27.920156'),(16,'admin','0001_initial','2024-06-10 08:43:28.147335'),(17,'admin','0002_logentry_remove_auto_add','2024-06-10 08:43:28.164872'),(18,'admin','0003_logentry_add_action_flag_choices','2024-06-10 08:43:28.181271'),(19,'app','0002_alter_company_meta_access_token','2024-06-10 08:43:28.350393'),(20,'app','0003_alter_session_company_alter_session_complete_date','2024-06-10 08:43:28.593699'),(21,'app','0004_session_payload','2024-06-10 08:43:28.737155'),(22,'app','0005_alter_session_payload','2024-06-10 08:43:28.853316'),(23,'app','0006_session_status_code','2024-06-10 08:43:28.911971'),(24,'app','0007_session_whatsapp_message_id','2024-06-10 08:43:28.956139'),(25,'app','0008_remove_whatsappphonenumber_display_phone_number_and_more','2024-06-10 08:43:29.248508'),(26,'app','0009_rename_whatsappphonenumber_whatsappcompanyprofile_and_more','2024-06-10 08:43:29.725695'),(27,'app','0010_remove_whatsappuser_company_and_more','2024-06-10 08:43:30.154020'),(28,'app','0011_whatsappcompanyprofile_whatsapp_id','2024-06-10 08:43:30.255158'),(29,'app','0012_alter_whatsappcompanyprofile_about_and_more','2024-06-10 08:43:30.507451'),(30,'app','0013_alter_whatsappuser_company_profile','2024-06-10 08:43:30.718364'),(31,'app','0014_alter_whatsappcompanyprofile_company','2024-06-10 08:43:30.742053'),(32,'app','0015_whatsappuser_company','2024-06-10 08:43:30.840028'),(33,'app','0016_alter_whatsappuser_company_and_more','2024-06-10 08:43:30.883394'),(34,'app','0017_whatsappmessage_footer_whatsappmessage_header_and_more','2024-06-10 08:43:31.116573'),(35,'app','0018_alter_debt_status','2024-06-10 08:43:31.137569'),(36,'app','0019_rename_due_date_debt_invoice_date','2024-06-10 08:43:31.189141'),(37,'app','0020_debt_term','2024-06-10 08:43:31.233179'),(38,'app','0021_remove_session_event_type_remove_session_payload_and_more','2024-06-10 08:43:31.636469'),(39,'app','0022_session_event_type','2024-06-10 08:43:31.694745'),(40,'app','0023_rename_complete_date_session_completed_date_and_more','2024-06-10 08:43:32.274375'),(41,'app','0024_session_change_info','2024-06-10 08:43:32.358637'),(42,'app','0025_alter_session_scheduled_date','2024-06-10 08:43:32.531402'),(43,'app','0026_debt_due_date','2024-06-10 08:43:32.683242'),(44,'app','0027_country_phone_code_alter_debt_status','2024-06-10 08:43:32.809010'),(45,'app','0028_alter_debt_options','2024-06-10 08:43:32.830982'),(46,'app','0029_alter_debt_options','2024-06-10 08:43:32.852659'),(47,'app','0030_alter_debt_status','2024-06-10 08:43:32.874798'),(48,'authtoken','0001_initial','2024-06-10 08:43:33.011203'),(49,'authtoken','0002_auto_20160226_1747','2024-06-10 08:43:33.071640'),(50,'authtoken','0003_tokenproxy','2024-06-10 08:43:33.075568'),(51,'authtoken','0004_alter_tokenproxy_options','2024-06-10 08:43:33.082195'),(52,'django_celery_beat','0001_initial','2024-06-10 08:43:33.406447'),(53,'django_celery_beat','0002_auto_20161118_0346','2024-06-10 08:43:33.600243'),(54,'django_celery_beat','0003_auto_20161209_0049','2024-06-10 08:43:33.637374'),(55,'django_celery_beat','0004_auto_20170221_0000','2024-06-10 08:43:33.644164'),(56,'django_celery_beat','0005_add_solarschedule_events_choices','2024-06-10 08:43:33.649908'),(57,'django_celery_beat','0006_auto_20180322_0932','2024-06-10 08:43:33.843470'),(58,'django_celery_beat','0007_auto_20180521_0826','2024-06-10 08:43:33.971558'),(59,'django_celery_beat','0008_auto_20180914_1922','2024-06-10 08:43:34.002186'),(60,'django_celery_beat','0006_auto_20180210_1226','2024-06-10 08:43:34.024879'),(61,'django_celery_beat','0006_periodictask_priority','2024-06-10 08:43:34.154472'),(62,'django_celery_beat','0009_periodictask_headers','2024-06-10 08:43:34.297039'),(63,'django_celery_beat','0010_auto_20190429_0326','2024-06-10 08:43:34.532147'),(64,'django_celery_beat','0011_auto_20190508_0153','2024-06-10 08:43:34.699041'),(65,'django_celery_beat','0012_periodictask_expire_seconds','2024-06-10 08:43:34.840454'),(66,'django_celery_beat','0013_auto_20200609_0727','2024-06-10 08:43:34.855278'),(67,'django_celery_beat','0014_remove_clockedschedule_enabled','2024-06-10 08:43:34.888925'),(68,'django_celery_beat','0015_edit_solarschedule_events_choices','2024-06-10 08:43:34.896031'),(69,'django_celery_beat','0016_alter_crontabschedule_timezone','2024-06-10 08:43:34.904961'),(70,'django_celery_beat','0017_alter_crontabschedule_month_of_year','2024-06-10 08:43:34.915813'),(71,'django_celery_beat','0018_improve_crontab_helptext','2024-06-10 08:43:34.924063'),(72,'sessions','0001_initial','2024-06-10 08:43:34.986527'),(73,'sites','0001_initial','2024-06-10 08:43:35.026655'),(74,'sites','0002_alter_domain_unique','2024-06-10 08:43:35.054038'),(75,'app','0031_alter_customer_email','2024-06-12 03:00:27.532978'),(76,'app','0032_company_bukku_access_token_company_bukku_api_and_more','2024-10-10 11:27:35.862060'),(77,'app','0033_company_bukku_last_sync_time','2024-10-10 11:27:35.968390'),(78,'app','0034_company_default_country','2024-10-10 11:27:36.215037'),(79,'app','0035_alter_company_default_country','2024-10-10 11:27:36.308402'),(80,'app','0036_customer_accounting_id_debt_accounting_id','2024-10-10 11:27:36.434298'),(81,'app','0037_debt_bukku_updated_at','2024-10-10 11:27:36.560641'),(82,'app','0038_debt_bukku_is_voided','2024-10-10 11:27:36.677484'),(83,'app','0039_alter_debt_bukku_updated_at','2024-10-10 11:27:36.892218'),(84,'app','0040_alter_debt_bukku_updated_at','2024-10-10 11:27:36.932250');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('2ao3oh1dozhryl91yhxae480339k4te5','eyJjb21wYW55X2lkIjoyfQ:1sLczp:Bg1mvHnjOegjIuYsfGM6tmicVMKfieYWpEiam6RhJPU','2024-07-08 06:16:09.468011'),('kiwkcbiabsd9fwfg7plpevt07va2c1cs','eyJjb21wYW55X2lkIjoyfQ:1sNpZA:NdlhCIRArt-x6y5i8JV7oKaYzcE4oKD0_xSvyrIuRqs','2024-07-14 08:05:44.951393'),('knpbawoyf4d927iu29vjqmkqh03f4mpf','eyJjb21wYW55X2lkIjoxfQ:1sH0P5:r3LEPnxQB5GXK_WKxeMz4u5pTKXIZtdd-c98S21wgTo','2024-06-25 12:15:07.578996');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_site`
--

DROP TABLE IF EXISTS `django_site`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_site` (
  `id` int NOT NULL AUTO_INCREMENT,
  `domain` varchar(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_site_domain_a2e37b91_uniq` (`domain`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_site`
--

LOCK TABLES `django_site` WRITE;
/*!40000 ALTER TABLE `django_site` DISABLE KEYS */;
INSERT INTO `django_site` VALUES (1,'example.com','example.com');
/*!40000 ALTER TABLE `django_site` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-10 22:13:57
