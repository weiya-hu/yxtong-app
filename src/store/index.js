// 2. 引入reducer
import reducer from "./reducer.js";
// 3.创建一个store
const {createStore} = require("redux");
const store = createStore(reducer)

export default store;
