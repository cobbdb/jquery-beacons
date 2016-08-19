# Change Log
All notable changes to the project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## Version 2
#### [unreleased]
- Added this change log.
- Removed default/shortcut binding.
- Removed polling with setTimeout().
- Added binding with requestAnimationFrame().
- Removed support for IE9 and lower.
- Removed global $.Beacons() function.
- Removed continuous triggering with `handler`.
- Changed beacon settings to `onenter` and `onexit`.
- Removed throttle options. Unneeded with RAF.
