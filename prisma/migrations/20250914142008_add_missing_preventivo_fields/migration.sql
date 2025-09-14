-- AlterTable
ALTER TABLE "public"."preventivi" ADD COLUMN     "destinazione" VARCHAR(255),
ADD COLUMN     "note_operative" TEXT,
ADD COLUMN     "tipo_viaggio" VARCHAR(50);

-- AlterTable
ALTER TABLE "public"."servizi_a_terra" ADD COLUMN     "ricarico" DOUBLE PRECISION;
