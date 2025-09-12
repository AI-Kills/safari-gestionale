-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateTable
CREATE TABLE "public"."users" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(255),
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."destinazioni" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "nome" VARCHAR(255) NOT NULL,

    CONSTRAINT "destinazioni_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."banche" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "nome" VARCHAR(255) NOT NULL,

    CONSTRAINT "banche_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."clienti" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "nome" VARCHAR(255),
    "cognome" VARCHAR(255),
    "tel" VARCHAR(20),
    "indirizzo" VARCHAR(255),
    "cap" VARCHAR(10),
    "citta" VARCHAR(255),
    "cf" VARCHAR(16),
    "email" VARCHAR(255) NOT NULL,
    "tipo" VARCHAR(20),
    "provenienza" VARCHAR(20),
    "collegato" VARCHAR(255),
    "note" TEXT,
    "data_di_nascita" DATE,
    "luogo_nascita" VARCHAR(255),
    "provincia_nascita" VARCHAR(2),
    "numero_passaporto" VARCHAR(50),
    "data_scadenza_passaporto" DATE,
    "nazionalita" VARCHAR(100),
    "provincia" VARCHAR(2),
    "sesso" VARCHAR(1),

    CONSTRAINT "clienti_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."fornitori" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "nome" VARCHAR(255) NOT NULL,
    "valuta" VARCHAR(10),

    CONSTRAINT "fornitori_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."preventivi" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "id_cliente" UUID NOT NULL,
    "percentuale_ricarico" DOUBLE PRECISION,
    "note" TEXT,
    "brand" VARCHAR(255),
    "adulti" INTEGER,
    "bambini" INTEGER,
    "riferimento" VARCHAR(255),
    "data_partenza" DATE,
    "operatore" VARCHAR(255),
    "feedback" TEXT,
    "stato" VARCHAR(20),
    "data" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "numero_preventivo" VARCHAR(255),

    CONSTRAINT "preventivi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."servizi_a_terra" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "id_preventivo" UUID NOT NULL,
    "id_fornitore" UUID,
    "id_destinazione" UUID,
    "descrizione" TEXT,
    "data" DATE,
    "numero_notti" INTEGER,
    "numero_camere" INTEGER,
    "totale" DOUBLE PRECISION,
    "valuta" VARCHAR(10),
    "cambio" DOUBLE PRECISION,
    "servizio_aggiuntivo" BOOLEAN,

    CONSTRAINT "servizi_a_terra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."voli" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "id_preventivo" UUID NOT NULL,
    "id_fornitore" UUID,
    "compagnia_aerea" VARCHAR(255),
    "descrizione" TEXT,
    "data_partenza" DATE,
    "data_arrivo" DATE,
    "totale" DOUBLE PRECISION,
    "ricarico" DOUBLE PRECISION,
    "numero" INTEGER,
    "valuta" VARCHAR(10),
    "cambio" DOUBLE PRECISION,

    CONSTRAINT "voli_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."assicurazioni" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "id_preventivo" UUID NOT NULL,
    "id_fornitore" UUID,
    "assicurazione" VARCHAR(255),
    "netto" DOUBLE PRECISION,
    "ricarico" DOUBLE PRECISION,
    "numero" INTEGER,

    CONSTRAINT "assicurazioni_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."preventivi_al_cliente" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "id_preventivo" UUID,
    "descrizione_viaggio" TEXT,

    CONSTRAINT "preventivi_al_cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."preventivi_al_cliente_row" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "id_preventivo_al_cliente" UUID NOT NULL,
    "senza_assicurazione" BOOLEAN,
    "destinazione" VARCHAR(255),
    "descrizione" TEXT,
    "individuale" DOUBLE PRECISION,
    "numero" INTEGER,

    CONSTRAINT "preventivi_al_cliente_row_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."blog_article_comments" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "article_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "date_created" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blog_article_comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."blog_articles_ai" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "date_created" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blog_articles_ai_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."customers" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "image_url" VARCHAR(255) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."incassi_partecipanti" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "id_partecipante" UUID NOT NULL,
    "id_banca" UUID,
    "importo" DOUBLE PRECISION,
    "data_scadenza" DATE,
    "data_incasso" DATE,

    CONSTRAINT "incassi_partecipanti_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."invoices" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "customer_id" UUID NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "date" DATE NOT NULL,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pagamenti_assicurazioni" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "id_assicurazione" UUID NOT NULL,
    "id_banca" UUID,
    "importo" DOUBLE PRECISION,
    "data_scadenza" DATE,
    "data_incasso" DATE,

    CONSTRAINT "pagamenti_assicurazioni_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pagamenti_servizi_a_terra" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "id_servizio_a_terra" UUID NOT NULL,
    "id_banca" UUID,
    "importo" DOUBLE PRECISION,
    "data_scadenza" DATE,
    "data_incasso" DATE,

    CONSTRAINT "pagamenti_servizi_a_terra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pagamenti_voli" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "id_volo" UUID NOT NULL,
    "id_banca" UUID,
    "importo" DOUBLE PRECISION,
    "data_scadenza" DATE,
    "data_incasso" DATE,

    CONSTRAINT "pagamenti_voli_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."partecipanti" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "id_preventivo" UUID NOT NULL,
    "nome" VARCHAR(255),
    "cognome" VARCHAR(255),
    "tot_quota" DOUBLE PRECISION,

    CONSTRAINT "partecipanti_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pratiche" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "id_preventivo" UUID NOT NULL,
    "id_cliente" UUID,
    "data_conferma" DATE,
    "data_partenza" DATE,
    "data_rientro" DATE,
    "note" TEXT,
    "numero_passeggeri" INTEGER,
    "totale" DOUBLE PRECISION,

    CONSTRAINT "pratiche_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."preventivi_mostrare_clienti" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "id_preventivo" UUID NOT NULL,
    "id_destinazione" UUID NOT NULL,
    "descrizione" TEXT,
    "tipo" VARCHAR(50),
    "costo_individuale" DOUBLE PRECISION,
    "importo_vendita" DOUBLE PRECISION,
    "totale" DOUBLE PRECISION,

    CONSTRAINT "preventivi_mostrare_clienti_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."revenue" (
    "month" VARCHAR(4) NOT NULL,
    "revenue" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "destinazioni_nome_key" ON "public"."destinazioni"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "banche_nome_key" ON "public"."banche"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "clienti_email_key" ON "public"."clienti"("email");

-- CreateIndex
CREATE UNIQUE INDEX "fornitori_nome_key" ON "public"."fornitori"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "preventivi_numero_preventivo_key" ON "public"."preventivi"("numero_preventivo");

-- CreateIndex
CREATE UNIQUE INDEX "revenue_month_key" ON "public"."revenue"("month");

-- AddForeignKey
ALTER TABLE "public"."preventivi" ADD CONSTRAINT "preventivi_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "public"."clienti"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."servizi_a_terra" ADD CONSTRAINT "servizi_a_terra_id_destinazione_fkey" FOREIGN KEY ("id_destinazione") REFERENCES "public"."destinazioni"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."servizi_a_terra" ADD CONSTRAINT "servizi_a_terra_id_fornitore_fkey" FOREIGN KEY ("id_fornitore") REFERENCES "public"."fornitori"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."servizi_a_terra" ADD CONSTRAINT "servizi_a_terra_id_preventivo_fkey" FOREIGN KEY ("id_preventivo") REFERENCES "public"."preventivi"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."voli" ADD CONSTRAINT "voli_id_fornitore_fkey" FOREIGN KEY ("id_fornitore") REFERENCES "public"."fornitori"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."voli" ADD CONSTRAINT "voli_id_preventivo_fkey" FOREIGN KEY ("id_preventivo") REFERENCES "public"."preventivi"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."assicurazioni" ADD CONSTRAINT "assicurazioni_id_fornitore_fkey" FOREIGN KEY ("id_fornitore") REFERENCES "public"."fornitori"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."assicurazioni" ADD CONSTRAINT "assicurazioni_id_preventivo_fkey" FOREIGN KEY ("id_preventivo") REFERENCES "public"."preventivi"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."preventivi_al_cliente" ADD CONSTRAINT "preventivi_al_cliente_id_preventivo_fkey" FOREIGN KEY ("id_preventivo") REFERENCES "public"."preventivi"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."preventivi_al_cliente_row" ADD CONSTRAINT "preventivi_al_cliente_row_id_preventivo_al_cliente_fkey" FOREIGN KEY ("id_preventivo_al_cliente") REFERENCES "public"."preventivi_al_cliente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."incassi_partecipanti" ADD CONSTRAINT "incassi_partecipanti_id_banca_fkey" FOREIGN KEY ("id_banca") REFERENCES "public"."banche"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."incassi_partecipanti" ADD CONSTRAINT "incassi_partecipanti_id_partecipante_fkey" FOREIGN KEY ("id_partecipante") REFERENCES "public"."partecipanti"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."pagamenti_assicurazioni" ADD CONSTRAINT "pagamenti_assicurazioni_id_assicurazione_fkey" FOREIGN KEY ("id_assicurazione") REFERENCES "public"."assicurazioni"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."pagamenti_assicurazioni" ADD CONSTRAINT "pagamenti_assicurazioni_id_banca_fkey" FOREIGN KEY ("id_banca") REFERENCES "public"."banche"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."pagamenti_servizi_a_terra" ADD CONSTRAINT "pagamenti_servizi_a_terra_id_banca_fkey" FOREIGN KEY ("id_banca") REFERENCES "public"."banche"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."pagamenti_servizi_a_terra" ADD CONSTRAINT "pagamenti_servizi_a_terra_id_servizio_a_terra_fkey" FOREIGN KEY ("id_servizio_a_terra") REFERENCES "public"."servizi_a_terra"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."pagamenti_voli" ADD CONSTRAINT "pagamenti_voli_id_banca_fkey" FOREIGN KEY ("id_banca") REFERENCES "public"."banche"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."pagamenti_voli" ADD CONSTRAINT "pagamenti_voli_id_volo_fkey" FOREIGN KEY ("id_volo") REFERENCES "public"."voli"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."partecipanti" ADD CONSTRAINT "partecipanti_id_preventivo_fkey" FOREIGN KEY ("id_preventivo") REFERENCES "public"."preventivi"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."pratiche" ADD CONSTRAINT "pratiche_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "public"."clienti"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."pratiche" ADD CONSTRAINT "pratiche_id_preventivo_fkey" FOREIGN KEY ("id_preventivo") REFERENCES "public"."preventivi"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
