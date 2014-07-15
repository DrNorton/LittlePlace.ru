CREATE TABLE [dbo].[FriendLink] (
    [LinkId]   BIGINT   IDENTITY (1, 1) NOT NULL,
    [OwnerId]  BIGINT   NOT NULL,
    [FriendId] BIGINT   NOT NULL,
    [Created]  DATETIME NULL,
    CONSTRAINT [PK_FriendLink] PRIMARY KEY CLUSTERED ([LinkId] ASC),
    CONSTRAINT [FK_FriendLink_User] FOREIGN KEY ([FriendId]) REFERENCES [dbo].[User] ([UserId]),
    CONSTRAINT [FK_FriendLink_User1] FOREIGN KEY ([OwnerId]) REFERENCES [dbo].[User] ([UserId])
);

