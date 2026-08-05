set shell := ["zsh", "-cu"]

dev:
    node scripts/dev-server.mjs

build:
    node --check src/main.js
    node scripts/verify.mjs

check: build
