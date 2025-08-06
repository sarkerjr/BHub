CREATE TABLE `media` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`provider_id` int NOT NULL,
	`file_name` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `media_id` PRIMARY KEY(`id`)
);
