-- AlterTable
ALTER TABLE "admins" ADD COLUMN     "profileImg" TEXT;

-- AlterTable
ALTER TABLE "drivers" ADD COLUMN     "bloodGroup" TEXT,
ADD COLUMN     "licenseNo" TEXT,
ADD COLUMN     "profileImg" TEXT;

-- AlterTable
ALTER TABLE "helpers" ADD COLUMN     "bloodGroup" TEXT,
ADD COLUMN     "profileImg" TEXT;

-- AlterTable
ALTER TABLE "superAdmins" ADD COLUMN     "profileImg" TEXT;

-- AlterTable
ALTER TABLE "vehicles" ADD COLUMN     "imageUrl" TEXT;
