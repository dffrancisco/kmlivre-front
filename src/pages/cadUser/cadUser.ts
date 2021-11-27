import { reactive } from 'vue'
import axios from 'axios'
import { iUsuario } from "@/models/interfaces"
//@ts-ignore
import xModal from "@/plugins/xModal/xModal.js"
import util from "@/plugins/util.js"
import { GridItem } from 'vant'
import md5 from 'md5'

export const state = reactive({
    usuarios: <iUsuario[]>{},
    usuarioSelect: {
        name: '',
        email: '',
        phone: ''
    },
    xmNovoUser: {},
    xmEditUser: {},
    xmEditPass: {},
    controller: "",
    dadosUser: {
        name: '',
        email: '',
        phone: '',
        pass: '',
        confirmPass: '',
        date_in: '',
        id_user: 0
    },
    checkedApp: true,
    checkedAdm: false,

})

export const actions = {
    modais() {

        state.xmNovoUser = new xModal.create({
            el: "#xmNovoUser",
            title: "Novo usuario",
            width: 450,
            height: 430,
            buttons: {
                salvar: {
                    html: 'Salvar',
                    click: this.validaUser
                }
            },
        })

        state.xmEditUser = new xModal.create({
            el: "#xmEditUser",
            title: "Dados do usuario",
            width: 450,
            height: 330,
            buttons: {
                salvar: {
                    html: 'Salvar',
                    click: this.validaUser
                }
            },
        })

        state.xmEditPass = new xModal.create({
            el: "#xmEditPass",
            title: "Mudar senha",
            width: 450,
            height: 270,
            buttons: {
                salvar: {
                    html: 'Salvar',
                    click: this.editPass
                }
            },
        })
    },
    getUsuarios() {
        axios.post("/usuarios", {
            call: "getUsuarios"
        }).then(r => {
            let dados = {}
            for (let i in r.data) {
                dados[r.data[i].id_user] = r.data[i]
            }
            state.usuarios = dados
        })
    },

    desativarUser(item: iUsuario) {

        util.confirma({
            msg: `Deseja deletar ${item.name}?`,
            call: () => {
                axios.post("/usuarios", {
                    call: "desativeUsuario",
                    param: {
                        active: "N",
                        id_user: item.id_user
                    }
                }).then(r => {
                    actions.getUsuarios()
                })
            }
        })
    },


    alterarUser(item: iUsuario) {

        state.xmEditUser.open()
        state.controller = "edit"
        state.dadosUser.name = item.name
        state.dadosUser.email = item.email
        state.dadosUser.phone = item.phone
        state.dadosUser.date_in = item.date_in
        state.dadosUser.id_user = item.id_user
        state.usuarioSelect = item
        if (item.access == '0') {
            state.checkedAdm = false
            state.checkedApp = true
        }
        if (item.access == '1') {
            state.checkedAdm = true
            state.checkedApp = false
        }
        if (item.access == '3') {
            state.checkedAdm = true
            state.checkedApp = true
        }


    },

    alterarPass(item: iUsuario) {

        state.xmEditPass.open()
        state.dadosUser.name = item.name
        state.dadosUser.id_user = item.id_user
        state.dadosUser.pass = ""
        state.dadosUser.confirmPass = ""

    },

    novoUser() {
        state.xmNovoUser.open()
        state.controller = "new"
        state.dadosUser.name = ""
        state.dadosUser.email = ""
        state.dadosUser.phone = ""
        state.checkedAdm = false
        state.checkedApp = true
    },

    btnXmCad() {
        let access
        // console.log(state.dadosUser.id_user);

        if (state.checkedAdm == true && state.checkedApp == true) {
            access = "3"
        }

        if (state.checkedAdm == true && state.checkedApp == false) {
            access = "1"
        }

        if (state.checkedAdm == false && state.checkedApp == true) {
            access = "0"
        }
        if (state.controller == "new") {

            axios.post("/usuarios", {
                call: "insertUsuario",
                param: {
                    name: state.dadosUser.name,
                    email: state.dadosUser.email,
                    phone: state.dadosUser.phone,
                    pass: md5(state.dadosUser.pass),
                    access: access,
                }
            })
        }
        if (state.controller == "edit") {
            state.usuarioSelect.name = state.dadosUser.name
            state.usuarioSelect.email = state.dadosUser.email
            state.usuarioSelect.phone = state.dadosUser.phone

            axios.post("/usuarios", {
                call: "alteraUsuario",
                param: {
                    name: state.dadosUser.name,
                    email: state.dadosUser.email,
                    phone: state.dadosUser.phone,
                    access: access,
                    id_user: state.dadosUser.id_user
                }
            })
        }
        state.xmNovoUser.close()
        state.xmEditUser.close()

    },

    validaUser() {
        if (state.dadosUser.name == '') {
            util.show('Informe o nome')
            return false
        }
        if (state.dadosUser.email == '') {
            util.show('Informe o email')
            return false
        }
        if (state.dadosUser.phone == '') {
            util.show('Informe o telefone')
            return false
        }
        let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!state.dadosUser.email.match(emailFormat)) {
            util.show('Email inválido')
            return false
        }

        if (state.checkedApp == false && state.checkedAdm == false) {
            util.show('O usuario está sem nenhum acesso')
            return false
        }
        if (state.controller == "new") {
            if (state.dadosUser.pass == "") {
                util.show('A senha está vazia')
                return false
            }
            if (state.dadosUser.pass != state.dadosUser.confirmPass) {
                util.show('As senhas são diferentes')
                return false
            }

        }
        actions.btnXmCad()
    },

    editPass(item: iUsuario) {
        if (state.dadosUser.pass == "") {
            util.show('A senha está vazia')
            return false
        }
        if (state.dadosUser.pass != state.dadosUser.confirmPass) {
            util.show('As senhas são diferentes')
            return false
        }
        axios.post("/usuarios", {
            call: "alteraPass",
            param: {
                pass: md5(state.dadosUser.pass),
                id_user: state.dadosUser.id_user
            }
        })
        util.show('Senha alterada')
        state.xmEditPass.close()
    }

}

export default {
    state,
    actions
}