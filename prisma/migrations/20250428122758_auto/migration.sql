/*
  Warnings:

  - You are about to drop the column `is_accepted` on the `friend_request` table. All the data in the column will be lost.
  - You are about to drop the column `is_accepted` on the `group_request` table. All the data in the column will be lost.
  - You are about to drop the column `is_accepted` on the `information_request` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[friendship_id,group_id]` on the table `conversation` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `friend_request` DROP COLUMN `is_accepted`;

-- AlterTable
ALTER TABLE `group_request` DROP COLUMN `is_accepted`;

-- AlterTable
ALTER TABLE `information_request` DROP COLUMN `is_accepted`;

-- CreateIndex
CREATE UNIQUE INDEX `conversation_friendship_id_group_id_key` ON `conversation`(`friendship_id`, `group_id`);
