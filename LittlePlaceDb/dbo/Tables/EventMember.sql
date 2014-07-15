CREATE TABLE [dbo].[EventMember]
(
	[Id] INT NOT NULL PRIMARY KEY Identity(1,1), 
    [MemberId] BIGINT NOT NULL, 
    [EventId] INT NOT NULL, 
    CONSTRAINT [FK_User_EventMemeber] FOREIGN KEY ([MemberId]) REFERENCES [User]([UserId]), 
    CONSTRAINT [FK_EventMember_EventId] FOREIGN KEY ([EventId]) REFERENCES [Event]([EventId]) ON DELETE CASCADE
)
