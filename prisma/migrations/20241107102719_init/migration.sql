/*
  Warnings:

  - You are about to drop the column `titre` on the `Etiquette` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Etiquette` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Etiquette` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Etiquette` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Etiquette` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Etiquette_titre_key` ON `Etiquette`;

-- AlterTable
ALTER TABLE `Etiquette` DROP COLUMN `titre`,
    ADD COLUMN `qrcode` VARCHAR(191) NULL,
    ADD COLUMN `slug` VARCHAR(191) NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Etiquette_slug_key` ON `Etiquette`(`slug`);

-- CreateIndex
CREATE UNIQUE INDEX `Etiquette_title_key` ON `Etiquette`(`title`);
