import * as React from 'react';
import { Component } from 'react';
import { Checkbox, Flex, Header } from '@fluentui/react-northstar';
import {
    streamDocumentValue,
    updateDocumentValue,
} from '../services/firestore';

const id = process.env.REACT_APP_DOCUMENT_ID;
const key = process.env.REACT_APP_DOCUMENT_KEY;

class HyperDrive extends Component {
    unsubscribe: any;
    state = { checked: false };

    // constructor(props) {
    //     super(props);
    // }

    componentDidMount() {
        const snapshot = (document: any) => {
            const data = document.data();
            this.setState({ checked: data[key] });
        };

        const error = (error) => {
            console.log(error.message);
        };

        this.unsubscribe = streamDocumentValue(id, snapshot, error);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    handleCheck(value) {
        updateDocumentValue(id, key, value.checked);
        // this.setState({ checked: value.checked }); //not necessary. subscribe does the updating of the component already.
    }

    render() {
        let banner = 'Punch It';

        if (this.state.checked) {
            banner = 'Rawwwr';
        }

        return (
            <Flex.Item>
                <div>
                    <Header content={banner} />
                    <Checkbox
                        label="Hyperdrive"
                        checked={this.state.checked}
                        toggle
                        onChange={(e, v) => this.handleCheck(v)}
                    />
                </div>
            </Flex.Item>
        );
    }
}

export default HyperDrive;
