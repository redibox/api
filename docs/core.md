## Core API Documentation

All core API routes are prefixed by `/core`.

### GET `/`

Provides basic information about the current RediBox setup.

### GET `/host-info`

Returns a payload response directly from the `hostInfo()` RediBox method.

### GET `/scripts`

Returns all injected lua scripts.

### `/hooks`

Returns an array of all installed RediBox hooks.

### `/hooks/:hook`

Returns all information about a specific installed hook.
