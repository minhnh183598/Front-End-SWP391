import { Component } from 'react'
import {Flowers} from './ListOfOrchids'
import Content from './Content';

export default class Main extends Component {
    constructor() {
        super();
        this.state = {
            flower: Flowers
        }
    }

    render() {
        return <Content flowers={this.state.flower}/>
    }
}
