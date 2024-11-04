/*
  Warnings:

  - You are about to drop the column `classId` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `subjectId` on the `Assignment` table. All the data in the column will be lost.
  - Added the required column `lessonId` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Made the column `startDate` on table `Assignment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_classId_fkey";

-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_subjectId_fkey";

-- AlterTable
ALTER TABLE "Assignment" DROP COLUMN "classId",
DROP COLUMN "subjectId",
ADD COLUMN     "lessonId" INTEGER NOT NULL,
ALTER COLUMN "startDate" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
