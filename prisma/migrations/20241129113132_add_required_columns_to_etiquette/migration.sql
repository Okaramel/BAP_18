/*
  Warnings:

  - You are about to drop the column `description` on the `Etiquette` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Etiquette` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Etiquette` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[titleProject]` on the table `Etiquette` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `background` to the `Etiquette` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionContainer1` to the `Etiquette` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleContainer1` to the `Etiquette` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleProject` to the `Etiquette` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Etiquette_title_key` ON `Etiquette`;

-- AlterTable
ALTER TABLE `Etiquette` DROP COLUMN `description`,
    DROP COLUMN `image`,
    DROP COLUMN `title`,
    ADD COLUMN `background` VARCHAR(191) NOT NULL,
    ADD COLUMN `bannerImage` VARCHAR(191) NULL,
    ADD COLUMN `descriptionContainer1` VARCHAR(191) NOT NULL,
    ADD COLUMN `descriptionContainer2` VARCHAR(191) NULL,
    ADD COLUMN `descriptionContainer3` VARCHAR(191) NULL,
    ADD COLUMN `descriptionContainer4` VARCHAR(191) NULL,
    ADD COLUMN `descriptionProject` VARCHAR(191) NULL,
    ADD COLUMN `imageContainer2` VARCHAR(191) NULL,
    ADD COLUMN `imageContainer3` VARCHAR(191) NULL,
    ADD COLUMN `imageContainer4` VARCHAR(191) NULL,
    ADD COLUMN `logo` VARCHAR(191) NULL,
    ADD COLUMN `quoteBanner` VARCHAR(191) NULL,
    ADD COLUMN `titleContainer1` VARCHAR(191) NOT NULL,
    ADD COLUMN `titleContainer2` VARCHAR(191) NULL,
    ADD COLUMN `titleContainer3` VARCHAR(191) NULL,
    ADD COLUMN `titleContainer4` VARCHAR(191) NULL,
    ADD COLUMN `titleProject` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Innovation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Innovation_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EtiquetteInnovation` (
    `etiquetteId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,

    PRIMARY KEY (`etiquetteId`, `categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Etiquette_titleProject_key` ON `Etiquette`(`titleProject`);

-- AddForeignKey
ALTER TABLE `EtiquetteInnovation` ADD CONSTRAINT `EtiquetteInnovation_etiquetteId_fkey` FOREIGN KEY (`etiquetteId`) REFERENCES `Etiquette`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EtiquetteInnovation` ADD CONSTRAINT `EtiquetteInnovation_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Innovation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
