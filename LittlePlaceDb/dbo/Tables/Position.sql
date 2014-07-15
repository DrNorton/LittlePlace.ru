CREATE TABLE [dbo].[Position] (
    [PositionId]  BIGINT         IDENTITY (1, 1) NOT NULL,
    [Latitude]    FLOAT (53)     NOT NULL,
    [Longitude]   FLOAT (53)     NOT NULL,
    [Time]        DATETIME       NOT NULL,
    [Description] NVARCHAR (300) NULL,
    CONSTRAINT [PK_Position] PRIMARY KEY CLUSTERED ([PositionId] ASC)
);

