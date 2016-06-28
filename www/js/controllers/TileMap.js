
//1 - Mouse to Tilemap coordinates
var tilemapX = 52/16 = 3.25;
Math.floor(3.25) = 3;

var tilemapY = 26/16 = 1.625;
Math.floor(1.625) = 1;

// 2 - Tilemap coordinates to arrau index
(tilemapY * tilemapWidth) + tilemapX;
1*4 + 3 = 7;

// 3 - Array index back to tilemap coordinates

tilemapX	= 7 % tilemapWidth
			= 7 % 4
			= 3

tilemapY	= Math.floor(7/tilemapWidth)
			= Math.floor(7/4)
			= Math.floor(1.75)
			= 1

// convert map to tile index coordinates
function xy2i(x,y,mapWidth){
	return y*mapWidth +x;
}	

// convert tile index to map coordinates
function i2xy(i, mapWidth){
	var x = i%mapWidth;
	var y= Math.floor(i/mapWidth);
	return [x, y];
}