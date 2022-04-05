import React from 'react';

import { useState, useEffect } from 'react';
import { useTeams } from 'msteams-react-base-component';
import * as microsoftTeams from '@microsoft/teams-js';

import { Provider, Flex, Text } from '@fluentui/react-northstar';
import HyperDrive from './components/HyperDrive';

function App() {
    let [{ inTeams, theme, context }] = useTeams();
    const [entityId, setEntityId] = useState<string | undefined>();

    useEffect(() => {
        if (inTeams === true) {
            microsoftTeams.appInitialization.notifySuccess();
        } else {
            setEntityId('Not in Microsoft Teams');
        }
    }, [inTeams]);

    useEffect(() => {
        if (context) {
            setEntityId(context.userPrincipalName);
        }
    }, [context]);

    return (
        <Provider theme={theme}>
            <Flex
                fill={true}
                column
                styles={{
                    padding: '.8rem 0 .8rem .5rem',
                }}
            >
                <Flex.Item>
                    <HyperDrive />
                </Flex.Item>
                <Flex.Item
                    styles={{
                        padding: '.8rem 0 .8rem .5rem',
                    }}
                >
                    <div>
                        <div>
                            <Text content={entityId} />
                        </div>
                        <div>
                            <Text
                                size="smaller"
                                content="(C) Copyright Accenture"
                            />
                        </div>
                    </div>
                </Flex.Item>
            </Flex>
        </Provider>
    );
}

export default App;
