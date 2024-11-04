/*
  Warnings:

  - You are about to drop the column `lessonId` on the `Assignment` table. All the data in the column will be lost.
  - Added the required column `classId` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjectId` to the `Assignment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_lessonId_fkey";

-- AlterTable
ALTER TABLE "Announcement" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Assignment" DROP COLUMN "lessonId",
ADD COLUMN     "classId" INTEGER NOT NULL,
ADD COLUMN     "subjectId" INTEGER NOT NULL,
ALTER COLUMN "startDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Parent" ALTER COLUMN "username" DROP NOT NULL,
ALTER COLUMN "surname" DROP NOT NULL,
ALTER COLUMN "createdat" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
