import {THEATRECHAIN_DATA,THEATRECHAIN_DELMOVIE,THEATRECHAIN_SERCH,THEATRECHAIN_PAGE,THEATRECHAIN_ALLMOVIE,THEATRECHAIN_CHOOSEVIDEOHALL,THEATRECHAIN_CHOOSEVIDEO,THEATRECHAIN_WHICHDATA,THEATRECHAIN_ADDCINEMADATA} from "./mutations"; //
const theatreChain={
    state:{
        theatreChain_data:{},
        theatreChain_ids:[],
        theatreChain_serch:"",
        theatreChain_page:1,
        theatreChain_allMovie:{},
        theatreChain_choosevideohall:{},
        theatreChain_choosevideo:{},
		theatreChain_whichdata:{},
		theatreChain_addcinemadata:{},
    },
    mutations:{
        [THEATRECHAIN_DATA](state,data){
            state.theatreChain_data=data;
        },
        [THEATRECHAIN_DELMOVIE](state,ids){
            state.theatreChain_ids=ids;
        },
        [THEATRECHAIN_SERCH](state,data){
            state.theatreChain_serch=data;
        },
        [THEATRECHAIN_PAGE](state,page){
            state.theatreChain_page=page;
        },
        [THEATRECHAIN_ALLMOVIE](state,movie){
            state.theatreChain_allMovie=movie;
        },
        [THEATRECHAIN_CHOOSEVIDEOHALL](state,videoHall){
            state.theatreChain_choosevideohall=videoHall;
        },
        [THEATRECHAIN_CHOOSEVIDEO](state,video){
            state.theatreChain_choosevideo=video;
        },
		[THEATRECHAIN_WHICHDATA](state,data){
            state.theatreChain_whichdata=data;
        },
		[THEATRECHAIN_ADDCINEMADATA](state,data){
            state.theatreChain_addcinemadata=data;
        },
    }
}

export {theatreChain as default}