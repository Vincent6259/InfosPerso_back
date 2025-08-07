/*
  Warnings:

  - A unique constraint covering the columns `[user_id,label_id]` on the table `user_data` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `user_data_user_id_label_id_key` ON `user_data`(`user_id`, `label_id`);
