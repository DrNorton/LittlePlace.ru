CREATE TABLE [dbo].[PositionHistory] (
    [PositionHistoryId] BIGINT   IDENTITY (1, 1) NOT NULL,
    [UserId]            BIGINT   NOT NULL,
    [PositionId]        BIGINT   NOT NULL,
    [Created]           DATETIME NULL,
    CONSTRAINT [PK_PositionHistory] PRIMARY KEY CLUSTERED ([PositionHistoryId] ASC),
    CONSTRAINT [FK_PositionHistory_Position] FOREIGN KEY ([PositionId]) REFERENCES [dbo].[Position] ([PositionId]),
    CONSTRAINT [FK_PositionHistory_User] FOREIGN KEY ([UserId]) REFERENCES [dbo].[User] ([UserId])
);

