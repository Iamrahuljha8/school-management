/*
  Warnings:

  - Made the column `description` on table `Announcement` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Announcement" ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "Assignment" ALTER COLUMN "startDate" DROP NOT NULL,
ALTER COLUMN "startDate" SET DEFAULT CURRENT_TIMESTAMP;
