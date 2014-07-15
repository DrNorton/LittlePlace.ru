CREATE TABLE [dbo].[News]
(
	[Id] INT NOT NULL  IDENTITY (1, 1)  PRIMARY KEY, 
    [Text] NTEXT NOT NULL, 
    [Image] VARCHAR(150) NULL, 
    [CreatedTime] DATETIME NULL, 
    [Title] NVARCHAR(150) NULL 
)
