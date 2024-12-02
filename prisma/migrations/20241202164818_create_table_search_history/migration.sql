-- CreateTable
CREATE TABLE "Search_History" (
    "searchHistoryID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "ressultCount" INTEGER NOT NULL DEFAULT 0,
    "queryText" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Search_History_pkey" PRIMARY KEY ("searchHistoryID")
);

-- CreateTable
CREATE TABLE "Search_Click" (
    "movieID" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "searchHistoryID" TEXT NOT NULL,

    CONSTRAINT "Search_Click_pkey" PRIMARY KEY ("searchHistoryID","movieID")
);

-- AddForeignKey
ALTER TABLE "Search_Click" ADD CONSTRAINT "Search_Click_searchHistoryID_fkey" FOREIGN KEY ("searchHistoryID") REFERENCES "Search_History"("searchHistoryID") ON DELETE RESTRICT ON UPDATE CASCADE;
