CREATE TABLE [dbo].[Session] (
    [SessionId]   UNIQUEIDENTIFIER NOT NULL,
    [Created]     DATETIME         NULL,
    [EndLifeTime] DATETIME         NULL,
    [UserId]      BIGINT           NOT NULL,
    CONSTRAINT [PK_Session] PRIMARY KEY CLUSTERED ([SessionId] ASC),
    CONSTRAINT [FK_Session_User] FOREIGN KEY ([UserId]) REFERENCES [dbo].[User] ([UserId])
);

