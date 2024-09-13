using Core.Utils;
using Tests.TestModels.Enums;
using Xunit;

namespace Tests.DescriptorsTests;

/// <summary>
/// Тесты для проверки получения описания полей enum
/// </summary>
public class EnumDescriptorsTests
{
    /// <summary>
    /// Проверка получения описания
    /// </summary>
    [Fact]
    public void GetDescriptions_TestEnum_CorrectResult()
    {
        var value = Descriptions.Value.GetDescription();
        Assert.Equal(Descriptions.Value.ToString(), value);

        var desc = Descriptions.Desc.GetDescription();
        Assert.Equal("Description", desc);
    }
}