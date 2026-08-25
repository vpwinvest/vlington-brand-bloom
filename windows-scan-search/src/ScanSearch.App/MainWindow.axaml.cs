using System.Diagnostics;
using Avalonia.Controls;
using Avalonia.Platform.Storage;
using ScanSearch.App.ViewModels;

namespace ScanSearch.App;

public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
    }

    private MainViewModel ViewModel => (MainViewModel)DataContext!;

    private async void OnImportFolderClick(object? sender, Avalonia.Interactivity.RoutedEventArgs e)
    {
        var folders = await StorageProvider.OpenFolderPickerAsync(new FolderPickerOpenOptions
        {
            Title = "Selecione a pasta com os documentos digitalizados",
            AllowMultiple = false,
        });

        var folder = folders.FirstOrDefault();
        if (folder?.TryGetLocalPath() is { } path)
        {
            await ViewModel.StartImportAsync(path);
        }
    }

    private void OnOpenClick(object? sender, Avalonia.Interactivity.RoutedEventArgs e)
    {
        var path = ViewModel.SelectedResult?.Result.Path;
        if (path is null || !File.Exists(path)) return;

        Process.Start(new ProcessStartInfo(path) { UseShellExecute = true });
    }

    private async void OnSaveAsClick(object? sender, Avalonia.Interactivity.RoutedEventArgs e)
    {
        var result = ViewModel.SelectedResult?.Result;
        if (result is null || !File.Exists(result.Path)) return;

        var file = await StorageProvider.SaveFilePickerAsync(new FilePickerSaveOptions
        {
            Title = "Guardar cópia do documento",
            SuggestedFileName = result.FileName,
        });

        if (file?.TryGetLocalPath() is { } destinationPath)
        {
            await ViewModel.SaveDocumentCopyAsync(result.Path, destinationPath);
        }
    }

    private void OnRevealClick(object? sender, Avalonia.Interactivity.RoutedEventArgs e)
    {
        var path = ViewModel.SelectedResult?.Result.Path;
        if (path is null || !File.Exists(path)) return;

        if (OperatingSystem.IsWindows())
        {
            Process.Start(new ProcessStartInfo("explorer.exe", $"/select,\"{path}\"") { UseShellExecute = true });
        }
        else if (OperatingSystem.IsMacOS())
        {
            Process.Start(new ProcessStartInfo("open", $"-R \"{path}\"") { UseShellExecute = true });
        }
        else
        {
            var directory = Path.GetDirectoryName(path);
            if (directory is not null)
            {
                Process.Start(new ProcessStartInfo(directory) { UseShellExecute = true });
            }
        }
    }
}
