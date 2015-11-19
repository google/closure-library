@ECHO OFF
:: Enable CORS restriction in IE8.
REG ADD "HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\Internet Settings\Zones\3" /v 1406 /t REG_DWORD /d 3 /f
