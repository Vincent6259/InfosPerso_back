CREATE TABLE `notification` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(255) NOT NULL,
  `is_read` BOOLEAN NOT NULL DEFAULT false,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NULL,
  `user_id` INTEGER NOT NULL,

  PRIMARY KEY (`id`),
  INDEX `fk_notification_user1_idx`(`user_id`),
  CONSTRAINT `fk_notification_user1`
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
    ON DELETE RESTRICT ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;