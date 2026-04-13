/*
  Warnings:

  - Made the column `uuid` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- fill empty uuids
UPDATE "User"
SET "uuid" = gen_random_uuid()
WHERE "uuid" IS NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "uuid" SET NOT NULL;
