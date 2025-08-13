Param()

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$bmp = New-Object System.Drawing.Bitmap(64,64)
$gfx = [System.Drawing.Graphics]::FromImage($bmp)
$gfx.Clear([System.Drawing.Color]::FromArgb(0,122,204))

$hicon = $bmp.GetHicon()
$icon = [System.Drawing.Icon]::FromHandle($hicon)

$dir = "src-tauri\icons"
if (-not (Test-Path $dir)) {
  New-Item -ItemType Directory -Force -Path $dir | Out-Null
}

$outPath = Join-Path $dir "icon.ico"
$fs = [System.IO.File]::Open($outPath, [System.IO.FileMode]::Create)
$icon.Save($fs)
$fs.Close()

$gfx.Dispose()
$bmp.Dispose()

Write-Host "Icon written to $outPath"


