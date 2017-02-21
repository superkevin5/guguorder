/*
Navicat MySQL Data Transfer

Source Server         : guguorder
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : guguorder

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2017-02-22 00:29:13
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address` (
  `addressId` char(38) NOT NULL,
  `country` varchar(30) DEFAULT NULL,
  `state` varchar(10) DEFAULT NULL,
  `suburb` varchar(255) DEFAULT NULL,
  `postcode` varchar(10) DEFAULT NULL,
  `streetName` varchar(255) DEFAULT NULL,
  `unitNumber` int(10) DEFAULT NULL,
  PRIMARY KEY (`addressId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of address
-- ----------------------------
INSERT INTO `address` VALUES ('1', 'Australia', 'NSW', 'WATERLOO', '2017', 'SOUTHDOWLING ST', '811');

-- ----------------------------
-- Table structure for dish
-- ----------------------------
DROP TABLE IF EXISTS `dish`;
CREATE TABLE `dish` (
  `dishId` char(38) NOT NULL,
  `popularity` int(5) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `dishTitle` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`dishId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dish
-- ----------------------------
INSERT INTO `dish` VALUES ('1', '1', 'fSweet and sour pork has a bright orange-red color, and a delicious sweet and sour taste.', 'Sweet and Sour Pork');
INSERT INTO `dish` VALUES ('2', '2', 'This is a famous Sichuan-style specialty, popular with both Chinese and foreigners. The major ingredients are diced chicken, dried chili, and fried peanuts.', 'Gong Bao Chicken');
INSERT INTO `dish` VALUES ('3', '2', 'Ma po tofu is one of the most famous dishes in Chuan Cuisine with a history of more than 100 years. Ma (麻) describes a spicy and hot taste which comes from pepper powder, one kind of condiment usually used in Chuan Cuisine.', 'Ma Po Tofu');
INSERT INTO `dish` VALUES ('4', '2', 'With a long history of more than 1,800 years, dumplings are a traditional food widely popular in North China. Dumplings consist of minced meat and chopped vegetables wrapped into a thin piece of dough skin', 'Dumplings');
INSERT INTO `dish` VALUES ('5', '3', 'The most versatile shape of a wonton is simple a right triangle, similar to Italian tortellini. Wontons are commonly boiled and served in soup or sometimes deep-fried.', 'Wontons');

-- ----------------------------
-- Table structure for restaurant
-- ----------------------------
DROP TABLE IF EXISTS `restaurant`;
CREATE TABLE `restaurant` (
  `restaurantID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `rating` int(5) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `phoneNumber` bigint(20) DEFAULT NULL,
  `wechatId` char(38) DEFAULT NULL,
  `imagePath` varchar(255) DEFAULT NULL,
  `addressId` char(38) DEFAULT NULL,
  PRIMARY KEY (`restaurantID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of restaurant
-- ----------------------------
INSERT INTO `restaurant` VALUES ('1', 'northern restaurant', 'northern', '123', '1', 'aaa', '450136058', '1111', null, '1');
INSERT INTO `restaurant` VALUES ('2', 'ddd', null, null, null, null, null, null, null, null);
INSERT INTO `restaurant` VALUES ('3', 'ddd', null, null, null, null, null, null, null, null);
INSERT INTO `restaurant` VALUES ('4', null, null, null, null, null, null, null, null, null);
INSERT INTO `restaurant` VALUES ('5', 'eastern', 'eastern', '$2a$10$g8QPjIIQiiwMzm7BqtnX5eOJ68vHl7ZwXKYYqPCuI82V3FL45utL6', null, 'best restaurant', '123', null, null, null);

-- ----------------------------
-- Table structure for restaurantanddish
-- ----------------------------
DROP TABLE IF EXISTS `restaurantanddish`;
CREATE TABLE `restaurantanddish` (
  `restaurantId` int(11) NOT NULL,
  `dishId` int(11) NOT NULL,
  `dishImagePath` varchar(255) DEFAULT NULL,
  `dishPrice` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`dishId`,`restaurantId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of restaurantanddish
-- ----------------------------
INSERT INTO `restaurantanddish` VALUES ('1', '1', null, '10');
INSERT INTO `restaurantanddish` VALUES ('1', '2', null, '22');
INSERT INTO `restaurantanddish` VALUES ('1', '3', null, '33');
INSERT INTO `restaurantanddish` VALUES ('1', '4', null, '34');
INSERT INTO `restaurantanddish` VALUES ('1', '5', null, '32');

-- ----------------------------
-- Table structure for sessions
-- ----------------------------
DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sessions
-- ----------------------------
