/*
  Warnings:

  - You are about to drop the column `imageURL` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "imageURL",
ADD COLUMN     "imageUrl" TEXT;
