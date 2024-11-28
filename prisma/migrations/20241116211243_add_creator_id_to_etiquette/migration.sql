/*
  Warnings:

  - You are about to drop the column `qrcode` on the `Etiquette` table. All the data in the column will be lost.
  - You are about to drop the column `statut` on the `Etiquette` table. All the data in the column will be lost.
  - You are about to drop the column `video` on the `Etiquette` table. All the data in the column will be lost.
  - You are about to drop the `_EtiquetteTags` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `creatorId` to the `Etiquette` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_EtiquetteTags` DROP FOREIGN KEY `_EtiquetteTags_A_fkey`;

-- DropForeignKey
ALTER TABLE `_EtiquetteTags` DROP FOREIGN KEY `_EtiquetteTags_B_fkey`;

-- AlterTable
ALTER TABLE `Etiquette` DROP COLUMN `qrcode`,
    DROP COLUMN `statut`,
    DROP COLUMN `video`,
    ADD COLUMN `creatorId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_EtiquetteTags`;

-- CreateTable
CREATE TABLE `_EtiquetteToTag` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EtiquetteToTag_AB_unique`(`A`, `B`),
    INDEX `_EtiquetteToTag_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Etiquette` ADD CONSTRAINT `Etiquette_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `Creator`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EtiquetteToTag` ADD CONSTRAINT `_EtiquetteToTag_A_fkey` FOREIGN KEY (`A`) REFERENCES `Etiquette`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EtiquetteToTag` ADD CONSTRAINT `_EtiquetteToTag_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
