/*
  Warnings:

  - A unique constraint covering the columns `[entity_type,entity_id]` on the table `ContentMetric` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ContentMetric_entity_type_entity_id_key" ON "ContentMetric"("entity_type", "entity_id");
