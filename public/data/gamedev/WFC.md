What is Wave Function Collapse? And why have I built this simulation showcasing it?


To put it simply, Wave Function Collapse, or WFC, is an algorithm generally used in game development and a few other places for procedural generation. The most common use being world-map generation, as I am doing above.

It burrows the idea from quantum mechanics, where a system is in a superposition of multiple states and collapses to one of the states upon measurement. To put it in normal words, I'll explain it with an example 

Think of the world as a grid:

![Grid](https://i.ibb.co/tPNV3Pc1/Grid-1o-X10.png)

Now assume you have these following four tiles that can be placed on this grid/map:

![Four Colours](https://i.ibb.co/vC6rT28p/Four-Colours.png)

If you want to randomly place a tile on the grid, the simplest way would be to start from top-left and start placing random colours.

![Colour Placing GIF](https://i.ibb.co/9Kfs15z/WFC-Selection.gif)

This can be thought of in another way: Imagine the four tiles with different colours as four different states, and each tile on the grid can have one of the four states, or it is in a "superposition" of those four states. As soon as we reach a tile on the grid and place a colour randomly, we collapse its "wave function" and now, that tile is not in a superposition but has been observed and collapsed.

Repeat this process for all the tiles and you have collapsed all the states of the system and found yourself a random grid world.

![Grid World](https://i.ibb.co/mCs92Z1B/Grid-Filled.png)

But what if you have some limitations, like
* Yellow tiles cannot be placed near Red tiles
* Green tiles can only be placed to the right of Red tiles.
* Blue tiles cannot be placed to the right of Green tiles

and many more rules

As you increase these rules the number of the possible grid worlds decrease, but the complexity of each tile increases. Instead of randomly placing any random colour at any tile, they now have to be placed strategically.

This is where the wave function collapse algorithm comes in handy. Go to any tile, select one of the viable colours which can be placed there, and place it, or, as can be said in physics, collapse the state from its superposition by observing it. Do it until all of the tiles are filled and you find yourself in a grid world defined by some certain rules.

The above method is a very rudimentary approach to the problem and there are much more nuances to it than a simple "follow the rules" and "place random blocks" procedure, however, it is enough to understand how the above simulation works.

In the simulation, you are initially provided a main menu to enter some choices and based on those choices the simulation will run. Here is a run down of those options - 
1. **Size:** This is the size of the square grid, defining how many tiles will be there in the grid.
2. **GrayScale:** When it is turned on, the board will initially be black and white with no colours, and colours will gradually be visible as all the states are collapsed.
3. **Weights:** Under each type of tile, you can enter its weight. This weight will be used during the state collapse to increase its chances of collapsing.

On pressing the "Start Simulation" button, the centre of the grid is selected as the starting point and it is collapsed first. Following which a random direction is selected, its state is collapsed based on the viable tiles it can have and the weights defined, and a next random direction is selected. The process followed is similar to how a Depth-first-search algorithm works as a stack is implemented internally for the movement.

The rules are defined like how a normal path would be - roads going left to right cannot have roads going up to down in their left or right. These type of logical reasoning is used to provide which tiles can go beside which ones, and the ones which are not viable are eliminated during collapse.

That's it, enjoy the spaghetti implementation of the wave function collapse implementation and feel free to contact me if you want to ask any questions/rant about how bad it is and how many bugs it has😊.