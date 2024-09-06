/*
  Warnings:

  - You are about to drop the column `cellnumber` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "cellnumber",
ADD COLUMN     "cellphone" TEXT;
