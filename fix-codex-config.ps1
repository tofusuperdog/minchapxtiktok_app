$path = Join-Path $HOME ".codex\config.toml"

$lines = @(
  'windows_wsl_setup_acknowledged = true',
  'model = "gpt-5.4"',
  'model_reasoning_effort = "medium"',
  'personality = "pragmatic"',
  'experimental_use_rmcp_client = true',
  '',
  '[windows]',
  'sandbox = "unelevated"',
  '',
  "[projects.'D:\work\minchapxtiktokapp']",
  'trust_level = "trusted"',
  '',
  '[mcp_servers.supabase]',
  'url = "https://mcp.supabase.com/mcp?project_ref=vxskkaxvlgycokdtuocj"'
)

Set-Content -LiteralPath $path -Value $lines
