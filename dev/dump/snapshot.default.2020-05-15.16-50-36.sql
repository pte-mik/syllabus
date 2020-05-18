-- 2020-05-15T16:50:36+02:00 - mysql:host=127.0.0.1;dbname=mik-wiki;port=3306;charset=utf8
SET FOREIGN_KEY_CHECKS = 0;

-- Table structure for table `blogpost`

DROP TABLE IF EXISTS `blogpost`;
CREATE TABLE `blogpost` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `siteId` int(11) unsigned NOT NULL,
  `title` varchar(255) NOT NULL DEFAULT '',
  `lead` text NOT NULL,
  `content` text NOT NULL,
  `status` enum('active','draft','deleted') NOT NULL DEFAULT 'draft',
  `published` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Dumping data for table `blogpost`

LOCK TABLES `blogpost` WRITE;
INSERT INTO `blogpost` VALUES (1,1,'asdfasdfasdfasdfa','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ','qwerqwerasdfaqfwer\nqwer\nqwerq\nwer\nqwer\nqwe\nrqwerq','active','2019-12-02 14:29:48');
INSERT INTO `blogpost` VALUES (2,1,'New Page','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ','','active','2019-12-02 15:01:13');
INSERT INTO `blogpost` VALUES (3,1,'Ez is egy blogpost','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ','active','2019-12-01 12:19:32');
INSERT INTO `blogpost` VALUES (4,1,'qwerqwerqewr','qwer','qwer','active','2020-05-15 15:48:25');
UNLOCK TABLES;

-- Table structure for table `page`

DROP TABLE IF EXISTS `page`;
CREATE TABLE `page` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `siteId` int(11) unsigned NOT NULL,
  `title` varchar(255) NOT NULL DEFAULT '',
  `slug` varchar(255) NOT NULL DEFAULT '',
  `content` text NOT NULL,
  `status` enum('active','draft','deleted') NOT NULL DEFAULT 'draft',
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

-- Dumping data for table `page`

LOCK TABLES `page` WRITE;
INSERT INTO `page` VALUES (1,2,'Új cikk!','welcome2','Hellokaqwerqwerqwerqwerqweqwerqwerqwerqwe','draft','2019-09-11 00:00:00','2019-09-26 14:59:58');
INSERT INTO `page` VALUES (2,1,'Hello rszt hejj','welcome','# h1 Heading 8-)eeeeeeeee\n## h2 Heading\n### h3 Heading\n#### h4 Heading\n##### h5 Heading\n###### h6 Heading\n\n\n## Horizontal Rules\n\n___\n\n---\n\n***\n\n\n## Typographic replacements\n\nEnable typographer option to see result.\n\n(c) (C) (r) (R) (tm) (TM) (p) (P) +-\n\ntest.. test... test..... test?..... test!....\n\n!!!!!! ???? ,,  -- ---\n\n\"Smartypants, double quotes\" and \'single quotes\'\n\n\n## Emphasis\n\n**This is bold text**\n\n__This is bold text__\n\n*This is italic text*\n\n_This is italic text_\n\n~~Strikethrough~~\n\n\n## Blockquotes\n\n\n> Blockquotes can also be nested...\n>> ...by using additional greater-than signs right next to each other...\n> > > ...or with spaces between arrows.\n\n\n## Lists\n\nUnordered\n\n+ Create a list by starting a line with `+`, `-`, or `*`\n+ Sub-lists are made by indenting 2 spaces:\n  - Marker character change forces new list start:\n    * Ac tristique libero volutpat at\n    + Facilisis in pretium nisl aliquet\n    - Nulla volutpat aliquam velit\n+ Very easy!\n\nOrdered\n\n1. Lorem ipsum dolor sit amet\n2. Consectetur adipiscing elit\n3. Integer molestie lorem at massa\n\n\n1. You can use sequential numbers...\n1. ...or keep all the numbers as `1.`\n\nStart numbering with offset:\n\n57. foo\n1. bar\n\n\n## Code\n\nInline `code`\n\nIndented code\n\n    // Some comments\n    line 1 of code\n    line 2 of code\n    line 3 of code\n\n\nBlock code \"fences\"\n\n```\nSample text here...\n```\n\nSyntax highlighting\n\n``` js\nvar foo = function (bar) {\n  return bar++;\n};\n\nconsole.log(foo(5));\n```\n\n## Tables\n\n| Option | Description |\n| ------ | ----------- |\n| data   | path to data files to supply the data that will be passed into templates. |\n| engine | engine to be used for processing templates. Handlebars is the default. |\n| ext    | extension to be used for dest files. |\n\nRight aligned columns\n\n| Option | Description |\n| ------:| -----------:|\n| data   | path to data files to supply the data that will be passed into templates. |\n| engine | engine to be used for processing templates. Handlebars is the default. |\n| ext    | extension to be used for dest files. |\n\n\n## Links\n\n[link text](http://dev.nodeca.com)\n\n[link with title](http://nodeca.github.io/pica/demo/ \"title text!\")\n\nAutoconverted link https://github.com/nodeca/pica (enable linkify to see)\n\n\n## Images\n\n![Minion](https://octodex.github.com/images/minion.png)\n![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg \"The Stormtroopocat\")\n\nLike links, Images also have a footnote style syntax\n\n![Alt text][id]\n\nWith a reference later in the document defining the URL location:\n\n[id]: https://octodex.github.com/images/dojocat.jpg  \"The Dojocat\"\n\n\n## Plugins\n\nThe killer feature of `markdown-it` is very effective support of\n[syntax plugins](https://www.npmjs.org/browse/keyword/markdown-it-plugin).\n\n\n### [Emojies](https://github.com/markdown-it/markdown-it-emoji)\n\n> Classic markup: :wink: :crush: :cry: :tear: :laughing: :yum:\n>\n> Shortcuts (emoticons): :-) :-( 8-) ;)\n\nsee [how to change output](https://github.com/markdown-it/markdown-it-emoji#change-output) with twemoji.\n\n\n### [Subscript](https://github.com/markdown-it/markdown-it-sub) / [Superscript](https://github.com/markdown-it/markdown-it-sup)\n\n- 19^th^\n- H~2~O\n\n\n### [\\<ins>](https://github.com/markdown-it/markdown-it-ins)\n\n++Inserted text++\n\n\n### [\\<mark>](https://github.com/markdown-it/markdown-it-mark)\n\n==Marked text==\n\n\n### [Footnotes](https://github.com/markdown-it/markdown-it-footnote)\n\nFootnote 1 link[^first].\n\nFootnote 2 link[^second].\n\nInline footnote^[Text of inline footnote] definition.\n\nDuplicated footnote reference[^second].\n\n[^first]: Footnote **can have markup**\n\n    and multiple paragraphs.\n\n[^second]: Footnote text.\n\n\n### [Definition lists](https://github.com/markdown-it/markdown-it-deflist)\n\nTerm 1\n\n:   Definition 1\nwith lazy continuation.\n\nTerm 2 with *inline markup*\n\n:   Definition 2\n\n        { some code, part of Definition 2 }\n\n    Third paragraph of definition 2.\n\n_Compact style:_\n\nTerm 1\n  ~ Definition 1\n\nTerm 2\n  ~ Definition 2a\n  ~ Definition 2b\n\n\n### [Abbreviations](https://github.com/markdown-it/markdown-it-abbr)\n\nThis is HTML abbreviation example.\n\nIt converts \"HTML\", but keep intact partial entries like \"xxxHTMLyyy\" and so on.\n\n*[HTML]: Hyper Text Markup Language\n\n### [Custom containers](https://github.com/markdown-it/markdown-it-container)\n\n::: warning\n*here be dragons*\n:::\n','active','2019-09-11 00:00:00','2020-05-15 15:36:28');
INSERT INTO `page` VALUES (3,2,'Impresszum','impressum','Ez a mi wikink... mi csináljuk jókedvvel!','active','2019-09-11 00:00:00','2019-09-11 00:00:00');
INSERT INTO `page` VALUES (4,2,'New Page','new-page','','active','2019-09-26 12:51:30','2019-09-26 14:59:42');
INSERT INTO `page` VALUES (5,2,'File Test','file-test','# Hello\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','active','2019-09-26 12:51:54','2019-09-27 11:41:41');
INSERT INTO `page` VALUES (6,2,'New Page','hello','# Hello\n\nEz itt az RSZT WIKI!!!','active','2019-09-26 12:52:38','2019-09-26 13:07:20');
INSERT INTO `page` VALUES (7,2,'New Page','new-page','','draft','2019-09-26 12:52:59','2019-09-26 12:52:59');
INSERT INTO `page` VALUES (8,2,'New Page','new-page','asdfasdqew fqwefq ecqeq cqervqerv qwerv wervwerv werv we','active','2019-09-26 12:53:02','2019-09-26 12:53:10');
INSERT INTO `page` VALUES (9,1,'New Page23345','new-page','asdf','active','2019-11-14 16:52:07','2019-11-26 16:19:14');
INSERT INTO `page` VALUES (10,1,'testfasz','new-page','','deleted','2019-11-14 16:53:34','2020-05-15 15:36:45');
INSERT INTO `page` VALUES (11,1,'New Page','new-page','','deleted','2019-11-15 11:55:09','2019-11-26 16:06:43');
INSERT INTO `page` VALUES (12,1,'New Page','new-page','','deleted','2019-11-27 14:33:45','2019-11-27 14:36:02');
INSERT INTO `page` VALUES (13,1,'New Page','new-page','','deleted','2019-11-27 14:34:21','2019-11-27 14:36:04');
INSERT INTO `page` VALUES (14,1,'New Page','new-page','','deleted','2019-11-27 14:35:24','2019-11-27 14:36:06');
INSERT INTO `page` VALUES (15,1,'New Pageqqqq','new-page','qwerqwerqwer','draft','2019-11-27 14:35:47','2019-11-27 15:36:20');
INSERT INTO `page` VALUES (16,1,'New Pagess','new-page','','active','2019-11-27 14:37:11','2019-11-27 14:37:16');
INSERT INTO `page` VALUES (17,1,'New Page','new-page','','active','2019-11-28 11:00:53','2019-11-29 13:17:48');
INSERT INTO `page` VALUES (18,1,'New Page','new-page','','active','2019-11-28 11:02:18','2019-11-28 14:26:49');
INSERT INTO `page` VALUES (19,1,'New Page','new-page','','active','2019-11-28 14:18:04','2019-11-28 14:26:00');
INSERT INTO `page` VALUES (20,1,'New Page','new-page','','active','2019-11-28 14:18:51','2019-11-28 14:26:02');
INSERT INTO `page` VALUES (21,1,'New Page','new-page','','active','2019-11-28 14:19:14','2019-11-28 14:26:04');
INSERT INTO `page` VALUES (22,1,'New Page','new-page','','active','2019-11-28 14:19:57','2019-11-28 14:26:13');
INSERT INTO `page` VALUES (23,1,'New Page','new-page','','active','2019-11-28 14:20:03','2019-11-28 14:26:14');
INSERT INTO `page` VALUES (24,1,'New Page','new-page','','active','2019-11-28 14:20:05','2019-11-28 14:26:14');
INSERT INTO `page` VALUES (25,1,'qwerqwerqwerqwerqwerq','new-page','','draft','2020-05-15 15:37:47','2020-05-15 15:37:51');
UNLOCK TABLES;

-- Table structure for table `site`

DROP TABLE IF EXISTS `site`;
CREATE TABLE `site` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) NOT NULL DEFAULT '',
  `owner` varchar(255) NOT NULL DEFAULT '',
  `language` enum('EN','HU') NOT NULL DEFAULT 'HU',
  `structure` text COMMENT 'json',
  `title` varchar(255) NOT NULL,
  `status` enum('public','protected','hidden') NOT NULL DEFAULT 'protected',
  `editors` text,
  `guests` text,
  `menuBgColor` varchar(255) DEFAULT NULL,
  `menuColor` varchar(255) DEFAULT NULL,
  `menuSecondaryColor` varchar(255) DEFAULT NULL,
  `titleColor` varchar(255) DEFAULT NULL,
  `footerBgColor` varchar(255) DEFAULT NULL,
  `footerText` varchar(255) DEFAULT NULL,
  `footerContact` varchar(255) DEFAULT NULL,
  `start` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Dumping data for table `site`

LOCK TABLES `site` WRITE;
INSERT INTO `site` VALUES (1,'mik','lagdab.p.jpte','HU','{\"items\":[{\"type\":\"menu\",\"properties\":{\"label\":\"wer\"},\"subitems\":[{\"type\":\"link\",\"properties\":{\"label\":\"H\\u00edrek\",\"link\":\"\\/blog\"}},{\"type\":\"separator\"},{\"type\":\"link\",\"properties\":{\"label\":\"H\\u00edrek\",\"link\":\"\\/blog\"}}]},{\"type\":\"page\",\"properties\":{\"label\":\"About\",\"link\":\"about\"}},{\"type\":\"menu\",\"properties\":{\"label\":\"Inform\\u00e1ci\\u00f3k\"},\"subitems\":[]}]}','mikwiki','protected','','*','#111111','#ffffff','#ffa200','#ffa200','#373f4a','Rendszer és szoftvertechnológia','rszt@mik.pte.hu','@welcomer');
INSERT INTO `site` VALUES (2,'rszt','lagdab.p.jptes','HU','Category\n. MY asdfa\n. . @hello\n. Sub category\n. . @welcome\n. . @welcome\n. . @impressum\n. . @welcome2\n. . Valami más\n. . . @impressum\n. . . @welcome2\n. . @file-test','Rendszer és szoftvertechnológia','protected','subidubi\n@sometging\nasdf\nqwww','*',111111,'ffffff','ffa200','ffa200','#00fdff','','','@welcome');
INSERT INTO `site` VALUES (3,'rtudomany','vagoadp.pte','HU','','Tudomány','protected','','*',111111,'ffffff','ffa200','ffa200','373f4a','','','/blog');
INSERT INTO `site` VALUES (4,'aaa','','HU','{\"items\":[{\"type\":\"menu\",\"properties\":{\"label\":\"test\"},\"subitems\":[{\"type\":\"page\",\"properties\":{\"label\":\"asdfadsafsdfas\",\"link\":\"234234\"}}]}]}','qeqwrwerqwe','public','','','#aa7942','#ff9300','#ff40ff','#00f900','#fffb00','','','/wiki/welcome');
UNLOCK TABLES;

-- Table structure for table `user`

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(60) DEFAULT NULL COMMENT 'password',
  `created` datetime DEFAULT NULL,
  `groups` set('admin','editor') DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'inactive',
  `eha` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Dumping data for table `user`

LOCK TABLES `user` WRITE;
INSERT INTO `user` VALUES (1,'elvis','elvis@eternity','$2y$10$7ndDlP7H9SUR4sU67YzgUuRF7ZWo7sJpSofJS4G9dhkmElPgi/O1O',NULL,'admin,editor','active','lagdab.p.jpte');
UNLOCK TABLES;

-- Table structure for table `user_copy`

DROP TABLE IF EXISTS `user_copy`;
CREATE TABLE `user_copy` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(60) DEFAULT NULL COMMENT 'password',
  `created` datetime DEFAULT NULL,
  `roles` set('admin','editor') DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'inactive',
  `eha` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table `user_copy`

LOCK TABLES `user_copy` WRITE;
UNLOCK TABLES;
SET FOREIGN_KEY_CHECKS = 1;

-- Completed on: 2020-05-15T16:50:36+02:00
