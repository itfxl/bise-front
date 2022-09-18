import Vue from 'vue'
import VueRouter from 'vue-router'


import login from "../veiws/index.vue"
import zhuye from "../veiws/zhuye.vue"
import zhuche from "../veiws/zhuche.vue"
import userzhuye from "../components/user/userzhuye.vue"
import newhouse from "../components/user/newhouse.vue"
import housement from "../components/user/housement.vue"
import myself from "../components/user/myself.vue"
import orderment from "../components/user/orderment.vue"
import housecooperated from "../components/user/housecooperated.vue"
import housecatedment from "../components/user/housecatedment.vue"
import usergli from "../veiws/usergli.vue"
import nav from "../veiws/nav.vue"
import hcatedment from "../veiws/hcatedment.vue"
import ordermentguanli from "../veiws/ordermentguanli.vue"

Vue.use(VueRouter)

const router = new VueRouter({
    mode: "history",
    routes: [{
        path: "/",
        component: login
    }, {
        path: "/zhuche",
        component: zhuche
    }, {
        path: "/index",
        component: login
    }, {
        path: "/userzhuye",
        name: "userzhuye",
        component: userzhuye,
        children: [
            {
                path: "/newhouse",
                name: "newhouse",
                component: newhouse,
            },
            {
                path: "/housement",
                name: "housement",
                component: housement,
            },{
                path: "/housecooperated",
                name: "housecooperated",
                component: housecooperated,
            },
            {
                path: "/orderment",
                name: "orderment",
                component: orderment,
            },
            {
                path: "/myself",
                name: "myself",
                component: myself,
            },{
                path: "/housecatedment",
                name: "housecatedment",
                component: housecatedment,
            },]
    },{
        path: "/nav",
        name: "nav",
        component: nav,
        children: [
        {
            path: "/zhuye",
            name: "zhuye",
            component: zhuye,
        },
        {
            path: "/usergli",
            name: "usergli",
            component: usergli,
        },
        {
            path: "/hcatedment",
            name: "hcatedment",
            component: hcatedment,
        },
        {
            path: "/ordermentguanli",
            name: "ordermentguanli",
            component: ordermentguanli,
        },
    ]
    }, ]
})
export default router