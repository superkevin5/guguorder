/*
Navicat MySQL Data Transfer

Source Server         : Test
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : guguorder

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-01-17 21:00:43
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
-- Table structure for restaurant
-- ----------------------------
DROP TABLE IF EXISTS `restaurant`;
CREATE TABLE `restaurant` (
  `restaurantId` char(38) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` char(32) DEFAULT NULL,
  `rating` int(5) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `phoneNumber` bigint(20) DEFAULT NULL,
  `wechatId` char(38) DEFAULT NULL,
  `imagePath` varchar(255) DEFAULT NULL,
  `addressId` char(38) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
