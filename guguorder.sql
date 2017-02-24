/*
Navicat MySQL Data Transfer

Source Server         : guguorder
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : guguorder

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2017-02-23 23:26:34
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `street` varchar(1000) DEFAULT NULL,
  `suburb` varchar(255) DEFAULT NULL,
  `postcode` varchar(10) DEFAULT NULL,
  `unitNumber` int(10) DEFAULT NULL,
  `city_fk` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `city_fk_key` (`city_fk`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of address
-- ----------------------------
INSERT INTO `address` VALUES ('1', 'southdowling st', 'waterloo', '2017', '1', '1');

-- ----------------------------
-- Table structure for city
-- ----------------------------
DROP TABLE IF EXISTS `city`;
CREATE TABLE `city` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `state_fk` int(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `state_fk_key` (`state_fk`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of city
-- ----------------------------
INSERT INTO `city` VALUES ('1', 'sydney', '1');

-- ----------------------------
-- Table structure for country
-- ----------------------------
DROP TABLE IF EXISTS `country`;
CREATE TABLE `country` (
  `id` int(255) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of country
-- ----------------------------
INSERT INTO `country` VALUES ('1', 'australia');

-- ----------------------------
-- Table structure for dish
-- ----------------------------
DROP TABLE IF EXISTS `dish`;
CREATE TABLE `dish` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `dishImagePath` varchar(255) DEFAULT NULL,
  `dishPrice` decimal(10,2) DEFAULT NULL,
  `popularity` int(5) DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `restaurant_fk` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `restaurant_fk_key` (`restaurant_fk`)
) ENGINE=MyISAM AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dish
-- ----------------------------
INSERT INTO `dish` VALUES ('1', null, '11.00', '1', 'Sweet and sour pork has a bright orange-red color, and a delicious sweet and sour taste', 'Sweet and Sour Pork', null);
INSERT INTO `dish` VALUES ('2', null, '11.00', '1', 'This is a famous Sichuan-style specialty, popular with both Chinese and foreigners. The major ingredients are diced chicken, dried chili, and fried peanuts.', 'Gong Bao Chicken', '5');
INSERT INTO `dish` VALUES ('3', null, '11.00', '1', 'Ma po tofu is one of the most famous dishes in Chuan Cuisine with a history of more than 100 years. Ma (麻) describes a spicy and hot taste which comes from pepper powder, one kind of condiment usually used in Chuan Cuisine', 'Ma Po Tofu1', '5');
INSERT INTO `dish` VALUES ('4', null, '11.00', '1', 'the Cantonese pronunciation of the Chinese characters above, which means stir-fried noodles. Generally speaking, this stir-fried dish consists of noodles, meat (usually chicken, beef, shrimp, or pork), onions and celery.', 'Chow Mein1', '5');
INSERT INTO `dish` VALUES ('5', null, '11.00', '1', 'Peking duck is a famous dish from Beijing, enjoying world fame, and considered as one of China’s national dishes', 'Peking Roasted Duck1', '5');
INSERT INTO `dish` VALUES ('6', null, '11.00', '1', 'Spring rolls are a Cantonese dim sum of cylindrical shape. The filling of spring rolls could be vegetables or meat, and the taste could be either sweet or savory. After fillings are wrapped in spring roll wrappers, the next step is frying. Then the spring rolls are given their golden yellow color', 'Spring Rolls1', '5');
INSERT INTO `dish` VALUES ('7', null, '11.00', '1', 'Since the Tang Dynasty (618–907), it has been a custom for people to eat wontons on the winter solstice', 'Wontons1', '5');
INSERT INTO `dish` VALUES ('8', null, '11.00', '1', 'Sweet and sour pork has a bright orange-red color, and a delicious sweet and sour taste', 'Sweet and Sour Pork1', '5');
INSERT INTO `dish` VALUES ('9', null, '11.00', '1', 'This is a famous Sichuan-style specialty, popular with both Chinese and foreigners. The major ingredients are diced chicken, dried chili, and fried peanuts.', 'Gong Bao Chicken', '5');
INSERT INTO `dish` VALUES ('10', null, '11.00', '1', 'Ma po tofu is one of the most famous dishes in Chuan Cuisine with a history of more than 100 years. Ma (麻) describes a spicy and hot taste which comes from pepper powder, one kind of condiment usually used in Chuan Cuisine', 'Ma Po Tofu2', '5');
INSERT INTO `dish` VALUES ('11', null, '11.00', '1', 'the Cantonese pronunciation of the Chinese characters above, which means stir-fried noodles. Generally speaking, this stir-fried dish consists of noodles, meat (usually chicken, beef, shrimp, or pork), onions and celery.', 'Chow Mein2', '5');
INSERT INTO `dish` VALUES ('12', null, '11.00', '1', 'Peking duck is a famous dish from Beijing, enjoying world fame, and considered as one of China’s national dishes', 'Peking Roasted Duck2', '5');
INSERT INTO `dish` VALUES ('13', null, '11.00', '1', 'Spring rolls are a Cantonese dim sum of cylindrical shape. The filling of spring rolls could be vegetables or meat, and the taste could be either sweet or savory. After fillings are wrapped in spring roll wrappers, the next step is frying. Then the spring rolls are given their golden yellow color', 'Spring Rolls2', '5');
INSERT INTO `dish` VALUES ('14', null, '11.00', '1', 'Since the Tang Dynasty (618–907), it has been a custom for people to eat wontons on the winter solstice', 'Wontons2', '5');
INSERT INTO `dish` VALUES ('15', null, '11.00', '1', 'Sweet and sour pork has a bright orange-red color, and a delicious sweet and sour taste', 'Sweet and Sour Pork2', '5');
INSERT INTO `dish` VALUES ('16', null, '11.00', '1', 'This is a famous Sichuan-style specialty, popular with both Chinese and foreigners. The major ingredients are diced chicken, dried chili, and fried peanuts.', 'Gong Bao Chicken', '5');
INSERT INTO `dish` VALUES ('17', null, '11.00', '1', 'Ma po tofu is one of the most famous dishes in Chuan Cuisine with a history of more than 100 years. Ma (麻) describes a spicy and hot taste which comes from pepper powder, one kind of condiment usually used in Chuan Cuisine', 'Ma Po Tofu3', '5');
INSERT INTO `dish` VALUES ('18', null, '11.00', '1', 'the Cantonese pronunciation of the Chinese characters above, which means stir-fried noodles. Generally speaking, this stir-fried dish consists of noodles, meat (usually chicken, beef, shrimp, or pork), onions and celery.', 'Chow Mein3', '5');
INSERT INTO `dish` VALUES ('19', null, '11.00', '1', 'Peking duck is a famous dish from Beijing, enjoying world fame, and considered as one of China’s national dishes', 'Peking Roasted Duck3', '5');
INSERT INTO `dish` VALUES ('20', null, '11.00', '1', 'Spring rolls are a Cantonese dim sum of cylindrical shape. The filling of spring rolls could be vegetables or meat, and the taste could be either sweet or savory. After fillings are wrapped in spring roll wrappers, the next step is frying. Then the spring rolls are given their golden yellow color', 'Spring Rolls3', '5');
INSERT INTO `dish` VALUES ('21', null, '11.00', '1', 'Since the Tang Dynasty (618–907), it has been a custom for people to eat wontons on the winter solstice', 'Wontons3', '5');
INSERT INTO `dish` VALUES ('22', null, '11.00', '1', 'Sweet and sour pork has a bright orange-red color, and a delicious sweet and sour taste', 'Sweet and Sour Pork3', '5');
INSERT INTO `dish` VALUES ('23', null, '11.00', '1', 'This is a famous Sichuan-style specialty, popular with both Chinese and foreigners. The major ingredients are diced chicken, dried chili, and fried peanuts.', 'Gong Bao Chicken', '5');
INSERT INTO `dish` VALUES ('24', null, '11.00', '1', 'Ma po tofu is one of the most famous dishes in Chuan Cuisine with a history of more than 100 years. Ma (麻) describes a spicy and hot taste which comes from pepper powder, one kind of condiment usually used in Chuan Cuisine', 'Ma Po Tofu4', '5');
INSERT INTO `dish` VALUES ('25', null, '11.00', '1', 'the Cantonese pronunciation of the Chinese characters above, which means stir-fried noodles. Generally speaking, this stir-fried dish consists of noodles, meat (usually chicken, beef, shrimp, or pork), onions and celery.', 'Chow Mein4', '5');
INSERT INTO `dish` VALUES ('26', null, '11.00', '1', 'Peking duck is a famous dish from Beijing, enjoying world fame, and considered as one of China’s national dishes', 'Peking Roasted Duck4', '5');
INSERT INTO `dish` VALUES ('27', null, '11.00', '1', 'Spring rolls are a Cantonese dim sum of cylindrical shape. The filling of spring rolls could be vegetables or meat, and the taste could be either sweet or savory. After fillings are wrapped in spring roll wrappers, the next step is frying. Then the spring rolls are given their golden yellow color', 'Spring Rolls4', '5');
INSERT INTO `dish` VALUES ('28', null, '11.00', '1', 'Since the Tang Dynasty (618–907), it has been a custom for people to eat wontons on the winter solstice', 'Wontons4', '5');
INSERT INTO `dish` VALUES ('29', null, '11.00', '1', 'Sweet and sour pork has a bright orange-red color, and a delicious sweet and sour taste', 'Sweet and Sour Pork4', '5');
INSERT INTO `dish` VALUES ('30', null, '11.00', '1', 'This is a famous Sichuan-style specialty, popular with both Chinese and foreigners. The major ingredients are diced chicken, dried chili, and fried peanuts.', 'Gong Bao Chicken', '5');
INSERT INTO `dish` VALUES ('31', null, '11.00', '1', 'Ma po tofu is one of the most famous dishes in Chuan Cuisine with a history of more than 100 years. Ma (麻) describes a spicy and hot taste which comes from pepper powder, one kind of condiment usually used in Chuan Cuisine', 'Ma Po Tofu5', '5');
INSERT INTO `dish` VALUES ('32', null, '11.00', '1', 'the Cantonese pronunciation of the Chinese characters above, which means stir-fried noodles. Generally speaking, this stir-fried dish consists of noodles, meat (usually chicken, beef, shrimp, or pork), onions and celery.', 'Chow Mein5', '5');
INSERT INTO `dish` VALUES ('33', null, '11.00', '1', 'Peking duck is a famous dish from Beijing, enjoying world fame, and considered as one of China’s national dishes', 'Peking Roasted Duck5', '5');
INSERT INTO `dish` VALUES ('34', null, '11.00', '1', 'Spring rolls are a Cantonese dim sum of cylindrical shape. The filling of spring rolls could be vegetables or meat, and the taste could be either sweet or savory. After fillings are wrapped in spring roll wrappers, the next step is frying. Then the spring rolls are given their golden yellow color', 'Spring Rolls5', '5');
INSERT INTO `dish` VALUES ('35', null, '11.00', '1', 'Since the Tang Dynasty (618–907), it has been a custom for people to eat wontons on the winter solstice', 'Wontons5', '5');

-- ----------------------------
-- Table structure for restaurant
-- ----------------------------
DROP TABLE IF EXISTS `restaurant`;
CREATE TABLE `restaurant` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `rating` int(5) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `phoneNumber` bigint(20) DEFAULT NULL,
  `wechatId` char(38) DEFAULT NULL,
  `imagePath` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of restaurant
-- ----------------------------
INSERT INTO `restaurant` VALUES ('1', 'northern restaurant', 'northern', '123', '1', 'aaa', '450136058', '1111', null);
INSERT INTO `restaurant` VALUES ('2', 'ddd', null, null, null, null, null, null, null);
INSERT INTO `restaurant` VALUES ('3', 'ddd', null, null, null, null, null, null, null);
INSERT INTO `restaurant` VALUES ('4', null, null, null, null, null, null, null, null);
INSERT INTO `restaurant` VALUES ('5', 'eastern', 'eastern', '$2a$10$g8QPjIIQiiwMzm7BqtnX5eOJ68vHl7ZwXKYYqPCuI82V3FL45utL6', null, 'best restaurant', '123', null, null);

-- ----------------------------
-- Table structure for restaurantandaddressmap
-- ----------------------------
DROP TABLE IF EXISTS `restaurantandaddressmap`;
CREATE TABLE `restaurantandaddressmap` (
  `restaurtantID` int(11) NOT NULL,
  `addressID` int(11) NOT NULL,
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `restaurant_fk_key` (`restaurtantID`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of restaurantandaddressmap
-- ----------------------------
INSERT INTO `restaurantandaddressmap` VALUES ('5', '1', '1');

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
INSERT INTO `sessions` VALUES ('0ZYgK4wS1a1Jhbainu9gtOqpkLDqczJA', '1487938232', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A6E756C6C2C2265787069726573223A6E756C6C2C22687474704F6E6C79223A747275652C2270617468223A222F227D7D);
INSERT INTO `sessions` VALUES ('4dVjJJzMYOM7CKrOwanBy5yTb7T__gAf', '1487938867', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A6E756C6C2C2265787069726573223A6E756C6C2C22687474704F6E6C79223A747275652C2270617468223A222F227D7D);
INSERT INTO `sessions` VALUES ('8w9--xaOS7iDg72xhE12_20emu26rQxW', '1487936342', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A6E756C6C2C2265787069726573223A6E756C6C2C22687474704F6E6C79223A747275652C2270617468223A222F227D7D);
INSERT INTO `sessions` VALUES ('9TzMG9mlMH52okJuVeNbcJQeYypbpEp5', '1487936400', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A6E756C6C2C2265787069726573223A6E756C6C2C22687474704F6E6C79223A747275652C2270617468223A222F227D7D);
INSERT INTO `sessions` VALUES ('9yyZb6gIminL4sqXot6sCiYROrMB0GEP', '1487937885', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A6E756C6C2C2265787069726573223A6E756C6C2C22687474704F6E6C79223A747275652C2270617468223A222F227D7D);
INSERT INTO `sessions` VALUES ('DDAzjUymC4HJE7fiaffzAkgz_Bb0Xqwf', '1487937307', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A6E756C6C2C2265787069726573223A6E756C6C2C22687474704F6E6C79223A747275652C2270617468223A222F227D7D);
INSERT INTO `sessions` VALUES ('FTXpG9Nx7JRUQwh-roQdzUeBqcyGwxZs', '1487937192', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A6E756C6C2C2265787069726573223A6E756C6C2C22687474704F6E6C79223A747275652C2270617468223A222F227D7D);
INSERT INTO `sessions` VALUES ('IlfddVCidhSromGpChysvbpw6cZPmPmY', '1487935080', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A6E756C6C2C2265787069726573223A6E756C6C2C22687474704F6E6C79223A747275652C2270617468223A222F227D7D);
INSERT INTO `sessions` VALUES ('K8qmXcXyB5VnrQ5NqLSbXr4jwTxBs4Fj', '1487938820', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A6E756C6C2C2265787069726573223A6E756C6C2C22687474704F6E6C79223A747275652C2270617468223A222F227D7D);
INSERT INTO `sessions` VALUES ('LLh7uI7gU7Tk1yX2P_jmNbNfJm6dxxDg', '1487938851', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A6E756C6C2C2265787069726573223A6E756C6C2C22687474704F6E6C79223A747275652C2270617468223A222F227D2C2270617373706F7274223A7B2275736572223A357D7D);
INSERT INTO `sessions` VALUES ('LfmL9AMhqSaDEvSK1woBkXrt1PgocNn0', '1487936343', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A6E756C6C2C2265787069726573223A6E756C6C2C22687474704F6E6C79223A747275652C2270617468223A222F227D7D);
INSERT INTO `sessions` VALUES ('N6W4z_zkK6N9x8rnddiS989mCoYdsk-M', '1487938551', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A6E756C6C2C2265787069726573223A6E756C6C2C22687474704F6E6C79223A747275652C2270617468223A222F227D7D);
INSERT INTO `sessions` VALUES ('O8SYc6Xo5ZO5lnrFTDYQPmAdl7FAA9C6', '1487936427', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A6E756C6C2C2265787069726573223A6E756C6C2C22687474704F6E6C79223A747275652C2270617468223A222F227D7D);
INSERT INTO `sessions` VALUES ('OLMePbz7pg64q1jr8Lc3JrwEn0cDsP23', '1487935199', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A6E756C6C2C2265787069726573223A6E756C6C2C22687474704F6E6C79223A747275652C2270617468223A222F227D7D);
INSERT INTO `sessions` VALUES ('QbnAkdB7atAqAs-MREu1_wdOki70Db2n', '1487936343', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A6E756C6C2C2265787069726573223A6E756C6C2C22687474704F6E6C79223A747275652C2270617468223A222F227D7D);
INSERT INTO `sessions` VALUES ('RU-Ggh0hmnjIRxXSNPpD6PZDMKsVW0WS', '1487936337', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A6E756C6C2C2265787069726573223A6E756C6C2C22687474704F6E6C79223A747275652C2270617468223A222F227D7D);
INSERT INTO `sessions` VALUES ('RcZVrLIGbIkmYL59K_tEZJELfmelw1b8', '1487935586', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A6E756C6C2C2265787069726573223A6E756C6C2C22687474704F6E6C79223A747275652C2270617468223A222F227D7D);
INSERT INTO `sessions` VALUES ('RqwP9fVEh_l6UA1LY6nfZMsRYaqDkCvK', '1487936411', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A6E756C6C2C2265787069726573223A6E756C6C2C22687474704F6E6C79223A747275652C2270617468223A222F227D7D);
INSERT INTO `sessions` VALUES ('UBojdFB3ckPnvYitjKycD0KhAt8Zyc0L', '1487935170', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A6E756C6C2C2265787069726573223A6E756C6C2C22687474704F6E6C79223A747275652C2270617468223A222F227D7D);
INSERT INTO `sessions` VALUES ('ZOTF1zoaOCsORzB3r1V3F5lyBYX_FUw2', '1487937910', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A6E756C6C2C2265787069726573223A6E756C6C2C22687474704F6E6C79223A747275652C2270617468223A222F227D7D);
INSERT INTO `sessions` VALUES ('_OFdFt9Y2b9j6rD73kRAV7Zmx0hCYmQS', '1487936343', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A6E756C6C2C2265787069726573223A6E756C6C2C22687474704F6E6C79223A747275652C2270617468223A222F227D7D);
INSERT INTO `sessions` VALUES ('akWUHi19Pd93hoQv06m--yD4lUNrfHcR', '1487935568', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A6E756C6C2C2265787069726573223A6E756C6C2C22687474704F6E6C79223A747275652C2270617468223A222F227D7D);
INSERT INTO `sessions` VALUES ('emOglh3G339zarHzHLZwz1sjoxf_VXKV', '1487938724', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A6E756C6C2C2265787069726573223A6E756C6C2C22687474704F6E6C79223A747275652C2270617468223A222F227D7D);
INSERT INTO `sessions` VALUES ('hS_kyBZRan3qIeeynLBz4SYvZzuWf9f2', '1487938803', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A6E756C6C2C2265787069726573223A6E756C6C2C22687474704F6E6C79223A747275652C2270617468223A222F227D7D);
INSERT INTO `sessions` VALUES ('hXR3nELC9nKxkur49haj_JUzG4bDXWQv', '1487938262', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A6E756C6C2C2265787069726573223A6E756C6C2C22687474704F6E6C79223A747275652C2270617468223A222F227D7D);
INSERT INTO `sessions` VALUES ('j6xwtHTEICHcplwjIGXG011aDXygqQFL', '1487937307', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A6E756C6C2C2265787069726573223A6E756C6C2C22687474704F6E6C79223A747275652C2270617468223A222F227D7D);
INSERT INTO `sessions` VALUES ('kvDlevD0jbutdXUj4HRHJHUar_Pz2p4F', '1487938539', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A6E756C6C2C2265787069726573223A6E756C6C2C22687474704F6E6C79223A747275652C2270617468223A222F227D7D);
INSERT INTO `sessions` VALUES ('sTgHFoT-P-YRsbRGO-plHeXRStQHSwFA', '1487935595', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A6E756C6C2C2265787069726573223A6E756C6C2C22687474704F6E6C79223A747275652C2270617468223A222F227D7D);
INSERT INTO `sessions` VALUES ('uz62abaEKPmDUiMa77FT4GxvgHSYhVRf', '1487935631', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A6E756C6C2C2265787069726573223A6E756C6C2C22687474704F6E6C79223A747275652C2270617468223A222F227D7D);
INSERT INTO `sessions` VALUES ('vbxB7SmplGqAU_uDKx3o3EhL_H9ME8-0', '1487938275', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A6E756C6C2C2265787069726573223A6E756C6C2C22687474704F6E6C79223A747275652C2270617468223A222F227D7D);
INSERT INTO `sessions` VALUES ('xFbOH9QPW3VdcvrvJBZ5mta_yRV033y0', '1487936343', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A6E756C6C2C2265787069726573223A6E756C6C2C22687474704F6E6C79223A747275652C2270617468223A222F227D7D);
INSERT INTO `sessions` VALUES ('zNiOFegL6Lqyczb-vuzhIYOXPG2m2h8R', '1487938579', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A6E756C6C2C2265787069726573223A6E756C6C2C22687474704F6E6C79223A747275652C2270617468223A222F227D7D);

-- ----------------------------
-- Table structure for state
-- ----------------------------
DROP TABLE IF EXISTS `state`;
CREATE TABLE `state` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `country_fk` int(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `country_fk_key` (`country_fk`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of state
-- ----------------------------
INSERT INTO `state` VALUES ('1', 'NSW', '1');
