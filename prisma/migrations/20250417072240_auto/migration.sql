-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tag` VARCHAR(10) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `user_tag_UNIQUE`(`tag`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `friendship` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user1_id` INTEGER NOT NULL,
    `confidentiality_level_1` ENUM('MAXIMUM', 'CRITICAL', 'MIDDLING', 'MINIMUM') NOT NULL,
    `user2_id` INTEGER NOT NULL,
    `confidentiality_level_2` ENUM('MAXIMUM', 'CRITICAL', 'MIDDLING', 'MINIMUM') NOT NULL,

    INDEX `friendship_user1_id_user2_id_idx`(`user1_id`, `user2_id`),
    INDEX `fk_friendship_user1_idx`(`user1_id`),
    INDEX `fk_friendship_user2_idx`(`user2_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(255) NOT NULL,
    `is_read` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `fk_notification_user1_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `group` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `creator_id` INTEGER NOT NULL,

    INDEX `fk_group_user_idx`(`creator_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `card` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `confidentiality` ENUM('MAXIMUM', 'CRITICAL', 'MIDDLING', 'MINIMUM') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `user_id` INTEGER NOT NULL,
    `cardcode_id` INTEGER NOT NULL,

    INDEX `fk_card_cardcode_idx`(`cardcode_id`),
    INDEX `fk_card_user_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cardcode` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` MEDIUMTEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_data` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(255) NOT NULL,
    `confidentiality` ENUM('MAXIMUM', 'CRITICAL', 'MIDDLING', 'MINIMUM') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `user_id` INTEGER NOT NULL,
    `label_id` INTEGER NOT NULL,

    INDEX `fk_data_user_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `data_label` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dataset` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slot` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `user_data_id` INTEGER NOT NULL,
    `card_id` INTEGER NOT NULL,

    INDEX `fk_dataset_card1_idx`(`card_id`),
    INDEX `fk_dataset_data1_idx`(`user_data_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `group_member` (
    `group_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `fk_group_members_group1_idx`(`group_id`),
    INDEX `fk_group_members_user1_idx`(`user_id`),
    PRIMARY KEY (`group_id`, `user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `group_permission` (
    `group_id` INTEGER NOT NULL,
    `data_label_id` INTEGER NOT NULL,

    INDEX `fk_group_permission_data1_idx`(`data_label_id`),
    INDEX `fk_group_permission_group1_idx`(`group_id`),
    PRIMARY KEY (`group_id`, `data_label_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `conversation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `group_id` INTEGER NULL,
    `friendship_id` INTEGER NULL,

    INDEX `fk_conversation_group1_idx`(`group_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `author_id` INTEGER NOT NULL,
    `conversation_id` INTEGER NOT NULL,

    INDEX `fk_message_author_idx`(`author_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `user_data_id` INTEGER NULL,
    `sender_id` INTEGER NOT NULL,
    `receiver_id` INTEGER NOT NULL,
    `card_id` INTEGER NULL,

    INDEX `fk_permission_card1_idx`(`card_id`),
    INDEX `fk_permission_data1_idx`(`user_data_id`),
    INDEX `fk_permission_user1_idx`(`sender_id`),
    INDEX `fk_permission_user2_idx`(`receiver_id`),
    UNIQUE INDEX `permission_sender_id_receiver_id_user_data_id_key`(`sender_id`, `receiver_id`, `user_data_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `friend_request` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `is_accepted` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `sender_id` INTEGER NOT NULL,
    `receiver_id` INTEGER NOT NULL,
    `confidentiality` ENUM('MAXIMUM', 'CRITICAL', 'MIDDLING', 'MINIMUM') NOT NULL,

    INDEX `fk_request_user1_idx`(`sender_id`),
    INDEX `fk_request_user2_idx`(`receiver_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `group_request` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `is_accepted` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `sender_id` INTEGER NOT NULL,
    `receiver_id` INTEGER NOT NULL,
    `group_id` INTEGER NOT NULL,

    INDEX `fk_group_request_idx`(`group_id`),
    INDEX `fk_request_user1_idx`(`sender_id`),
    INDEX `fk_request_user2_idx`(`receiver_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `information_request` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `is_accepted` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `sender_id` INTEGER NOT NULL,
    `receiver_id` INTEGER NOT NULL,
    `user_data_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `friendship` ADD CONSTRAINT `fk_friendship_userSender` FOREIGN KEY (`user1_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `friendship` ADD CONSTRAINT `fk_friendship_userReceiver` FOREIGN KEY (`user2_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notification` ADD CONSTRAINT `fk_notification_user1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `group` ADD CONSTRAINT `fk_group_user` FOREIGN KEY (`creator_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `card` ADD CONSTRAINT `fk_card_cardcode` FOREIGN KEY (`cardcode_id`) REFERENCES `cardcode`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `card` ADD CONSTRAINT `fk_card_user` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_data` ADD CONSTRAINT `fk_dataUser_user` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_data` ADD CONSTRAINT `fk_userData_dataLabel` FOREIGN KEY (`label_id`) REFERENCES `data_label`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dataset` ADD CONSTRAINT `fk_dataset_data1` FOREIGN KEY (`user_data_id`) REFERENCES `user_data`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dataset` ADD CONSTRAINT `fk_dataset_card1` FOREIGN KEY (`card_id`) REFERENCES `card`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `group_member` ADD CONSTRAINT `fk_group_members_group1` FOREIGN KEY (`group_id`) REFERENCES `group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `group_member` ADD CONSTRAINT `fk_group_members_user` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `group_permission` ADD CONSTRAINT `fk_group_permission_group1` FOREIGN KEY (`group_id`) REFERENCES `group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `group_permission` ADD CONSTRAINT `fk_group_permission_data1` FOREIGN KEY (`data_label_id`) REFERENCES `data_label`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `conversation` ADD CONSTRAINT `fk_conversation_group1` FOREIGN KEY (`group_id`) REFERENCES `group`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `conversation` ADD CONSTRAINT `fk_conversation_friendship1` FOREIGN KEY (`friendship_id`) REFERENCES `friendship`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `message` ADD CONSTRAINT `fk_message_user` FOREIGN KEY (`author_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `message` ADD CONSTRAINT `message_conversation_id_fkey` FOREIGN KEY (`conversation_id`) REFERENCES `conversation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `permission` ADD CONSTRAINT `fk_permission_card1` FOREIGN KEY (`card_id`) REFERENCES `card`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `permission` ADD CONSTRAINT `fk_permission_data1` FOREIGN KEY (`user_data_id`) REFERENCES `user_data`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `permission` ADD CONSTRAINT `fk_permission_userSender` FOREIGN KEY (`sender_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `permission` ADD CONSTRAINT `fk_permission_userReceiver` FOREIGN KEY (`receiver_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `friend_request` ADD CONSTRAINT `fk_friendshipRequest_userSender` FOREIGN KEY (`sender_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `friend_request` ADD CONSTRAINT `fk_friendshipRequest_userReceiver` FOREIGN KEY (`receiver_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `group_request` ADD CONSTRAINT `fk_group_request_group_id` FOREIGN KEY (`group_id`) REFERENCES `group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `group_request` ADD CONSTRAINT `fk_groupRequest_userSender` FOREIGN KEY (`sender_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `group_request` ADD CONSTRAINT `fk_groupRequest_userReceiver` FOREIGN KEY (`receiver_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `information_request` ADD CONSTRAINT `information_request_user_data_id_fkey` FOREIGN KEY (`user_data_id`) REFERENCES `user_data`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `information_request` ADD CONSTRAINT `fk_informationRequest_userSender` FOREIGN KEY (`sender_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `information_request` ADD CONSTRAINT `fk_informationRequest_userReceiver` FOREIGN KEY (`receiver_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
