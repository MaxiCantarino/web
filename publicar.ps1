# Detener el script si ocurre un error para proteger tu web
$ErrorActionPreference = "Stop"

# Limpiar la pantalla para que se vea prolijo
Clear-Host

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  CENTRO DE CONTROL - EMMA PROPIEDADES" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# 1. Asegurar rama Developer y guardar lo de Antigravity
Write-Host "`n[1/3] Guardando cambios de Antigravity..." -ForegroundColor Gray
git checkout developer
git add .

# Pedir comentario al usuario
$mensaje = Read-Host " > ¿Qué cambios hiciste hoy?"
if ([string]::IsNullOrWhiteSpace($mensaje)) { $mensaje = "Actualizacion sin descripcion" }

git commit -m "$mensaje"
git push origin developer

# 2. Sincronizar con Producción (Main)
Write-Host "`n[2/3] Publicando en www.emmapropiedades.com.ar..." -ForegroundColor Yellow
git checkout main
git merge developer
git push origin main

# 3. Regresar a la mesa de trabajo
Write-Host "`n[3/3] Volviendo a rama DEVELOPER para seguir trabajando..." -ForegroundColor Gray
git checkout developer

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "  ¡EXITO! Web actualizada y respaldada." -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host " Vercel esta desplegando tus cambios ahora mismo."
Write-Host "========================================`n" -ForegroundColor Green