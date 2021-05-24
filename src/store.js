import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import { router } from "./router"
Vue.use(Vuex)
const store = new Vuex.Store({
    //store eski session görevi görüyor
    state: {
        token: "",
        firebaseApiKey: "AIzaSyAc7pS6kCXxzB3bxdaGrxnI9-wqzusNtTc"
    },
    //güncelleme işlemi görevi üstleniyor
    mutations: {
        //gelen tokene set et
        setToken(state, token) {
            //    console.log("actiondan gelen id token   " + token);
            state.token = token
        },
        //Tokene temizle
        clearToken(state) {
            state.token = ""
        }
    },
    //istek atma actionları
    actions: {
        //sayfa başladığında çalışacak fonksiyon
        //Login olma işlemleri
        initAuth: ({ commit, dispatch }) => {
            let token = localStorage.getItem("token");
            if (token) {
                //tokenen ömrünü kontrol et
                let expritionDate = localStorage.getItem("expirationDate")
                //şuan ki zaman al
                let time = new Date().getTime()
                //token varsa süresi geçti mi kontrol et. 
                if (time >= +expritionDate) {
                    console.log("Token süresi geçmiş");
                    dispatch("logout")
                }
                else {
                    //süre henüz geçmediyse veya tokenen ömrü daha varsa
                    commit("setToken", token)
                    let timerSecond = +expritionDate-time
                    console.log(timerSecond);
                    //kalan süreyi hesapla ve devam ettir.
                    dispatch("setTimeoutTimer",timerSecond)
                    router.push("/");
                }
            }
            else {
                router.replace("/auth");
                return false;
            }
        },
        login: ({ commit, dispatch, state }, authData) => {
            let authLink = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="

            if (authData.isUser) {
                authLink = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="
            }

            return axios.post(
                authLink + "AIzaSyAc7pS6kCXxzB3bxdaGrxnI9-wqzusNtTc",
                { "email": authData.email, "password": authData.password, "returnSecureToken": true }
            ).then(response => {
                //commit ile bilgileri gerekli yerlere set edip mutationsu çalşıtırıyoruz.
                commit("setToken", response.data.idToken)
                localStorage.setItem("token", response.data.idToken)
                //expiresIn localstroge ekleme
                // localStorage.setItem("expiresIn",response.data.expiresIn);
                //tokenen bir saat ömür verdik . 
                localStorage.setItem("expirationDate", new Date().getTime() +  +response.data.expiresIn * 1000)
                // localStorage.setItem("expirationDate", new Date().getTime() + 10000)
                //başa + konulduğunda inte pars etmiş oluyur. 
                dispatch("setTimeoutTimer", +response.data.expiresIn)
               // dispatch("setTimeoutTimer", 10000)
            }).catch(err => {
                console.log(err);
            })
        },
        //Logout işlemleri 
        logout: ({ commit }) => {
            commit("clearToken")
            localStorage.removeItem("token")
            localStorage.removeItem("expirationDate")
            router.replace("/auth");
        },
        setTimeoutTimer({ dispatch }, expiresIn) {
            setTimeout(() => {
                dispatch("logout")
            }, expiresIn)
        }
    },
    getters: {
        //tokenen varolup olmadığını kontrol eden fonksiyon
        //token varmı
        isAuthenticadet(state) {
            return state.token !== ""
        }
    }
})

export default store