-- AlterTable
ALTER TABLE "History" ALTER COLUMN "listenedAt" DROP DEFAULT,
ALTER COLUMN "listenedAt" SET DATA TYPE TEXT;
