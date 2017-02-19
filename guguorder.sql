/*
Navicat MySQL Data Transfer

Source Server         : guguorder
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : guguorder

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2017-02-19 13:07:10
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
  `unitNumber` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of address
-- ----------------------------

-- ----------------------------
-- Table structure for dishes
-- ----------------------------
DROP TABLE IF EXISTS `dishes`;
CREATE TABLE `dishes` (
  `dishId` char(38) NOT NULL,
  `dishImagePath` varchar(255) DEFAULT NULL,
  `dishPrice` decimal(10,2) DEFAULT NULL,
  `popularity` int(5) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `restaurantId` char(38) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dishes
-- ----------------------------

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
