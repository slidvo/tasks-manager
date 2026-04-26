-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "completed_at" TIMESTAMP(3),
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "spent_time" INTEGER;

COMMENT ON COLUMN "Task"."completed_at" IS 'Task completion date/time (UTC). Null means not completed.';
COMMENT ON COLUMN "Task"."spent_time" IS 'Time spent on the task (minutes).';
