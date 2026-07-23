BEGIN TRY

BEGIN TRAN;

-- CreateIndex
CREATE NONCLUSTERED INDEX [Task_projectId_idx] ON [dbo].[Task]([projectId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Task_status_idx] ON [dbo].[Task]([status]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Task_priority_idx] ON [dbo].[Task]([priority]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Task_dueDate_idx] ON [dbo].[Task]([dueDate]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
