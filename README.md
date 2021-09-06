# Code Challenge

## Prerequirements
### Node.js
To run this program, you need to have Node.js installed on your machine.
[Click here](https://nodejs.org/en/download/) to download Node.js

## Installations
In the root foulder, run:
```
npm install
```

## Building
Before running the program, you need to build it. To do that, run:
```
npm run build
```

## Running
To run the program, run the following command:
```
npm run start COLORS [o=ORDER, d=ORDER_DIRECTION, re=RETURN_METHOD, ru=RUN_METHOD]
```

### Color
To request a color(s), enter the name of the color(s).

To get the informations for red and blue, run the following:
```
npm run start red blue
```

Colors to pick from is:
- black
- blue
- green
- red
- white

### Order
To request the colors in an specific order, add the order attribute as following:
```
npm run start red blue o=name
```

Order options to pick from is:
- name   <--- Default
- hex
- rgb

### Order Direction
To request the colors in an specific order direction, add the direction attribute as following:
```
npm run start red blue o=name d=desc
```

Order direction options to pick from is:
- asc   <--- Default
- desc

### Return method
To request specific informations about the colors, add the return method attribute as following:
```
npm run start red blue re=hex
```

Return method options to pick from is:
- both   <--- Default
- hex
- rgb

### Run method
To request a specific run method, add the run method attribute as following:
```
npm run start red blue ru=sync
```

Run method options to pick from is:
- async   <--- Default
- sync