/*
  Warnings:

  - Added the required column `type` to the `Mail` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Etiquette_creatorId_fkey` ON `Etiquette`;

-- AlterTable
ALTER TABLE `Mail` ADD COLUMN `type` ENUM('entreprise', 'particulier') NOT NULL;
