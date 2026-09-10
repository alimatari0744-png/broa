Add-Type -AssemblyName System.Drawing

function New-ArgbBitmap([int]$w, [int]$h) {
  New-Object System.Drawing.Bitmap $w, $h, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
}

function Remove-LightBg([System.Drawing.Bitmap]$src) {
  $out = New-ArgbBitmap $src.Width $src.Height
  for ($y = 0; $y -lt $src.Height; $y++) {
    for ($x = 0; $x -lt $src.Width; $x++) {
      $c = $src.GetPixel($x, $y)
      $luma = (0.299 * $c.R) + (0.587 * $c.G) + (0.114 * $c.B)
      $chroma = [Math]::Max($c.R, [Math]::Max($c.G, $c.B)) - [Math]::Min($c.R, [Math]::Min($c.G, $c.B))
      $a = [int]$c.A
      if ($a -lt 8) { $a = 0 }
      elseif ($luma -ge 235 -and $chroma -le 22) { $a = 0 }
      elseif ($luma -ge 215 -and $chroma -le 16) { $a = [int][Math]::Max(0, [Math]::Min(255, (235 - $luma) * 10)) }
      $out.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($a, $c.R, $c.G, $c.B))
    }
  }
  return $out
}

function Keep-WhiteOnTransparent([System.Drawing.Bitmap]$src) {
  # White/near-white logo marks become opaque white; navy/dark becomes transparent
  $out = New-ArgbBitmap $src.Width $src.Height
  for ($y = 0; $y -lt $src.Height; $y++) {
    for ($x = 0; $x -lt $src.Width; $x++) {
      $c = $src.GetPixel($x, $y)
      $luma = (0.299 * $c.R) + (0.587 * $c.G) + (0.114 * $c.B)
      if ($luma -ge 170) {
        $strength = [int][Math]::Min(255, [Math]::Max(0, ($luma - 140) * 3.2))
        $out.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($strength, 255, 255, 255))
      } else {
        $out.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
      }
    }
  }
  return $out
}

function Crop-Opaque([System.Drawing.Bitmap]$src, [int]$pad) {
  $minX = $src.Width; $minY = $src.Height; $maxX = -1; $maxY = -1
  for ($y = 0; $y -lt $src.Height; $y++) {
    for ($x = 0; $x -lt $src.Width; $x++) {
      if ($src.GetPixel($x, $y).A -gt 20) {
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
  $rect = New-Object System.Drawing.Rectangle $minX, $minY, ($maxX - $minX + 1), ($maxY - $minY + 1)
  return $src.Clone($rect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
}

function Scale-Bitmap([System.Drawing.Bitmap]$src, [int]$targetW) {
  $ratio = $targetW / [double]$src.Width
  $targetH = [int][Math]::Round($src.Height * $ratio)
  $out = New-ArgbBitmap $targetW $targetH
  $g = [System.Drawing.Graphics]::FromImage($out)
  $g.Clear([System.Drawing.Color]::Transparent)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $g.DrawImage($src, 0, 0, $targetW, $targetH)
  $g.Dispose()
  return $out
}

function Add-NavyPlate([System.Drawing.Bitmap]$whiteLogo, [int]$padX, [int]$padY, [int]$radius) {
  $w = $whiteLogo.Width + ($padX * 2)
  $h = $whiteLogo.Height + ($padY * 2)
  $out = New-ArgbBitmap $w $h
  $g = [System.Drawing.Graphics]::FromImage($out)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.Clear([System.Drawing.Color]::Transparent)
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $d = $radius * 2
  $path.AddArc(0, 0, $d, $d, 180, 90)
  $path.AddArc($w - $d, 0, $d, $d, 270, 90)
  $path.AddArc($w - $d, $h - $d, $d, $d, 0, 90)
  $path.AddArc(0, $h - $d, $d, $d, 90, 90)
  $path.CloseFigure()
  $brush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 0, 26, 61))
  $g.FillPath($brush, $path)
  $g.DrawImage($whiteLogo, $padX, $padY, $whiteLogo.Width, $whiteLogo.Height)
  $brush.Dispose(); $path.Dispose(); $g.Dispose()
  return $out
}

function Save-Png([System.Drawing.Bitmap]$bmp, [string]$path) {
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
}

$outDir = 'C:\cursor\BROA\public\images\partners'
$assets = 'C:\Users\alima\.cursor\projects\c-cursor-BROA\assets'

# Tasannam
$src = [System.Drawing.Bitmap]::FromFile((Join-Path $assets 'tasannam-hq.png'))
$cut = Remove-LightBg $src; $src.Dispose()
$crop = Crop-Opaque $cut 12; $cut.Dispose()
$scaled = if ($crop.Width -lt 900) { Scale-Bitmap $crop 1000 } else { $crop.Clone() }
if ($scaled -ne $crop) { $crop.Dispose() }
Save-Png $scaled (Join-Path $outDir 'tasannam.png')
Write-Output "tasannam $($scaled.Width)x$($scaled.Height)"; $scaled.Dispose()

# Rawabi emblem
$src = [System.Drawing.Bitmap]::FromFile((Join-Path $assets 'rawabi-hq.png'))
$cut = Remove-LightBg $src; $src.Dispose()
$crop = Crop-Opaque $cut 10; $cut.Dispose()
$scaled = if ($crop.Width -lt 700) { Scale-Bitmap $crop 800 } else { $crop.Clone() }
if ($scaled -ne $crop) { $crop.Dispose() }
Save-Png $scaled (Join-Path $outDir 'rawabi.png')
Write-Output "rawabi $($scaled.Width)x$($scaled.Height)"; $scaled.Dispose()

# Azhar: white mark on navy plate (readable on cream site)
$src = [System.Drawing.Bitmap]::FromFile((Join-Path $assets 'azhar-hq.png'))
$white = Keep-WhiteOnTransparent $src; $src.Dispose()
$crop = Crop-Opaque $white 8; $white.Dispose()
$scaled = Scale-Bitmap $crop 900; $crop.Dispose()
$plated = Add-NavyPlate $scaled 56 40 36; $scaled.Dispose()
Save-Png $plated (Join-Path $outDir 'azhar.png')
Write-Output "azhar $($plated.Width)x$($plated.Height)"; $plated.Dispose()

# Kunooz: white mark on navy plate
$src = [System.Drawing.Bitmap]::FromFile((Join-Path $assets 'kunooz-hq.png'))
$white = Keep-WhiteOnTransparent $src; $src.Dispose()
$crop = Crop-Opaque $white 8; $white.Dispose()
$scaled = Scale-Bitmap $crop 900; $crop.Dispose()
$plated = Add-NavyPlate $scaled 56 40 36; $scaled.Dispose()
Save-Png $plated (Join-Path $outDir 'kunooz.png')
Write-Output "kunooz $($plated.Width)x$($plated.Height)"; $plated.Dispose()

Write-Output 'done'
