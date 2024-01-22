// module.exports = function (api) {
// 	api.cache(true);
// 	return {
// 		presets: ["babel-preset-expo"],
// 	};
// };

export default function () {
	return {
		presets: ["@babel/preset-typescript"],
	};
}
