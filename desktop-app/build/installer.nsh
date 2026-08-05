!macro customInstall
  ; Create startup shortcut for all users
  SetShellVarContext all
  CreateShortcut "$SMSTARTUP\OmniControl.lnk" "$INSTDIR\${PRODUCT_FILENAME}.exe" "" "$INSTDIR\${PRODUCT_FILENAME}.exe" 0 SW_SHOWMINIMIZED
!macroend

!macro customUnInstall
  ; Remove startup shortcut
  SetShellVarContext all
  Delete "$SMSTARTUP\OmniControl.lnk"
!macroend
