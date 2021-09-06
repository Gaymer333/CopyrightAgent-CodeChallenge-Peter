import { getColor } from "./apiMock"
import { Color, OrderDirectionsEnum, OrderEnum, ReturnMethodEnum, RunMethodEnum } from "./types"

const defualtOrder: OrderEnum = OrderEnum.writen
const defualtOrderDirection: OrderDirectionsEnum = OrderDirectionsEnum.asc
const defualReturnMethod: ReturnMethodEnum = ReturnMethodEnum.both
const defualRunMethod: RunMethodEnum = RunMethodEnum.async

const getOrder = (args: Array<string>) => {
	const orderParameter = args.find(word => word.indexOf("o=") === 0)
	if (!orderParameter) return defualtOrder
	process.argv = process.argv.filter(arg => arg !== orderParameter)
	const orderString = orderParameter.split("=")[1]
	const order = OrderEnum[orderString as keyof typeof OrderEnum]
	return order ?? defualtOrder
}

const getOrderDirection = (args: Array<string>) => {
	const orderDirectionParameter = args.find(word => word.indexOf("d=") === 0)
	if (!orderDirectionParameter) return defualtOrderDirection
	process.argv = process.argv.filter(arg => arg !== orderDirectionParameter)
	const orderDirectionString = orderDirectionParameter.split("=")[1]
	const orderDirection = OrderDirectionsEnum[orderDirectionString as keyof typeof OrderDirectionsEnum]
	return orderDirection ?? defualtOrderDirection
}

const getReturnMethod = (args: Array<string>) => {
	const returnMethodParameter = args.find(word => word.indexOf("re=") === 0)
	if (!returnMethodParameter) return defualReturnMethod
	process.argv = process.argv.filter(arg => arg !== returnMethodParameter)
	const returnMethodString = returnMethodParameter.split("=")[1]
	const returnMethod = ReturnMethodEnum[returnMethodString as keyof typeof ReturnMethodEnum]
	return returnMethod ?? defualReturnMethod
}

const getRunMethod = (args: Array<string>) => {
	const runMethodParameter = args.find(word => word.indexOf("ru=") === 0)
	if (!runMethodParameter) return defualRunMethod
	process.argv = process.argv.filter(arg => arg !== runMethodParameter)
	const runMethodString = runMethodParameter.split("=")[1]
	const runMethod = RunMethodEnum[runMethodString as keyof typeof RunMethodEnum]
	return runMethod ?? defualRunMethod
}

const orderColors = (colors: Array<Color>, order: OrderEnum, direction: OrderDirectionsEnum) => {
	const directionIsASC = direction === OrderDirectionsEnum.asc
	switch (order) {
		case OrderEnum.writen:
			return directionIsASC ? colors : colors.reverse();
		case OrderEnum.name:
			const alpOrdered = colors.sort((colorA, colorB) => colorA.name > colorB.name ? 1 : -1)
			return directionIsASC ? alpOrdered : alpOrdered.reverse()
		case OrderEnum.hex:
			const hexOrdered = colors.sort((colorA, colorB) => colorA.HEX > colorB.HEX ? 1 : -1)
			return directionIsASC ? hexOrdered : hexOrdered.reverse()
		case OrderEnum.rgb:
			const RGBOrdered = colors.sort((colorA, colorB) => {
				if(colorA.RGB.R > colorB.RGB.R) return 1
				if(colorA.RGB.R < colorB.RGB.R) return -1
				if(colorA.RGB.G > colorB.RGB.G) return 1
				if(colorA.RGB.G < colorB.RGB.G) return -1
				if(colorA.RGB.B > colorB.RGB.B) return 1
				if(colorA.RGB.B < colorB.RGB.B) return -1
				return 0
			})
			return directionIsASC ? RGBOrdered : RGBOrdered.reverse()
	
		default:
			throw new Error("Unknow Order Type");
			
	}
}

const showColors = (colors: Array<Color> | Color, order: OrderEnum, direction: OrderDirectionsEnum, returnMethod: ReturnMethodEnum) => {
	if(!Array.isArray(colors)) colors = [colors]
	if(order != OrderEnum.writen || direction != OrderDirectionsEnum.asc) colors = orderColors(colors, order, direction)
	console.info("----------------")
	for (const color of colors) {
		console.info("name:", color.name)
		if(returnMethod === ReturnMethodEnum.both || returnMethod === ReturnMethodEnum.hex) console.info("HEX:", color.HEX)
		if(returnMethod === ReturnMethodEnum.both || returnMethod === ReturnMethodEnum.rgb) console.info("RGB:", `${color.RGB.R},${color.RGB.G},${color.RGB.B}`)
		console.info("----------------")
	}
	
}

const colors = async () => {
	process.argv = process.argv.slice(2)

	const order = getOrder(process.argv)
	console.info("Order is:", OrderEnum[order])

	const direction = getOrderDirection(process.argv)
	console.info("Order direction is:", OrderDirectionsEnum[direction])

	const returnMethod = getReturnMethod(process.argv)
	console.info("Return method is:", ReturnMethodEnum[returnMethod])

	const runMethod = getRunMethod(process.argv)
	console.info("Run method is:", RunMethodEnum[runMethod])

	if (runMethod === RunMethodEnum.async) {
		const colors = await Promise.all(process.argv.map(arg => getColor(arg)))

		showColors(colors, order, direction, returnMethod)
	}
	else {
		let colors: Array<Color> = []
		for (const arg of process.argv) {
			colors.push(await getColor(arg))
		}

		showColors(colors, order, direction, returnMethod)
	}
}

colors()