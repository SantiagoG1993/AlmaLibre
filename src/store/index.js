import {createStore} from 'vuex'

export default createStore({
    state:{
        cartProducts:[],
        isOpen : 'main',
    } ,
    getters:{
        /* PRODUCTS CART */
        sumaDePrecios(state){
            const productos = state.cartProducts;
            let suma = 0;
            for(let producto of productos){
                suma+=producto.price
            }
                return suma
        },
        /* IS OPEN */
        isOpen(state) {
            return state.isOpen;
        },
    } ,
    mutations:{
            /* PRODUCTS CART */
        addProductToCart(state,product){
            state.cartProducts.push(product)
        },
        removeProductFromCart(state, product) {
            const index = state.cartProducts.indexOf(product);
            if (index !== -1) {
            state.cartProducts.splice(index, 1);
            }
        },
        emptyCart(state){
            state.cartProducts = []
        },
        increaseQuantity (state,product){
                    state.cartProducts.push(product)              
        },
        decreaseQuantity(state,product){
            state.cartProducts.pop(product) 
        },
        /* IS OPEN*/
        stateCategory(state,category){
            state.isOpen = category;
            console.log(state.isOpen)
        }
        
        },
    actions:{

    },
    modules:{

    }
})