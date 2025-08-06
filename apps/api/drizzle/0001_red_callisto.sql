CREATE TABLE `providers` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`provider_name` varchar(255) NOT NULL,
	`address` varchar(255) NOT NULL,
	`city` varchar(255) NOT NULL,
	`registered_county` varchar(255) NOT NULL,
	`zip_code` int NOT NULL,
	`bed_count` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `providers_id` PRIMARY KEY(`id`),
	CONSTRAINT `providers_provider_name_unique` UNIQUE(`provider_name`)
);
