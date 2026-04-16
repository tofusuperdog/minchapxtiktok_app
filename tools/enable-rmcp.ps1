$configPath = Join-Path $HOME ".codex\config.toml"

$hasFlag = Select-String -Path $configPath -Pattern "^experimental_use_rmcp_client\s*=\s*true$" -Quiet

if (-not $hasFlag) {
  Add-Content -LiteralPath $configPath -Value "`r`nexperimental_use_rmcp_client = true"
}
