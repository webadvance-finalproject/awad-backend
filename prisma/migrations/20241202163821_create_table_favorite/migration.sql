-- CreateTable
CREATE TABLE "Favorite" (
    "userID" TEXT NOT NULL,
    "moviedID" TEXT NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("userID","moviedID")
);
