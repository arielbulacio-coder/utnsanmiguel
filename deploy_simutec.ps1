
$ServerIP = "149.50.130.160"
$User = "root"
$KeyPath = "c:\ProyectosGit\consultora\keys\id_ed25519_donweb"
$RemoteBase = "/root"
$App = "simutec"
$Source = "c:\ProyectosGit\utnsanmiguel_source"
$ZipPath = "$env:TEMP\deploy_simutec.zip"
$TempDir = "$env:TEMP\deploy_stage_simutec"

Write-Host "Iniciando despliegue de SIMUTEC (SimonTec.com.ar)..." -ForegroundColor Cyan

# 1. Prepare Local Files
if (Test-Path $ZipPath) { Remove-Item $ZipPath }
if (Test-Path $TempDir) { Remove-Item $TempDir -Recurse -Force }
New-Item -ItemType Directory -Path $TempDir | Out-Null

Write-Host "Copiando archivos..."
# No necesitamos node_modules ni la build local, Docker lo hara
robocopy $Source $TempDir /E /XD node_modules .git dist .next public/temp_carousel | Out-Null

Write-Host "Comprimiendo..."
Compress-Archive -Path "$TempDir\*" -DestinationPath $ZipPath

# 2. Upload App
Write-Host "Subiendo App..."
ssh -o StrictHostKeyChecking=no -i $KeyPath $User@$ServerIP "mkdir -p $RemoteBase/$App"
scp -o StrictHostKeyChecking=no -i $KeyPath $ZipPath "$User@$ServerIP`:$RemoteBase/$App.zip"

# 3. Upload Proxy Config (Since we changed it to include simutec.com.ar)
Write-Host "Sincronizando configuracion del Proxy central..."
$ProxyZip = "$env:TEMP\proxy_config.zip"
if (Test-Path $ProxyZip) { Remove-Item $ProxyZip }
Compress-Archive -Path "c:\ProyectosGit\academia\proxy\*" -DestinationPath $ProxyZip
scp -o StrictHostKeyChecking=no -i $KeyPath $ProxyZip "$User@$ServerIP`:$RemoteBase/proxy.zip"

# 4. Deploy on Server
Write-Host "Reconstruyendo contenedores y reiniciando proxy..."
$DeployCmd = "cd $RemoteBase/$App && unzip -o ../$App.zip && docker stop simutec_frontend || true && docker rm simutec_frontend || true && docker compose up -d --build --force-recreate && cd $RemoteBase && mkdir -p proxy && cd proxy && unzip -o ../proxy.zip && ./deploy.sh"

ssh -o StrictHostKeyChecking=no -i $KeyPath $User@$ServerIP $DeployCmd

# 5. Cleanup
Remove-Item $ZipPath
Remove-Item $ProxyZip
Remove-Item $TempDir -Recurse -Force

Write-Host "SIMUTEC desplegado con exito en $ServerIP!" -ForegroundColor Green
Write-Host "Acceso: http://simutec.com.ar (o http://simutec.$ServerIP.nip.io)" -ForegroundColor Green
