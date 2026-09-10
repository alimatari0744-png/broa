Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = 'Stop'

function New-ArgbBitmap([int]$width, [int]$height) {
  return New-Object System.Drawing.Bitmap $width, $height, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
}

function Get-Luma([int]$r, [int]$g, [int]$b) {
  return (0.299 * $r) + (0.587 * $g) + (0.114 * $b)
}

function Get-Chroma([int]$r, [int]$g, [int]$b) {
  $max = [Math]::Max($r, [Math]::Max($g, $b))
  $min = [Math]::Min($r, [Math]::Min($g, $b))
  return $max - $min
}

function Remove-LightBackground([System.Drawing.Bitmap]$src) {
  $out = New-ArgbBitmap $src.Width $src.Height
  for ($y = 0; $y -lt $src.Height; $y++) {
    for ($x = 0; $x -lt $src.Width; $x++) {
      $c = $src.GetPixel($x, $y)
      $luma = Get-Luma $c.R $c.G $c.B
      $chroma = Get-Chroma $c.R $c.G $c.B
      $alpha = 255
      if ($luma -ge 232 -and $chroma -le 28) {
        $alpha = 0
      } elseif ($luma -ge 210 -and $chroma -le 18) {
        $alpha = [int][Math]::Max(0, [Math]::Min(255, (232 - $luma) * 8))
      }
      $out.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $c.R, $c.G, $c.B))
    }
  }
  return $out
}

function Crop-Opaque([System.Drawing.Bitmap]$src, [int]$pad) {
  $minX = $src.Width
  $minY = $src.Height
  $maxX = -1
  $maxY = -1
  for ($y = 0; $y -lt $src.Height; $y++) {
    for ($x = 0; $x -lt $src.Width; $x++) {
      if ($src.GetPixel($x, $y).A -gt 24) {
        if ($x -lt $minX) { $minX = $x }
        if ($y -lt $minY) { $minY = $y }
        if ($x -gt $maxX) { $maxX = $x }
        if ($y -gt $maxY) { $maxY = $y }
      }
    }
  }
  if ($maxX -lt 0) { return $src.Clone() }

  $minX = [Math]::Max(0, $minX - $pad)
  $minY = [Math]::Max(0, $minY - $pad)
  $maxX = [Math]::Min($src.Width - 1, $maxX + $pad)
  $maxY = [Math]::Min($src.Height - 1, $maxY + $pad)
  $w = $maxX - $minX + 1
  $h = $maxY - $minY + 1
  $rect = New-Object System.Drawing.Rectangle $minX, $minY, $w, $h
  return $src.Clone($rect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
}

function Crop-Rect([System.Drawing.Bitmap]$src, [double]$x0, [double]$y0, [double]$x1, [double]$y1) {
  $left = [int][Math]::Floor($src.Width * $x0)
  $top = [int][Math]::Floor($src.Height * $y0)
  $right = [int][Math]::Ceiling($src.Width * $x1)
  $bottom = [int][Math]::Ceiling($src.Height * $y1)
  $w = [Math]::Max(1, $right - $left)
  $h = [Math]::Max(1, $bottom - $top)
  $rect = New-Object System.Drawing.Rectangle $left, $top, $w, $h
  return $src.Clone($rect, $src.PixelFormat)
}

function Add-RoundedCorners([System.Drawing.Bitmap]$src, [int]$radius) {
  $out = New-ArgbBitmap $src.Width $src.Height
  $g = [System.Drawing.Graphics]::FromImage($out)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.Clear([System.Drawing.Color]::Transparent)
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $d = $radius * 2
  $path.AddArc(0, 0, $d, $d, 180, 90)
  $path.AddArc($src.Width - $d, 0, $d, $d, 270, 90)
  $path.AddArc($src.Width - $d, $src.Height - $d, $d, $d, 0, 90)
  $path.AddArc(0, $src.Height - $d, $d, $d, 90, 90)
  $path.CloseFigure()
  $g.SetClip($path)
  $g.DrawImage($src, 0, 0, $src.Width, $src.Height)
  $g.Dispose()
  $path.Dispose()
  return $out
}

function Save-Png([System.Drawing.Bitmap]$bmp, [string]$path) {
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
}

$outDir = 'C:\cursor\BROA\public\images\partners'
$tasannamSrc = 'C:\Users\alima\.cursor\projects\c-cursor-BROA\assets\c__Users_alima_AppData_Roaming_Cursor_User_workspaceStorage_d8f4faba6e0bd75785f6d2361d103a82_images__D53C265B-1D6D-4D58-A5CE-930F9EE04977_-8c2c8177-8334-4b04-92e3-98ff602242a8.png'
$rawabiSrc = 'C:\Users\alima\.cursor\projects\c-cursor-BROA\assets\c__Users_alima_AppData_Roaming_Cursor_User_workspaceStorage_d8f4faba6e0bd75785f6d2361d103a82_images__7C67456F-4330-4226-BC77-1FA4FE5FB986_-bf8cfa42-0ce2-44c2-a534-340efbed2fc8.png'
$azharSrc = 'C:\Users\alima\.cursor\projects\c-cursor-BROA\assets\c__Users_alima_AppData_Roaming_Cursor_User_workspaceStorage_d8f4faba6e0bd75785f6d2361d103a82_images__04E11807-20EF-44CE-A223-36BD978804E9_-592fed83-8c9b-48be-890f-2c77bf84c9f9.png'

# Tasannam: full lockup, gray background removed
$src = [System.Drawing.Bitmap]::FromFile($tasannamSrc)
$cut = Remove-LightBackground $src
$src.Dispose()
$crop = Crop-Opaque $cut 10
$cut.Dispose()
Save-Png $crop (Join-Path $outDir 'tasannam.png')
Write-Output "tasannam $($crop.Width)x$($crop.Height)"
$crop.Dispose()

# Rawabi: distinctive emblem only (arch + palm)
$src = [System.Drawing.Bitmap]::FromFile($rawabiSrc)
$emblem = Crop-Rect $src 0.22 0.34 0.78 0.78
$src.Dispose()
$cut = Remove-LightBackground $emblem
$emblem.Dispose()
$crop = Crop-Opaque $cut 8
$cut.Dispose()
Save-Png $crop (Join-Path $outDir 'rawabi.png')
Write-Output "rawabi $($crop.Width)x$($crop.Height)"
$crop.Dispose()

# Azhar: keep navy lockup (brand color), crop and round corners
$src = [System.Drawing.Bitmap]::FromFile($azharSrc)
$crop = Crop-Opaque $src 0
$src.Dispose()
$round = Add-RoundedCorners $crop 28
$crop.Dispose()
Save-Png $round (Join-Path $outDir 'azhar.png')
Write-Output "azhar $($round.Width)x$($round.Height)"
$round.Dispose()

Write-Output 'done'
