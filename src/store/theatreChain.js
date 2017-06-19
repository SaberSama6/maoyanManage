import {THEATRECHAIN_DATA,THEATRECHAIN_DELMOVIE} from "./mutations"; //
const theatreChain={
    state:{
        theatreChain_data:{},
        theatreChain_ids:[],
    },
    mutations:{
        [THEATRECHAIN_DATA](state,data){
            state.theatreChain_data=data;
        },
        [THEATRECHAIN_DELMOVIE](state,ids){
            state.theatreChain_ids=ids;
        },
    }
}

export {theatreChain as default}