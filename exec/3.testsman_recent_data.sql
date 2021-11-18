-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: k5d202.p.ssafy.io    Database: testman
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `collection`
--

DROP TABLE IF EXISTS `collection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `collection` (
  `seq` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_0900_as_cs DEFAULT NULL,
  `workspace_seq` bigint DEFAULT NULL,
  PRIMARY KEY (`seq`),
  KEY `collection_workspace_seq` (`workspace_seq`),
  CONSTRAINT `collection_workspace_seq` FOREIGN KEY (`workspace_seq`) REFERENCES `workspace` (`seq`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collection`
--

LOCK TABLES `collection` WRITE;
/*!40000 ALTER TABLE `collection` DISABLE KEYS */;
/*!40000 ALTER TABLE `collection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tab`
--

DROP TABLE IF EXISTS `tab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tab` (
  `seq` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(255) COLLATE utf8mb4_0900_as_cs DEFAULT NULL,
  `body` varchar(255) COLLATE utf8mb4_0900_as_cs DEFAULT NULL,
  `collection_seq` bigint DEFAULT NULL,
  `headers` varchar(255) COLLATE utf8mb4_0900_as_cs DEFAULT NULL,
  `http_method` varchar(255) COLLATE utf8mb4_0900_as_cs DEFAULT NULL,
  `path` varchar(255) COLLATE utf8mb4_0900_as_cs DEFAULT NULL,
  `workspace_seq` bigint DEFAULT NULL,
  PRIMARY KEY (`seq`),
  KEY `tab_workspace_seq` (`workspace_seq`),
  KEY `tab_collection_seq` (`collection_seq`),
  CONSTRAINT `tab_collection_seq` FOREIGN KEY (`collection_seq`) REFERENCES `collection` (`seq`) ON DELETE CASCADE,
  CONSTRAINT `tab_workspace_seq` FOREIGN KEY (`workspace_seq`) REFERENCES `workspace` (`seq`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tab`
--

LOCK TABLES `tab` WRITE;
/*!40000 ALTER TABLE `tab` DISABLE KEYS */;
INSERT INTO `tab` VALUES (1,'http://www.testsman.com:8080','{\"abcde\":\"abcde\"}',NULL,'{\"Authorization\":\"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0MTIzNCIsImlzcyI6InNzYWZ5LmNvbSIsImV4cCI6MTYzNzQ4NDI2NCwiaWF0IjoxNjM2MTg4MjY0fQ.g6QUdtVIN5Ca_xrW2PkF0Yir-FpKSjaC7Kuy1Q0eu8WO1h8y2yguSmlYcsw7AcU0I8q35t7tX3giAG9Oe1LkRQ\"}','GET','/api/',1),(4,'http://www.testsman.com:8080','{\"password\":\"aa12345!\",\"userId\":\"testt\"}',NULL,'{\"Content-Type\":\"multipart/form-data\"}','POST','/api/users/login',1),(5,'http://www.testsman.com:8080','{\"password\":\"aa12345!\",\"userId\":\"testt\"}',NULL,'{\"Content-Type\":\"multipart/form-data\"}','POST','/api/users/login',1),(6,NULL,NULL,NULL,NULL,NULL,NULL,3),(7,NULL,NULL,NULL,NULL,NULL,NULL,5),(11,NULL,NULL,NULL,NULL,NULL,NULL,6),(14,NULL,NULL,NULL,NULL,NULL,NULL,8),(19,'http://localhost:8080','{\"userId\":\"heung\",\"password\":\"wkqxld12!\"}',NULL,'{\"Content-Type\":\"application/json\"}','POST','/api/users/login',2),(20,NULL,NULL,NULL,NULL,NULL,NULL,11),(32,'http://15.165.250.204:8080','{\"password\":\"aa12345!\",\"userId\":\"testt\"}',NULL,'{\"Content-Type\":\"application/json\"}','POST','/api/users/login',8),(33,NULL,NULL,NULL,NULL,NULL,NULL,1),(34,NULL,NULL,NULL,NULL,NULL,NULL,6),(36,NULL,NULL,NULL,NULL,NULL,NULL,7),(38,'http://www.testsman.com:8080','{\"password\":\"aa12345!\",\"userId\":\"testt\"}',NULL,'{\"Content-Type\":\"application/json\"}','POST','/api/users/login',7),(39,NULL,NULL,NULL,NULL,NULL,NULL,10),(56,'http://localhost:8080','{\"password\":\"wkqxld12!\",\"userId\":\"heung\"}',NULL,'{\"Content-Type\":\"application/json\"}','POST','/api/users/login',27),(57,'http://15.165.250.204:8080','{\"password\":\"aa12345!\",\"userId\":\"testt\"}',NULL,'{\"Authorization\":\"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0dCIsImlzcyI6InNzYWZ5LmNvbSIsImV4cCI6MTYzODUxNDQxNywiaWF0IjoxNjM3MjE4NDE3fQ.dhyW0SSLYoEmo1LC_FvNkBn02_slK7noumNUL6siqiRhoyIKk4PHmUaQPWFAwI2DPAhmup4O-IHU7I__ClsMCQ\"}','GET','/api/users',8),(58,'http://localhost:8080','{\"userId\":\"ssafy\",\"password\":\"qwer!123\"}',NULL,'{\"Content-Type\":\"application/json\"}','POST','/api/users/login',31),(59,NULL,NULL,NULL,NULL,NULL,NULL,31),(61,NULL,NULL,NULL,NULL,NULL,NULL,8),(62,NULL,NULL,NULL,NULL,NULL,NULL,3);
/*!40000 ALTER TABLE `tab` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `seq` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8mb4_0900_as_cs DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_0900_as_cs DEFAULT NULL,
  `user_id` varchar(255) COLLATE utf8mb4_0900_as_cs DEFAULT NULL,
  PRIMARY KEY (`seq`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'test@test.com','$2a$10$MopWtic0a/svKIYAmvieb.De1/ukEjpOBpaHYU.s3YitOeYP/lJwm','testt'),(2,'test@gmail.com','$2a$10$QfVtst8l3aTkDrFkk1F.COowHgfFCuGZV/M32WtZdn8Q4gLvuAU7a','jinho'),(3,'ssafy@ssafy.com','$2a$10$asa4rT8KN2YyE6h/YBDlU.U/baX2LakP4I6L9KFecJBrueLWCgE3u','ssafytest'),(5,'wlsgmd1535@naver.com','$2a$10$3pOHoDHFUz0EBEwroJyhAeNfzwmVvkhgjpChuM134vyLm512so3ua','heung'),(6,'knh@naver.com','$2a$10$IIMHMFJmIOBPULTMudsmw.bjCgT0uenZnbJ9dcIPQJGLRH4CE5SSO','knh123'),(7,'test@test.com','$2a$10$W09iTJfihYlJP8BCArTBYu0nMwnjuPgMvfzot9N52H40quloXa3WO','test123'),(8,'ssafy@naver.com','$2a$10$bE4t029jjeTzC.h7JEaDOOvXqg7RK9Qh2Rqq20.tbtyymn5fLCoR6','ssafy');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workspace`
--

DROP TABLE IF EXISTS `workspace`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workspace` (
  `seq` bigint NOT NULL AUTO_INCREMENT,
  `create_date` datetime(6) DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_0900_as_cs DEFAULT NULL,
  `img_name` varchar(255) COLLATE utf8mb4_0900_as_cs DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_0900_as_cs DEFAULT NULL,
  `url` varchar(255) COLLATE utf8mb4_0900_as_cs DEFAULT NULL,
  `user_seq` bigint DEFAULT NULL,
  PRIMARY KEY (`seq`),
  KEY `FK4115noymyraiq24rlv9jvdlqx` (`user_seq`),
  CONSTRAINT `FK4115noymyraiq24rlv9jvdlqx` FOREIGN KEY (`user_seq`) REFERENCES `user` (`seq`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workspace`
--

LOCK TABLES `workspace` WRITE;
/*!40000 ALTER TABLE `workspace` DISABLE KEYS */;
INSERT INTO `workspace` VALUES (1,'2021-11-17 21:54:40.111000','테스트','test_스크린샷 2021-11-06 오후 6.01.54.png','test','http://www.testsman.com:8080',1),(2,'2021-11-18 02:05:23.480000','','asdf_algorithm.png','asdf','testsman.com:8080',2),(3,'2021-11-18 06:12:21.133000','adsf','testdf_스크린샷 2021-11-06 오후 6.01.54.png','testdf','a@a.net',1),(4,'2021-11-18 06:12:34.130000','adfadfdaf','asdfasdf_스크린샷 2021-11-06 오후 6.01.54.png','asdfasdf','asdfafdadfd',1),(5,'2021-11-18 07:30:39.691000','adfdafadfdfadfad','adfadfa_스크린샷 2021-11-06 오후 6.07.38.png','adfadfa','dfadfafdfadf',1),(6,'2021-11-18 09:11:24.213000','asdasd','asd_Forest_Mountains_Snow_Lake_2020_Nature_Scenery_Photo_1366x768.jpg','asd','asdasdasd',1),(7,'2021-11-18 09:36:47.313000','테스트맨','testtt_50698cb264108547d75ec3b74b88f459919b7b03c20cef6d891e893cb35b060c.mp4.gif','testtt','http://www.testsman.com:8080',1),(8,'2021-11-18 09:46:57.226000','ㅇㅇ','가즈앗_fisherman.jpg','가즈앗','http://15.165.250.204:8080',1),(10,'2021-11-18 10:13:23.229000','테스트맨입니당 ~!~!','테스트맨_img.jpg','테스트맨','http://www.testsman.com:8080',5),(11,'2021-11-18 10:34:21.254000','d','d_algorithm.png','d','http://15.165.250.204:8080',2),(26,'2021-11-18 14:54:06.501000','자율프로젝트','addssafy_99559F435DEEDFCB1D.png','addssafy','https://k5d204.p.ssafy.io/',7),(27,'2021-11-18 14:54:33.876000','내 로컬 서버 양','내 로컬 서버 !_soo.png','내 로컬 서버 !','http://localhost:8080',5),(29,'2021-11-18 15:23:06.939000','네이버 내가 만들었어','공통프로젝트_soo.png','공통프로젝트','https://www.naver.com',6),(30,'2021-11-18 15:24:31.727000','특화 프로젝트 열심히하자','특화프로젝트_3D056E1A-9BB0-40C8-9046-9EB7B48E98E3-323-0000003CDE7A5723_file.jpg','특화프로젝트','http://localhost:8080',6),(31,'2021-11-18 15:25:06.801000','API 종합 테스트 서비스','자율프로젝트_Image Pasted at 2021-11-18 15-24.png','자율프로젝트','http://localhost:8080',6);
/*!40000 ALTER TABLE `workspace` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-18 16:37:30
