# Public Android test identity

This keystore is deliberately public and used ONLY for debug APKs. Store/key password: android; alias: androiddebugkey. Never sign a production release with it. CI copies it to the standard debug keystore path so future test APKs can update one another. The original 1.0 CI-generated key was ephemeral, so the first upgrade requires uninstalling 1.0 if its signature differs.
