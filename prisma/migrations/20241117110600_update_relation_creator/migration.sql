-- DropForeignKey
ALTER TABLE `Etiquette` DROP FOREIGN KEY `Etiquette_creatorId_fkey`;

-- CreateTable
CREATE TABLE `_EtiquetteCreators` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EtiquetteCreators_AB_unique`(`A`, `B`),
    INDEX `_EtiquetteCreators_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_EtiquetteCreators` ADD CONSTRAINT `_EtiquetteCreators_A_fkey` FOREIGN KEY (`A`) REFERENCES `Creator`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EtiquetteCreators` ADD CONSTRAINT `_EtiquetteCreators_B_fkey` FOREIGN KEY (`B`) REFERENCES `Etiquette`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
