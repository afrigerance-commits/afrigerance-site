# Public Android test identity

This keystore is deliberately public and used ONLY for debug APKs. Store/key password: android; alias: androiddebugkey. Never sign a production release with it. Android 1.2 explicitly binds the Gradle debug signing config to this file, and CI verifies the actual APK certificate against it. Earlier delivered 1.0 and 1.1 APKs used ephemeral certificates despite the CI copy step; upgrading may require uninstalling them, which removes local data.
