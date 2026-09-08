# Storyboard Contract

Each shot must define:

- `id`
- `startSec`
- `endSec`
- `purpose`
- `asset`
- `motion`
- `copy`
- optional `sfx`

Rules:

- shots are contiguous and non-overlapping
- first shot starts at 0
- final shot ends at campaign duration
- asset references must resolve before render
- copy should be authored outside source imagery whenever possible so typography remains editable
