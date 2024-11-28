/*
  Warnings:

  - You are about to alter the column `description` on the `Tag` table. The data in that column could be lost. The data in that column will be cast from `VarChar(512)` to `VarChar(191)`.
  - A unique constraint covering the columns `[name]` on the table `Creator` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Creator` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Creator` ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Tag` MODIFY `description` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `_EtiquetteTags` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EtiquetteTags_AB_unique`(`A`, `B`),
    INDEX `_EtiquetteTags_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Creator_name_key` ON `Creator`(`name`);

-- AddForeignKey
ALTER TABLE `_EtiquetteTags` ADD CONSTRAINT `_EtiquetteTags_A_fkey` FOREIGN KEY (`A`) REFERENCES `Etiquette`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EtiquetteTags` ADD CONSTRAINT `_EtiquetteTags_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
