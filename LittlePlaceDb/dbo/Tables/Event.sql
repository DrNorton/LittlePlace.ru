CREATE TABLE [dbo].[Event]
(
	[EventId] INT NOT NULL PRIMARY KEY Identity(1,1), 
    [Name] NVARCHAR(50) NOT NULL, 
    [Created] DATETIME NOT NULL, 
    [EventTime] DATETIME NOT NULL, 
    [Latitude] FLOAT NOT NULL, 
    [Longitude] FLOAT NOT NULL, 
    [OwnerId] BIGINT NOT NULL, 
    [Address] NVARCHAR(300) NULL, 
    [Description] NVARCHAR(500) NULL, 
    [ImageUrl] NVARCHAR(500) NULL, 
    CONSTRAINT [FK_EventOwnerId_ToUser] FOREIGN KEY ([OwnerId]) REFERENCES [User]([UserId]) 

)
