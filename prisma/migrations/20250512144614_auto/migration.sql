/*
  Warnings:

  - Made the column `hashRefreshToken` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `hashRefreshToken` VARCHAR(255) NOT NULL;
