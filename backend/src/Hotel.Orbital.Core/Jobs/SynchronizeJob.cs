using Core.Interfaces;
using Quartz;

namespace Core.Jobs;

/// <summary>
/// Фоновая задача для синхронизации номеров с BNOVO
/// </summary>
public class SynchronizeJob : IJob
{
    /// <summary/>
    private readonly IIntegrationService _integrationService;

    /// <summary/>
    public SynchronizeJob(IIntegrationService integrationService)
    {
        _integrationService = integrationService;
    }
    
    /// <summary>
    /// Выполнение задачи
    /// </summary>
    /// <param name="context">Контекст задачи</param>
    public async Task Execute(IJobExecutionContext context)
    {
        await _integrationService.Synchronize();
    }
}