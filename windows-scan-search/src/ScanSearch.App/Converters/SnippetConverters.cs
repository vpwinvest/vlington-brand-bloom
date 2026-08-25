using System.Globalization;
using Avalonia.Data.Converters;
using Avalonia.Media;

namespace ScanSearch.App.Converters;

public sealed class MatchToFontWeightConverter : IValueConverter
{
    public static readonly MatchToFontWeightConverter Instance = new();

    public object Convert(object? value, Type targetType, object? parameter, CultureInfo culture) =>
        value is true ? FontWeight.Bold : FontWeight.Normal;

    public object ConvertBack(object? value, Type targetType, object? parameter, CultureInfo culture) =>
        throw new NotSupportedException();
}

public sealed class MatchToBrushConverter : IValueConverter
{
    public static readonly MatchToBrushConverter Instance = new();

    public object Convert(object? value, Type targetType, object? parameter, CultureInfo culture) =>
        value is true ? Brushes.OrangeRed : Brushes.Black;

    public object ConvertBack(object? value, Type targetType, object? parameter, CultureInfo culture) =>
        throw new NotSupportedException();
}
