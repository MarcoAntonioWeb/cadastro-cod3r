import React, { Component } from 'react'
import Axios from 'axios'
import Main from '../template/Main'

//Componente usado do Cabeçalho na parte Frontend
const headerProps = {
    icon: 'users',
    title: 'Clientes',
    subtitle: 'Cadastro de clientes: Incluir, Listar, Alterar e Excluir'

}

const baseUrl = 'http://localhost:3001/users'
const initialState = {
    user: { name: '', email: '',},
    list: []
    
}

// Metodo de ciclo de vida do React
// Vai ser usado o estado
export default class UserCrud extends Component {

    state = {...initialState}

    //função Vai chama a lista que esta no backend tudo que esta cadastrado
    componentWillMount() {
        Axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() { // ele vai limpar o usuário.
        this.setState ({ user: initialState.user})
       
    }

    save() { // ele vai salvar o usuário ou alterar
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        Axios[method](url,user)// o method é uma função aqui
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ user: initialState.user, list })
            })

    }

    getUpdatedList(user, add =true) {
        const list = this.state.list.filter(u => u.id !== user.id)
        if(add) list.unshift(user) // undhift leva o usuario para primeira possição.
        return list
    }

    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    renderForm() {
        return (
   
            <div className="form validated">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                        <label htmlFor="Nome">Nome</label>
                        <input type="text" className="form-control"
                        name="name" required
                        value={this.state.user.name}
                        onChange={e => this.updateField(e)}
                        placeholder="Digite o nome..." />
                         
                    </div>
                </div>

                <div className="col-12 col-md-6">
                   <div className="form-group">
                        <label htmlFor="E-mail">Email</label>
                        <input type="text" className="form-control"
                        name="email" required
                        value={this.state.user.email}
                        onChange={e => this.updateField(e)}
                        palceholder="Digite o email..." />
                    </div> 
                </div>
            </div>
            
            <hr />
            <div className="row">
                <div className="col-12 d-flex justify-content-end">
                    <button className="btn btn-primary"
                        onClick={e => this.save(e)}>
                        Salvar    
                    </button> 

                    <button className="btn btn-secondary ml-2"
                        onClick={e => this.clear(e)}>
                        Cancelar    
                    </button>   
                </div>   
            </div>
        </div>
        )
        
    }
        // Vai atualizar o estado do usuario
        load(user) {
            this.setState({ user })
        }

        // Vai remover o estado atual
        remove(user) {
           Axios.delete(`${baseUrl}/${user.id}`).then(resp => { 
            const list = this.getUpdatedList(user, false)
            this.setState({ list })
        })
    }
// Vai ser criado a tabela
    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }
// Função para renderizar a tabela
    renderRows() {
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning"
                        onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                        onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}