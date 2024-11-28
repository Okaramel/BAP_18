/*
  Warnings:

  - You are about to drop the `_EtiquetteToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_EtiquetteToTag` DROP FOREIGN KEY `_EtiquetteToTag_A_fkey`;

-- DropForeignKey
ALTER TABLE `_EtiquetteToTag` DROP FOREIGN KEY `_EtiquetteToTag_B_fkey`;

-- DropTable
DROP TABLE `_EtiquetteToTag`;

-- CreateTable
CREATE TABLE `EtiquetteTag` (
    `etiquetteId` INTEGER NOT NULL,
    `tagId` INTEGER NOT NULL,

    PRIMARY KEY (`etiquetteId`, `tagId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EtiquetteTag` ADD CONSTRAINT `EtiquetteTag_etiquetteId_fkey` FOREIGN KEY (`etiquetteId`) REFERENCES `Etiquette`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EtiquetteTag` ADD CONSTRAINT `EtiquetteTag_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
