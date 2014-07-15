CREATE TABLE [dbo].[User] (
    [UserId]       BIGINT           IDENTITY (1, 1) NOT NULL,
    [Login]        NVARCHAR (50)    NOT NULL,
    [Pass]         NVARCHAR (300)   NOT NULL,
    [Created]      DATETIME         NULL,
    [SessionId]    UNIQUEIDENTIFIER NULL,
    [LastPosition] BIGINT           NULL,
    [Photo]        VARCHAR (MAX)    NULL,
    [FirstName] NVARCHAR(50) NULL, 
    [LastName] NVARCHAR(10) NULL, 
    [Email] NVARCHAR(100) NULL, 
    [TelephoneNumber] NVARCHAR(12) NULL, 
    [TextStatus] VARCHAR(999) NULL, 
    CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED ([UserId] ASC),
    CONSTRAINT [FK_User_LastPosition] FOREIGN KEY ([LastPosition]) REFERENCES [dbo].[Position] ([PositionId]),
    CONSTRAINT [FK_User_Session] FOREIGN KEY ([SessionId]) REFERENCES [dbo].[Session] ([SessionId])
);

