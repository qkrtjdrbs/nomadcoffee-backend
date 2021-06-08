/*
  Warnings:

  - You are about to drop the column `gitHubUsername` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "gitHubUsername",
ADD COLUMN     "githubUsername" TEXT;
