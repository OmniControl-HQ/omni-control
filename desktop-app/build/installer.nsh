!macro customInstall
  ; Create startup shortcut for all users by default
  SetShellVarContext all
  CreateShortcut "$SMSTARTUP\OmniControl.lnk" "$INSTDIR\${PRODUCT_FILENAME}.exe" "" "$INSTDIR\${PRODUCT_FILENAME}.exe" 0 SW_SHOWMINIMIZED "" "OmniControl - Remote PC Control Server"
  
  ; Also create current user startup for redundancy
  SetShellVarContext current
  CreateShortcut "$SMSTARTUP\OmniControl.lnk" "$INSTDIR\${PRODUCT_FILENAME}.exe" "" "$INSTDIR\${PRODUCT_FILENAME}.exe" 0 SW_SHOWMINIMIZED "" "OmniControl - Remote PC Control Server"
!macroend

!macro customUnInstall
  ; Remove startup shortcuts from both contexts
  SetShellVarContext all
  Delete "$SMSTARTUP\OmniControl.lnk"
  
  SetShellVarContext current
  Delete "$SMSTARTUP\OmniControl.lnk"
!macroend
