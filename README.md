# @fiverr/react-benchmark

## ⏱ Benchmark react component rendering

```
npx @fiverr/react-benchmark --components ./dist --stubs ./stubs --globals ./globals.js --times 25
```

### Tree structure
The application traverses through the stubs tree and looks for components in the components tree. It then works on matched pairs only.
```
.
├── dist
│   ├── avram
│   │   └── index.js
│   ├── benni
│   │   └── index.js
│   └── moshe
│       └── index.js
└── stubs
    ├── avram
    │   └── index.js
    ├── benni
    │   └── index.js
    └── pinchas
        └── index.js
```
